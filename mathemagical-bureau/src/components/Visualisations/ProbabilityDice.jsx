import { useEffect, useRef, useState } from 'react'
import p5 from 'p5'
import './Visualisation.css'

const BG       = '#1a0f07'
const BG_CARD  = '#2e1a0e'
const GOLD     = [201, 168, 76]
const TEAL     = [76, 184, 201]
const CREAM    = [240, 230, 211]
const CREAM_DIM= [168, 144, 112]
const RED_WAX  = [139, 32, 32]

// Shows the full 6×6 sample space for two dice
// highlightFn: (sum) => bool  — cells to highlight
// Default: highlight sum > 8
export default function ProbabilityDice({ highlightAbove = 8, label = 'sum > 8' }) {
  const containerRef = useRef(null)
  const p5Ref        = useRef(null)
  const revealedRef  = useRef(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => { revealedRef.current = revealed }, [revealed])

  useEffect(() => {
    const sketch = (p) => {
      const CELL  = 52
      const PAD   = 8
      const ML    = 44   // left margin for die1 labels
      const MT    = 44   // top margin for die2 labels
      const W     = ML + 6 * CELL + PAD * 2
      const H     = MT + 6 * CELL + PAD * 2 + 56

      // Count favourable outcomes
      let favourable = 0
      for (let d1 = 1; d1 <= 6; d1++)
        for (let d2 = 1; d2 <= 6; d2++)
          if (d1 + d2 > highlightAbove) favourable++

      function draw() {
        const isRevealed = revealedRef.current
        p.background(BG)
        p.textFont('Georgia, serif')

        // ── Die labels ───────────────────────────────────────────────────
        p.noStroke()
        p.fill(...CREAM_DIM)
        p.textSize(12)
        p.textAlign(p.CENTER, p.CENTER)

        // Die 1 (columns) — top
        p.fill(...GOLD)
        p.textSize(11)
        p.text('Die 1 →', ML - 6, MT - PAD - 22)
        for (let d1 = 1; d1 <= 6; d1++) {
          p.fill(...CREAM_DIM)
          p.textSize(14)
          p.text(d1, ML + PAD + (d1 - 1) * CELL + CELL / 2, MT - PAD - 8)
        }

        // Die 2 (rows) — left
        p.push()
        p.translate(14, MT + PAD + 3 * CELL)
        p.rotate(-p.HALF_PI)
        p.fill(...GOLD)
        p.textSize(11)
        p.textAlign(p.CENTER, p.CENTER)
        p.text('Die 2 ↓', 0, 0)
        p.pop()
        for (let d2 = 1; d2 <= 6; d2++) {
          p.fill(...CREAM_DIM)
          p.textSize(14)
          p.textAlign(p.RIGHT, p.CENTER)
          p.text(d2, ML - 6, MT + PAD + (d2 - 1) * CELL + CELL / 2)
        }

        // ── Grid ─────────────────────────────────────────────────────────
        for (let d1 = 1; d1 <= 6; d1++) {
          for (let d2 = 1; d2 <= 6; d2++) {
            const sum = d1 + d2
            const x   = ML + PAD + (d1 - 1) * CELL
            const y   = MT + PAD + (d2 - 1) * CELL
            const highlight = sum > highlightAbove

            // Cell background
            if (!isRevealed) {
              p.fill(...BG_CARD.match?.(/\w\w/g)?.map(h => parseInt(h, 16)) ?? [46, 26, 14])
              // Use literal color since BG_CARD is a string
              p.fill(46, 26, 14)
            } else if (highlight) {
              p.fill(...GOLD, 55)
            } else {
              p.fill(46, 26, 14)
            }
            p.stroke(...CREAM_DIM, 50)
            p.strokeWeight(0.5)
            p.rect(x, y, CELL - 1, CELL - 1, 3)

            // Sum label
            p.noStroke()
            p.textAlign(p.CENTER, p.CENTER)
            if (isRevealed && highlight) {
              p.fill(...GOLD)
              p.textSize(16)
            } else if (isRevealed) {
              p.fill(...CREAM_DIM)
              p.textSize(14)
            } else {
              p.fill(...CREAM_DIM, 0)  // hidden
              p.textSize(14)
            }
            p.text(sum, x + CELL / 2, y + CELL / 2)
          }
        }

        // ── Bottom stats ─────────────────────────────────────────────────
        if (isRevealed) {
          const botY = MT + PAD + 6 * CELL + 12
          p.noStroke()
          p.textAlign(p.LEFT, p.TOP)

          p.fill(...GOLD)
          p.textSize(14)
          p.text(`Outcomes where ${label}:`, ML, botY)

          p.fill(...CREAM)
          p.textSize(13)
          p.text(`${favourable} out of 36`, ML, botY + 20)

          p.fill(...TEAL)
          p.textSize(13)
          p.text(`Probability = ${favourable}/36`, ML + 180, botY + 20)
        }
      }

      p.setup = () => {
        const cnv = p.createCanvas(W, H)
        cnv.style('border-radius', '8px')
        p.noLoop()
        draw()
      }

      p.draw = () => { draw(); p.noLoop() }
    }

    if (p5Ref.current) p5Ref.current.remove()
    p5Ref.current = new p5(sketch, containerRef.current)

    return () => { if (p5Ref.current) { p5Ref.current.remove(); p5Ref.current = null } }
  }, [highlightAbove, label])

  useEffect(() => {
    revealedRef.current = revealed
    if (p5Ref.current) p5Ref.current.redraw()
  }, [revealed])

  return (
    <div className="viz-wrapper">
      <div ref={containerRef} className="viz-canvas" />
      <div className="viz-controls">
        {!revealed
          ? <button className="viz-btn viz-btn--gold" onClick={() => setRevealed(true)}>
              Reveal all outcomes →
            </button>
          : <button className="viz-btn viz-btn--reset" onClick={() => setRevealed(false)}>
              Hide
            </button>
        }
      </div>
    </div>
  )
}
