import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';

const ResumePreview = forwardRef(({ data }, ref) => {
  // Safety Check
  if (!data || !data.personal_info) { 
      return null;
  }

  const { personal_info, sections } = data;

  return (
    <div className="w-full overflow-x-auto bg-gray-100 p-4 lg:p-8 flex justify-center">
        {/* The A4 Paper Document */}
        <div 
            ref={ref}
            id="resume-document"
            className="bg-white shadow-2xl shrink-0"
            style={{
                width: '210mm',        
                minHeight: '297mm',    
                padding: '20mm',       // Slightly reduced padding to give more room
                fontFamily: '"Calibri", "Arial", sans-serif',
                color: '#333',
                lineHeight: '1.4',
                boxSizing: 'border-box',
            }}
        >
            {/* HEADER */}
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-wider text-gray-900 mb-2" style={{letterSpacing: '2px'}}>
                    {personal_info.name}
                </h1>
                
                {/* Contact Info Row 1: Links */}
                <div className="text-sm flex flex-col items-center gap-1 text-gray-600 mb-2">
                    {personal_info.linkedin && (
                        <div>
                            <span className="font-bold text-gray-800 mr-1">LinkedIn:</span>
                            <a href={personal_info.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline break-all">
                                {personal_info.linkedin}
                            </a>
                        </div>
                    )}
                    {personal_info.github && (
                        <div>
                            <span className="font-bold text-gray-800 mr-1">GitHub:</span>
                            <a href={personal_info.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline break-all">
                                {personal_info.github}
                            </a>
                        </div>
                    )}
                </div>

                {/* Contact Info Row 2: Details */}
                <div className="text-sm text-gray-600 flex justify-center flex-wrap gap-2">
                    <span>{personal_info.email}</span>
                    <span className="text-gray-400">|</span>
                    <span>{personal_info.phone}</span>
                    <span className="text-gray-400">|</span>
                    <span>{personal_info.location}</span>
                </div>
            </div>

            {/* SECTIONS */}
            <div className="space-y-4">
                <ResumeSection title="Professional Profile" content={sections.profile} />
                <ResumeSection title="Key Skills" content={sections.skills} />
                <ResumeSection title="Experience" content={sections.experience} />
                <ResumeSection title="Projects" content={sections.projects} />
                <ResumeSection title="Education" content={sections.education} />
            </div>
        </div>
    </div>
  );
});

// Helper component with Overflow Fixes
const ResumeSection = ({ title, content }) => (
    <div className="mb-4">
        <h2 className="text-sm font-bold uppercase text-blue-800 border-b-2 border-gray-200 mb-2 pb-1 tracking-wider">
            {title}
        </h2>
        {/* FIX: Added 'break-words' and 'whitespace-pre-wrap' 
            This forces long text to wrap to the next line instead of going off-page.
        */}
        <div className="text-sm text-gray-800 leading-relaxed text-justify break-words whitespace-pre-wrap [&>ul]:list-disc [&>ul]:ml-5 [&>ul]:space-y-1 [&>p]:mb-1">
            <ReactMarkdown 
                components={{
                    // Explicitly handle headers inside content by shrinking them or converting to strong text
                    h1: ({node, ...props}) => <strong className="block mb-1" {...props} />,
                    h2: ({node, ...props}) => <strong className="block mb-1" {...props} />,
                    h3: ({node, ...props}) => <strong className="block mb-1" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    </div>
);

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;