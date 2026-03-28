import { MathBlock } from '../ui/MathText.jsx'
import './Spark.css'

export default function Spark({ spark, onContinue }) {
  if (!spark?.content) {
    onContinue()
    return null
  }

  return (
    <div className="spark">
      <div className="spark__card">
        <div className="spark__label">Before we begin...</div>
        {spark.heading && <h2 className="spark__heading">{spark.heading}</h2>}
        <p className="spark__content"><MathBlock text={spark.content} /></p>
        {spark.punchline && (
          <p className="spark__punchline"><MathBlock text={spark.punchline} /></p>
        )}
        <button className="spark__btn" onClick={onContinue}>
          I'm ready. Open the case file. →
        </button>
      </div>
    </div>
  )
}
