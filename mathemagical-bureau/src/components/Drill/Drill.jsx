import { useState, useEffect, useRef } from 'react'
import { generateProblem } from '../../engine/generator.js'
import HintCard from '../Practice/HintCard.jsx'
import { MathBlock } from '../ui/MathText.jsx'
import './Drill.css'

const DRILL_KEY = 'mb-drill-best'

function loadBest(caseId) {
  try { return JSON.parse(localStorage.getItem(DRILL_KEY) || '{}')[caseId] ?? 0 }
  catch { return 0 }
}
function saveBest(caseId, best) {
  try {
    const data = JSON.parse(localStorage.getItem(DRILL_KEY) || '{}')
    data[caseId] = best
    localStorage.setItem(DRILL_KEY, JSON.stringify(data))
  } catch {}
}

function difficultyFromStreak(streak) {
  if (streak >= 10) return 3
  if (streak >= 5)  return 2
  return 1
}

function checkAnswer(problem, given) {
  if (problem.answerType === 'multiple-choice') return given === problem.correctChoice
  return Number(given) === Number(problem.answer)
}

// PHASES: 'question' | 'correct' | 'wrong' | 'revealed'
export default function Drill({ caseId, caseTitle, onExit }) {
  const [streak,       setStreak]       = useState(0)
  const [best,         setBest]         = useState(() => loadBest(caseId))
  const [problem,      setProblem]      = useState(() => generateProblem(caseId, 1))
  const [answer,       setAnswer]       = useState('')
  const [phase,        setPhase]        = useState('question')
  const [wrongCount,   setWrongCount]   = useState(0)
  const [hintsShown,   setHintsShown]   = useState(0)
  const [streakPop,    setStreakPop]     = useState(false)
  const inputRef = useRef(null)

  // Refocus input when a new problem is shown
  useEffect(() => {
    if (phase === 'question' && inputRef.current) inputRef.current.focus()
  }, [phase, problem])

  function nextProblem() {
    const newStreak = phase === 'correct' ? streak : 0   // wrong/revealed resets streak
    const nextDiff  = difficultyFromStreak(newStreak)
    setProblem(generateProblem(caseId, nextDiff))
    setAnswer('')
    setPhase('question')
    setWrongCount(0)
    setHintsShown(0)
  }

  function handleSubmit(e) {
    e?.preventDefault()
    if (!answer.trim() && problem.answerType !== 'multiple-choice') return
    if (!answer && problem.answerType === 'multiple-choice') return

    if (checkAnswer(problem, answer.trim())) {
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > best) {
        setBest(newStreak)
        saveBest(caseId, newStreak)
      }
      // Brief pop animation
      setStreakPop(true)
      setTimeout(() => setStreakPop(false), 350)
      setPhase('correct')
    } else {
      const newWrong = wrongCount + 1
      setWrongCount(newWrong)
      setHintsShown(Math.min(newWrong, problem.hints.length))
      setPhase('wrong')
    }
  }

  function handleReveal() {
    setPhase('revealed')
    setStreak(0)   // giving up resets streak
  }

  const difficulty    = difficultyFromStreak(streak)
  const diffDisplay   = '◆'.repeat(difficulty) + '◇'.repeat(3 - difficulty)
  const isMultiChoice = problem?.answerType === 'multiple-choice'

  if (!problem) {
    return (
      <div className="drill">
        <p>No problems available for this case.</p>
        <button className="drill__exit" onClick={onExit}>← Back to Bureau</button>
      </div>
    )
  }

  return (
    <div className="drill">
      {/* ── Header ── */}
      <header className="drill__header">
        <div className="drill__badge">Drill Mode</div>
        <h1 className="drill__title">{caseTitle}</h1>
        <div className="drill__stats">
          <div className="drill__streak-block">
            <span className="drill__streak-label">Streak</span>
            <div className={`drill__streak-value ${streakPop ? 'drill__streak-value--pop' : ''}`}>
              {streak}
            </div>
          </div>
          <div className="drill__streak-block">
            <span className="drill__streak-label">Best</span>
            <div className="drill__best-value">{best}</div>
          </div>
          <div className="drill__difficulty">{diffDisplay}</div>
        </div>
      </header>

      {/* ── Problem card ── */}
      <div className={`drill__card drill__card--${phase === 'correct' ? 'correct' : 'wrong'}`}>

        <p className="drill__question">
          <MathBlock text={problem.question} />
        </p>

        {/* Hints (revealed one at a time on wrong answers) */}
        {hintsShown > 0 && phase !== 'revealed' && (
          <HintCard hint={problem.hints[hintsShown - 1]} number={hintsShown} />
        )}

        {/* Revealed answer */}
        {phase === 'revealed' && (
          <p className="drill__reveal">
            Answer: {problem.answerType === 'multiple-choice' ? problem.correctChoice : problem.answer}
          </p>
        )}

        {/* Feedback line */}
        {phase === 'correct' && (
          <p className="drill__feedback drill__feedback--correct">
            Correct — streak: {streak}
          </p>
        )}
        {phase === 'wrong' && (
          <p className="drill__feedback">
            {hintsShown < problem.hints.length
              ? 'Not quite. A clue has been added above.'
              : 'All hints shown.'}
          </p>
        )}

        {/* Input / choices (only when answering) */}
        {(phase === 'question' || phase === 'wrong') && (
          <>
            {isMultiChoice ? (
              <div className="drill__choices">
                {problem.choices.map(c => (
                  <button
                    key={c}
                    type="button"
                    className={`drill__choice ${answer === c ? 'drill__choice--selected' : ''}`}
                    onClick={() => setAnswer(c)}
                  >{c}</button>
                ))}
              </div>
            ) : (
              <form className="drill__form" onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  className="drill__input"
                  type="text"
                  inputMode="numeric"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  placeholder="Your answer..."
                  autoComplete="off"
                />
                <button
                  className="drill__submit"
                  type="submit"
                  disabled={!answer.trim()}
                >Submit →</button>
              </form>
            )}

            {/* MC submit + skip */}
            {isMultiChoice && (
              <div className="drill__actions">
                <button
                  className="drill__submit"
                  onClick={handleSubmit}
                  disabled={!answer}
                >Submit →</button>
                {wrongCount >= 2 && (
                  <button className="drill__skip" onClick={handleReveal}>
                    Show answer
                  </button>
                )}
              </div>
            )}

            {/* Skip for numeric after 2 wrong */}
            {!isMultiChoice && wrongCount >= 2 && (
              <button className="drill__skip" onClick={handleReveal}>
                Show answer
              </button>
            )}
          </>
        )}

        {/* Next button after correct or revealed */}
        {(phase === 'correct' || phase === 'revealed') && (
          <div className="drill__actions">
            <button className="drill__next" onClick={nextProblem}>
              {phase === 'correct' ? 'Next →' : 'Next problem →'}
            </button>
          </div>
        )}
      </div>

      <button className="drill__exit" onClick={onExit}>
        ← Back to Bureau
      </button>
    </div>
  )
}
