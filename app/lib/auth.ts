import type { UserSession } from './types';

const SESSION_KEY = 'local_oauth_session';

/**
 * Save user session to localStorage
 */
export function saveSession(session: UserSession): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

/**
 * Load user session from localStorage
 */
export function loadSession(): UserSession | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Clear user session from localStorage
 */
export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}
