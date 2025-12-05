export type ModelId = 'gemini-3-pro-preview' | 'gemini-2.5-pro' | 'gemini-2.5-flash';

export interface PromptState {
  model: ModelId;
  identity: string;
  objective: string;
  context: string;
  constraints: string;
  format: string;
}

export interface GeneratedResult {
  systemPrompt: string;
  reasoning: string;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

export enum WizardStep {
  INTRO = 0,
  IDENTITY = 1,
  OBJECTIVE = 2,
  CONTEXT = 3,
  CONSTRAINTS = 4,
  FORMAT = 5,
  GENERATING = 6,
  RESULT = 7,
}

export const STEP_DESCRIPTIONS = {
  [WizardStep.INTRO]: "Initialization",
  [WizardStep.IDENTITY]: "Construct Persona Matrix",
  [WizardStep.OBJECTIVE]: "Define Prime Directive",
  [WizardStep.CONTEXT]: "Upload Knowledge Base",
  [WizardStep.CONSTRAINTS]: "Set Boundary Parameters",
  [WizardStep.FORMAT]: "Output Architecture",
  [WizardStep.GENERATING]: "Processing...",
  [WizardStep.RESULT]: "Final Artifact",
};