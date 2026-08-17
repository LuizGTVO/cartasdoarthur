const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Cartas do Arthur - Socket.IO Server Running');
});

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const BLACK_CARDS = [
  { id: 'b_ext_1', text: 'Depois de beber 8 shots de Corote morno, a única coisa que me impediu de transar no meio da pista foi ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_2', text: 'O que o Arthur fez com a estagiária do RH durante a festa da firma no almoxarifado? ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_3', text: 'Minha mãe desmaiou ao vivo quando entrou no meu quarto sem bater e me pegou com ___ na mão.', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_4', text: 'O que não pode faltar em um surubão no motel de R$ 20 a hora com 15 pessoas? ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_5', text: 'O verdadeiro motivo pelo qual fui expulso do grupo de WhatsApp da família para sempre: ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_6', text: 'O fetiche secreto mais nojento e bizarro que eu só tenho coragem de praticar trancado no banheiro é ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_7', text: 'Para conseguir um aumento salarial com a diretoria, eu tive que oferecer ___ sem frescura.', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_8', text: 'Se o diabo em pessoa vier buscar minha alma hoje à noite no quarto, o motivo será ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_9', text: 'O que os idosos realmente fazem quando se trancam na sala do bingo no domingo? ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_10', text: 'Qual é a pior coisa para se sussurrar no ouvido do parceiro no exato momento do clímax? "___".', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_11', text: 'O presente proibido que eu dei no amigo oculto da firma que me fez ser demitido por justa causa: ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_12', text: 'O que o padre falou pra mim no confessionário antes de trancar a porta da igreja? ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_13', text: 'Minha última crise de ressaca moral começou após eu acordar pelado do lado de ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_14', text: 'O que o Arthur pesquisou na aba anônima do navegador às 4 da manhã de um domingo? ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_15', text: 'A causa real do fim do meu casamento de 7 anos foi uma discussão por causa de ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_16_2b', text: 'Na minha primeira experiência em um motel, eu troquei ___ por ___ para ver no que dava.', blanks: 2, category: '🔥 DUPLO EXTREMO' },
  { id: 'b_ext_17_2b', text: 'Para tentar curar minha impotência sexual, o médico receitou ___ misturado com ___ .', blanks: 2, category: '🔥 DUPLO EXTREMO' },
  { id: 'b_ext_18_2b', text: 'No tribunal da suruba, o juiz me condenou a 3 anos de ___ e 5 chicotadas com ___ .', blanks: 2, category: '🔥 DUPLO EXTREMO' },
  { id: 'b_ext_19_2b', text: 'Minha noite perfeita de sábado consiste em 4 horas de ___ seguidas de ___ .', blanks: 2, category: '🔥 DUPLO EXTREMO' },
  { id: 'b_ext_20_2b', text: 'O combo supremo de destruição moral: engolir ___ e logo em seguida passar ___ no corpo.', blanks: 2, category: '🔥 DUPLO EXTREMO' },
];

const WHITE_CARDS = [
  { id: 'w_ext_1', text: 'um dildo duplo de 40 cm revestido de glitter e lubrificante sabor pimenta' },
  { id: 'w_ext_2', text: 'uma orgia selvagem com 12 anões fantasiados de Teletubbies' },
  { id: 'w_ext_3', text: 'um vibrador anal com controle via inteligência artificial em pleno culto' },
  { id: 'w_ext_4', text: 'chupar o dedo do pé de uma velhinha num asilo em troca de R$ 50' },
  { id: 'w_ext_5', text: 'um nude explícito sem filtro enviado no grupo oficial da empresa' },
  { id: 'w_ext_6', text: 'uma mamada violenta dada atrás da moita da faculdade na hora do intervalo' },
  { id: 'w_ext_7', text: 'fazer sexo anal no banco de trás do Celta sem ar-condicionado no sol de 40 graus' },
  { id: 'w_ext_8', text: 'um teste de DNA positivo para 3 irmãos diferentes no programa do Ratinho' },
  { id: 'w_ext_9', text: 'uma jorrada de porra no olho durante o clímax surpresa' },
  { id: 'w_ext_10', text: 'um pênis de borracha gigante usado como peso de porta na sala de visitas' },
  { id: 'w_ext_11', text: 'uma bronca do RH após ser pego fazendo boquete no almoxarifado' },
  { id: 'w_ext_12', text: 'vender vídeos de masturbação no OnlyFans para pagar a fatura do cartão' },
  { id: 'w_ext_13', text: 'um fio-terra surpresa sem aviso prévio usando uma luva de pedreiro' },
  { id: 'w_ext_14', text: 'uma camisinha estourada e lambuzada com sabor chiclete estragado' },
  { id: 'w_ext_15', text: 'uma broxada épica de 3 horas com o crush na primeira noite no motel' },
  { id: 'w_ext_16', text: 'uma algema rosa felpuda cuja chave caiu dentro do vaso sanitário cheio' },
  { id: 'w_ext_17', text: 'usar laxante no drink do ex-namorado durante a festa de noivado' },
  { id: 'w_ext_18', text: 'uma tatuagem da cara do Kid Bengala no cóccix feita num estúdio clandestino' },
  { id: 'w_ext_19', text: 'dar em cima da própria sogra pelada na sauna da casa de praia' },
  { id: 'w_ext_20', text: 'um peido molhado com diarreia explosiva soltado no meio da orgia' },
  { id: 'w_ext_21', text: 'uma dancinha sensual do TikTok que terminou com uma hérnia de disco grave' },
  { id: 'w_ext_22', text: 'perguntar quem é o verdadeiro pai da criança na hora do parto' },
  { id: 'w_ext_23', text: 'três garrafas de Corote morno com cachaça de alambique e ódio acumulado' },
  { id: 'w_ext_24', text: 'beijar o melhor amigo na brotheragem com língua e pegada forte no banheiro' },
  { id: 'w_ext_25', text: 'um nude desfocado tirado no espelho sujo do banheiro da firma' },
  { id: 'w_ext_26', text: 'deixar o microfone ligado no Zoom enquanto gemia alto pra namorada' },
  { id: 'w_ext_27', text: 'um rito satânico com sacrifício de bode e sangue na garagem de casa' },
  { id: 'w_ext_28', text: 'pesquisar "como simular a própria morte" no Google após ser pego na mentira' },
  { id: 'w_ext_29', text: 'dormir no ônibus e acordar sem calças num motel da periferia' },
  { id: 'w_ext_30', text: 'usar molho de pimenta malagueta como lubrificante por engano no escuro' },
];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createCustomCard(playerId) {
  return {
    id: `custom_${Date.now()}_${playerId}_${Math.random().toString(36).substring(2, 6)}`,
    text: '✍️ Escreva você mesmo...',
    isCustomizable: true,
    customText: '',
  };
}

const COLOR_PRESETS = [
  'from-amber-400 to-yellow-600',
  'from-purple-400 to-pink-600',
  'from-blue-400 to-cyan-600',
  'from-emerald-400 to-teal-600',
  'from-orange-400 to-red-600',
  'from-indigo-400 to-violet-600',
  'from-rose-400 to-pink-600',
  'from-teal-400 to-cyan-600',
  'from-yellow-400 to-amber-600',
  'from-violet-400 to-purple-600',
];

const rooms = new Map();

function getSanitizedRoomState(room) {
  return {
    code: room.code,
    hostId: room.hostId,
    status: room.status,
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
  };
}

function broadcastRoomUpdate(roomCode) {
  const code = (roomCode || '').trim().toUpperCase();
  const room = rooms.get(code);
  if (!room) return;
  io.to(code).emit('room-state', getSanitizedRoomState(room));
}

function evaluateVotingWinner(room, code) {
  if (!room || room.status !== 'JUDGING') return;

  const voteCounts = {};
  Object.values(room.votes || {}).forEach((subId) => {
    voteCounts[subId] = (voteCounts[subId] || 0) + 1;
  });

  let winningSubId = null;
  let maxVotes = -1;

  room.submissions.forEach((sub) => {
    const count = voteCounts[sub.id] || 0;
    if (count > maxVotes) {
      maxVotes = count;
      winningSubId = sub.id;
    }
  });

  const winningSub = room.submissions.find((s) => s.id === winningSubId) || room.submissions[0];
  if (!winningSub) return;

  const winnerPlayer = room.players.find((p) => p.id === winningSub.playerId) || room.players[0];
  if (winnerPlayer) winnerPlayer.score += 1;

  room.roundWinner = {
    player: winnerPlayer,
    submission: winningSub,
  };

  room.status = 'RESULT';
  broadcastRoomUpdate(code);
}

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Client connected: ${socket.id}`);

  // Reconnection support for F5 page refresh
  socket.on('reconnect-player', ({ roomCode, previousPlayerId, playerName, avatar }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);

    if (!room) {
      socket.emit('reconnect-failed');
      return;
    }

    const existingPlayer = room.players.find(
      (p) => p.id === previousPlayerId
    );

    if (existingPlayer) {
      const oldId = existingPlayer.id;
      existingPlayer.id = socket.id;

      if (room.hostId === oldId) {
        room.hostId = socket.id;
      }

      if (room.playerHands[oldId]) {
        room.playerHands[socket.id] = room.playerHands[oldId];
        delete room.playerHands[oldId];
      }

      socket.join(code);
      socket.emit('room-joined', { roomCode: code, playerId: socket.id });
      broadcastRoomUpdate(code);
    } else {
      socket.emit('reconnect-failed');
    }
  });

  // Event 1: create-room
  socket.on('create-room', ({ playerName, avatar }) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    socket.join(roomCode);

    const nameToUse = (playerName || '').trim() || `Jogador #${Math.floor(Math.random() * 899) + 100}`;

    const hostPlayer = {
      id: socket.id,
      name: nameToUse,
      avatar: avatar || '👑',
      color: COLOR_PRESETS[0],
      score: 0,
      isHost: true,
      isCzar: false,
      isReady: true,
      hasSubmitted: false,
    };

    const newRoom = {
      code: roomCode,
      hostId: socket.id,
      status: 'LOBBY',
      players: [hostPlayer],
      currentCzarIndex: 0,
      roundNumber: 1,
      totalRounds: 10,
      roundTimer: 60,
      isGradualReveal: false,
      revealedSubmissionIds: [],
      promptCard: null,
      playerHands: {},
      submissions: [],
      anonymizedSubmissions: [],
      votes: {},
      roundWinner: null,
      drawBlackPile: shuffle(BLACK_CARDS),
      drawWhitePile: shuffle(WHITE_CARDS),
      discardBlackPile: [],
      discardWhitePile: [],
    };

    rooms.set(roomCode, newRoom);
    socket.emit('room-created', { roomCode, playerId: socket.id });
    broadcastRoomUpdate(roomCode);
  });

  // Event 2: join-room
  socket.on('join-room', ({ roomCode, playerName, avatar }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);

    if (!room) {
      socket.emit('error-message', `Sala "${code}" não existe!`);
      return;
    }

    if (room.players.length >= 10) {
      socket.emit('error-message', `A sala "${code}" já atingiu o limite máximo de 10 jogadores!`);
      return;
    }

    let nameToUse = (playerName || '').trim();
    if (!nameToUse) {
      nameToUse = `Jogador #${room.players.length + 1}`;
    }

    const nameExists = room.players.some((p) => p.name.toLowerCase() === nameToUse.toLowerCase());
    if (nameExists) {
      nameToUse = `${nameToUse} (${room.players.length + 1})`;
    }

    socket.join(code);

    const newPlayer = {
      id: socket.id,
      name: nameToUse,
      avatar: avatar || '🚀',
      color: COLOR_PRESETS[room.players.length % COLOR_PRESETS.length],
      score: 0,
      isHost: false,
      isCzar: false,
      isReady: true,
      hasSubmitted: false,
    };

    room.players.push(newPlayer);

    if (room.status !== 'LOBBY') {
      const drawn = room.drawWhitePile.splice(0, 10);
      room.playerHands[socket.id] = [...drawn];
    }

    socket.emit('room-joined', { roomCode: code, playerId: socket.id });
    broadcastRoomUpdate(code);
  });

  // Event: update-settings
  socket.on('update-settings', ({ roomCode, totalRounds, roundTimer, isGradualReveal }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room) return;

    const player = room.players.find((p) => p.id === socket.id);
    const isHostSocket =
      socket.id === room.hostId ||
      player?.isHost ||
      (room.players.length > 0 && room.players[0].id === socket.id);

    if (!isHostSocket) {
      socket.emit('error-message', 'Apenas o Host pode alterar as regras da sala!');
      return;
    }

    if (typeof totalRounds === 'number') room.totalRounds = totalRounds;
    if (typeof roundTimer === 'number') room.roundTimer = roundTimer;
    if (typeof isGradualReveal === 'boolean') room.isGradualReveal = isGradualReveal;

    broadcastRoomUpdate(code);
  });

  // Event: reveal-submission
  socket.on('reveal-submission', ({ roomCode, submissionId }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room || room.status !== 'JUDGING') return;

    if (!room.revealedSubmissionIds) room.revealedSubmissionIds = [];

    if (submissionId) {
      if (!room.revealedSubmissionIds.includes(submissionId)) {
        room.revealedSubmissionIds.push(submissionId);
      }
    } else {
      const unrevealed = room.anonymizedSubmissions.find(
        (s) => !room.revealedSubmissionIds.includes(s.id)
      );
      if (unrevealed) {
        room.revealedSubmissionIds.push(unrevealed.id);
      }
    }

    broadcastRoomUpdate(code);
  });

  // Event: vote-card
  socket.on('vote-card', ({ roomCode, submissionId }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room || room.status !== 'JUDGING') return;

    if (!room.votes) room.votes = {};
    room.votes[socket.id] = submissionId;

    broadcastRoomUpdate(code);

    const humanPlayers = room.players.filter((p) => !p.isBot);
    const humanVotedAll = humanPlayers.every((p) => room.votes && room.votes[p.id]);

    if (humanVotedAll) {
      evaluateVotingWinner(room, code);
    }
  });

  // Event 3: add-bot
  socket.on('add-bot', ({ roomCode, botName, avatar }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room) return;

    const player = room.players.find((p) => p.id === socket.id);
    const isHostSocket =
      socket.id === room.hostId ||
      player?.isHost ||
      (room.players.length > 0 && room.players[0].id === socket.id);

    if (!isHostSocket) {
      socket.emit('error-message', 'Apenas o Host pode adicionar bots!');
      return;
    }

    if (room.players.length >= 10) {
      socket.emit('error-message', 'Limite máximo de 10 jogadores atingido!');
      return;
    }

    const botId = `bot_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const botPlayer = {
      id: botId,
      name: botName || `Bot ${room.players.length + 1}`,
      avatar: avatar || '🤖',
      color: COLOR_PRESETS[room.players.length % COLOR_PRESETS.length],
      score: 0,
      isHost: false,
      isCzar: false,
      isReady: true,
      hasSubmitted: false,
      isBot: true,
    };

    room.players.push(botPlayer);

    if (room.status !== 'LOBBY') {
      const drawn = room.drawWhitePile.splice(0, 10);
      room.playerHands[botId] = [...drawn];
    }

    broadcastRoomUpdate(code);
  });

  // Event 4: remove-player
  socket.on('remove-player', ({ roomCode, playerId }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room) return;

    const player = room.players.find((p) => p.id === socket.id);
    const isHostSocket =
      socket.id === room.hostId ||
      player?.isHost ||
      (room.players.length > 0 && room.players[0].id === socket.id);

    if (!isHostSocket && socket.id !== playerId) {
      socket.emit('error-message', 'Apenas o Host pode remover jogadores!');
      return;
    }

    room.players = room.players.filter((p) => p.id !== playerId);
    delete room.playerHands[playerId];

    if (room.players.length > 0 && !room.players.some((p) => p.isHost)) {
      room.players[0].isHost = true;
      room.hostId = room.players[0].id;
    }

    broadcastRoomUpdate(code);
  });

  // Event 5: start-game
  socket.on('start-game', ({ roomCode }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room) return;

    const player = room.players.find((p) => p.id === socket.id);
    const isHostSocket =
      socket.id === room.hostId ||
      player?.isHost ||
      (room.players.length > 0 && room.players[0].id === socket.id);

    if (!isHostSocket) {
      socket.emit('error-message', 'Apenas o Host pode iniciar a partida!');
      return;
    }

    if (room.players.length < 4) {
      socket.emit('error-message', 'São necessários no mínimo 4 jogadores para iniciar a partida!');
      return;
    }

    room.drawBlackPile = shuffle(BLACK_CARDS);
    room.drawWhitePile = shuffle(WHITE_CARDS);
    room.roundNumber = 1;
    room.currentCzarIndex = 0;
    room.submissions = [];
    room.anonymizedSubmissions = [];
    room.revealedSubmissionIds = [];
    room.votes = {};
    room.roundWinner = null;

    room.promptCard = room.drawBlackPile.shift();

    const coringaPlayerIndex = Math.floor(Math.random() * room.players.length);

    room.playerHands = {};
    room.players.forEach((p, idx) => {
      p.score = 0;
      p.isCzar = false;
      p.hasSubmitted = false;

      if (idx === coringaPlayerIndex) {
        const drawn = room.drawWhitePile.splice(0, 9);
        room.playerHands[p.id] = [...drawn, createCustomCard(p.id)];
      } else {
        const drawn = room.drawWhitePile.splice(0, 10);
        room.playerHands[p.id] = [...drawn];
      }
    });

    room.status = 'SUBMITTING';
    broadcastRoomUpdate(code);
    triggerBotSubmissions(code);
  });

  // Event 6: submit-card
  socket.on('submit-card', ({ roomCode, cardIds, customText, customText1, customText2 }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room || room.status !== 'SUBMITTING') return;

    const player = room.players.find((p) => p.id === socket.id);
    if (!player || player.hasSubmitted) {
      socket.emit('error-message', 'Você já enviou sua resposta nesta rodada!');
      return;
    }

    const hand = room.playerHands[socket.id] || [];
    const requiredBlanks = room.promptCard?.blanks || 1;

    if (!cardIds || cardIds.length < requiredBlanks) {
      socket.emit('error-message', `Selecione ${requiredBlanks} carta(s)!`);
      return;
    }

    const card1 = hand.find((c) => c.id === cardIds[0]);
    const card2 = requiredBlanks === 2 ? hand.find((c) => c.id === cardIds[1]) : undefined;

    if (!card1) return;

    if (card1.isCustomizable) {
      card1.customText = customText1 !== undefined ? customText1 : (customText !== undefined ? customText : (card1.customText || ''));
    }
    if (card2 && card2.isCustomizable) {
      card2.customText = customText2 !== undefined ? customText2 : (customText !== undefined ? customText : (card2.customText || ''));
    }

    const usedIds = new Set(cardIds);
    room.playerHands[socket.id] = hand.filter((c) => !usedIds.has(c.id));

    room.submissions.push({
      id: `sub_${Date.now()}_${socket.id}`,
      playerId: socket.id,
      card: { ...card1 },
      secondCard: card2 ? { ...card2 } : undefined,
    });

    player.hasSubmitted = true;
    broadcastRoomUpdate(code);

    if (room.players.every((p) => p.hasSubmitted)) {
      room.status = 'JUDGING';
      room.anonymizedSubmissions = shuffle(
        room.submissions.map((s) => ({
          id: s.id,
          card: s.card,
          secondCard: s.secondCard,
        }))
      );
      room.revealedSubmissionIds = room.isGradualReveal ? [] : room.anonymizedSubmissions.map((s) => s.id);
      room.votes = {};

      triggerBotVotes(room, code);
      broadcastRoomUpdate(code);
    }
  });

  // Event 8: next-round
  socket.on('next-round', ({ roomCode }) => {
    const code = (roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room) return;

    if (room.roundNumber >= room.totalRounds) {
      room.status = 'FINISHED';
      broadcastRoomUpdate(code);
      return;
    }

    room.roundNumber += 1;

    if (room.drawBlackPile.length === 0) room.drawBlackPile = shuffle(BLACK_CARDS);
    room.promptCard = room.drawBlackPile.shift();

    const hasAnyCoringa = room.players.some((p) => {
      const pHand = room.playerHands[p.id] || [];
      return pHand.some((c) => c.isCustomizable);
    });

    let targetCoringaPlayerId = null;
    if (!hasAnyCoringa && room.players.length > 0) {
      const luckyIndex = Math.floor(Math.random() * room.players.length);
      targetCoringaPlayerId = room.players[luckyIndex].id;
    }

    room.players.forEach((p) => {
      p.isCzar = false;
      p.hasSubmitted = false;

      let pHand = room.playerHands[p.id] || [];
      const isLucky = p.id === targetCoringaPlayerId;

      if (isLucky) {
        const needed = 9 - pHand.length;
        if (needed > 0) {
          if (room.drawWhitePile.length < needed) room.drawWhitePile = shuffle(WHITE_CARDS);
          const drawn = room.drawWhitePile.splice(0, needed);
          pHand = [...pHand, ...drawn];
        }
        pHand.push(createCustomCard(p.id));
      } else {
        const needed = 10 - pHand.length;
        if (needed > 0) {
          if (room.drawWhitePile.length < needed) room.drawWhitePile = shuffle(WHITE_CARDS);
          const drawn = room.drawWhitePile.splice(0, needed);
          pHand = [...pHand, ...drawn];
        }
      }
      room.playerHands[p.id] = pHand;
    });

    room.submissions = [];
    room.anonymizedSubmissions = [];
    room.revealedSubmissionIds = [];
    room.votes = {};
    room.roundWinner = null;
    room.status = 'SUBMITTING';

    broadcastRoomUpdate(code);
    triggerBotSubmissions(code);
  });

  // Event 9: leave-room / disconnect
  socket.on('leave-room', ({ roomCode }) => {
    handlePlayerLeave(socket, roomCode);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    for (const [code, room] of rooms.entries()) {
      if (room.players.some((p) => p.id === socket.id)) {
        handlePlayerLeave(socket, code);
      }
    }
  });
});

function handlePlayerLeave(socket, roomCode) {
  const code = (roomCode || '').trim().toUpperCase();
  const room = rooms.get(code);
  if (!room) return;

  socket.leave(code);
  room.players = room.players.filter((p) => p.id !== socket.id);
  delete room.playerHands[socket.id];

  if (room.players.length === 0) {
    rooms.delete(code);
  } else {
    if (!room.players.some((p) => p.isHost)) {
      room.players[0].isHost = true;
      room.hostId = room.players[0].id;
    }
    broadcastRoomUpdate(code);
  }
}

function triggerBotSubmissions(roomCode) {
  const code = (roomCode || '').trim().toUpperCase();
  const room = rooms.get(code);
  if (!room || room.status !== 'SUBMITTING') return;

  const requiredBlanks = room.promptCard?.blanks || 1;

  room.players.forEach((p) => {
    if (!p.isBot || p.hasSubmitted) return;

    let pHand = room.playerHands[p.id] || [];
    if (pHand.length < requiredBlanks) {
      pHand = shuffle(WHITE_CARDS).slice(0, 10);
      room.playerHands[p.id] = pHand;
    }

    const c1 = pHand[0];
    const c2 = requiredBlanks === 2 ? pHand[1] : undefined;

    if (c1) {
      room.submissions.push({
        id: `sub_${Date.now()}_${p.id}`,
        playerId: p.id,
        card: c1,
        secondCard: c2,
      });
      p.hasSubmitted = true;
    }
  });

  if (room.players.every((p) => p.hasSubmitted)) {
    room.status = 'JUDGING';
    room.anonymizedSubmissions = shuffle(
      room.submissions.map((s) => ({
        id: s.id,
        card: s.card,
        secondCard: s.secondCard,
      }))
    );
    room.revealedSubmissionIds = room.isGradualReveal ? [] : room.anonymizedSubmissions.map((s) => s.id);
    room.votes = {};

    triggerBotVotes(room, code);
  }

  broadcastRoomUpdate(code);
}

function triggerBotVotes(room, code) {
  if (!room.anonymizedSubmissions.length) return;
  if (!room.votes) room.votes = {};

  room.players.forEach((p) => {
    if (p.isBot && !room.votes[p.id]) {
      const randomSub = room.anonymizedSubmissions[Math.floor(Math.random() * room.anonymizedSubmissions.length)];
      if (randomSub) room.votes[p.id] = randomSub.id;
    }
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(` Cartas do Arthur - Socket.IO Server running on port ${PORT}`);
});
