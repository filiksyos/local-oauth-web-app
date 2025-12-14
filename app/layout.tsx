import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Local OAuth - Revolutionary Identity Verification',
  description: 'Private, cryptographically-signed identity verification using local Electron agent',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
