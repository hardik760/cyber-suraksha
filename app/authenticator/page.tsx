'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Authenticator() {
  const [otpCodes, setOtpCodes] = useState<string[]>([]);
  const [approvalRequests, setApprovalRequests] = useState([
    { id: 1, app: 'Email Login', location: 'San Francisco, CA', time: new Date().toLocaleString() },
    { id: 2, app: 'Cloud Storage', location: 'New York, NY', time: new Date().toLocaleString() },
  ]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  useEffect(() => {
    // Generate initial OTP codes
    setOtpCodes([
      generateOTP(),
      generateOTP(),
      generateOTP(),
    ]);

    // Regenerate OTP codes every 30 seconds
    const interval = setInterval(() => {
      setOtpCodes([
        generateOTP(),
        generateOTP(),
        generateOTP(),
      ]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleApprove = (id: number) => {
    setApprovalRequests(approvalRequests.filter(r => r.id !== id));
    // Would create a success alert in production
  };

  const handleDeny = (id: number) => {
    setApprovalRequests(approvalRequests.filter(r => r.id !== id));
    // Would create a high-severity alert in production
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary">Authenticator</h1>
          <p className="text-textSecondary mt-2">Two-factor authentication management</p>
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Approval Requests</h3>
          {approvalRequests.length > 0 ? (
            <div className="space-y-4">
              {approvalRequests.map((request) => (
                <div key={request.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-textPrimary">{request.app}</h4>
                      <p className="text-sm text-textSecondary mt-1">📍 {request.location}</p>
                      <p className="text-xs text-textSecondary mt-1">{request.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => handleApprove(request.id)} variant="primary" className="!px-4 !py-2">
                        ✅ Approve
                      </Button>
                      <Button onClick={() => handleDeny(request.id)} variant="danger" className="!px-4 !py-2">
                        ❌ Deny
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-textSecondary py-8">No pending approval requests</p>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">OTP Codes</h3>
          <p className="text-sm text-textSecondary mb-4">Use these codes for 2FA verification</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otpCodes.map((code, index) => (
              <div key={index} className="p-6 bg-blue-50 border-2 border-primary rounded-lg text-center">
                <p className="text-xs text-textSecondary mb-2">Account {index + 1}</p>
                <p className="text-3xl font-mono font-bold text-primary">{code}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-textSecondary mt-4 text-center">
            Codes regenerate every 30 seconds
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Recovery Codes</h3>
          <p className="text-sm text-textSecondary mb-4">Save these backup codes in a secure location</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="p-3 bg-gray-100 rounded-lg text-center">
                <p className="text-sm font-mono">{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
