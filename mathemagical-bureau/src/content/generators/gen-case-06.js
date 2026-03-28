// Generator for Case 06 — Probability
import { rand, pick, genId } from './utils.js'

const COLOURS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange']

// Helper: count two-dice outcomes where sum === target
function countSumOutcomes(target) {
  let count = 0
  for (let d1 = 1; d1 <= 6; d1++)
    for (let d2 = 1; d2 <= 6; d2++)
      if (d1 + d2 === target) count++
  return count
}

export default function gen(difficulty) {
  const fns = { 1: [d1DieCount, d1Marbles], 2: [d2TwoDiceSum, d2Complement], 3: [d3Conditional, d3TwoDiceComparison] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1DieCount() {
  // "How many outcomes are greater than N?" → 6 - N
  const threshold = rand(1, 4)
  const favourable = 6 - threshold
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `A standard die is rolled once. How many of the 6 outcomes are greater than ${threshold}?`,
    answer: favourable, answerType: 'numeric',
    hints: [
      `List the outcomes greater than ${threshold}: ${Array.from({length: 6 - threshold}, (_, i) => i + threshold + 1).join(', ')}.`,
      `Count them.`,
      `There are ${favourable} outcomes greater than ${threshold}.`
    ]
  }
}

function d1Marbles() {
  const cols    = shuffle([...COLOURS]).slice(0, 3)
  const counts  = [rand(2, 8), rand(2, 6), rand(2, 5)]
  const total   = counts.reduce((a, b) => a + b, 0)
  const target  = 0   // index
  const ans     = counts[target]
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `A bag contains ${counts[0]} ${cols[0]}, ${counts[1]} ${cols[1]}, and ${counts[2]} ${cols[2]} marbles.\nOne marble is picked at random. How many outcomes give a ${cols[0]} marble?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Favourable outcomes = number of ${cols[0]} marbles.`,
      `There are ${counts[0]} ${cols[0]} marbles.`,
      `Favourable outcomes = ${ans}.`
    ]
  }
}

function d2TwoDiceSum() {
  // Pick a sum that gives a non-trivial count (2-6)
  const validSums = [5, 6, 7, 8, 9]
  const target    = pick(validSums)
  const count     = countSumOutcomes(target)
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Two dice are rolled. How many of the 36 possible outcomes give a sum of exactly ${target}?`,
    answer: count, answerType: 'numeric',
    hints: [
      `List the pairs that add to ${target}. Each pair is (die 1, die 2).`,
      `Pairs: ${Array.from({length: 6}, (_, i) => i + 1).filter(d1 => target - d1 >= 1 && target - d1 <= 6).map(d1 => `(${d1},${target - d1})`).join(', ')}.`,
      `Count them: ${count} outcomes.`
    ]
  }
}

function d2Complement() {
  const n           = rand(1, 4)
  const favourable  = 6 - n   // outcomes > n
  const complement  = n       // outcomes ≤ n (i.e., NOT > n)
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `A die is rolled. The probability of rolling MORE than ${n} is ${favourable}/6.\nHow many outcomes are NOT more than ${n}? (i.e., how many are ${n} or less?)`,
    answer: complement, answerType: 'numeric',
    hints: [
      `Total outcomes = 6. Outcomes more than ${n} = ${favourable}.`,
      `Outcomes NOT more than ${n} = total − favourable.`,
      `= 6 − ${favourable} = ${complement}.`
    ]
  }
}

function d3Conditional() {
  // First die is fixed at d1. How many values on die 2 give total > threshold?
  const d1        = rand(2, 5)
  const threshold = d1 + 3   // ensures there are 1–3 valid outcomes
  // Second die needs d2 > threshold - d1, and d2 ∈ [1,6]
  const minD2     = threshold - d1 + 1
  const ans       = Math.max(0, 6 - minD2 + 1)
  if (ans <= 0 || ans >= 6) return d3Conditional()
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Two dice are rolled. The first die has already landed on ${d1}.\nHow many values on the second die give a total greater than ${threshold}?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `With first die = ${d1}, total > ${threshold} means second die > ${threshold} − ${d1} = ${threshold - d1}.`,
      `Second die values greater than ${threshold - d1}: ${Array.from({length: 6}, (_, i) => i + 1).filter(d => d > threshold - d1).join(', ')}.`,
      `There are ${ans} such values.`
    ]
  }
}

function d3TwoDiceComparison() {
  const t1 = pick([6, 7, 8])
  const t2 = pick([5, 6, 7].filter(t => t !== t1))
  const c1 = countSumOutcomes(t1)
  const c2 = countSumOutcomes(t2)
  const more   = c1 > c2 ? t1 : t2
  const fewer  = c1 > c2 ? t2 : t1
  const moreC  = Math.max(c1, c2)
  const fewerC = Math.min(c1, c2)
  const choices = [`Sum of ${t1}`, `Sum of ${t2}`, 'They are equally likely']
  const correct = c1 === c2 ? 'They are equally likely' : `Sum of ${more}`
  return {
    id: genId(), difficulty: 3, type: 'puzzle',
    question: `Two dice are rolled. Which sum is more likely: ${t1} or ${t2}?`,
    answer: 0, answerType: 'multiple-choice',
    choices, correctChoice: correct,
    hints: [
      `Count the number of outcomes (die 1, die 2) that give each sum.`,
      `Sum ${t1}: ${c1} outcomes. Sum ${t2}: ${c2} outcomes.`,
      `${c1 === c2 ? 'Equal number of outcomes — equally likely.' : `${moreC} > ${fewerC}, so sum ${more} is more likely.`}`
    ]
  }
}
