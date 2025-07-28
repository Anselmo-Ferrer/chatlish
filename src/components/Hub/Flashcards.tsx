'use client'

import { useEffect, useState } from "react"
import FlashcardComp from "../flashcard/Flashcard-Comp"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { RiArrowGoBackLine } from "react-icons/ri"
import { LuCirclePlus } from "react-icons/lu"
import CreateDeck from "../flashcard/CreateDeck"
import { PiArrowCircleUpRight } from "react-icons/pi"
import { useSearchParams } from "next/navigation"
import CreateFlashcard from "../flashcard/CreateFlashcard"
import { Skeleton } from "../ui/skeleton"

type Deck = {
  id: string
  name: string
}

type Flashcard = {
  id: string
  groupId: string
  groupName: string
  question: string
  answer: string
  stats: string
}

export default function Flashcards() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [decks, setDecks] = useState<Deck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false)

  const handleGetFlashcards = async (deckId: string) => {
    const res = await fetch(`/api/flashcards?deckId=${deckId}`);
    const data = await res.json();
    setFlashcards(data.flashcards);
    setSelectedDeckId(deckId);
    setCurrentIndex(0);
  }

  const selectedDeck = decks.find(deck => deck.id === selectedDeckId);

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, flashcards.length - 1));
  }

  const handleBack = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }

  useEffect(() => {
    const handleGetDecks = async () => {
      setLoading(true)
      const res = await fetch(`/api/flashcards-deck?userId=${userId}`);
      const data = await res.json();
      console.log(data)
      setDecks(data.flashcardDecks);
      setLoading(false)
    }

    handleGetDecks();
  }, [userId]);

  if (loading) return (
    <div className="w-full h-[500px] flex flex-wrap justify-center py-20 gap-4">
      <Skeleton className="h-[200px] w-[200px]" />
      <Skeleton className="h-[200px] w-[200px]" />
      <Skeleton className="h-[200px] w-[200px]" />
      <Skeleton className="h-[200px] w-[200px]" />
      <Skeleton className="h-[200px] w-[200px]" />
    </div>
  )

  if (!selectedDeckId) {
    return (
      <div className="w-full px-5 pt-10 pb-5 flex flex-col items-end gap-4">
        <CreateDeck />
        <ul className="space-y-2 flex flex-wrap w-full justify-center gap-3">
          {decks.map(deck => (
            <li key={deck.id} className="w-3/10">
              <button
                onClick={() => handleGetFlashcards(deck.id)}
                className="w-full flex flex-col pt-5 justify-between cursor-pointer h-[200px] text-left px-4 py-3 text-white rounded-xl border border-[#393939] bg-gradient-to-tr from-transparent via-transparent to-[#5067ff]/30 transition-all duration-200 transform hover:scale-[1.02] hover:border-[#5067ff]"
              >
                <p className="text-xl font-bold">{deck.name}</p>
                <p className="w-full flex items-center justify-end gap-1">
                  See deck <PiArrowCircleUpRight />
                </p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const currentFlashcard = flashcards[currentIndex];

  return (
    <div className="w-full px-5 gap-5 flex flex-col py-5">
      <div className="w-full flex items-center justify-between">
        <div className="group w-fit rounded-xl p-[1px] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button
            onClick={() => {
              setSelectedDeckId(null)
              setFlashcards([])
              setCurrentIndex(0)
            }}
            className="flex items-center text-[14px] justify-center gap-1 w-[130px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 px-5 group-hover:bg-[#141414] transition-all duration-300 cursor-pointer"
          >
            <RiArrowGoBackLine />
            back
          </button>
        </div>
        <CreateFlashcard deckId={selectedDeckId}/>
      </div>

      <h2 className="text-xl font-bold text-white">{selectedDeck?.name}</h2>

      {currentFlashcard ? (
        <FlashcardComp 
          question={currentFlashcard.question} 
          answer={currentFlashcard.answer} 
        />
      ) : (
        <p className="text-white">Nenhum flashcard encontrado.</p>
      )}

      <div className="flex w-full gap-5 justify-center items-center mt-5">
        <button
          disabled={currentIndex === 0}
          onClick={handleBack}
          className="p-4 disabled:opacity-30 bg-[#2a2a2a] hover:bg-[#3a3a3a] hover:scale-105 w-16 h-16 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
        >
          <IoIosArrowBack size={22} />
        </button>

        <p className="font-semibold text-3xl text-white">
          {flashcards.length > 0 ? `${currentIndex + 1} / ${flashcards.length}` : '0 / 0'}
        </p>

        <button
          disabled={currentIndex === flashcards.length - 1}
          onClick={handleNext}
          className="p-4 disabled:opacity-30 bg-[#2a2a2a] hover:bg-[#3a3a3a] hover:scale-105 w-16 h-16 flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
        >
          <IoIosArrowForward size={22} />
        </button>
      </div>
    </div>
  )
}