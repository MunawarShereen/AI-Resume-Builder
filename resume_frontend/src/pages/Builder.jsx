import { useState, useRef } from 'react';
import { Wand2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import PersonalDetails from '../components/forms/PersonalDetails';
import JobContext from '../components/forms/JobContext';
import ResumePreview from '../components/results/ResumePreview';
import ActionButtons from '../components/results/ActionButtons';

const Builder = () => {
  const [githubUser, setGithubUser] = useState('');
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  // The REF is passed from here to the Preview (to measure it) and Buttons (to print it)
  const resumeRef = useRef();

  const handleGenerate = async () => {
    if (!githubUser || !file || !jobDesc) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setResumeData(null);

    try {
        const formData = new FormData();
        formData.append("github_username", githubUser);
        formData.append("job_description", jobDesc);
        formData.append("file", file);

        const response = await fetch("http://localhost:8000/generate-resume", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) throw new Error("Failed to generate resume.");

        const data = await response.json();
        setResumeData(data);

    } catch (error) {
        alert(`Error: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  const handleReset = () => {
      setResumeData(null);
      setGithubUser('');
      setFile(null);
      setJobDesc('');
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-gray-900">Resume Builder Studio</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Inputs */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <fieldset disabled={isLoading || resumeData !== null} className="space-y-6 disabled:opacity-70">
                <PersonalDetails 
                    githubUser={githubUser} setGithubUser={setGithubUser}
                    file={file} setFile={setFile}
                />
                <JobContext 
                    jobDesc={jobDesc} setJobDesc={setJobDesc}
                />
            </fieldset>

            {!resumeData ? (
                <Button onClick={handleGenerate} disabled={isLoading} className="w-full py-4 text-lg gap-2 shadow-md">
                    {!isLoading && <Wand2 className="h-5 w-5" />}
                    {isLoading ? "Processing..." : "Generate AI Resume"}
                </Button>
            ) : (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 text-center">
                    <p className="font-medium">Resume Generated Successfully!</p>
                    <p className="text-sm mt-1">Review the preview on the right.</p>
                </div>
            )}
        </div>

        {/* Right: Preview Area */}
        <div className="lg:col-span-8">
             {/* This container allows the resume to be centered */}
             <div className="flex flex-col items-center">
                
                {isLoading && (
                    <div className="w-full h-96 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-300">
                        <Loader />
                    </div>
                )}

                {!isLoading && resumeData && (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <ActionButtons 
                            onReset={handleReset} 
                            printRef={resumeRef} 
                        />
                        
                        {/* THE RESUME ITSELF */}
                        <div className="mt-4 overflow-hidden rounded-sm shadow-2xl border border-gray-300">
                            <ResumePreview 
                                ref={resumeRef} 
                                data={resumeData} 
                            />
                        </div>
                    </div>
                 )}

                 {!isLoading && !resumeData && (
                     <div className="w-full h-[600px] bg-gray-50 rounded-xl flex flex-col items-center justify-center border border-dashed border-gray-300 text-gray-400">
                        <Wand2 className="h-16 w-16 mb-4 opacity-20" />
                        <h3 className="text-lg font-medium text-gray-600">Your Resume Will Appear Here</h3>
                     </div>
                 )}
             </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;