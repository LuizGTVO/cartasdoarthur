const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Cartas do Arthur - Socket.IO Server Running on Render');
});

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const BLACK_CARDS = [
  { id: 'b_usr_1', text: 'Minha avó diz que o segredo para um casamento duradouro é ___ .', blanks: 1, category: 'Família' },
  { id: 'b_usr_2', text: 'O que a NASA descobriu escondido no lado oculto da Lua? ___ .', blanks: 1, category: 'Espaço' },
  { id: 'b_usr_3', text: 'Minha última crise existencial foi causada por ___ .', blanks: 1, category: 'Crise' },
  { id: 'b_usr_4', text: 'Querido Papai Noel, este ano eu fui uma boa pessoa, então eu mereço ___ .', blanks: 1, category: 'Natal' },
  { id: 'b_usr_5', text: 'O novo reality show da TV aberta vai confinar 12 pessoas em uma sala com ___ .', blanks: 1, category: 'Reality' },
  { id: 'b_usr_6', text: 'Qual é o verdadeiro motivo do trânsito na Avenida Paulista? ___ .', blanks: 1, category: 'Trânsito' },
  { id: 'b_usr_7', text: '___ : o verdadeiro motivo de eu não conseguir pagar minhas contas.', blanks: 1, category: 'Finanças' },
  { id: 'b_usr_8', text: 'Desculpe o atraso, chefe. Eu estava ocupado com ___ .', blanks: 1, category: 'Firma' },
  { id: 'b_usr_9', text: 'O que o Batman faz quando o Alfred não está olhando? ___ .', blanks: 1, category: 'Heróis' },
  { id: 'b_usr_10', text: 'O Ministério da Saúde adverte: o consumo excessivo de ___ pode causar efeitos colaterais.', blanks: 1, category: 'Saúde' },
  { id: 'b_usr_11', text: 'Minha mãe me pegou no flagra enquanto eu tentava ___ .', blanks: 1, category: 'Flagrante' },
  { id: 'b_usr_12', text: 'O que realmente move a economia brasileira hoje em dia? ___ .', blanks: 1, category: 'Economia' },
  { id: 'b_usr_13', text: 'No meu primeiro dia de aula na faculdade, eu levei ___ por engano.', blanks: 1, category: 'Faculdade' },
  { id: 'b_usr_14', text: 'Qual é o novo critério de contratação nas grandes empresas de tecnologia? ___ .', blanks: 1, category: 'Tech' },
  { id: 'b_usr_15', text: 'O que os idosos conversam na fila do banco? ___ .', blanks: 1, category: 'Fila' },
  { id: 'b_usr_16', text: 'A inteligência artificial agora é capaz de simular ___ .', blanks: 1, category: 'IA' },
  { id: 'b_usr_17', text: 'O que me faz esquecer de todas as minhas promessas de ano novo? ___ .', blanks: 1, category: 'Réveillon' },
  { id: 'b_usr_18', text: 'Qual é a pior coisa para se encontrar dentro de um pastel de feira? ___ .', blanks: 1, category: 'Feira' },
  { id: 'b_usr_19', text: '___ : a única coisa que me mantém acordado às 3 da manhã.', blanks: 1, category: 'Insônia' },
  { id: 'b_usr_20', text: 'No fundo do poço, a única coisa que me restou foi ___ .', blanks: 1, category: 'Drama' },
  { id: 'b_usr_21', text: 'O que os políticos prometem mas nunca vão cumprir? ___ .', blanks: 1, category: 'Política' },
  { id: 'b_usr_22', text: 'Minha psicóloga disse que meu maior gatilho emocional é ___ .', blanks: 1, category: 'Terapia' },
  { id: 'b_usr_23', text: 'Qual será a próxima grande tendência entre os influenciadores digitais? ___ .', blanks: 1, category: 'Internet' },
  { id: 'b_usr_24', text: 'Eu nunca entro em um avião sem levar ___ .', blanks: 1, category: 'Viagem' },
  { id: 'b_usr_25', text: 'O que arruinou o almoço de domingo em família? ___ .', blanks: 1, category: 'Família' },
  { id: 'b_usr_26', text: 'Qual é a primeira coisa que o presidente faz ao acordar? ___ .', blanks: 1, category: 'Governo' },
  { id: 'b_usr_27', text: '___ : o motivo pelo qual eu fui expulso do grupo da igreja.', blanks: 1, category: 'Igreja' },
  { id: 'b_usr_28', text: 'O que os cientistas encontraram no fundo da Fossa das Marianas? ___ .', blanks: 1, category: 'Ciência' },
  { id: 'b_usr_29', text: 'Minha dieta foi completamente destruída por culpa de ___ .', blanks: 1, category: 'Dieta' },
  { id: 'b_usr_30', text: 'Qual é o item mais roubado nos hotéis cinco estrelas? ___ .', blanks: 1, category: 'Hotel' },
  { id: 'b_usr_31', text: 'No futuro, as pessoas vão olhar para trás e se envergonhar de ___ .', blanks: 1, category: 'Futuro' },
  { id: 'b_usr_32', text: 'O que o departamento de RH usa para torturar os funcionários novos? ___ .', blanks: 1, category: 'RH' },
  { id: 'b_usr_33', text: '___ é a única razão pela qual eu ainda não desisti de tudo.', blanks: 1, category: 'Vida' },
  { id: 'b_usr_34', text: 'Qual é o segredo por trás do sucesso dos coaches de finanças? ___ .', blanks: 1, category: 'Coach' },
  { id: 'b_usr_35', text: 'O que meu gato planeja enquanto fica me encarando no escuro? ___ .', blanks: 1, category: 'Gatos' },
  { id: 'b_usr_36', text: 'Minha maior habilidade no currículo é, na verdade, ___ .', blanks: 1, category: 'Currículo' },
  { id: 'b_usr_37', text: 'O que os extraterrestres pensam quando olham para a Terra? ___ .', blanks: 1, category: 'ETs' },
  { id: 'b_usr_38', text: '___ : o tema principal do meu próximo livro de memórias.', blanks: 1, category: 'Livro' },
  { id: 'b_usr_39', text: 'O que você ganha se misturar energético, café puro e desespero? ___ .', blanks: 1, category: 'Café' },
  { id: 'b_usr_40', text: 'Qual é a fantasia sexual mais secreta do seu vizinho? ___ .', blanks: 1, category: 'Fetiche' },
  { id: 'b_usr_41', text: 'O que causou o cancelamento repentino do show da banda de rock? ___ .', blanks: 1, category: 'Música' },
  { id: 'b_usr_42', text: 'Minha herança vai ser composta inteiramente por ___ .', blanks: 1, category: 'Herança' },
  { id: 'b_usr_43', text: 'O que acontece quando você deixa dois estagiários sozinhos na empresa? ___ .', blanks: 1, category: 'Estagiário' },
  { id: 'b_usr_44', text: '___ é a solução definitiva para o aquecimento global.', blanks: 1, category: 'Clima' },
  { id: 'b_usr_45', text: 'Qual é o assunto preferido dos tios no churrasco? ___ .', blanks: 1, category: 'Churrasco' },
  { id: 'b_usr_46', text: 'O que o juiz aceitou como suborno para encerrar o caso? ___ .', blanks: 1, category: 'Justiça' },
  { id: 'b_usr_47', text: 'Minha vida amorosa pode ser resumida na seguinte frase: ___ .', blanks: 1, category: 'Amor' },
  { id: 'b_usr_48', text: 'O que as pessoas usam para disfarçar o mau hálito pela manhã? ___ .', blanks: 1, category: 'Higiene' },
  { id: 'b_usr_49', text: 'Qual é o verdadeiro ingrediente secreto daquela lanchonete barata? ___ .', blanks: 1, category: 'Comida' },
  { id: 'b_usr_50', text: '___ : a pior coisa para se comentar na foto de um bebê.', blanks: 1, category: 'Bebê' },
  { id: 'b_ext_1', text: 'Depois de beber 8 shots de Corote morno, a única coisa que me impediu de transar no meio da pista foi ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_2', text: 'O que o Arthur fez com a estagiária do RH durante a festa da firma no almoxarifado? ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_3', text: 'Minha mãe desmaiou ao vivo quando entrou no meu quarto sem bater e me pegou com ___ na mão.', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_4', text: 'O que não pode faltar em um surubão no motel de R$ 20 a hora com 15 pessoas? ___ .', blanks: 1, category: '+18 Pesadíssimo' },
  { id: 'b_ext_5', text: 'O verdadeiro motivo pelo qual fui expulso do grupo de WhatsApp da família para sempre: ___ .', blanks: 1, category: '+18 Pesadíssimo' },
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
  { id: 'w_ext_31', text: 'chamar a parceira pelo nome da própria mãe na hora H' },
  { id: 'w_ext_32', text: 'vazar prints de conversas sensíveis no Twitter para destruir o ex' },
  { id: 'w_ext_33', text: 'uma camisinha vencida em 2015 grudada na carteira de couro' },
  { id: 'w_ext_34', text: 'acordar num motel barato vestindo apenas uma máscara de couro BDSM' },
  { id: 'w_ext_35', text: 'subir na mesa do restaurante pelado gritando ofensas impublicáveis' },
  { id: 'w_ext_36', text: 'perder um rim numa aposta de jogo bicho com o agiota do bairro' },
  { id: 'w_ext_37', text: 'uma conta de motel de R$ 800 paga no Pix parcelada em 12x com juros' },
  { id: 'w_ext_38', text: 'fingir que é mudo para não ter que dar explicações para a polícia' },
  { id: 'w_ext_39', text: 'falar "com todo respeito" segundos antes de desferir um xingamento pesado' },
  { id: 'w_ext_40', text: 'uma foto íntima enviada no grupo de pais da escola sem querer' },
  { id: 'w_ext_41', text: 'um tapa na cara bem dado com força máxima no momento do clímax' },
  { id: 'w_ext_42', text: 'gastar a aposentadoria da avó em caixinhas do Jogo do Tigrinho' },
  { id: 'w_ext_43', text: 'um fio de cabelo pubiano encontrado no meio da coxinha de frango' },
  { id: 'w_ext_44', text: 'entrar na sauna errada da academia e ver uma suruba de idosos' },
  { id: 'w_ext_45', text: 'um fetiche secreto por pessoas fantasiadas de mascote de futebol' },
  { id: 'w_ext_46', text: 'roubar os docinhos e os presentes do aniversário de criança' },
  { id: 'w_ext_47', text: 'um plug anal com rabo de raposa usado durante o trabalho presencial' },
  { id: 'w_ext_48', text: 'fazer xixi na piscina do clube e nadar disfarçado para o outro lado' },
  { id: 'w_ext_49', text: 'um áudio de 10 minutos bêbado chorando e pedindo desculpas pro chefe' },
  { id: 'w_ext_50', text: 'um banho de assento com chá de camomila após uma transa violenta sem lubrificante' },
  { id: 'w_ext_51', text: 'a lista secreta de clientes do avião privado do Jeffrey Epstein' },
  { id: 'w_ext_52', text: 'sacrificar o primogênito num altar em chamas dedicado ao diabo' },
  { id: 'w_ext_53', text: 'uma festa privada de bilionários com consumo descontrolado de substâncias' },
  { id: 'w_ext_54', text: 'lavagem de dinheiro milionária usando ONGs falsas de animais' },
  { id: 'w_ext_55', text: 'vender a alma pro diabo por um cargo de confiança na prefeitura' },
  { id: 'w_ext_56', text: 'uma seita secreta que faz rituais nos fundos de uma padaria de bairro' },
  { id: 'w_ext_57', text: 'o assassinato encomendado de um delator com 4 tiros nas costas' },
  { id: 'w_ext_58', text: 'um transplante de rim clandestino feito numa mesa de sinuca suja' },
  { id: 'w_ext_59', text: 'rituais bizarras de transfusão de sangue de jovens em milionários' },
  { id: 'w_ext_60', text: 'testar produtos de limpeza tóxicos diretamente em órfãos' },
  { id: 'w_ext_61', text: 'uma inteligência artificial treinada apenas com comentários do X/Twitter' },
  { id: 'w_ext_62', text: 'subornar o legista para declarar morte natural num assassinato brutal' },
  { id: 'w_ext_63', text: 'a coleção particular de crânios humanos guardada no armário da família' },
  { id: 'w_ext_64', text: 'apagar as câmeras de segurança da prisão no momento do crime' },
  { id: 'w_ext_65', text: 'um esquema de pirâmide financeira macabro que ruiu a vida dos fiéis' },
  { id: 'w_ext_66', text: 'financiamento ilegal de campanhas de políticos feito por cartéis de drogas' },
  { id: 'w_ext_67', text: 'falsificar o testamento da vovó com demência para ficar com a casa' },
  { id: 'w_ext_68', text: 'um experimento psicológico militar que deixou uma cidade louca' },
  { id: 'w_ext_69', text: 'usar cadáveres desenterrados para gravações de filmes de baixo orçamento' },
  { id: 'w_ext_70', text: 'vender água benta batizada com laxante e droga na porta da igreja' },
  { id: 'w_ext_71', text: 'desviar a verba da merenda de crianças pobres para comprar um iate' },
  { id: 'w_ext_72', text: 'o porão secreto da pizzaria que serve de fachada para tráfico ilícito' },
  { id: 'w_ext_73', text: 'um pacto de sangue com o demônio assinado com uma caneta que falha' },
  { id: 'w_ext_74', text: 'vender passaportes falsos para foragidos da justiça em praias isoladas' },
  { id: 'w_ext_75', text: 'um laboratório subterrâneo secreto focado em experimentos genéticos' },
  { id: 'w_ext_76', text: 'um cruzeiro de luxo exclusivo para sonegadores de impostos e golpistas' },
  { id: 'w_ext_77', text: 'agência de viagens levando turistas ricos para zonas de guerra em tempo real' },
  { id: 'w_ext_78', text: 'a autópsia ilegal de um extraterrestre realizada no balcão do bar' },
  { id: 'w_ext_79', text: 'o tráfico de receitas falsificadas de remédios tarja preta na porta do hospital' },
  { id: 'w_ext_80', text: 'um fundo de investimento que lucra com a falência e miséria de famílias' },
  { id: 'w_ext_81', text: 'chupar o mamilo do chefe por engano durante uma brincadeira de cego' },
  { id: 'w_ext_82', text: 'um pacote de camisinhas sabor bacon usadas no motel de beira de estrada' },
  { id: 'w_ext_83', text: 'um nude de ângulo inferior revelando 3 queixos e a vergonha na cara' },
  { id: 'w_ext_84', text: 'uma calcinha de rendinha vermelha achada enrolada no câmbio do carro' },
  { id: 'w_ext_85', text: 'um tinder gold pago só para dar match com prostitutas da região' },
  { id: 'w_ext_86', text: 'fazer sexo oral num carro em movimento e bater direto no poste de luz' },
  { id: 'w_ext_87', text: 'uma camisinha de morango que estourou no primeiro minuto de penetração' },
  { id: 'w_ext_88', text: 'perder a virgindade no banco de trás da van do transporte escolar' },
  { id: 'w_ext_89', text: 'um broxa devastador no momento exato em que a gata tirou a roupa' },
  { id: 'w_ext_90', text: 'um peido alto e com cheiro de ovo estragado soltado no clímax da transa' },
  { id: 'w_ext_91', text: 'um surubão na piscina do condomínio que terminou com a polícia na porta' },
  { id: 'w_ext_92', text: 'dar um beijo de língua no cachorro por engano no escuro do quarto' },
  { id: 'w_ext_93', text: 'usar creme de assadura de bebê como lubrificante de emergência' },
  { id: 'w_ext_94', text: 'uma mordida com força exagerada que rasgou o lábio da parceira' },
  { id: 'w_ext_95', text: 'um preservativo preso no canal vaginal retirado com uma pinça na emergência' },
  { id: 'w_ext_96', text: 'uma foto do pênis enviada no grupo da família com a legenda "boa noite"' },
  { id: 'w_ext_97', text: 'transar no tapete da sala e ficar com as costas todas assadas de ardor' },
  { id: 'w_ext_98', text: 'um vibrador gigante escondido dentro da bíblia da vovó' },
  { id: 'w_ext_99', text: 'um flagrante do sogro usando as calcinhas da esposa na cozinha' },
  { id: 'w_ext_100', text: 'uma jorrada surpresa de vômito após 10 shots de tequila na balada' },
];

function shuffle(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function drawWhiteCards(room, count) {
  const drawn = [];
  for (let i = 0; i < count; i++) {
    if (!room.drawWhitePile || room.drawWhitePile.length === 0) {
      room.drawWhitePile = shuffle(WHITE_CARDS);
    }
    drawn.push(room.drawWhitePile.shift());
  }
  return drawn;
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
  console.log(`[Render Backend] Socket connected: ${socket.id}`);

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
      const drawn = drawWhiteCards(room, 10);
      room.playerHands[socket.id] = [...drawn];
    }

    socket.emit('room-joined', { roomCode: code, playerId: socket.id });
    broadcastRoomUpdate(code);
  });

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
      const drawn = drawWhiteCards(room, 10);
      room.playerHands[botId] = [...drawn];
    }

    broadcastRoomUpdate(code);
  });

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
        const drawn = drawWhiteCards(room, 9);
        room.playerHands[p.id] = [...drawn, createCustomCard(p.id)];
      } else {
        const drawn = drawWhiteCards(room, 10);
        room.playerHands[p.id] = [...drawn];
      }
    });

    room.status = 'SUBMITTING';
    broadcastRoomUpdate(code);
    triggerBotSubmissions(code);
  });

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

    if (!room.drawBlackPile || room.drawBlackPile.length === 0) {
      room.drawBlackPile = shuffle(BLACK_CARDS);
    }
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
          const drawn = drawWhiteCards(room, needed);
          pHand = [...pHand, ...drawn];
        }
        pHand.push(createCustomCard(p.id));
      } else {
        const needed = 10 - pHand.length;
        if (needed > 0) {
          const drawn = drawWhiteCards(room, needed);
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

  socket.on('leave-room', ({ roomCode }) => {
    handlePlayerLeave(socket, roomCode);
  });

  socket.on('disconnect', () => {
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
      pHand = drawWhiteCards(room, 10);
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
  console.log(`[Render Backend] Server running on port ${PORT}`);
});
