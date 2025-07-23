'use client'

import { useEffect, useState } from "react";
import { BsChatDots } from 'react-icons/bs'
import { IoMdSend } from 'react-icons/io'
import { FaTimes } from 'react-icons/fa'
import Image from "next/image";
import profileImage from "@/assets/imageProfile.jpeg"
import { ScrollArea } from "./ui/scroll-area";

type ChatProps = {
  userId: string
  chatId: string | null
}

export default function Chat({ userId, chatId }: ChatProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; message: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleGetMessages = async () => {
       if (!chatId) return console.warn('userId não encontrado na URL')

      const response = await fetch(`/api/messages?chatId=${chatId}`)
      const data = await response.json()
      console.log(data)
      setMessages(data.messages)
    }

    handleGetMessages()
  }, [chatId])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user' as const, message: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    await saveMessage(userMessage)

    try {
      const res = await fetch('/api/chat-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      })

      const data = await res.json()
      const aiMessage = { role: 'ai' as const, message: data.answer }

      setMessages((prev) => [...prev, aiMessage])

      await saveMessage(aiMessage)
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'ai', message: 'Erro ao responder.' }])
    } finally {
      setLoading(false)
    }
  }

  const saveMessage = async ({ role, message }: { role: 'user' | 'ai', message: string }) => {
    if (!chatId || !userId) return

    await fetch('/api/save-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        role,
        chatId,
      }),
    })
  }

  return (
    <div className="w-1/2 flex flex-col py-5 gap-3">
      <ScrollArea className="flex-1 p-3 space-y-2 h-4/5">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 flex items-center gap-3 rounded-lg max-w-[70%] w-fit ${
              msg.role === 'user'
                ? 'self-end ml-auto text-white'
                : 'flex-row-reverse self-start mr-auto items-start text-white'
            }`}
          >
            {msg.message}
            <Image className="w-8 h-8 rounded-full" src={profileImage} alt="profile image"/>
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">IA está pensando...</div>}
      </ScrollArea>

      <div className="w-full flex items-center justify-center">
        <div className="w-4/5 rounded-3xl p-[1px] bg-gradient-to-tr from-[#5067ff] via-gray-400/70 to-[#5067ff]/90">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex items-center rounded-3xl py-2 px-3 bg-[#141414] w-full"
          >
            <input
              className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-400"
              placeholder="Digite sua pergunta..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="p-2 text-white hover:text-blue-400">
              <IoMdSend size={20} />
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}