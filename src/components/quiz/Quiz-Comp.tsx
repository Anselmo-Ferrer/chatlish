import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

type Option = {
  label: string
  value: string
  text: string
}

type QuizCompProps = {
  index: number
  question: string
  options: Option[]
  selected: string | null
  correct: boolean | null
  onSelect: (value: string) => void
}

export default function QuizComp({ index, question, options, selected, correct, onSelect }: QuizCompProps) {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md space-y-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <p
          className="text-lg font-semibold text-gray-900 dark:text-white"
          role="heading"
          aria-label={`Question number ${index}, multiple choice. ${question}`}
        >
          <span className="font-bold mr-2">{index}.</span>
          {question}
        </p>

        {correct !== null && (
          <span className={`flex items-center gap-2 text-sm font-medium ${correct ? 'text-green-600' : 'text-red-500'}`}>
            {correct ? (
              <>
                <FaCheckCircle /> Correct
              </>
            ) : (
              <>
                <FaTimesCircle /> Incorrect
              </>
            )}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-start p-4 border rounded-md cursor-pointer transition-colors ${
              selected === option.value
                ? 'border-blue-600 bg-blue-100 dark:bg-blue-900/30'
                : 'border-gray-300 hover:border-blue-400 dark:border-gray-700'
            }`}
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={option.value}
              checked={selected === option.value}
              onChange={() => onSelect(option.value)}
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