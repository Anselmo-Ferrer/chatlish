import { useSearchParams } from "next/navigation";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { LuCirclePlus } from "react-icons/lu";
import { CiSquarePlus } from "react-icons/ci";
import { useState } from "react";

export default function CreateChat({ onChatCreated }: { onChatCreated: () => void }) {

  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const handleCreateChat = async () => {
    if (!userId) {
      alert("ID do usuário não encontrado.")
      return
    }

    const response = await fetch('/api/create-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, desc, userId })
    })

    const data = await response.json()
    if (!response.ok) {
      alert(`Erro: ${data.error}`)
    } else {
      console.log('Chat criado com sucesso:', data)
      onChatCreated()
    }
  }


  return (
    <Dialog>
      <div className="group h-full aspect-square rounded-full p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
        <DialogTrigger className="w-full p-2 h-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center rounded-full group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
          <LuCirclePlus />
        </DialogTrigger>
      </div>
      <DialogContent className="border border-[#2a2a2a]">
        <DialogHeader>
          <DialogTitle>Create chat</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-2">
            <p>Name</p>
            <input
              id="name"
              placeholder="Jonh"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-0 hover:border-[#5067ff] focus:border-[#5067ff] transition-all duration-150 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Desc</p>
            <input
              id="desc"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description of your chat"
              className="w-full px-4 py-2 border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-0 hover:border-[#5067ff] focus:border-[#5067ff] transition-all duration-150 "
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex w-full justify-end">
              <div className="group w-fit rounded-xl p-[1px] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
                <button
                  onClick={() => handleCreateChat()}
                  className="flex items-center text-[14px] justify-center gap-1 w-fit bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 px-5 group-hover:bg-[#141414] transition-all duration-300 cursor-pointer"
                >
                  <CiSquarePlus size={20}/>
                  Create
                </button>
              </div>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}