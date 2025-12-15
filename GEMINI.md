# Project Context: Sol de Tangay - Exclusive Real Estate

## Project Overview
"Sol de Tangay" is a modern real estate web application for a development project in Nuevo Chimbote, Peru. It features an interactive "Dream House Generator" powered by Google's Gemini and Veo AI models, allowing users to visualize potential homes in the project's location.

## Tech Stack
- **Framework:** React 19 (via Vite 6)
- **Language:** TypeScript (~5.8)
- **Styling:** Tailwind CSS (inferred), Framer Motion (animations)
- **Routing:** React Router DOM v7
- **Icons:** Lucide React
- **AI Integration:** Google GenAI SDK (`@google/genai`)

## Key Features
- **Dream House Generator:** Uses Google Veo (`veo-3.1-fast-generate-preview`) to generate architectural timelapse videos. The prompt is "engineered" to include a "SOL DE TANGAY" sign and specific cinematic lighting.
- **Location Intelligence:** Uses Gemini (`gemini-2.5-flash`) with Google Maps Grounding to provide accurate information about the Nuevo Chimbote area (restaurants, schools, etc.).
- **Responsive Design:** Modern UI.

## Directory Structure
The project appears to use the root directory as the source root (or has a flat structure):
- **`App.tsx`**: Main application component.
- **`components/`**: Reusable UI components (`DreamHouseGenerator.tsx`, `Layout.tsx`, etc.).
- **`pages/`**: Route views (`Home.tsx`, `About.tsx`, etc.).
- **`services/`**:
    - `geminiService.ts`: Encapsulates all interactions with Google's GenAI API.
- **`vite.config.ts`**: Configuration for the build server (Port 3000).

## Setup & Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Ensure you have a `.env.local` file with your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

3.  **Development Server:**
    ```bash
    npm run dev
    ```
    Runs on `http://localhost:3000`.

4.  **Build:**
    ```bash
    npm run build
    ```

## Development Conventions
- **AI Service:** All AI logic (Gemini & Veo) is centralized in `services/geminiService.ts`.
    - **Veo:** Uses `veo-3.1-fast-generate-preview`. Prompts are modified to include "Sol de Tangay" branding.
    - **Gemini:** Uses `gemini-2.5-flash` with `googleMaps` tool for location queries.
- **Routing:** Uses `react-router-dom`.
- **Styling:** Follows Tailwind CSS utility patterns.
- **State:** Standard React hooks (`useState`, `useEffect`).
