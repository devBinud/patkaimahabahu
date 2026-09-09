import { useState } from 'react';
import {
  FaHeartPulse,
  FaBookOpen,
  FaTree,
  FaHandsHoldingChild,
  FaKitMedical,
  FaCheck,
  FaPenToSquare
} from 'react-icons/fa6';
import './AdminPages.css';

const INITIAL_PROGRAMS = [
  {
    id: 1,
    title: 'Disaster & Flood Emergency Relief',
    category: 'Relief Operation',
    status: 'Active',
    lead: 'Ground Relief Wing',
    impact: '15,000+ Ration & Medical Kits distributed',
    description: 'Providing immediate food supply, clean drinking water, and dry rations to flood-affected families across Assam.'
  },
  {
    id: 2,
    title: 'Rural Healthcare & Free Medical Camps',
    category: 'Healthcare',
    status: 'Active',
    lead: 'Medical Volunteers Team',
    impact: '4,200+ Patients treated with free medicines',
    description: 'Mobile healthcare clinics providing free consultations, blood tests, eye screenings, and essential medicines in underserved regions.'
  },
  {
    id: 3,
    title: 'Bright Horizons Educational Aid',
    category: 'Education',
    status: 'Active',
    lead: 'Youth Education Council',
    impact: '850+ Students sponsored with stationery & books',
    description: 'Support for underprivileged rural students with learning materials, scholarship stipends, and school infrastructure support.'
  },
  {
    id: 4,
    title: 'Green Assam Ecological Drive',
    category: 'Environment',
    status: 'Active',
    lead: 'Environmental Wing',
    impact: '25,000+ Saplings planted along river banks',
    description: 'Afforestation and soil conservation initiatives across vulnerable riverine zones and community forestry plots.'
  }
];

export default function ProgramsManager() {
  const [programs, setPrograms] = useState(() => {
    try {
      const stored = localStorage.getItem('pmf_programs');
      return stored ? JSON.parse(stored) : INITIAL_PROGRAMS;
    } catch {
      return INITIAL_PROGRAMS;
    }
  });

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Foundation Programs & Initiatives</h1>
          <p>Supervise ongoing community impact missions, field deployments, and charitable projects.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {programs.map((prog) => (
          <div key={prog.id} className="admin-card">
            <div className="admin-card-header">
              <div>
                <span className="admin-badge admin-badge-emerald" style={{ marginBottom: '6px' }}>
                  {prog.category}
                </span>
                <h3 className="admin-card-title">{prog.title}</h3>
              </div>
            </div>

            <div className="admin-card-body">
              <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                {prog.description}
              </p>

              <div style={{ background: 'rgba(2, 6, 23, 0.6)', padding: '12px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ color: '#64748b' }}>Project Lead:</span>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{prog.lead}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <span style={{ color: '#64748b' }}>Reported Impact:</span>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>{prog.impact}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
