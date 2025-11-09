'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';

export default function Dashboard() {
  const [score, setScore] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch dashboard data
    Promise.all([
      fetch('/api/score').then(r => r.json()),
      fetch('/api/activity-summary').then(r => r.json()),
      fetch('/api/alerts').then(r => r.json()),
    ]).then(([scoreData, summaryData, alertsData]) => {
      setScore(scoreData);
      setSummary(summaryData);
      setAlerts(alertsData.alerts.slice(0, 5));
    });
  }, []);

  if (!score || !summary) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Dashboard</h1>
          <p className="text-textSecondary mt-2">Your cybersecurity overview</p>
        </div>

        {/* Cyber Health Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-sm font-medium text-textSecondary">Cyber Health Score</h3>
            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-primary">{score.overall_score}</span>
                <span className="text-2xl text-textSecondary ml-2">/ {score.max_score}</span>
              </div>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  score.grade === 'A' ? 'bg-green-100 text-green-800' :
                  score.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  Grade: {score.grade}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-textSecondary">Breach Probability Index</h3>
            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-danger">{score.bpi}%</span>
              </div>
              <p className="text-sm text-textSecondary mt-2">Likelihood of breach</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-textSecondary">Sites Scanned</h3>
            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-primary">{summary.total_sites_scanned}</span>
              </div>
              <p className="text-sm text-success mt-2">{summary.risky_sites_blocked} blocked</p>
            </div>
          </Card>
        </div>

        {/* Category Scores */}
        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Security Categories</h3>
          <div className="space-y-4">
            {Object.entries(score.categories).map(([key, cat]: [string, any]) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-textPrimary capitalize">
                    {key.replace(/_/g, ' ')}
                  </span>
                  <span className="text-sm text-textSecondary">
                    {cat.score} / {cat.max}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      cat.status === 'excellent' ? 'bg-success' :
                      cat.status === 'good' ? 'bg-blue-500' :
                      'bg-warning'
                    }`}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-textSecondary mt-1">{cat.details}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <span className={`text-2xl ${
                  alert.severity === 'critical' ? '🔴' :
                  alert.severity === 'high' ? '🟠' :
                  alert.severity === 'medium' ? '🟡' : '🟢'
                }`}></span>
                <div className="flex-1">
                  <h4 className="font-medium text-textPrimary">{alert.title}</h4>
                  <p className="text-sm text-textSecondary mt-1">{alert.description}</p>
                  <p className="text-xs text-textSecondary mt-1">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
