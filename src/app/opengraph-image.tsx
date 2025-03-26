import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, #0d0d0d 0%, #1a1a1a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#39ff14', // neonGreen
          fontFamily: 'monospace',
        }}
      >
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: 40,
            textShadow: '0 0 10px rgba(57, 255, 20, 0.7)',
            fontWeight: 'bold'
          }}
        >
          🔐 NostRinger
        </div>
        <div style={{ fontSize: 28, color: '#00e7ff', marginBottom: 20 }}>
          Anonymous Ring Signatures with Nostr Keys
        </div>
        <div style={{ 
          fontSize: 20, 
          color: '#aaaaaa', 
          maxWidth: '80%', 
          textAlign: 'center',
          marginTop: 10
        }}>
          Prove group membership without revealing identity
        </div>
      </div>
    ),
    size,
  );
} 