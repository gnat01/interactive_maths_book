export default {
  id: 'cold-surveyors-riddle',
  type: 'cold',
  title: "The Surveyor's Riddle",
  subtitle: 'Who owns which piece of land?',
  topic: 'Composite Areas & Spatial Reasoning',
  gradeTag: 'grade-4',
  prerequisites: ['case-04'],
  unlocks: [],

  caseFile: {
    classification: 'COLD',
    bureau: 'The Mathemagical Bureau',
    summary: `Two noble families — the Caldwells and the Ashfords — are disputing a border.
      The original land deed specifies areas precisely, but the surveyor's measurements
      involve L-shapes, cutouts, and overlapping claims. The Bureau must calculate the
      exact area of each claim and determine who, if anyone, is encroaching.`,
    agentNote: `Complex shapes are just simple shapes in disguise.
      Split them. Surround and subtract. Work backwards from area to find a dimension.
      The maths does not care about noble families — it only cares about numbers.`
  },

  spark: {
    type: 'fact',
    heading: 'How the ancient Egyptians survived the Nile',
    content: `Every year, the Nile flooded its banks. Every year, the floodwaters
      erased all the boundary markers between fields.
      Every year, Egyptian surveyors had to recalculate every farmer's land area
      from scratch — because taxes were based on area, and fairness depended on accuracy.

      They called this science "harpedonaptai" — rope stretching.
      Surveyors stretched knotted ropes into right angles to measure areas.
      The geometry they developed was not abstract — it was how the Egyptian
      state functioned. Every harvest, every tax, every land dispute, depended on it.

      The Caldwell-Ashford dispute is 4,000 years old in spirit.`,
    punchline: `The maths has not changed. Only the shapes have.`
  },

  concept: [
    {
      type: 'explain',
      heading: 'Two Strategies for Composite Shapes',
      content: `When a shape is irregular, you have two options:

        STRATEGY 1 — SPLIT AND ADD:
        Divide the shape into rectangles and triangles.
        Calculate each piece separately. Add them together.

        STRATEGY 2 — SURROUND AND SUBTRACT:
        Draw the smallest rectangle that contains the whole shape.
        Calculate the area of that rectangle.
        Subtract the pieces that are inside the rectangle but outside the shape.

        Both give the same answer. Choose whichever is easier for the specific shape.
        L-shapes: usually easier to split.
        Shapes with curved or triangular notches: usually easier to surround and subtract.`,
      visual: null
    },
    {
      type: 'discover',
      heading: 'Working Backwards',
      content: `Sometimes you know the area and need to find a missing dimension.
        If Area = length × width, and you know the area and one dimension,
        divide to find the other: length = Area ÷ width.

        This is just algebra in disguise.
        Area = l × w → l = Area ÷ w.

        The Caldwell land deed gives the total area and most dimensions.
        One boundary stone is missing — its position must be calculated,
        not measured.`,
      visual: null
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 2,
      type: 'calculation',
      question: `The Ashford plot is L-shaped. The outer rectangle is 12m × 9m.
        A rectangular piece 4m × 5m has been cut from the top-right corner.
        What is the area of the L-shaped plot?`,
      answer: 88,
      answerType: 'numeric',
      hints: [
        'Method: surround and subtract. Full rectangle area = 12 × 9 = 108 m².',
        'Cutout area = 4 × 5 = 20 m².',
        'L-shape area = 108 − 20 = 88 m².'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 2,
      type: 'calculation',
      question: `The Caldwell plot is made of two rectangles joined along one edge.
        Rectangle 1: 10m × 6m.  Rectangle 2: 7m × 4m.
        What is the total area?`,
      answer: 88,
      answerType: 'numeric',
      hints: [
        'Calculate each rectangle separately.',
        '10 × 6 = 60. 7 × 4 = 28.',
        '60 + 28 = 88 m².'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 2,
      type: 'word-problem',
      question: `A triangular corner of the Ashford garden has a base of 14m and a height of 8m.
        What is its area? And if this triangle is removed from a 14m × 10m rectangle,
        what is the remaining area?`,
      answer: 84,
      answerType: 'numeric',
      hints: [
        'Triangle area = ½ × base × height = ½ × 14 × 8 = 56 m².',
        'Rectangle area = 14 × 10 = 140 m².',
        'Remaining area = 140 − 56 = 84 m².'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 3,
      type: 'word-problem',
      question: `The disputed strip of land is rectangular with an area of 117 m².
        The Bureau has measured one side: it is 9 metres long.
        What is the length of the other side?
        And what is the perimeter of the disputed strip?`,
      answer: 42,
      answerType: 'numeric',
      hints: [
        'Area = length × width. 117 = 9 × width.',
        'Width = 117 ÷ 9 = 13 metres.',
        'Perimeter = 2 × (9 + 13) = 2 × 22 = 44 metres.'
      ],
      errorPatterns: [],
      answer: 44
    },
    {
      id: 'p05',
      difficulty: 3,
      type: 'puzzle',
      question: `The full estate boundary is a rectangle: 25m × 20m = 500 m².
        The land deed allocates:
          — Caldwell family: 210 m²
          — Ashford family: 195 m²
          — Public footpath (rectangular): 8m × 5m

        Is there any unaccounted land? If so, how much?
        And is the footpath correctly described in the deed?`,
      answer: 55,
      answerType: 'numeric',
      hints: [
        'Total estate = 500 m². Caldwell + Ashford + footpath = 210 + 195 + 40 = 445 m².',
        'Unaccounted = 500 − 445 = 55 m².',
        'Footpath = 8 × 5 = 40 m². That matches the deed. But 55 m² is missing from somewhere else. This is suspicious.'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Missing Boundary Stone',
    question: `The surveyors have reconstructed most of the Caldwell estate boundary.
      It is an L-shaped plot. They know:

        — The overall bounding rectangle is 18m wide and Hm tall (H is unknown).
        — A rectangular notch has been cut from the top-right corner: 6m wide and 5m tall.
        — The total area of the L-shape is 150 m².

      Find H — the total height of the bounding rectangle.

      Then find the perimeter of the L-shaped plot.`,
    answer: '10',
    hints: [
      'L-shape area = bounding rectangle area − notch area. 150 = (18 × H) − (6 × 5).',
      '150 = 18H − 30. So 18H = 180. H = 10 metres.',
      'Perimeter of L-shape: go around the edges. 18 + 10 + 6 + 5 + 12 + 5 = ... trace it: bottom=18, right side=10 (but notch takes 5 off the top), then notch top inward=6, then down=5, then left across the notch bottom=12, then up the left side=10. Total = 18+10−5+5+6+5+12+10 — careful: perimeter = 18 + (10−5) + 6 + 5 + 12 + 10 = 18+5+6+5+12+10 = 56 metres.'
    ],
    canLeaveOpen: false
  }
}
