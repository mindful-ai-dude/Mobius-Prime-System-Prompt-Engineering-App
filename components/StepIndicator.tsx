import React from 'react';
import { WizardStep, STEP_DESCRIPTIONS } from '../types';
import { Check, Circle } from 'lucide-react';

interface Props {
  currentStep: WizardStep;
}

export const StepIndicator: React.FC<Props> = ({ currentStep }) => {
  // Steps 1-5 are the inputs
  const steps = [1, 2, 3, 4, 5];

  return (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center relative">
        {/* Connecting Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 z-0"></div>
        
        {steps.map((step) => {
          const isActive = currentStep === step;
          const isCompleted = currentStep > step;
          
          return (
            <div key={step} className="relative z-10 flex flex-col items-center group">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500
                  ${isActive 
                    ? 'bg-mobius-accent text-black border-mobius-accent shadow-[0_0_20px_rgba(0,255,157,0.4)] scale-110' 
                    : isCompleted 
                      ? 'bg-mobius-dark border-mobius-accent text-mobius-accent' 
                      : 'bg-mobius-black border-white/10 text-white/20'}
                `}
              >
                {isCompleted ? <Check size={18} strokeWidth={3} /> : <span className="font-mono text-sm">{step}</span>}
              </div>
              
              {/* Tooltip/Label */}
              <div className={`
                absolute top-14 w-32 text-center text-xs font-medium tracking-wider uppercase transition-all duration-300
                ${isActive ? 'text-mobius-accent translate-y-0 opacity-100' : 'text-white/30 translate-y-2 opacity-0'}
              `}>
                {STEP_DESCRIPTIONS[step as WizardStep] || ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
