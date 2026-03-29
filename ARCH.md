# The Mathemagical Bureau — Architecture

> This document covers the full technical architecture. Agree on this before touching code.
Important to note this is a V0. We will make mods based on learning pace, interest in various directions, and other parameters.
Loosley inspired by Martin Gardner ; all of te many shortcomings solely the author's!

---

## Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | React + Vite | Fast dev server, clean component model, handles adaptive state well |
| Maths rendering | KaTeX | Lightweight, beautiful, renders instantly |
| Visualisations | p5.js | Perfect for interactive geometry, dice, probability animations |
| Styling | Plain CSS + CSS variables | Full control over vintage aesthetic, no framework fighting us |
| Progress | localStorage | Simple, no server, swappable later |

---

## Core Principle: Engine vs Content

The most important architectural decision. These two things never mix:

- **Engine** (`src/engine/`) — code. Runs the adaptive loop, manages sessions, tracks progress. Never changes when new content is added.
- **Content** (`src/content/`) — data. Case files, problems, hints, sparks. Adding a new grade = adding new files here. Zero engine changes.

---

## Folder Structure

```
mathemagical-bureau/
├── public/
│   └── index.html
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   │
│   ├── engine/                   ← CODE — never touch when adding content
│   │   ├── adaptive.js           ← tracks attempts, classifies errors, picks response
│   │   ├── progress.js           ← all localStorage read/write
│   │   └── session.js            ← orchestrates the 20-min session flow
│   │
│   ├── content/                  ← DATA — add new cases here, no engine changes needed
│   │   ├── index.js              ← registry: lists all cases and their metadata
│   │   ├── cases/
│   │   │   ├── case-01-forgers-code.js
│   │   │   ├── case-02-missing-inheritance.js
│   │   │   ├── case-03-ghost-equation.js
│   │   │   ├── case-04-architects-secret.js
│   │   │   ├── case-05-census-conspiracy.js
│   │   │   └── case-06-probability-heist.js
│   │   └── cold-cases/
│   │       ├── cold-broken-scale.js
│   │       ├── cold-infinite-mirror.js
│   │       ├── cold-forger-returns.js
│   │       └── cold-surveyors-riddle.js
│   │
│   ├── components/               ← UI — React components
│   │   ├── Bureau/               ← home screen: case map / constellation view
│   │   │   ├── Bureau.jsx
│   │   │   └── CaseNode.jsx      ← individual case on the map (locked/available/complete)
│   │   ├── CaseFile/             ← case intro screen (the "file" aesthetic)
│   │   │   └── CaseFile.jsx
│   │   ├── Session/              ← orchestrates Spark → Concept → Practice → Boss
│   │   │   ├── Session.jsx
│   │   │   ├── Spark.jsx
│   │   │   ├── Concept.jsx
│   │   │   └── BossPuzzle.jsx
│   │   ├── Practice/             ← adaptive problem loop
│   │   │   ├── Practice.jsx
│   │   │   ├── Problem.jsx
│   │   │   ├── HintCard.jsx      ← "New evidence from the Bureau"
│   │   │   └── NewEvidence.jsx   ← re-explanation from a different angle
│   │   ├── Visualisations/       ← p5.js sketches, one per topic need
│   │   │   ├── MultiplicationGrid.jsx
│   │   │   ├── FractionBar.jsx
│   │   │   ├── GeometryCanvas.jsx
│   │   │   ├── ProbabilityDice.jsx
│   │   │   ├── BalanceScale.jsx
│   │   │   └── SequenceDots.jsx
│   │   └── ui/                   ← small reusable pieces
│   │       ├── WaxSeal.jsx       ← decorative case stamp
│   │       ├── CaseStamp.jsx     ← CASE CLOSED / OPEN / COLD stamp
│   │       ├── AgentBadge.jsx    ← her rank / codename display
│   │       └── ProgressMap.jsx   ← constellation of cases
│   │
│   └── styles/
│       ├── theme.css             ← palette, fonts, CSS variables
│       ├── bureau.css
│       ├── session.css
│       └── practice.css
│
├── package.json
└── vite.config.js
```

