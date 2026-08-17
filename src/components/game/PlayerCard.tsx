'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '../../types/game';
import { Crown, Gavel, Check, Clock } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  isCurrentPlayer?: boolean;
  compact?: boolean;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isCurrentPlayer = false,
  compact = false,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-xl p-3 transition-all ${
        player.isCzar
          ? 'bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-slate-900 border-2 border-amber-400/80 shadow-lg shadow-amber-950/30'
          : isCurrentPlayer
          ? 'bg-gradient-to-r from-indigo-950/90 to-slate-900 border-2 border-indigo-500 shadow-md'
          : 'bg-slate-900/80 border border-slate-800 backdrop-blur-sm'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar Container */}
        <div className="relative">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-xl bg-gradient-to-br ${player.color} shadow-inner ring-2 ${
              player.isCzar ? 'ring-amber-400' : 'ring-slate-700'
            }`}
          >
            {player.avatar}
          </div>

          {/* Czar or Host Badge */}
          {player.isCzar ? (
            <div className="absolute -top-1.5 -right-1.5 bg-amber-400 text-slate-950 rounded-full p-1 shadow-md">
              <Gavel className="w-3.5 h-3.5 font-bold" />
            </div>
          ) : player.isHost ? (
            <div className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-950 rounded-full p-1 shadow-md">
              <Crown className="w-3.5 h-3.5 font-bold" />
            </div>
          ) : null}
        </div>

        {/* Player Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-sm text-slate-100 truncate">
              {player.name}
            </span>
            {isCurrentPlayer && (
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-semibold border border-indigo-500/30">
                Você
              </span>
            )}
          </div>

          {/* Status message */}
          {!compact && (
            <div className="flex items-center gap-1 text-xs mt-0.5">
              {player.isCzar ? (
                <span className="text-amber-400 font-medium flex items-center gap-1">
                  <Gavel className="w-3 h-3" /> Juiz da Rodada
                </span>
              ) : player.hasSubmitted ? (
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> Carta Enviada
                </span>
              ) : (
                <span className="text-slate-400 flex items-center gap-1 animate-pulse">
                  <Clock className="w-3 h-3" /> Escolhendo...
                </span>
              )}
            </div>
          )}
        </div>

        {/* Player Score Badge */}
        <div className="flex flex-col items-end">
          <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg text-center">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block leading-none text-[9px]">
              Pts
            </span>
            <span className="font-extrabold text-amber-400 text-sm leading-tight">
              {player.score}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
