import { useEffect, useRef, useState } from 'react'
import p5 from 'p5'
import './Visualisation.css'

const BG        = '#1a0f07'
const GOLD      = [201, 168, 76]
const TEAL      = [76, 184, 201]
const CREAM     = [240, 230, 211]
const CREAM_DIM = [168, 144, 112]
const RED_WAX   = [180, 60, 40]

// Interactive balance scale showing algebraic substitution
// Props:
//   steps — array of { leftItems, rightItems, annotation }
//   Each item: { label, color? } — e.g. { label: '2x', color: 'gold' } or { label: '14', color: 'teal' }
const DEFAULT_STEPS = [
  {
    leftItems:  [{ label: 'x', color: 'gold' }, { label: 'x', color: 'gold' }, { label: '3', color: 'teal' }],
    rightItems: [{ label: '17', color: 'cream' }],
    annotation: '2x + 3 = 17 — balanced'
  },
  {
    leftItems:  [{ label: 'x', color: 'gold' }, { label: 'x', color: 'gold' }],
    rightItems: [{ label: '14', color: 'cream' }],
    annotation: 'Remove 3 from each side → 2x = 14'
  },
  {
    leftItems:  [{ label: 'x', color: 'gold' }],
    rightItems: [{ label: '7', color: 'cream' }],
    annotation: 'Halve each side → x = 7'
  }
]

export default function BalanceScale({ steps = DEFAULT_STEPS }) {
  const containerRef = useRef(null)
  const p5Ref        = useRef(null)
  const stepRef      = useRef(0)
  const [step, setStep] = useState(0)

  useEffect(() => { stepRef.current = step }, [step])

  useEffect(() => {
    const sketch = (p) => {
      const W      = 460
      const H      = 260
      const CX     = W / 2      // pivot x
      const PIVOT_Y = 80        // pivot y
      const ARM    = 160        // half-arm length
      const TILT   = 0         // degrees — always balanced in this viz

      // Pan positions
      const LX = CX - ARM
      const RX = CX + ARM
      const PAN_Y = PIVOT_Y + 70

      const ITEM_W = 42
      const ITEM_H = 28
      const ITEM_G = 4

      function colorFor(c) {
        if (c === 'gold')  return GOLD
        if (c === 'teal')  return TEAL
        if (c === 'red')   return RED_WAX
        return CREAM_DIM
      }

      function drawItems(items, panCX, panY) {
        const totalW = items.length * (ITEM_W + ITEM_G) - ITEM_G
        let x = panCX - totalW / 2
        for (const item of items) {
          const col = colorFor(item.color)
          p.fill(...col, 200)
          p.stroke(...col)
          p.strokeWeight(1)
          p.rect(x, panY - ITEM_H - 4, ITEM_W, ITEM_H, 4)

          p.noStroke()
          p.fill(...CREAM)
          p.textSize(13)
          p.textAlign(p.CENTER, p.CENTER)
          p.text(item.label, x + ITEM_W / 2, panY - ITEM_H / 2 - 4)

          x += ITEM_W + ITEM_G
        }
      }

      function draw() {
        const s = stepRef.current
        const { leftItems, rightItems, annotation } = steps[s]

        p.background(BG)
        p.textFont('Georgia, serif')

        // ── Stand ────────────────────────────────────────────────────────
        p.stroke(...CREAM_DIM)
        p.strokeWeight(3)
        p.line(CX, PIVOT_Y, CX, H - 50)         // vertical post
        p.line(CX - 40, H - 50, CX + 40, H - 50) // base

        // ── Arm ──────────────────────────────────────────────────────────
        p.stroke(...GOLD)
        p.strokeWeight(3)
        p.line(LX, PIVOT_Y, RX, PIVOT_Y)

        // Pivot circle
        p.fill(...GOLD)
        p.noStroke()
        p.ellipse(CX, PIVOT_Y, 10, 10)

        // ── Strings ──────────────────────────────────────────────────────
        p.stroke(...CREAM_DIM, 180)
        p.strokeWeight(1.5)
        p.line(LX, PIVOT_Y, LX, PAN_Y - 4)
        p.line(RX, PIVOT_Y, RX, PAN_Y - 4)

        // ── Pans ─────────────────────────────────────────────────────────
        p.fill(46, 26, 14)
        p.stroke(...CREAM_DIM, 120)
        p.strokeWeight(1)
        p.ellipse(LX, PAN_Y, 90, 14)
        p.ellipse(RX, PAN_Y, 90, 14)

        // ── Items ─────────────────────────────────────────────────────────
        drawItems(leftItems, LX, PAN_Y)
        drawItems(rightItems, RX, PAN_Y)

        // ── "=" sign in the middle ────────────────────────────────────────
        p.noStroke()
        p.fill(...GOLD)
        p.textSize(22)
        p.textAlign(p.CENTER, p.CENTER)
        p.text('=', CX, PAN_Y - ITEM_H / 2 - 4)

        // ── Annotation ───────────────────────────────────────────────────
        p.fill(...CREAM_DIM)
        p.textSize(13)
        p.textAlign(p.CENTER, p.TOP)
        p.text(annotation, W / 2, H - 44)

        // ── Step indicator ────────────────────────────────────────────────
        p.fill(...CREAM_DIM, 120)
        p.textSize(11)
        p.text(`Step ${s + 1} of ${steps.length}`, W / 2, H - 24)
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
  }, [steps])

  useEffect(() => {
    stepRef.current = step
    if (p5Ref.current) p5Ref.current.redraw()
  }, [step])

  return (
    <div className="viz-wrapper">
      <div ref={containerRef} className="viz-canvas" />
      <div className="viz-controls">
        {step < steps.length - 1
          ? <button className="viz-btn" onClick={() => setStep(s => s + 1)}>
              Next step →
            </button>
          : <button className="viz-btn viz-btn--reset" onClick={() => setStep(0)}>Reset</button>
        }
      </div>
    </div>
  )
}
