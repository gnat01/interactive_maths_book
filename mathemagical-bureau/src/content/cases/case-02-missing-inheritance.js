export default {
  id: 'case-02',
  type: 'main',
  title: 'The Missing Inheritance',
  subtitle: 'Division, fractions, and a suspicious estate',
  topic: 'Long Division & Fractions',
  gradeTag: 'grade-4',
  prerequisites: ['case-01'],
  unlocks: ['case-03', 'case-05'],

  caseFile: {
    classification: 'ACTIVE',
    bureau: 'The Mathemagical Bureau',
    summary: `A wealthy merchant has died, leaving an estate of 1,848 gold coins to be
      divided among heirs. The will specifies exact fractions for each heir — but the
      numbers submitted to the Bureau do not add up. Someone is taking more than their share.`,
    agentNote: `A fraction is not just a number. It is division waiting to happen. The fraction
      bar is a division sign in disguise.`
  },

  spark: {
    type: 'fact',
    heading: 'The fraction bar is lying to you',
    content: `You already know what 3 ÷ 4 means: divide 3 by 4.
      Now look at the fraction 3/4. The line between 3 and 4?
      That IS a division sign. They are identical.
      3/4 = 3 ÷ 4 = 0.75.
      Every fraction you have ever seen is secretly a division problem.
      Every division problem is secretly a fraction.
      The same idea, wearing different clothes.`,
    punchline: `The heirs in this case tried to use fractions to hide their theft.
      You are going to use the same fractions to catch them.`
  },

  concept: [
    {
      type: 'discover',
      heading: 'Long Division — Fair Sharing',
      content: `The merchant left 936 coins to be shared equally among 4 heirs.
        How many coins does each heir receive?

        Think of it as dealing cards: give one coin to each heir, again and again,
        until you run out.

        936 ÷ 4: How many times does 4 go into 9? Into 93? Into 936?
        Work through it column by column. The answer will tell you exactly who gets what.`,
      visual: null
    },
    {
      type: 'explain',
      heading: 'When It Does Not Divide Evenly — The Remainder',
      content: `Sometimes estates cannot be divided perfectly. If 850 coins are split
        among 4 heirs, there are 2 coins left over.

        That remainder does not disappear. It becomes a fraction: $\\frac{2}{4}$, which simplifies to $\\frac{1}{2}$.
        So each heir gets $212\\frac{1}{2}$ coins.

        And here is where it gets interesting: one heir in this case is IN DEBT to the estate.
        Their "share" is negative — they owe money back. A negative inheritance.
        That is unusual. That is suspicious.`,
      visual: null
    },
    {
      type: 'discover',
      heading: 'Equivalent Fractions — Same Share, Different Label',
      content: `$\\frac{1}{2}$ of the estate is the same as $\\frac{2}{4}$, or $\\frac{3}{6}$, or $\\frac{4}{8}$.
        They are all the same share — just written differently.

        How do you check if two fractions are equivalent?
        Multiply the top of one by the bottom of the other.
        If you get the same number both ways, they are equal.

        $\\frac{1}{2} = \\frac{4}{8}$? Check: $1 \\times 8 = 8$, and $2 \\times 4 = 8$. Yes — equal.
        $\\frac{3}{5} = \\frac{9}{15}$? Check: $3 \\times 15 = 45$, and $5 \\times 9 = 45$. Yes — equal.

        This is the tool you will need to catch the fraudster.`,
      visual: 'FractionBar',
      visualProps: { fractions: [{ n: 1, d: 2 }, { n: 2, d: 4 }, { n: 4, d: 8 }] }
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 1,
      type: 'calculation',
      question: `The merchant left 936 gold coins to 4 heirs in equal shares.
        How many coins does each heir receive?`,
      answer: 234,
      answerType: 'numeric',
      hints: [
        'Divide 936 by 4. Start with the hundreds: how many times does 4 go into 9?',
        '4 goes into 9 twice (2 × 4 = 8), remainder 1. Bring down the 3 to get 13. 4 goes into 13 three times (3 × 4 = 12), remainder 1. Bring down the 6 to get 16.',
        '4 goes into 16 exactly 4 times. So the answer is 234.'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 1,
      type: 'calculation',
      question: `A second estate of 1,248 coins is split among 6 heirs equally.
        How many coins per heir?`,
      answer: 208,
      answerType: 'numeric',
      hints: [
        '6 goes into 12 exactly twice. Write 2, remainder 0.',
        'Bring down the 4: 6 goes into 4 zero times. Write 0, bring down the 8 to get 48.',
        '6 goes into 48 exactly 8 times. Answer: 208.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 1,
      type: 'puzzle',
      question: `Three pirates raided a ship and stole a chest of jewels.
        Pirate A took 1/2 the chest. Pirate B took 1/3. Pirate C took 1/6.
        Who took the most? Who took the least?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['A most, C least', 'B most, C least', 'A most, B least'],
      correctChoice: 'A most, C least',
      hints: [
        'To compare fractions, give them the same denominator. The common denominator of 2, 3 and 6 is 6.',
        '1/2 = 3/6. 1/3 = 2/6. 1/6 stays as 1/6.',
        'Now compare: 3/6 > 2/6 > 1/6. Pirate A took most, Pirate C took least.'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 2,
      type: 'calculation',
      question: `An estate of 850 coins is divided equally among 4 heirs.
        How many coins does each heir get? Express the remainder as a fraction.`,
      answer: '212 and 1/2',
      answerType: 'multiple-choice',
      choices: ['212 and 1/4', '212 and 1/2', '213 and 1/4', '211 and 3/4'],
      correctChoice: '212 and 1/2',
      hints: [
        '850 ÷ 4: 4 goes into 8 twice, 4 goes into 5 once with remainder 1, giving 21 with remainder 10.',
        '4 goes into 10 twice with remainder 2. So 850 ÷ 4 = 212 remainder 2.',
        'Remainder 2 out of 4 = 2/4 = 1/2. Answer: 212 and 1/2.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 2,
      type: 'word-problem',
      question: `Heir Bramwell claims he is owed 3/8 of the estate.
        Heir Cordelia claims she is owed 2/5.
        The will says both shares are equal. Is that possible — or is one of them lying?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['They are equal', 'Bramwell is claiming more', 'Cordelia is claiming more'],
      correctChoice: 'Cordelia is claiming more',
      hints: [
        'Cross-multiply to compare: 3/8 vs 2/5. Multiply 3 × 5 and 2 × 8.',
        '3 × 5 = 15. 2 × 8 = 16.',
        '15 < 16, which means 3/8 < 2/5. Cordelia is claiming the larger share — she is lying.'
      ],
      errorPatterns: []
    },
    {
      id: 'p06',
      difficulty: 2,
      type: 'word-problem',
      question: `The youngest heir, Demetria, is listed as receiving a NEGATIVE share: -1/6 of the estate.
        The estate is worth 1,848 coins. What does this mean in plain terms — and how many coins
        does Demetria actually owe back to the estate?`,
      answer: 308,
      answerType: 'numeric',
      hints: [
        'A negative share means Demetria owes the estate money, not the other way around.',
        '1/6 of 1,848 = 1,848 ÷ 6.',
        '1,848 ÷ 6 = 308. Demetria owes 308 coins back.'
      ],
      errorPatterns: []
    },
    {
      id: 'p07',
      difficulty: 3,
      type: 'word-problem',
      question: `The estate is 1,848 coins. The will says:
        Heir A gets 1/3. Heir B gets 1/4. Heir C gets 1/6. Heir D gets the rest.
        The Bureau received a claim that Heir B received 504 coins.
        Is that claim correct, or has someone altered the figures?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['Correct — 504 coins', 'Wrong — should be 462 coins', 'Wrong — should be 616 coins'],
      correctChoice: 'Wrong — should be 462 coins',
      hints: [
        '1/4 of 1,848 = 1,848 ÷ 4.',
        '1,848 ÷ 4 = 462.',
        '462 ≠ 504. The claim has been altered. Heir B is being overpaid by 42 coins.'
      ],
      errorPatterns: []
    },
    {
      id: 'p08',
      difficulty: 3,
      type: 'puzzle',
      question: `After paying Heirs A (1/3), B (1/4), and C (1/6), what fraction of the estate remains for Heir D?
        The estate is 1,848 coins. How many coins does Heir D receive?`,
      answer: 462,
      answerType: 'numeric',
      hints: [
        'Find the common denominator of 3, 4 and 6. It is 12.',
        '1/3 = 4/12. 1/4 = 3/12. 1/6 = 2/12. Total paid out: 4/12 + 3/12 + 2/12 = 9/12 = 3/4.',
        'Remaining: 1 - 3/4 = 1/4. Heir D gets 1/4 of 1,848 = 1,848 ÷ 4 = 462 coins.'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Fraudster Unmasked',
    question: `The Bureau has the original will and the submitted claims side by side.

      Original will: Heir A gets 1/3, Heir B gets 1/4, Heir C gets 1/4, Heir D gets 1/6.
      Total estate: 1,848 coins.

      Submitted claims: A=616, B=504, C=462, D=308.

      One heir has submitted a fraudulent claim — taking a different fraction than the will states.
      Which heir is the fraudster, and how many extra coins are they stealing?`,
    answer: 'B',
    hints: [
      'Calculate what each heir should receive: A = 1848 ÷ 3, B = 1848 ÷ 4, C = 1848 ÷ 4, D = 1848 ÷ 6.',
      'A should get 616 ✓. B should get 462, but claimed 504. C should get 462 ✓. D should get 308 ✓.',
      'Heir B is the fraudster, stealing 504 − 462 = 42 extra coins.'
    ],
    canLeaveOpen: false
  }
}
