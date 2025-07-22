export default function Notes() {
  return (
    <div className="flex w-full h-full my-5 rounded-xl">

      <div className="w-1/5 h-full border border-[#393939] rounded-xl py-3 px-1">
        <p>Your notes</p>
        <div className="flex flex-col gap-2">
          <div className="px-2 py-3 bg-white">
            <p>Nota 1</p>
          </div>
          <div className="px-2 py-3 bg-white">
            <p>Nota 1</p>
          </div>
          <div className="px-2 py-3 bg-white">
            <p>Nota 1</p>
          </div>
        </div>
      </div>

      <div className="w-4/5 h-full px-5 py-5">
        <div className="flex items-center justify-between">
          <p className="font-bold text-3xl">Untiteled</p>
          <div className="flex items-center gap-2">
            <p className="text-md text-emerald-400">saved</p>
            <button className="bg-blue-900 px-3 py-1 rounded-xl">Delete</button>
          </div>
        </div>
      </div>

    </div>
  )
}