import './CaseNode.css'

const STATUS_LABEL = {
  locked:        'SEALED',
  available:     'OPEN',
  'in-progress': 'ACTIVE',
  completed:     'CLOSED'
}

const TYPE_LABEL = {
  main: 'Case File',
  cold: 'Cold Case'
}

export default function CaseNode({ caseData, status, number, onSelect, onDrill }) {
  const isLocked = status === 'locked'
  const isSealed = isLocked && caseData.caseFile?.classification === 'SEALED'

  return (
    <div className={`case-node case-node--${status} ${isLocked ? 'case-node--locked' : ''}`}>
      {/* Main card body — entire upper area is clickable */}
      <div
        className="case-node__body"
        role={!isLocked ? 'button' : undefined}
        tabIndex={!isLocked ? 0 : undefined}
        onClick={!isLocked ? onSelect : undefined}
        onKeyDown={!isLocked ? (e => (e.key === 'Enter' || e.key === ' ') && onSelect()) : undefined}
        aria-label={isLocked ? `Case sealed: ${caseData.title}` : `Open case: ${caseData.title}`}
      >
        <div className="case-node__header">
          <span className="case-node__type">{TYPE_LABEL[caseData.type] ?? 'Case'}</span>
          <span className={`case-node__status case-node__status--${status}`}>
            {STATUS_LABEL[status] ?? status.toUpperCase()}
          </span>
        </div>

        <div className="case-node__number">{number}</div>

        <h3 className="case-node__title">
          {isLocked && isSealed ? '— CLASSIFIED —' : caseData.title}
        </h3>

        {!isLocked && <p className="case-node__subtitle">{caseData.subtitle}</p>}
        {!isLocked && <p className="case-node__topic">{caseData.topic}</p>}

        {status === 'completed' && (
          <div className="case-node__closed-stamp">CLOSED</div>
        )}
      </div>

      {/* Drill button — only when not locked and generator exists */}
      {!isLocked && onDrill && (
        <button className="case-node__drill-btn" onClick={onDrill}>
          Drill ⟳
        </button>
      )}
    </div>
  )
}
