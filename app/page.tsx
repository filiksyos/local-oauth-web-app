'use client';

import { useState, useEffect } from 'react';
import LoginButton from '@/components/LoginButton';
import Dashboard from '@/components/Dashboard';
import { loadSession, clearSession } from '@/app/lib/auth';
import type { UserSession } from '@/app/lib/types';

export default function Home() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load session from localStorage on mount
    const savedSession = loadSession();
    setSession(savedSession);
    setLoading(false);
  }, []);

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {session ? (
        <Dashboard session={session} onLogout={handleLogout} />
      ) : (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Welcome to <span className="text-primary">Local OAuth</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Revolutionary identity verification using cryptographic signatures.
                <br />
                Your data never leaves your machine.
              </p>
            </div>

            <div className="pt-8">
              <LoginButton onSuccess={handleLoginSuccess} />
            </div>

            <div className="pt-8 text-sm text-muted-foreground space-y-2">
              <p>🔐 ED25519 cryptographic signatures</p>
              <p>🖥️ Local Electron agent (port 5000)</p>
              <p>✅ Native system alerts</p>
              <p>🔒 Private keys stored locally on your desktop</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
