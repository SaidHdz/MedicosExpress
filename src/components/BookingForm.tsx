import React, { useState, useEffect } from 'react';

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
                const response = await fetch(`https://ravyb.app.n8n.cloud/webhook/consultar-disponibilidad?fecha=${formData.date}&sucursal=${encodeURIComponent(formData.branch)}`);
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
            const response = await fetch('https://ravyb.app.n8n.cloud/webhook/agendar-cita-reynosa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
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
                    El Dr. Reynosa recibió tu mensaje. Revisa tu <span className="text-blue-600 dark:text-blue-400 font-bold">WhatsApp</span> en un momento para confirmar tu horario.
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
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-6 relative overflow-hidden transition-colors duration-300">
            {status === 'loading' && (
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest text-sm">Procesando...</p>
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Nombre Completo</label>
                <input required type="text" placeholder="Ej. Juan Pérez" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">WhatsApp (10 dígitos)</label>
                    <input required type="tel" value={formData.phone} placeholder="Ej. 899 123 4567" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" onChange={handlePhoneChange} />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Correo Electrónico</label>
                    <input required type="email" placeholder="ejemplo@correo.com" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Sucursal</label>
                    <select required className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none" onChange={(e) => setFormData({ ...formData, branch: e.target.value })}>
                        <option value="">Seleccionar Sucursal</option>
                        <option value="La Joya">La Joya</option>
                        <option value="José López Portillo">José López Portillo</option>
                        <option value="Las Lomas">Las Lomas</option>
                        <option value="Vista Hermosa">Vista Hermosa</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Servicio</label>
                    <select required className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none" onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                        <option value="">Seleccionar Servicio</option>
                        <option value="Médico General">Médico General</option>
                        <option value="Ginecología">Ginecología</option>
                        <option value="Pediatría">Pediatría</option>
                        <option value="Traumatología">Traumatología</option>
                        <option value="Urgenciología">Urgenciología</option>
                        <option value="Cirugía General">Cirugía General</option>
                        <option value="Cardiología Pediátrica">Cardiología Pediátrica</option>
                        <option value="Laboratorios">Laboratorios</option>
                        <option value="Rayos X">Rayos X</option>
                        <option value="Ultrasonidos y TAC">Ultrasonidos y TAC</option>
                        <option value="Farmacia">Farmacia</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Fecha Preferida</label>
                    <input required type="date" min={minDate} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white" onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
                        {loadingSlots ? 'Consultando disponibilidad...' : 'Hora Preferida'}
                    </label>
                    <select 
                        required 
                        disabled={loadingSlots || !formData.date || !formData.branch}
                        className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-slate-950 rounded-2xl outline-none transition-all font-bold text-slate-900 dark:text-white appearance-none disabled:opacity-50 disabled:cursor-not-allowed" 
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

            <button type="submit" disabled={status === 'loading' || formData.phone.length !== 10} className="group mt-4 bg-blue-600 disabled:bg-slate-300 dark:disabled:bg-slate-800 hover:bg-blue-700 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3 text-xl cursor-pointer disabled:cursor-not-allowed">
                Confirmar Solicitud
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
            
            <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 px-4">
                🔒 Sus datos están protegidos bajo nuestro Aviso de Privacidad.
            </p>
        </form>
    );
};

export default BookingForm;
