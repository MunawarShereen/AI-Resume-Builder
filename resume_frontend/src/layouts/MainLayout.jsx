import { Bot, Sparkles } from 'lucide-react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1">
              AI Resume Builder <Sparkles className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            </h1>
          </div>
          <nav>
            <a href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </a>
            {/* Add more nav links here */}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} AI Resume Builder. Powered by RAG & LLMs.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;