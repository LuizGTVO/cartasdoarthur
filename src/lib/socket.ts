import { io, Socket } from 'socket.io-client';

const getSocketUrl = (): string => {
  // 1. Environment variable (Vercel Build setting)
  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }

  // 2. Browser runtime fallback
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
    if (hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
      return `http://${hostname}:3001`;
    }
  }

  return 'http://localhost:3001';
};

export const socket: Socket = io(getSocketUrl(), {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 20,
  reconnectionDelay: 1000,
});
