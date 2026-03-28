// ── Adaptive Engine ──────────────────────────────────────────────────────
// Decides what to show next based on attempt history within a session.
// Never talks to localStorage directly — receives state, returns decisions.

export const RESPONSE = {
  NEXT_PROBLEM:   'next-problem',
  HINT:           'hint',
  NEW_EVIDENCE:   'new-evidence',   // re-explanation from a different angle
  SUB_CASE:       'sub-case',       // simpler foundational problem inserted
  BOSS_UNLOCK:    'boss-unlock',
  SESSION_END:    'session-end'
}

// Classify an error based on the wrong answer vs the correct answer
export function classifyError(question, given, correct) {
  if (given === null || given === undefined) return 'no-answer'

  const diff = Math.abs(Number(given) - Number(correct))

  // Off by a factor of 10 (column alignment error)
  if (diff > 0 && Number(correct) !== 0 && diff % 10 === 0) return 'column-alignment'

  // Very close — likely arithmetic slip, not conceptual
  if (diff <= 2) return 'arithmetic-slip'

  // Default: conceptual misunderstanding
  return 'conceptual'
}

// Given the session state for a single problem, decide what to do next
export function decideResponse(sessionProblemState) {
  const { attempts, hintsShown, correct } = sessionProblemState

  if (correct) return RESPONSE.NEXT_PROBLEM

  if (attempts === 1) return RESPONSE.HINT        // show hint 1
  if (attempts === 2) return RESPONSE.HINT        // show hint 2
  if (attempts === 3) return RESPONSE.NEW_EVIDENCE // re-explain from different angle
  if (attempts >= 4)  return RESPONSE.SUB_CASE    // insert simpler problem

  return RESPONSE.HINT
}

// Given the full session problem history, decide difficulty of next problem
export function nextDifficulty(sessionHistory, currentDifficulty) {
  const recent = sessionHistory.slice(-3)
  if (recent.length < 2) return currentDifficulty

  const allCorrectFast = recent.every(p => p.correct && p.attempts === 1)
  const multipleStruggles = recent.filter(p => p.attempts >= 3).length >= 2

  if (allCorrectFast)      return Math.min(3, currentDifficulty + 1)
  if (multipleStruggles)   return Math.max(1, currentDifficulty - 1)
  return currentDifficulty
}

// Pick the next problem from a case's problem bank
// Filters by difficulty, avoids already-seen problems
export function selectNextProblem(problems, difficulty, seenIds) {
  const pool = problems.filter(
    p => p.difficulty === difficulty && !seenIds.has(p.id)
  )

  if (pool.length > 0) {
    // Slight randomisation so it doesn't feel mechanical
    return pool[Math.floor(Math.random() * pool.length)]
  }

  // Fall back to adjacent difficulty if pool is exhausted
  const fallback = problems.filter(
    p => Math.abs(p.difficulty - difficulty) === 1 && !seenIds.has(p.id)
  )

  if (fallback.length > 0) {
    return fallback[Math.floor(Math.random() * fallback.length)]
  }

  // All problems seen — signal end of practice
  return null
}

// Determine whether a session's practice phase is complete
export function isPracticeComplete(sessionHistory, problems) {
  const correctCount = sessionHistory.filter(p => p.correct).length
  const totalProblems = problems.length

  // Complete if: 70%+ correct AND at least 4 attempted, or all problems seen
  const seenAll = sessionHistory.length >= totalProblems
  const goodEnough = sessionHistory.length >= 4 && correctCount / sessionHistory.length >= 0.7

  return seenAll || goodEnough
}

// Friendly Bureau-voice feedback — never says "wrong"
export const FEEDBACK = {
  'no-answer':        "The Bureau is still waiting for your answer, Agent.",
  'arithmetic-slip':  "Almost — check your arithmetic carefully. The answer is close.",
  'column-alignment': "Check how your columns line up — tens, units and hundreds each have their place.",
  'conceptual':       "Interesting theory. The evidence doesn't support it yet.",
  default:            "The Bureau's records don't match that answer. New evidence incoming."
}

export function getFeedback(errorType) {
  return FEEDBACK[errorType] ?? FEEDBACK.default
}
