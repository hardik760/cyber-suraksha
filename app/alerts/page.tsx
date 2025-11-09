'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';

export default function Alerts() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/api/alerts')
      .then(r => r.json())
      .then(data => setAlerts(data.alerts));
  }, []);

  const filteredAlerts = filter === 'all'
    ? alerts
    : alerts.filter(a => a.severity === filter);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Security Alerts</h1>
          <p className="text-textSecondary mt-2">Monitor and respond to security events</p>
        </div>

        <div className="flex gap-2">
          {['all', 'critical', 'high', 'medium', 'low'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === f
                  ? 'bg-primary text-white'
                  : 'bg-white text-textPrimary border border-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold mb-4">Alerts</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAlert?.id === alert.id
                      ? 'border-primary bg-blue-50'
                      : 'border-border hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`text-xl ${
                      alert.severity === 'critical' ? '🔴' :
                      alert.severity === 'high' ? '🟠' :
                      alert.severity === 'medium' ? '🟡' : '🟢'
                    }`}></span>
                    <div>
                      <h4 className="font-medium text-textPrimary">{alert.title}</h4>
                      <p className="text-xs text-textSecondary mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            {selectedAlert ? (
              <div>
                <h3 className="text-lg font-semibold mb-4">Alert Details</h3>
                <div className="space-y-4">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      selectedAlert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      selectedAlert.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      selectedAlert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedAlert.severity}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-textPrimary">{selectedAlert.title}</h4>
                    <p className="text-sm text-textSecondary mt-2">{selectedAlert.description}</p>
                  </div>
                  <div>
                    <p className="text-sm text-textSecondary">
                      <strong>Time:</strong> {new Date(selectedAlert.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm text-textSecondary mt-1">
                      <strong>Category:</strong> {selectedAlert.category}
                    </p>
                    <p className="text-sm text-textSecondary mt-1">
                      <strong>Status:</strong> {selectedAlert.status}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-textSecondary py-12">
                Select an alert to view details
              </div>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