---

## Content Data Model

Every case — main or cold — exports one JavaScript object of this shape.
The engine never knows what topic it's teaching. It just runs the structure.

```js
// content/cases/case-01-forgers-code.js
export default {
  id: 'case-01',
  type: 'main',                  // 'main' | 'cold'
  title: "The Forger's Code",
  topic: 'Multi-digit Multiplication',
  prerequisites: [],             // case ids that must be completed first
  unlocks: ['case-02', 'cold-broken-scale'],
  gradeTag: 'grade-4',

  // ── SPARK ───────────────────────────────────────────────────────────────
  // The 2-minute opening hook. Must produce a "wait... WHAT?" moment.
  spark: {
    type: 'fact',                // 'fact' | 'visual' | 'puzzle'
    content: '...',
    visual: null                 // or name of a Visualisation component
  },

  // ── CONCEPT ─────────────────────────────────────────────────────────────
  // Teaching section. Mix of 'explain' and 'discover' steps.
  concept: [
    {
      type: 'discover',          // 'discover' | 'explain'
      content: '...',
      visual: null               // or Visualisation component name
    }
  ],

  // ── PROBLEMS ────────────────────────────────────────────────────────────
  // The adaptive practice bank. Engine selects and sequences these.
  problems: [
    {
      id: 'p01',
      difficulty: 1,             // 1 (entry) | 2 (solid) | 3 (stretch)
      type: 'calculation',       // 'calculation' | 'word-problem' | 'puzzle' | 'logic'
      question: '...',
      answer: 918,
      answerType: 'numeric',     // 'numeric' | 'multiple-choice' | 'expression'
      hints: [
        'Hint 1 — gentle nudge',
        'Hint 2 — more direct',
        'Hint 3 — nearly the answer'
      ],
      errorPatterns: [
        {
          match: 'off-by-ten',
          feedback: 'Check your column alignment — tens and units need to line up.'
        }
      ]
    }
  ],

  // ── BOSS PUZZLE ─────────────────────────────────────────────────────────
  // The 5-minute closing challenge. Harder. Can be left open.
  bossPuzzle: {
    title: '...',
    question: '...',
    answer: null,                // null = open-ended / no single right answer
    hints: ['...'],
    canLeaveOpen: true           // if true: "This case remains open. Return when ready."
  }
}
```

### Why JavaScript objects, not JSON?

JS objects allow functions — useful for procedurally generated problems
(e.g. "generate a random 3-digit × 2-digit problem with seed X").
JSON cannot contain functions. JS objects give us that option without forcing us to use it.

---

## Adaptive Engine Logic

```
Problem attempted
    ├── Correct, fast       → bump to next difficulty, note strength
    ├── Correct, slow       → stay at difficulty, monitor
    ├── Wrong (attempt 1)   → show HintCard 1, try again
    ├── Wrong (attempt 2)   → show HintCard 2, unlock simpler sub-problem
    └── Wrong (attempt 3)   → "New evidence arrived" — re-explanation from
                              a different angle, then easier version of same problem

Three consecutive wrong answers on same concept type
    └── Session pauses practice, inserts a foundational sub-case
        "The Bureau has a smaller case that might help. Want to take it?"
```

### Language rules — what we never say

| Instead of | We say |
|---|---|
| "Wrong" | "Interesting theory — the cipher doesn't decode correctly." |
| "Try again" | "New evidence just came in that might help." |
| "Incorrect" | "The Bureau's records don't match that answer. Here's a clue." |
| "You failed" | "This case remains open. Return when you're ready." |

Struggle = detective work, not failure. Every wrong turn is information.

---

## Progress Model (localStorage)

