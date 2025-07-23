import { ScrollArea } from "../ui/scroll-area";

export default function Phrases() {
  return (
    <div className="flex h-screen max-h-[calc(100vh-100px)] flex-col py-5">

      <ScrollArea className="h-full">
        {['1', '2', '3', '4', '5'].map((item, index) => (
          <div key={index} className="w-full h-[250px] border border-[#393939] rounded-xl mb-5">
            <div className="w-full h-1/2 border-b border-[#393939] p-5">
              <p>teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste </p>
            </div>
            <div className="w-full h-1/2 p-5 bg-[#2a2a2a] rounded-b-xl">
              <p>teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste </p>
            </div>
          </div>
        ))}
      </ScrollArea>

    </div>
  )
}