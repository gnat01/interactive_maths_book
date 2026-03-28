import katex from 'katex'
import './MathText.css'

/**
 * Renders a string that may contain:
 *   $$...$$ — display (block) math
 *   $...$   — inline math
 *   Everything else — plain text
 *
 * Usage:
 *   <MathText text="Solve $2x + 3 = 11$ for $x$." />
 *   <MathText text="$$P(A) = \frac{10}{36}$$" block />
 */

function parseMathText(text) {
  const parts = []
  // Match $$...$$ before $...$ so display math is caught first
  const regex = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    if (match[1] !== undefined) {
      parts.push({ type: 'block', content: match[1].trim() })
    } else {
      parts.push({ type: 'inline', content: match[2].trim() })
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return parts
}

function renderKatex(latex, displayMode) {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false
    })
  } catch {
    return `<span class="math-error">${latex}</span>`
  }
}

export default function MathText({ text, className }) {
  if (!text) return null

  const parts = parseMathText(String(text))

  return (
    <span className={`math-text ${className ?? ''}`}>
      {parts.map((part, i) => {
        if (part.type === 'text') {
          return <span key={i} className="math-text__plain">{part.content}</span>
        }
        const html = renderKatex(part.content, part.type === 'block')
        return (
          <span
            key={i}
            className={`math-text__math math-text__math--${part.type}`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )
      })}
    </span>
  )
}

/**
 * Convenience: render a full block of text that may contain math.
 * Splits on \n and wraps paragraphs properly.
 */
export function MathBlock({ text, className }) {
  if (!text) return null

  const paragraphs = String(text).split('\n')

  return (
    <span className={`math-block ${className ?? ''}`}>
      {paragraphs.map((line, i) => (
        <span key={i} className="math-block__line">
          <MathText text={line} />
          {i < paragraphs.length - 1 && <br />}
        </span>
      ))}
    </span>
  )
}
