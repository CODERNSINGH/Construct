import React from 'react'

export default function Loader({ steps = [], activeStep = 0 }) {
  return (
    <div className="loader-panel">
      {steps.map((step, idx) => (
        <div
          key={step}
          className={[
            'loader-line',
            idx < activeStep ? 'complete' : '',
            idx === activeStep ? 'active' : ''
          ].join(' ').trim()}
        >
          <span className="loader-dot" aria-hidden="true" />
          <span className="loader-text">{step}</span>
          <span className="loader-status" aria-hidden="true">
            {idx < activeStep ? '✓' : idx === activeStep ? '•••' : ''}
          </span>
        </div>
      ))}
    </div>
  )
}
