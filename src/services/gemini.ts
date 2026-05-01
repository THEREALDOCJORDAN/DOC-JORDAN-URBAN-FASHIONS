import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateDesignSuggestions(theme: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest a design concept for all-over printing apparel based on the theme: "${theme}". 
    Include color palette (hex codes), key visual elements, and a description of the "core design flow" (how the pattern should wrap or repeat).
    Return as JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          conceptName: { type: Type.STRING },
          colors: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          elements: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          flowDescription: { type: Type.STRING },
          promptForImageGen: { type: Type.STRING, description: "A detailed prompt to generate a seamless pattern image" }
        },
        required: ["conceptName", "colors", "elements", "flowDescription", "promptForImageGen"]
      }
    }
  });

  return JSON.parse(response.text);
}

export async function generatePatternImage(prompt: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `Create a high-quality, high-resolution, seamless repeat pattern for fabric printing. Theme: ${prompt}. The pattern should be clean and professional.` },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
