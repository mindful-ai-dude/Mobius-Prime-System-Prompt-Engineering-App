import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Background } from './components/Background';
import { StepIndicator } from './components/StepIndicator';
import { InputCard } from './components/InputCard';
import { generateMobiusPrompt } from './services/gemini';
import { PromptState, WizardStep, GeneratedResult, STEP_DESCRIPTIONS, ModelId } from './types';
import { 
  Bot, 
  Target, 
  Database, 
  ShieldAlert, 
  LayoutTemplate, 
  Cpu, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Copy,
  CheckCircle,
  ExternalLink,
  Key,
  Zap,
  BrainCircuit,
  Settings,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<WizardStep>(WizardStep.INTRO);
  const [data, setData] = useState<PromptState>({
    model: 'gemini-3-pro-preview', // Default
    identity: '',
    objective: '',
    context: '',
    constraints: '',
    format: ''
  });
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  // Auth State
  const [apiKeySet, setApiKeySet] = useState(false); // Tracks platform/env key
  const [manualApiKey, setManualApiKey] = useState(''); // Tracks user entered key
  const [showKey, setShowKey] = useState(false);

  // Check API Key status (Platform/Env)
  useEffect(() => {
    const checkKey = async () => {
      // Fixed: Use type assertion to access aistudio safely without type conflict
      const aistudio = (window as any).aistudio;
      if (aistudio && aistudio.hasSelectedApiKey) {
        const hasKey = await aistudio.hasSelectedApiKey();
        setApiKeySet(hasKey);
      } else if (process.env.API_KEY) {
        // Fallback for dev environments where env var is set
        setApiKeySet(true); 
      }
    };
    checkKey();
  }, []);

  const handleConnectKey = async () => {
    // Fixed: Use type assertion to access aistudio safely without type conflict
    const aistudio = (window as any).aistudio;
    if (aistudio && aistudio.openSelectKey) {
      await aistudio.openSelectKey();
      setApiKeySet(true);
    }
  };

  // Smooth scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Ensure document title matches the app name
  useEffect(() => {
    document.title = "Mobius Prime - System Prompt Engineering App";
  }, []);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > WizardStep.INTRO) setStep(prev => prev - 1);
  };

  const handleGenerate = async () => {
    setStep(WizardStep.GENERATING);
    setError(null);
    try {
      // Pass manual key if it exists, otherwise service falls back to env
      const res = await generateMobiusPrompt(data, manualApiKey);
      setResult(res);
      setStep(WizardStep.RESULT);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "The Mobius Protocol encountered an error connecting to the neural core (API). Please check your API Key and try again.");
      setStep(WizardStep.FORMAT); // Go back one step
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.systemPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setData(prev => ({
        ...prev,
        identity: '',
        objective: '',
        context: '',
        constraints: '',
        format: ''
    }));
    setResult(null);
    setStep(WizardStep.INTRO);
  }

  // Helper to determine if we can proceed
  const isAuthReady = apiKeySet || manualApiKey.length > 10;

  // Render Helpers
  const renderContent = () => {
    switch (step) {
      case WizardStep.INTRO:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-5xl mx-auto px-6">
            <div className="mb-8 relative">
              <div className="absolute inset-0 bg-mobius-accent blur-[60px] opacity-20"></div>
              <Cpu size={80} className="text-mobius-accent relative z-10 animate-pulse-slow" strokeWidth={1} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              MOBIUS <span className="text-mobius-accent neon-text">PRIME</span>
            </h1>
            <h2 className="text-lg md:text-xl font-mono text-mobius-accent/80 mb-6 tracking-wide uppercase">
              System Prompt Engineering App
            </h2>
            
            <p className="text-xl text-mobius-secondary mb-12 font-light leading-relaxed max-w-xl mx-auto">
              Construct high-fidelity system prompts through our advanced interrogation protocol. 
              Grounded in real-time data, architected for complex reasoning.
            </p>

            {/* Onboarding Configuration Panel */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
              
              {/* API Key Section */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col hover:border-mobius-accent/30 transition-colors">
                 <div className="flex items-center gap-3 mb-3 text-white">
                    <div className="p-2 bg-white/5 rounded-lg text-mobius-accent"><Key size={20} /></div>
                    <h3 className="font-semibold tracking-wide">Uplink Authentication</h3>
                 </div>
                 <p className="text-sm text-mobius-secondary mb-4 min-h-[40px]">
                   Enter your <span className="text-white">Gemini API Key</span> (Free or Paid) to access the Neural Core.
                 </p>
                
                <div className="space-y-4">
                  {/* Manual Entry */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/30">
                      <Lock size={14} />
                    </div>
                    <input 
                      type={showKey ? "text" : "password"}
                      value={manualApiKey}
                      onChange={(e) => setManualApiKey(e.target.value)}
                      placeholder="Paste AIStudio Key (AIza...)"
                      className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-white/20 focus:outline-none focus:border-mobius-accent/50 focus:bg-black/60 transition-all font-mono"
                    />
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="absolute inset-y-0 right-3 flex items-center text-white/30 hover:text-white/60"
                    >
                      {showKey ? <EyeOff size={14}/> : <Eye size={14} />}
                    </button>
                  </div>

                  {/* Or Divider */}
                  <div className="flex items-center gap-3 text-xs text-white/20">
                    <div className="h-[1px] bg-white/10 flex-1"></div>
                    <span>OR</span>
                    <div className="h-[1px] bg-white/10 flex-1"></div>
                  </div>

                  {/* Platform Key Button */}
                  <button 
                    onClick={handleConnectKey}
                    disabled={apiKeySet}
                    className={`
                      w-full py-2.5 rounded-xl border font-mono text-xs transition-all duration-300 flex items-center justify-center gap-2
                      ${apiKeySet 
                        ? 'bg-mobius-accent/10 border-mobius-accent/50 text-mobius-accent cursor-default' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}
                    `}
                  >
                    {apiKeySet ? <><CheckCircle size={14}/> ENVIRONMENT KEY ACTIVE</> : 'USE PLATFORM KEY'}
                  </button>
                </div>
              </div>

              {/* Model Selection Section */}
              <div className="glass-panel p-6 rounded-2xl flex flex-col hover:border-mobius-accent/30 transition-colors">
                 <div className="flex items-center gap-3 mb-4 text-white">
                    <div className="p-2 bg-white/5 rounded-lg text-mobius-accent"><BrainCircuit size={20} /></div>
                    <h3 className="font-semibold tracking-wide">Select Neural Core</h3>
                 </div>
                 
                 <div className="space-y-2">
                    {[
                      { id: 'gemini-3-pro-preview', name: 'Gemini 3.0 Pro', desc: 'Max reasoning & complexity' },
                      { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', desc: 'Balanced high-performance' },
                      { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'High speed optimization' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setData({...data, model: m.id as ModelId})}
                        className={`
                          w-full p-3 rounded-lg border text-left transition-all duration-200 flex items-center justify-between group
                          ${data.model === m.id 
                            ? 'bg-mobius-accent/10 border-mobius-accent text-white' 
                            : 'bg-black/20 border-white/5 text-mobius-secondary hover:bg-white/5'}
                        `}
                      >
                        <div>
                          <div className={`text-sm font-medium ${data.model === m.id ? 'text-mobius-accent' : 'text-white group-hover:text-white'}`}>{m.name}</div>
                          <div className="text-xs opacity-60">{m.desc}</div>
                        </div>
                        {data.model === m.id && <div className="w-2 h-2 rounded-full bg-mobius-accent shadow-[0_0_10px_#00ff9d]"></div>}
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <button 
              onClick={handleNext}
              disabled={!isAuthReady}
              className={`
                group relative px-10 py-5 font-bold tracking-wide rounded-full flex items-center gap-3 transition-all duration-300
                ${isAuthReady 
                  ? 'bg-white text-black hover:scale-105 hover:bg-mobius-accent hover:shadow-[0_0_40px_rgba(0,255,157,0.4)]' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/5'}
              `}
            >
              <span>{isAuthReady ? 'INITIALIZE PROTOCOL' : 'AWAITING AUTHENTICATION'}</span>
              <ArrowRight size={18} className={`transition-transform ${isAuthReady ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </div>
        );

      case WizardStep.IDENTITY:
        return (
          <InputCard
            label="Identity Construct"
            description="Who is the AI? Define its persona, expertise level, and tone. Be specific (e.g., 'Senior React Engineer with 10 years experience' vs 'Coder')."
            icon={<Bot size={24} />}
            value={data.identity}
            onChange={(val) => setData({ ...data, identity: val })}
            placeholder="e.g., You are an expert Constitutional Lawyer specializing in maritime law. You have a dry, academic tone but explain concepts clearly..."
            autoFocus
          />
        );

      case WizardStep.OBJECTIVE:
        return (
          <InputCard
            label="Prime Directive"
            description="What is the singular goal of this agent? What specific problem is it solving?"
            icon={<Target size={24} />}
            value={data.objective}
            onChange={(val) => setData({ ...data, objective: val })}
            placeholder="e.g., Your goal is to review user-submitted contracts and identify potential liability clauses based on current US regulations..."
            autoFocus
          />
        );

      case WizardStep.CONTEXT:
        return (
          <InputCard
            label="Knowledge Base"
            description="What context does the AI need? Mention specific frameworks, documents, or real-world events. Our system will use Search Grounding to verify these details."
            icon={<Database size={24} />}
            value={data.context}
            onChange={(val) => setData({ ...data, context: val })}
            placeholder="e.g., Use React 19 server components. Reference the 2024 AWS Well-Architected Framework..."
            autoFocus
          />
        );

      case WizardStep.CONSTRAINTS:
        return (
          <InputCard
            label="Boundary Parameters"
            description="What should the AI NOT do? Define safety rails, length limits, and negative constraints."
            icon={<ShieldAlert size={24} />}
            value={data.constraints}
            onChange={(val) => setData({ ...data, constraints: val })}
            placeholder="e.g., Do not provide legal advice. Never use markdown code blocks for simple text. Keep responses under 200 words..."
            autoFocus
          />
        );

      case WizardStep.FORMAT:
        return (
          <InputCard
            label="Output Architecture"
            description="How should the response be structured? Markdown, JSON, Tables, or a specific template?"
            icon={<LayoutTemplate size={24} />}
            value={data.format}
            onChange={(val) => setData({ ...data, format: val })}
            placeholder="e.g., Return a JSON object with fields 'summary', 'risk_score', and 'recommendation'..."
            autoFocus
          />
        );

      case WizardStep.GENERATING:
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <div className="relative w-24 h-24 mb-8">
               <div className="absolute inset-0 border-t-2 border-mobius-accent rounded-full animate-spin"></div>
               <div className="absolute inset-2 border-r-2 border-white/20 rounded-full animate-spin [animation-duration:3s]"></div>
               <div className="absolute inset-4 border-b-2 border-white/10 rounded-full animate-spin [animation-duration:1.5s]"></div>
               <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-mobius-accent animate-pulse" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h2 className="text-3xl font-light text-white">Synthesizing</h2>
              <div className="text-xs font-mono text-mobius-accent bg-mobius-accent/10 px-2 py-1 rounded border border-mobius-accent/20">
                Running on {data.model}
              </div>
            </div>
            <p className="text-mobius-secondary font-mono text-sm animate-pulse mt-4">
              Running Search Grounding... <br/>
              Constructing Chain of Thought...
            </p>
          </div>
        );

      case WizardStep.RESULT:
        if (!result) return null;
        return (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Artifact Generated</h2>
                <div className="flex gap-4 text-sm text-mobius-secondary">
                  <span className="flex items-center gap-1"><CheckCircle size={14} className="text-mobius-accent"/> Syntax Verified</span>
                  <span className="flex items-center gap-1"><CheckCircle size={14} className="text-mobius-accent"/> Grounding Applied</span>
                  <span className="flex items-center gap-1 font-mono text-xs border border-white/10 px-2 rounded-full">{data.model}</span>
                </div>
              </div>
              <div className="flex gap-3">
                 <button 
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-white/60 transition-colors flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  New Prompt
                </button>
                <button 
                  onClick={copyToClipboard}
                  className={`
                    px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-300
                    ${copied ? 'bg-mobius-accent text-black' : 'bg-white text-black hover:bg-gray-200'}
                  `}
                >
                  {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                  {copied ? 'Copied' : 'Copy System Prompt'}
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Col: Reasoning & Sources */}
              <div className="lg:col-span-1 space-y-6">
                <div className="glass-panel p-6 rounded-2xl">
                  <h3 className="text-sm font-bold text-mobius-accent uppercase tracking-wider mb-4">Mobius Reasoning</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {result.reasoning}
                  </p>
                </div>

                {result.sources && result.sources.length > 0 && (
                  <div className="glass-panel p-6 rounded-2xl border-mobius-accent/20">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Database size={14} /> Grounding Sources
                    </h3>
                    <ul className="space-y-3">
                      {result.sources.map((source, idx) => (
                        <li key={idx}>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-mobius-secondary hover:text-mobius-accent transition-colors flex items-start gap-2 group"
                          >
                            <ExternalLink size={12} className="mt-0.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                            <span className="line-clamp-2">{source.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Col: The Prompt */}
              <div className="lg:col-span-2">
                <div className="glass-panel rounded-2xl overflow-hidden border-mobius-accent/30 shadow-[0_0_50px_-20px_rgba(0,255,157,0.1)]">
                   <div className="bg-black/40 border-b border-white/10 px-4 py-2 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                      <span className="ml-2 font-mono text-xs text-white/30">system_prompt.md</span>
                   </div>
                   <pre className="p-6 overflow-x-auto text-sm font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
                     {result.systemPrompt}
                   </pre>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const isInputStep = step > WizardStep.INTRO && step < WizardStep.GENERATING;

  return (
    <div className="min-h-screen font-sans selection:bg-mobius-accent selection:text-black pb-20">
      <Background />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div className="font-bold tracking-widest text-sm text-white/40 pointer-events-auto">
          MOBIUS // PRIME
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          {isAuthReady && step > WizardStep.INTRO && (
            <div className="flex items-center gap-2 text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
               <Key size={10} /> SECURED
            </div>
          )}
          <div className="text-xs font-mono text-mobius-accent/60 bg-mobius-accent/5 px-3 py-1 rounded border border-mobius-accent/10">
            {step === WizardStep.INTRO ? 'V 2.5 // ONLINE' : data.model.toUpperCase()}
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="container mx-auto px-4 pt-32 relative z-10">
        
        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-center gap-3">
             <ShieldAlert size={18} />
             {error}
          </div>
        )}

        {/* Step Progress (Only show during inputs) */}
        {isInputStep && <StepIndicator currentStep={step} />}

        {/* Dynamic Content */}
        {renderContent()}

        {/* Navigation Buttons */}
        {isInputStep && (
          <div className="fixed bottom-10 left-0 right-0 flex justify-center gap-4 z-40 pointer-events-none">
            <button 
              onClick={handleBack}
              className="pointer-events-auto px-6 py-3 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/60 hover:text-white transition-colors font-medium"
            >
              Back
            </button>
            <button 
              onClick={step === WizardStep.FORMAT ? handleGenerate : handleNext}
              disabled={
                (step === WizardStep.IDENTITY && !data.identity) ||
                (step === WizardStep.OBJECTIVE && !data.objective)
              }
              className={`
                pointer-events-auto px-8 py-3 rounded-full font-bold tracking-wide shadow-lg transition-all duration-300 flex items-center gap-2
                ${(step === WizardStep.IDENTITY && !data.identity) || (step === WizardStep.OBJECTIVE && !data.objective)
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-mobius-accent hover:shadow-[0_0_30px_rgba(0,255,157,0.4)]'}
              `}
            >
              {step === WizardStep.FORMAT ? 'GENERATE' : 'NEXT'}
              {step !== WizardStep.FORMAT && <ArrowRight size={16} />}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;