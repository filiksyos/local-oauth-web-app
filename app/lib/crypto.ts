import * as ed from '@noble/ed25519';
import type { OAuthResponse } from './types';

/**
 * Verify ED25519 signature for OAuth response
 * Follows ghostmrr verification pattern
 */
export async function verifySignature(
  response: OAuthResponse
): Promise<boolean> {
  try {
    // Reconstruct the signed message
    const message = JSON.stringify({
      name: response.name,
      email: response.email,
      timestamp: response.timestamp,
      nonce: response.nonce,
    });

    // Convert from base64
    const publicKey = Buffer.from(response.publicKey, 'base64');
    const signature = Buffer.from(response.signature, 'base64');
    const messageBytes = new TextEncoder().encode(message);

    // Verify signature using @noble/ed25519
    return await ed.verifyAsync(signature, messageBytes, publicKey);
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}
