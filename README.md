# Adarsh AI Portfolio

A premium, agentic AI portfolio for **Adarsh Vijay Krishnakumar**, featuring a grounded RAG chatbot ("Adarsh-bot"), interactive case studies, and a privacy-focused professional showcase.

## Tech Stack
-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4 + Shadcn/UI
-   **AI/RAG**: Python (FastAPI) + OpenAI + Vector Store (planned)
-   **Diagrams**: React Flow

## Directory Structure
-   `apps/web`: Next.js functionality.
-   `apps/api`: Python FastAPI backend for the chatbot.
-   `kb/`: Markdown source of truth for the bot (Experience, Projects, Skills).
-   `persona/`: Definitions for bot voice and allowlist.
-   `training/`: Scripts for distilling the knowledge base into a fine-tuning dataset.

## Getting Started

### 1. Backend Setup (AI & Games)
The Python backend handles RAG, Chat, and Game Logic.
```bash
cd apps/api
# Create virtual environment
python -m venv venv
# Activate (Windows)
.\venv\Scripts\activate
# Install requirements
pip install -r requirements.txt
# Run Server
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
```

### 2. Frontend Setup (Web)
Next.js web application.
```bash
cd apps/web
# Install dependencies
npm install
# Run Development Server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. CMS / Admin
To manage your profile (Availability, Bio, Projects):
- Go to `http://localhost:3000/admin/login`
- Default Credentials: `admin` / `admin123`

## Features

### Chatbot (Adarsh-bot)
- **RAG Architecture**: Uses `chromadb` for vector storage and `OpenAI/LLM` for retrieval.
- **Grounded**: Answers solely based on `kb/` markdown files.

### AI Games (Beta)
- **Connect Four**: Play against AI personas (Grok, Gemini, OpenAI) powered by Python engine.
- **Sketch & Guess**: Draw on canvas, and the AI (Vision API) guesses your drawing.

## Deployment
This is a **Hybrid Stack**. You need to deploy both:
1.  **Frontend (`apps/web`)**: Deploy to **Vercel**. Set Root Directory to `apps/web`.
2.  **Backend (`apps/api`)**: Deploy to **Railway / Render** or a VPS.
    -   Expose Port 8000.
    -   Set `NEXT_PUBLIC_API_URL` in Frontend to point to Backend URL.

## License
Proprietary content of Adarsh Vijay Krishnakumar.
