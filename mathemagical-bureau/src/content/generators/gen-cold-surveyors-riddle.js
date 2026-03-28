// Generator for Cold Case — The Surveyor's Riddle (composite areas)
import { rand, pick, genId, makeEven } from './utils.js'

const FAMILIES = [['Caldwell', 'Ashford'], ['Merton', 'Hallow'], ['Crane', 'Vesperi']]
const SHAPES   = ['L-shaped plot', 'notched field', 'recessed garden', 'irregular parcel']

export default function gen(difficulty) {
  const fns = { 1: [d1RectArea], 2: [d2LShape, d2TwoRects], 3: [d3Frame, d3FindDim] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1RectArea() {
  const w   = rand(6, 25)
  const h   = rand(5, 18)
  const ans = w * h
  const [f1] = pick(FAMILIES)
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `The ${f1} plot is a rectangle: ${w} m wide and ${h} m long.\nWhat is its area?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Area of a rectangle = width × length.`,
      `= ${w} × ${h}.`,
      `= ${ans} m².`
    ]
  }
}

function d2LShape() {
  const W   = rand(10, 20)
  const H   = rand(8, 16)
  const cw  = rand(3, Math.floor(W / 2))
  const ch  = rand(3, Math.floor(H / 2))
  const ans = W * H - cw * ch
  const shape = pick(SHAPES)
  const [f1] = pick(FAMILIES)
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `The ${f1} ${shape}: outer rectangle ${W} m × ${H} m, with a ${cw} m × ${ch} m corner removed.\nWhat is the area?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Surround-and-subtract: full rectangle = ${W} × ${H} = ${W * H} m².`,
      `Removed corner = ${cw} × ${ch} = ${cw * ch} m².`,
      `Area = ${W * H} − ${cw * ch} = ${ans} m².`
    ]
  }
}

function d2TwoRects() {
  const w1 = rand(8, 20), h1 = rand(5, 12)
  const w2 = rand(4, 10), h2 = rand(3, 8)
  const ans = w1 * h1 + w2 * h2
  const [f1] = pick(FAMILIES)
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `The ${f1} plot consists of two rectangles joined together:\nRectangle 1: ${w1} m × ${h1} m.  Rectangle 2: ${w2} m × ${h2} m.\nWhat is the total area?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Calculate each rectangle separately, then add.`,
      `${w1} × ${h1} = ${w1 * h1}. And ${w2} × ${h2} = ${w2 * h2}.`,
      `Total = ${w1 * h1} + ${w2 * h2} = ${ans} m².`
    ]
  }
}

function d3Frame() {
  // Path of width p around a garden of size a × b
  const a   = rand(6, 14)
  const b   = rand(5, 10)
  const p   = rand(1, 3)
  const outerW = a + 2 * p
  const outerH = b + 2 * p
  const ans = outerW * outerH - a * b
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `A rectangular garden is ${a} m × ${b} m. A path ${p} m wide surrounds it on all sides.\nWhat is the area of the path?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `The outer edge of the path is (${a} + 2×${p}) × (${b} + 2×${p}) = ${outerW} × ${outerH}.`,
      `Outer area = ${outerW * outerH} m².  Inner (garden) = ${a * b} m².`,
      `Path area = ${outerW * outerH} − ${a * b} = ${ans} m².`
    ]
  }
}

function d3FindDim() {
  const w   = rand(4, 15)
  const h   = rand(4, 15)
  const A   = w * h
  const [f1] = pick(FAMILIES)
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `The deed records the ${f1} plot has area ${A} m². One boundary is ${w} m long.\nWhat is the length of the other boundary?`,
    answer: h, answerType: 'numeric',
    hints: [
      `Area = length × width. So ${A} = ${w} × other side.`,
      `Other side = ${A} ÷ ${w}.`,
      `= ${h} m.`
    ]
  }
}
