'use client';

import { useState } from 'react';
import { LuCirclePlus } from "react-icons/lu";

interface Row {
  id: number;
  left: string;
  right: string;
}

export default function Spreadsheet() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, left: '', right: generateRightValue('') },
  ]);

  const handleLeftChange = (id: number, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, left: value, right: generateRightValue(value) }
          : row
      )
    );
  };

  const addRow = () => {
    const newId = rows.length + 1;
    setRows([
      ...rows,
      { id: newId, left: '', right: generateRightValue('') },
    ]);
  };

  return (
    <div className="w-4/5 flex flex-col items-end gap-5 mx-auto mt-10">
      <div className="group fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
        <button 
          className="flex items-center justify-center gap-1 px-4 w-full bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          onClick={addRow}
        >
          Adicionar Linha
        <LuCirclePlus />
        </button>
      </div>
      <div className="w-full rounded-md overflow-hidden border border-[#2a2a2a]">
        <table className="w-full border border border-[#2a2a2a] rounded-xl">
          <thead>
            <tr className="bg-transparent">
              <th className="p-2 border border border-[#2a2a2a] w-[200px] text-left rounded-tl-xl">English</th>
              <th className="p-2 border border border-[#2a2a2a] bg-[#181818] w-[200px] text-left rounded-tl-xl">Portuguese</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="p-2 border border border-[#2a2a2a]">
                  <input
                    type="text"
                    className="w-full rounded px-2 py-1"
                    value={row.left}
                    onChange={(e) =>
                      handleLeftChange(row.id, e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border border border-[#2a2a2a] bg-[#181818]">
                  {row.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function generateRightValue(input: string): string {
  return input ? `Gerado para: ${input}` : '';
}