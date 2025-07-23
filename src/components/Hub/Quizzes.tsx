'use client'

import { useState } from "react"
import FlashcardComp from "../flashcard/Flashcard-Comp"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { RiArrowGoBackLine } from "react-icons/ri"
import { LuCirclePlus } from "react-icons/lu";
import QuizComp from "../quiz/Quiz-Comp"
import CreateQuiz from "../quiz/CreateQuiz"

// Dados de exemplo para os decks do usuário
const dummyDecks = [
  { id: "1", name: "React Básico" },
  { id: "2", name: "Inglês - Verbos" },
  { id: "3", name: "História Geral" },
  { id: "4", name: "História Geral" },
  { id: "5", name: "História Geral" },
]

export default function Quizzes() {
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)

  const selectedDeck = dummyDecks.find(deck => deck.id === selectedDeckId)

  if (!selectedDeckId) {
    return (
      <div className="w-full px-5 py-5 flex flex-col gap-4">
        <CreateQuiz />
        <ul className="space-y-2 flex flex-wrap w-full justify-center gap-3">
          {dummyDecks.map(deck => (
            <li key={deck.id} className="w-3/10">
              <button
                onClick={() => setSelectedDeckId(deck.id)}
                className="w-full h-[200px] text-left px-4 py-3 bg-[#5067ff] text-white rounded-xl hover:bg-[#2a2a2a] transition"
              >
                {deck.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="w-full px-5 gap-5 flex flex-col py-5">
      <div className="group w-fit rounded-xl p-[1px] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
        <button
          onClick={() => setSelectedDeckId(null)}
          className="flex items-center text-[14px] justify-center gap-1 w-[130px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 px-5 group-hover:bg-[#141414] transition-all duration-300 cursor-pointer"
        >
          <RiArrowGoBackLine />
          back
        </button>
      </div>

      <h2 className="text-xl font-bold text-white">{selectedDeck?.name}</h2>

      <QuizComp index={1}
        question="How does the study of ethics relate to human behaviors and social practices?"
        options={[
          {
            label: 'A',
            value: 'A',
            text: 'It involves analyzing and reflecting on human actions, customs, and habits in social and professional contexts.',
          },
          {
            label: 'B',
            value: 'B',
            text: 'It is exclusively a set of rules that must be followed without considering individual behaviors.',
          },
          {
            label: 'C',
            value: 'C',
            text: 'It only pertains to formal legal regulations imposed by authorities in society.',
          },
          {
            label: 'D',
            value: 'D',
            text: 'It primarily focuses on biological instincts that drive human behavior.',
          },
        ]}
      />

      <div className="flex w-full justify-between">
        <div className="group w-fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button 
            className="flex items-center justify-center text-[14px] gap-1 px-4 w-[120px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          >
          <IoIosArrowBack />
            Previous
          </button>
        </div>
        <div className="group w-fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button 
            className="flex items-center justify-center text-[14px] gap-1 px-4 w-[120px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          >
            Next
          <IoIosArrowForward />
          </button>
        </div>
      </div>

    </div>
  )
}