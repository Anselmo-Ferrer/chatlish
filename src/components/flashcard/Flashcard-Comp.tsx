'use client'

import { useState } from 'react';

export default function Flashcard() {
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
            <p className="text-xl font-semibold text-white">Cachorro</p>
          </div>

          {/* Verso */}
          <div className="flashcard-back flex flex-col justify-between p-6 relative">
            <p className="text-xl font-semibold text-white text-center mt-10">Dog</p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-4 absolute bottom-0">
              <button className="bg-gray-700 text-white px-4 py-2 rounded">Review</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded">Difficult</button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded">Medium</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded">Easy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}