// ── Content Registry ─────────────────────────────────────────────────────
// All cases register here. The engine imports from this file only.
// To add a new case: create the file, import it, add it to the array.

import case01 from './cases/case-01-forgers-code.js'
import case02 from './cases/case-02-missing-inheritance.js'
import case03 from './cases/case-03-ghost-equation.js'
import case04 from './cases/case-04-architects-secret.js'
import case05 from './cases/case-05-census-conspiracy.js'
import case06 from './cases/case-06-probability-heist.js'

import coldBrokenScale    from './cold-cases/cold-broken-scale.js'
import coldInfiniteMirror from './cold-cases/cold-infinite-mirror.js'
import coldForgerReturns  from './cold-cases/cold-forger-returns.js'
import coldSurveyorsRiddle from './cold-cases/cold-surveyors-riddle.js'

export const ALL_CASES = [
  case01,
  case02,
  case03,
  case04,
  case05,
  case06,
  coldBrokenScale,
  coldInfiniteMirror,
  coldForgerReturns,
  coldSurveyorsRiddle
]

export const CASE_MAP = Object.fromEntries(ALL_CASES.map(c => [c.id, c]))

// Cases that are available at the very start (no prerequisites)
export const INITIAL_UNLOCKED = ALL_CASES
  .filter(c => c.prerequisites.length === 0)
  .map(c => c.id)
