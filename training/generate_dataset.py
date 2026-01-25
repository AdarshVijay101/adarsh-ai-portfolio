import os
import glob
import json
import random

# Initial simple dataset generator
# In a real scenario, we would use an LLM to generate Q&A pairs from each chunk.
# Here, to save tokens/time, we will create a script that prompts the user to verify,
# or we can use a "Teacher" model call. For this artifact, I will write the structure 
# that USES OpenAI to generate the data.

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

KB_DIR = os.path.join(os.path.dirname(__file__), "..", "kb")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "data", "finetune_v1.jsonl")

def generate_qa_pairs():
    """Reads KB files and uses GPT-4 to generate synthetic Q&A training data."""
    
    # Check for API Key
    if not os.getenv("OPENAI_API_KEY"):
        print("Error: OPENAI_API_KEY not found. Cannot generate synthetic data.")
        return

    client = OpenAI()
    
    files = glob.glob(os.path.join(KB_DIR, "*.md"))
    all_examples = []
    
    print(f"Found {len(files)} KB files. Generating synthetic Q&A...")
    
    for file_path in files:
        filename = os.path.basename(file_path)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        prompt = f"""
        You are a dataset generator. Given the following documentation from Adarsh's portfolio ({filename}), generate 3 specific user questions and the correct grounded answer.
        
        FORMAT: Return ONLY a valid JSON array of objects: 
        [{{ "question": "...", "answer": "..." }}, ...]
        
        RULES:
        - Questions should reflect what a recruiter or manager would ask.
        - Answers must use ONLY the content provided.
        - Tone: Professional, first-person ("I built...", "I led...").
        
        CONTENT:
        {content}
        """
        
        try:
            completion = client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role": "user", "content": prompt}],
                response_format={ "type": "json_object" }
            )
            
            # Note: response_format json_object requires json in prompt, which we did.
            # But the output might be wrapped in a key.
            response_text = completion.choices[0].message.content
            data = json.loads(response_text)
            
            # Handle potential wrapper keys
            pairs = data.get("pairs") or data.get("questions") or list(data.values())[0] 
            
            if isinstance(pairs, list):
                for p in pairs:
                    # Format for Llama-3 / ChatML
                    example = {
                        "messages": [
                            {"role": "system", "content": "You are Adarsh-bot, a professional AI portfolio assistant."},
                            {"role": "user", "content": p["question"]},
                            {"role": "assistant", "content": f"{p['answer']} **Sources:** {filename}"}
                        ]
                    }
                    all_examples.append(example)
                    print(f"Generated Q: {p['question']}")
            
        except Exception as e:
            print(f"Failed to generate for {filename}: {e}")

    # Ensure output dir exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        for ex in all_examples:
            f.write(json.dumps(ex) + "\n")
            
    print(f"Successfully generated {len(all_examples)} training examples in {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_qa_pairs()
