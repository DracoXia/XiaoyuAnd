




// import { GoogleGenAI } from "@google/genai"; // REMOVED
import { AI_PROMPTS, PRESET_REPLIES, PRESET_NICKNAMES } from "../constants";

// Lazy initialization singleton
// let aiInstance: GoogleGenAI | null = null; // REMOVED

/* 
const getAI = () => {
  // REMOVED
};
*/

export interface TreeholeResult {
  reply: string;
  story?: string; // Optional now
  nickname: string;
}

export const GeminiService = {
  async getDailySign(): Promise<string> {
    const signs = [
      "心无挂碍，方见山海。",
      "推门，见山色。",
      "且听风吟，静待花开。",
      "山中无甲子，寒尽不知年。",
      "此间坐久，见山色，见清欢。"
    ];
    return signs[Math.floor(Math.random() * signs.length)];
  },

  // UPDATED: Now uses local presets instead of API
  async getTreeHoleReply(mood: string, context: string, text?: string): Promise<TreeholeResult> {
    // Simulate network latency for anticipation (1.5s - 2.5s)
    const delay = Math.floor(Math.random() * 1000) + 1500;

    return new Promise((resolve) => {
      setTimeout(() => {
        // 1. Select Preset based on Mood + Context
        // @ts-ignore
        const presets = PRESET_REPLIES[mood]?.[context] || PRESET_REPLIES['发发呆']['说不清'];
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
    // Always return true for offline mode
    return true;
  }
};