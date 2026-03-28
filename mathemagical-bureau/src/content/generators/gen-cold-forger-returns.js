// Generator for Cold Case — The Forger Returns (BODMAS / order of operations)
import { rand, pick, genId } from './utils.js'

export default function gen(difficulty) {
  const fns = { 1: [d1AddMult, d1TwoProducts], 2: [d2Brackets, d2SubMult], 3: [d3Nested, d3Complex] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1AddMult() {
  // a + b × c  (must NOT do left-to-right)
  const b = rand(2, 8)
  const c = rand(2, 8)
  const a = rand(2, 10)
  const ans = a + b * c
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Evaluate: ${a} + ${b} × ${c}`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Multiplication before addition (BODMAS).`,
      `${b} × ${c} = ${b * c}. Then add ${a}.`,
      `${a} + ${b * c} = ${ans}.`
    ]
  }
}

function d1TwoProducts() {
  // a × b + c × d
  const a = rand(2, 8), b = rand(2, 8)
  const c = rand(2, 6), d = rand(2, 6)
  const ans = a * b + c * d
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Evaluate: ${a} × ${b} + ${c} × ${d}`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Two multiplication steps first, then addition.`,
      `${a} × ${b} = ${a * b}.  ${c} × ${d} = ${c * d}.`,
      `${a * b} + ${c * d} = ${ans}.`
    ]
  }
}

function d2Brackets() {
  // (a + b) × c — brackets change the order
  const a = rand(3, 12)
  const b = rand(3, 10)
  const c = rand(2, 9)
  const ans = (a + b) * c
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Evaluate: (${a} + ${b}) × ${c}`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Brackets first.`,
      `${a} + ${b} = ${a + b}. Now: ${a + b} × ${c}.`,
      `${a + b} × ${c} = ${ans}.`
    ]
  }
}

function d2SubMult() {
  // a - b × c  (ensure answer > 0)
  const b = rand(2, 6)
  const c = rand(2, 6)
  const a = b * c + rand(3, 15)   // ensures a > b*c
  const ans = a - b * c
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Evaluate: ${a} − ${b} × ${c}`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Multiplication before subtraction.`,
      `${b} × ${c} = ${b * c}. Then subtract from ${a}.`,
      `${a} − ${b * c} = ${ans}.`
    ]
  }
}

function d3Nested() {
  // a × (b + c × d) — BODMAS inside the brackets, then multiply
  const c = rand(2, 5), d = rand(2, 5)
  const b = rand(2, 8)
  const a = rand(2, 6)
  const inner = b + c * d
  const ans   = a * inner
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Evaluate: ${a} × (${b} + ${c} × ${d})`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Inside the brackets, multiplication first: ${c} × ${d} = ${c * d}.`,
      `Bracket becomes: ${b} + ${c * d} = ${inner}. Now: ${a} × ${inner}.`,
      `${a} × ${inner} = ${ans}.`
    ]
  }
}

function d3Complex() {
  // a × (b + c) − d × e
  const a = rand(2, 6), b = rand(3, 8), c = rand(3, 8)
  const d = rand(2, 5), e = rand(2, 5)
  const ans = a * (b + c) - d * e
  if (ans < 0) return d3Complex()
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Evaluate: ${a} × (${b} + ${c}) − ${d} × ${e}`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Brackets first: ${b} + ${c} = ${b + c}. Now: ${a} × ${b + c} − ${d} × ${e}.`,
      `Both multiplications: ${a} × ${b + c} = ${a * (b + c)}. And ${d} × ${e} = ${d * e}.`,
      `${a * (b + c)} − ${d * e} = ${ans}.`
    ]
  }
}
