import { LuCirclePlus } from "react-icons/lu";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CiSquarePlus } from "react-icons/ci";
import { useState } from "react";

export default function CreateDeck() {
  const [topic, setTopic] = useState('')
  const [quantity, setQuantity] = useState<number | undefined>(undefined);

  return (
    <Dialog>
      <div className="group w-fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
        <DialogTrigger className="flex items-center justify-center text-[14px] gap-1 px-4 w-[130px] bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
          <LuCirclePlus />
          Create deck
        </DialogTrigger>
      </div>
      <DialogContent className="border border-[#2a2a2a]">
        <DialogHeader>
          <DialogTitle>Create chat</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-2">
            <p>Topic</p>
            <input
              placeholder="Modal verbs"
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-0 hover:border-[#5067ff] focus:border-[#5067ff] transition-all duration-150 "
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>Quantity</p>
            <input
              type="number"
              onChange={(e) => setQuantity(Number(e.target.value))}
              placeholder="0"
              className="w-full px-4 py-2 border border-[#2a2a2a] rounded-md focus:outline-none focus:ring-0 hover:border-[#5067ff] focus:border-[#5067ff] transition-all duration-150 "
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex w-full justify-end">
              <div className="group w-fit rounded-xl p-[1px] transition-all duration-300 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
                <button
                  // onClick={() => handleCreateChat()}
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