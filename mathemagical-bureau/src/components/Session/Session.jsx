import { useState } from 'react'
import { completeCase, unlockCases, computeMastery, recordAttempt } from '../../engine/progress.js'
import { decideResponse, selectNextProblem, isPracticeComplete,
         classifyError, getFeedback, nextDifficulty, RESPONSE } from '../../engine/adaptive.js'
import Spark from './Spark.jsx'
import Concept from './Concept.jsx'
import Practice from '../Practice/Practice.jsx'
import BossPuzzle from './BossPuzzle.jsx'
import './Session.css'

const PHASE = {
  SPARK:    'spark',
  CONCEPT:  'concept',
  PRACTICE: 'practice',
  BOSS:     'boss',
  DEBRIEF:  'debrief'
}

export default function Session({ caseData, progress, onComplete, onBack }) {
  const [phase, setPhase]               = useState(PHASE.SPARK)
  const [sessionProgress, setSessionProgress] = useState(progress)
  const [sessionHistory, setSessionHistory]   = useState([])
  const [conceptStep, setConceptStep]   = useState(0)

  function advanceTo(nextPhase) {
    setPhase(nextPhase)
  }

  function handlePracticeComplete(updatedProgress, history) {
    const mastery = computeMastery(
      updatedProgress.cases[caseData.id]?.problemHistory ?? {}
    )
    const withMastery = completeCase(updatedProgress, caseData.id, mastery)
    const withUnlocks = unlockCases(withMastery, caseData.unlocks)
    setSessionProgress(withUnlocks)
    setSessionHistory(history)
    setPhase(PHASE.BOSS)
  }

  function handleBossComplete() {
    setPhase(PHASE.DEBRIEF)
  }

  function handleFinish() {
    onComplete(sessionProgress)
  }

  // ── No content guard ────────────────────────────────────────────────────
  if (!caseData.problems || caseData.problems.length === 0) {
    return (
      <div className="session session--empty">
        <div className="session__empty-card">
          <h2>This case is not yet declassified.</h2>
          <p>Content for <em>{caseData.title}</em> is being prepared by the Bureau.</p>
          <button className="session__back-btn" onClick={onBack}>← Return to Bureau</button>
        </div>
      </div>
    )
  }

  return (
    <div className="session">
      <PhaseIndicator phase={phase} />

      {phase === PHASE.SPARK && (
        <Spark
          spark={caseData.spark}
          onContinue={() => advanceTo(PHASE.CONCEPT)}
        />
      )}

      {phase === PHASE.CONCEPT && (
        <Concept
          steps={caseData.concept}
          currentStep={conceptStep}
          onNext={() => {
            if (conceptStep < caseData.concept.length - 1) {
              setConceptStep(s => s + 1)
            } else {
              advanceTo(PHASE.PRACTICE)
            }
          }}
        />
      )}

      {phase === PHASE.PRACTICE && (
        <Practice
          caseData={caseData}
          progress={sessionProgress}
          onComplete={handlePracticeComplete}
        />
      )}

      {phase === PHASE.BOSS && (
        <BossPuzzle
          bossPuzzle={caseData.bossPuzzle}
          onComplete={handleBossComplete}
        />
      )}

      {phase === PHASE.DEBRIEF && (
        <Debrief
          caseData={caseData}
          sessionProgress={sessionProgress}
          sessionHistory={sessionHistory}
          onFinish={handleFinish}
        />
      )}
    </div>
  )
}

function PhaseIndicator({ phase }) {
  const phases = ['spark', 'concept', 'practice', 'boss']
  const labels = { spark: 'Spark', concept: 'Briefing', practice: 'Investigation', boss: 'Boss Puzzle' }
  const current = phases.indexOf(phase)

  if (phase === 'debrief') return null

  return (
    <div className="phase-indicator">
      {phases.map((p, i) => (
        <div
          key={p}
          className={`phase-indicator__step
            ${i === current ? 'phase-indicator__step--active' : ''}
            ${i < current  ? 'phase-indicator__step--done'   : ''}
          `}
        >
          <div className="phase-indicator__dot" />
          <span className="phase-indicator__label">{labels[p]}</span>
        </div>
      ))}
    </div>
  )
}

function Debrief({ caseData, sessionProgress, sessionHistory, onFinish }) {
  const completed = Object.values(sessionProgress.cases).filter(c => c.status === 'completed').length
  const correct   = sessionHistory.filter(p => p.correct).length
  const total     = sessionHistory.length

  return (
    <div className="debrief">
      <div className="debrief__card">
        <div className="debrief__stamp">CASE CLOSED</div>
        <h1 className="debrief__title">{caseData.title}</h1>
        <p className="debrief__subtitle">Mission complete, Agent.</p>

        <div className="debrief__stats">
          <div className="debrief__stat">
            <span className="debrief__stat-value">{correct}/{total}</span>
            <span className="debrief__stat-label">Problems solved</span>
          </div>
          <div className="debrief__stat">
            <span className="debrief__stat-value">{completed}</span>
            <span className="debrief__stat-label">Cases closed total</span>
          </div>
        </div>

        {caseData.unlocks.length > 0 && (
          <p className="debrief__unlock">
            New dossiers have appeared on your desk.
          </p>
        )}

        <button className="debrief__btn" onClick={onFinish}>
          Return to the Bureau →
        </button>
      </div>
    </div>
  )
}
