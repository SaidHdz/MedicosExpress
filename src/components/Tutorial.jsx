import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music, Layers, Filter, MousePointer2, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Tutorial = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Hola richelle",
      message: "espero te guste este regalo",
      button: "Continuar"
    },
    {
      title: "Canciones",
      message: "aqui estan canciones que me hacen alimentar mi cariño a ti",
      button: "Siguiente"
    },
    {
      title: "Como usarlo",
      message: "solo dale clik a la cancion, esta el link directo a ella",
      button: "Entendido"
    },
    {
      title: "ESPERO TE GUSTE",
      message: "",
      button: "Entrar"
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
    localStorage.setItem('rokola_tutorial_seen', 'true');
    if (onClose) onClose();
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-4 pt-4">
                  <h3 className="text-4xl md:text-5xl font-display italic text-white leading-tight">{steps[currentStep].title}</h3>
                  {steps[currentStep].message && (
                    <p className="text-xl font-body opacity-60 leading-relaxed italic">{steps[currentStep].message}</p>
                  )}
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-wine-red text-white py-6 rounded-2xl font-body uppercase tracking-[0.3em] text-[10px] font-bold hover:brightness-125 transition-all shadow-xl active:scale-95 mt-4"
                >
                  {steps[currentStep].button}
                </button>
              </motion.div>
            </AnimatePresence>
            
            <div className="mt-12 flex justify-center gap-2">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === currentStep ? 'w-8 bg-wine-red' : 'bg-white/10'}`} 
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
