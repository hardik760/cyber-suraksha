'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const scenarios = [
  {
    id: 'phishing_attack',
    name: 'Phishing Attack',
    icon: '🎣',
    description: 'Employee clicks malicious email link, credentials stolen, lateral movement to email server and database',
    impact: 'High',
    duration: '45 seconds',
  },
  {
    id: 'weak_password',
    name: 'Weak Password Breach',
    icon: '🔓',
    description: 'Brute force attack cracks weak password, attacker gains access to auth system and file server',
    impact: 'Medium',
    duration: '30 seconds',
  },
  {
    id: 'ransomware_attack',
    name: 'Ransomware Attack',
    icon: '🔒',
    description: 'Malware encrypts files across workstation, file server, and cloud storage',
    impact: 'Critical',
    duration: '60 seconds',
  },
  {
    id: 'vendor_breach',
    name: 'Vendor Breach',
    icon: '🏢',
    description: 'Third-party credentials compromised, attacker accesses vendor portal, database, and cloud storage',
    impact: 'High',
    duration: '90 seconds',
  },
];

export default function Scenarios() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleLaunch = async (scenarioId: string) => {
    setLoading(scenarioId);

    try {
      const response = await fetch('/api/run-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario: scenarioId }),
      });

      const result = await response.json();

      // Store simulation in session storage
      sessionStorage.setItem('current_simulation', JSON.stringify(result));

      // Navigate to digital twin
      router.push(`/digital-twin?sim=${result.simulation_id}`);
    } catch (error) {
      console.error('Failed to launch simulation:', error);
      setLoading(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Attack Scenarios</h1>
          <p className="text-textSecondary mt-2">Launch simulations to see how attacks spread</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id}>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{scenario.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-textPrimary">{scenario.name}</h3>
                  <p className="text-sm text-textSecondary mt-2">{scenario.description}</p>
                  <div className="flex gap-4 mt-4">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      scenario.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                      scenario.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {scenario.impact} Impact
                    </span>
                    <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                      {scenario.duration}
                    </span>
                  </div>
                  <Button
                    onClick={() => handleLaunch(scenario.id)}
                    disabled={loading === scenario.id}
                    className="mt-4 w-full"
                  >
                    {loading === scenario.id ? 'Launching...' : 'Launch Simulation'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
