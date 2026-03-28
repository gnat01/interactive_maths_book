export default {
  id: 'case-06',
  type: 'main',
  title: 'The Probability Heist',
  subtitle: 'What are the real odds?',
  topic: 'Introduction to Probability',
  gradeTag: 'grade-4',
  prerequisites: ['case-05'],
  unlocks: ['cold-infinite-mirror'],

  caseFile: {
    classification: 'ACTIVE',
    bureau: 'The Mathemagical Bureau',
    summary: `A crew of thieves is planning a heist that depends entirely on a sequence
      of dice rolls going their way. They believe the odds are in their favour.
      The Bureau needs you to calculate the true probabilities — and expose the fatal
      flaw in their plan before they act.`,
    agentNote: `Probability does not care about luck, superstition, or streaks.
      It only cares about counting outcomes carefully.`
  },

  spark: {
    type: 'fact',
    heading: 'Two mathematicians arguing about gambling invented probability theory',
    content: `In 1654, a French nobleman called the Chevalier de Méré was losing money
      gambling and could not figure out why. He wrote to the mathematician Blaise Pascal.
      Pascal wrote to another mathematician, Pierre de Fermat.
      The two men exchanged letters solving the Chevalier's problem.

      Those letters invented probability theory.

      The most useful branch of mathematics in modern science — used in medicine,
      finance, weather forecasting, artificial intelligence — was born because
      two people argued about dice in 1654.

      And the Chevalier? Once Pascal explained the maths, he stopped losing.`,
    punchline: `The crew planning this heist has the same problem as the Chevalier.
      They think they understand the odds. They do not.`
  },

  concept: [
    {
      type: 'explain',
      heading: 'Probability — Counting What Could Happen',
      content: `$$P(\\text{event}) = \\frac{\\text{outcomes you want}}{\\text{total possible outcomes}}$$

        Roll a standard die. Six possible outcomes: 1, 2, 3, 4, 5, 6.
        Probability of rolling a 4: one outcome you want, six total. $P(4) = \\frac{1}{6}$.
        Probability of rolling an even number: three outcomes you want (2, 4, 6). $P(\\text{even}) = \\frac{3}{6} = \\frac{1}{2}$.

        Probability lives between 0 and 1.
        0 means impossible. 1 means certain. $\\frac{1}{2}$ means exactly even odds.
        $P(\\text{NOT happening}) = 1 - P(\\text{happening})$.`,
      visual: null
    },
    {
      type: 'discover',
      heading: 'Two Dice — Listing Every Outcome',
      content: `The heist crew rolls two dice. They need the total to be more than 8.
        How many ways can two dice land? 6 × 6 = 36 total outcomes.

        To count the favourable ones, list them:
        (3,6), (4,5), (4,6), (5,4), (5,5), (5,6), (6,3), (6,4), (6,5), (6,6)
        That is 10 outcomes out of 36.
        $P(\\text{sum} > 8) = \\frac{10}{36} = \\frac{5}{18} \\approx 0.28$.

        The crew thinks they have "better than 1 in 4 odds." They are right — barely.
        But they need this to happen three times in a row...`,
      visual: 'ProbabilityDice',
      visualProps: { highlightAbove: 8, label: 'sum > 8' }
    },
    {
      type: 'explain',
      heading: 'Conditional Probability — When the First Roll Matters',
      content: `The first die has already landed. It shows a 4.
        Now what is the probability the total is more than 8?

        With the first die fixed at 4, the second die needs to show 5 or 6 (since 4+5=9, 4+6=10).
        That is 2 outcomes out of 6. $P(\\text{sum} > 8 \\mid \\text{first die} = 4) = \\frac{2}{6} = \\frac{1}{3}$.

        This is conditional probability — the probability of something,
        GIVEN that something else has already happened.
        The first event changes the landscape of the second.`,
      visual: null
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 1,
      type: 'calculation',
      question: `A thief rolls a single die. What is the probability of rolling a number greater than 4?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['1/6', '1/3', '1/2', '2/3'],
      correctChoice: '1/3',
      hints: [
        'Numbers greater than 4 on a die: 5 and 6. That is 2 outcomes.',
        'Total outcomes: 6.',
        'P(greater than 4) = 2/6 = 1/3.'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 1,
      type: 'calculation',
      question: `The crew needs to roll an odd number. What is the probability?
        And what is the probability they do NOT roll an odd number?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['P(odd) = 1/2, P(not odd) = 1/2', 'P(odd) = 1/3, P(not odd) = 2/3', 'P(odd) = 2/3, P(not odd) = 1/3'],
      correctChoice: 'P(odd) = 1/2, P(not odd) = 1/2',
      hints: [
        'Odd numbers on a die: 1, 3, 5. That is 3 out of 6.',
        'P(odd) = 3/6 = 1/2.',
        'P(not odd) = 1 − 1/2 = 1/2.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 1,
      type: 'word-problem',
      question: `A bag contains 3 red marbles, 5 blue marbles, and 2 green marbles.
        One marble is drawn at random. What is the probability it is blue?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['1/2', '1/3', '5/10', '3/10'],
      correctChoice: '1/2',
      hints: [
        'Total marbles: 3 + 5 + 2 = 10.',
        'Blue marbles: 5.',
        'P(blue) = 5/10 = 1/2.'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 2,
      type: 'calculation',
      question: `Two dice are rolled. How many ways can they sum to exactly 7?
        What is the probability of rolling a sum of 7?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['4/36', '5/36', '6/36', '7/36'],
      correctChoice: '6/36',
      hints: [
        'List the pairs that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).',
        'That is 6 pairs.',
        'P(sum = 7) = 6/36 = 1/6.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 2,
      type: 'word-problem',
      question: `The first die has already landed on 3. What is the probability
        that the sum of both dice is greater than 8?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['1/6', '2/6', '3/6', '0/6'],
      correctChoice: '2/6',
      hints: [
        'First die is fixed at 3. The sum needs to be more than 8, so the second die needs to show more than 5.',
        'Second die values that make sum > 8 when first = 3: need second die > 5, so only 6.',
        'Wait — 3+6 = 9 > 8. That is only 1 outcome. P = 1/6. But also check: is 3+5=8 > 8? No, 8 is not greater than 8. So P = 1/6.'
      ],
      errorPatterns: [],
      correctChoice: '1/6'
    },
    {
      id: 'p06',
      difficulty: 2,
      type: 'word-problem',
      question: `The Bureau calculates: to pull off the heist, the crew needs to roll
        a sum greater than 8 on THREE separate rolls of two dice.
        The probability of success on each roll is 10/36.
        On two rolls it would be (10/36) × (10/36).
        Is the probability of success on all three rolls more or less than 1 in 10?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['More than 1 in 10', 'Less than 1 in 10', 'Exactly 1 in 10'],
      correctChoice: 'Less than 1 in 10',
      hints: [
        '10/36 ≈ 0.28 per roll. For three rolls: 0.28 × 0.28 × 0.28.',
        '0.28 × 0.28 ≈ 0.078. Then 0.078 × 0.28 ≈ 0.022.',
        '0.022 is about 1 in 45 — far less than 1 in 10. The crew has badly miscalculated their odds.'
      ],
      errorPatterns: []
    },
    {
      id: 'p07',
      difficulty: 3,
      type: 'puzzle',
      question: `A different probability puzzle: a bag has 4 red and 6 blue marbles.
        You draw one marble, note its colour, and put it back.
        Then draw again.
        What is the probability of drawing red both times?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['4/10', '16/100', '8/20', '4/20'],
      correctChoice: '16/100',
      hints: [
        'P(red on first draw) = 4/10.',
        'Since you put it back, P(red on second draw) = 4/10 again.',
        'P(both red) = 4/10 × 4/10 = 16/100.'
      ],
      errorPatterns: []
    },
    {
      id: 'p08',
      difficulty: 3,
      type: 'puzzle',
      question: `Here is a harder question — one that might not have an obvious answer:

        The Bureau wants to calculate the probability of a volcano in a certain mountain
        range erupting next year. Can we find this probability by rolling dice, flipping
        coins, or counting outcomes like we have been doing?

        What makes this probability problem fundamentally different?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: [
        'It is no different — just count historical eruptions',
        'We cannot count equally likely outcomes — there is no repeatable experiment',
        'Volcanoes are random so probability does not apply'
      ],
      correctChoice: 'We cannot count equally likely outcomes — there is no repeatable experiment',
      hints: [
        'With dice, we can list every possible outcome and they are all equally likely. Can we do that with a volcano?',
        'A volcano either erupts or does not — but we cannot run the experiment many times under identical conditions. We cannot "reset" the volcano.',
        'For dice and coins we use counting. For unique events like volcano eruptions, weather, or historical events, we use different methods — models, historical data, expert judgement. This is a fundamentally different kind of probability.'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Fatal Flaw',
    question: `The crew's full heist plan requires three things to go right, in order:

      Step 1: Roll a sum of 7 or 11 on two dice. P(7 or 11) = 8/36.
      Step 2: Given Step 1 succeeded, pick the correct key from 5 identical keys. P = 1/5.
      Step 3: The getaway driver rolls a 6 on a single die. P = 1/6.

      The crew leader says: "Each step is unlikely but possible. Together we have a real chance."

      1. What is the probability ALL THREE steps succeed?
      2. Express your answer as a fraction and as a rough "1 in N" chance.
      3. Is the crew leader right that they have "a real chance"?`,
    answer: '1 in 135',
    hints: [
      'Multiply the three probabilities: 8/36 × 1/5 × 1/6.',
      '8/36 × 1/5 = 8/180. Then 8/180 × 1/6 = 8/1080 = 1/135.',
      '1/135 means roughly a 1 in 135 chance. That is less than 1%. The crew leader is wrong — this is not "a real chance".'
    ],
    canLeaveOpen: false
  }
}
