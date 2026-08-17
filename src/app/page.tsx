'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { HomeScreen } from '../components/screens/HomeScreen';
import { LobbyScreen } from '../components/screens/LobbyScreen';
import { GameScreen } from '../components/screens/GameScreen';

export default function Home() {
  const {
    status,
    roomCode,
    players,
    socketId,
    totalRounds,
    roundTimer,
    isGradualReveal,
    initSocketListeners,
    createRoom,
    joinRoom,
    leaveRoom,
    addBot,
    removePlayer,
    updateSettings,
    startGame,
    resetGame,
  } = useGameStore();

  useEffect(() => {
    initSocketListeners();
  }, [initSocketListeners]);

  const userPlayer = players.find((p) => p.id === socketId) || players[0] || {
    id: socketId || 'user',
    name: 'Você',
    avatar: '👑',
    color: 'from-amber-400 to-yellow-600',
    score: 0,
    isHost: false,
    isCzar: false,
    isReady: true,
    hasSubmitted: false,
  };

  if (status === 'LOBBY' && players.length > 0) {
    return (
      <LobbyScreen
        roomCode={roomCode}
        currentPlayer={userPlayer}
        players={players}
        settings={{ totalRounds, roundTimer, roomCode, maxPlayers: 10, isGradualReveal }}
        onUpdateSettings={updateSettings}
        onAddBot={(name, avatar) => addBot(name, avatar)}
        onRemovePlayer={(id) => removePlayer(id)}
        onGetRandomAvatar={useGameStore.getState().getRandomAvatar}
        onStartGame={startGame}
        onBackToHome={leaveRoom}
      />
    );
  }

  if (status === 'SUBMITTING' || status === 'JUDGING' || status === 'RESULT' || status === 'FINISHED' || status === 'PLAYING') {
    return <GameScreen onLeaveGame={resetGame} />;
  }

  return (
    <HomeScreen
      onCreateGame={(name, avatar) => createRoom(name, avatar)}
      onJoinGame={(name, avatar, code) => joinRoom(code, name, avatar)}
    />
  );
}
