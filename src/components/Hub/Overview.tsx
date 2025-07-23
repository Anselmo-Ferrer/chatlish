export default function Overview() {
  return (
    <div className="w-full h-screen py-5 flex flex-col gap-5">
      <p className="font-bold text-3xl">My Overview</p>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">English level</p>
        <p className="font-bold text-3xl text-[#5067ff]">B1</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">Strenghts</p>
        <div className="flex gap-3">
          <div className="flex cursor-default items-center gap-2 rounded-full border border-emerald-400 bg-emerald-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-emerald-400/30">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]" />
            <p className="text-xs dark:text-emerald-100 text-emerald-800 font-medium">teste</p>
          </div>
          <div className="flex cursor-default items-center gap-2 rounded-full border border-emerald-400 bg-emerald-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-emerald-400/30">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]" />
            <p className="text-xs dark:text-emerald-100 text-emerald-800 font-medium">teste</p>
          </div>
          <div className="flex cursor-default items-center gap-2 rounded-full border border-emerald-400 bg-emerald-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-emerald-400/30">
            <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(34,197,94,0.8),0_0_8px_rgba(34,197,94,0.6)]" />
            <p className="text-xs dark:text-emerald-100 text-emerald-800 font-medium">teste</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold text-xl">Weakness</p>
        <div className="flex gap-3">
          <div className="flex cursor-default items-center gap-2 rounded-full border border-red-400 bg-red-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-red-400/30">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.8),0_0_8px_rgba(248,113,113,0.6)]" />
            <p className="text-xs dark:text-red-100 text-red-800 font-medium">teste</p>
          </div>
          <div className="flex cursor-default items-center gap-2 rounded-full border border-red-400 bg-red-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-red-400/30">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.8),0_0_8px_rgba(248,113,113,0.6)]" />
            <p className="text-xs dark:text-red-100 text-red-800 font-medium">teste</p>
          </div>
          <div className="flex cursor-default items-center gap-2 rounded-full border border-red-400 bg-red-400/20 px-3 py-1 shadow-inner backdrop-blur-sm transition-all duration-300 hover:bg-red-400/30">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-400 shadow-[0_0_4px_rgba(248,113,113,0.8),0_0_8px_rgba(248,113,113,0.6)]" />
            <p className="text-xs dark:text-red-100 text-red-800 font-medium">teste</p>
          </div>
        </div>
      </div>

    </div>
  )
}