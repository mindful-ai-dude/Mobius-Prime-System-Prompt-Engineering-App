import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Deep dark gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-mobius-black via-mobius-dark to-[#001a10]"></div>
      
      {/* Abstract Glowing Orbs (Apple-like blur) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-mobius-accent/10 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-emerald-900/20 rounded-full blur-[100px] animate-float"></div>
      
      {/* Grid overlay (Matrix-like structure) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div 
        className="absolute inset-0" 
        style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      ></div>
    </div>
  );
};
