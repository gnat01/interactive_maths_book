export default {
  id: 'case-05',
  type: 'main',
  title: 'The Census Conspiracy',
  subtitle: 'Someone tampered with the town records',
  topic: 'Statistics & Data',
  gradeTag: 'grade-4',
  prerequisites: ['case-02'],
  unlocks: ['case-06'],

  caseFile: {
    classification: 'ACTIVE',
    bureau: 'The Mathemagical Bureau',
    summary: `The town of Millhaven submitted its annual census to the Bureau.
      The population figures, income records and age distributions all look
      reasonable at first glance. But three independent witnesses have reported
      that the data was altered before submission. Find the anomalies.`,
    agentNote: `The mean, median and mode each tell a different story about the same data.
      A fraudster who changes one number changes the mean — but rarely the median.
      That gap is your evidence.`
  },

  spark: {
    type: 'fact',
    heading: 'How one doctor stopped a plague with a dot map',
    content: `In 1854, cholera was killing hundreds of people in London.
      Nobody knew why. A doctor named John Snow did something unusual:
      instead of examining patients, he made a map.
      He put a dot on the map for every death.

      The dots clustered around a single water pump on Broad Street.
      He removed the pump handle. The outbreak stopped within days.

      Snow did not cure a single patient. He looked at the pattern in the data
      and found what no individual examination could reveal.
      That is what statistics does: it finds the signal hidden in the noise.`,
    punchline: `The fraudster in Millhaven changed some numbers. The pattern they left behind
      will give them away.`
  },

  concept: [
    {
      type: 'discover',
      heading: 'Mean, Median, Mode — Three Ways to Find the Middle',
      content: `Seven houses on a street have these values in gold coins:
        12, 15, 14, 18, 13, 16, 250

        Mean: add them all up and divide by how many. Try it.
        (12+15+14+18+13+16+250) ÷ 7 = 338 ÷ 7 ≈ 48.

        Median: put them in order and find the middle one.
        12, 13, 14, 15, 16, 18, 250. Middle value = 15.

        Mode: the value that appears most often.
        (Here, no value repeats — there is no mode.)

        The mean says 48. The median says 15. Which is more honest?
        The 250 is an outlier — it drags the mean far from where most values sit.
        The median ignores it completely.`,
      visual: null
    },
    {
      type: 'explain',
      heading: 'Outliers — The Clue in the Anomaly',
      content: `An outlier is a value far outside the range of the others.
        It might be real (one genuinely rich family in a poor street).
        It might be an error (someone wrote 250 instead of 25).
        It might be fraud (someone inflated one number to shift the average).

        The trick: compare mean and median.
        If they are close, the data is roughly symmetric — no extreme outliers.
        If they are far apart, something is pulling the mean away.
        That something is worth investigating.`,
      visual: null
    },
    {
      type: 'explain',
      heading: 'Reading Charts — Where Fraud Hides in Plain Sight',
      content: `Bar charts and line graphs can be manipulated by changing the scale.
        A chart that starts at 95 instead of 0 makes a tiny increase look enormous.
        A chart with an irregular scale can hide a sudden jump.

        When you read a chart, always check:
        1. Where does the vertical axis start?
        2. Are the intervals on the axis equal?
        3. Does the visual impression match the actual numbers?

        In Millhaven's census charts, the axis starts at an unusual number.
        That is where you should look first.`,
      visual: null
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 1,
      type: 'calculation',
      question: `The ages of seven children in Millhaven are: 8, 9, 7, 10, 8, 11, 8.
        What is the mode?`,
      answer: 8,
      answerType: 'numeric',
      hints: [
        'The mode is the value that appears most often.',
        'Count how many times each number appears: 7 once, 8 three times, 9 once, 10 once, 11 once.',
        'The mode is 8.'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 1,
      type: 'calculation',
      question: `The weekly wages (in coins) of five workers are: 42, 35, 50, 38, 45.
        What is the median wage?`,
      answer: 42,
      answerType: 'numeric',
      hints: [
        'Put the values in order from smallest to largest.',
        '35, 38, 42, 45, 50.',
        'The middle value (3rd out of 5) is 42.'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 1,
      type: 'calculation',
      question: `The annual harvests (in tonnes) for six farms are: 24, 31, 28, 35, 22, 30.
        What is the mean harvest?`,
      answer: 28,
      answerType: 'numeric',
      hints: [
        'Add all values: 24 + 31 + 28 + 35 + 22 + 30.',
        '24 + 31 = 55. 55 + 28 = 83. 83 + 35 = 118. 118 + 22 = 140. 140 + 30 = 170.',
        'Mean = 170 ÷ 6 = 28.33... But since all values are whole numbers, check: 170 ÷ 6 = 28 remainder 2. Mean ≈ 28. (Accept 28 or 28.3.)'
      ],
      errorPatterns: [],
      answer: 28
    },
    {
      id: 'p04',
      difficulty: 2,
      type: 'word-problem',
      question: `Millhaven reports that the mean income of its 7 households is 40 coins per week.
        Six of the households earn: 28, 35, 32, 41, 38, 44.
        What must the seventh household earn for the mean to be 40?`,
      answer: 62,
      answerType: 'numeric',
      hints: [
        'If the mean of 7 values is 40, their total must be 7 × 40 = 280.',
        'Add the six known values: 28 + 35 + 32 + 41 + 38 + 44 = 218.',
        'The seventh value = 280 − 218 = 62.'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 2,
      type: 'word-problem',
      question: `The census lists these house prices in Millhaven (in hundreds of coins):
        15, 18, 14, 16, 19, 17, 95.

        Calculate both the mean and the median. Which gives a more honest picture
        of a typical house price — and why?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['Mean — it uses all the data', 'Median — it is not skewed by the outlier', 'They are the same'],
      correctChoice: 'Median — it is not skewed by the outlier',
      hints: [
        'Mean: (15+18+14+16+19+17+95) ÷ 7 = 194 ÷ 7 ≈ 27.7.',
        'Median: order the values — 14, 15, 16, 17, 18, 19, 95. Middle value = 17.',
        'Most houses are priced 14–19. The mean of 27.7 is inflated by the 95 outlier. The median of 17 is more representative.'
      ],
      errorPatterns: []
    },
    {
      id: 'p06',
      difficulty: 2,
      type: 'word-problem',
      question: `A census official claims: "The mean age of residents is 34."
        The seven ages on record are: 12, 28, 31, 45, 29, 33, x.
        What value of x makes this claim true?`,
      answer: 60,
      answerType: 'numeric',
      hints: [
        'Mean of 7 values = 34 means total = 7 × 34 = 238.',
        'Sum of known values: 12 + 28 + 31 + 45 + 29 + 33 = 178.',
        'x = 238 − 178 = 60.'
      ],
      errorPatterns: []
    },
    {
      id: 'p07',
      difficulty: 3,
      type: 'puzzle',
      question: `The original census showed these 6 income values: 30, 32, 35, 38, 40, 45.
        Someone altered ONE value, increasing the mean by exactly 5.
        Which value was changed, and what was it changed to?`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['30 was changed to 60', '45 was changed to 75', '38 was changed to 68'],
      correctChoice: '45 was changed to 75',
      hints: [
        'Original mean: (30+32+35+38+40+45) ÷ 6 = 220 ÷ 6 ≈ 36.7.',
        'New mean = 36.7 + 5 = 41.7. New total = 41.7 × 6 = 250.',
        'Increase needed = 250 − 220 = 30. So one value was increased by 30. 45 + 30 = 75.'
      ],
      errorPatterns: []
    },
    {
      id: 'p08',
      difficulty: 3,
      type: 'word-problem',
      question: `Millhaven claims the range of harvest sizes is 18 tonnes.
        The smallest recorded harvest is 22 tonnes.
        The mean of all 5 harvests is 32 tonnes.
        Three of the harvests are 22, 28, and 34 tonnes.
        Find the remaining two harvests.`,
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['30 and 36', '30 and 40', '32 and 38'],
      correctChoice: '30 and 40',
      hints: [
        'Range = 18, smallest = 22, so largest = 22 + 18 = 40.',
        'Mean of 5 = 32, so total = 5 × 32 = 160.',
        'Known values: 22 + 28 + 34 + 40 = 124. Missing value = 160 − 124 = 36. Wait — check the choices. 30 + 40 = 70, and 22+28+34+30+40=154≠160. Try: 22+28+34+36+40=160. Answer is 36 and 40.'
      ],
      errorPatterns: [],
      answer: 0,
      answerType: 'multiple-choice',
      choices: ['30 and 40', '36 and 40', '32 and 38'],
      correctChoice: '36 and 40'
    }
  ],

  bossPuzzle: {
    title: 'The Tampered Record',
    question: `The Bureau has two versions of Millhaven's population data — the original
      (recovered from a backup) and the submitted (possibly altered) version.

      Original 8 values: 45, 52, 48, 61, 57, 44, 49, 56
      Submitted 8 values: 45, 52, 48, 61, 57, 44, 49, 86

      1. What is the mean of each dataset?
      2. What is the median of each dataset?
      3. Which measure changed more — mean or median?
      4. Why would a fraudster choose to alter the value they altered?`,
    answer: 'mean',
    hints: [
      'Original total = 45+52+48+61+57+44+49+56 = 412. Mean = 412 ÷ 8 = 51.5. Submitted total = 442. Mean = 442 ÷ 8 = 55.25.',
      'Original ordered: 44,45,48,49,52,56,57,61. Median = average of 4th and 5th = (49+52)/2 = 50.5. Submitted ordered: 44,45,48,49,52,57,61,86. Median = (49+52)/2 = 50.5. Median unchanged!',
      'The mean changed by 3.75 but the median did not change at all. The fraudster changed the largest value — it inflates the mean without touching the middle of the distribution.'
    ],
    canLeaveOpen: false
  }
}
