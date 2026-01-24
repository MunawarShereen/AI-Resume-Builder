import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const Button = ({ children, className, variant = 'primary', disabled, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm hover:shadow-md",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  return (
    <button 
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;