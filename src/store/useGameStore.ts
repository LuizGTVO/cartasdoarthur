import { create } from 'zustand';
import { Card, Player } from '../types/game';
import { socket } from '../lib/socket';
import { MOCK_AVATARS } from '../data/mockData';

export type GameStatus = 
  | 'LOBBY' 
  | 'PLAYING' 
  | 'SUBMITTING' 
  | 'JUDGING' 
  | 'RESULT' 
  | 'FINISHED';

export interface SubmissionItem {
  id: string;
  playerId: string;
  card: Card;
  secondCard?: Card;
}

export interface AnonymizedSubmission {
  id: string;
  card: Card;
  secondCard?: Card;
}

export interface RoomServerState {
  code: string;
  hostId: string;
  status: GameStatus;
  players: Player[];
  currentCzarIndex: number;
  roundNumber: number;
  totalRounds: number;
  roundTimer: number;
  isGradualReveal: boolean;
  revealedSubmissionIds: string[];
  promptCard: Card | null;
  playerHands: Record<string, Card[]>;
  submissions: SubmissionItem[];
  anonymizedSubmissions: AnonymizedSubmission[];
  votes: Record<string, string>;
  roundWinner: { player: Player; submission: SubmissionItem } | null;
}

interface GameStoreState {
  status: GameStatus;
  roomCode: string;
  players: Player[];
  socketId: string | null;
  currentCzarIndex: number;
  roundNumber: number;
  totalRounds: number;
  roundTimer: number;
  isGradualReveal: boolean;
  revealedSubmissionIds: string[];
  promptCard: Card | null;
  playerHands: Record<string, Card[]>;
  selectedCardIds: string[];
  submissions: SubmissionItem[];
  anonymizedSubmissions: AnonymizedSubmission[];
  votes: Record<string, string>;
  roundWinner: { player: Player; submission: SubmissionItem } | null;
  errorMessage: string | null;
  isConnected: boolean;

  // Actions
  initSocketListeners: () => void;
  setErrorMessage: (msg: string | null) => void;
  getRandomAvatar: () => string;
  createRoom: (name: string, avatar: string) => void;
  joinRoom: (roomCode: string, name: string, avatar: string) => void;
  leaveRoom: () => void;
  addBot: (name?: string, avatar?: string) => void;
  removePlayer: (playerId: string) => void;
  updateSettings: (settings: { totalRounds?: number; roundTimer?: number; isGradualReveal?: boolean }) => void;
  startGame: () => void;
  toggleCardSelection: (card: Card) => void;
  updateCustomCardText: (cardId: string, customText: string) => void;
  submitPlayerAnswer: () => void;
  revealSubmission: (submissionId?: string) => void;
  voteCard: (submissionId: string) => void;
  nextRound: () => void;
  resetGame: () => void;
  jumpToStatus: (status: GameStatus) => void;
}

const SESSION_STORAGE_KEY = 'cartas_session_tab';

