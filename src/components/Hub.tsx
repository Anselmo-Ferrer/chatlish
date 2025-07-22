import Notes from "./Hub/Notes";
import HubBar from "./HubBar";

export default function Hub() {
  return (
    <div className="w-1/2 flex flex-col items-center pt-5">
      <HubBar />
      <Notes />
    </div>
  )
}