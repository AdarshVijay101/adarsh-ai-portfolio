import os
import glob
from typing import List, Dict
import chromadb
from chromadb.utils import embedding_functions

# Initialize Client
# For production, we would use persistent storage. For demo/MVP, this re-indexes on reload.
client = chromadb.Client()
collection = client.create_collection(
    name="adarsh_portfolio",
    embedding_function=embedding_functions.DefaultEmbeddingFunction(),
    get_or_create=True
)

KB_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "kb")

def load_kb():
    """Reads all markdown files from KB_DIR and chunks them."""
    if not os.path.exists(KB_DIR):
        print(f"Warning: KB_DIR {KB_DIR} does not exist.")
        return

    files = glob.glob(os.path.join(KB_DIR, "*.md"))
    documents = []
    metadatas = []
    ids = []
    
    for file_path in files:
        filename = os.path.basename(file_path)
        try:
            # Try utf-8-sig to handle BOM which is common on Windows
            with open(file_path, "r", encoding="utf-8-sig", errors="ignore") as f:
                content = f.read()
        except Exception as e:
            print(f"Skipping {filename} due to read error: {e}")
            continue
            
        # Simple chunking by sections (headers)
        chunks = content.split("\n## ")
        for i, chunk in enumerate(chunks):
            # Clean up headers
            clean_chunk = "## " + chunk if i > 0 else chunk
            
            documents.append(clean_chunk)
            metadatas.append({"source": filename})
            ids.append(f"{filename}_{i}")
            
    if len(documents) > 0:
        print(f"Indexing {len(documents)} chunks from {len(files)} files...")
        try:
            collection.add(
                documents=documents,
                metadatas=metadatas,
                ids=ids
            )
        except Exception as e:
            print(f"Error adding to Chroma: {e}")

def query_kb(query: str, n_results=3):
    """Retrieves top N chunks for a query."""
    if collection.count() == 0:
        return []

    try:
        results = collection.query(
            query_texts=[query],
            n_results=n_results
        )
        
        # Format results
        retrieved = []
        if results['documents'] and len(results['documents']) > 0:
            for i, doc in enumerate(results['documents'][0]):
                meta = results['metadatas'][0][i]
                retrieved.append({
                    "content": doc,
                    "source": meta["source"]
                })
        return retrieved
    except Exception as e:
        print(f"Query error: {e}")
        return []

# Load on start
load_kb()
