import { MathBlock } from '../ui/MathText.jsx'
import VisualisationRenderer from '../Visualisations/index.jsx'
import './Concept.css'

export default function Concept({ steps, currentStep, onNext }) {
  if (!steps || steps.length === 0) {
    onNext()
    return null
  }

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1

  return (
    <div className="concept">
      <div className="concept__card">
        <div className="concept__step-label">
          {step.type === 'discover' ? '🔍 Discover' : '📋 Briefing'} — {currentStep + 1} of {steps.length}
        </div>

        {step.heading && <h2 className="concept__heading">{step.heading}</h2>}

        <p className="concept__content"><MathBlock text={step.content} /></p>

        {step.visual && (
          <VisualisationRenderer visual={step.visual} visualProps={step.visualProps} />
        )}

        <button className="concept__btn" onClick={onNext}>
          {isLast ? 'Start the investigation →' : 'Continue →'}
        </button>
      </div>
    </div>
  )
}
