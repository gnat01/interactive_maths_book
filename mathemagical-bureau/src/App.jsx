import { useState, useEffect } from 'react'
import { loadProgress, saveProgress, unlockCases } from './engine/progress.js'
import { CASE_MAP, INITIAL_UNLOCKED } from './content/index.js'
import Bureau    from './components/Bureau/Bureau.jsx'
import CaseFile  from './components/CaseFile/CaseFile.jsx'
import Session   from './components/Session/Session.jsx'
import Onboarding from './components/ui/Onboarding.jsx'
import Drill     from './components/Drill/Drill.jsx'

const VIEW = {
  ONBOARDING: 'onboarding',
  BUREAU:     'bureau',
  CASE_FILE:  'case-file',
  SESSION:    'session',
  DRILL:      'drill',
}

export default function App() {
  const [progress,    setProgress]    = useState(null)
  const [view,        setView]        = useState(VIEW.BUREAU)
  const [activeCase,  setActiveCase]  = useState(null)
  const [drillCaseId, setDrillCaseId] = useState(null)

  useEffect(() => {
    let p = loadProgress()
    if (Object.keys(p.cases).length === 0) p = unlockCases(p, INITIAL_UNLOCKED)
    if (!p.agentName) setView(VIEW.ONBOARDING)
    setProgress(p)
    saveProgress(p)
  }, [])

  function handleOnboardingComplete(agentName) {
    const updated = { ...progress, agentName }
    setProgress(updated)
    saveProgress(updated)
    setView(VIEW.BUREAU)
  }

  function handleSelectCase(caseId) {
    setActiveCase(CASE_MAP[caseId])
    setView(VIEW.CASE_FILE)
  }

  function handleDrill(caseId) {
    setDrillCaseId(caseId)
    setView(VIEW.DRILL)
  }

  function handleBeginSession() {
    setView(VIEW.SESSION)
  }

  function handleSessionComplete(updatedProgress) {
    setProgress(updatedProgress)
    saveProgress(updatedProgress)
    setView(VIEW.BUREAU)
    setActiveCase(null)
  }

  function handleBackToBureau() {
    setView(VIEW.BUREAU)
    setActiveCase(null)
    setDrillCaseId(null)
  }

  if (!progress) return null

  return (
    <>
      {view === VIEW.ONBOARDING && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      {view === VIEW.BUREAU && (
        <Bureau
          progress={progress}
          onSelectCase={handleSelectCase}
          onDrill={handleDrill}
        />
      )}
      {view === VIEW.CASE_FILE && activeCase && (
        <CaseFile
          caseData={activeCase}
          progress={progress}
          onBegin={handleBeginSession}
          onBack={handleBackToBureau}
        />
      )}
      {view === VIEW.SESSION && activeCase && (
        <Session
          caseData={activeCase}
          progress={progress}
          onComplete={handleSessionComplete}
          onBack={handleBackToBureau}
        />
      )}
      {view === VIEW.DRILL && drillCaseId && (
        <Drill
          caseId={drillCaseId}
          caseTitle={CASE_MAP[drillCaseId]?.title ?? drillCaseId}
          onExit={handleBackToBureau}
        />
      )}
    </>
  )
}
