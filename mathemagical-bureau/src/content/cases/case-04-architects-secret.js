export default {
  id: 'case-04',
  type: 'main',
  title: "The Architect's Secret",
  subtitle: 'Hidden rooms in a stolen blueprint',
  topic: 'Geometry — Shapes, Angles & Area',
  gradeTag: 'grade-4',
  prerequisites: ['case-01'],
  unlocks: ['case-05', 'cold-surveyors-riddle'],

  caseFile: {
    classification: 'ACTIVE',
    bureau: 'The Mathemagical Bureau',
    summary: `A blueprint for a government building has been stolen and altered.
      The thief added hidden rooms to the plans — rooms that would give them
      secret access. The only way to find them is to use geometry: the shapes,
      angles and areas that the architect could not change without leaving traces.`,
    agentNote: `Every shape follows rules it cannot break. Find the rules, and the
      blueprint tells you everything — including what was added and what was hidden.`
  },

  spark: {
    type: 'fact',
    heading: 'A fact the universe enforces',
    content: `Take any triangle. Any triangle at all — enormous, tiny, lopsided, almost
      a straight line. Measure all three angles.
      They will add up to exactly 180 degrees. Every time. Without exception.

      This is not a coincidence. It is a logical consequence of how flat space works.
      The ancient Greeks proved it 2,500 years ago, and no one has ever found a triangle
      that breaks the rule.

      What this means for you: if you know two angles of a triangle,
      you automatically know the third. You cannot be given incomplete information
      about a triangle's angles. The third angle is never missing — it is always hiding.`,
    punchline: `The hidden room in this blueprint obeys the same laws. Geometry always leaves evidence.`
  },

  concept: [
    {
      type: 'explain',
      heading: 'Angles — the Language of Direction',
      content: `An angle measures how much something turns or opens.
        Right angle: exactly 90°. The corner of a page.
        Acute angle: less than 90°. Sharper than a corner.
        Obtuse angle: more than 90° but less than 180°. More open than a corner.
        Reflex angle: more than 180°. More than a half-turn.

        When two lines cross, they make four angles. The ones opposite each other
        are always equal. The ones next to each other always add up to 180°.`,
      visual: null
    },
    {
      type: 'discover',
      heading: 'Triangles — Deduction in Action',
      content: `A triangle has three angles that always sum to 180°.
        That means:
        — If you know two angles, the third is 180° minus both of them.
        — An equilateral triangle (all sides equal) must have all angles equal to 60°.
        — A right-angled triangle has one 90° angle, so the other two must add up to 90°.

        Quadrilaterals (four-sided shapes) always sum to 360°.
        That is just two triangles side by side.

        The blueprint thief altered some angles. Can you find the ones that are impossible?`,
      visual: null
    },
    {
      type: 'explain',
      heading: 'Area — How Much Space?',
      content: `Area of a rectangle = length × width. Always.
        Area of a triangle = half of (base × height). Always.
        Why half? Because a triangle is always exactly half of the rectangle that contains it.
        Draw any triangle. Draw the smallest rectangle that fits around it. The triangle fills exactly half.

        For complicated shapes (L-shapes, rooms with corridors), split into simpler pieces.
        Or: surround with a rectangle and subtract the parts you do not want.`,
      visual: null
    }
  ],

  problems: [
    {
      id: 'p01',
      difficulty: 1,
      type: 'calculation',
      question: `A triangular section of the blueprint has two angles of 55° and 75°.
        What is the third angle?`,
      answer: 50,
      answerType: 'numeric',
      hints: [
        'All three angles of a triangle add up to 180°.',
        '55 + 75 = 130.',
        '180 − 130 = 50°.'
      ],
      errorPatterns: []
    },
    {
      id: 'p02',
      difficulty: 1,
      type: 'calculation',
      question: `A rectangular room in the blueprint is 14 metres long and 9 metres wide.
        What is the area of the room?`,
      answer: 126,
      answerType: 'numeric',
      hints: [
        'Area of a rectangle = length × width.',
        '14 × 9.',
        '14 × 9 = 14 × 10 − 14 = 140 − 14 = 126 m².'
      ],
      errorPatterns: []
    },
    {
      id: 'p03',
      difficulty: 1,
      type: 'puzzle',
      question: `The blueprint shows a quadrilateral room with three angles of 85°, 110°, and 95°.
        What must the fourth angle be?`,
      answer: 70,
      answerType: 'numeric',
      hints: [
        'All four angles of a quadrilateral add up to 360°.',
        '85 + 110 + 95 = 290.',
        '360 − 290 = 70°.'
      ],
      errorPatterns: []
    },
    {
      id: 'p04',
      difficulty: 2,
      type: 'calculation',
      question: `A triangular hidden room has a base of 12 metres and a height of 9 metres.
        What is its area?`,
      answer: 54,
      answerType: 'numeric',
      hints: [
        'Area of a triangle = ½ × base × height.',
        '½ × 12 × 9.',
        '12 × 9 = 108. Half of 108 = 54 m².'
      ],
      errorPatterns: []
    },
    {
      id: 'p05',
      difficulty: 2,
      type: 'puzzle',
      question: `An isosceles triangle (two equal sides) has one angle of 40°.
        That 40° angle is between the two equal sides.
        What are the other two angles?`,
      answer: 70,
      answerType: 'numeric',
      hints: [
        'The two base angles of an isosceles triangle are equal.',
        '180 − 40 = 140° left for the two equal angles.',
        '140 ÷ 2 = 70°. Each base angle is 70°.'
      ],
      errorPatterns: [],
      note: 'Both base angles are 70; accept 70'
    },
    {
      id: 'p06',
      difficulty: 2,
      type: 'calculation',
      question: `A corridor connects two rooms. The full outline is an L-shape:
        The outer rectangle is 10m × 8m.
        A rectangular piece 4m × 3m has been cut from one corner.
        What is the area of the L-shaped space?`,
      answer: 68,
      answerType: 'numeric',
      hints: [
        'Method 1: Surround and subtract. Full rectangle area minus the cut corner.',
        '10 × 8 = 80. Cut corner: 4 × 3 = 12.',
        '80 − 12 = 68 m².'
      ],
      errorPatterns: []
    },
    {
      id: 'p07',
      difficulty: 3,
      type: 'word-problem',
      question: `The thief added a hidden room whose area is given as 91 m².
        The room is rectangular. Its length is 7 metres.
        What is its width? And what is its perimeter?`,
      answer: 40,
      answerType: 'numeric',
      hints: [
        'Area = length × width. 91 = 7 × width.',
        'Width = 91 ÷ 7 = 13 metres.',
        'Perimeter = 2 × (length + width) = 2 × (7 + 13) = 2 × 20 = 40 metres.'
      ],
      errorPatterns: [],
      note: 'Accept 40 as the perimeter answer'
    },
    {
      id: 'p08',
      difficulty: 3,
      type: 'puzzle',
      question: `The blueprint shows a shape made of two rectangles joined together.
        Rectangle A is 8m × 5m. Rectangle B shares one side with A and is 6m × ?m.
        The total area of the combined shape is 82 m².
        What is the missing dimension of Rectangle B?`,
      answer: 7,
      answerType: 'numeric',
      hints: [
        'Rectangle A area = 8 × 5 = 40 m². The combined area is 82 m².',
        'Rectangle B area = 82 − 40 = 42 m².',
        'Rectangle B is 6m × ?m. 42 = 6 × ?. So ? = 42 ÷ 6 = 7 metres.'
      ],
      errorPatterns: []
    }
  ],

  bossPuzzle: {
    title: 'The Hidden Room',
    question: `The Bureau has reconstructed part of the stolen blueprint.
      The building has an outer rectangular boundary of 20m × 15m (area = 300 m²).
      Inside, the plans show:
        — A rectangular hall: 12m × 8m
        — A triangular lobby: base 8m, height 6m
        — Two identical square offices: each 4m × 4m

      The total area of all these known rooms is listed.
      But the plans also claim the building has NO remaining unaccounted space.

      Is the claim true? Or is there a hidden room?
      If there is a hidden room, what is its area?`,
    answer: '32',
    hints: [
      'Calculate the total area of all known rooms: hall + lobby + two offices.',
      'Hall = 12 × 8 = 96. Lobby = ½ × 8 × 6 = 24. Two offices = 2 × (4 × 4) = 32. Total known = 96 + 24 + 32 = 152.',
      'Building total = 20 × 15 = 300. Unaccounted = 300 − 152 = 148. But wait — there must also be walls and corridors. The plans claim only 116 m² for those. 300 − 152 − 116 = 32 m² hidden.'
    ],
    canLeaveOpen: true
  }
}
