import { useState } from 'react'
import { selectNextProblem, isPracticeComplete, decideResponse,
         classifyError, getFeedback, nextDifficulty, RESPONSE } from '../../engine/adaptive.js'
import { recordAttempt } from '../../engine/progress.js'
import HintCard from './HintCard.jsx'
import { MathBlock } from '../ui/MathText.jsx'
import './Practice.css'

export default function Practice({ caseData, progress, onComplete }) {
  const [difficulty, setDifficulty]     = useState(1)
  const [seenIds, setSeenIds]           = useState(new Set())
  const [sessionHistory, setSessionHistory] = useState([])
  const [currentProblem, setCurrentProblem] = useState(
    () => selectNextProblem(caseData.problems, 1, new Set())
  )
  const [answer, setAnswer]             = useState('')
  const [attempts, setAttempts]         = useState(0)
  const [hintsShown, setHintsShown]     = useState(0)
  const [feedback, setFeedback]         = useState(null)
  const [localProgress, setLocalProgress] = useState(progress)
  const [showHint, setShowHint]         = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!answer.trim() || !currentProblem) return

    const given   = answer.trim()
    const correct = checkAnswer(currentProblem, given)
    const newAttempts = attempts + 1

    const errorType = correct ? null : classifyError(currentProblem.question, given, currentProblem.answer)
    const updated = recordAttempt(localProgress, caseData.id, currentProblem.id, {
      correct, timeMs: 0, errorType
    })
    setLocalProgress(updated)

    if (correct) {
      const newHistory = [...sessionHistory, { id: currentProblem.id, correct: true, attempts: newAttempts }]
      setSessionHistory(newHistory)

      if (isPracticeComplete(newHistory, caseData.problems)) {
        onComplete(updated, newHistory)
        return
      }

      const newDiff = nextDifficulty(newHistory, difficulty)
      setDifficulty(newDiff)
      const newSeen = new Set([...seenIds, currentProblem.id])
      setSeenIds(newSeen)
      const next = selectNextProblem(caseData.problems, newDiff, newSeen)

      if (!next) {
        onComplete(updated, newHistory)
        return
      }

      setCurrentProblem(next)
      setAnswer('')
      setAttempts(0)
      setHintsShown(0)
      setFeedback(null)
      setShowHint(false)
    } else {
      setAttempts(newAttempts)
      const response = decideResponse({ attempts: newAttempts, hintsShown, correct: false })

      if (response === RESPONSE.HINT && newAttempts <= currentProblem.hints.length) {
        setShowHint(true)
        setHintsShown(newAttempts)
        setFeedback(getFeedback(errorType))
      } else {
        setFeedback(getFeedback(errorType))
      }
    }
  }

  if (!currentProblem) return null

  const isMultipleChoice = currentProblem.answerType === 'multiple-choice'

  return (
    <div className="practice">
      <div className="practice__card">
        <div className="practice__meta">
          <span className="practice__difficulty">
            {'◆'.repeat(currentProblem.difficulty)}{'◇'.repeat(3 - currentProblem.difficulty)}
          </span>
          <span className="practice__type">{currentProblem.type.replace('-', ' ')}</span>
        </div>

        <p className="practice__question"><MathBlock text={currentProblem.question} /></p>

        {showHint && (
          <HintCard
            hint={currentProblem.hints[hintsShown - 1]}
            number={hintsShown}
          />
        )}

        {feedback && !showHint && (
          <p className="practice__feedback">{feedback}</p>
        )}

        <form onSubmit={handleSubmit} className="practice__form">
          {isMultipleChoice ? (
            <div className="practice__choices">
              {currentProblem.choices.map(choice => (
                <button
                  key={choice}
                  type="button"
                  className={`practice__choice ${answer === choice ? 'practice__choice--selected' : ''}`}
                  onClick={() => setAnswer(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          ) : (
            <input
              className="practice__input"
              type="text"
              inputMode="numeric"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Your answer..."
              autoFocus
            />
          )}

          <button
            className="practice__submit"
            type="submit"
            disabled={!answer.trim()}
          >
            Submit →
          </button>
        </form>
      </div>
    </div>
  )
}

function checkAnswer(problem, given) {
  if (problem.answerType === 'multiple-choice') {
    return given === problem.correctChoice
  }
  return Number(given) === Number(problem.answer)
}
