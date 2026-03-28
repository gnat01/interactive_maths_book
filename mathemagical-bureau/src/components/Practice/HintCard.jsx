import MathText from '../ui/MathText.jsx'
import './HintCard.css'

export default function HintCard({ hint, number }) {
  return (
    <div className="hint-card">
      <div className="hint-card__header">
        <span className="hint-card__icon">📋</span>
        <span className="hint-card__label">New evidence from the Bureau — clue {number}</span>
      </div>
      <p className="hint-card__text"><MathText text={hint} /></p>
    </div>
  )
}
