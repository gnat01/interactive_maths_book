// Generator for Cold Case — The Broken Scale (logical deduction via balance)
import { rand, pick, genId } from './utils.js'

const SHAPES  = [['diamond', '◆'], ['circle', '●'], ['square', '■'], ['star', '★'], ['triangle', '▲']]

export default function gen(difficulty) {
  const fns = { 1: [d1SimpleChain], 2: [d2TwoStep], 3: [d3ThreeStep] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1SimpleChain() {
  // 1 A = k B.  Find: how many B equal m A?
  const [nameA, symA] = pick(SHAPES)
  const remaining     = SHAPES.filter(s => s[0] !== nameA)
  const [nameB, symB] = pick(remaining)
  const k   = rand(2, 5)      // 1 A = k B
  const m   = rand(2, 4)      // m A = ? B
  const ans = m * k
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `On a balance scale: 1 ${symA} = ${k} ${symB}.\nHow many ${symB} balance ${m} ${symA}?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `If 1 ${nameA} = ${k} ${nameB}, then ${m} ${nameA} = ${m} × ${k} ${nameB}.`,
      `${m} × ${k} = ${ans}.`,
      `${ans} ${symB} balance ${m} ${symA}.`
    ]
  }
}

function d2TwoStep() {
  // 1 A = a B,  1 B = b C.  Find: how many C equal 1 A?
  const [nameA, symA] = SHAPES[0]
  const [nameB, symB] = SHAPES[1]
  const [nameC, symC] = SHAPES[2]
  const a   = rand(2, 4)
  const b   = rand(2, 4)
  const ans = a * b
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Scale 1: 1 ${symA} = ${a} ${symB}\nScale 2: 1 ${symB} = ${b} ${symC}\nHow many ${symC} balance 1 ${symA}?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `From Scale 1: 1 ${nameA} = ${a} ${nameB}.`,
      `From Scale 2: each ${nameB} = ${b} ${nameC}. So ${a} ${nameB} = ${a} × ${b} ${nameC}.`,
      `1 ${nameA} = ${ans} ${symC}.`
    ]
  }
}

function d3ThreeStep() {
  // 1 A = a B,  1 B = b C,  find m A in C
  const [nameA, symA] = SHAPES[0]
  const [nameB, symB] = SHAPES[1]
  const [nameC, symC] = SHAPES[2]
  const a   = rand(2, 3)
  const b   = rand(2, 3)
  const m   = rand(2, 4)
  const ans = m * a * b
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Scale 1: 1 ${symA} = ${a} ${symB}\nScale 2: 1 ${symB} = ${b} ${symC}\nHow many ${symC} balance ${m} ${symA}?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `First: 1 ${nameA} = ${a} ${nameB} = ${a} × ${b} ${nameC} = ${a * b} ${nameC}.`,
      `So ${m} ${nameA} = ${m} × ${a * b} ${nameC}.`,
      `${m} × ${a * b} = ${ans}.`
    ]
  }
}
