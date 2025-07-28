import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const messages = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      chats: {
        select: {
          messages: {
            where: { role: 'user' },
            orderBy: { timeStamp: 'desc' },
            take: 100,
            select: {
              message: true,
            },
          },
        },
      },
    },
  });

  console.log(JSON.stringify(messages))

  const prompt = `
    Baseado nas mensagens abaixo, gere um diagnóstico com o nível de inglês da pessoa (A1, A2, B1, B2, C1, C2), e liste os 5 pontos fortes e 5 pontos fracos (como verbos, frases ou padrões de linguagem).

    Mensagens:
    ${JSON.stringify(messages)}

    Formato esperado:
    [
      {
        "level": "B1",
        "strengths": ["present simple", "can", "basic phrasal verbs", "daily vocabulary", "short questions"],
        "weaknesses": ["past perfect", "modal verbs", "conditionals", "complex sentences", "academic vocabulary"]
      }
    ]
  `

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'Flashwise',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1:free',
      messages: [
        {
          role: 'user',
          content: prompt
        },
      ],
    }),
  })

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || ''
  const match = content.match(/\[\s*{[\s\S]*?}\s*]/)

  if (!match) {
    return NextResponse.json({ error: 'Erro ao analisar resposta da IA' }, { status: 500 })
  }

  try {
    const overview = JSON.parse(match[0])
    return NextResponse.json({ overview })
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao fazer parse do JSON gerado' }, { status: 500 })
  }
}