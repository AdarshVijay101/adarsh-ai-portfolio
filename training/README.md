# Model Training & Distillation

This directory contains scripts and configurations for creating the "Adarsh-bot" dataset and fine-tuning a small model (distillation).

## Workflow

1.  **Data Generation**:
    Run `python generate_dataset.py` to:
    -   Read all Markdown files from `../kb/`.
    -   Chunk content into logical segments.
    -   Use a Teacher LLM (GPT-4o) to generate synthetic User/Assistant turns.
    -   Output: `data/finetune.jsonl`.

2.  **Schema**:
    Each JSONL line follows the standard chat format:
    ```json
    {
      "messages": [
        {"role": "system", "content": "You are Adarsh-bot..."},
        {"role": "user", "content": "User question"},
        {"role": "assistant", "content": "Grounded answer... **Sources**: experience.md"}
      ]
    }
    ```

3.  **Fine-Tuning**:
    -   Use QLoRA (Quantized Low-Rank Adaptation) on a foundation model like Llama-3-8B or Mistral-7B.
    -   Config: `finetune_config.yaml`.

## Setup
```bash
pip install openai pandas langchain tiktoken
export OPENAI_API_KEY=sk-...
```
