'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const vendors = [
  { id: 'vendor_aws_hosting', name: 'AWS Hosting', risk: 'low', score: 85 },
  { id: 'vendor_email_service', name: 'Email Service Provider', risk: 'medium', score: 68 },
  { id: 'vendor_payment_gateway', name: 'Payment Gateway', risk: 'low', score: 90 },
  { id: 'vendor_crm_system', name: 'CRM System', risk: 'high', score: 45 },
  { id: 'vendor_analytics', name: 'Analytics Platform', risk: 'low', score: 78 },
];

const breachTypes = [
  { id: 'exposed_credentials', name: 'Exposed Credentials', desc: 'API keys or passwords leaked' },
  { id: 'cve_exploit', name: 'CVE Exploit', desc: 'Unpatched vulnerability' },
  { id: 'insecure_api', name: 'Insecure API', desc: 'API authentication bypass' },
  { id: 'insider_abuse', name: 'Insider Abuse', desc: 'Malicious employee' },
];

export default function Vendors() {
  const router = useRouter();
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [selectedBreachType, setSelectedBreachType] = useState('');
  const [showModal, setShowModal] = useState(false);

  const simulateBreach = async () => {
    if (!selectedVendor || !selectedBreachType) return;

    try {
      const response = await fetch('/api/vendor-breach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vendor_id: selectedVendor.id,
          breach_type: selectedBreachType,
        }),
      });

      const result = await response.json();
      sessionStorage.setItem('current_simulation', JSON.stringify({
        ...result,
        events: [
          { timestamp: 0, node_id: 'vendor_portal', event_type: 'initial_compromise', description: 'Vendor breach detected' },
          { timestamp: 3000, node_id: 'database', event_type: 'lateral_movement', description: 'Accessing internal systems' },
          { timestamp: 6000, node_id: 'cloud_storage', event_type: 'data_exfiltration', description: 'Data accessed' },
        ],
        final_state: {
          infected_nodes: ['vendor_portal', 'database', 'cloud_storage'],
          time_to_complete: 9000,
          score_impact: result.score_impact,
          bpi_change: result.bpi_change,
        },
      }));

      router.push('/digital-twin');
    } catch (error) {
      console.error('Failed to simulate breach:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Vendor Risk Management</h1>
          <p className="text-textSecondary mt-2">Monitor and simulate third-party security risks</p>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Vendor Security Scores</h3>
          <div className="space-y-3">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-textPrimary">{vendor.name}</h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      vendor.risk === 'low' ? 'bg-green-100 text-green-800' :
                      vendor.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vendor.risk.toUpperCase()} RISK
                    </span>
                    <span className="text-sm text-textSecondary">Score: {vendor.score}/100</span>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setSelectedVendor(vendor);
                    setShowModal(true);
                  }}
                  variant="secondary"
                >
                  Simulate Breach
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-textPrimary mb-4">
                Simulate Breach: {selectedVendor?.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-2">
                    Select Breach Type
                  </label>
                  <select
                    value={selectedBreachType}
                    onChange={(e) => setSelectedBreachType(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a breach type...</option>
                    {breachTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name} - {type.desc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={simulateBreach}
                    disabled={!selectedBreachType}
                    className="flex-1"
                  >
                    Launch Simulation
                  </Button>
                  <Button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedVendor(null);
                      setSelectedBreachType('');
                    }}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
