from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import rag
from database import init_db
from routers import admin, games

load_dotenv()

app = FastAPI(title="Adarsh-bot API")

# Initialize Database on Startup
@app.on_event("startup")
def on_startup():
    init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://adarsh-ai-portfolio.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router)
app.include_router(games.router)

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = []

@app.get("/")
def read_root():
    return {"status": "ok", "service": "Adarsh-bot API"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "Adarsh-bot API"}

@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    # 1. Retrieve Context
    context_chunks = rag.query_kb(req.message)
    
    # 2. Format Prompt
    context_str = "\n\n".join([f"Source: {c['source']}\n{c['content']}" for c in context_chunks])
    
    system_prompt = f"""You are Adarsh-bot, the AI portfolio assistant for Adarsh Vijay Krishnakumar.
    
    RULES:
    1. Answer ONLY using the context provided below.
    2. If the answer is not in the context, say "I don't have that information in my knowledge base."
    3. Be professional, concise, and grounded.
    4. At the end of your response, list the unique source filenames used.
    
    CONTEXT:
    {context_str}
    """
    
    # 3. Call LLM (using OpenAI)
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": req.message}
            ],
            temperature=0
        )
        
        answer = completion.choices[0].message.content
        
        unique_sources = list(set([c['source'] for c in context_chunks]))
        
        return {
            "response": answer,
            "citations": unique_sources
        }
        
    except Exception as e:
        print(f"Error: {e}")
        # Fallback if OpenAI key is missing or error
        return {
            "response": "I am having trouble connecting to my brain (OpenAI). Here is the relevant context I found:\n\n" + context_str[:500] + "...",
            "citations": [c['source'] for c in context_chunks]
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
