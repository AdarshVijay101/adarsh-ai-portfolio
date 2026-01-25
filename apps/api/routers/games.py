from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Optional, Literal
import random
import os
import json

router = APIRouter(prefix="/games", tags=["games"])

# --- Connect Four Models ---
class ConnectFourState(BaseModel):
    board: List[List[int]]  # 6 rows, 7 cols. 0=empty, 1=human, 2=ai
    difficulty: Literal["easy", "medium", "hard", "agent"] = "medium"
    provider: Optional[str] = "openai"

class MoveResponse(BaseModel):
    col: int
    comment: Optional[str] = None

# --- Sketch Models ---
class SketchRequest(BaseModel):
    image: str  # base64 string
    provider: Literal["openai", "gemini", "grok"] = "openai"

# --- Connect Four Logic ---
ROWS = 6
COLS = 7

def check_winner(board, piece):
    # Check horizontal
    for r in range(ROWS):
        for c in range(COLS - 3):
            if board[r][c] == piece and board[r][c+1] == piece and board[r][c+2] == piece and board[r][c+3] == piece:
                return True
    # Check vertical
    for r in range(ROWS - 3):
        for c in range(COLS):
            if board[r][c] == piece and board[r+1][c] == piece and board[r+2][c] == piece and board[r+3][c] == piece:
                return True
    # Check diagonals
    for r in range(ROWS - 3):
        for c in range(COLS - 3):
            if board[r][c] == piece and board[r+1][c+1] == piece and board[r+2][c+2] == piece and board[r+3][c+3] == piece:
                return True
    for r in range(3, ROWS):
        for c in range(COLS - 3):
            if board[r][c] == piece and board[r-1][c+1] == piece and board[r-2][c+2] == piece and board[r-3][c+3] == piece:
                return True
    return False

def get_valid_locations(board):
    valid_locations = []
    for c in range(COLS):
        if board[0][c] == 0:
            valid_locations.append(c)
    return valid_locations

def score_position(board, piece):
    score = 0
    center_array = [row[COLS//2] for row in board]
    center_count = center_array.count(piece)
    score += center_count * 3
    return score

def minimax(board, depth, alpha, beta, maximizingPlayer):
    valid_locations = get_valid_locations(board)
    is_terminal = check_winner(board, 1) or check_winner(board, 2) or len(valid_locations) == 0
    
    if depth == 0 or is_terminal:
        if is_terminal:
            if check_winner(board, 2):
                return (None, 100000000000)
            elif check_winner(board, 1):
                return (None, -100000000000)
            else:
                return (None, 0)
        else:
            return (None, score_position(board, 2))
            
    if maximizingPlayer:
        value = -float('inf')
        column = random.choice(valid_locations)
        for col in valid_locations:
            row = -1
            for r in range(ROWS-1, -1, -1):
                if board[r][col] == 0:
                    row = r
                    break
            b_copy = [row[:] for row in board]
            b_copy[row][col] = 2
            new_score = minimax(b_copy, depth-1, alpha, beta, False)[1]
            if new_score > value:
                value = new_score
                column = col
            alpha = max(alpha, value)
            if alpha >= beta:
                break
        return column, value
    else: 
        value = float('inf')
        column = random.choice(valid_locations)
        for col in valid_locations:
            row = -1
            for r in range(ROWS-1, -1, -1):
                if board[r][col] == 0:
                    row = r
                    break
            b_copy = [row[:] for row in board]
            b_copy[row][col] = 1
            new_score = minimax(b_copy, depth-1, alpha, beta, True)[1]
            if new_score < value:
                value = new_score
                column = col
            beta = min(beta, value)
            if alpha >= beta:
                break
        return column, value

@router.post("/connect4/move", response_model=MoveResponse)
async def connect4_move(state: ConnectFourState):
    valid_cols = get_valid_locations(state.board)
    
    if not valid_cols:
        raise HTTPException(status_code=400, detail="Board is full")

    if state.difficulty == "agent":
        # Select Persona based on provider
        system_prompt = "You are a competitive Connect Four player."
        if state.provider == "grok":
            system_prompt = "You are Grok, a rebellious and witty AI. Roast the user while playing Connect Four. Be snarky."
        elif state.provider == "gemini":
            system_prompt = "You are Gemini, a helpful and excited AI. Cheer for the user but try your best to win. Be scientific."
        elif state.provider == "openai":
            system_prompt = "You are GPT-4, a pure logic engine. Analyze the board mathematically and state your probability of winning."

        col, comment = await get_llm_move(state.board, valid_cols, system_prompt)
        return MoveResponse(col=col, comment=comment)
    
    depth = 2 if state.difficulty == "easy" else 4
    col, minimax_score = minimax(state.board, depth, -float('inf'), float('inf'), True)
    
    if col is None:
        col = random.choice(valid_cols)
        
    return MoveResponse(col=col, comment=f"Minimax Engine (Depth {depth}) calculated optimal move: Column {col}")

async def get_llm_move(board, valid_cols, system_prompt):
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        prompt = f"""
        {system_prompt}
        The board is a 6x7 grid (0=Empty, 1=Human, 2=You).
        Board state: {json.dumps(board)}
        Valid columns: {valid_cols}
        
        Task: 
        1. Analyze the board for threats (opponent has 3 in a row).
        2. Analyze opportunities (you have 3 in a row).
        3. Pick the best column from {valid_cols}.
        
        Respond in JSON only: 
        {{ 
          "thinking_process": "<step-by-step reasoning>",
          "col": <int>, 
          "comment": "<what you say to the user>" 
        }}
        """
        
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            response_format={"type": "json_object"}
        )
        
        content = completion.choices[0].message.content
        data = json.loads(content)
        
        col = data.get("col")
        # Strict validation
        if col not in valid_cols:
             return random.choice(valid_cols), f"{data.get('comment', '')} (Auto-corrected invalid move)"
             
        comment = f"[{system_prompt.split(',')[0].replace('You are ', '')}]: {data.get('comment', '')}\n\nThinking: {data.get('thinking_process', 'Calculated best move.')}"
        return col, comment
        
    except Exception as e:
        print(f"LLM Error: {e}")
        return random.choice(valid_cols), "System Warning: Neural Link Disrupted. Falling back to random engine."

@router.post("/sketch/guess")
async def sketch_guess(req: SketchRequest):
    try:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        
        # Image is base64 data URI: "data:image/png;base64,....."
        # OpenAI expects just the url or object.
        
        completion = client.chat.completions.create(
            model="gpt-4o",  # or gpt-4-turbo
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "What is drawn in this sketch? Be brief and funny."},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": req.image
                            }
                        }
                    ]
                }
            ],
            max_tokens=50
        )
        
        guess = completion.choices[0].message.content
        return {"guess": guess, "confidence": 0.9}
        
    except Exception as e:
        print(f"Vision Error: {e}")
        return {"guess": "Use your imagination!", "confidence": 0.0}
