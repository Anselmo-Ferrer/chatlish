'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VscGitPullRequest } from "react-icons/vsc";
import { Skeleton } from "../ui/skeleton";

type OverviewType = {
  englishLevel: string
  strengths: string[]
  weaknesses: string[]
}

export default function Overview() {

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [overview, setOverview] = useState<OverviewType>()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const handleGetOverview = async () => {
      setLoading(true)
      const res = await fetch(`/api/overview?userId=${userId}`);
      const data = await res.json()
      setOverview(data.overview)
      setLoading(false)
      console.log(data.overview)
    }

    handleGetOverview()
  }, [userId])

  const handleCreateOverview = async () => {
  try {
    console.log('Criando overview')
    // const res = await fetch("/api/create-overview", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ userId }),
    // });

    const data = {
    "overview": [
        {
            "level": "A1",
            "strengths": [
                "basic vocabulary (test, chat)",
                "short phrases",
                "use of numbers",
                "simple repetition",
                "familiar contexts (testing)"
            ],
            "weaknesses": [
                "verb conjugation (no examples of past/future)",
                "sentence structure complexity",
                "spelling consistency (e.g., 'testee')",
                "grammatical articles (e.g., 'in this chat 2')",
                "punctuation"
            ]
        }
    ]
}
    console.log("Criado:", data);
    console.log(data.overview[0].level)
    console.log(data.overview[0].strengths)
    console.log(data.overview[0].weaknesses)

    console.log('Salvando overview')
    const resSave = await fetch("/api/save-overview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        level: data.overview[0].level,
        strengths: data.overview[0].strengths,
        weaknesses: data.overview[0].weaknesses,
      }),
    });

    const dataSave = await resSave.json();
    console.log("Salvo:", dataSave);
  } catch (error) {
    console.error("Erro ao criar ou salvar overview:", error);
  }
};

if (loading) return (
  <div className="w-full flex flex-col gap-3 mt-10">
    <Skeleton className="h-12 w-40" />
    <Skeleton className="h-6 w-28 mt-3" />
    <Skeleton className="h-14 w-14" />
    <Skeleton className="h-6 w-28 mt-3" />
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />      
    </div>
    <Skeleton className="h-6 w-28 mt-3" />
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />
      <Skeleton className="h-8 w-3/10" />      
    </div>
  </div>
)


  return (
    <div className="w-full h-screen py-10 px-5 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="font-bold text-3xl">My Overview</p>
        <div className="group fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button 
            onClick={() => handleCreateOverview()}
            className="flex items-center justify-center gap-2 px-4 w-full bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          >
            <VscGitPullRequest />
            Create overview
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">English level</p>
        <p className="font-bold text-3xl text-[#5067ff]">{overview?.englishLevel}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">Strenghts</p>
        <div className="flex flex-wrap gap-3">
          {overview?.strengths.map((item, index) => (
            <div key={index} className="flex w-fit cursor-default items-center gap-2 rounded-full border border-emerald-400 bg-emerald-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-emerald-400/30">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]" />
              <p className="text-sm w-full dark:text-emerald-100 text-emerald-800 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">Weakness</p>
        <div className="flex flex-wrap gap-3">
          {overview?.weaknesses.map((item, index) => (
            <div key={index} className="flex cursor-default items-center gap-2 rounded-full border border-red-400 bg-red-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-red-400/30">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.8),0_0_8px_rgba(248,113,113,0.6)]" />
              <p className="text-sm dark:text-red-100 text-red-800 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}