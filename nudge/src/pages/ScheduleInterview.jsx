import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, CheckCircle } from 'lucide-react'

export default function ScheduleInterview() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

    const handleConfirm = () => {
        setStep(2)
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
                {step === 1 ? (
                    <>
                        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Schedule Interview</h1>
                        <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Select a time slot for {id}</p>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Select Date</label>
                            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {['Mon, 12', 'Tue, 13', 'Wed, 14', 'Thu, 15', 'Fri, 16'].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDate(d)}
                                        style={{
                                            padding: '12px 20px',
                                            borderRadius: '12px',
                                            border: date === d ? '1px solid var(--accent)' : '1px solid var(--border)',
                                            background: date === d ? 'var(--accent-glow)' : 'var(--surface)',
                                            color: date === d ? 'var(--accent)' : 'var(--text)',
                                            cursor: 'pointer',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--muted)' }}>Select Time</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                {['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTime(t)}
                                        style={{
                                            padding: '12px',
                                            borderRadius: '12px',
                                            border: time === t ? '1px solid var(--accent)' : '1px solid var(--border)',
                                            background: time === t ? 'var(--accent-glow)' : 'var(--surface)',
                                            color: time === t ? 'var(--accent)' : 'var(--text)',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={!date || !time}
                            onClick={handleConfirm}
                            style={{
                                width: '100%',
                                padding: '16px',
                                borderRadius: '16px',
                                border: 'none',
                                background: (!date || !time) ? 'var(--surface)' : 'var(--accent)',
                                color: (!date || !time) ? 'var(--muted)' : '#000',
                                fontWeight: '600',
                                cursor: (!date || !time) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            Confirm Schedule
                        </button>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div style={{ marginBottom: '24px', color: 'var(--accent)' }}>
                            <CheckCircle size={64} />
                        </div>
                        <h2 style={{ marginBottom: '12px' }}>Interview Scheduled!</h2>
                        <p style={{ color: 'var(--muted)' }}>
                            We have sent a calendar invite for<br />
                            <strong style={{ color: 'var(--text)' }}>{date} at {time}</strong>
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '24px' }}>Redirecting to home...</p>
                    </div>
                )}
            </div>
        </div>
    )
}
