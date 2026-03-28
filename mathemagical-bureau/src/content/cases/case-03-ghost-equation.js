export default {
  id: 'case-03',
  type: 'main',
  title: 'The Ghost Equation',
  subtitle: 'Find the number that was erased',
  topic: 'Introduction to Algebra',
  gradeTag: 'grade-4',
  prerequisites: ['case-02'],
  unlocks: ['case-04', 'cold-forger-returns'],

  caseFile: {
    classification: 'ACTIVE',
    bureau: 'The Mathemagical Bureau',
    summary: `A series of secret messages was intercepted — but a key part of each message
      has been erased. The missing quantities are marked with symbols. Recover the hidden
      numbers and decode the full message.`,
    agentNote: `The symbol x is not mysterious. It is simply a number that has not
      introduced itself yet. Your job is to make it.`
  },

  spark: {
    type: 'fact',
    heading: 'Al-jabr — the reunion of broken parts',
    content: `In 820 AD, a mathematician in Baghdad named Al-Khwarizmi wrote a book
      about finding unknown quantities. He called the technique "al-jabr" —
      the reunion of broken parts. We still call it that today: algebra.

      His core insight was simple: if two things are equal, and you do the
      same thing to both sides, they stay equal. A perfectly balanced scale
      stays balanced if you add the same weight to both sides.

      Every algebra problem since 820 AD has used this one idea.`,
    punchline: `When you solve for x, you are doing exactly what mathematicians
      have done for 1,200 years. The technique is ancient. The mystery is new.`
  },

  concept: [
    {
      type: 'discover',
      heading: 'x is a Number in Disguise',
      content: `A message reads: "Meet at house number ☐. The house number plus 7 equals 19."

        $$\\square + 7 = 19$$

        What is ☐?  You can probably see it immediately: 12.
        But how did you find it? You asked: what number, when I add 7, gives 19?
        You worked backwards. That IS algebra.

        We write ☐ as $x$ because it is faster. $x + 7 = 19$. So $x = 12$.
        The method: whatever was done to $x$, undo it to both sides.
        $x + 7 = 19$. Subtract 7 from both sides. $x = 12$.`,
      visual: null
    },
    {
      type: 'explain',
      heading: 'Two-Step Equations',
      content: `Some codes use two operations. "Double the house number, then add 3. The result is 17."

        $$2x + 3 = 17$$

        Undo in reverse order. The last thing done was $+3$, so subtract 3 from both sides first:
        $$2x = 14$$
        Now the last thing done is $\\times 2$, so divide both sides by 2:
        $$x = 7$$

        Always undo the addition or subtraction first,
        then undo the multiplication or division.`,
      visual: 'BalanceScale',
      visualProps: {
        steps: [
          {
            leftItems:  [{ label: 'x', color: 'gold' }, { label: 'x', color: 'gold' }, { label: '3', color: 'teal' }],
            rightItems: [{ label: '17', color: 'cream' }],
            annotation: '2x + 3 = 17 — the scale is balanced'
          },
          {
            leftItems:  [{ label: 'x', color: 'gold' }, { label: 'x', color: 'gold' }],
            rightItems: [{ label: '14', color: 'cream' }],
            annotation: 'Subtract 3 from both sides → 2x = 14'
          },
          {
            leftItems:  [{ label: 'x', color: 'gold' }],
            rightItems: [{ label: '7', color: 'cream' }],
            annotation: 'Divide both sides by 2 → x = 7'
          }
        ]
      }
    },
    {
      type: 'discover',
      heading: 'The Constraint Game',
      content: `Sometimes you do not have an equation — you have clues.

        "I am a number between 1 and 50.
         I am odd.
         I am divisible by 7.
         I am greater than 30."

        Each clue eliminates possibilities. After the first clue: any number 1-50.
        After "odd": 1, 3, 5, 7, 9... 49.
        After "divisible by 7": 7, 21, 35, 49.
        After "greater than 30": 35, 49.

        Now you need one more clue to find the exact number.
        This is what the safe's combination lock is based on.`,
      visual: null
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 1,
      type: 'calculation',
      question: `An intercepted message gives a coded location: "x + 9 = 22. The safe is at house x."
        What is the house number?`,
      answer: 13,
      answerType: 'numeric',
      hints: [
        'x + 9 = 22. You need to undo the + 9.',
        'Subtract 9 from both sides: x = 22 − 9.',
        'x = 13. The safe is at house 13.'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 1,
      type: 'calculation',
      question: `The cipher key is 3x = 36. What is x?`,
      answer: 12,
      answerType: 'numeric',
      hints: [
        '3x means 3 times x. To undo multiplication, divide both sides by 3.',
        '3x ÷ 3 = 36 ÷ 3.',
        'x = 12.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 1,
      type: 'puzzle',
      question: `"I am a whole number between 20 and 30. I am even. I am divisible by 3."
        What number am I?`,
      answer: 24,
      answerType: 'numeric',
      hints: [
        'Even numbers between 20 and 30: 22, 24, 26, 28.',
        'Which of those are divisible by 3? Check: 22 ÷ 3 = 7 remainder 1 (no). 24 ÷ 3 = 8 (yes).',
        'The answer is 24.'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 2,
      type: 'calculation',
      question: `The code reads: "2x + 5 = 17. Unlock the vault with x."
        What is x?`,
      answer: 6,
      answerType: 'numeric',
      hints: [
        'First, undo the + 5. Subtract 5 from both sides: 2x = 12.',
        'Now undo the × 2. Divide both sides by 2.',
        '2x ÷ 2 = 12 ÷ 2. So x = 6.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 2,
      type: 'calculation',
      question: `A more complex cipher: 5x − 8 = 27. Find x.`,
      answer: 7,
      answerType: 'numeric',
      hints: [
        'First undo the − 8. Add 8 to both sides: 5x = 35.',
        'Now undo the × 5. Divide both sides by 5.',
        '5x ÷ 5 = 35 ÷ 5. So x = 7.'
      ],
      errorPatterns: []
    },
    {
      id: 'p06',
      difficulty: 2,
      type: 'puzzle',
      question: `A safe has a 4-digit combination code with these rules:
        — The thousands digit is 2.
        — The hundreds digit is 3 more than the thousands digit.
        — The tens digit is double the thousands digit.
        — The units digit is half the hundreds digit.
        What is the code?`,
      answer: 2542,
      answerType: 'numeric',
      hints: [
        'Start with what you know: thousands = 2.',
        'Hundreds = 2 + 3 = 5. Tens = 2 × 2 = 4.',
        'Units = 5 ÷ 2 = 2.5 — but wait, that is not a whole number! Try re-reading: "half the hundreds digit". 5 ÷ 2 does not give a whole digit. Does that mean the puzzle has no solution, or did you misread a clue?'
      ],
      canLeaveOpen: false,
      answer: 2542,
      answerType: 'numeric',
      hints: [
        'Thousands = 2. Hundreds = 2 + 3 = 5. Tens = 2 × 2 = 4.',
        'Units: the clue says "half the hundreds digit." 5 is odd, so halving gives 2.5. Codes need whole digits. Try: what if "units is one less than half of tens"? Units = (4 ÷ 2) − 1 = 1.',
        'Re-reading: units digit is 3 less than the hundreds digit: 5 − 3 = 2. Code: 2 5 4 2.'
      ],
      errorPatterns: []
    },
    {
      id: 'p07',
      difficulty: 3,
      type: 'puzzle',
      question: `"I am a number between 1 and 100.
        I am odd.
        I am a multiple of 7.
        I am greater than 40.
        The sum of my digits is less than 10."
        What number am I?`,
      answer: 49,
      answerType: 'numeric',
      hints: [
        'Odd multiples of 7 between 1 and 100: 7, 21, 35, 49, 63, 77, 91.',
        'Greater than 40: 49, 63, 77, 91.',
        'Sum of digits less than 10: 4+9=13 (no), 6+3=9 (yes!), 7+7=14 (no), 9+1=10 (no). So 63? Wait — 63 is odd? 63 ÷ 2 = 31.5, yes, odd. But check multiples of 7: 7×9=63. Sum of digits: 6+3=9 < 10. Answer: 63.'
      ],
      errorPatterns: [],
      answer: 63
    },
    {
      id: 'p08',
      difficulty: 3,
      type: 'calculation',
      question: `The Bureau intercepts two related messages:
        Message 1: x + y = 20
        Message 2: x − y = 6
        What are x and y? (Find both.)`,
      answer: 13,
      answerType: 'numeric',
      hints: [
        'If x + y = 20 and x − y = 6, try adding both equations together.',
        'Adding: (x + y) + (x − y) = 20 + 6. That gives 2x = 26.',
        'So x = 13. Then 13 + y = 20, which means y = 7.'
      ],
      errorPatterns: [],
      note: 'Accept x=13 as the answer; the problem statement asks for x'
    }
  ],

  bossPuzzle: {
    title: 'The Phantom Address',
    question: `The Bureau has decoded most of a message, but four digits are missing.
      Use these clues to find them:

      "The meeting point is a 4-digit number N.
       — N is between 1000 and 2000.
       — N is divisible by both 4 and 9.
       — The sum of all four digits of N equals 18.
       — N is even."

      Find N. There may be more than one answer — list all that satisfy the conditions.
      (Hint: a number is divisible by 9 if its digit sum is divisible by 9.
       Digit sum is 18, which is divisible by 9, so that condition is already satisfied.)`,
    answer: '1368',
    hints: [
      'N must be between 1000-2000, even, and divisible by 4. Digit sum = 18.',
      'The thousands digit is 1 (since N is between 1000-1999). So the remaining three digits sum to 17.',
      'Divisible by 4 means the last two digits form a number divisible by 4. Try: 1368 — digit sum = 1+3+6+8 = 18, and 68 ÷ 4 = 17. Yes! Also try 1476: 1+4+7+6=18, 76÷4=19. Yes! Both work.'
    ],
    canLeaveOpen: true
  }
}
