import { useState } from 'react'
import './Onboarding.css'

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState('')
  const [step, setStep] = useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim().length < 1) return
    setStep(1)
  }

  function handleBegin() {
    onComplete(name.trim())
  }

  return (
    <div className="onboarding">
      <div className="onboarding__card">
        <div className="onboarding__emblem">✦</div>

        {step === 0 && (
          <>
            <h1 className="onboarding__title">The Mathemagical Bureau</h1>
            <p className="onboarding__body">
              You have been selected for a position at the Bureau.
              Your work will be classified. Your methods, unconventional.
              Your tool: mathematics.
            </p>
            <p className="onboarding__body">
              Before we proceed — what shall we call you, Agent?
            </p>
            <form onSubmit={handleSubmit} className="onboarding__form">
              <input
                className="onboarding__input"
                type="text"
                placeholder="Enter your codename"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={24}
                autoFocus
              />
              <button
                className="onboarding__button"
                type="submit"
                disabled={name.trim().length < 1}
              >
                That is my name
              </button>
            </form>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="onboarding__title">Welcome, Agent {name}.</h1>
            <p className="onboarding__body">
              Your first dossier is waiting. The Bureau does not believe in
              coincidence, and it does not believe in luck.
            </p>
            <p className="onboarding__body">
              It believes in <em>reasoning</em>.
            </p>
            <p className="onboarding__body">
              Every case you solve will unlock the next. Some cases are cold —
              optional, harder, for when you want a real challenge.
              A Boss Puzzle may remain unsolved. That is permitted.
              Return when ready.
            </p>
            <button className="onboarding__button" onClick={handleBegin}>
              Enter the Bureau
            </button>
          </>
        )}
      </div>
    </div>
  )
}
