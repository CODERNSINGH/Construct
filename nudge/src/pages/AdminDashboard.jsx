import React from 'react'
import { jobs, profiles } from '../data/dummyProfiles'
import { BarChart, Users, Briefcase, TrendingUp, Edit, Trash2 } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '32px' }}>Admin Portal</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                <StatCard icon={Briefcase} label="Total Jobs" value={jobs.length} change="+12% this week" />
                <StatCard icon={Users} label="Active Profiles" value={profiles.length} change="+8% this week" />
                <StatCard icon={TrendingUp} label="Total Applications" value="1,240" change="+24% this week" />
                <StatCard icon={BarChart} label="Revenue" value="₹4.2L" change="+5% this week" />
            </div>

            <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Recent Job Listings</h3>
                    <button style={{ background: 'var(--accent)', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                        + Add New Job
                    </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
                                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Title</th>
                                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Company</th>
                                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Applications</th>
                                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Status</th>
                                <th style={{ padding: '16px 24px', fontWeight: '500' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.slice(0, 8).map(job => (
                                <tr key={job.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '16px 24px', color: 'var(--text)' }}>{job.title}</td>
                                    <td style={{ padding: '16px 24px', color: 'var(--muted)' }}>{job.company}</td>
                                    <td style={{ padding: '16px 24px', color: 'var(--text)' }}>{job.applied}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <span style={{ background: 'rgba(45, 212, 191, 0.1)', color: 'var(--accent)', padding: '4px 10px', borderRadius: '99px', fontSize: '12px' }}>
                                            Active
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><Edit size={16} /></button>
                                            <button style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

function StatCard({ icon: Icon, label, value, change }) {
    return (
        <div style={{ background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ padding: '10px', background: 'var(--surface)', borderRadius: '12px', color: 'var(--accent)' }}>
                    <Icon size={20} />
                </div>
                <span style={{ fontSize: '12px', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '6px' }}>
                    {change}
                </span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: '600', marginBottom: '4px' }}>{value}</div>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{label}</div>
        </div>
    )
}
