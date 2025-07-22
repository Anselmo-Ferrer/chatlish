import Image from "next/image";
import profileImage from "@/assets/imageProfile.jpeg"
import { CiLogout } from "react-icons/ci";
import { LuSettings } from "react-icons/lu";

const profiles = [
  {
    image: profileImage,
    name: "Rose",
    about: "chat about going a cinema"
  },
    {
    image: profileImage,
    name: "Rose",
    about: "chat about going a cinema"
  },
    {
    image: profileImage,
    name: "Rose",
    about: "chat about going a cinema"
  },
    {
    image: profileImage,
    name: "Rose",
    about: "chat about going a cinema"
  },
]

export default function SideBar() {
  return (
    <div className="w-76 bg-transparent h-screen flex flex-col justify-between border-r border-[#393939]">

      <div className="flex flex-col gap-2 px-2 py-5">
        <h1 className="font-bold mb-3 text-2xl border-b border-[#393939] pb-3">Your chats</h1>
        {profiles.map((item, index) => (
          <div
            key={index}
            className="group rounded-xl p-[1px] transition-all duration-150
            hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90"
          >
            <button key={index} className="flex items-center gap-2 bg-[#181818] border border-[#2a2a2a] p-2 rounded-xl w-full group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
              <Image className="w-8 h-8 rounded-full" src={item.image} alt="profile image"/>
              <div className="flex flex-col items-start">
                <p className="text-[14px]">{item.name}</p>
                <p className="text-[12px]">{item.about}</p>
              </div>
          </button>
        </div>
        ))}
      </div>

      <div className="flex w-full justify-between items-center border-t py-4 px-2 border-[#393939]">
        <div className="group w-4/5 rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button className="flex items-center justify-center gap-1 w-full bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
            <LuSettings />
            Configurações
          </button>
        </div>

        <div className="group h-full aspect-square rounded-full p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
          <button className="w-full h-full bg-[#181818] border border-[#2a2a2a] flex items-center justify-center rounded-full group-hover:bg-[#141414] transition-all duration-150 cursor-pointer">
            <CiLogout />
          </button>
        </div>
      </div>

    </div>
  )
}