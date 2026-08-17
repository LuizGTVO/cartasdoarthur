'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, PlusCircle, LogIn, Flame } from 'lucide-react';
import { MOCK_AVATARS } from '../../data/mockData';

interface HomeScreenProps {
  onCreateGame: (name: string, avatar: string) => void;
  onJoinGame: (name: string, avatar: string, code: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onCreateGame,
  onJoinGame,
}) => {
  const [modalMode, setModalMode] = useState<'create' | 'join' | null>(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('👑');
  const [roomCodeInput, setRoomCodeInput] = useState('');

  // Auto-detect room parameter from URL for multi-tab testing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam) {
        setRoomCodeInput(roomParam.toUpperCase());
        setName('');
        setAvatar(MOCK_AVATARS[Math.floor(Math.random() * MOCK_AVATARS.length)]);
        setModalMode('join');
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim();
    if (modalMode === 'create') {
      onCreateGame(finalName, avatar);
    } else if (modalMode === 'join') {
      onJoinGame(finalName, avatar, roomCodeInput);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between items-center p-4 relative overflow-hidden select-none">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/30 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-rose-500/10 via-amber-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating 3D Cards Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [ -12, -8, -12 ] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-10 w-44 h-60 bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-500/40 rounded-2xl p-4 shadow-2xl"
        >
          <span className="text-red-400 font-extrabold text-xs">#CARTA PRETA +18</span>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [ 14, 10, 14 ] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-44 h-60 bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl backdrop-blur-sm"
        >
          <span className="text-amber-300 font-extrabold text-xs">#RESPOSTA PESADA</span>
        </motion.div>
      </div>

      {/* Top Navbar Header */}
      <header className="w-full max-w-5xl flex items-center justify-between py-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-red-600 flex items-center justify-center shadow-lg font-black text-slate-950">
            A
          </div>
          <span className="font-extrabold tracking-wider text-sm bg-gradient-to-r from-amber-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
            CARTAS DO ARTHUR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-red-950/80 border border-red-500/50 px-3 py-1 rounded-full text-xs font-black text-red-400 flex items-center gap-1.5 shadow-lg">
            <Flame className="w-4 h-4 fill-red-500 text-red-400 animate-bounce-short" />
            <span>+18 Conteúdo Adulto</span>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 px-3 py-1 rounded-full text-xs text-slate-300 flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>4 a 10 Jogadores</span>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl px-4 z-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-red-500/40 text-rose-300 text-xs font-extrabold tracking-wider uppercase shadow-inner">
            <Flame className="w-4 h-4 text-red-400" /> Party Game Adulto & Politicamente Incorreto
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Cartas pesadas, piadas ácidas e{' '}
            <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-red-500 bg-clip-text text-transparent">
              zero limites entre amigos.
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto">
            Inspirado nos maiores jogos de cartas de humor negro para maiores de 18 anos. Crie sua sala, chame a galera e prepare-se para o cancelamento!
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Botão "Criar Partida" */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalMode('create')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 text-slate-950 font-black text-base shadow-xl shadow-red-500/25 flex items-center justify-center gap-3 hover:brightness-110 transition-all cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-slate-950" />
              Criar Partida
            </motion.button>

            {/* Botão "Entrar em Partida" */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalMode('join')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border-2 border-rose-500/40 text-rose-300 hover:text-white hover:border-rose-400 font-extrabold text-base shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer"
            >
              <LogIn className="w-5 h-5 text-rose-400" />
              Entrar em Partida
            </motion.button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl py-4 text-center text-xs text-slate-600 z-10 border-t border-slate-900">
        Cartas do Arthur &copy; 2026 • Party Game Adulto (+18) 100% Original
      </footer>

      {/* MODAL SETUP (Criar / Entrar) */}
      <AnimatePresence>
        {modalMode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-100 flex items-center gap-2">
                  {modalMode === 'create' ? (
                    <>
                      <PlusCircle className="w-5 h-5 text-amber-400" /> Criar Nova Partida
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 text-indigo-400" /> Entrar em Partida
                    </>
                  )}
                </h3>
                <button
                  onClick={() => setModalMode(null)}
                  className="text-slate-400 hover:text-white text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome do Jogador */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2 text-left">
                    Seu Nome no Jogo
                  </label>
                  <input
                    type="text"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite seu nome (ex: Arthur)..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-semibold focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Seleção de Avatar */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2 text-left">
                    Escolha seu Avatar
                  </label>
                  <div className="grid grid-cols-8 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 max-h-36 overflow-y-auto">
                    {MOCK_AVATARS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setAvatar(emoji)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-transform ${
                          avatar === emoji
                            ? 'bg-amber-400/20 border-2 border-amber-400 scale-110'
                            : 'hover:bg-slate-800'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Código da Sala (apenas no modo Entrar) */}
                {modalMode === 'join' && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-2 text-left">
                      Código da Sala
                    </label>
                    <input
                      type="text"
                      required
                      value={roomCodeInput}
                      onChange={(e) => setRoomCodeInput(e.target.value)}
                      placeholder="Ex: ARTHUR7"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 font-bold uppercase tracking-wider focus:outline-none focus:border-rose-400 transition-colors"
                    />
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className={`w-full py-3.5 rounded-xl font-extrabold text-sm shadow-lg transition-all cursor-pointer ${
                    modalMode === 'create'
                      ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 text-slate-950 hover:brightness-110'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  {modalMode === 'create' ? 'Entrar no Lobby' : 'Entrar na Sala'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
