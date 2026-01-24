import Input from '../ui/Input';
import FileUpload from '../ui/FileUpload';
import { Github } from 'lucide-react';

const PersonalDetails = ({ githubUser, setGithubUser, file, setFile }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-1">
          <Github className="h-5 w-5 text-gray-700" /> Source Data
        </h2>
        <p className="text-sm text-gray-500">Provide your data sources for the AI to analyze.</p>
      </div>
      
      <div className="space-y-5">
        <Input
          label="GitHub Username"
          id="github-user"
          placeholder="e.g., munawar-shereen"
          value={githubUser}
          onChange={(e) => setGithubUser(e.target.value)}
        />

        <FileUpload
          label="LinkedIn Profile PDF"
          selectedFile={file}
          onFileSelect={setFile}
        />
      </div>
    </div>
  );
};

export default PersonalDetails;