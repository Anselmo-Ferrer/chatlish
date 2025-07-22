import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { question } = await req.json()

  try {
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
            content: question,
          },
        ],
      }),
    })

    const data = await response.json()

    if (data.choices?.[0]?.message?.content) {
      return NextResponse.json({ answer: data.choices[0].message.content })
    } else {
      console.error('Resposta inesperada:', data)
      return NextResponse.json({ error: 'Resposta inválida da IA' }, { status: 500 })
    }
  } catch (error) {
    console.error('Erro ao chamar OpenRouter:', error)
    return NextResponse.json({ error: 'Erro ao chamar IA' }, { status: 500 })
  }
}