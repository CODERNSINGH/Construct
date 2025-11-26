import React, { useState } from 'react'
import '../index.css'
import { Check } from 'lucide-react'

const plans = [
    {
        name: 'Free',
        price: '₹0',
        features: ['5 Job Applications/mo', 'Basic Profile', 'Community Support'],
        cta: 'Current Plan',
        active: true
    },
    {
        name: 'Pro',
        price: '₹499',
        period: '/mo',
        features: ['Unlimited Applications', 'AI Resume Review', 'Priority Support', 'Verified Badge'],
        cta: 'Upgrade to Pro',
        highlight: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        features: ['Bulk Hiring', 'API Access', 'Dedicated Account Manager', 'Custom Branding'],
        cta: 'Contact Sales'
    }
]

export default function Pricing() {
    const [showModal, setShowModal] = useState(false)

    const handleBuy = (plan) => {
        if (plan.name !== 'Free') {
            setShowModal(true)
        }
    }

    return (
        <div className="pricing-page" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>Simple, transparent pricing</h1>
                <p style={{ color: 'var(--muted)' }}>Choose the plan that fits your career goals.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {plans.map(plan => (
                    <div
                        key={plan.name}
                        style={{
                            background: 'var(--panel)',
                            border: plan.highlight ? '1px solid var(--accent)' : '1px solid var(--border)',
                            borderRadius: '24px',
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative'
                        }}
                    >
                        {plan.highlight && (
                            <span style={{
                                position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                                background: 'var(--accent)', color: '#000', padding: '4px 12px', borderRadius: '12px',
                                fontSize: '12px', fontWeight: '600'
                            }}>
                                Most Popular
                            </span>
                        )}
                        <h3 style={{ margin: '0 0 8px 0' }}>{plan.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
                            <span style={{ fontSize: '32px', fontWeight: '600' }}>{plan.price}</span>
                            {plan.period && <span style={{ color: 'var(--muted)' }}>{plan.period}</span>}
                        </div>

                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {plan.features.map(feat => (
                                <li key={feat} style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    <Check size={16} color="var(--accent)" />
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleBuy(plan)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '12px',
                                background: plan.highlight ? 'var(--accent)' : 'var(--surface)',
                                color: plan.highlight ? '#000' : 'var(--text)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                border: plan.highlight ? 'none' : '1px solid var(--border)'
                            }}
                        >
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 100
                }}>
                    <div style={{
                        background: 'var(--panel)', padding: '40px', borderRadius: '24px',
                        border: '1px solid var(--border)', textAlign: 'center', maxWidth: '400px'
                    }}>
                        <div style={{ width: '64px', height: '64px', background: 'var(--accent-glow)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
                            <Check size={32} color="var(--accent)" />
                        </div>
                        <h2>Purchase Successful!</h2>
                        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Your account has been upgraded. Enjoy the new features.</p>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                padding: '10px 24px', borderRadius: '12px', border: 'none',
                                background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
