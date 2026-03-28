import { useEffect, useRef, useState } from 'react'
import p5 from 'p5'
import './Visualisation.css'

const BG      = '#1a0f07'
const GOLD    = [201, 168, 76]
const TEAL    = [76, 184, 201]
const CREAM   = [240, 230, 211]
const CREAM_DIM = [168, 144, 112]

// Visualise triangular numbers as dot triangles
// Props: maxN — how many triangular numbers to show (default 6)
export default function SequenceDots({ maxN = 6 }) {
  const containerRef = useRef(null)
  const p5Ref        = useRef(null)
  const shownRef     = useRef(1)
  const [shown, setShown] = useState(1)

  useEffect(() => { shownRef.current = shown }, [shown])

  useEffect(() => {
    const sketch = (p) => {
      const DOT_R  = 7     // dot radius
      const DOT_G  = 5     // gap between dots
      const STEP   = DOT_R * 2 + DOT_G
      const PAD    = 28
      const LABEL_H = 32
      const COL_W  = maxN * STEP + PAD * 2

      const W = maxN * COL_W
      const H = maxN * STEP + PAD * 2 + LABEL_H + 30

      function triangularN(n) { return (n * (n + 1)) / 2 }

      function drawTriangle(p, n, colX, colW) {
        // Draw n rows: row 1 has 1 dot, row 2 has 2, ..., row n has n dots
        // Centre the triangle in the column
        const maxW = n * STEP
        const startX = colX + (colW - maxW) / 2 + DOT_R
        const startY = PAD

        for (let row = 1; row <= n; row++) {
          const rowW = row * STEP
          const rowX = colX + (colW - rowW) / 2 + DOT_R
          for (let col = 0; col < row; col++) {
            const x = rowX + col * STEP
            const y = startY + (row - 1) * STEP
            p.fill(...TEAL)
            p.noStroke()
            p.ellipse(x, y, DOT_R * 2, DOT_R * 2)
          }
        }

        // Label below triangle
        const labelY = startY + n * STEP + 10
        const tn = triangularN(n)

        p.noStroke()
        p.textAlign(p.CENTER, p.TOP)
        p.fill(...GOLD)
        p.textSize(15)
        p.text(`T${n} = ${tn}`, colX + colW / 2, labelY)

        // Formula hint for last shown
        if (n === shownRef.current) {
          p.fill(...CREAM_DIM)
          p.textSize(11)
          p.text(`${n}×${n + 1}÷2`, colX + colW / 2, labelY + 18)
        }
      }

      function draw() {
        const count = shownRef.current
        p.background(BG)
        p.textFont('Georgia, serif')

        for (let i = 1; i <= count; i++) {
          drawTriangle(p, i, (i - 1) * COL_W, COL_W)
        }

        // Differences annotation — show +2, +3 etc between columns
        if (count >= 2) {
          for (let i = 2; i <= count; i++) {
            const x1 = (i - 2) * COL_W + COL_W / 2
            const x2 = (i - 1) * COL_W + COL_W / 2
            const midX = (x1 + x2) / 2
            const tn1 = triangularN(i - 1)
            const tn2 = triangularN(i)
            const diff = tn2 - tn1

            p.noStroke()
            p.fill(...CREAM_DIM)
            p.textSize(11)
            p.textAlign(p.CENTER, p.TOP)
            const labelY = PAD + count * STEP + 8 + LABEL_H
            p.fill(...GOLD, 160)
            p.text(`+${diff}`, midX, labelY - 14)
          }

          // Pattern note
          if (count >= 3) {
            p.fill(...CREAM_DIM)
            p.textSize(11)
            p.textAlign(p.CENTER, p.TOP)
            const noteY = PAD + count * STEP + 8 + LABEL_H
            p.text('(differences: +2, +3, +4... not constant!)', W / 2, noteY + 4)
          }
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
  }, [maxN])

  useEffect(() => {
    shownRef.current = shown
    if (p5Ref.current) p5Ref.current.redraw()
  }, [shown])

  const tn = (n) => (n * (n + 1)) / 2

  return (
    <div className="viz-wrapper">
      <div ref={containerRef} className="viz-canvas" />
      <div className="viz-controls">
        {shown < maxN
          ? <button className="viz-btn" onClick={() => setShown(s => s + 1)}>
              Show T{shown + 1} = {tn(shown + 1)} →
            </button>
          : <button className="viz-btn viz-btn--reset" onClick={() => setShown(1)}>Reset</button>
        }
      </div>
    </div>
  )
}
