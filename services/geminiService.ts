import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Coordinates for Nuevo Chimbote / Sol de Tangay area (approximate based on prompt)
const LOCATION_CENTER = {
  latitude: -9.119,
  longitude: -78.536
};

export const askAboutLocation = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a helpful real estate assistant for the 'Sol de Tangay' project in Nuevo Chimbote, Peru. 
      The user is asking about the area: "${query}".
      Use Google Maps to find real places, restaurants, schools, or landmarks nearby to answer accurately.
      Focus on the benefits of living near these places.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: LOCATION_CENTER
          }
        }
      },
    });

    return response;
  } catch (error) {
    console.error("Error querying Gemini:", error);
    throw error;
  }
};

// --- VEO VIDEO GENERATION ---

export const generateVeoVideo = async (userPrompt: string) => {
  // 1. Check/Request API Key (Mandatory for Veo)
  // @ts-ignore
  if (window.aistudio && window.aistudio.hasSelectedApiKey && window.aistudio.openSelectKey) {
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
  }

  // 2. Create a fresh instance to ensure latest key is used
  const videoAi = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // 3. Construct the Engineered Prompt
  const engineeredPrompt = `
    Photorealistic 8k video, shot on iPhone 15 Pro Max, wide angle lens. 
    SCENE: A beautiful, perfectly flat residential plot of land with vibrant, manicured green grass under a bright blue sky with soft white clouds. The lighting is natural and sunny (golden hour).
    ACTION: A ${userPrompt} constructs itself rapidly brick-by-brick in the center of the frame (Architectural Timelapse style).
    The house grows from the foundation, walls, windows, to the roof in 8 seconds.
    BRANDING: In the background, distinctly visible behind the house, is a large, permanent, elegant stone wall signage that reads "SOL DE TANGAY" in gold metallic letters.
    Style: Raw, authentic, luxury real estate listing vibe. High contrast, sharp focus.
  `;

  try {
    console.log("Starting Veo Generation with prompt:", engineeredPrompt);

    let operation = await videoAi.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: engineeredPrompt,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    // 4. Poll for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000)); // Check every 5s
      operation = await videoAi.operations.getVideosOperation({ operation: operation });
      console.log("Video generation status:", operation.metadata?.state);
    }

    if (operation.error) {
       throw new Error(operation.error.message);
    }

    // 5. Get URI and append Key
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("No video URI returned");

    return `${downloadLink}&key=${process.env.API_KEY}`;

  } catch (error: any) {
    console.error("Veo Error:", error);
    // If 404/Entity Not Found, it usually means the key is invalid/missing for this model
    if (error.message?.includes("Requested entity was not found") || error.message?.includes("404")) {
        // @ts-ignore
        if (window.aistudio?.openSelectKey) {
            // @ts-ignore
            await window.aistudio.openSelectKey();
        }
        throw new Error("Por favor seleccione una API Key válida con acceso a facturación para usar Veo.");
    }
    throw error;
  }
};
