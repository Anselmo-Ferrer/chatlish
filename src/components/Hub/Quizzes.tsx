'use client'

import { useEffect, useState } from "react"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import { RiArrowGoBackLine } from "react-icons/ri"
import QuizComp from "../quiz/Quiz-Comp"
import CreateQuiz from "../quiz/CreateQuizSet"
import { PiArrowCircleUpRight } from "react-icons/pi"
import { FaCheck } from "react-icons/fa6"
import { useSearchParams } from "next/navigation"
import { Skeleton } from "../ui/skeleton"

type QuizSet = {
  id: string
  name: string
}

type Quiz = {
  id: string
  question: string
  answer: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
}

export default function Quizzes() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  const [quizSet, setQuizSet] = useState<QuizSet[]>([])
  const [quiz, setQuiz] = useState<Quiz[]>([])
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)
  const [selectedDeckName, setSelectedDeckName] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const [loading, setLoading] = useState<boolean>(false)

  const currentQuiz = quiz[currentIndex]

  const handleNext = () => {
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1)
      resetState()
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      resetState()
    }
  }

  const resetState = () => {
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  const handleCheck = () => {
    console.log(selectedAnswer)
    console.log(currentQuiz)
    if (selectedAnswer && currentQuiz) {
      setIsCorrect(selectedAnswer === currentQuiz.answer)
    }
  }

  const handleGetQuizSet = async () => {
    setLoading(true)
    const res = await fetch(`/api/quizSet?userId=${userId}`)
    const data = await res.json()
    setQuizSet(data.quizSet)
    setLoading(false)
  }

  const handleGetQuiz = async (quizSetId: string, deckName: string) => {
    const res = await fetch(`/api/quiz?quizSetId=${quizSetId}`)
    const data = await res.json()
    setQuiz(data.quiz)
    setSelectedDeckId(quizSetId)
    setSelectedDeckName(deckName)
    setCurrentIndex(0)
    resetState()
  }

  useEffect(() => {
    handleGetQuizSet()
  }, [userId])

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
        <CreateQuiz />
        <ul className="space-y-2 flex flex-wrap w-full justify-center gap-3">
          {quizSet.map(deck => (
            <li key={deck.id} className="w-3/10">
              <button
                onClick={() => handleGetQuiz(deck.id, deck.name)}
                className="w-full flex flex-col pt-5 justify-between cursor-pointer h-[200px] text-left px-4 py-3 text-white rounded-xl border border-[#393939] bg-gradient-to-tr from-transparent via-transparent to-[#5067ff]/30 transition-all duration-200 transform hover:scale-[1.02] hover:border-[#5067ff]"
              >
                <p className="text-xl font-bold">{deck.name}</p>
                <p className="w-full flex items-center justify-end gap-1">
                  See quiz <PiArrowCircleUpRight />
                </p>
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
          onClick={() => {
            setSelectedDeckId(null)
            setQuiz([])
            setCurrentIndex(0)
            setSelectedDeckName(null)
            resetState()
          }}
          className="flex items-center text-[14px] justify-center gap-1 w-[130px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 px-5 group-hover:bg-[#141414] transition-all duration-300 cursor-pointer"
        >
          <RiArrowGoBackLine />
          back
        </button>
      </div>

      <h2 className="text-xl font-bold text-white">{selectedDeckName}</h2>

      {currentQuiz ? (
        <QuizComp
          index={currentIndex + 1}
          question={currentQuiz.question}
          options={[
            { label: "A", value: "A", text: currentQuiz.optionA },
            { label: "B", value: "B", text: currentQuiz.optionB },
            { label: "C", value: "C", text: currentQuiz.optionC },
            { label: "D", value: "D", text: currentQuiz.optionD },
          ]}
          selected={selectedAnswer}
          correct={isCorrect}
          onSelect={setSelectedAnswer}
        />
      ) : (
        <p className="text-white">Nenhum quiz encontrado.</p>
      )}

      <div className="flex w-full justify-between">
        <div className="group w-fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button 
            onClick={handleBack}
            disabled={currentIndex === 0}
            className="flex items-center justify-center text-[14px] gap-1 px-4 w-[120px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 disabled:opacity-30 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          >
            <IoIosArrowBack />
            Previous
          </button>
        </div>

        <div className="group w-fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button 
            onClick={handleCheck}
            disabled={!selectedAnswer}
            className="flex items-center justify-center text-[14px] gap-1 px-5 w-fit bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 disabled:opacity-30 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          >
            <FaCheck />
            Check answer
          </button>
        </div>

        <div className="group w-fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button 
            onClick={handleNext}
            disabled={currentIndex === quiz.length - 1}
            className="flex items-center justify-center text-[14px] gap-1 px-4 w-[120px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 disabled:opacity-30 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          >
            Next
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  )
}