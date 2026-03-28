// Generator for Case 02 — Long Division & Fractions
import { rand, pick, genId, gcd } from './utils.js'

const DIVISORS = [2, 3, 4, 5, 6, 8, 9]

export default function gen(difficulty) {
  const fns = { 1: [d1CleanDivision, d1Simplify], 2: [d2Remainder, d2MissingNumerator], 3: [d3WhichBigger, d3WordFraction] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1CleanDivision() {
  const b   = pick(DIVISORS)
  const q   = rand(11, 25)
  const a   = b * q
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `The estate of ${a} gold coins is divided equally among ${b} heirs.\nHow many coins does each heir receive?`,
    answer: q, answerType: 'numeric',
    hints: [
      `This is a division problem: ${a} ÷ ${b}.`,
      `Think: how many times does ${b} go into ${a}?`,
      `${a} ÷ ${b} = ${q}.`
    ]
  }
}

function d1Simplify() {
  // Pick a fraction n/d where gcd(n,d) = k > 1
  const k  = pick([2, 3, 4])
  const n0 = pick([1, 2, 3, 4, 5])
  const d0 = pick([2, 3, 4, 5, 6, 7, 8].filter(x => x !== n0))
  const n  = n0 * k
  const d  = d0 * k
  const g  = gcd(n, d)
  const sn = n / g
  const sd = d / g
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Simplify the fraction ${n}/${d}.\nWhat is the numerator of the simplified fraction?`,
    answer: sn, answerType: 'numeric',
    hints: [
      `Find the largest number that divides both ${n} and ${d}.`,
      `The GCD of ${n} and ${d} is ${g}. Divide both by ${g}.`,
      `${n} ÷ ${g} = ${sn}. The simplified fraction is ${sn}/${sd}.`
    ]
  }
}

function d2Remainder() {
  const b = pick(DIVISORS)
  const q = rand(8, 20)
  const r = rand(1, b - 1)
  const a = b * q + r
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Calculate ${a} ÷ ${b}.\nWhat is the remainder?`,
    answer: r, answerType: 'numeric',
    hints: [
      `Find the largest multiple of ${b} that is ≤ ${a}.`,
      `${b} × ${q} = ${b * q}. That is ${r} less than ${a}.`,
      `So the remainder is ${r}.`
    ]
  }
}

function d2MissingNumerator() {
  const n  = rand(1, 6)
  const d  = pick([2, 3, 4, 5, 6, 7])
  const k  = pick([2, 3, 4, 5])
  const td = d * k
  const ans = n * k
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Complete the equivalent fraction: ${n}/${d} = ?/${td}\nWhat number goes in the box?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `To get from denominator ${d} to ${td}, you multiply by ${k}.`,
      `You must do the same to the numerator.`,
      `${n} × ${k} = ${ans}.`
    ]
  }
}

function d3WhichBigger() {
  // Guarantee a/b > c/d by construction: a/b > 1/2, c/d < 1/2
  const b  = pick([5, 6, 7, 8])
  const d  = pick([5, 6, 7, 8].filter(x => x !== b))
  const n1 = rand(Math.floor(b / 2) + 1, b - 1)   // n1/b > 1/2
  const n2 = rand(1, Math.ceil(d / 2) - 1)          // n2/d < 1/2
  const choices = [`${n1}/${b}`, `${n2}/${d}`, 'They are equal']
  return {
    id: genId(), difficulty: 3, type: 'puzzle',
    question: `Which fraction is larger: ${n1}/${b}  or  ${n2}/${d}?`,
    answer: 0, answerType: 'multiple-choice',
    choices, correctChoice: `${n1}/${b}`,
    hints: [
      `${n1}/${b} is ${n1} parts out of ${b}. Is that more or less than half?`,
      `${n1}/${b} > ½ because ${n1} > ${b / 2}. And ${n2}/${d} < ½ because ${n2} < ${d / 2}.`,
      `Anything greater than ½ is larger than anything less than ½. Answer: ${n1}/${b}.`
    ]
  }
}

function d3WordFraction() {
  // Agent gets n/d of a total T (designed so answer is integer)
  const d  = pick([3, 4, 5, 6, 8])
  const n  = rand(1, d - 1)
  const q  = rand(8, 20)
  const T  = d * q
  const ans = n * q    // n/d of T = n * (T/d) = n * q
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `A spy recovered ${T} documents from the archive.\nThey handed ${n}/${d} of them to the Bureau. How many documents is that?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `First find 1/${d} of ${T}: divide by ${d}.`,
      `1/${d} of ${T} = ${T} ÷ ${d} = ${q}.`,
      `${n}/${d} = ${n} × ${q} = ${ans}.`
    ]
  }
}
