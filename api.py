from fastapi import FastAPI, UploadFile, Form, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
import uvicorn

# Import your existing modules
from ingest.github_loader import fetch_github_data
from ingest.linkedin_loader import fetch_linkedin_data
from rag.vector_store import create_vector_db
from rag.generator import generate_resume_section, extract_header_info

app = FastAPI()

# Allow your React Frontend to talk to this Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/generate-resume")
async def generate_resume(
    github_username: str = Form(...),
    job_description: str = Form(...),
    file: UploadFile = File(...)
):
    temp_filename = f"temp_{file.filename}"
    
    try:
        # ... Steps 1-4 remain the same (Save file, Ingest, Vector Store, Header) ...
        # (Copy your existing code for steps 1 through 4)

        # 1. Save File
        with open(temp_filename, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        print(f"Processing request for: {github_username}")

        # 2. Ingest Data
        github_docs = fetch_github_data(github_username)
        linkedin_docs = fetch_linkedin_data(temp_filename)
        all_docs = github_docs + linkedin_docs
        
        if not all_docs:
            raise HTTPException(status_code=400, detail="Could not extract data.")

        # 3. Create Vector Store
        vector_db = create_vector_db(all_docs)
        
        # 4. Extract Header Info
        header_res = extract_header_info(vector_db)
        header_raw = header_res['result']
        
        contact = {}
        for line in header_raw.split('\n'):
            if ':' in line:
                key, val = line.split(':', 1)
                contact[key.strip()] = val.strip()

        def get(key): return contact.get(key, '').replace('NOT_FOUND', '')

        # 5. Generate Sections (UPDATED PROMPTS)
        # We explicitly add: "Do NOT include the section heading in your output."
        
        profile = generate_resume_section(
            vector_db, 
            "Professional Profile", 
            "Write a 3-4 line professional summary. Do NOT include the section heading 'Professional Profile' in the output.", 
            job_description
        )
        
        skills = generate_resume_section(
            vector_db, 
            "Key Skills", 
            "List technical skills as a comma-separated list. Do NOT include the section heading 'Key Skills'.", 
            job_description
        )
        
        experience = generate_resume_section(
            vector_db, 
            "Experience", 
            "Format exactly as: **Role** | Company | Date \n * Detail. Do NOT include the section heading 'Experience'.", 
            job_description
        )
        
        projects = generate_resume_section(
            vector_db, 
            "Projects", 
            "Format: **Name** | Tech Stack \n * Detail. Do NOT include the section heading 'Projects'.", 
            job_description
        )
        
        education = generate_resume_section(
            vector_db, 
            "Education", 
            "Format: **Degree** | University, City\nYear. Do NOT include the section heading 'Education'.", 
            job_description
        )

        # 6. Return Structured JSON
        return {
            "personal_info": {
                "name": get('Name') or github_username,
                "email": get('Email'),
                "phone": get('Phone'),
                "location": get('Location'),
                "linkedin": get('LinkedIn'),
                "github": get('GitHub')
            },
            "sections": {
                "profile": profile['result'],
                "skills": skills['result'],
                "experience": experience['result'],
                "projects": projects['result'],
                "education": education['result']
            }
        }

    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)