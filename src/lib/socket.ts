import { io, Socket } from 'socket.io-client';

const RENDER_BACKEND_URL = 'https://cartasdoarthur.onrender.com';

const getSocketUrl = (): string => {
  // 1. Variáveis de ambiente Next.js
  if (process.env.NEXT_PUBLIC_SOCKET_URL) {
    return process.env.NEXT_PUBLIC_SOCKET_URL;
  }
  if (process.env.PUBLIC_SOCKET_URL) {
    return process.env.PUBLIC_SOCKET_URL;
  }

  // 2. Se estiver rodando localmente no PC de desenvolvimento
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
  }

  // 3. Fallback de Produção para o seu Render Backend
  return RENDER_BACKEND_URL;
};

export const socket: Socket = io(getSocketUrl(), {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 20,
  reconnectionDelay: 1000,
});
