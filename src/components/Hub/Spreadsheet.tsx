'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LuCirclePlus } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { Skeleton } from '../ui/skeleton';

interface Row {
  id: string;
  left: string;
  right: string;
}

export default function Spreadsheet() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [loading, setLoading] = useState<boolean>(false)

  const [rows, setRows] = useState<Row[]>([
    { id: 'temp-1', left: '', right: '' },
  ]);

  const timeoutsRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const handleLeftChange = (id: string, value: string) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, left: value } : row
      )
    );

    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
    }

    timeoutsRef.current[id] = setTimeout(async () => {
      if (value.trim() === '') {
        setRows((prev) =>
          prev.map((row) =>
            row.id === id ? { ...row, right: '' } : row
          )
        );
        return;
      }

      const translated = await translate(value);

      const updatedRow: Row = {
        id,
        left: value,
        right: translated,
      };

      setRows((prev) =>
        prev.map((row) =>
          row.id === id ? updatedRow : row
        )
      );

      await handleCreateWord(updatedRow);
    }, 2000);
  };

  const handleCreateWord = async (row: Row) => {
    if (!userId) return console.warn('userId não encontrado na URL');

    if (!row.left.trim() || !row.right.trim()) return;

    const res = await fetch('/api/create-spreadsheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: row.left,
        translation: row.right,
        userId,
      }),
    });

    if (!res.ok) {
      console.error('Erro ao salvar palavra');
    } else {
      console.log(`Palavra "${row.left}" salva com sucesso!`);
    }
  };

  const translate = async (word: string): Promise<string> => {
    try {
      const res = await fetch(`https://lingva.ml/api/v1/pt/en/${encodeURIComponent(word)}`);
      const data = await res.json();
      return data.translation || '';
    } catch (err) {
      return '[erro]';
    }
  };

  const addRow = () => {
    const newId = `temp-${Date.now()}`;
    setRows([...rows, { id: newId, left: '', right: '' }]);
  };

  useEffect(() => {
    const handleGetSpreadSheet = async () => {
      if (!userId) return console.warn('userId não encontrado na URL');
      setLoading(true)

      const res = await fetch(`/api/spreadsheet?userId=${userId}`);
      const data = await res.json();

      const formattedRows: Row[] = data.spreadsheet.map((item: any) => ({
        id: item.id,
        left: item.word,
        right: item.translation
      }));

      setRows(formattedRows);
      setLoading(false)
    };

    handleGetSpreadSheet();
  }, [userId]);

  const handleDeleteWord = async (id: string) => {
    if (!userId) return console.warn('userId não encontrado');

    try {
      const res = await fetch('/api/delete-spreadsheet', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Erro ao deletar palavra');

      setRows((prev) => prev.filter(r => r.id !== id));
      console.log(`Palavra com ID "${id}" deletada com sucesso!`);
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  if (loading) return (
    <div className="w-4/5 flex flex-col items-center gap-2 mx-auto mt-20">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className='flex gap-2'>
          <Skeleton className="h-12 w-[250px]" />
          <Skeleton className="h-12 w-[250px]" />
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-4/5 flex flex-col items-end gap-5 mx-auto mt-10">
      <div className="group fit rounded-xl p-[1px] transition-all duration-150 hover:bg-gradient-to-tr hover:from-[#5067ff] hover:via-gray-400/70 hover:to-[#5067ff]/90">
        <button 
          className="flex items-center justify-center gap-1 px-4 w-full bg-[#181818] border border-[#2a2a2a] rounded-xl py-2 group-hover:bg-[#141414] transition-all duration-150 cursor-pointer"
          onClick={addRow}
        >
          <LuCirclePlus />
          Add row
        </button>
      </div>
      <div className="w-full rounded-md overflow-hidden border border-[#2a2a2a]">
        <table className="w-full border border-[#2a2a2a] rounded-xl">
          <thead>
            <tr className="bg-transparent">
              <th className="p-2 border border-[#2a2a2a] w-[200px] text-left rounded-tl-xl">English</th>
              <th className="p-2 border border-[#2a2a2a] bg-[#181818] w-[200px] text-left rounded-tr-xl">Portuguese</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="p-2 border border-[#2a2a2a]">
                  <input
                    type="text"
                    className="w-full rounded px-2 py-1 focus:outline-none focus:ring-0"
                    value={row.left}
                    onChange={(e) => handleLeftChange(row.id, e.target.value)}
                  />
                </td>
                <td className="p-2 border border-[#2a2a2a] bg-[#181818]">
                  <div className='flex items-center justify-between'>
                  {row.right}
                  <button onClick={() => handleDeleteWord(row.id)} className='cursor-pointer'>
                    <FiTrash />
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}