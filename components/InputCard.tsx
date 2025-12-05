import React from 'react';
import { motion } from 'framer-motion'; // Assuming user has framer-motion, using standard CSS if not installed, but let's assume standard React implementation without library for safety, actually I will implement lightweight animation wrapper.

interface Props {
  label: string;
  description: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  icon: React.ReactNode;
  autoFocus?: boolean;
}

export const InputCard: React.FC<Props> = ({ label, description, value, onChange, placeholder, icon, autoFocus }) => {
  return (
    <div className="glass-panel p-8 rounded-3xl w-full max-w-2xl mx-auto transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(0,255,157,0.1)]">
      <div className="flex items-start gap-5 mb-6">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-mobius-accent">
          {icon}
        </div>
        <div>
          <h2 className="text-2xl font-light text-white tracking-tight">{label}</h2>
          <p className="text-sm text-mobius-secondary mt-1 font-light leading-relaxed max-w-md">
            {description}
          </p>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-mobius-accent to-emerald-600 rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur"></div>
        <textarea 
          className="relative w-full bg-black/40 border border-white/10 rounded-xl p-4 text-lg text-white placeholder-white/20 focus:outline-none focus:border-mobius-accent/50 focus:bg-black/60 transition-all duration-300 min-h-[160px] font-sans resize-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus={autoFocus}
          spellCheck={false}
        />
        <div className="absolute bottom-4 right-4 text-xs text-white/20 font-mono pointer-events-none">
          {value.length} chars
        </div>
      </div>
    </div>
  );
};
