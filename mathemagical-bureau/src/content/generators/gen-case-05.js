// Generator for Case 05 — Statistics (Mean, Median, Mode)
import { rand, pick, genId, shuffle } from './utils.js'

const AGENTS  = ['Agent Crane', 'Agent Lark', 'Agent Viper', 'Agent Finch', 'Agent Drake', 'Agent Rook']
const METRICS = ['reports filed', 'ciphers decoded', 'surveillance hours', 'documents analysed']

export default function gen(difficulty) {
  const fns = { 1: [d1Mean3, d1Mode], 2: [d2Median, d2Mean4], 3: [d3ReverseMean, d3Range] }
  return pick(fns[difficulty] ?? fns[1])()
}

function d1Mean3() {
  // Pick 3 numbers with an integer mean
  const mean  = rand(8, 25)
  const delta = rand(2, 8)
  const nums  = [mean - delta, mean, mean + delta]
  const sum   = nums.reduce((a, b) => a + b, 0)
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Find the mean of these three numbers: ${nums.join(', ')}`,
    answer: mean, answerType: 'numeric',
    hints: [
      `Mean = sum ÷ count. Add all three numbers first.`,
      `Sum = ${nums.join(' + ')} = ${sum}.`,
      `Mean = ${sum} ÷ 3 = ${mean}.`
    ]
  }
}

function d1Mode() {
  // 5 numbers with one clear mode
  const mode   = rand(5, 20)
  const others = [rand(1, mode - 1), rand(mode + 1, mode + 8), rand(1, mode - 1)]
  const nums   = shuffle([mode, mode, ...others])
  return {
    id: genId(), difficulty: 1, type: 'calculation',
    question: `Find the mode of: ${nums.join(', ')}\n(The mode is the most common value.)`,
    answer: mode, answerType: 'numeric',
    hints: [
      `The mode is the value that appears most often.`,
      `Count how many times each number appears.`,
      `${mode} appears twice. All others appear once. Mode = ${mode}.`
    ]
  }
}

function d2Median() {
  // 5 numbers with a clear median
  const sorted = Array.from({ length: 5 }, (_, i) => rand(3, 30))
    .sort((a, b) => a - b)
  // Re-sort to ensure clean values
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] <= sorted[i - 1]) sorted[i] = sorted[i - 1] + rand(1, 5)
  }
  const shuffled = shuffle([...sorted])
  const median   = sorted[2]   // middle of 5
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Find the median of: ${shuffled.join(', ')}\n(Sort first, then find the middle value.)`,
    answer: median, answerType: 'numeric',
    hints: [
      `Sort the numbers from smallest to largest first.`,
      `Sorted: ${sorted.join(', ')}.`,
      `With 5 numbers, the median is the 3rd value: ${median}.`
    ]
  }
}

function d2Mean4() {
  const mean   = rand(10, 30)
  const sum    = mean * 4
  // Generate 3 values that sum to sum - mean (leaving mean as the 4th)
  const a = rand(mean - 8, mean + 8)
  const b = rand(mean - 8, mean + 8)
  const c = sum - mean - a - b   // ensures total sums to sum
  if (c < 2 || c > 50) return d2Mean4()  // retry if degenerate
  const metric = pick(METRICS)
  const agents = shuffle(AGENTS).slice(0, 4)
  const vals   = shuffle([a, b, c, mean])
  return {
    id: genId(), difficulty: 2, type: 'calculation',
    question: `Four agents reported the following ${metric}: ${vals.join(', ')}.\nWhat is the mean?`,
    answer: mean, answerType: 'numeric',
    hints: [
      `Mean = sum ÷ number of values.`,
      `Sum = ${vals.join(' + ')} = ${sum}.`,
      `Mean = ${sum} ÷ 4 = ${mean}.`
    ]
  }
}

function d3ReverseMean() {
  // Given mean and n-1 values, find the nth
  const mean = rand(12, 25)
  const n    = 4
  const total = mean * n
  const known = [rand(8, mean + 8), rand(8, mean + 8), rand(8, mean + 8)]
  const ans   = total - known.reduce((a, b) => a + b, 0)
  if (ans < 2 || ans > 50) return d3ReverseMean()
  const metric = pick(METRICS)
  return {
    id: genId(), difficulty: 3, type: 'puzzle',
    question: `Four agents' ${metric} had a mean of ${mean}.\nThree agents reported: ${known.join(', ')}.\nWhat did the fourth agent report?`,
    answer: ans, answerType: 'numeric',
    hints: [
      `If the mean is ${mean} across ${n} agents, the total must be ${mean} × ${n} = ${total}.`,
      `Known values sum to: ${known.join(' + ')} = ${known.reduce((a, b) => a + b, 0)}.`,
      `Missing value = ${total} − ${known.reduce((a, b) => a + b, 0)} = ${ans}.`
    ]
  }
}

function d3Range() {
  const n    = 6
  const min  = rand(3, 20)
  const max  = rand(min + 5, min + 30)
  const rest = Array.from({ length: n - 2 }, () => rand(min + 1, max - 1))
  const all  = shuffle([min, max, ...rest])
  const ans  = max - min
  return {
    id: genId(), difficulty: 3, type: 'calculation',
    question: `Find the range of this dataset: ${all.join(', ')}\n(Range = largest value − smallest value.)`,
    answer: ans, answerType: 'numeric',
    hints: [
      `Find the largest and smallest values in the list.`,
      `Largest = ${max}. Smallest = ${min}.`,
      `Range = ${max} − ${min} = ${ans}.`
    ]
  }
}
