'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Extension() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkUrl = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const response = await fetch('/api/check-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to check URL:', error);
    } finally {
      setLoading(false);
    }
  };

  const testUrls = [
    { label: 'Safe Site (Google)', url: 'https://google.com' },
    { label: 'Phishing Site (Demo)', url: 'http://evil-phishing-site.com' },
    { label: 'Malware Site (Demo)', url: 'http://malware-download.net' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Extension Simulation</h1>
          <p className="text-textSecondary mt-2">Test URL scanning before you visit sites</p>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">URL Scanner</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">
                Enter URL to check
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button onClick={checkUrl} disabled={loading || !url}>
              {loading ? 'Scanning...' : 'Check Website'}
            </Button>

            <div>
              <p className="text-sm font-medium text-textPrimary mb-2">Quick Test URLs</p>
              <div className="flex flex-wrap gap-2">
                {testUrls.map((test) => (
                  <button
                    key={test.url}
                    onClick={() => setUrl(test.url)}
                    className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    {test.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div className={`mt-6 p-6 rounded-lg ${
              result.safe ? 'bg-green-50 border-2 border-green-500' : 'bg-red-50 border-2 border-red-500'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{result.safe ? '✅' : '⛔'}</span>
                <div>
                  <h4 className={`text-xl font-bold ${result.safe ? 'text-green-800' : 'text-red-800'}`}>
                    {result.safe ? 'Safe to Visit' : 'BLOCKED - Dangerous Site'}
                  </h4>
                  <p className={`text-sm ${result.safe ? 'text-green-700' : 'text-red-700'}`}>
                    Risk Score: {result.risk_score}/100
                  </p>
                </div>
              </div>

              {result.threats && result.threats.length > 0 && (
                <div className="mb-4">
                  <p className="font-medium text-red-800 mb-2">Threats Detected:</p>
                  <div className="flex flex-wrap gap-2">
                    {result.threats.map((threat: string) => (
                      <span key={threat} className="px-3 py-1 bg-red-200 text-red-900 rounded-full text-sm">
                        {threat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <p className="font-medium text-textPrimary mb-2">Analysis:</p>
                <ul className="list-disc list-inside space-y-1">
                  {result.reasons.map((reason: string, i: number) => (
                    <li key={i} className="text-sm text-textSecondary">{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
