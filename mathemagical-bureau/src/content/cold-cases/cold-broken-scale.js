export default {
  id: 'cold-broken-scale',
  type: 'cold',
  title: 'The Broken Scale',
  subtitle: 'Logic, deduction, and hidden weights',
  topic: 'Logical Deduction via Balance Equations',
  gradeTag: 'grade-4',
  prerequisites: ['case-01'],
  unlocks: [],

  caseFile: {
    classification: 'COLD',
    bureau: 'The Mathemagical Bureau',
    summary: `A jewel thief replaced gemstones with fakes of different weights.
      The only evidence: a series of balance scale photographs taken before the theft.
      Using pure logic — no algebra, no formulas — deduce the weight of each gemstone
      and identify the fake.`,
    agentNote: `No arithmetic required. Only reasoning.
      If A balances B, and B balances C, what do you know about A and C?`
  },

  spark: {
    type: 'fact',
    heading: 'The oldest puzzle in the world',
    content: `Balance scale puzzles appear in Egyptian papyri from 1650 BC —
      making them among the oldest recorded mathematical puzzles in existence.
      They were used to train merchants, judges, and tax collectors
      to reason about equality and fairness.

      The principle has not changed in 3,700 years:
      if two sides balance, they are equal.
      If you add the same weight to both sides, they still balance.
      If you remove the same weight from both sides, they still balance.

      This is the same principle that makes algebra work.
      You are doing algebra — you just will not need to write any letters.`,
    punchline: `The thief thought removing the gemstones would erase the evidence.
      The scale photographs say otherwise.`
  },

  concept: [
    {
      type: 'discover',
      heading: 'Reading a Balance Scale',
      content: `A balance scale has two pans. When both pans hold the same total weight, the scale is level.
        When one side is heavier, that side dips down.

        Key rules:
        — If Scale 1 shows A = B + C (balanced), then A weighs the same as B and C together.
        — If Scale 2 shows B = D (balanced), then B and D weigh the same.
        — Combining: A = D + C. You can substitute equals for equals.

        This is called the transitive property: if A = B and B = C, then A = C.
        Sounds obvious. But used carefully, it lets you deduce hidden weights
        from a chain of observations.`,
      visual: 'BalanceScale',
      visualProps: {
        steps: [
          {
            leftItems:  [{ label: 'A', color: 'gold' }],
            rightItems: [{ label: 'B', color: 'teal' }, { label: 'C', color: 'teal' }],
            annotation: 'Scale 1: A = B + C'
          },
          {
            leftItems:  [{ label: 'B', color: 'teal' }],
            rightItems: [{ label: 'D', color: 'cream' }],
            annotation: 'Scale 2: B = D — so we can swap B for D'
          },
          {
            leftItems:  [{ label: 'A', color: 'gold' }],
            rightItems: [{ label: 'D', color: 'cream' }, { label: 'C', color: 'teal' }],
            annotation: 'Result: A = D + C — by substitution'
          }
        ]
      }
    },
    {
      type: 'explain',
      heading: 'The Substitution Method',
      content: `You have three scales:
        Scale 1: ◆◆ = ●●●   (two diamonds balance three circles)
        Scale 2: ● = ■■     (one circle balances two squares)
        Scale 3: ◆ = ?      (one diamond balances how many squares?)

        From Scale 2: one circle = two squares.
        So three circles = six squares.
        From Scale 1: two diamonds = three circles = six squares.
        So one diamond = three squares.

        Scale 3: ◆ = ■■■ (three squares).

        You never needed to know the actual weights in grams.
        You only needed the relationships.`,
      visual: null
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 2,
      type: 'logic',
      question: `The photographs show:
        Scale 1: ◆ + ◆ = ● + ● + ●    (2 diamonds balance 3 circles)
        Scale 2: ● + ● = ■ + ■ + ■ + ■  (2 circles balance 4 squares)

        How many squares balance ONE diamond?`,
      answer: 3,
      answerType: 'numeric',
      hints: [
        'From Scale 2: 1 circle = 2 squares.',
        'So 3 circles = 6 squares. From Scale 1: 2 diamonds = 3 circles = 6 squares.',
        '1 diamond = 3 squares.'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 2,
      type: 'logic',
      question: `Scale 1: ★ + ★ + ★ = ◆ + ◆ + ◆ + ◆  (3 stars balance 4 diamonds)
        Scale 2: ◆ + ◆ + ◆ = ● + ●           (3 diamonds balance 2 circles)

        How many circles balance 9 stars?`,
      answer: 8,
      answerType: 'numeric',
      hints: [
        'From Scale 1: 3 stars = 4 diamonds, so 9 stars = 12 diamonds.',
        'From Scale 2: 3 diamonds = 2 circles, so 12 diamonds = 8 circles.',
        '9 stars = 8 circles.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 2,
      type: 'logic',
      question: `You have four gems: Ruby (R), Sapphire (S), Emerald (E), and one Fake (F).
        The real gems all weigh different amounts.
        Scale 1: R = S + F      (Ruby balances Sapphire + Fake)
        Scale 2: S + S = E      (two Sapphires balance one Emerald)
        Scale 3: E + F = R + S  (Emerald + Fake balances Ruby + Sapphire)

        Using only Scale 3 and your answer from Scale 1, what does F weigh in terms of S?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['F = S', 'F = 2S', 'F = S/2', 'F = 0'],
      correctChoice: 'F = S',
      hints: [
        'From Scale 1: R = S + F. From Scale 2: E = 2S.',
        'Substitute into Scale 3: E + F = R + S becomes 2S + F = (S + F) + S.',
        '2S + F = 2S + F. This is always true — meaning F can be any value? No: from Scale 1, R = S + F. Substitute R into Scale 3: 2S + F = (S+F) + S = 2S + F. It holds for any F. The fake could weigh the same as the sapphire — F = S.'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 3,
      type: 'logic',
      question: `Five gems: A, B, C, D, and one Fake (X). Four scale photographs:
        Scale 1: A + B = C + D    (balanced)
        Scale 2: A + C = B + B    (A + C balances 2 B's)
        Scale 3: D + X = A + B + B (D + Fake balances A + 2 B's... but this tips LEFT — D+X is heavier)
        Scale 4: C + C = A + D    (balanced)

        Which gem is the Fake? Is it heavier or lighter than a real gem of its stated type?
        (Hint: from Scales 1 and 4, you can find a relationship between B and C.)`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['X is heavier than a real gem', 'X is lighter than a real gem', 'X weighs the same'],
      correctChoice: 'X is heavier than a real gem',
      hints: [
        'From Scale 4: 2C = A + D. From Scale 1: A + B = C + D, so B = C + D − A = C + (2C − A) − A = 3C − 2A. That is complex. Try specific values: if C = 2, A = 2 (Scale 4 gives 4 = A+D so D = 4-A).',
        'Let A=2, then from Scale 4: 4 = 2+D so D=2. But Scale 1: A+B = C+D → 2+B = 2+2 → B=2. So A=B=C=D=2. Then Scale 3: D+X = A+2B = 2+4 = 6, but tips LEFT meaning D+X > 6, so X > 4 > 2.',
        'All real gems weigh 2 units. X must weigh more than 4 — so X is heavier than a real gem.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 3,
      type: 'logic',
      question: `The CLASSIC puzzle: You have 12 balls, all identical in appearance.
        One is either heavier or lighter than the rest — you do not know which.
        You have a balance scale and exactly THREE weighings.

        In the first weighing, you put 4 balls on each side and leave 4 aside.
        The scale balances.

        What does this tell you? And which balls do you weigh next?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: [
        'The fake is in the 4 balls left aside — weigh 2 against 2 next',
        'The fake is in the 8 balls you weighed — weigh 4 against 4 again',
        'You cannot determine anything from one balanced weighing'
      ],
      correctChoice: 'The fake is in the 4 balls left aside — weigh 2 against 2 next',
      hints: [
        'If the scale balances, the fake is NOT in any of the 8 balls on the scale — those 8 are all real.',
        'The fake must be in the 4 balls you set aside.',
        'Now weigh 2 of those 4 against 2 others from the 4. If balanced, the fake is one of the 2 remaining. If not, you know which group — and one more weighing finds it.'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Jeweller\'s Dilemma',
    question: `You have 9 gemstones. One is a fake and is heavier than the rest.
      You have a balance scale and only TWO weighings.

      Describe your strategy: which stones do you weigh first, and what does each
      possible outcome tell you?

      (You do not need to give a single number answer — explain your reasoning.
       When you are ready, type "SOLVED" to show the Bureau your method.)`,
    answer: 'SOLVED',
    hints: [
      'Divide 9 into three groups of 3. Weigh group 1 against group 2.',
      'If they balance: the fake is in group 3. If one side is heavier: the fake is in that heavier group.',
      'Weighing 2: take the group of 3 containing the fake. Weigh 1 against 1 (set 1 aside). If balanced: the set-aside stone is fake. If one side heavier: that stone is the fake. Two weighings, done.'
    ],
    canLeaveOpen: true
  }
}
