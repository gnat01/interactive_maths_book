export default {
  id: 'cold-infinite-mirror',
  type: 'cold',
  title: 'The Infinite Mirror',
  subtitle: 'Patterns that go on forever',
  topic: 'Sequences & Patterns',
  gradeTag: 'grade-4',
  prerequisites: ['case-06'],
  unlocks: [],

  caseFile: {
    classification: 'COLD',
    bureau: 'The Mathemagical Bureau',
    summary: `A forger hides stolen documents in a vast archive at positions that follow a
      secret pattern: 1, 3, 6, 10, 15... The Bureau needs to know where document
      number 50 is hidden — without counting every step.
      Find the rule. Write it down. Use it.`,
    agentNote: `A formula is just a pattern written precisely enough that you can
      skip to any position without doing all the steps in between.`
  },

  spark: {
    type: 'fact',
    heading: 'The boy who embarrassed his teacher',
    content: `Around 1785, a schoolteacher in Germany set his class a punishment:
      "Add up all the numbers from 1 to 100. Do not come back until you are done."
      He expected it to take an hour.

      One student finished in under a minute. His name was Carl Friedrich Gauss.
      He would become one of the greatest mathematicians who ever lived.

      His trick: he noticed that 1 + 100 = 101. And 2 + 99 = 101. And 3 + 98 = 101.
      There are 50 such pairs. So the total is 50 × 101 = 5,050.

      He did not add. He found the pattern, then jumped straight to the answer.
      That is what a formula does.`,
    punchline: `The forger's hiding pattern has the same structure.
      Find the pattern, write the formula, find position 50.`
  },

  concept: [
    {
      type: 'discover',
      heading: 'Arithmetic Sequences — Add the Same Amount Each Time',
      content: `A sequence where you add the same number each time is called arithmetic.
        Example: 3, 7, 11, 15, 19... (add 4 each time)

        The rule: $T_n = \\text{first term} + (n - 1) \\times \\text{step}$
        For this sequence: $T_n = 3 + (n - 1) \\times 4$

        $T_1 = 3 + 0 = 3$ ✓
        $T_5 = 3 + 4 \\times 4 = 3 + 16 = 19$ ✓
        $T_{20} = 3 + 19 \\times 4 = 79$. No counting needed.

        What is the step size? Just subtract any term from the next one.`,
      visual: null
    },
    {
      type: 'discover',
      heading: 'Triangular Numbers — A Pattern Hidden in Dots',
      content: `The forger's sequence: 1, 3, 6, 10, 15, 21...
        The differences: +2, +3, +4, +5, +6...
        This is NOT arithmetic (the step changes). It is something more interesting.

        Draw these as dot triangles:
        1 dot. Then 3 dots (a triangle). Then 6. Then 10.
        These are called triangular numbers because you can arrange them into triangles.

        Gauss's trick works here too: pair the first and last, second and second-to-last.
        $$T_n = \\frac{n(n+1)}{2}$$

        Check: $T_5 = \\frac{5 \\times 6}{2} = 15$ ✓`,
      visual: 'SequenceDots',
      visualProps: { maxN: 6 }
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 2,
      type: 'calculation',
      question: `The sequence is: 5, 11, 17, 23, 29...
        What is the 10th term?`,
      answer: 59,
      answerType: 'numeric',
      hints: [
        'This is an arithmetic sequence. Find the step: 11 − 5 = 6.',
        'Term N = 5 + (N − 1) × 6.',
        'Term 10 = 5 + 9 × 6 = 5 + 54 = 59.'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 2,
      type: 'calculation',
      question: `The forger hides documents at positions: 1, 3, 6, 10, 15...
        (triangular numbers). At what position is the 8th hidden document?`,
      answer: 36,
      answerType: 'numeric',
      hints: [
        'The Nth triangular number = N × (N + 1) ÷ 2.',
        '8th triangular number = 8 × 9 ÷ 2.',
        '72 ÷ 2 = 36.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 2,
      type: 'calculation',
      question: `Using Gauss's method, find the sum: 1 + 2 + 3 + ... + 20.
        Do NOT add them one by one.`,
      answer: 210,
      answerType: 'numeric',
      hints: [
        'Pair the first and last: 1 + 20 = 21. Second and second-to-last: 2 + 19 = 21.',
        'How many such pairs are there? 10 pairs (since 20 ÷ 2 = 10).',
        '10 × 21 = 210.'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 2,
      type: 'puzzle',
      question: `A different forger uses the square numbers: 1, 4, 9, 16, 25...
        What is the 12th square number?`,
      answer: 144,
      answerType: 'numeric',
      hints: [
        'The Nth square number = N × N.',
        '12th square number = 12 × 12.',
        '12 × 12 = 144.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 3,
      type: 'puzzle',
      question: `Two forgers are hiding documents independently.
        Forger A hides at positions: 3, 7, 11, 15... (arithmetic, step 4)
        Forger B hides at positions: 1, 5, 9, 13... (arithmetic, step 4)

        Will they EVER choose the same position? Explain, and if yes — find the first one.`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: [
        'No — they will never overlap',
        'Yes — they first overlap at position 11',
        'Yes — they first overlap at position 3'
      ],
      correctChoice: 'No — they will never overlap',
      hints: [
        'Forger A: 3, 7, 11, 15, 19... all give remainder 3 when divided by 4.',
        'Forger B: 1, 5, 9, 13, 17... all give remainder 1 when divided by 4.',
        'Since 3 ≠ 1, they can never be equal. The sequences never share a position.'
      ],
      errorPatterns: []
    },
    {
      id: 'p06',
      difficulty: 3,
      type: 'calculation',
      question: `The forger's triangular number sequence: 1, 3, 6, 10, 15...
        The Bureau needs to know: what is the 50th hidden position?`,
      answer: 1275,
      answerType: 'numeric',
      hints: [
        '50th triangular number = 50 × 51 ÷ 2.',
        '50 × 51 = 2550.',
        '2550 ÷ 2 = 1275.'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Mirror Sequence',
    question: `A new sequence appears in the Bureau's investigation:
      1, 2, 4, 7, 11, 16, 22...

      1. Find the pattern (the differences between consecutive terms).
      2. Write a rule for the Nth term.
      3. What is the 15th term?
      4. BONUS: Gauss summed consecutive integers by pairing them.
         Can you use a similar trick to sum the first 10 triangular numbers?
         (1 + 3 + 6 + 10 + 15 + 21 + 28 + 36 + 45 + 55 = ?)`,
    answer: '106',
    hints: [
      'Differences: 1, 2, 3, 4, 5, 6... The differences themselves increase by 1 each time.',
      'Term N = 1 + (0+1+2+3+...+(N-2)) = 1 + (N-1)(N-2)/2. Term 15 = 1 + 14×13/2 = 1 + 91 = 92. Wait — check term 7: 1 + 6×5/2 = 1+15 = 16? But sequence shows 22. Let me recount.',
      'Sequence: 1,2,4,7,11,16,22. Differences: 1,2,3,4,5,6. Term 1=1. Term N = 1 + sum of 1 to (N-1) = 1 + (N-1)N/2. Term 7 = 1 + 6×7/2 = 1+21 = 22 ✓. Term 15 = 1 + 14×15/2 = 1+105 = 106.'
    ],
    canLeaveOpen: true
  }
}
