import { useState, useCallback, useRef } from 'react';
import { GamePhase, Player, Card, Submission, GameSettings } from '../types/game';
import { MOCK_PLAYERS, MOCK_AVATARS } from '../data/mockData';
import { 
  DeckState, createDeckState, drawBlackCard, drawWhiteCards, 
  discardCards, dealInitialHand, refillHand 
} from '../utils/deckManager';

// Gradient color presets for new players
const COLOR_PRESETS = [
  'from-amber-400 to-yellow-600',
  'from-purple-400 to-pink-600',
  'from-blue-400 to-cyan-600',
  'from-emerald-400 to-teal-600',
  'from-orange-400 to-red-600',
  'from-indigo-400 to-violet-600',
];

const BOT_NAME_POOL = [
  'Pedrinho Coxinha',
  'Vovó do Zap',
  'DJ Zé da Manga',
  'Renata do RH',
  'Carlinhos 10',
  'Dra. Sônia',
];

export function useGameState() {
  const [phase, setPhase] = useState<GamePhase>('home');
  const [roomCode, setRoomCode] = useState<string>('ARTHUR7');
  
  // Deck state managing Draw Pile and Discard Pile
  const deckStateRef = useRef<DeckState>(createDeckState());

  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: 'p_user',
    name: 'Arthur (Você)',
    avatar: '👑',
    color: 'from-amber-400 to-yellow-600',
    score: 0,
    isHost: true,
    isCzar: false,
    isReady: true,
    hasSubmitted: false,
  });

  const [players, setPlayers] = useState<Player[]>(MOCK_PLAYERS.slice(0, 4));
  
  const [settings, setSettings] = useState<GameSettings>({
    totalRounds: 10,
    roundTimer: 60,
    roomCode: 'ARTHUR7',
    maxPlayers: 10,
  });

  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [promptCard, setPromptCard] = useState<Card>({ id: 'init', text: 'Carregando...', blanks: 1 });
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  
  // Selection state (supports 1 or 2 selected cards)
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [winnerSubmission, setWinnerSubmission] = useState<Submission | null>(null);

  // Toggle card selection in hand (handles 1 or 2 cards depending on promptCard.blanks)
  const handleSelectCard = useCallback((card: Card) => {
    setSelectedCards((prev) => {
      const isAlreadySelected = prev.some((c) => c.id === card.id);
      if (isAlreadySelected) {
        return prev.filter((c) => c.id !== card.id);
      }

      const requiredBlanks = promptCard.blanks || 1;
      if (prev.length >= requiredBlanks) {
        return [prev[0], card].slice(0, requiredBlanks);
      }

      return [...prev, card];
    });
  }, [promptCard.blanks]);

  // Update custom text for editable wildcard
  const updateCustomCardText = useCallback((cardId: string, customText: string) => {
    setPlayerHand((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, customText } : c))
    );
    setSelectedCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, customText } : c))
    );
  }, []);

  // Get a random avatar
  const getRandomAvatar = useCallback(() => {
    return MOCK_AVATARS[Math.floor(Math.random() * MOCK_AVATARS.length)];
  }, []);

  // Add a player (manual or mock bot) with validation
  const addPlayer = useCallback((nameInput?: string, avatarInput?: string): { success: boolean; message?: string } => {
    if (players.length >= 10) {
      return { success: false, message: 'A sala já atingiu o limite máximo de 10 jogadores!' };
    }

    let finalName = (nameInput || '').trim();
    if (!finalName) {
      const usedNames = new Set(players.map((p) => p.name.toLowerCase()));
      const availableBots = BOT_NAME_POOL.filter((b) => !usedNames.has(b.toLowerCase()));
      finalName = availableBots.length > 0 ? availableBots[0] : `Jogador ${players.length + 1}`;
    }

    const isDuplicate = players.some((p) => p.name.toLowerCase() === finalName.toLowerCase());
    if (isDuplicate) {
      return { success: false, message: `Já existe um jogador com o nome "${finalName}" na sala!` };
    }

    const newAvatar = avatarInput || getRandomAvatar();
    const isHost = players.length === 0;

    const newPlayer: Player = {
      id: `p_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: finalName,
      avatar: newAvatar,
      color: COLOR_PRESETS[players.length % COLOR_PRESETS.length],
      score: 0,
      isHost: isHost,
      isCzar: false,
      isReady: true,
      hasSubmitted: false,
    };

    setPlayers((prev) => [...prev, newPlayer]);
    return { success: true };
  }, [players, getRandomAvatar]);

  // Remove a player with auto-promotion of host if host leaves
  const removePlayer = useCallback((playerId: string): { success: boolean; message?: string } => {
    setPlayers((prev) => {
      const remaining = prev.filter((p) => p.id !== playerId);
      if (remaining.length > 0) {
        const hasHost = remaining.some((p) => p.isHost);
        if (!hasHost) {
          remaining[0] = { ...remaining[0], isHost: true };
        }
      }
      return remaining;
    });
    return { success: true };
  }, []);

  // Update current user's profile
  const updateCurrentPlayerProfile = useCallback((name: string, avatar: string): { success: boolean; message?: string } => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return { success: false, message: 'O nome não pode ficar em branco!' };
    }

    const isDuplicate = players.some(
      (p) => p.id !== currentPlayer.id && p.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      return { success: false, message: `O nome "${trimmedName}" já está sendo usado por outro jogador!` };
    }

    setCurrentPlayer((prev) => ({ ...prev, name: trimmedName, avatar }));
    setPlayers((prev) =>
      prev.map((p) => (p.id === currentPlayer.id ? { ...p, name: trimmedName, avatar } : p))
    );

    return { success: true };
  }, [currentPlayer.id, players]);

  // Actions
  const createGame = useCallback((playerName: string, avatar: string) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);
    setSettings((prev) => ({ ...prev, roomCode: code }));
    
    const user: Player = {
      id: 'p_user',
      name: playerName || 'Arthur (Você)',
      avatar: avatar || '👑',
      color: 'from-amber-400 to-yellow-600',
      score: 0,
      isHost: true,
      isCzar: false,
      isReady: true,
      hasSubmitted: false,
    };
    
    setCurrentPlayer(user);
    setPlayers([user, ...MOCK_PLAYERS.slice(1, 4)]);
    setPhase('lobby');
  }, []);

  const joinGame = useCallback((playerName: string, avatar: string, code: string) => {
    const validCode = code.trim().toUpperCase() || 'ARTHUR7';
    setRoomCode(validCode);
    setSettings((prev) => ({ ...prev, roomCode: validCode }));

    const user: Player = {
      id: 'p_user',
      name: playerName || 'Jogador Novo',
      avatar: avatar || '🚀',
      color: 'from-cyan-400 to-blue-600',
      score: 0,
      isHost: false,
      isCzar: false,
      isReady: true,
      hasSubmitted: false,
    };

    setCurrentPlayer(user);
    setPlayers([...MOCK_PLAYERS.slice(0, 3), user]);
    setPhase('lobby');
  }, []);

  const toggleReady = useCallback(() => {
    setCurrentPlayer((prev) => ({ ...prev, isReady: !prev.isReady }));
    setPlayers((prev) =>
      prev.map((p) => (p.id === 'p_user' ? { ...p, isReady: !p.isReady } : p))
    );
  }, []);

  const startGame = useCallback(() => {
    if (players.length < 4) return;

    // Reset and shuffle deck state
    deckStateRef.current = createDeckState();

    setRoundNumber(1);

    // 1. Draw 1 Black Card from draw pile
    const { card: firstBlackCard, updatedDeckState: deck1 } = drawBlackCard(deckStateRef.current);
    setPromptCard(firstBlackCard);

    // 2. Deal initial hand of 10 white cards for current player (9 white + 1 customizable wildcard)
    const { hand: userHand, updatedDeckState: deck2 } = dealInitialHand(deck1, 10);
    setPlayerHand(userHand);

    // 3. Generate initial mock submissions from other players (using 10-card pool)
    const mockCount = Math.min(3, players.length - 1);
    const { cards: mockAnswers1, updatedDeckState: deck3 } = drawWhiteCards(deck2, mockCount);
    
    let currentDeck = deck3;
    let mockAnswers2: Card[] = [];

    if (firstBlackCard.blanks === 2) {
      const res = drawWhiteCards(currentDeck, mockCount);
      mockAnswers2 = res.cards;
      currentDeck = res.updatedDeckState;
    }

    deckStateRef.current = currentDeck;

    const otherPlayers = players.filter((p) => p.id !== currentPlayer.id);
    const initialSubs: Submission[] = otherPlayers.slice(0, mockCount).map((p, idx) => ({
      id: `sub_${Date.now()}_${idx}`,
      playerId: p.id,
      playerName: p.name,
      playerAvatar: p.avatar,
      card: mockAnswers1[idx],
      secondCard: firstBlackCard.blanks === 2 ? mockAnswers2[idx] : undefined,
    }));

    setSubmissions(initialSubs);
    setSelectedCards([]);
    setWinnerSubmission(null);
    setPhase('selecting');
  }, [players, currentPlayer.id]);

  const submitCard = useCallback(() => {
    if (selectedCards.length === 0) return;

    const userSub: Submission = {
      id: `sub_${Date.now()}`,
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      playerAvatar: currentPlayer.avatar,
      card: selectedCards[0],
      secondCard: selectedCards[1] || undefined,
    };

    setSubmissions((prev) => [...prev, userSub]);
    setCurrentPlayer((prev) => ({ ...prev, hasSubmitted: true }));
    setPlayers((prev) =>
      prev.map((p) => (p.id === 'p_user' ? { ...p, hasSubmitted: true } : p))
    );
    
    // Remove submitted cards from hand
    const selectedIds = new Set(selectedCards.map((c) => c.id));
    const remainingHand = playerHand.filter((c) => !selectedIds.has(c.id));
    setPlayerHand(remainingHand);

    // Discard submitted white cards
    deckStateRef.current = discardCards(deckStateRef.current, undefined, selectedCards);

    setSelectedCards([]);
    setPhase('judging');
  }, [selectedCards, currentPlayer, playerHand]);

  const czarPickWinner = useCallback((submission: Submission) => {
    setWinnerSubmission(submission);
    
    // Update score of winner
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === submission.playerId ? { ...p, score: p.score + 1 } : p
      )
    );

    setPhase('round_winner');
  }, []);

  const nextRound = useCallback(() => {
    if (roundNumber >= settings.totalRounds) {
      setPhase('game_over');
      return;
    }

    const nextR = roundNumber + 1;
    setRoundNumber(nextR);

    // 1. Discard current prompt card and round submissions
    const allPlayedWhiteCards = submissions.flatMap((s) => [s.card, ...(s.secondCard ? [s.secondCard] : [])]);
    deckStateRef.current = discardCards(deckStateRef.current, promptCard, allPlayedWhiteCards);

    // 2. Draw next Black Card
    const { card: nextBlackCard, updatedDeckState: deck1 } = drawBlackCard(deckStateRef.current);
    setPromptCard(nextBlackCard);

    // 3. Refill player hand back up to 10 white cards
    const { hand: refilledHand, updatedDeckState: deck2 } = refillHand(deck1, playerHand, 10);
    setPlayerHand(refilledHand);

    // 4. Cycle Czar
    const czarIndex = (nextR - 1) % players.length;
    const czarPlayerId = players[czarIndex].id;

    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        isCzar: p.id === czarPlayerId,
        hasSubmitted: false,
      }))
    );

    setCurrentPlayer((prev) => ({
      ...prev,
      isCzar: prev.id === czarPlayerId,
      hasSubmitted: false,
    }));

    // 5. Draw unique mock submissions for other players
    const mockCount = Math.min(3, players.length - 1);
    const { cards: mockResps1, updatedDeckState: deck3 } = drawWhiteCards(deck2, mockCount);
    let currentDeck = deck3;
    let mockResps2: Card[] = [];

    if (nextBlackCard.blanks === 2) {
      const res = drawWhiteCards(currentDeck, mockCount);
      mockResps2 = res.cards;
      currentDeck = res.updatedDeckState;
    }

    deckStateRef.current = currentDeck;

    const otherPlayers = players.filter((p) => p.id !== czarPlayerId);
    const mockSubs: Submission[] = otherPlayers.slice(0, mockCount).map((p, idx) => ({
      id: `sub_${Date.now()}_${idx}`,
      playerId: p.id,
      playerName: p.name,
      playerAvatar: p.avatar,
      card: mockResps1[idx],
      secondCard: nextBlackCard.blanks === 2 ? mockResps2[idx] : undefined,
    }));

    setSubmissions(mockSubs);
    setWinnerSubmission(null);
    setSelectedCards([]);
    setPhase('selecting');
  }, [roundNumber, settings.totalRounds, players, playerHand, promptCard, submissions]);

  const resetToHome = useCallback(() => {
    setPhase('home');
  }, []);

  return {
    phase,
    setPhase,
    roomCode,
    currentPlayer,
    players,
    settings,
    setSettings,
    roundNumber,
    promptCard,
    playerHand,
    selectedCards,
    handleSelectCard,
    updateCustomCardText,
    submissions,
    winnerSubmission,
    addPlayer,
    removePlayer,
    getRandomAvatar,
    updateCurrentPlayerProfile,
    createGame,
    joinGame,
    toggleReady,
    startGame,
    submitCard,
    czarPickWinner,
    nextRound,
    resetToHome,
  };
}
