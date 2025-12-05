from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS
import os
from dotenv import load_dotenv

load_dotenv()

def create_vector_db(data_list):
    """
    Converts text data into vectors (numbers) so the AI can search through it.
    """
    # 1. Get API Key explicitly to prevent "DefaultCredentialsError"
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("Error: GOOGLE_API_KEY not found in .env file.")

    # 2. Split text into chunks
    # We use a larger chunk size to keep context intact for the resume
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    splits = text_splitter.create_documents(data_list)
    
    # 3. Embed using the Stable Gemini Model
    # Passing google_api_key explicitly is safer than relying on environment auto-detection
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004", 
        google_api_key=api_key
    )
    
    # 4. Create the Vector Store (Database)
    vectorstore = FAISS.from_documents(splits, embeddings)
    
    return vectorstore