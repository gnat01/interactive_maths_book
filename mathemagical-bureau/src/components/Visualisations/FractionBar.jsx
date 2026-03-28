import { useEffect, useRef, useState } from 'react'
import p5 from 'p5'
import './Visualisation.css'

const BG       = '#1a0f07'
const GOLD     = [201, 168, 76]
const TEAL     = [76, 184, 201]
const CREAM    = [240, 230, 211]
const CREAM_DIM= [168, 144, 112]
const BG_RAISED= [46, 26, 14]

// Show a sequence of equivalent fractions as stacked bars
// Props: fractions — array of {n, d} e.g. [{n:1,d:2},{n:2,d:4},{n:4,d:8}]
export default function FractionBar({ fractions = [{ n: 1, d: 2 }, { n: 2, d: 4 }, { n: 4, d: 8 }] }) {
  const containerRef = useRef(null)
  const p5Ref        = useRef(null)
  const shownRef     = useRef(1)
  const [shown, setShown] = useState(1)

  useEffect(() => { shownRef.current = shown }, [shown])

  useEffect(() => {
    const sketch = (p) => {
      const W       = 460
      const BAR_H   = 36
      const BAR_GAP = 22
      const ML      = 60   // left margin for fraction label
      const MR      = 16
      const MT      = 24
      const BAR_W   = W - ML - MR
      const totalH  = MT + fractions.length * (BAR_H + BAR_GAP) + 10

      function draw() {
        const count = shownRef.current
        p.background(BG)
        p.textFont('Georgia, serif')

        for (let i = 0; i < count; i++) {
          const { n, d } = fractions[i]
          const y = MT + i * (BAR_H + BAR_GAP)

          // Fraction label on left
          p.noStroke()
          p.fill(...GOLD)
          p.textSize(17)
          p.textAlign(p.RIGHT, p.CENTER)
          p.text(`${n}/${d}`, ML - 10, y + BAR_H / 2)

          // Background bar
          p.fill(...BG_RAISED)
          p.stroke(...GOLD, 80)
          p.strokeWeight(1)
          p.rect(ML, y, BAR_W, BAR_H, 4)

          // Division lines (d parts)
          const partW = BAR_W / d
          for (let j = 1; j < d; j++) {
            p.stroke(...CREAM_DIM, 80)
            p.strokeWeight(0.5)
            p.line(ML + j * partW, y, ML + j * partW, y + BAR_H)
          }

          // Filled parts (n parts)
          p.noStroke()
          p.fill(...TEAL, 200)
          p.rect(ML, y, n * partW, BAR_H, 4, 0, 0, 4)

          // Part count label inside filled region
          if (n * partW > 30) {
            p.fill(...CREAM)
            p.textSize(13)
            p.textAlign(p.CENTER, p.CENTER)
            p.text(`${n} of ${d}`, ML + (n * partW) / 2, y + BAR_H / 2)
          }

          // "Equal area" annotation for rows after first
          if (i > 0) {
            const filled0 = fractions[0].n / fractions[0].d * BAR_W
            const filledI = n / d * BAR_W
            if (Math.abs(filled0 - filledI) < 1) {
              p.noStroke()
              p.fill(...GOLD, 160)
              p.textSize(11)
              p.textAlign(p.LEFT, p.CENTER)
              p.text('same →', ML + n * partW + 6, y + BAR_H / 2)
            }
          }
        }

        // "They are all equal" label once all shown
        if (count === fractions.length) {
          p.noStroke()
          p.fill(...GOLD)
          p.textSize(14)
          p.textAlign(p.CENTER, p.TOP)
          const bottomY = MT + count * (BAR_H + BAR_GAP)
          p.text('All the same amount — just written differently.', W / 2, bottomY - 8)
        }
      }

      p.setup = () => {
        const cnv = p.createCanvas(W, totalH)
        cnv.style('border-radius', '8px')
        p.noLoop()
        draw()
      }

      p.draw = () => { draw(); p.noLoop() }
    }

    if (p5Ref.current) p5Ref.current.remove()
    p5Ref.current = new p5(sketch, containerRef.current)

    return () => { if (p5Ref.current) { p5Ref.current.remove(); p5Ref.current = null } }
  }, [fractions])

  useEffect(() => {
    shownRef.current = shown
    if (p5Ref.current) p5Ref.current.redraw()
  }, [shown])

  return (
    <div className="viz-wrapper">
      <div ref={containerRef} className="viz-canvas" />
      <div className="viz-controls">
        {shown < fractions.length
          ? <button className="viz-btn" onClick={() => setShown(s => s + 1)}>
              Show {fractions[shown].n}/{fractions[shown].d} →
            </button>
          : <button className="viz-btn viz-btn--reset" onClick={() => setShown(1)}>Reset</button>
        }
      </div>
    </div>
  )
}
