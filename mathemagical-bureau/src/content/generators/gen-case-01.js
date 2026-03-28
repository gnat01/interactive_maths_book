// Generator for Case 01 — Multi-digit Multiplication
import { rand, pick, genId } from './utils.js'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ITEMS   = ['reports', 'documents', 'coded messages', 'surveillance photos', 'field notes']
const ROLES   = ['agents', 'operatives', 'analysts', 'field officers', 'couriers']

export default function gen(difficulty) {
  const fns = { 1: [d1Direct, d1Cipher], 2: [d2Word, d2Grid], 3: [d3NearRound, d3ThreeByOne] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1Direct() {
  const a = rand(11, 19)
  const b = rand(3, 9)
  const ans = a * b
  const tens = Math.floor(a / 10) * 10
  const units = a % 10
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Calculate ${a} × ${b}`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Split ${a} into ${tens} + ${units}. Multiply each part by ${b}.`,
      `${tens} × ${b} = ${tens * b}.  And  ${units} × ${b} = ${units * b}.`,
      `Add the parts: ${tens * b} + ${units * b} = ${ans}.`
    ]
  }
}

function d1Cipher() {
  const k   = rand(3, 9)
  const pos = rand(1, 12)         // keep answer ≤ 108
  const letter = LETTERS[pos - 1]
  const ans = pos * k
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `The Bureau cipher multiplies each letter's position by key ${k}.\nLetter ${letter} is at position ${pos}. What is its encoded value?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `${letter} is the ${pos}th letter of the alphabet.`,
      `Encoded value = position × key = ${pos} × ${k}.`,
      `${pos} × ${k} = ${ans}.`
    ]
  }
}

function d2Word() {
  const n    = rand(12, 35)
  const k    = rand(12, 30)
  const item = pick(ITEMS)
  const role = pick(ROLES)
  const ans  = n * k
  const tensN = Math.floor(n / 10) * 10
  const unitsN = n % 10
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `${n} ${role} each carry ${k} ${item}. How many ${item} in total?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Total = number of ${role} × ${item} each = ${n} × ${k}.`,
      `Split ${n} = ${tensN} + ${unitsN}. So: ${tensN} × ${k} + ${unitsN} × ${k}.`,
      `${tensN * k} + ${unitsN * k} = ${ans}.`
    ]
  }
}

function d2Grid() {
  // Ensure both numbers have non-zero tens and units
  const a = rand(13, 39)
  const b = rand(13, 39)
  const ans   = a * b
  const tA    = Math.floor(a / 10) * 10
  const uA    = a % 10
  const tB    = Math.floor(b / 10) * 10
  const uB    = b % 10
  const pp    = [tA * tB, uA * tB, tA * uB, uA * uB]
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Use the grid method to calculate ${a} × ${b}.\nSplit both numbers into tens and units, multiply each pair, then add.`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Split: ${a} = ${tA} + ${uA},  ${b} = ${tB} + ${uB}.`,
      `Four products: ${tA}×${tB}=${pp[0]},  ${uA}×${tB}=${pp[1]},  ${tA}×${uB}=${pp[2]},  ${uA}×${uB}=${pp[3]}.`,
      `Sum: ${pp[0]} + ${pp[1]} + ${pp[2]} + ${pp[3]} = ${ans}.`
    ]
  }
}

function d3NearRound() {
  const base   = pick([50, 100, 20])
  const offset = rand(1, 3)
  const a      = base - offset
  const b      = rand(4, 9)
  const ans    = a * b
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Use the near-round shortcut to calculate ${a} × ${b}.\n(${a} is close to ${base}.)`,
    answer: ans, answerType: 'numeric',
    hints: [
      `${a} = ${base} − ${offset}. So ${a} × ${b} = (${base} − ${offset}) × ${b}.`,
      `= ${base} × ${b} − ${offset} × ${b} = ${base * b} − ${offset * b}.`,
      `= ${ans}.`
    ]
  }
}

function d3ThreeByOne() {
  const a   = rand(102, 289)
  const b   = rand(4, 8)
  const ans = a * b
  const h   = Math.floor(a / 100) * 100
  const t   = Math.floor((a % 100) / 10) * 10
  const u   = a % 10
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Calculate ${a} × ${b}`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Split ${a} = ${h} + ${t} + ${u}. Multiply each part by ${b}.`,
      `${h} × ${b} = ${h * b}.  ${t} × ${b} = ${t * b}.  ${u} × ${b} = ${u * b}.`,
      `${h * b} + ${t * b} + ${u * b} = ${ans}.`
    ]
  }
}