export const useGameStore = create<GameStoreState>((set, get) => ({
  status: 'LOBBY',
  roomCode: 'ARTHUR7',
  players: [],
  socketId: null,
  currentCzarIndex: 0,
  roundNumber: 1,
  totalRounds: 10,
  roundTimer: 60,
  isGradualReveal: false,
  revealedSubmissionIds: [],
  promptCard: null,
  playerHands: {},
  selectedCardIds: [],
  submissions: [],
  anonymizedSubmissions: [],
  votes: {},
  roundWinner: null,
  errorMessage: null,
  isConnected: false,

  setErrorMessage: (msg) => set({ errorMessage: msg }),

  getRandomAvatar: () => MOCK_AVATARS[Math.floor(Math.random() * MOCK_AVATARS.length)],

  initSocketListeners: () => {
    const handleConnect = () => {
      set({ isConnected: true, socketId: socket.id, errorMessage: null });

      const hasRoomParam = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('room');
      if (hasRoomParam) {
        try {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        } catch (e) {}
        return;
      }

      try {
        const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (raw) {
          const session = JSON.parse(raw);
          if (session && session.roomCode && session.playerName && session.playerId) {
            socket.emit('reconnect-player', {
              roomCode: session.roomCode,
              previousPlayerId: session.playerId,
              playerName: session.playerName,
              avatar: session.avatar,
            });
          }
        }
      } catch (err) {
        console.error('Session storage reconnect parse error', err);
      }
    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on('connect', handleConnect);

    socket.on('disconnect', () => {
      set({ isConnected: false });
    });

    socket.on('connect_error', () => {
      set({
        isConnected: false,
        errorMessage: '⚠️ Não foi possível conectar ao servidor de jogo!',
      });
    });

    socket.on('error-message', (msg: string) => {
      set({ errorMessage: msg });
    });

    socket.on('reconnect-failed', () => {
      try {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch (e) {}
    });

    socket.on('room-created', ({ roomCode, playerId }) => {
      set({ roomCode, socketId: playerId || socket.id, errorMessage: null });
    });

    socket.on('room-joined', ({ roomCode, playerId }) => {
      set({ roomCode, socketId: playerId || socket.id, errorMessage: null });
    });

    socket.on('room-state', (room: RoomServerState) => {
      const { socketId } = get();
      const activeId = socketId || socket.id;

      const userPlayer = room.players.find((p) => p.id === activeId || p.id === socket.id);
      if (userPlayer) {
        try {
          sessionStorage.setItem(
            SESSION_STORAGE_KEY,
            JSON.stringify({
              roomCode: room.code,
              playerName: userPlayer.name,
              avatar: userPlayer.avatar,
              playerId: userPlayer.id,
            })
          );
        } catch (e) {}
      }

      set({
        status: room.status,
        roomCode: room.code,
        socketId: activeId,
        players: room.players,
        currentCzarIndex: room.currentCzarIndex,
        roundNumber: room.roundNumber,
        totalRounds: room.totalRounds,
        roundTimer: room.roundTimer,
        isGradualReveal: room.isGradualReveal || false,
        revealedSubmissionIds: room.revealedSubmissionIds || [],
        promptCard: room.promptCard,
        playerHands: room.playerHands,
        submissions: room.submissions,
        anonymizedSubmissions: room.anonymizedSubmissions,
        votes: room.votes || {},
        roundWinner: room.roundWinner,
      });
    });
  },

  createRoom: (playerName, avatar) => {
    socket.emit('create-room', { playerName, avatar });
  },

  joinRoom: (roomCode, playerName, avatar) => {
    const code = (roomCode || '').trim().toUpperCase();
    socket.emit('join-room', { roomCode: code, playerName, avatar });
  },

  leaveRoom: () => {
    const { roomCode } = get();
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {}
    socket.emit('leave-room', { roomCode });
    set({ status: 'LOBBY', selectedCardIds: [], errorMessage: null, players: [] });
  },

  addBot: (name, avatar) => {
    const { roomCode } = get();
    socket.emit('add-bot', { roomCode, botName: name, avatar });
  },

  removePlayer: (playerId) => {
    const { roomCode } = get();
    socket.emit('remove-player', { roomCode, playerId });
  },

  updateSettings: ({ totalRounds, roundTimer, isGradualReveal }) => {
    const { roomCode, totalRounds: curRounds, roundTimer: curTimer, isGradualReveal: curGradual } = get();
    const code = (roomCode || '').trim().toUpperCase();

    const newRounds = totalRounds !== undefined ? totalRounds : curRounds;
    const newTimer = roundTimer !== undefined ? roundTimer : curTimer;
    const newGradual = isGradualReveal !== undefined ? isGradualReveal : curGradual;

    set({
      totalRounds: newRounds,
      roundTimer: newTimer,
      isGradualReveal: newGradual,
    });

    socket.emit('update-settings', {
      roomCode: code,
      totalRounds: newRounds,
      roundTimer: newTimer,
      isGradualReveal: newGradual,
    });
  },

  startGame: () => {
    const { roomCode } = get();
    socket.emit('start-game', { roomCode });
  },

  toggleCardSelection: (card) => {
    const { selectedCardIds, promptCard } = get();
    if (!promptCard) return;

    const requiredBlanks = promptCard.blanks || 1;
    const isSelected = selectedCardIds.includes(card.id);

    if (isSelected) {
      set({ selectedCardIds: selectedCardIds.filter((id) => id !== card.id) });
    } else {
      if (selectedCardIds.length >= requiredBlanks) {
        if (requiredBlanks === 1) {
          set({ selectedCardIds: [card.id] });
        } else {
          set({ selectedCardIds: [selectedCardIds[0], card.id] });
        }
      } else {
        set({ selectedCardIds: [...selectedCardIds, card.id] });
      }
    }
  },

  updateCustomCardText: (cardId, customText) => {
    const { playerHands, socketId } = get();
    const activeId = socketId || socket.id;
    if (!activeId) return;

    const currentHand = playerHands[activeId] || [];
    const updatedHand = currentHand.map((c) => (c.id === cardId ? { ...c, customText } : c));

    set({
      playerHands: {
        ...playerHands,
        [activeId]: updatedHand,
      },
    });
  },

  submitPlayerAnswer: () => {
    const { roomCode, selectedCardIds, socketId, playerHands } = get();
    const activeId = socketId || socket.id;
    if (!activeId) return;

    const currentHand = playerHands[activeId] || [];
    const card1 = currentHand.find((c) => c.id === selectedCardIds[0]);
    const card2 = currentHand.find((c) => c.id === selectedCardIds[1]);

    socket.emit('submit-card', {
      roomCode,
      cardIds: selectedCardIds,
      customText: card1?.customText || card2?.customText || '',
      customText1: card1?.customText || '',
      customText2: card2?.customText || '',
    });

    set({ selectedCardIds: [] });
  },

  revealSubmission: (submissionId) => {
    const { roomCode } = get();
    socket.emit('reveal-submission', { roomCode, submissionId });
  },

  voteCard: (submissionId) => {
    const { roomCode } = get();
    socket.emit('vote-card', { roomCode, submissionId });
  },

  nextRound: () => {
    const { roomCode } = get();
    socket.emit('next-round', { roomCode });
  },

  resetGame: () => {
    get().leaveRoom();
  },

  jumpToStatus: (targetStatus) => set({ status: targetStatus }),
}));
