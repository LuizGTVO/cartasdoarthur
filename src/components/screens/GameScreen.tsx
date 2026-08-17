'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { RoundHeader } from '../game/RoundHeader';
import { TableArea } from '../game/TableArea';
import { Scoreboard } from '../game/Scoreboard';
import { PlayerCard } from '../game/PlayerCard';
import { CardComponent } from '../game/CardComponent';
import { Send, Trophy, Users, Sparkles, Home, AlertCircle } from 'lucide-react';
import { socket } from '../../lib/socket';

interface GameScreenProps {
  onLeaveGame?: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onLeaveGame }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const {
    status,
    roomCode,
    roundNumber,
    totalRounds,
    isGradualReveal,
    revealedSubmissionIds,
    promptCard,
    players,
    socketId,
    playerHands,
    selectedCardIds,
    submissions,
    anonymizedSubmissions,
    votes,
    roundWinner,
    errorMessage,
    setErrorMessage,
    toggleCardSelection,
    updateCustomCardText,
    submitPlayerAnswer,
    revealSubmission,
    voteCard,
    nextRound,
    resetGame,
  } = useGameStore();

  const hostPlayer = players.find((p) => p.isHost) || players[0];
  const activeSocketId: string | null = socketId || (socket && socket.id ? socket.id : null);
  const userHand = activeSocketId ? playerHands[activeSocketId] || [] : [];
  const userPlayer = players.find((p) => p.id === activeSocketId || (socket && p.id === socket.id)) || players[0];

  const requiredBlanks = promptCard?.blanks || 1;
  const isSelectionReady = selectedCardIds.length === requiredBlanks;

  const handleBackToHome = () => {
    resetGame();
    if (onLeaveGame) onLeaveGame();
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <RoundHeader
        roundNumber={roundNumber}
        totalRounds={totalRounds}
        status={status}
        roomCode={roomCode}
        czarName={hostPlayer?.name || 'Arthur'}
        onLeaveGame={handleBackToHome}
      />

      {/* Error Message Notification */}
      <AnimatePresence>
        {errorMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-rose-950/90 border-2 border-rose-500/60 p-3 rounded-2xl flex items-center justify-between text-xs font-bold text-rose-200 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button onClick={() => setErrorMessage(null)} className="hover:text-white px-2 font-bold">
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN GAME LAYOUT */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-3 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left 3 Cols: Central Game Table & Bottom Hand Tray */}
        <div className="lg:col-span-3 space-y-6 flex flex-col justify-between h-full">
          {/* Central Stage Table */}
          {promptCard && (
            <TableArea
              promptCard={promptCard}
              status={status}
              submissions={submissions}
              anonymizedSubmissions={anonymizedSubmissions}
              revealedSubmissionIds={revealedSubmissionIds}
              isGradualReveal={isGradualReveal}
              votes={votes}
              roundWinner={roundWinner}
              socketId={activeSocketId}
              onRevealSubmission={revealSubmission}
              onVoteCard={voteCard}
              onNextRound={nextRound}
            />
          )}

          {/* BOTTOM PLAYER HAND TRAY */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 md:p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="font-black text-sm text-slate-100 uppercase tracking-wider">
                  Sua Mão de Respostas ({userHand.length} Cartas)
                </h3>
                {requiredBlanks === 2 && (
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    Selecione 2 Cartas na ordem (1ª e 2ª lacunas)
                  </span>
                )}
              </div>

              {/* Submit Action Button */}
              {status === 'SUBMITTING' && (
                <motion.button
                  whileHover={isSelectionReady ? { scale: 1.05 } : undefined}
                  whileTap={isSelectionReady ? { scale: 0.95 } : undefined}
                  disabled={!isSelectionReady || userPlayer?.hasSubmitted}
                  onClick={submitPlayerAnswer}
                  className={`px-6 py-2.5 rounded-xl font-black text-xs shadow-xl flex items-center gap-2 transition-all cursor-pointer ${
                    userPlayer?.hasSubmitted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-not-allowed'
                      : isSelectionReady
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/30'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  {userPlayer?.hasSubmitted
                    ? 'Resposta Bloqueada 🔒'
                    : isSelectionReady
                    ? `Confirmar Resposta (${selectedCardIds.length}/${requiredBlanks})`
                    : `Selecione ${requiredBlanks} Carta${requiredBlanks > 1 ? 's' : ''}`}
                </motion.button>
              )}

              {status === 'JUDGING' && (
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5">
                  🗳️ Fase de Votação! Vote na melhor resposta na mesa.
                </span>
              )}
            </div>

            {/* Hand Deck Dock */}
            <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-4 pt-2 px-2 custom-scrollbar">
              {userHand.map((card) => {
                const selectedIdx = selectedCardIds.indexOf(card.id);
                const isSelected = selectedIdx !== -1;

                return (
                  <CardComponent
                    key={card.id}
                    card={card}
                    type="answer"
                    isSelected={isSelected}
                    selectionOrder={isSelected ? selectedIdx + 1 : undefined}
                    requiredBlanks={requiredBlanks}
                    onCustomTextChange={(text) => updateCustomCardText(card.id, text)}
                    onClick={
                      status === 'SUBMITTING' && !userPlayer?.hasSubmitted
                        ? () => toggleCardSelection(card)
                        : undefined
                    }
                    size="md"
                    className="shrink-0"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Scoreboard & Players List */}
        <div className="hidden lg:flex flex-col gap-5">
          <Scoreboard players={players} targetScore={totalRounds} />

          {/* Players in Match */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="font-extrabold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" /> Jogadores na Sala ({players.length})
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {players.map((p) => (
                <PlayerCard
                  key={p.id}
                  player={p}
                  isCurrentPlayer={p.id === activeSocketId}
                  compact={true}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Drawer Trigger */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 border border-indigo-400 font-extrabold text-xs cursor-pointer"
        >
          <Trophy className="w-5 h-5 text-yellow-300" /> Placar
        </button>
      </div>

      {/* Mobile Sidebar Modal */}
      <AnimatePresence>
        {showSidebar && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md p-4 flex flex-col justify-end">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <h3 className="font-black text-slate-100">Placar & Jogadores</h3>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="text-slate-400 hover:text-white font-bold"
                >
                  ✕
                </button>
              </div>

              <Scoreboard players={players} />

              <div className="space-y-2">
                {players.map((p) => (
                  <PlayerCard key={p.id} player={p} isCurrentPlayer={p.id === activeSocketId} />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GAME OVER MODAL */}
      <AnimatePresence>
        {status === 'FINISHED' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 border-2 border-amber-400/80 p-8 rounded-3xl w-full max-w-lg shadow-2xl text-center space-y-6"
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full mx-auto flex items-center justify-center text-slate-950 shadow-xl">
                <Trophy className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-3xl font-black text-amber-400">Partida Finalizada!</h2>
                <p className="text-slate-300 text-sm mt-1">
                  Parabéns a todos! O campeão supremo das cartas absurdas foi revelado.
                </p>
              </div>

              <Scoreboard players={players} />

              <button
                onClick={handleBackToHome}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-xl hover:brightness-110 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-4 h-4" /> Voltar ao Menu Principal
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
