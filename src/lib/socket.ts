import { io, Socket } from 'socket.io-client';

const getSocketUrl = (): string => {
  // 1. Variável de ambiente configurada na Vercel
  if (process.env.PUBLIC_SOCKET_URL) {
    return process.env.PUBLIC_SOCKET_URL;
  }

  // 2. Resolução dinâmica no navegador
  if (typeof window !== 'undefined') {
    const { protocol, hostname, origin } = window.location;

    // Se estiver rodando localmente no próprio computador
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }

    // Se estiver rodando na rede Wi-Fi local (ex: 192.168.x.x)
    if (hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
      return `${protocol}//${hostname}:3001`;
    }

    // Se estiver hospedado online (Vercel / Render / Domínio Público)
    return origin;
  }

  return 'http://localhost:3001';
};

export const socket: Socket = io(getSocketUrl(), {
  autoConnect: true,
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 20,
  reconnectionDelay: 1000,
});
