import { useState } from 'react'

type Option = {
  label: string
  value: string
  text: string
}

type QuizCompProps = {
  index: number
  question: string
  options: Option[]
}

export default function QuizComp({ index, question, options }: QuizCompProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md space-y-4">
      <p
        className="text-lg font-medium text-gray-900 dark:text-white"
        role="heading"
        aria-label={`Question number ${index}, multiple choice. ${question}`}
      >
        <span className="font-bold mr-1">{index}.</span>
        <span>{question}</span>
      </p>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start p-4 border rounded-md cursor-pointer transition-colors ${
              selected === option.value
                ? 'border-blue-600 bg-blue-100 dark:bg-blue-900/30'
                : 'border-gray-300 hover:border-blue-400 dark:border-gray-700'
            }`}
            aria-label={`Choice ${option.label} ${option.text} for question ${index}`}
          >
            <input
              type="radio"
              name={question}
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-900 dark:text-gray-100">
              <strong className="mr-1">{option.label}</strong>
              {option.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}