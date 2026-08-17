'use client';

import React, { useState } from 'react';
import { GameStatus } from '../../store/useGameStore';
import { Sparkles, Copy, Check, Home } from 'lucide-react';

interface RoundHeaderProps {
  roundNumber: number;
  totalRounds: number;
  status: GameStatus;
  roomCode: string;
  czarName: string;
  onLeaveGame?: () => void;
}

export const RoundHeader: React.FC<RoundHeaderProps> = ({
  roundNumber,
  totalRounds,
  status,
  roomCode,
  czarName,
  onLeaveGame,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'SUBMITTING':
      case 'PLAYING':
        return {
          label: 'Fase: Envio de Respostas',
          color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
        };
      case 'JUDGING':
        return {
          label: `Fase: Julgamento (${czarName} escolhe)`,
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
      case 'RESULT':
        return {
          label: 'Fase: Resultado da Rodada!',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'FINISHED':
        return {
          label: 'Partida Finalizada!',
          color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        };
      default:
        return {
          label: 'Lobby',
          color: 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 px-4 py-3 shadow-md backdrop-blur-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Title & Room Code */}
        <div className="flex items-center gap-3">
          <button
            onClick={onLeaveGame}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Voltar ao Lobby"
          >
            <Home className="w-4 h-4" />
          </button>

          <div>
            <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 text-base leading-tight">
              Cartas do Arthur
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">
                Sala:
              </span>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 text-xs font-mono font-bold text-amber-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 hover:border-amber-400/50 transition-colors"
              >
                {roomCode}
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Center: Round & Status */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-amber-500/10 via-slate-800 to-indigo-500/10 border border-slate-700 px-4 py-1.5 rounded-xl flex items-center gap-3 shadow-inner">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-extrabold text-slate-100">
                Rodada {roundNumber} <span className="text-slate-500 font-normal">de {totalRounds}</span>
              </span>
            </div>

            <div className="h-4 w-px bg-slate-700" />

            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadge.color}`}>
              {statusBadge.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
