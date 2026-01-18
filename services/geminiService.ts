import { GoogleGenAI, Type } from "@google/genai";
import { ShortcutResult, Software, OS, Language } from "../types";

const apiKey = process.env.API_KEY || '';

/**
 * Advanced sanitizer for public-facing AI apps
 */
const sanitizeQuery = (query: string): string => {
  // Remove potentially malicious characters and limit length
  let sanitized = query.replace(/[#{}[\]\\^`~]/g, '');
  
  // Anti-jailbreak: Remove common prompt injection keywords
  const injectionPatterns = [
    /ignore previous instructions/gi,
    /system prompt/gi,
    /you are now/gi,
    /bypass/gi,
    /execute/gi
  ];
  
  injectionPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '[REDACTED]');
  });

  return sanitized.slice(0, 150).trim();
};

export const searchShortcuts = async (
  query: string,
  software: Software,
  os: OS,
  softwareLanguage: Language,
  uiLanguage: Language
): Promise<ShortcutResult[]> => {
  const sanitizedInput = sanitizeQuery(query);
  if (!sanitizedInput || sanitizedInput.length < 2) return [];

  const ai = new GoogleGenAI({ apiKey });

  const langContext = uiLanguage === Language.SPANISH ? 'Spanish' : uiLanguage === Language.PORTUGUESE ? 'Brazilian Portuguese' : 'English';

  const systemInstruction = `
    You are a professional software shortcut engine.
    Software: ${software}
    OS: ${os}
    Software UI Language: ${softwareLanguage}

    TASK: Find 3-5 keyboard shortcuts matching the user's request.
    
    SECURITY RULES:
    1. ONLY answer with technical shortcuts. 
    2. Do not engage in general conversation.
    3. If the query is not about software shortcuts, return an empty array [].
    4. Translate 'action' and 'description' into ${langContext}.
    5. Output must be VALID JSON only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: sanitizedInput,
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
    if (!text) return [];
    
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed : [];
    
  } catch (error) {
    // SECURITY: Mask internal errors for public use
    console.error("AI service error masked for security.");
    throw new Error("I couldn't find those shortcuts right now. Please try a simpler search.");
  }
};
