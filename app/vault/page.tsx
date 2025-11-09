'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Vault() {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkPassword = async () => {
    if (!password) return;

    setLoading(true);
    try {
      const response = await fetch('/api/password-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to check password:', error);
    } finally {
      setLoading(false);
    }
  };

  const generatePassword = () => {
    const words = ['Correct', 'Horse', 'Battery', 'Staple', 'Mountain', 'River', 'Forest', 'Ocean'];
    const randomWords = Array.from({ length: 4 }, () => words[Math.floor(Math.random() * words.length)]);
    const generated = randomWords.join('-') + '-' + Math.floor(Math.random() * 100);
    setPassword(generated);
    checkPassword();
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'very_strong': return 'bg-green-500';
      case 'strong': return 'bg-blue-500';
      case 'moderate': return 'bg-yellow-500';
      case 'weak': return 'bg-orange-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Password Vault</h1>
          <p className="text-textSecondary mt-2">Test and strengthen your passwords</p>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Password Strength Checker</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textPrimary mb-2">
                Enter Password
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password here..."
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={checkPassword} disabled={loading || !password}>
                {loading ? 'Checking...' : 'Check Strength'}
              </Button>
              <Button onClick={generatePassword} variant="secondary">
                Generate Strong Password
              </Button>
            </div>
          </div>

          {result && (
            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Strength</span>
                  <span className="text-sm font-medium capitalize">{result.strength.replace('_', ' ')}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getStrengthColor(result.strength)}`}
                    style={{ width: `${Math.min(100, (result.entropy_bits / 80) * 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-textSecondary">Entropy</p>
                  <p className="text-lg font-semibold">{result.entropy_bits} bits</p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">Length</p>
                  <p className="text-lg font-semibold">{result.length} characters</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-textPrimary mb-2">Character Sets Used</p>
                <div className="flex gap-2">
                  {result.character_sets_used.lowercase && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Lowercase</span>
                  )}
                  {result.character_sets_used.uppercase && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Uppercase</span>
                  )}
                  {result.character_sets_used.digits && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Numbers</span>
                  )}
                  {result.character_sets_used.special && (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Special</span>
                  )}
                </div>
              </div>

              {result.issues.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-danger mb-2">Issues Found</p>
                  <ul className="list-disc list-inside space-y-1">
                    {result.issues.map((issue: string, i: number) => (
                      <li key={i} className="text-sm text-textSecondary">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-textPrimary mb-2">Suggestions</p>
                <ul className="list-disc list-inside space-y-1">
                  {result.suggestions.map((suggestion: string, i: number) => (
                    <li key={i} className="text-sm text-textSecondary">{suggestion}</li>
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
