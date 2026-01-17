import React from 'react';
import { ShortcutResult, Software } from '../types';
import KeyCap from './KeyCap';
import { SOFTWARE_COLORS } from '../constants';

interface ShortcutCardProps {
  shortcut: ShortcutResult;
  software: Software;
  translations: any;
}

const ShortcutCard: React.FC<ShortcutCardProps> = ({ shortcut, software, translations }) => {
  const themeClass = SOFTWARE_COLORS[software] || "border-gray-600 bg-gray-800 text-gray-200";

  return (
    <div className={`
      relative overflow-hidden
      flex flex-col justify-between
      p-5 rounded-xl border border-opacity-30
      bg-gradient-to-br from-gray-800 to-gray-900
      shadow-lg hover:shadow-xl transition-all duration-300
      ${themeClass}
    `}>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold tracking-tight text-white">
            {shortcut.action}
            </h3>
            <span className="text-xs uppercase tracking-wider opacity-60 font-semibold px-2 py-1 rounded bg-black bg-opacity-20">
                {shortcut.context || translations.context}
            </span>
        </div>
        <p className="text-sm opacity-80 leading-relaxed">
          {shortcut.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-white/10 flex flex-wrap items-center gap-1">
        {shortcut.keys.map((key, idx) => (
          <React.Fragment key={idx}>
            <KeyCap k={key} />
            {idx < shortcut.keys.length - 1 && (
              <span className="text-gray-400 font-light mx-1">+</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ShortcutCard;