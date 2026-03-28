// ── Progress Engine ──────────────────────────────────────────────────────
// All localStorage reads and writes go through here.
// The rest of the app never touches localStorage directly.

const STORAGE_KEY = 'mathemagical-bureau'

const defaultState = () => ({
  agentName: null,
  createdAt: new Date().toISOString(),
  cases: {},
  learnerProfile: {
    strengths: [],
    struggles: [],
    errorPatterns: {}
  }
})

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : defaultState()
  } catch {
    return defaultState()
  }
}

export function saveProgress(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function getCaseStatus(progress, caseId) {
  return progress.cases[caseId]?.status ?? 'locked'
}

export function initCase(progress, caseId) {
  if (progress.cases[caseId]) return progress
  return {
    ...progress,
    cases: {
      ...progress.cases,
      [caseId]: {
        status: 'available',
        mastery: 0,
        completedAt: null,
        problemHistory: {}
      }
    }
  }
}

export function recordAttempt(progress, caseId, problemId, { correct, timeMs, errorType }) {
  const caseData = progress.cases[caseId] ?? { problemHistory: {} }
  const prev = caseData.problemHistory[problemId] ?? { attempts: 0, correct: false }

  const updated = {
    ...progress,
    cases: {
      ...progress.cases,
      [caseId]: {
        ...caseData,
        problemHistory: {
          ...caseData.problemHistory,
          [problemId]: {
            attempts: prev.attempts + 1,
            correct: correct || prev.correct,
            timeMs,
            errorType: correct ? null : errorType
          }
        }
      }
    }
  }

  if (errorType) {
    updated.learnerProfile = {
      ...updated.learnerProfile,
      errorPatterns: {
        ...updated.learnerProfile.errorPatterns,
        [errorType]: (updated.learnerProfile.errorPatterns[errorType] ?? 0) + 1
      }
    }
  }

  return updated
}

export function completeCase(progress, caseId, masteryScore) {
  return {
    ...progress,
    cases: {
      ...progress.cases,
      [caseId]: {
        ...progress.cases[caseId],
        status: 'completed',
        mastery: masteryScore,
        completedAt: new Date().toISOString()
      }
    }
  }
}

export function unlockCases(progress, caseIds) {
  const updates = {}
  for (const id of caseIds) {
    if (!progress.cases[id] || progress.cases[id].status === 'locked') {
      updates[id] = {
        status: 'available',
        mastery: 0,
        completedAt: null,
        problemHistory: {}
      }
    }
  }
  return {
    ...progress,
    cases: { ...progress.cases, ...updates }
  }
}

export function computeMastery(problemHistory) {
  const problems = Object.values(problemHistory)
  if (problems.length === 0) return 0
  const correct = problems.filter(p => p.correct).length
  // Weight by attempts: fewer attempts = higher mastery contribution
  const score = problems.reduce((sum, p) => {
    const weight = p.correct ? Math.max(1, 4 - p.attempts) / 3 : 0
    return sum + weight
  }, 0)
  return Math.min(1, score / problems.length)
}
