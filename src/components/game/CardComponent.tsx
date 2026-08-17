'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../types/game';
import { Sparkles, CheckCircle2, HelpCircle, Edit3 } from 'lucide-react';

interface CardComponentProps {
  card: Card;
  type: 'prompt' | 'answer';
  isSelected?: boolean;
  selectionOrder?: number;
  requiredBlanks?: number;
  isFacedown?: boolean;
  isWinner?: boolean;
  onCustomTextChange?: (text: string) => void;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CardComponent: React.FC<CardComponentProps> = ({
  card,
  type,
  isSelected = false,
  selectionOrder,
  requiredBlanks = 1,
  isFacedown = false,
  isWinner = false,
  onCustomTextChange,
  onClick,
  className = '',
  size = 'md',
}) => {
  const isPrompt = type === 'prompt';

  const sizeClasses = {
    sm: 'w-36 h-52 p-3 text-xs',
    md: 'w-48 h-72 p-4 text-sm',
    lg: 'w-64 h-96 p-5 text-base',
  }[size];

  if (isFacedown) {
    return (
      <motion.div
        whileHover={onClick ? { scale: 1.04, y: -4 } : undefined}
        whileTap={onClick ? { scale: 0.96 } : undefined}
        onClick={onClick}
        className={`relative ${sizeClasses} rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 border-2 border-indigo-500/40 shadow-xl flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden group shrink-0 ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.2),transparent_70%)] pointer-events-none" />
        <div className="w-14 h-20 rounded-xl border border-indigo-400/30 bg-indigo-900/40 flex items-center justify-center shadow-inner group-hover:border-indigo-400/60 transition-colors">
          <HelpCircle className="w-8 h-8 text-indigo-300 group-hover:text-amber-400 transition-colors animate-pulse" />
        </div>
        <span className="mt-3 text-xs font-black uppercase tracking-wider text-indigo-300 group-hover:text-white transition-colors">
          Cartas do Arthur
        </span>
      </motion.div>
    );
  }

  const renderTextWithBlanks = (text: string) => {
    if (!text.includes('___')) return text;

    const parts = text.split('___');
    return (
      <>
        {parts[0]}
        <span className="inline-block mx-1 px-2.5 py-0.5 border-b-2 border-amber-400 font-extrabold text-amber-300 bg-amber-400/10 rounded text-xs">
          (1) ______
        </span>
        {parts[1]}
        {parts.length > 2 && (
          <>
            <span className="inline-block mx-1 px-2.5 py-0.5 border-b-2 border-amber-400 font-extrabold text-amber-300 bg-amber-400/10 rounded text-xs">
              (2) ______
            </span>
            {parts[2]}
          </>
        )}
      </>
    );
  };

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0.95 }}
      animate={{ scale: 1, opacity: 1, y: isSelected ? -8 : 0 }}
      whileHover={
        onClick
          ? {
              scale: 1.04,
              y: isSelected ? -12 : -6,
              zIndex: 30,
            }
          : undefined
      }
      whileTap={onClick ? { scale: 0.96 } : undefined}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      onClick={onClick}
      className={`relative ${sizeClasses} rounded-2xl flex flex-col justify-between select-none cursor-pointer overflow-hidden shrink-0 transition-colors duration-150 ${
        isPrompt
          ? 'bg-gradient-to-b from-slate-900 via-zinc-900 to-black border-2 border-amber-500/70 text-white shadow-2xl shadow-amber-950/50'
          : card.isCustomizable
          ? 'bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-indigo-400 shadow-2xl ring-2 ring-indigo-500/40'
          : isWinner
          ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-semibold border-4 border-yellow-200 shadow-2xl ring-4 ring-yellow-400/60'
          : isSelected
          ? 'bg-slate-900 text-white border-2 border-amber-400 ring-4 ring-amber-400/50 shadow-2xl'
          : 'bg-white text-slate-900 border border-slate-200 shadow-lg hover:border-indigo-400 hover:shadow-2xl'
      } ${className}`}
    >
      {/* Selection Glow Banner */}
      {isSelected && (
        <div className="absolute inset-0 bg-amber-400/10 pointer-events-none rounded-2xl animate-pulse" />
      )}

      {/* Top Header/Category Badge */}
      <div className="flex items-center justify-between gap-1 mb-2 z-10">
        <span
          className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
            isPrompt
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
              : card.isCustomizable
              ? 'bg-indigo-500/30 text-indigo-400/40'
              : isWinner
              ? 'bg-slate-950 text-amber-300 font-black'
              : isSelected
              ? 'bg-amber-400 text-slate-950 font-black'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {isPrompt
            ? card.blanks === 2
              ? '🔥 Dupla Lacuna'
              : card.category || 'Pergunta'
            : card.isCustomizable
            ? '✍️ Coringa Editável'
            : 'Resposta'}
        </span>

        {isPrompt && <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />}
        {isSelected && (
          <div className="flex items-center gap-1">
            {requiredBlanks > 1 && selectionOrder && (
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center shadow-lg border border-amber-200">
                {selectionOrder}ª
              </span>
            )}
            <CheckCircle2 className="w-5 h-5 text-amber-400 fill-amber-400/20" />
          </div>
        )}
        {isWinner && <Sparkles className="w-5 h-5 text-slate-950 fill-amber-400" />}
      </div>

      {/* Card Content Body */}
      <div className="flex-1 flex flex-col justify-center my-1 leading-snug font-medium z-10">
        {card.isCustomizable ? (
          <div className="space-y-2 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-1 text-[11px] text-indigo-300 font-bold">
              <Edit3 className="w-3.5 h-3.5" /> Digite sua resposta:
            </div>
            <textarea
              rows={3}
              value={card.customText ?? ''}
              onChange={(e) => {
                const val = e.target.value;
                if (onCustomTextChange) onCustomTextChange(val);
              }}
              placeholder="Escreva algo hilário aqui..."
              className="w-full bg-slate-950/80 border border-indigo-500/50 rounded-xl p-2 text-xs text-indigo-100 font-bold placeholder-slate-500 focus:outline-none focus:border-indigo-400 resize-none"
            />
          </div>
        ) : (
          <p className={isPrompt ? 'text-amber-50 font-bold text-base md:text-lg' : isSelected ? 'text-amber-100 font-bold' : isWinner ? 'text-slate-950 font-extrabold' : 'text-slate-900 font-semibold'}>
            {isPrompt ? renderTextWithBlanks(card.text) : card.customText || card.text}
          </p>
        )}
      </div>

      {/* Footer Branding */}
      <div
        className={`pt-2 border-t flex items-center justify-between text-[10px] z-10 ${
          isPrompt
            ? 'border-amber-500/20 text-amber-400/70'
            : card.isCustomizable
            ? 'border-indigo-500/30 text-indigo-400/70'
            : isWinner
            ? 'border-slate-950/20 text-slate-950 font-extrabold'
            : 'border-slate-100 text-slate-400'
        }`}
      >
        <span className="font-bold uppercase tracking-wider">
          {card.isCustomizable ? 'Escreva Você Mesmo' : 'Cartas do Arthur'}
        </span>
        <span className="opacity-60">#{card.id.substring(0, 6)}</span>
      </div>
    </motion.div>
  );
};
