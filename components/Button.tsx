import React from 'react'

interface Props {
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  width: string;
  textSize: string;
}

const Button: React.FC<Props> = ({ 
    children,
    height,
    onClick, 
    width,
    textSize
  }) => { 
  return (
    <button 
      className={`${textSize} min-w-[${width}] min-h-[${height}] bg-transparent hover:bg-zinc-500 text-zinc-900 dark:text-blue-100 font-semibold hover:text-white py-2 px-4 border border-zinc-900 dark:border-blue-100 hover:border-transparent rounded`}
      onClick={onClick}
      style={{height, width}}
    >
    {children}
    </button>
  );
}

export default Button;