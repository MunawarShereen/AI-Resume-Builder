import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()

def fetch_github_data(username):
    token = os.getenv("GITHUB_TOKEN")
    headers = {"Authorization": f"token {token}"} if token else {}
    
    print(f"Connecting to GitHub for user: {username}...")
    
    docs = []
    
    # 1. Fetch User Profile Metadata (Crucial for Header extraction)
    user_url = f"https://api.github.com/users/{username}"
    user_resp = requests.get(user_url, headers=headers)
    
    if user_resp.status_code == 200:
        user_data = user_resp.json()
        # Format this clearly so the AI picks it up as "Contact Info"
        profile_info = f"""
        [CANDIDATE CONTACT INFO SOURCE: GITHUB]
        Name: {user_data.get('name', '')}
        Email: {user_data.get('email', '')}
        Location: {user_data.get('location', '')}
        Portfolio/Website: {user_data.get('blog', '')}
        GitHub Profile: {user_data.get('html_url', '')}
        Bio: {user_data.get('bio', '')}
        """
        docs.append(profile_info)
    else:
        print(f"Error fetching user profile: {user_resp.status_code}")

    # 2. Fetch Repositories (Pagination Loop)
    repos = []
    page = 1
    while True:
        repo_url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=100&page={page}"
        print(f"Fetching repository list (Page {page})...")
        page_resp = requests.get(repo_url, headers=headers)
        
        if page_resp.status_code != 200:
            break
        
        page_data = page_resp.json()
        if not page_data:
            break
            
        repos.extend(page_data)
        page += 1

    print(f"Found {len(repos)} total repositories. Downloading READMEs...")

    # 3. Process Repos
    for i, repo in enumerate(repos):
        name = repo['name']
        desc = repo['description'] or "No description"
        lang = repo['language'] or "Unknown"
        
        if i % 10 == 0: print(f"Processing {i}/{len(repos)}: {name}...")

        readme_url = f"https://api.github.com/repos/{username}/{name}/readme"
        readme_resp = requests.get(readme_url, headers=headers)
        readme_content = ""
        
        if readme_resp.status_code == 200:
            try:
                readme_content = base64.b64decode(readme_resp.json()['content']).decode('utf-8')
            except:
                readme_content = "Could not decode README."

        full_text = f"Project Name: {name}\nPrimary Language: {lang}\nDescription: {desc}\nREADME Content: {readme_content[:4000]}"
        docs.append(full_text)
        
    return docs