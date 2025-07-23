import { LuSettings } from "react-icons/lu";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export default function Settings() {
  return (
      <Dialog>
        <div className="group w-4/5 rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <DialogTrigger className="flex items-center justify-center gap-1 w-full bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
            <LuSettings />
            Configurações
          </DialogTrigger>
        </div>
      <DialogContent className="border border-[#2a2a2a]">
        <DialogHeader>
          <DialogTitle>Create chat</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col w-full gap-2">
          <p>select your patern language</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}