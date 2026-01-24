import { useState, useRef } from 'react';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const FileUpload = ({ label, onFileSelect, selectedFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    if (file.type !== 'application/pdf') {
      alert("Please upload a PDF file.");
      return;
    }
    onFileSelect(file);
  };

  const clearFile = (e) => {
    e.stopPropagation();
    onFileSelect(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {label && <span className="block text-sm font-medium text-gray-700">{label}</span>}
      
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={twMerge(
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ease-in-out",
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
          selectedFile ? "bg-green-50 border-green-200" : ""
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="application/pdf"
          onChange={handleChange}
        />

        {!selectedFile ? (
          <div className="space-y-3">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                 <UploadCloud className="h-6 w-6 text-gray-500" />
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600 hover:text-blue-700">Click to upload</span> or drag and drop
            </div>
            <p className="text-xs text-gray-500">PDF only (LinkedIn Profile Export)</p>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-green-100 shadow-sm">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="bg-green-100 p-2 rounded-lg">
                 <FileIcon className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900 truncate">{selectedFile.name}</span>
            </div>
            <button 
                onClick={clearFile}
                className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
            >
                <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;