import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { topic, quantity } = await req.json()

  if (!topic || !quantity) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const prompt = `
  Gere exatamente ${quantity} questões de quiz baseadas no seguinte conteúdo:

  """${topic}"""

  Cada questão deve ser um objeto com os seguintes campos:

  - "question": uma pergunta relevante sobre o conteúdo (formato de múltipla escolha)
  - "answer": a alternativa correta (por exemplo: "C")
  - "optionA": uma alternativa plausível, mas incorreta
  - "optionB": uma alternativa plausível, mas incorreta
  - "optionC": a alternativa correta (conforme o campo "answer")
  - "optionD": uma alternativa incorreta, mas razoável

  Regras:
  - A alternativa correta pode ser qualquer uma das opções (A, B, C ou D)
  - O valor do campo "answer" deve ser exatamente "A", "B", "C" ou "D"
  - As alternativas devem ser curtas, claras e relacionadas ao conteúdo
  - Não repita perguntas

  Retorne a resposta como um array JSON puro, sem nenhuma explicação antes ou depois.

  Formato esperado:
  [
    {
      "question": "Qual é a função de um compilador em programação?",
      "answer": "B",
      "optionA": "Executar o código diretamente",
      "optionB": "Traduzir o código fonte para código de máquina",
      "optionC": "Corrigir erros automaticamente",
      "optionD": "Gerar interfaces gráficas"
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
    const quizSet = JSON.parse(match[0])
    return NextResponse.json({ quizSet })
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao fazer parse do JSON gerado' }, { status: 500 })
  }
}