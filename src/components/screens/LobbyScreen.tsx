'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player, GameSettings } from '../../types/game';
import { 
  Users, Copy, Check, Play, Settings, ArrowLeft, Sparkles, 
  Clock, Layers, Plus, Trash2, Shuffle, Crown, AlertCircle, ExternalLink, Bot, Eye, Lock
} from 'lucide-react';

interface ExtendedGameSettings extends GameSettings {
  isGradualReveal?: boolean;
}

interface LobbyScreenProps {
  roomCode: string;
  currentPlayer: Player;
  players: Player[];
  settings: ExtendedGameSettings;
  onUpdateSettings?: (settings: Partial<ExtendedGameSettings>) => void;
  onAddBot?: (name?: string, avatar?: string) => void;
  onRemovePlayer?: (id: string) => void;
  onGetRandomAvatar: () => string;
  onStartGame: () => void;
  onBackToHome: () => void;
}

export const LobbyScreen: React.FC<LobbyScreenProps> = ({
  roomCode,
  currentPlayer,
  players,
  settings,
  onUpdateSettings,
  onAddBot,
  onRemovePlayer,
  onGetRandomAvatar,
  onStartGame,
  onBackToHome,
}) => {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [botNameInput, setBotNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const hostPlayer = players.find((p) => p.isHost) || players[0];
  const isHost =
    currentPlayer?.isHost ||
    (hostPlayer && hostPlayer.id === currentPlayer?.id);

  const canStart = isHost && players.length >= 4 && players.length <= 10;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyTestLink = () => {
    const testUrl = `${window.location.origin}/?room=${roomCode}`;
    navigator.clipboard.writeText(testUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const handleAddBotSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!onAddBot) return;
    if (players.length >= 10) {
      setErrorMessage('A sala atingiu o limite máximo de 10 jogadores!');
      return;
    }

    onAddBot(botNameInput, undefined);
    setBotNameInput('');
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between p-4 md:p-6 relative select-none">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-2 z-10">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Sair da Sala
        </button>

        <div className="flex items-center gap-2">
          {/* Quick Multi-Tab Link Copier */}
          <button
            onClick={handleCopyTestLink}
            className="flex items-center gap-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 font-extrabold text-xs px-3 py-2 rounded-xl border border-indigo-500/40 transition-all shadow-md cursor-pointer"
            title="Copie o link pré-preenchido para abrir em uma nova aba do navegador!"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {linkCopied ? 'Link Copiado! Colar no F6' : 'Abrir em Nova Aba (Link)'}
          </button>

          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Código:
          </span>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 bg-slate-900 text-amber-300 font-mono font-black text-sm px-3.5 py-2 rounded-xl border border-amber-400/40 hover:border-amber-400 transition-colors shadow-lg cursor-pointer"
          >
            {roomCode}
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 my-6 z-10">
        {/* Left 2 Cols: Players List & Setup */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between shadow-2xl">
          <div className="space-y-6">
            {/* Header & Player Counter */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-100">Lobby Multiplayer Local</h2>
                  <p className="text-xs text-slate-400">Abra novas abas do navegador para entrar na mesma sala</p>
                </div>
              </div>

              {/* Player Counter Indicator */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-black px-3.5 py-1.5 rounded-full border shadow-inner ${
                    players.length < 4
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : players.length === 10
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {players.length} / 10 Jogadores
                </span>
                <span className="text-[11px] font-semibold text-slate-400">
                  (Mínimo: 4)
                </span>
              </div>
            </div>

            {/* Error Message Alert */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-2xl flex items-center gap-3 text-xs text-rose-200 font-bold"
                >
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="flex-1">{errorMessage}</span>
                  <button onClick={() => setErrorMessage(null)} className="hover:text-white font-bold">✕</button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add Bot Control */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Jogadores Conectados na Sala
              </span>

              {isHost && onAddBot && (
                <form onSubmit={handleAddBotSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={botNameInput}
                    onChange={(e) => setBotNameInput(e.target.value)}
                    placeholder="Nome do Bot (opcional)"
                    disabled={players.length >= 10}
                    className="w-44 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold focus:outline-none focus:border-indigo-400 disabled:opacity-50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={players.length >= 10}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Bot className="w-4 h-4" />
                    Adicionar Bot
                  </motion.button>
                </form>
              )}
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
              <AnimatePresence>
                {players.map((p) => {
                  const isPlayerHost = p.isHost;

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className={`relative rounded-2xl p-3 flex items-center justify-between border transition-all ${
                        isPlayerHost
                          ? 'bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border-amber-500/60 shadow-lg'
                          : p.id === currentPlayer.id
                          ? 'bg-slate-900 border-indigo-500/60'
                          : 'bg-slate-950/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center text-xl bg-gradient-to-br ${p.color} shadow-inner ring-2 ${
                            isPlayerHost ? 'ring-amber-400' : 'ring-slate-700'
                          }`}
                        >
                          {p.avatar}
                        </div>

                        {/* Details */}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-100">
                              {p.name}
                            </span>
                            {p.id === currentPlayer.id && (
                              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-semibold border border-indigo-500/30">
                                Esta Aba (Você)
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mt-0.5">
                            {isPlayerHost ? (
                              <span className="text-[11px] font-extrabold text-amber-400 flex items-center gap-1">
                                <Crown className="w-3.5 h-3.5 fill-amber-400" /> Host da Partida
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400">
                                Jogador Conectado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Remove Button (Host authority) */}
                      {isHost && p.id !== currentPlayer.id && onRemovePlayer && (
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => onRemovePlayer(p.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
                          title="Remover jogador da sala"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>💡 Clique em <strong>"Abrir em Nova Aba"</strong> para abrir outro jogador instantaneamente.</span>
            {players.length < 4 && (
              <span className="text-rose-400 font-bold">
                Faltam {4 - players.length} jogador(es) para liberar o início
              </span>
            )}
          </div>
        </div>

        {/* Right 1 Col: Game Settings & Start Action */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between shadow-2xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-black text-slate-100">
                  Regras da Sala
                </h3>
              </div>
              {!isHost && (
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-amber-400" /> Apenas Host
                </span>
              )}
            </div>

            {/* Total Rounds Setting */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-400" /> Número de Rodadas
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15].map((rounds) => (
                  <button
                    key={rounds}
                    type="button"
                    disabled={!isHost}
                    onClick={() => isHost && onUpdateSettings && onUpdateSettings({ totalRounds: rounds })}
                    className={`py-2.5 rounded-xl font-extrabold text-xs transition-all border ${
                      settings.totalRounds === rounds
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-400/60'
                    } ${!isHost ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {rounds} Rodadas
                  </button>
                ))}
              </div>
            </div>

            {/* Modo Anônimo / Revelação Gradual Toggle */}
            <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-extrabold text-slate-100">
                    Modo Revelação Gradual
                  </span>
                </div>
                <button
                  type="button"
                  disabled={!isHost}
                  onClick={() =>
                    isHost &&
                    onUpdateSettings &&
                    onUpdateSettings({ isGradualReveal: !settings.isGradualReveal })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                    settings.isGradualReveal ? 'bg-amber-400' : 'bg-slate-800 border border-slate-700'
                  } ${!isHost ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <motion.div
                    animate={{ x: settings.isGradualReveal ? 24 : 0 }}
                    className={`w-4 h-4 rounded-full shadow ${
                      settings.isGradualReveal ? 'bg-slate-950' : 'bg-slate-400'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Quando ativado, o Juiz revela as respostas enviadas uma por uma durante o julgamento!
              </p>
            </div>

            {/* Checklist */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <span className="font-extrabold text-slate-200 block mb-2">Checklist Multiplayer:</span>
              <div className="flex items-center gap-2">
                <span className={players.length >= 4 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                  {players.length >= 4 ? '✓' : '✗'}
                </span>
                <span className="text-slate-300">Mínimo de 4 jogadores (Atual: {players.length})</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={players.length <= 10 ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                  {players.length <= 10 ? '✓' : '✗'}
                </span>
                <span className="text-slate-300">Máximo de 10 jogadores</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={isHost ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                  {isHost ? '✓' : 'ℹ'}
                </span>
                <span className="text-slate-300">
                  {isHost ? 'Você é o Host da sala' : `Host: ${hostPlayer?.name || 'Nenhum'}`}
                </span>
              </div>
            </div>
          </div>

          {/* Start Game Action */}
          <div className="pt-6 border-t border-slate-800">
            <motion.button
              whileHover={canStart ? { scale: 1.03 } : undefined}
              whileTap={canStart ? { scale: 0.97 } : undefined}
              disabled={!canStart}
              onClick={onStartGame}
              className={`w-full py-4 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2 transition-all ${
                canStart
                  ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 shadow-amber-500/20 hover:brightness-110 cursor-pointer'
                  : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed'
              }`}
            >
              <Play className={`w-5 h-5 ${canStart ? 'fill-slate-950' : 'fill-slate-500'}`} />
              Iniciar Partida
            </motion.button>

            {!isHost && (
              <p className="text-[11px] text-amber-400 text-center font-semibold mt-2">
                👑 Apenas o Host ({hostPlayer?.name}) pode alterar as regras e iniciar a partida.
              </p>
            )}

            {isHost && players.length < 4 && (
              <p className="text-[11px] text-rose-400 text-center font-semibold mt-2">
                Adicione mais {4 - players.length} jogador(es) ou bots para liberar o início.
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-xs text-slate-600 py-2">
        Cartas do Arthur &copy; Multiplayer Autoritativo via Socket.IO
      </footer>
    </div>
  );
};
