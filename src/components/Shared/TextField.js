import React from "react";

const TextField = ({
  type = "text",
  placeholder = "Enter Text",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`bg-gray-100 py-3 px-4 rounded-lg outline-none focus:ring-1 focus:ring-primary transition-all duration-300 ease-in 
      border border-gray-400 focus:border-primary
       ${className}`}
      {...props}
    />
  );
};

export default TextField;
