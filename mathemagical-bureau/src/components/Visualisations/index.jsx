import MultiplicationGrid from './MultiplicationGrid'
import FractionBar        from './FractionBar'
import ProbabilityDice    from './ProbabilityDice'
import SequenceDots       from './SequenceDots'
import BalanceScale       from './BalanceScale'

const REGISTRY = {
  MultiplicationGrid,
  FractionBar,
  ProbabilityDice,
  SequenceDots,
  BalanceScale,
}

// Renders a named visualisation with props from content data
// Usage in content: visual: 'MultiplicationGrid', visualProps: { a: 23, b: 14 }
export default function VisualisationRenderer({ visual, visualProps = {} }) {
  if (!visual) return null
  const Component = REGISTRY[visual]
  if (!Component) {
    console.warn(`VisualisationRenderer: unknown visual "${visual}"`)
    return null
  }
  return <Component {...visualProps} />
}
