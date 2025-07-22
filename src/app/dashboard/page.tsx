import Chat from "@/components/Chat";
import Hub from "@/components/Hub";

export default function Page() {
  return (
    <div className="w-full h-full flex px-5 gap-10">
      <Chat />
      <div className=" h-screen max-h-[calc(100vh-0px)] w-[1px] bg-[#393939]"></div>
      <Hub />
    </div>
  )
}