'use client'

import Image from "next/image";
import profileImage from "@/assets/imageProfile.jpeg"
import { CiLogout } from "react-icons/ci";
import { LuSettings } from "react-icons/lu";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CreateChat from "./chat/CreateChat";
import { useEffect, useState } from "react";
import Settings from "./Settings";

type chatType = {
  id: string
  name: string
  description: string
}

export default function SideBar() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')

  const [chat, setChats] = useState<chatType[]>([])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  const getChats = async () => {
    if (!userId) return console.warn('userId não encontrado na URL')

    const res = await fetch(`/api/chats?userId=${userId}`)
    const data = await res.json()
    setChats(data.chats)
  }

  useEffect(() => {
    getChats()
  }, [userId])

  const handleChatClick = (chatId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('chatId', chatId)
    const newUrl = `${pathname}?${params.toString()}`
    router.push(newUrl)
  }
    

  return (
    <div className="w-76 bg-transparent h-screen flex flex-col justify-between border-r border-[#393939]">

      <div className="flex flex-col gap-2 px-2 py-5">
        <div className="border-b border-[#393939] pb-3 mb-3 flex items-center justify-between">
          <h1 className="font-bold text-2xl">Your chats</h1>
          <CreateChat onChatCreated={() => getChats()} />

        </div>
        {chat.map((item, index) => (
          <div
            key={index}
            className="group rounded-xl p-[1px] transition-all duration-150
            hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90"
          >
            <button onClick={() => handleChatClick(item.id)} key={index} className="flex items-center gap-2 bg-[#181818] border border-[#2a2a2a] p-2 rounded-xl w-full group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
              <Image className="w-8 h-8 rounded-full" src={profileImage} alt="profile image"/>
              <div className="flex flex-col items-start">
                <p className="text-[14px]">{item.name}</p>
                <p className="text-[12px]">{item.description}</p>
              </div>
          </button>
        </div>
        ))}
      </div>

      <div className="flex w-full justify-between items-center border-t py-4 px-2 border-[#393939]">
        <Settings />

        <div className="group h-full aspect-square rounded-full p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button onClick={handleLogout} className="w-full h-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center rounded-full group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
            <CiLogout />
          </button>
        </div>
      </div>

    </div>
  )
}