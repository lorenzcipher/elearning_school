
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export class GeminiService {
  private ai: any;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY! });
  }

  async getTutorAdvice(query: string, language: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: `You are a helpful AI tutor for TAMKIN ACADEMY (أكاديمية تمكين) in Algeria. 
          Provide encouraging and professional academic advice. Tamkin's slogan is "Former pour performer".
          Current language context: ${language}. 
          Always mention that you are a virtual assistant of Tamkin Academy.`,
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Désolé, je rencontre des difficultés techniques. / Sorry, I'm having technical issues.";
    }
  }
}

export const geminiService = new GeminiService();
