
import { GoogleGenAI, Type, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Standard Bot Reply with Search Grounding
 */
export const getBotReply = async (userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userMessage,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are a helpful Facebook business page bot in Bangladesh. 
        Rules:
        1. Always reply in short, polite, human-like Bangla.
        2. Use Google Search if asked about trending products or external info.
        3. If asked for delivery charges, say "ঢাকায় ৬০ টাকা, ঢাকার বাইরে ১২০ টাকা।"
        4. Keep replies extremely concise.`,
      },
    });
    return response.text?.trim() || "দুঃখিত, আমি বুঝতে পারিনি।";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "জি, আপনার মেসেজটি পেয়েছি। একজন এজেন্ট শীঘ্রই কথা বলবে।";
  }
};

/**
 * Pro Admin Assistant with Thinking Mode
 */
export const getProAssistantReply = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: "You are a world-class business operations assistant. Help the admin with complex analysis, strategy, and technical tasks.",
      },
    });
    return response.text || "I'm having trouble thinking right now.";
  } catch (error) {
    console.error("Pro Assistant Error:", error);
    return "The thinking model is currently unavailable.";
  }
};

/**
 * Image Analysis using Pro Vision
 */
export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
          { text: prompt }
        ]
      },
    });
    return response.text || "Could not analyze image.";
  } catch (error) {
    console.error("Image Analysis Error:", error);
    return "Image analysis failed.";
  }
};

/**
 * Audio Transcription using Flash
 */
export const transcribeAudio = async (base64Audio: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { data: base64Audio, mimeType: "audio/wav" } },
          { text: "Transcribe this audio accurately. If it is in Bangla, transcribe in Bangla script." }
        ]
      },
    });
    return response.text || "";
  } catch (error) {
    console.error("Transcription Error:", error);
    return "";
  }
};

/**
 * Text-to-Speech using Flash TTS
 */
export const speakText = async (text: string): Promise<void> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      const audioBuffer = await decodeAudioData(view, audioCtx, 24000, 1);
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.start();
    }
  } catch (error) {
    console.error("TTS Error:", error);
  }
};

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
