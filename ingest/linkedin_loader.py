from langchain_community.document_loaders import PyPDFLoader
import os

def fetch_linkedin_data(file_path):
    if not os.path.exists(file_path):
        print(f"\n[!] Error: File not found at {file_path}")
        return []

    print(f"Reading LinkedIn PDF: {file_path}...")
    
    try:
        loader = PyPDFLoader(file_path)
        pages = loader.load()
        full_text = "\n".join([page.page_content for page in pages])
        
        # Explicit tag to help AI find contact info here too
        structured_text = f"[CANDIDATE CONTACT INFO SOURCE: LINKEDIN PDF]\n{full_text}"
        return [structured_text]

    except Exception as e:
        print(f"Error reading PDF: {e}")
        return []