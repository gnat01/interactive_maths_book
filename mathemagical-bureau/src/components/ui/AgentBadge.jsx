import './AgentBadge.css'

function computeRank(progress) {
  const cases = Object.values(progress.cases)
  const completed = cases.filter(c => c.status === 'completed').length

  if (completed === 0)  return 'Trainee'
  if (completed <= 2)   return 'Junior Agent'
  if (completed <= 4)   return 'Agent'
  if (completed <= 6)   return 'Senior Agent'
  return 'Master Cryptographer'
}

export default function AgentBadge({ progress }) {
  if (!progress.agentName) return null

  const rank = computeRank(progress)
  const completed = Object.values(progress.cases).filter(c => c.status === 'completed').length

  return (
    <div className="agent-badge">
      <span className="agent-badge__rank">{rank}</span>
      <span className="agent-badge__name">{progress.agentName}</span>
      {completed > 0 && (
        <span className="agent-badge__cases">
          {completed} case{completed !== 1 ? 's' : ''} closed
        </span>
      )}
    </div>
  )
}
