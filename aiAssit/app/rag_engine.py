# aiAssit/app/rag_engine.py

import pickle
import os
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.stores import InMemoryStore
from langchain_text_splitters import RecursiveCharacterTextSplitter

# NEW LOCATION FOR VERSION 1.x
from langchain.retrievers import ParentDocumentRetriever

class RAGEngine:
    def __init__(self):
        # Change this line in RAGEngine.__init__
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'} 
        )
        
        # Define paths
        faiss_path = os.path.join("assets", "faiss_index")
        pkl_path = os.path.join("assets", "parent_store.pkl")

        # 1. Check if files exist first
        if not os.path.exists(faiss_path) or not os.path.exists(pkl_path):
            raise FileNotFoundError(f"Missing RAG assets in /assets folder. Need faiss_index and parent_store.pkl")

        # 2. Load FAISS
        self.vector_store = FAISS.load_local(
            faiss_path, 
            self.embeddings, 
            allow_dangerous_deserialization=True
        )

        # 3. Load DocStore
        self.doc_store = InMemoryStore()
        with open(pkl_path, "rb") as f:
            stored_data = pickle.load(f)
            self.doc_store.mset(list(stored_data.items()))

        # 4. Initialize Retriever
        self.retriever = ParentDocumentRetriever(
            vectorstore=self.vector_store,
            docstore=self.doc_store,
            child_splitter=RecursiveCharacterTextSplitter(chunk_size=400),
            parent_splitter=RecursiveCharacterTextSplitter(chunk_size=1600),
        )

    def get_context(self, query: str):
        # This replaces the simple history retrieval with PDF-based retrieval
        docs = self.retriever.invoke(query)
        return "\n\n".join([doc.page_content for doc in docs])