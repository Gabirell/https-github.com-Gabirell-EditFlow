import { GoogleGenAI, Type } from "@google/genai";
import { ShortcutResult, Software, OS, Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const searchShortcuts = async (
  query: string,
  software: Software,
  os: OS,
  softwareLanguage: Language,
  uiLanguage: Language
): Promise<ShortcutResult[]> => {
  if (!query.trim()) return [];

  const langContext = uiLanguage === Language.SPANISH ? 'Spanish' : uiLanguage === Language.PORTUGUESE ? 'Brazilian Portuguese' : 'English';

  const systemInstruction = `
    You are an expert video editing assistant.
    Your task is to provide keyboard shortcuts for: ${software}
    Target OS: ${os}
    Software UI Language: ${softwareLanguage}

    IMPORTANT: 
    - Provide shortcuts for the LATEST versions (e.g., Premiere Pro 2024+, DaVinci Resolve 19, Blender 4.2+).
    - If the user query is vague, suggest the most common related shortcuts.
    - Return a JSON array of objects.
    - Translate 'action' and 'description' into ${langContext}.
    - The 'keys' array must contain the specific keys for ${os} (e.g., 'Cmd', 'Opt', 'Shift' for Mac; 'Ctrl', 'Alt', 'Shift' for Windows).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              action: { type: Type.STRING },
              keys: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }
              },
              description: { type: Type.STRING },
              context: { type: Type.STRING }
            },
            required: ["action", "keys", "description", "context"]
          }
        }
      }
    });

    const text = response.text;
    return text ? JSON.parse(text) : [];
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to fetch shortcuts. Please check your connection.");
  }
};