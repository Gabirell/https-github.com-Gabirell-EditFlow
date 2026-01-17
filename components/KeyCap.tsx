import React from 'react';

interface KeyCapProps {
  k: string;
}

const KeyCap: React.FC<KeyCapProps> = ({ k }) => {
  // Map special symbols if needed, or just render
  const displayKey = k === ' ' ? 'Space' : k;

  return (
    <kbd className="
      inline-flex items-center justify-center 
      min-w-[2rem] h-8 px-2 mx-0.5
      text-sm font-bold font-mono text-gray-800 
      bg-gray-100 border-b-4 border-gray-300 rounded 
      dark:bg-gray-700 dark:text-gray-100 dark:border-gray-900
      shadow-sm
    ">
      {displayKey}
    </kbd>
  );
};

export default KeyCap;