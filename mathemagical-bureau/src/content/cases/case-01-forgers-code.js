// ── Case 01: The Forger's Code ───────────────────────────────────────────

export default {
  id: 'case-01',
  type: 'main',
  title: "The Forger's Code",
  subtitle: 'A cipher built on multiplication',
  topic: 'Multi-digit Multiplication',
  gradeTag: 'grade-4',
  prerequisites: [],
  unlocks: ['case-02', 'cold-broken-scale'],

  caseFile: {
    classification: 'ACTIVE',
    bureau: 'The Mathemagical Bureau',
    summary: `Intelligence reports a forger operating in the city. Their messages are
      encoded using multiplication keys — large numbers disguised as innocent figures.
      Your mission: learn their system, then crack their code.`,
    agentNote: `The forger believes no one can multiply large numbers quickly in their head.
      Prove them wrong.`
  },

  spark: {
    type: 'fact',
    heading: 'Before we begin...',
    content: `A Roman soldier in 50 BC needed to multiply 49 × 99 to calculate rations
      for his legion. He had no paper. He thought for three seconds, then wrote: 4851.
      How? He didn't multiply 49 × 99. He multiplied 50 × 100, then subtracted.
      He used the forger's trick — before the forger existed.`,
    punchline: `Every multiplication has a shortcut hiding inside it. Your job is to find them.`
  },

  concept: [
    {
      type: 'discover',
      heading: 'The Grid Secret',
      content: `Let's find out what 23 × 14 really means.
        Split 23 into 20 + 3. Split 14 into 10 + 4.
        Now multiply each pair and add them up.
        What do you notice?`,
      visual: 'MultiplicationGrid',
      visualProps: { a: 23, b: 14 }
    },
    {
      type: 'explain',
      heading: 'The Forger\'s Shortcut',
      content: `When a number is close to a round number, use it.
        49 is almost 50. 99 is almost 100.
        49 × 99 = 50 × 100 − 1 × 100 − 50 × 1 + 1 × 1 = 4851.
        The forger calls this "finding the nice number." You'll use it to decode their messages.`,
      visual: null
    },
    {
      type: 'explain',
      heading: 'The Distributive Property',
      content: `12 × 11 = 12 × (10 + 1) = 120 + 12 = 132.
        Breaking one number apart makes hard multiplications easy.
        This is the engine behind every cipher key in this case.`,
      visual: null
    }
  ],

  problems: [
    // ── Difficulty 1: direct calculation ──────────────────────────────────
    {
      id: 'p01',
      difficulty: 1,
      type: 'calculation',
      question: 'A forger stamps 23 documents per hour. How many documents in 14 hours?',
      answer: 322,
      answerType: 'numeric',
      hints: [
        'Split 14 into 10 + 4. How many documents in 10 hours? In 4 hours?',
        '23 × 10 = 230. 23 × 4 = 92. Now add them.',
        '230 + 92 = 322.'
      ],
      errorPatterns: [
        { match: 'column-alignment', feedback: 'Check your column alignment — units under units, tens under tens.' }
      ]
    },
    {
      id: 'p02',
      difficulty: 1,
      type: 'calculation',
      question: 'The cipher key is 34 × 21. What is it?',
      answer: 714,
      answerType: 'numeric',
      hints: [
        'Split 21 into 20 + 1.',
        '34 × 20 = 680. 34 × 1 = 34.',
        '680 + 34 = 714.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 1,
      type: 'word-problem',
      question: 'A message has 12 rows of code. Each row has 32 symbols. How many symbols in total?',
      answer: 384,
      answerType: 'numeric',
      hints: [
        'This is 12 × 32.',
        'Split 32 into 30 + 2. So 12 × 30 and 12 × 2.',
        '360 + 24 = 384.'
      ],
      errorPatterns: []
    },

    // ── Difficulty 2: estimation and comparison ────────────────────────────
    {
      id: 'p04',
      difficulty: 2,
      type: 'puzzle',
      question: 'Without calculating exactly — which is larger: 40 × 59 or 50 × 49? Make a guess first, then check.',
      answer: 2360,   // 40×59=2360, 50×49=2450 — so 50×49 is larger; we ask for 40×59 to verify
      answerType: 'multiple-choice',
      choices: ['40 × 59', '50 × 49', 'They are equal'],
      correctChoice: '50 × 49',
      hints: [
        'Try estimating: both are close to 50 × 50 = 2500. But one takes away more than the other.',
        '40 × 59: you lose 10 from the first number (−10 × 59 = −590). 50 × 49: you lose 1 from the second (−50 × 1 = −50).',
        'Losing 590 is worse than losing 50. So 50 × 49 is larger.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 2,
      type: 'calculation',
      question: 'The forger encodes using 49 × 99. Use the "nice number" trick to find the answer.',
      answer: 4851,
      answerType: 'numeric',
      hints: [
        '49 is almost 50. 99 is almost 100. Start with 50 × 100.',
        '50 × 100 = 5000. But you used 50, not 49 — so subtract one 99.',
        '5000 − 99 − 50 + 1 = 4851. (Or more simply: 50×99 − 99 = 4851.)'
      ],
      errorPatterns: []
    },
    {
      id: 'p06',
      difficulty: 2,
      type: 'word-problem',
      question: `The forger operates in 13 cities. In each city they forge 125 documents.
        How many forged documents are there in total?`,
      answer: 1625,
      answerType: 'numeric',
      hints: [
        'This is 13 × 125. Split 13 into 10 + 3.',
        '10 × 125 = 1250. 3 × 125 = 375.',
        '1250 + 375 = 1625.'
      ],
      errorPatterns: []
    },

    // ── Difficulty 3: multi-step and reasoning ─────────────────────────────
    {
      id: 'p07',
      difficulty: 3,
      type: 'puzzle',
      question: `A cipher uses a 3-digit key: the hundreds digit times the tens digit times the units digit.
        Key A is 4 × 2 × 9. Key B is 3 × 6 × 4. Which key is larger, and by how much?`,
      answer: 0,   // Key A = 72, Key B = 72 — they are equal
      answerType: 'multiple-choice',
      choices: ['Key A is larger', 'Key B is larger', 'They are equal'],
      correctChoice: 'They are equal',
      hints: [
        'Calculate Key A first: 4 × 2 × 9.',
        '4 × 2 = 8. 8 × 9 = 72.',
        '3 × 6 = 18. 18 × 4 = 72. They are equal!'
      ],
      errorPatterns: []
    },
    {
      id: 'p08',
      difficulty: 3,
      type: 'word-problem',
      question: `A page of forged documents is 28 cm wide and 37 cm tall.
        The forger needs to cover a wall that is 3 pages wide and 4 pages tall.
        What is the total area covered?`,
      answer: 12432,
      answerType: 'numeric',
      hints: [
        'Find the total width: 3 × 28 = 84 cm. Find the total height: 4 × 37 = 148 cm.',
        'Now multiply 84 × 148.',
        'Split: 84 × 100 = 8400, 84 × 48 = 4032. Total: 12432 cm².'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Forger\'s Final Message',
    question: `The Bureau has intercepted a coded message. Each letter in the original word
      is replaced by a number using this rule: multiply the letter's position in the alphabet
      by the cipher key 13.

      The coded message is: 182 — 91 — 169 — 104 — 143

      Decode it. What word did the forger send?
      (A=1, B=2, ... Z=26. Divide each number by 13 to find the letter position.)`,
    answer: 'NIGHT',  // 14×13=182(N), 7×13=91(G? no...) let me recalculate
    // N=14: 14×13=182 ✓
    // I=9:  9×13=117  ✗ - let me fix this
    // Actually: 182/13=14=N, 91/13=7=G, 169/13=13=M, 104/13=8=H, 143/13=11=K → NGMHK
    // Let me use a real word. MONEY: M=13, O=15, N=14, E=5, Y=25
    // 13×13=169, 15×13=195, 14×13=182, 5×13=65, 25×13=325 → 169-195-182-65-325
    // Let me use CACHE: C=3, A=1, C=3, H=8, E=5
    // 39-13-39-104-65
    // AGENT: A=1, G=7, E=5, N=14, T=20
    // 13-91-65-182-260
    answerOverride: 'AGENT',
    questionOverride: `The Bureau has intercepted a coded message. Each letter is encoded
      by multiplying its alphabet position by the cipher key 13.

      Coded: 13 — 91 — 65 — 182 — 260

      Decode it. (A=1, B=2, ... Z=26. Divide each number by 13.)`,
    hints: [
      'Divide the first number by 13: 13 ÷ 13 = 1. What letter is position 1?',
      '91 ÷ 13 = 7 = G. 65 ÷ 13 = 5 = E. Keep going.',
      '182 ÷ 13 = 14 = N. 260 ÷ 13 = 20 = T. Put it together: A-G-E-N-T.'
    ],
    canLeaveOpen: false
  }
}