```js
{
  agentName: 'chosen at first launch',
  createdAt: '2025-01-01',
  cases: {
    'case-01': {
      status: 'completed',       // 'locked' | 'available' | 'in-progress' | 'completed'
      mastery: 0.85,             // 0.0 – 1.0, computed from problem history
      completedAt: '2025-01-15',
      problemHistory: {
        'p01': { attempts: 1, correct: true,  timeMs: 12400 },
        'p02': { attempts: 3, correct: true,  timeMs: 45200 },
        'p03': { attempts: 2, correct: false, timeMs: 30100 }
      }
    }
  },
  learnerProfile: {
    strengths: ['pattern-recognition', 'word-problems'],
    struggles: ['multi-step-calculation'],
    errorPatterns: {
      'column-alignment': 4,     // seen 4 times — worth noting
      'fraction-simplification': 2
    }
  }
}
```

The learner profile grows across all cases and persists indefinitely.
It informs how new topics are introduced — even in V3, V4 content added later.

---

## Session Flow

```
┌─────────────────────────────────────────────────────┐
│  BUREAU HOME — case constellation map               │
│  (locked cases dimmed, available cases glowing)     │
└──────────────────┬──────────────────────────────────┘
                   │ select a case
                   ▼
┌─────────────────────────────────────────────────────┐
│  CASE FILE — the dossier opens                      │
│  Title, Bureau stamp, case summary, "Begin Mission" │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────┐
│  SESSION (20 min)                                   │
│                                                     │
│  [SPARK]     2 min  — the "wait... WHAT?" hook      │
│  [CONCEPT]   5 min  — explain or discover           │
│  [PRACTICE]  8 min  — adaptive problem loop         │
│  [BOSS]      5 min  — the hard closing puzzle       │
└──────────────────┬──────────────────────────────────┘
                   │ session ends
                   ▼
┌─────────────────────────────────────────────────────┐
│  DEBRIEF — "Case closed" or "Case remains open"     │
│  Rank update, what unlocked, one surprising fact    │
└─────────────────────────────────────────────────────┘
```

---

## Visual Aesthetic

- **Background:** dark aged parchment (`#1e140a` base, warm brown)
- **Text:** warm cream (`#f0e6d3`)
- **Accent — narrative/magic:** gold/amber (`#c9a84c`)
- **Accent — maths/cipher:** teal/cyan (`#4cb8c9`)
- **Fonts:** serif (IM Fell English or Crimson Text) for case narrative; monospace (Courier) for ciphers and code
- **Motifs:** wax seals, compass roses, evidence board layouts, geometric borders
- **Tone:** Lemony Snicket meets a maths textbook that doesn't know it's a maths textbook

---

## Build Order

```
Phase 1 — Shell (get the feeling right)
  Vite + React setup
  Vintage CSS theme
  Bureau home screen with case constellation
  localStorage scaffolding
  Session flow skeleton (empty Spark/Concept/Practice/Boss)

Phase 2 — Case 1 end-to-end (The Forger's Code)
  Full content for Case 1
  Adaptive loop working
  Hint cards and NewEvidence component
  MultiplicationGrid visualisation (p5.js)
  Boss Puzzle
  ← If this feels right, everything else inherits from it

Phase 3 — Cases 2–6
  Each case adds content + its own Visualisation components
  Engine unchanged throughout

Phase 4 — Cold Cases
  Slot in alongside main cases
  Broken Scale unlocks first (after Case 1)

Phase 5 — Adaptive refinement
  Learner profile gets smarter with real usage data
  Error pattern detection
  Cold case suggestions triggered by struggle patterns
```

---

## Guiding Constraints

- Adding a new case must never require touching engine code
- A 20-minute session must always be completable in 20 minutes
- Wrong answers must never feel like punishment
- The Boss Puzzle must occasionally be genuinely hard — it's okay if it stays open
- Every Spark must earn a "wait... WHAT?" before the maths starts
- Grade labels are metadata. The engine knows only prerequisites, not grades.

---

*Agree on this document before writing any code.*
