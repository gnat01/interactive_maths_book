export default {
  id: 'cold-forger-returns',
  type: 'cold',
  title: 'The Forger Returns',
  subtitle: 'A harder code — order matters',
  topic: 'Mixed Operations & Order of Operations',
  gradeTag: 'grade-4',
  prerequisites: ['case-03'],
  unlocks: [],

  caseFile: {
    classification: 'COLD',
    bureau: 'The Mathemagical Bureau',
    summary: `The Forger from Case 1 has returned with a more sophisticated cipher.
      The new encoding uses multiple operations — and the order in which you perform
      them changes the answer completely. The Forger is betting you will make a mistake.
      Prove them wrong.`,
    agentNote: `The brackets are not decoration. They are orders.
      Ignore them and you get the wrong message.
      Follow them and the code breaks open.`
  },

  spark: {
    type: 'fact',
    heading: 'Why 2 + 3 × 4 is not 20',
    content: `Ask ten people what 2 + 3 × 4 equals.
      Half will say 20. They are wrong.
      The correct answer is 14.

      Not because of a trick — but because multiplication was agreed, centuries ago,
      to be done before addition. Without this agreement, mathematical expressions
      would be ambiguous: the same string of symbols could mean different things
      to different people.

      Mathematicians solved this by establishing a hierarchy:
      Brackets first. Then multiplication and division. Then addition and subtraction.
      Everyone uses this order. It is not a rule to memorise — it is a convention
      that makes communication unambiguous.

      The Forger uses this hierarchy as a security feature.
      Do the operations in the wrong order and you get a false address.`,
    punchline: `The correct order is the key. Get it right and the message reveals itself.`
  },

  concept: [
    {
      type: 'explain',
      heading: 'The Order: BODMAS',
      content: `BODMAS tells you the order to evaluate any expression:
        B — Brackets first (whatever is inside brackets is done first)
        O — Orders (powers and roots — we will cover these later)
        D — Division
        M — Multiplication (division and multiplication have equal priority — left to right)
        A — Addition
        S — Subtraction (addition and subtraction have equal priority — left to right)

        Example: 3 + 4 × 2
        Multiplication first: 4 × 2 = 8
        Then addition: 3 + 8 = 11

        Example: (3 + 4) × 2
        Brackets first: 3 + 4 = 7
        Then multiplication: 7 × 2 = 14

        Same numbers. Different answers. Brackets change everything.`,
      visual: null
    },
    {
      type: 'discover',
      heading: 'Brackets as Cipher Security',
      content: `The Forger encodes a location using this rule: (x + 5) × 3 − 2

        For x = 4: (4 + 5) × 3 − 2 = 9 × 3 − 2 = 27 − 2 = 25.
        An interceptor who ignores brackets: 4 + 5 × 3 − 2 = 4 + 15 − 2 = 17. Wrong address.
        An interceptor who does it all left to right: 4 + 5 = 9, × 3 = 27, − 2 = 25. Lucky — accidentally right this time.

        But for x = 7: (7 + 5) × 3 − 2 = 12 × 3 − 2 = 36 − 2 = 34.
        Ignore brackets: 7 + 5 × 3 − 2 = 7 + 15 − 2 = 20. Wrong.

        The brackets are the security. You cannot decode the message without respecting them.`,
      visual: null
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 2,
      type: 'calculation',
      question: `Evaluate: 5 + 3 × 4`,
      answer: 17,
      answerType: 'numeric',
      hints: [
        'Multiplication before addition.',
        '3 × 4 = 12 first.',
        '5 + 12 = 17.'
      ],
      errorPatterns: [
        { match: 'conceptual', feedback: 'Multiplication before addition — the common mistake here is doing left to right.' }
      ]
    },
    {
      id: 'p02',
      difficulty: 2,
      type: 'calculation',
      question: `Evaluate: (5 + 3) × 4`,
      answer: 32,
      answerType: 'numeric',
      hints: [
        'Brackets first.',
        '5 + 3 = 8.',
        '8 × 4 = 32.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 2,
      type: 'calculation',
      question: `The Forger's cipher: decode the location using x = 3.
        Formula: (x + 7) × 2 − 4`,
      answer: 16,
      answerType: 'numeric',
      hints: [
        'Substitute x = 3: (3 + 7) × 2 − 4.',
        'Brackets first: 3 + 7 = 10. Now: 10 × 2 − 4.',
        'Multiplication next: 10 × 2 = 20. Then: 20 − 4 = 16.'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 2,
      type: 'puzzle',
      question: `The Bureau intercepts a message: the encoded location is 34.
        The Forger's rule is: 4 × x + 6 = ?
        What was the original value of x that produced 34?`,
      answer: 7,
      answerType: 'numeric',
      hints: [
        '4 × x + 6 = 34. First subtract 6 from both sides.',
        '4 × x = 28.',
        'x = 28 ÷ 4 = 7.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 3,
      type: 'calculation',
      question: `Evaluate this complex cipher expression:
        3 × (8 − 2) + 4 × (5 − 1) − 10`,
      answer: 24,
      answerType: 'numeric',
      hints: [
        'Two sets of brackets. Evaluate each one first: (8−2) = 6 and (5−1) = 4.',
        'Now: 3 × 6 + 4 × 4 − 10.',
        'Multiplications: 18 + 16 − 10 = 24.'
      ],
      errorPatterns: []
    },
    {
      id: 'p06',
      difficulty: 3,
      type: 'puzzle',
      question: `The Forger left two possible decoding formulas and claims they give the same answer for x = 5:
        Formula A: 2 × (x + 3) + x
        Formula B: 3 × x + 6

        Do they give the same answer? If not, which is larger and by how much?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['They give the same answer', 'Formula A gives a larger answer', 'Formula B gives a larger answer'],
      correctChoice: 'They give the same answer',
      hints: [
        'Formula A: 2 × (5 + 3) + 5 = 2 × 8 + 5 = 16 + 5 = 21.',
        'Formula B: 3 × 5 + 6 = 15 + 6 = 21.',
        'Both equal 21. The Forger is right — these two formulas are always equal for any x. (2(x+3)+x = 2x+6+x = 3x+6.)'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Forger\'s Final Formula',
    question: `The Forger's most complex cipher uses this formula to encode a 2-digit meeting location:
      Result = (A + B) × (A − B)    where A and B are single digits.

      The Bureau knows the result is 45. Find ALL possible pairs (A, B) where A > B > 0.

      (Note: (A+B) × (A−B) = A² − B². This might help you think about it.)`,
    answer: '9 and 6',
    hints: [
      'We need two numbers that multiply to 45. Find all factor pairs of 45: 1×45, 3×15, 5×9.',
      'Each factor pair gives (A+B) and (A−B). From 9×5: A+B=9 and A−B=5. Adding: 2A=14, so A=7, B=2. Check: 7²−2²=49−4=45 ✓. From 15×3: A+B=15 but A is a single digit, so A≤9 — no solution. From 5×9 same as 9×5.',
      'Only valid solution with single digits: A=7, B=2. But also try 45×1: A+B=45 impossible. Answer: A=7, B=2.'
    ],
    canLeaveOpen: true
  }
}
