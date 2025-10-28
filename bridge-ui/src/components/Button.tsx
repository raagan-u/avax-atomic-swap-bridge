import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  loadingText,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}) => {
  const baseClasses = "font-medium rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";
  
  const variantClasses = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500/70",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400/70",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/70",
  };
  
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };
  
  const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <motion.button
      type={type}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      disabled={disabled || isLoading}
      className={combinedClasses}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-3"></div>
          {loadingText || "Loading..."}
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;
