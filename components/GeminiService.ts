




import { GoogleGenAI } from "@google/genai";
import { AI_PROMPTS, PRESET_REPLIES, PRESET_NICKNAMES } from "../constants";

// Lazy initialization singleton
let aiInstance: GoogleGenAI | null = null;

const getAI = () => {
  if (!aiInstance) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API Key is missing! AI features will function in fallback mode.");
      // 我们不在这里抛出错误，而是允许它失败，以便 UI 仍能渲染
    }
    aiInstance = new GoogleGenAI({ apiKey: apiKey || "dummy-key-to-prevent-crash" });
  }
  return aiInstance;
};

export interface TreeholeResult {
  reply: string;
  story?: string; // Optional now
  nickname: string;
}

export const GeminiService = {
  async getDailySign(): Promise<string> {
    try {
      const ai = getAI();
      const hour = new Date().getHours();
      const timeOfDay = hour < 12 ? "早晨" : hour < 18 ? "午后" : "夜晚";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-lite-preview-02-05',
        contents: AI_PROMPTS.sign(timeOfDay),
      });
      
      return response.text?.trim() || "心无挂碍，方见山海。";
    } catch (error) {
      console.error("AI Sign Error:", error);
      return "推门，见山色。"; // Fallback
    }
  },

  // UPDATED: Now uses local presets instead of API
  async getTreeHoleReply(mood: string, context: string, text?: string): Promise<TreeholeResult> {
    // Simulate network latency for anticipation (1.5s - 2.5s)
    const delay = Math.floor(Math.random() * 1000) + 1500;
    
    return new Promise((resolve) => {
        setTimeout(() => {
            // 1. Select Preset based on Mood
            const presets = PRESET_REPLIES[mood] || PRESET_REPLIES['发发呆']; // Fallback
            const randomReply = presets[Math.floor(Math.random() * presets.length)];

            // 2. Select Random Nickname
            const randomNickname = PRESET_NICKNAMES[Math.floor(Math.random() * PRESET_NICKNAMES.length)];

            resolve({
                reply: randomReply,
                nickname: randomNickname
            });
        }, delay);
    });
  },

  async validateHealingContent(content: string): Promise<boolean> {
      try {
          const ai = getAI();
          const response = await ai.models.generateContent({
              model: 'gemini-2.0-flash-lite-preview-02-05',
              contents: AI_PROMPTS.validate(content)
          });
          const result = response.text?.trim().toUpperCase();
          return result?.includes("PASS") ?? true; // Default to true if unsure, or false? Let's be lenient for MVP: True.
      } catch (error) {
          console.warn("Validation failed, allowing content.", error);
          return true;
      }
  }
};