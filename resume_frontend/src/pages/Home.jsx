import Button from "../components/ui/Button";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";

const Home = ({ onStart }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center sm:py-32 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
        Generate a Tailored Resume <br className="hidden sm:block" />
        <span className="text-blue-600">Powered by AI</span>
      </h1>
      <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto">
        Stop writing generic resumes. Our AI analyzes your GitHub code and LinkedIn history to craft a perfect resume tailored to any job description.
      </p>
      
      <div className="mt-10 flex justify-center gap-4">
        <Button onClick={onStart} className="px-8 py-4 text-lg gap-2">
          Build My Resume <ArrowRight className="h-5 w-5" />
        </Button>
        <Button variant="secondary" href="#how-it-works" className="px-8 py-4 text-lg">
          Learn more
        </Button>
      </div>

      <div className="mt-20 text-gray-400 flex items-center justify-center gap-8 grayscale opacity-50">
        <div className="flex flex-col items-center gap-2">
            <Github className="h-8 w-8" /> <span className="text-sm font-medium">GitHub Code Analysis</span>
        </div>
        <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex flex-col items-center gap-2">
            <Linkedin className="h-8 w-8" /> <span className="text-sm font-medium">LinkedIn Work History</span>
        </div>
         <div className="h-8 w-px bg-gray-300"></div>
        <div className="flex flex-col items-center gap-2">
            <FileText className="h-8 w-8" /> <span className="text-sm font-medium">Job Description Tailoring</span>
        </div>
      </div>
    </div>
  );
};

export default Home;