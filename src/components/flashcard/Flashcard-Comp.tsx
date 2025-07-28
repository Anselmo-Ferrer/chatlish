'use client'

import { useState } from 'react';

type FlashcardProps = {
  question: string;
  answer: string;
};

export default function Flashcard({ question, answer }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full flex justify-center mt-5">
      <div
        className="flashcard-container"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
          {/* Frente */}
          <div className="flashcard-front">
            <p className="text-xl font-semibold text-white">{question}</p>
          </div>

          {/* Verso */}
          <div className="flashcard-back flex flex-col justify-between p-6 relative">
            <p className="text-xl font-semibold text-white text-center mt-10">{answer}</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-4 absolute bottom-0">
              <button onClick={(e) => e.stopPropagation()} className="flex cursor-default items-center justify-center gap-2 rounded-full border border-gray-400 bg-gray-400/20 px-5 py-3 w-[110px] cursor-pointer shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-gray-400/30">
                <span className="h-2 w-2 shrink-0 rounded-full bg-gray-400 shadow-[0_0_4px_rgba(156,163,175,0.8),0_0_8px_rgba(156,163,175,0.6)]" />
                <p className="text-sm text-gray-800 dark:text-gray-100 font-medium">Review</p>
              </button>

              <button onClick={(e) => e.stopPropagation()} className="flex cursor-default items-center justify-center gap-2 rounded-full border border-red-600 bg-red-600/20 px-5 py-3 w-[110px] cursor-pointer shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-red-600/30">
                <span className="h-2 w-2 shrink-0 rounded-full bg-red-600 shadow-[0_0_4px_rgba(220,38,38,0.8),0_0_8px_rgba(220,38,38,0.6)]" />
                <p className="text-sm text-red-800 dark:text-red-100 font-medium">Difficult</p>
              </button>

              <button onClick={(e) => e.stopPropagation()} className="flex cursor-default items-center justify-center gap-2 rounded-full border border-yellow-500 bg-yellow-500/20 px-5 py-3 w-[110px] cursor-pointer shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-yellow-500/30">
                <span className="h-2 w-2 shrink-0 rounded-full bg-yellow-500 shadow-[0_0_4px_rgba(234,179,8,0.8),0_0_8px_rgba(234,179,8,0.6)]" />
                <p className="text-sm text-yellow-800 dark:text-yellow-100 font-medium">Medium</p>
              </button>

              <button onClick={(e) => e.stopPropagation()} className="flex cursor-default items-center justify-center gap-2 rounded-full border border-green-600 bg-green-600/20 px-5 py-3 w-[110px] cursor-pointer shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-green-600/30">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-600 shadow-[0_0_4px_rgba(22,163,74,0.8),0_0_8px_rgba(22,163,74,0.6)]" />
                <p className="text-sm text-green-800 dark:text-green-100 font-medium">Easy</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}