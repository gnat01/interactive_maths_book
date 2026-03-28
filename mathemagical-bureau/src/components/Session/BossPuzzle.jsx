import { useState } from 'react'
import { MathBlock } from '../ui/MathText.jsx'
import MathText from '../ui/MathText.jsx'
import './BossPuzzle.css'

export default function BossPuzzle({ bossPuzzle, onComplete }) {
  const [answer, setAnswer]       = useState('')
  const [hintsShown, setHintsShown] = useState(0)
  const [solved, setSolved]       = useState(false)
  const [wrong, setWrong]         = useState(false)

  const question = bossPuzzle.questionOverride ?? bossPuzzle.question
  const correctAnswer = bossPuzzle.answerOverride ?? bossPuzzle.answer

  function handleSubmit(e) {
    e.preventDefault()
    if (!answer.trim()) return

    const isCorrect = answer.trim().toUpperCase() === String(correctAnswer).toUpperCase()
    if (isCorrect) {
      setSolved(true)
      setWrong(false)
    } else {
      setWrong(true)
    }
  }

  function handleHint() {
    if (hintsShown < bossPuzzle.hints.length) {
      setHintsShown(h => h + 1)
    }
  }

  function handleLeaveOpen() {
    onComplete()
  }

  return (
    <div className="boss-puzzle">
      <div className="boss-puzzle__card">
        <div className="boss-puzzle__label">Boss Puzzle</div>
        <h2 className="boss-puzzle__title">{bossPuzzle.title}</h2>

        <div className="boss-puzzle__question">
          <MathBlock text={question} />
        </div>

        {/* Hints revealed one at a time */}
        {hintsShown > 0 && (
          <div className="boss-puzzle__hints">
            {bossPuzzle.hints.slice(0, hintsShown).map((hint, i) => (
              <div key={i} className="boss-puzzle__hint">
                <span className="boss-puzzle__hint-label">Evidence {i + 1} —</span> <MathText text={hint} />
              </div>
            ))}
          </div>
        )}

        {!solved && (
          <form onSubmit={handleSubmit} className="boss-puzzle__form">
            <input
              className={`boss-puzzle__input ${wrong ? 'boss-puzzle__input--wrong' : ''}`}
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Your answer..."
              autoFocus
            />
            {wrong && (
              <p className="boss-puzzle__feedback">
                Interesting theory. The Bureau's records don't match. Check your reasoning.
              </p>
            )}
            <div className="boss-puzzle__actions">
              <button type="submit" className="boss-puzzle__btn boss-puzzle__btn--primary">
                Submit
              </button>
              {hintsShown < bossPuzzle.hints.length && (
                <button type="button" className="boss-puzzle__btn boss-puzzle__btn--hint" onClick={handleHint}>
                  Request evidence
                </button>
              )}
              {bossPuzzle.canLeaveOpen && (
                <button type="button" className="boss-puzzle__btn boss-puzzle__btn--defer" onClick={handleLeaveOpen}>
                  Leave open for now
                </button>
              )}
            </div>
          </form>
        )}

        {solved && (
          <div className="boss-puzzle__solved">
            <div className="boss-puzzle__solved-stamp">SOLVED</div>
            <p className="boss-puzzle__solved-text">
              Excellent work, Agent. The Bureau commends your reasoning.
            </p>
            <button className="boss-puzzle__btn boss-puzzle__btn--primary" onClick={onComplete}>
              File the report →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
