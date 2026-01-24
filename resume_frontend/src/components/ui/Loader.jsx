import { Loader2, Sparkles } from 'lucide-react';

const Loader = () => {
  // Array of varied loading messages to keep the user entertained
  const messages = [
    "Connecting to GitHub API...",
    "Reading LinkedIn PDF structure...",
    "Vectorizing your project history...",
    "Consulting the AI Resume Expert...",
    "Tailoring content to the job description...",
    "Polishing the markdown format...",
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-white p-4 rounded-full shadow-lg border border-blue-100">
           <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        </div>
        <Sparkles className="h-6 w-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-3">Generating Your Resume</h3>
      <div className="space-y-2">
        {messages.map((msg, i) => (
            <p key={i} className="text-sm text-gray-500 flex items-center justify-center gap-2 animate-pulse" style={{animationDelay: `${i * 0.8}s`}}>
                <span className="h-1.5 w-1.5 bg-blue-400 rounded-full"></span>
                {msg}
            </p>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-6">This usually takes about 30-60 seconds. Do not close the tab.</p>
    </div>
  );
};

export default Loader;