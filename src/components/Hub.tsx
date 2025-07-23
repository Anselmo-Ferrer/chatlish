'use client'

import { useState } from "react";
import Flashcards from "./Hub/Flashcards";
import Notes from "./Hub/Notes";
import HubBar from "./HubBar";
import Spreadsheet from "./Hub/Spreadsheet";
import Overview from "./Hub/Overview";
import Phrases from "./Hub/Phrases";
import Quizzes from "./Hub/Quizzes";

export default function Hub() {
  const [activeTab, setActiveTab] = useState("");
  return (
    <div className="w-1/2 flex flex-col items-center pt-5">
      <HubBar onTabChange={setActiveTab} />

      {activeTab === "SpreadSheet" && <Spreadsheet />}
      {activeTab === "Flashcards" && <Flashcards />}
      {activeTab === "Quizzes" && <Quizzes />}
      {activeTab === "Notes" && <Notes />}
      {activeTab === "Phrases" && <Phrases />}
      {activeTab === "Overview" && <Overview />}
    </div>
  )
}