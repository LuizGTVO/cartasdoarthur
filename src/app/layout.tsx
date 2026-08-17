import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cartas do Arthur | Party Game de Cartas Web',
  description: 'Um party game de cartas web divertido, moderno e totalmente original para jogar com amigos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-amber-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
