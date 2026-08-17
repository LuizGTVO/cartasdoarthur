'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Player } from '../../types/game';
import { GameStatus, SubmissionItem, AnonymizedSubmission } from '../../store/useGameStore';
import { CardComponent } from './CardComponent';
import { Sparkles, Gavel, Trophy, ChevronRight, MessageSquareQuote, Lock, Star, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TableAreaProps {
  promptCard: Card;
  status: GameStatus;
  submissions: SubmissionItem[];
  anonymizedSubmissions: AnonymizedSubmission[];
  revealedSubmissionIds?: string[];
  isGradualReveal?: boolean;
  votes?: Record<string, string>;
  roundWinner?: { player: Player; submission: SubmissionItem } | null;
  socketId: string | null;
  onRevealSubmission?: (submissionId?: string) => void;
  onVoteCard?: (submissionId: string) => void;
  onNextRound?: () => void;
}

export const TableArea: React.FC<TableAreaProps> = ({
  promptCard,
  status,
  submissions,
  anonymizedSubmissions,
  revealedSubmissionIds = [],
  isGradualReveal = false,
  votes = {},
  roundWinner,
  socketId,
  onRevealSubmission,
  onVoteCard,
  onNextRound,
}) => {
  const [hoveredSubId, setHoveredSubId] = useState<string | null>(null);

  // Trigger confetti when round winner is announced
  React.useEffect(() => {
    if (status === 'RESULT' && roundWinner) {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#fbbf24', '#818cf8', '#34d399', '#f43f5e', '#ec4899'],
      });
    }
  }, [status, roundWinner]);

  // Format full combined sentence for 1 or 2 blanks
  const renderCombinedSentence = (card: Card, secondCard?: Card) => {
    const text1 = card.customText || card.text;
    const text2 = secondCard ? (secondCard.customText || secondCard.text) : '';

    if (promptCard.text.includes('___')) {
      const parts = promptCard.text.split('___');

      if (parts.length > 2 && text2) {
        return (
          <p className="text-sm md:text-lg font-bold leading-relaxed text-slate-100">
            {parts[0]}
            <span className="mx-1.5 px-3 py-1 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/50 font-black inline-block shadow-lg">
              {text1}
            </span>
            {parts[1]}
            <span className="mx-1.5 px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-black inline-block shadow-lg">
              {text2}
            </span>
            {parts[2]}
          </p>
        );
      }

      return (
        <p className="text-sm md:text-lg font-bold leading-relaxed text-slate-100">
          {parts[0]}
          <span className="mx-1.5 px-3 py-1 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/50 font-black inline-block shadow-lg">
            {text1}
          </span>
          {parts[1]}
        </p>
      );
    }

    return (
      <p className="text-sm md:text-lg font-bold leading-relaxed text-slate-100">
        {promptCard.text} — <span className="text-amber-300 font-extrabold">{text1}</span>
      </p>
    );
  };

  // Determine active item for combined sentence banner preview
  const activeItem = roundWinner 
    ? { card: roundWinner.submission.card, secondCard: roundWinner.submission.secondCard }
    : hoveredSubId 
    ? anonymizedSubmissions.find((s) => s.id === hoveredSubId) || submissions.find((s) => s.id === hoveredSubId)
    : status === 'JUDGING' && anonymizedSubmissions.length > 0 
    ? anonymizedSubmissions.find((s) => !isGradualReveal || revealedSubmissionIds.includes(s.id)) || anonymizedSubmissions[0]
    : null;

  const allRevealed = !isGradualReveal || (anonymizedSubmissions.length > 0 && revealedSubmissionIds.length >= anonymizedSubmissions.length);

  return (
    <div className="w-full flex flex-col items-center justify-start p-4 md:p-8 min-h-[480px] bg-gradient-to-b from-slate-900/80 via-slate-950/95 to-slate-900/80 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* PHASE ANNOUNCEMENT BANNER */}
      <AnimatePresence mode="wait">
        {status === 'SUBMITTING' && (
          <motion.div
            key="submitting-banner"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-xl mb-4 px-4 py-2 rounded-2xl bg-indigo-950/70 border border-indigo-500/40 text-center shadow-lg shrink-0"
          >
            <span className="text-xs font-black uppercase tracking-widest text-indigo-300 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Os jogadores estão escolhendo as respostas!
            </span>
          </motion.div>
        )}

        {status === 'JUDGING' && (
          <motion.div
            key="judging-banner"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl mb-4 px-4 py-2.5 rounded-2xl bg-amber-950/80 border border-amber-400/50 text-center shadow-xl flex items-center justify-center gap-2 shrink-0"
          >
            <Gavel className="w-5 h-5 text-amber-400 animate-bounce" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">
              {isGradualReveal && !allRevealed
                ? 'Modo Revelação: Clique para desvirar as respostas antes de votar!'
                : 'Fase de Votação Geral! Escolha a sua resposta favorita na mesa:'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRADUAL REVEAL QUICK ACTION BUTTON */}
      {status === 'JUDGING' && isGradualReveal && !allRevealed && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onRevealSubmission && onRevealSubmission()}
          className="mb-4 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs shadow-xl flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer border border-yellow-200 shrink-0"
        >
          <Eye className="w-4 h-4" /> Revelar Próxima Resposta ({revealedSubmissionIds.length}/{anonymizedSubmissions.length})
        </motion.button>
      )}

      {/* LIVE COMBINED SENTENCE BANNER PREVIEW */}
      <AnimatePresence>
        {activeItem && status !== 'SUBMITTING' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="w-full max-w-3xl mb-6 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-indigo-950/90 border-2 border-amber-400/50 shadow-2xl text-center relative overflow-hidden shrink-0"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-amber-400 text-xs font-black uppercase tracking-widest">
              <MessageSquareQuote className="w-4 h-4" /> Leitura da Piada em Tempo Real
            </div>
            {renderCombinedSentence(activeItem.card, activeItem.secondCard)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN TABLE LAYOUT (Strict Top Aligned Row) */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-10 z-10">
        {/* CENTER BLACK PROMPT CARD */}
        <div className="flex flex-col items-center shrink-0 w-full lg:w-auto">
          <div className="text-center mb-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5 justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" /> Carta Preta em Destaque
            </span>
          </div>
          <CardComponent card={promptCard} type="prompt" size="lg" />
        </div>

        <div className="hidden lg:block w-px h-96 bg-slate-800 shrink-0 self-stretch" />

        {/* SUBMISSIONS DISPLAY AREA */}
        <div className="flex-1 flex flex-col items-center justify-start min-w-0 w-full">
          <div className="text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 justify-center">
              {status === 'SUBMITTING' && (
                <>Respostas na Mesa ({submissions.length})</>
              )}
              {status === 'JUDGING' && (
                <>
                  Votação Geral das Respostas ({anonymizedSubmissions.length})
                  {isGradualReveal && ` • (${revealedSubmissionIds.length}/${anonymizedSubmissions.length} Reveladas)`}
                </>
              )}
              {status === 'RESULT' && (
                <>Vencedor da Rodada!</>
              )}
            </span>
          </div>

          {/* Submissions Layout */}
          {status === 'RESULT' && roundWinner ? (
            // WINNER SHOWCASE ANIMATION
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-4 bg-gradient-to-b from-amber-950/80 via-slate-900 to-indigo-950/80 p-6 md:p-8 rounded-3xl border-2 border-amber-400/80 shadow-2xl relative overflow-hidden"
            >
              {/* Floating +1 Point Popper */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: -30, scale: 1.3 }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute -top-3 right-6 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg border border-yellow-200 flex items-center gap-1 z-30"
              >
                <Star className="w-3.5 h-3.5 fill-slate-950" /> +1 PONTO!
              </motion.div>

              <div className="flex items-center gap-2 bg-amber-400/20 text-amber-300 px-4 py-1.5 rounded-full text-sm font-black border border-amber-400/50 shadow-inner">
                <span className="text-lg">{roundWinner.player.avatar}</span>
                <span>{roundWinner.player.name} Venceu a Rodada por Votação!</span>
                <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>

              <div className="flex items-center justify-center gap-4">
                <CardComponent
                  card={roundWinner.submission.card}
                  type="answer"
                  isWinner={true}
                  size="lg"
                />
                {roundWinner.submission.secondCard && (
                  <CardComponent
                    card={roundWinner.submission.secondCard}
                    type="answer"
                    isWinner={true}
                    size="lg"
                  />
                )}
              </div>

              {onNextRound && (
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={onNextRound}
                  className="mt-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-base shadow-xl flex items-center gap-2 hover:brightness-110 transition-all cursor-pointer"
                >
                  Próxima Rodada <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          ) : status === 'JUDGING' ? (
            // ANONYMIZED REVEAL CONTAINER (h-auto tightly fits cards + button so rows NEVER overlap!)
            <div className="flex flex-wrap items-start justify-center gap-6 w-full max-w-5xl">
              {anonymizedSubmissions.map((sub, idx) => {
                const isRevealed = !isGradualReveal || (revealedSubmissionIds && revealedSubmissionIds.includes(sub.id));
                const subVotesCount = Object.values(votes).filter((subId) => subId === sub.id).length;
                const hasUserVotedThis = socketId ? votes[socketId] === sub.id : false;

                return (
                  <div
                    key={sub.id}
                    onMouseEnter={() => isRevealed && setHoveredSubId(sub.id)}
                    onMouseLeave={() => setHoveredSubId(null)}
                    className={`flex flex-col items-center justify-start gap-3 bg-slate-900/90 p-4 rounded-3xl border border-slate-800 shadow-xl shrink-0 border-t-2 border-t-amber-400/50 h-auto ${
                      sub.secondCard ? 'w-[420px]' : 'w-56'
                    }`}
                  >
                    {/* Fixed 288px height card slot */}
                    <div className="flex items-center justify-center gap-2 h-72 w-full shrink-0">
                      <CardComponent
                        card={sub.card}
                        type="answer"
                        isFacedown={!isRevealed}
                        size="md"
                      />
                      {sub.secondCard && (
                        <CardComponent
                          card={sub.secondCard}
                          type="answer"
                          isFacedown={!isRevealed}
                          size="md"
                        />
                      )}
                    </div>

                    {/* Standardized 40px height action/vote slot */}
                    <div className="w-full h-10 flex items-center justify-center gap-2 shrink-0">
                      {!isRevealed ? (
                        <button
                          onClick={() => onRevealSubmission && onRevealSubmission(sub.id)}
                          className="w-full h-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95"
                        >
                          <Eye className="w-4 h-4 text-amber-300" /> Revelar #{idx + 1}
                        </button>
                      ) : (
                        <button
                          onClick={() => onVoteCard && onVoteCard(sub.id)}
                          className={`w-full h-full rounded-xl font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-95 ${
                            hasUserVotedThis
                              ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30 font-black'
                              : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 hover:brightness-110 shadow-amber-500/20 font-black'
                          }`}
                        >
                          <Trophy className="w-4 h-4" />
                          {hasUserVotedThis ? `✓ Seu Voto (${subVotesCount})` : `Votar (${subVotesCount})`}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // SUBMITTING PHASE
            <div className="flex flex-wrap items-start justify-center gap-6 max-w-3xl">
              {submissions.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs md:text-sm font-semibold border-2 border-dashed border-slate-800 rounded-3xl px-8 w-full max-w-md">
                  Aguardando respostas... Escolha uma carta da sua mão na parte inferior para jogar!
                </div>
              ) : (
                submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className={`flex flex-col items-center justify-start gap-3 bg-slate-900/90 p-4 rounded-3xl border border-slate-800 shadow-xl shrink-0 border-t-2 border-t-amber-400/50 h-auto ${
                      sub.secondCard ? 'w-[420px]' : 'w-56'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2 h-72 w-full shrink-0">
                      <CardComponent
                        card={sub.card}
                        type="answer"
                        isFacedown={true}
                        size="md"
                      />
                      {sub.secondCard && (
                        <CardComponent
                          card={sub.secondCard}
                          type="answer"
                          isFacedown={true}
                          size="md"
                        />
                      )}
                    </div>

                    <div className="w-full h-10 flex items-center justify-center shrink-0">
                      <div className="bg-slate-950 text-indigo-300 text-[10px] font-extrabold px-3 py-1 rounded-full border border-indigo-500/40 whitespace-nowrap shadow-md flex items-center justify-center gap-1 w-full h-full">
                        <Lock className="w-3 h-3 text-indigo-400" /> Resposta Enviada 🔒
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
