import { GoogleGenAI } from "@google/genai";
import { PromptState, GeneratedResult } from "../types";

export async function generateMobiusPrompt(data: PromptState, manualApiKey?: string): Promise<GeneratedResult> {
  const { model, identity, objective, context, constraints, format } = data;

  // Prioritize the manual key if provided, otherwise fallback to process.env.API_KEY
  // This allows both manual entry (Free/Paid keys) and platform-injected keys
  const apiKey = manualApiKey || process.env.API_KEY;

  if (!apiKey) {
    throw new Error("Access Denied: No API Key provided. Please enter a valid Gemini API Key.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // The Mobius Meta-Prompt
  // This instructs Gemini to act as a world-class prompt engineer
  const metaPrompt = `
    You are MOBIUS PRIME, an advanced Prompt Engineering Architect. 
    Your goal is to construct a "World-Class" System Prompt based on user inputs.
    
    USER INPUTS:
    1. Identity/Persona: ${identity}
    2. Primary Objective: ${objective}
    3. Context/Knowledge: ${context}
    4. Constraints: ${constraints}
    5. Output Format: ${format}

    INSTRUCTIONS:
    1. Research the specific topics mentioned in the "Context" or "Identity" using Google Search if they refer to specific real-world technologies, events, or frameworks (e.g., "React 19", "US Tax Code 2025") to ensure the system prompt contains accurate, high-level instructions.
    2. Synthesize a coherent, highly detailed System Prompt. 
    3. Structure the System Prompt with clear delimiters (XML or Markdown sections).
    4. Include a "Chain of Thought" or "Reasoning Protocol" section in the generated prompt if the task is complex.
    5. Return the response in a structured JSON format containing the 'systemPrompt' and a 'reasoning' field explaining why you structured it that way.

    The final system prompt you generate should use advanced techniques like:
    - Role Prompting
    - Few-Shot Prompting (placeholders)
    - Chain-of-Thought guidance
    - Delimiter usage
  `;

  try {
    const response = await ai.models.generateContent({
      model: model, // Use the user-selected model
      contents: metaPrompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable grounding
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response generated from Gemini");
    }

    // Parse the JSON response
    const parsed = JSON.parse(responseText);

    // Extract grounding sources if available
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => {
        if (chunk.web) {
          return { title: chunk.web.title, url: chunk.web.uri };
        }
        return null;
      })
      .filter((source: any) => source !== null) || [];

    return {
      systemPrompt: parsed.systemPrompt || "Error parsing system prompt.",
      reasoning: parsed.reasoning || "No reasoning provided.",
      sources: sources
    };

  } catch (error) {
    console.error("Mobius Generation Error:", error);
    throw error;
  }
}