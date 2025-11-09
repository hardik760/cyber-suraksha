'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/scenarios', label: 'Attack Scenarios', icon: '⚔️' },
  { href: '/digital-twin', label: 'Digital Twin', icon: '🌐' },
  { href: '/alerts', label: 'Alerts', icon: '🚨' },
  { href: '/vault', label: 'Password Vault', icon: '🔐' },
  { href: '/authenticator', label: 'Authenticator', icon: '📱' },
  { href: '/vendors', label: 'Vendors', icon: '🏢' },
  { href: '/extension', label: 'Extension Sim', icon: '🔌' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-border h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">🛡️ Cyber-Suraksha</h1>
        <p className="text-sm text-textSecondary mt-1">OPS</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-textPrimary hover:bg-gray-100'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-textSecondary">
          <p>User: Demo User</p>
          <p className="mt-1">demo@cyber-suraksha.test</p>
        </div>
      </div>
    </aside>
  );
}
