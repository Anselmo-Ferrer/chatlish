'use client';

import { useState } from "react";

export default function HubBar() {
  const tabs = ["SpreadSheet","Flashcards", "Quizzes", "Phrases", "Notes", "Overview"];
  const [activeTab, setActiveTab] = useState("Flashcards");

  return (
    <div className="flex gap-2 bg-[#181818] text-black px-2 py-1 rounded-3xl border border-[#2a2a2a]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;

        return (
          <div
            key={tab}
            className={`relative flex-1 rounded-full p-[1px] transition-all duration-150 ${
              isActive
                ? "bg-gradient-to-tr from-[#5067ff] via-gray-400/70 to-[#5067ff]/90"
                : ""
            }`}
          >
            <button
              onClick={() => setActiveTab(tab)}
              className={`w-full h-full px-2 py-2 text-sm font-medium rounded-full transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-tr from-[#141414] to-[#1a1a1a] text-white"
                  : "bg-transparent text-gray-500 hover:text-white"
              }`}
            >
              <span className="hidden sm:inline">{tab}</span>
              <span className="inline sm:hidden">{tab[0]}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}