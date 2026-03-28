// Generator for Case 04 — Geometry (Shapes, Angles, Area)
import { rand, pick, genId, makeEven } from './utils.js'

const ROOMS   = ['the hidden chamber', 'the archive vault', 'the blueprint room', 'the concealed corridor']
const GARDENS = ['the estate garden', 'the courtyard', 'the rear plot', 'the disputed field']

export default function gen(difficulty) {
  const fns = { 1: [d1RectArea, d1TriArea], 2: [d2Perimeter, d2ThirdAngle], 3: [d3Composite, d3FindDim] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1RectArea() {
  const w   = rand(4, 20)
  const h   = rand(3, 15)
  const ans = w * h
  const room = pick(ROOMS)
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `The blueprint shows ${room}: ${w} m wide and ${h} m long.\nWhat is its area?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Area of a rectangle = length × width.`,
      `Area = ${w} × ${h}.`,
      `${w} × ${h} = ${ans} m².`
    ]
  }
}

function d1TriArea() {
  const b   = makeEven(rand(4, 20))
  const h   = makeEven(rand(4, 16))
  const ans = (b * h) / 2
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `A triangular section of the blueprint has base ${b} m and height ${h} m.\nWhat is its area?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Area of a triangle = ½ × base × height.`,
      `= ½ × ${b} × ${h} = ½ × ${b * h}.`,
      `= ${ans} m².`
    ]
  }
}

function d2Perimeter() {
  const w   = rand(5, 25)
  const h   = rand(3, 18)
  const ans = 2 * (w + h)
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `A rectangular room in the blueprint is ${w} m wide and ${h} m long.\nWhat is its perimeter?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Perimeter = distance all the way around. Add all four sides.`,
      `Two widths and two lengths: 2 × ${w} + 2 × ${h}.`,
      `= ${2 * w} + ${2 * h} = ${ans} m.`
    ]
  }
}

function d2ThirdAngle() {
  // Ensure a + b < 180 and each is at least 20
  const a   = rand(25, 80)
  const b   = rand(25, 155 - a)
  const ans = 180 - a - b
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `A triangular section of the blueprint has two known angles: ${a}° and ${b}°.\nWhat is the third angle?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `All three angles in a triangle add up to exactly 180°.`,
      `Third angle = 180° − ${a}° − ${b}°.`,
      `= ${ans}°.`
    ]
  }
}

function d3Composite() {
  // Big rectangle minus corner cutout
  const W   = rand(10, 20)
  const H   = rand(8, 16)
  const cw  = rand(3, Math.floor(W / 2))
  const ch  = rand(3, Math.floor(H / 2))
  const ans = W * H - cw * ch
  const garden = pick(GARDENS)
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `${garden} is L-shaped: the outer rectangle is ${W} m × ${H} m, with a ${cw} m × ${ch} m corner removed.\nWhat is the total area?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Surround-and-subtract: full rectangle area = ${W} × ${H} = ${W * H} m².`,
      `Cutout area = ${cw} × ${ch} = ${cw * ch} m².`,
      `L-shape area = ${W * H} − ${cw * ch} = ${ans} m².`
    ]
  }
}

function d3FindDim() {
  const w   = rand(4, 15)
  const h   = rand(4, 15)
  const A   = w * h
  const room = pick(ROOMS)
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `The blueprint shows ${room} with area ${A} m². One wall is ${w} m long.\nWhat is the length of the other wall?`,
    answer: h, answerType: 'numeric',
    hints: [
      `Area = length × width. So: ${A} = ${w} × width.`,
      `Rearrange: width = ${A} ÷ ${w}.`,
      `${A} ÷ ${w} = ${h} m.`
    ]
  }
}
