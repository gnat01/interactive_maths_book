import generators from '../content/generators/index.js'

export function generateProblem(caseId, difficulty) {
  const gen = generators[caseId]
  if (!gen) return null
  return gen(Math.min(3, Math.max(1, Math.floor(difficulty))))
}

export function hasGenerator(caseId) {
  return caseId in generators
}
