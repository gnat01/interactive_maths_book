import './CaseFile.css'

const CLASSIFICATION_COLOUR = {
  ACTIVE: 'gold',
  COLD:   'blue',
  SEALED: 'dim',
  CLOSED: 'teal'
}

export default function CaseFile({ caseData, progress, onBegin, onBack }) {
  const { caseFile, title, subtitle, topic, type } = caseData
  const colourKey = CLASSIFICATION_COLOUR[caseFile.classification] ?? 'dim'

  return (
    <div className="case-file">
      <div className="case-file__paper">

        {/* Bureau header */}
        <div className="case-file__bureau-header">
          <span className="case-file__bureau-name">{caseFile.bureau}</span>
          <span className={`case-file__classification case-file__classification--${colourKey}`}>
            {caseFile.classification}
          </span>
        </div>

        <hr className="divider divider--gold" />

        {/* Case identity */}
        <div className="case-file__identity">
          <p className="case-file__type-label">
            {type === 'cold' ? 'Cold Case' : 'Case File'}
          </p>
          <h1 className="case-file__title">{title}</h1>
          <p className="case-file__subtitle">{subtitle}</p>
          <p className="case-file__topic">{topic}</p>
        </div>

        <hr className="divider" />

        {/* Summary */}
        <div className="case-file__section">
          <h3 className="case-file__section-heading">Bureau Summary</h3>
          <p className="case-file__body">{caseFile.summary}</p>
        </div>

        {caseFile.agentNote && (
          <div className="case-file__agent-note">
            <span className="case-file__note-label">Agent's Note —</span>
            <span className="case-file__body"> {caseFile.agentNote}</span>
          </div>
        )}

        <hr className="divider" />

        {/* Actions */}
        <div className="case-file__actions">
          <button className="case-file__btn case-file__btn--secondary" onClick={onBack}>
            ← Return to Bureau
          </button>
          <button className="case-file__btn case-file__btn--primary" onClick={onBegin}>
            Begin Mission →
          </button>
        </div>

      </div>
    </div>
  )
}
