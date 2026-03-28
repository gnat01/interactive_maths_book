// Generator for Case 03 — Introduction to Algebra
import { rand, pick, genId } from './utils.js'

const THINGS = ['the house number', 'the code', 'the safe combination', 'the agent\'s badge number', 'the vault digit']

export default function gen(difficulty) {
  const fns = { 1: [d1Add, d1Sub], 2: [d2Mult, d2Word], 3: [d3TwoStepAdd, d3TwoStepSub] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1Add() {
  const x = rand(5, 30)
  const b = rand(3, 20)
  const c = x + b
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Solve for x:\nx + ${b} = ${c}`,
    answer: x, answerType: 'numeric',
    hints: [
      `x + ${b} = ${c}. To find x, undo the addition.`,
      `Subtract ${b} from both sides.`,
      `x = ${c} − ${b} = ${x}.`
    ]
  }
}

function d1Sub() {
  const x = rand(10, 40)
  const b = rand(3, 15)
  const c = x - b
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Solve for x:\nx − ${b} = ${c}`,
    answer: x, answerType: 'numeric',
    hints: [
      `x − ${b} = ${c}. To find x, undo the subtraction.`,
      `Add ${b} to both sides.`,
      `x = ${c} + ${b} = ${x}.`
    ]
  }
}

function d2Mult() {
  const a = rand(2, 9)
  const x = rand(3, 15)
  const c = a * x
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Solve for x:\n${a}x = ${c}`,
    answer: x, answerType: 'numeric',
    hints: [
      `${a}x = ${c} means ${a} multiplied by x equals ${c}.`,
      `Divide both sides by ${a}.`,
      `x = ${c} ÷ ${a} = ${x}.`
    ]
  }
}

function d2Word() {
  const x = rand(5, 25)
  const b = rand(3, 12)
  const c = x + b
  const thing = pick(THINGS)
  return {
    id: genId(), difficulty: 2, type: 'puzzle',
    question: `A message says: "${thing} plus ${b} equals ${c}. What is ${thing}?"`,
    answer: x, answerType: 'numeric',
    hints: [
      `Let x = ${thing}. The equation is: x + ${b} = ${c}.`,
      `Subtract ${b} from both sides.`,
      `x = ${c} − ${b} = ${x}.`
    ]
  }
}

function d3TwoStepAdd() {
  const a = rand(2, 6)
  const b = rand(3, 15)
  const x = rand(3, 12)
  const c = a * x + b
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Solve for x:\n${a}x + ${b} = ${c}`,
    answer: x, answerType: 'numeric',
    hints: [
      `Two steps. Undo addition first: subtract ${b} from both sides.`,
      `${a}x = ${c} − ${b} = ${c - b}.`,
      `Now divide both sides by ${a}: x = ${c - b} ÷ ${a} = ${x}.`
    ]
  }
}

function d3TwoStepSub() {
  const a = rand(2, 5)
  const b = rand(3, 10)
  const x = rand(4, 15)
  const c = a * x - b
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Solve for x:\n${a}x − ${b} = ${c}`,
    answer: x, answerType: 'numeric',
    hints: [
      `Two steps. Undo subtraction first: add ${b} to both sides.`,
      `${a}x = ${c} + ${b} = ${c + b}.`,
      `Now divide by ${a}: x = ${c + b} ÷ ${a} = ${x}.`
    ]
  }
}
