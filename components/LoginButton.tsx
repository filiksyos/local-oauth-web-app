'use client';

import { useState } from 'react';
import { verifySignature } from '@/app/lib/crypto';
import { saveSession } from '@/app/lib/auth';
import type { OAuthResponse, UserSession } from '@/app/lib/types';
import { Shield, AlertCircle, Loader2 } from 'lucide-react';

interface LoginButtonProps {
  onSuccess: (session: UserSession) => void;
}

export default function LoginButton({ onSuccess }: LoginButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Generate nonce for replay attack prevention
      const nonce = crypto.randomUUID();

      // Send request to local Electron OAuth agent
      const response = await fetch('http://localhost:5000/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nonce }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `OAuth agent returned ${response.status}`);
      }

      const data: OAuthResponse = await response.json();

      // Verify the ED25519 signature
      const isValid = await verifySignature(data);

      if (!isValid) {
        throw new Error('Invalid signature - verification failed');
      }

      // Create session
      const session: UserSession = {
        name: data.name,
        email: data.email,
        publicKey: data.publicKey,
        timestamp: data.timestamp,
        verifiedAt: new Date().toISOString(),
      };

      // Save to localStorage
      saveSession(session);

      // Notify parent
      onSuccess(session);
    } catch (err: any) {
      console.error('Login error:', err);
      
      if (err.message?.includes('fetch')) {
        setError('Cannot connect to Local OAuth Agent. Please ensure the Electron app is running on port 5000.');
      } else {
        setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            Waiting for approval...
          </>
        ) : (
          <>
            <Shield className="h-6 w-6" />
            Continue with Local Identity
          </>
        )}
      </button>

      {error && (
        <div className="flex items-start gap-2 p-4 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
