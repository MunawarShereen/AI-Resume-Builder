from langchain_classic.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

def get_llm():
    api_key = os.getenv("GOOGLE_API_KEY")
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash", 
        temperature=0.0, # Low temp for factual extraction
        google_api_key=api_key
    )

def extract_header_info(vectorstore):
    """
    Specifically looks for contact details in the documents.
    """
    llm = get_llm()
    # We increase k to ensure we catch the bio/contact info docs
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 10})
    
    template = """
    Analyze the Candidate's GitHub and LinkedIn data provided in the context.
    Extract the following Personal Information.
    If a specific piece of information is NOT found, write "NOT_FOUND".
    
    Context:
    {context}
    
    Question:
    {question}
    
    Output format strictly:
    Name: <Value>
    Email: <Value>
    Phone: <Value>
    Location: <Value>
    LinkedIn: <Value>
    GitHub: <Value>
    """
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={
            "prompt": PromptTemplate(template=template, input_variables=["context", "question"])
        }
    )
    
    query = "Extract the candidate's Full Name, Email, Phone Number, City/Country, LinkedIn Profile URL, and GitHub Profile URL."
    return qa_chain.invoke({"query": query})

def generate_resume_section(vectorstore, section_name, instruction, job_description=""):
    llm = get_llm()
    retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 15})
    
    template = """
    You are an expert technical resume writer.
    Based ONLY on the context provided below, fulfill the user's request.
    
    Context:
    {context}
    
    Request:
    {question}
    
    Output strictly in Markdown.
    """
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={
            "prompt": PromptTemplate(template=template, input_variables=["context", "question"])
        }
    )
    
    if job_description:
        full_query = f"JOB DESCRIPTION:\n{job_description}\n\nTASK:\nWrite the '{section_name}' section. {instruction}"
    else:
        full_query = f"Write the '{section_name}' section. {instruction}"
    
    return qa_chain.invoke({"query": full_query})