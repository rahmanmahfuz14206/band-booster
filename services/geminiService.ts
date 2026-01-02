
import { GoogleGenAI, Type } from "@google/genai";
import { EnhancementResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhanceWriting = async (input: string, targetBand: number): Promise<EnhancementResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `You are an expert IELTS examiner. 
    The user is aiming for a Band ${targetBand.toFixed(1)}.
    Transform the following sentence into an version that perfectly matches the criteria for IELTS Band ${targetBand.toFixed(1)}.
    Ensure the vocabulary and grammar are realistic and achievable for this specific band level. 
    Avoid making it overly complex if the band is lower (e.g., 5.0-6.0), but ensure it is sophisticated for higher bands (8.0-9.0).
    
    Provide multiple structural variations (active, passive, complex, compound, paraphrased) suitable for this level.

    Sentence: "${input}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          original: { type: Type.STRING },
          targetVersion: { type: Type.STRING },
          explanation: { type: Type.STRING },
          variants: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                sentence: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["category", "sentence", "explanation"]
            }
          }
        },
        required: ["original", "targetVersion", "explanation", "variants"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  const parsed = JSON.parse(text);
  return { ...parsed, targetBand };
};
