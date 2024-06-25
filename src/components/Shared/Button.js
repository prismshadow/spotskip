import React from "react";

const Button = ({ title, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary py-3 px-8 rounded-lg text-white font-semibold transition-all duration-300 ease-in 
        outline-none focus:outline-none hover:opacity-80

       ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
