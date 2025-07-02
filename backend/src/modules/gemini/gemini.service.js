import { GoogleGenAI } from "@google/genai";
import spaceTopics from "../../config/spaceTopics.js";
import { buildGenerateFactPrompt } from "../../utils/promptBuilder.js";

class GeminiService {
  constructor() {
    this.gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateSpaceFacts() {
    const prompt = buildGenerateFactPrompt(spaceTopics);

    const response = await this.gemini.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: [{ text: prompt }],
      config: {
        temperature: 0.9,
        topP: 0.9,
        frequencyPenalty: 1.0,
        presencePenalty: 0.5
      },
    });
    const text = response.text;
    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/```$/, "")
      .trim();
    return JSON.parse(cleaned);
  }
}

export default GeminiService;
