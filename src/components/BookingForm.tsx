import React, { useState, useEffect } from 'react';
import { currentClient } from '../config/clients';

const BookingForm: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        branch: '',
        service: '',
        date: '',
        time: '',
        message: ''
    });

    const minDate = new Date().toISOString().split('T')[0];

    // Lógica equivalente a cargarHorarios()
    useEffect(() => {
        const fetchAvailability = async () => {
            // 4. Escuchar cuando cambien la fecha o la sucursal (vía dependencias del useEffect)
            if (!formData.date || !formData.branch) return;

            setLoadingSlots(true);
            try {
                // 2. Consulta a n8n
                const response = await fetch(`https://n8n.srv1574981.hstgr.cloud/webhook/consultar-disponibilidad?fecha=${formData.date}&sucursal=${encodeURIComponent(formData.branch)}`);
                const data = await response.json();
                
                // Debug: Para ver qué llega exactamente en la consola del navegador
                console.log("Datos de n8n:", data);

                // Manejamos si n8n manda un array o un objeto directo (Blindado)
                const slots = Array.isArray(data) ? (data[0]?.availableSlots || []) : (data.availableSlots || []);
                
                // 3. Llenar el dropdown (vía estado)
                if (slots.length > 0) {
                    setAvailableSlots(slots);
                } else {
                    setAvailableSlots([]);
                }
            } catch (error) {
                console.error("Error cargando horarios:", error);
                setAvailableSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        };

        fetchAvailability();
    }, [formData.date, formData.branch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://n8n.srv1574981.hstgr.cloud/webhook/agendar-cita-reynosa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, clientId: currentClient.id }),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, phone: value });
    };

    if (status === 'success') {
        return (
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-blue-50 dark:border-slate-800 text-center animate-fade-in flex flex-col items-center">
                <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mb-8 animate-bounce-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight">¡Solicitud Enviada!</h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
                    {currentClient.shortName} recibió tu mensaje para la sucursal <span className="text-blue-600 dark:text-blue-400 font-bold">{formData.branch}</span>. Revisa tu <span className="text-blue-600 dark:text-blue-400 font-bold">WhatsApp</span> en un momento para confirmar tu horario.
                </p>
                <button onClick={() => setStatus('idle')} className="mt-10 text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-2 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Agendar otra cita
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[3rem] shadow-premium-xl border border-slate-100 dark:border-slate-800 flex flex-col gap-8 relative overflow-hidden transition-all duration-300">
            {/* Header del Formulario con confianza */}
            <div className="flex flex-col gap-2 mb-2">
                <div className="flex items-center gap-2 text-[currentClient.primaryColor] mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ color: currentClient.primaryColor }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: currentClient.primaryColor }}>Conexión Segura 256-bit</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Datos del Paciente</h3>
            </div>

            {status === 'loading' && (
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-6">
                    <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin shadow-lg" style={{ borderColor: currentClient.primaryColor, borderTopColor: 'transparent' }}></div>
                    <p className="font-black uppercase tracking-[0.3em] text-sm animate-pulse" style={{ color: currentClient.primaryColor }}>Verificando Horarios...</p>
                </div>
            )}

            <div className="flex flex-col gap-3 group/field">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 group-focus-within/field:text-slate-900 dark:group-focus-within/field:text-white transition-colors">Nombre Completo</label>
                <div className="relative">
                    <input 
                        required 
                        type="text" 
                        placeholder="Ej. Juan Pérez" 
                        className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-[var(--primary)] dark:focus:border-[var(--primary)] focus:bg-white dark:focus:bg-slate-950 rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm"
                        style={{ '--primary': currentClient.primaryColor } as any}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 group/field">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 group-focus-within/field:text-slate-900 dark:group-focus-within/field:text-white transition-colors">WhatsApp</label>
                    <div className="relative">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12.031 2c-5.517 0-9.993 4.476-9.993 9.993 0 1.764.46 3.42 1.261 4.86L2 22l5.304-1.391a9.92 9.92 0 0 0 4.727 1.192l.001-.001c5.517 0 9.993-4.476 9.993-9.993 0-5.517-4.476-9.993-9.993-9.993zM6.783 16.945l-.307-.488a8.216 8.216 0 0 1-1.259-4.327c0-4.544 3.697-8.241 8.241-8.241 4.544 0 8.241 3.697 8.241 8.241s-3.697 8.241-8.241 8.241c-1.575 0-3.047-.45-4.307-1.23l-.462-.286-3.21.842.844-3.13z"/>
                            </svg>
                        </div>
                        <input 
                            required 
                            type="tel" 
                            value={formData.phone} 
                            placeholder="Ej. 899 123 4567" 
                            className="w-full pl-14 pr-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-[var(--primary)] dark:focus:border-[var(--primary)] focus:bg-white dark:focus:bg-slate-950 rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm" 
                            style={{ '--primary': currentClient.primaryColor } as any}
                            onChange={handlePhoneChange} 
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3 group/field">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 group-focus-within/field:text-slate-900 dark:group-focus-within/field:text-white transition-colors">Correo Electrónico</label>
                    <input 
                        required 
                        type="email" 
                        placeholder="ejemplo@correo.com" 
                        className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-[var(--primary)] dark:focus:border-[var(--primary)] focus:bg-white dark:focus:bg-slate-950 rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm" 
                        style={{ '--primary': currentClient.primaryColor } as any}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 group/field">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 group-focus-within/field:text-slate-900 dark:group-focus-within/field:text-white transition-colors">Sucursal</label>
                    <select 
                        required 
                        className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-[var(--primary)] dark:focus:border-[var(--primary)] focus:bg-white dark:focus:bg-slate-950 rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none cursor-pointer shadow-sm" 
                        style={{ '--primary': currentClient.primaryColor } as any}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    >
                        <option value="">Seleccionar Sucursal</option>
                        {currentClient.branches.map(branch => (
                            <option key={branch.name} value={branch.name}>{branch.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-3 group/field">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 group-focus-within/field:text-slate-900 dark:group-focus-within/field:text-white transition-colors">Servicio Requerido</label>
                    <select 
                        required 
                        className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-[var(--primary)] dark:focus:border-[var(--primary)] focus:bg-white dark:focus:bg-slate-950 rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none cursor-pointer shadow-sm" 
                        style={{ '--primary': currentClient.primaryColor } as any}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                        <option value="">Seleccionar Servicio</option>
                        {currentClient.bookingServices.map(service => (
                            <option key={service} value={service}>{service}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 group/field">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 group-focus-within/field:text-slate-900 dark:group-focus-within/field:text-white transition-colors">Fecha de Cita</label>
                    <input 
                        required 
                        type="date" 
                        min={minDate} 
                        className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-[var(--primary)] dark:focus:border-[var(--primary)] focus:bg-white dark:focus:bg-slate-950 rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 dark:text-white shadow-sm" 
                        style={{ '--primary': currentClient.primaryColor } as any}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
                    />
                </div>
                <div className="flex flex-col gap-3 group/field">
                    <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1 group-focus-within/field:text-slate-900 dark:group-focus-within/field:text-white transition-colors">
                        {loadingSlots ? 'Consultando disponibilidad...' : 'Hora Preferida'}
                    </label>
                    <select 
                        required 
                        disabled={loadingSlots || !formData.date || !formData.branch}
                        className="w-full px-7 py-5 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 focus:border-[var(--primary)] dark:focus:border-[var(--primary)] focus:bg-white dark:focus:bg-slate-950 rounded-[1.5rem] outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none disabled:opacity-50 disabled:cursor-not-allowed shadow-sm" 
                        style={{ '--primary': currentClient.primaryColor } as any}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        value={formData.time}
                    >
                        <option value="">{formData.date && formData.branch ? (loadingSlots ? 'Cargando...' : 'Seleccionar Hora') : 'Elige fecha y sucursal'}</option>
                        {availableSlots.length > 0 ? (
                            availableSlots.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))
                        ) : (
                            formData.date && formData.branch && !loadingSlots && (
                                <option value="">Sin disponibilidad</option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={status === 'loading' || formData.phone.length !== 10} 
                className="group mt-6 text-white font-black py-6 px-12 rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-4 text-xl cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden relative"
                style={{ backgroundColor: currentClient.primaryColor }}
            >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">Confirmar Solicitud</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-2 transition-transform relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
            
            <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 px-4">
                    🛡️ Sus datos sensibles de salud están protegidos
                </p>
                <p className="text-center text-[10px] font-bold text-slate-300 dark:text-slate-600">
                    Cumplimiento con Ley Federal de Protección de Datos Personales
                </p>
            </div>
        </form>
    );
};

export default BookingForm;
