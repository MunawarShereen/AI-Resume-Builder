import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ label, id, className, type = "text", ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        className={twMerge(
          "block w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all sm:text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";
export default Input;