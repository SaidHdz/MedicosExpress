import React, { useState } from 'react';

const BookingForm: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        date: '',
        message: ''
    });

    // Fecha mínima: Hoy
    const minDate = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://ravyb.app.n8n.cloud/webhook-test/agendar-cita-reynosa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        } catch (error) {
            console.error('Error al enviar la cita:', error);
            setStatus('error');
            // Revertir a idle después de 3 segundos para permitir reintento
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setFormData({ ...formData, phone: value });
    };

    if (status === 'success') {
        return (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-blue-50 text-center animate-fade-in flex flex-col items-center">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 animate-bounce-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 italic tracking-tight">¡Solicitud Enviada!</h3>
                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
                    El Dr. Reynosa recibió tu mensaje. Revisa tu <span className="text-blue-600 font-bold">WhatsApp</span> en un momento para confirmar tu horario.
                </p>
                <button 
                    onClick={() => setStatus('idle')}
                    className="mt-10 text-blue-600 font-bold hover:underline flex items-center gap-2 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Agendar otra cita
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col gap-6 relative overflow-hidden">
            {status === 'loading' && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-black text-blue-600 uppercase tracking-widest text-sm">Procesando...</p>
                </div>
            )}

            <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nombre Completo</label>
                <input 
                    required
                    type="text" 
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">WhatsApp (10 dígitos)</label>
                    <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        placeholder="Ej. 899 123 4567"
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300"
                        onChange={handlePhoneChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Fecha Preferida</label>
                    <input 
                        required
                        type="date" 
                        min={minDate}
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900"
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Motivo de Consulta (Opcional)</label>
                <textarea 
                    rows={3}
                    placeholder="Cuéntanos brevemente cómo podemos ayudarte..."
                    className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none"
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>

            <button 
                type="submit"
                disabled={status === 'loading' || formData.phone.length !== 10}
                className="group mt-4 bg-blue-600 disabled:bg-slate-300 hover:bg-blue-700 text-white font-black py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3 text-xl cursor-pointer disabled:cursor-not-allowed"
            >
                Confirmar Solicitud
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
            
            <p className="text-center text-xs font-bold text-slate-400 px-4">
                Al confirmar, el Dr. recibirá una notificación instantánea y se pondrá en contacto contigo.
            </p>
        </form>
    );
};

export default BookingForm;
