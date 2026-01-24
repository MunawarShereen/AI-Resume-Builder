import Button from '../ui/Button';
import { Download, RefreshCw } from 'lucide-react';
import html2pdf from 'html2pdf.js';

const ActionButtons = ({ onReset, printRef }) => {
  
  const handleDownload = () => {
      const element = printRef.current;
      
      if (!element) {
          alert("Resume not generated yet!");
          return;
      }

      // Settings optimized for A4 Printing
      const opt = {
        margin:       0, // We have padding in the CSS, so margins here can be 0
        filename:     'My_AI_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2,       // 2x scale for crisp text
            useCORS: true,  // Important for external fonts/icons
            logging: false  // Cleaner console
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Trigger the download
      html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-4">
        <Button variant="primary" onClick={handleDownload} className="flex-1 sm:flex-none gap-2">
            <Download className="h-4 w-4" /> Download PDF
        </Button>
        
        <Button variant="ghost" onClick={onReset} className="text-red-600 hover:bg-red-50 gap-2">
            <RefreshCw className="h-4 w-4" /> Start Over
        </Button>
    </div>
  );
};

export default ActionButtons;