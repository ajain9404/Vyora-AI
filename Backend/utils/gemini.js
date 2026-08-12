import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function getGeminiResponse (message) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini Error:", err);
    throw err;
  }
}

export default getGeminiResponse ;