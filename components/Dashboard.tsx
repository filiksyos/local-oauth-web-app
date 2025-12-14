'use client';

import type { UserSession } from '@/app/lib/types';
import { LogOut, User, Mail, Key, Calendar } from 'lucide-react';

interface DashboardProps {
  session: UserSession;
  onLogout: () => void;
}

export default function Dashboard({ session, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">
            <span className="text-primary">Local OAuth</span>
          </h1>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground rounded-md border border-border transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full space-y-8">
          {/* Success Message */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <User className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Welcome, {session.name}!
            </h2>
            <p className="text-lg text-muted-foreground">
              You are successfully logged in with Local OAuth
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Identity</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-foreground font-medium">{session.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-foreground font-medium">{session.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Key className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Public Key</p>
                  <p className="text-foreground font-mono text-xs break-all">
                    {session.publicKey.slice(0, 64)}...
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Verified At</p>
                  <p className="text-foreground">
                    {new Date(session.verifiedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm text-foreground space-y-2">
            <p className="font-semibold">🔐 Cryptographically Verified</p>
            <p className="text-muted-foreground">
              Your identity was verified using ED25519 digital signatures. 
              The signature was verified client-side in your browser, ensuring 
              your private key never left your machine.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
