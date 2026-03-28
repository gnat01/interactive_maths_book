// Generator for Cold Case — The Infinite Mirror (sequences)
import { rand, pick, genId } from './utils.js'

export default function gen(difficulty) {
  const fns = { 1: [d1NextTerm, d1ArithNth], 2: [d2Triangular, d2ArithValue], 3: [d3GaussSum, d3FindTermNumber] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1NextTerm() {
  const start = rand(1, 20)
  const step  = rand(2, 8)
  const terms = [start, start + step, start + 2 * step, start + 3 * step]
  const ans   = start + 4 * step
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `What is the next term in this sequence?\n${terms.join(', ')}, ...`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Find the difference between consecutive terms: ${terms[1]} − ${terms[0]} = ${step}.`,
      `Each term increases by ${step}.`,
      `Next term: ${terms[3]} + ${step} = ${ans}.`
    ]
  }
}

function d1ArithNth() {
  const start = rand(1, 10)
  const step  = rand(3, 7)
  const n     = rand(6, 12)
  const ans   = start + (n - 1) * step
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `A sequence starts at ${start} and adds ${step} each time.\nWhat is the ${n}th term?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Nth term = start + (N − 1) × step.`,
      `= ${start} + (${n} − 1) × ${step} = ${start} + ${n - 1} × ${step}.`,
      `= ${start} + ${(n - 1) * step} = ${ans}.`
    ]
  }
}

function d2Triangular() {
  const n   = rand(6, 12)
  const ans = (n * (n + 1)) / 2
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `The forger hides documents at triangular number positions: 1, 3, 6, 10, 15...\nWhat is the ${n}th triangular number?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `The Nth triangular number = N × (N + 1) ÷ 2.`,
      `= ${n} × ${n + 1} ÷ 2 = ${n * (n + 1)} ÷ 2.`,
      `= ${ans}.`
    ]
  }
}

function d2ArithValue() {
  const start = rand(2, 15)
  const step  = rand(3, 8)
  const n     = rand(8, 20)
  const ans   = start + (n - 1) * step
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Sequence: ${start}, ${start + step}, ${start + 2 * step}...\nUsing the formula T_n = ${start} + (n − 1) × ${step}, find T_${n}.`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Substitute n = ${n} into T_n = ${start} + (n − 1) × ${step}.`,
      `= ${start} + (${n} − 1) × ${step} = ${start} + ${n - 1} × ${step}.`,
      `= ${start} + ${(n - 1) * step} = ${ans}.`
    ]
  }
}

function d3GaussSum() {
  // Sum of 1 to N, N must be even for clean pairing demo
  const N   = pick([10, 12, 14, 16, 18, 20])
  const ans = (N * (N + 1)) / 2
  const pairs = N / 2
  const pairSum = N + 1
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Use Gauss's pairing method to find: 1 + 2 + 3 + ... + ${N}\n(Do NOT add one by one.)`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Pair first and last: 1 + ${N} = ${pairSum}. And 2 + ${N - 1} = ${pairSum}. All pairs sum to ${pairSum}.`,
      `There are ${pairs} such pairs (since ${N} ÷ 2 = ${pairs}).`,
      `Total = ${pairs} × ${pairSum} = ${ans}.`
    ]
  }
}

function d3FindTermNumber() {
  const start = rand(2, 10)
  const step  = rand(3, 7)
  const n     = rand(8, 18)
  const value = start + (n - 1) * step
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `In the sequence ${start}, ${start + step}, ${start + 2 * step}... (step = ${step})\nWhich term number equals ${value}?`,
    answer: n, answerType: 'numeric',
    hints: [
      `Use: value = start + (N − 1) × step. Rearrange to find N.`,
      `${value} = ${start} + (N − 1) × ${step}. So (N − 1) × ${step} = ${value - start}.`,
      `N − 1 = ${value - start} ÷ ${step} = ${(value - start) / step}. So N = ${n}.`
    ]
  }
}
