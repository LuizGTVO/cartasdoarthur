'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '../../types/game';
import { Trophy, Award, Medal } from 'lucide-react';

interface ScoreboardProps {
  players: Player[];
  targetScore?: number;
  className?: string;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  players,
  targetScore = 5,
  className = '',
}) => {
  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getRankBadge = (rank: number) => {
    if (rank === 0) return <Trophy className="w-4 h-4 text-yellow-400" />;
    if (rank === 1) return <Award className="w-4 h-4 text-slate-300" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-amber-600" />;
    return <span className="text-xs font-bold text-slate-500">#{rank + 1}</span>;
  };

  return (
    <div className={`bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-extrabold text-slate-100 text-sm tracking-wider uppercase">
            Placar Geral
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
          Meta: {targetScore} pts
        </span>
      </div>

      {/* Players Ranking */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        <AnimatePresence>
          {sortedPlayers.map((player, index) => {
            const progressPercent = Math.min(100, Math.round((player.score / targetScore) * 100));

            return (
              <motion.div
                key={player.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`p-2.5 rounded-xl border flex items-center gap-3 transition-colors ${
                  index === 0
                    ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500/40'
                    : 'bg-slate-850 border-slate-800'
                }`}
              >
                {/* Rank Badge */}
                <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  {getRankBadge(index)}
                </div>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${player.color} flex items-center justify-center text-sm shadow-inner shrink-0`}>
                  {player.avatar}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-200 truncate">
                      {player.name}
                    </span>
                    <span className="font-extrabold text-amber-400 text-sm ml-2">
                      {player.score} pts
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-indigo-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
