import { Card } from '../types/game';
import { BLACK_CARDS } from '../data/blackCards';
import { WHITE_CARDS } from '../data/whiteCards';
import { createCustomizableCard } from '../data/mockData';

export interface DeckState {
  drawPileBlack: Card[];
  drawPileWhite: Card[];
  discardPileBlack: Card[];
  discardPileWhite: Card[];
}

/**
 * Fisher-Yates shuffle algorithm for truly random decks.
 */
export function shuffleDeck<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Initializes a new shuffled DeckState using blackCards and whiteCards.
 */
export function createDeckState(): DeckState {
  return {
    drawPileBlack: shuffleDeck(BLACK_CARDS),
    drawPileWhite: shuffleDeck(WHITE_CARDS),
    discardPileBlack: [],
    discardPileWhite: [],
  };
}

/**
 * Draws a black card from the draw pile. If draw pile is empty, reshuffles discard pile into draw pile.
 */
export function drawBlackCard(deckState: DeckState): { card: Card; updatedDeckState: DeckState } {
  let { drawPileBlack, discardPileBlack } = deckState;

  if (drawPileBlack.length === 0) {
    if (discardPileBlack.length === 0) {
      // Re-initialize if both piles are empty
      drawPileBlack = shuffleDeck(BLACK_CARDS);
    } else {
      drawPileBlack = shuffleDeck(discardPileBlack);
      discardPileBlack = [];
    }
  }

  const card = drawPileBlack[0];
  const newDrawPileBlack = drawPileBlack.slice(1);

  return {
    card,
    updatedDeckState: {
      ...deckState,
      drawPileBlack: newDrawPileBlack,
      discardPileBlack,
    },
  };
}

/**
 * Draws specified number of white cards from draw pile. Reshuffles discard pile if needed.
 */
export function drawWhiteCards(
  deckState: DeckState,
  count: number
): { cards: Card[]; updatedDeckState: DeckState } {
  let { drawPileWhite, discardPileWhite } = deckState;
  const drawnCards: Card[] = [];

  for (let i = 0; i < count; i++) {
    if (drawPileWhite.length === 0) {
      if (discardPileWhite.length === 0) {
        drawPileWhite = shuffleDeck(WHITE_CARDS);
      } else {
        drawPileWhite = shuffleDeck(discardPileWhite);
        discardPileWhite = [];
      }
    }

    if (drawPileWhite.length > 0) {
      drawnCards.push(drawPileWhite[0]);
      drawPileWhite = drawPileWhite.slice(1);
    }
  }

  return {
    cards: drawnCards,
    updatedDeckState: {
      ...deckState,
      drawPileWhite,
      discardPileWhite,
    },
  };
}

/**
 * Adds played cards to the discard piles.
 */
export function discardCards(
  deckState: DeckState,
  blackCard?: Card,
  whiteCards?: Card[]
): DeckState {
  const newDiscardBlack = blackCard ? [...deckState.discardPileBlack, blackCard] : deckState.discardPileBlack;
  
  // Filter out customizable cards from discard pile (they are single-use per hand)
  const validWhiteDiscards = (whiteCards || []).filter((c) => !c.isCustomizable);
  const newDiscardWhite = [...deckState.discardPileWhite, ...validWhiteDiscards];

  return {
    ...deckState,
    discardPileBlack: newDiscardBlack,
    discardPileWhite: newDiscardWhite,
  };
}

/**
 * Deals initial hands of 10 white cards per player (9 drawn + 1 customizable wildcard).
 */
export function dealInitialHand(
  deckState: DeckState,
  handSize: number = 10
): { hand: Card[]; updatedDeckState: DeckState } {
  // Draw (handSize - 1) cards from deck
  const { cards, updatedDeckState } = drawWhiteCards(deckState, handSize - 1);
  
  // Add 1 customizable wildcard card ("✍️ Escreva Você Mesmo")
  const customCard = createCustomizableCard();
  const fullHand = [...cards, customCard];

  return {
    hand: fullHand,
    updatedDeckState,
  };
}

/**
 * Refills a player's hand back up to target size (default 10 cards).
 */
export function refillHand(
  deckState: DeckState,
  currentHand: Card[],
  targetSize: number = 10
): { hand: Card[]; updatedDeckState: DeckState } {
  const needed = targetSize - currentHand.length;
  if (needed <= 0) {
    return { hand: currentHand, updatedDeckState: deckState };
  }

  // Ensure hand has a customizable card
  const hasCustom = currentHand.some((c) => c.isCustomizable);
  const drawCount = hasCustom ? needed : needed - 1;

  const { cards: drawnCards, updatedDeckState } = drawWhiteCards(deckState, Math.max(0, drawCount));
  
  const extraCards = hasCustom ? drawnCards : [...drawnCards, createCustomizableCard()];
  const newHand = [...currentHand, ...extraCards];

  return {
    hand: newHand,
    updatedDeckState,
  };
}
