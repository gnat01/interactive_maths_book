import { useEffect, useRef, useState } from 'react'
import p5 from 'p5'
import './Visualisation.css'

// Palette (matches theme.css)
const BG       = '#1a0f07'
const BG_CARD  = '#2e1a0e'
const GOLD     = [201, 168, 76]
const GOLD_DIM = [122, 101, 48]
const TEAL     = [76, 184, 201]
const CREAM    = [240, 230, 211]
const CREAM_DIM= [168, 144, 112]

export default function MultiplicationGrid({ a = 23, b = 14 }) {
  const containerRef = useRef(null)
  const p5Ref        = useRef(null)
  const phaseRef     = useRef(0)
  const [phase, setPhase] = useState(0)

  // Sync phase into ref so sketch closure can read it
  useEffect(() => { phaseRef.current = phase }, [phase])

  useEffect(() => {
    const tensA  = Math.floor(a / 10) * 10
    const unitsA = a % 10
    const tensB  = Math.floor(b / 10) * 10
    const unitsB = b % 10
    const hasDecomp = tensA > 0 && unitsA > 0 && tensB > 0 && unitsB > 0

    const sketch = (p) => {
      const W  = 460
      const H  = 270
      const ML = 72   // left margin for b labels
      const MT = 52   // top margin for a labels
      const GW = W - ML - 16
      const GH = H - MT - 44

      const splitRatioX = hasDecomp ? tensA / a : 1
      const splitRatioY = hasDecomp ? tensB / b : 1

      const gx = ML
      const gy = MT
      const sx = gx + splitRatioX * GW
      const sy = gy + splitRatioY * GH

      const pp = [tensA * tensB, unitsA * tensB, tensA * unitsB, unitsA * unitsB]
      const total = a * b

      function draw() {
        const ph = phaseRef.current
        p.background(BG)

        // ── Section fills ───────────────────────────────────────────────
        if (ph >= 1 && hasDecomp) {
          p.noStroke()
          p.fill(...GOLD, 38);  p.rect(gx,  gy,  sx-gx,     sy-gy)
          p.fill(...TEAL, 32);  p.rect(sx,  gy,  gx+GW-sx,  sy-gy)
          p.fill(...TEAL, 32);  p.rect(gx,  sy,  sx-gx,     gy+GH-sy)
          p.fill(...GOLD, 22);  p.rect(sx,  sy,  gx+GW-sx,  gy+GH-sy)
        } else if (ph >= 1) {
          p.noStroke()
          p.fill(...GOLD, 38); p.rect(gx, gy, GW, GH)
        }

        // ── Outer border ────────────────────────────────────────────────
        p.noFill()
        p.stroke(...GOLD); p.strokeWeight(2)
        p.rect(gx, gy, GW, GH)

        // ── Split lines ──────────────────────────────────────────────────
        if (ph >= 1 && hasDecomp) {
          p.stroke(...GOLD_DIM); p.strokeWeight(1)
          p.line(sx, gy, sx, gy + GH)
          p.line(gx, sy, gx + GW, sy)
        }

        // ── Partial products ─────────────────────────────────────────────
        if (ph >= 2) {
          p.noStroke()
          p.textAlign(p.CENTER, p.CENTER)
          if (hasDecomp) {
            p.fill(...GOLD);  p.textSize(20); p.text(pp[0], gx+(sx-gx)/2,     gy+(sy-gy)/2)
            p.fill(...TEAL);  p.textSize(16); p.text(pp[1], sx+(gx+GW-sx)/2,  gy+(sy-gy)/2)
            p.fill(...TEAL);  p.textSize(16); p.text(pp[2], gx+(sx-gx)/2,     sy+(gy+GH-sy)/2)
            p.fill(...GOLD);  p.textSize(14); p.text(pp[3], sx+(gx+GW-sx)/2,  sy+(gy+GH-sy)/2)
          } else {
            p.fill(...GOLD); p.textSize(22); p.text(total, gx+GW/2, gy+GH/2)
          }
        }

        // ── Dimension labels ─────────────────────────────────────────────
        p.noStroke()
        // Top: a labels
        p.textAlign(p.CENTER, p.BOTTOM)
        if (ph >= 1 && hasDecomp) {
          p.fill(...GOLD);     p.textSize(15); p.text(tensA,  gx+(sx-gx)/2,    gy-6)
          p.fill(...CREAM_DIM);p.textSize(13); p.text('+',    sx-4,            gy-6)
          p.fill(...TEAL);     p.textSize(15); p.text(unitsA, sx+(gx+GW-sx)/2, gy-6)
          p.fill(...CREAM_DIM);p.textSize(11); p.text('= '+a, gx+GW/2,         gy-22)
        } else {
          p.fill(...CREAM); p.textSize(16); p.text(a, gx+GW/2, gy-8)
        }
        // Left: b labels
        p.textAlign(p.RIGHT, p.CENTER)
        if (ph >= 1 && hasDecomp) {
          p.fill(...GOLD);     p.textSize(15); p.text(tensB,  gx-8, gy+(sy-gy)/2)
          p.fill(...TEAL);     p.textSize(15); p.text(unitsB, gx-8, sy+(gy+GH-sy)/2)
          p.fill(...CREAM_DIM);p.textSize(11); p.text('= '+b, gx-8, gy+GH/2)
        } else {
          p.fill(...CREAM); p.textSize(16); p.text(b, gx-8, gy+GH/2)
        }

        // ── Total ────────────────────────────────────────────────────────
        if (ph >= 3) {
          p.noStroke()
          p.textAlign(p.CENTER, p.TOP)
          if (hasDecomp) {
            p.fill(...CREAM_DIM); p.textSize(12)
            p.text(`${pp[0]} + ${pp[1]} + ${pp[2]} + ${pp[3]} =`, gx+GW/2, gy+GH+6)
            p.fill(...GOLD); p.textSize(20)
            p.text(total, gx+GW/2, gy+GH+22)
          } else {
            p.fill(...GOLD); p.textSize(20)
            p.text(`${a} × ${b} = ${total}`, gx+GW/2, gy+GH+10)
          }
        }
      }

      p.setup = () => {
        const cnv = p.createCanvas(W, H)
        cnv.style('border-radius', '8px')
        p.textFont('Georgia, serif')
        p.noLoop()
        draw()
      }

      p.draw = () => { draw(); p.noLoop() }
    }

    if (p5Ref.current) p5Ref.current.remove()
    p5Ref.current = new p5(sketch, containerRef.current)

    return () => { if (p5Ref.current) { p5Ref.current.remove(); p5Ref.current = null } }
  }, [a, b])

  // Redraw whenever phase changes
  useEffect(() => {
    phaseRef.current = phase
    if (p5Ref.current) p5Ref.current.redraw()
  }, [phase])

  function reset() { setPhase(0) }

  const buttonLabels = ['Show the split →', 'Reveal partial products →', 'Show the total →']

  return (
    <div className="viz-wrapper">
      <div ref={containerRef} className="viz-canvas" />
      <div className="viz-controls">
        {phase < 3
          ? <button className="viz-btn" onClick={() => setPhase(p => p + 1)}>{buttonLabels[phase]}</button>
          : <button className="viz-btn viz-btn--reset" onClick={reset}>Reset</button>
        }
      </div>
    </div>
  )
}
