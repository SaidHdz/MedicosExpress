import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music, Layers, Filter, MousePointer2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Tutorial = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('rokola_tutorial_seen');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const steps = [
    {
      title: "HOLA DETH",
      message: "Espero que sí estés viendo esto, es un regalo que te hice.",
      icon: <Sparkles className="text-amber-accent w-12 h-12" />,
      button: "Continuar"
    },
    {
      title: "Nuestras Memorias",
      message: "Aquí están las canciones que me hacen pensar en ti, y unas cuantas cartas que te escribí.",
      icon: <Music className="text-wine-red w-12 h-12" />,
      button: "Ver más"
    },
    {
      title: "¿Cómo usarlo?",
      message: "Solo dale clic a las portadas de las canciones o singles. Cada álbum tiene las canciones y sus mensajes dentro.",
      icon: <MousePointer2 className="text-amber-accent w-12 h-12" />,
      button: "Entendido"
    },
    {
      title: "ESPERO TE GUSTE",
      message: "Llevo dos meses trabajando en esto, ojalá te guste, te quiero.",
      icon: <Sparkles className="text-wine-red w-12 h-12" />,
      button: "Entrar al Archivo"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeTutorial();
    }
  };

  const closeTutorial = () => {
    setIsOpen(false);
    localStorage.setItem('rokola_tutorial_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-deep-black/95 backdrop-blur-xl"
            onClick={closeTutorial}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-10 md:p-14 text-center overflow-hidden shadow-2xl"
          >
            <button 
                onClick={closeTutorial}
                className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors"
            >
                <X size={20} />
            </button>

            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div 
                    className="h-full bg-wine-red"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-center">{steps[currentStep].icon}</div>
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-display italic text-white">{steps[currentStep].title}</h3>
                  <p className="text-lg font-body opacity-60 leading-relaxed italic">{steps[currentStep].message}</p>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-wine-red text-white py-5 rounded-2xl font-body uppercase tracking-[0.3em] text-[10px] font-bold hover:brightness-125 transition-all shadow-xl active:scale-95"
                >
                  {steps[currentStep].button}
                </button>
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-8 flex justify-center gap-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-6 bg-wine-red' : 'bg-white/10'}`} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Tutorial;
