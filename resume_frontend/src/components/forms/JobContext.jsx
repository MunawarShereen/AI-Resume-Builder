import { Briefcase } from 'lucide-react';

const JobContext = ({ jobDesc, setJobDesc }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6 h-full flex flex-col">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-1">
          <Briefcase className="h-5 w-5 text-gray-700" /> Target Job
        </h2>
        <p className="text-sm text-gray-500">Paste the job description to tailor the resume.</p>
      </div>
      
      <div className="flex-1">
        <label htmlFor="job-desc" className="sr-only">Job Description</label>
        <textarea
          id="job-desc"
          className="block w-full h-full min-h-[200px] px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all sm:text-sm resize-none"
          placeholder="Paste the complete job description here..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
        />
      </div>
    </div>
  );
};

export default JobContext;