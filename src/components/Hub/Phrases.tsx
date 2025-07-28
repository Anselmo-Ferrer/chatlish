'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LuCirclePlus } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from '../ui/skeleton';

interface Phrase {
  id: string;
  left: string;
  right: string;
}

export default function Phrases() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [loading, setLoading] = useState<boolean>(false)

  const [phrases, setPhrases] = useState<Phrase[]>([
    { id: 'temp-1', left: '', right: '' },
  ]);

  const timeoutsRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const translate = async (text: string): Promise<string> => {
    try {
      const res = await fetch(`https://lingva.ml/api/v1/pt/en/${encodeURIComponent(text)}`);
      const data = await res.json();
      return data.translation || '';
    } catch (err) {
      return '[erro]';
    }
  };

  const handleLeftChange = (id: string, value: string) => {
    setPhrases((prev) =>
      prev.map((row) =>
        row.id === id ? { ...row, left: value } : row
      )
    );

    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
    }

    timeoutsRef.current[id] = setTimeout(async () => {
      if (value.trim() === '') {
        setPhrases((prev) =>
          prev.map((row) =>
            row.id === id ? { ...row, right: '' } : row
          )
        );
        return;
      }

      const translated = await translate(value);

      const updatedRow: Phrase = {
        id,
        left: value,
        right: translated,
      };

      setPhrases((prev) =>
        prev.map((row) =>
          row.id === id ? updatedRow : row
        )
      );

      await handleCreatePhrase(updatedRow);
    }, 2000);
  };

  const handleCreatePhrase = async (phrase: Phrase) => {
    if (!userId) return console.warn('userId não encontrado na URL');

    if (!phrase.left.trim() || !phrase.right.trim()) return;

    const res = await fetch('/api/create-phrase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phrase: phrase.left,
        translation: phrase.right,
        userId,
      }),
    });

    if (!res.ok) {
      console.error('Erro ao salvar frase');
    } else {
      console.log(`Frase "${phrase.left}" salva com sucesso!`);
    }
  };

  const handleDeletePhrase = async (id: string) => {
    if (!userId) return console.warn('userId não encontrado');

    try {
      const res = await fetch('/api/delete-phrase', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error('Erro ao deletar frase');

      setPhrases((prev) => prev.filter(r => r.id !== id));
      console.log(`Frase com ID "${id}" deletada com sucesso!`);
    } catch (err) {
      console.error('Erro ao deletar:', err);
    }
  };

  const addPhrase = () => {
    const newId = `temp-${Date.now()}`;
    setPhrases([...phrases, { id: newId, left: '', right: '' }]);
  };

  useEffect(() => {
    const handleGetPhrases = async () => {
      if (!userId) return console.warn('userId não encontrado na URL');
      setLoading(true)

      const res = await fetch(`/api/phrases?userId=${userId}`);
      const data = await res.json();

      console.log(data)

      const formattedPhrases: Phrase[] = data.phrases.map((item: any) => ({
        id: item.id,
        left: item.phrase,
        right: item.translation
      }));

      setPhrases(formattedPhrases);
      setLoading(false)
    };

    handleGetPhrases();
  }, [userId]);

  if (loading) return (
    <div className="w-full flex flex-col items-center py-20 gap-4">
      <Skeleton className="h-[200px] w-4/5" />
      <Skeleton className="h-[200px] w-4/5" />
      <Skeleton className="h-[200px] w-4/5" />
    </div>
  )

  return (
    <div className="flex h-screen max-h-[calc(100vh-100px)] w-full flex-col pt-10 pb-5">
      <div className="flex justify-end px-5 pb-4">
        <button
          onClick={addPhrase}
          className="flex items-center gap-2 px-4 py-2 bg-[#181818] border border-[#2a2a2a] rounded-xl hover:bg-[#141414]"
        >
          <LuCirclePlus />
          Add Phrase 
        </button>
      </div>
      <ScrollArea className="h-full px-5">
        {phrases.map((row) => (
          <div key={row.id} className="w-full h-[250px] border border-[#393939] rounded-xl mb-5">
            <div className="w-full h-1/2 border-b border-[#393939] p-5">
              <textarea
                className="w-full h-full focus:outline-none focus:ring-0 resize-none bg-transparent"
                value={row.left}
                onChange={(e) => handleLeftChange(row.id, e.target.value)}
              />
            </div>
            <div className="w-full h-1/2 p-5 bg-[#2a2a2a] rounded-b-xl flex gap-3 justify-between items-start">
              <p>{row.right}</p>
              <button onClick={() => handleDeletePhrase(row.id)} className="text-red-500 cursor-pointer">
                <FiTrash color='#fff'/>
              </button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}