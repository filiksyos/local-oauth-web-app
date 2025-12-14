export interface OAuthResponse {
  name: string;
  email: string;
  publicKey: string;
  timestamp: string;
  signature: string;
  nonce?: string;
}

export interface UserSession {
  name: string;
  email: string;
  publicKey: string;
  timestamp: string;
  verifiedAt: string;
}
