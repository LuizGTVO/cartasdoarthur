export type CardType = 'prompt' | 'answer';

export interface Card {
  id: string;
  text: string;
  blanks?: number; // 1 or 2 blanks
  category?: string;
  isCustomizable?: boolean; // Printable/Editable wildcard card ("Escreva Você Mesmo ✍️")
  customText?: string;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  color: string;
  score: number;
  isHost: boolean;
  isCzar: boolean;
  isReady: boolean;
  hasSubmitted: boolean;
}

export type GamePhase = 
  | 'home' 
  | 'lobby' 
  | 'selecting' 
  | 'judging' 
  | 'round_winner' 
  | 'game_over';

export interface Submission {
  id: string;
  playerId: string;
  playerName: string;
  playerAvatar: string;
  card: Card;
  secondCard?: Card; // Used when prompt has 2 blanks (blanks: 2)
}

export interface GameSettings {
  totalRounds: number;
  roundTimer: number;
  roomCode: string;
  maxPlayers: number;
}

export interface RoundInfo {
  roundNumber: number;
  totalRounds: number;
  promptCard: Card;
  czarId: string;
  czarName: string;
  submissions: Submission[];
  winnerSubmission?: Submission;
  timerSeconds: number;
}
