import { ALL_CASES } from '../../content/index.js'
import { getCaseStatus } from '../../engine/progress.js'
import { hasGenerator } from '../../engine/generator.js'
import CaseNode   from './CaseNode.jsx'
import AgentBadge from '../ui/AgentBadge.jsx'
import './Bureau.css'

export default function Bureau({ progress, onSelectCase, onDrill }) {
  const mainCases = ALL_CASES.filter(c => c.type === 'main')
  const coldCases = ALL_CASES.filter(c => c.type === 'cold')

  const availableCold = coldCases.filter(c => {
    const s = getCaseStatus(progress, c.id)
    return s === 'available' || s === 'completed' || s === 'in-progress'
  })

  return (
    <div className="bureau">
      <header className="bureau__header">
        <div className="bureau__emblem">✦</div>
        <h1 className="bureau__title">The Mathemagical Bureau</h1>
        <p className="bureau__subtitle font-italic">
          "Mathematics is not a careful march down a well-cleared highway,
          but a journey into a strange wilderness."
        </p>
        <AgentBadge progress={progress} />
      </header>

      <main className="bureau__main">
        <section className="bureau__section">
          <h2 className="bureau__section-title">Active Dossiers</h2>
          <div className="bureau__case-grid">
            {mainCases.map((c, i) => (
              <CaseNode
                key={c.id}
                caseData={c}
                status={getCaseStatus(progress, c.id)}
                number={i + 1}
                onSelect={() => onSelectCase(c.id)}
                onDrill={hasGenerator(c.id) ? () => onDrill(c.id) : null}
              />
            ))}
          </div>
        </section>

        {availableCold.length > 0 && (
          <section className="bureau__section">
            <h2 className="bureau__section-title">Cold Cases
              <span className="bureau__section-note"> — optional, for the bold</span>
            </h2>
            <div className="bureau__case-grid bureau__case-grid--cold">
              {availableCold.map(c => (
                <CaseNode
                  key={c.id}
                  caseData={c}
                  status={getCaseStatus(progress, c.id)}
                  number="❄"
                  onSelect={() => onSelectCase(c.id)}
                  onDrill={hasGenerator(c.id) ? () => onDrill(c.id) : null}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="bureau__footer">
        <span className="text-dim">Est. in the spirit of Martin Gardner</span>
      </footer>
    </div>
  )
}
