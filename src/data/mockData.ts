import { Card, Player } from '../types/game';

export const INITIAL_PROMPT_CARDS: Card[] = [
  // 1-Blank Prompts
  { id: 'p1', text: 'Não há nada melhor do que começar o domingo com ___.', blanks: 1, category: 'F.D.P. Clássico' },
  { id: 'p2', text: 'O verdadeiro motivo do grupo de WhatsApp ter sido apagado foi ___.', blanks: 1, category: 'F.D.P. Polêmica' },
  { id: 'p3', text: 'O que o Arthur esconde debaixo da cama para ninguém ver? ___.', blanks: 1, category: 'F.D.P. Segredos' },
  { id: 'p4', text: 'Estudos comprovam que 9 em cada 10 médicos recomendam ___ para ter uma vida saudável.', blanks: 1, category: 'F.D.P. Ciência' },
  { id: 'p5', text: 'Minha vida amorosa pode ser definida simplesmente por ___.', blanks: 1, category: 'F.D.P. Amor' },
  { id: 'p6', text: 'Na festa de fim de ano da firma, o RH teve que intervir por causa de ___.', blanks: 1, category: 'F.D.P. Firma' },
  { id: 'p7', text: 'O segredo para transformar qualquer churrasco em um evento inesquecível é ___.', blanks: 1, category: 'F.D.P. Churrasco' },
  { id: 'p8', text: 'Se eu for direto para o inferno sem passar pelo purgatório, o motivo será ___.', blanks: 1, category: 'F.D.P. Pecados' },
  { id: 'p9', text: 'O item obrigatório na suíte presidencial do motel de R$ 30 a hora é ___.', blanks: 1, category: 'F.D.P. Motel' },
  { id: 'p10', text: 'O presente mais inadequado para dar no aniversário da sua vovó é ___.', blanks: 1, category: 'F.D.P. Família' },
  { id: 'p11', text: 'O que o padre sussurrou no ouvido do noivo antes de cancelar o casamento? ___.', blanks: 1, category: 'F.D.P. Tabu' },
  { id: 'p12', text: 'Para animar um velório de 24 horas no meio da madrugada, traga ___.', blanks: 1, category: 'F.D.P. Humor Negro' },
  { id: 'p13', text: 'O presente perfeito de amigo secreto para aquele colega de trabalho insuportável é ___.', blanks: 1, category: 'F.D.P. Vingança' },
  { id: 'p14', text: 'O que o Arthur pesquisou na aba anônima às 3 da manhã de um domingo? ___.', blanks: 1, category: 'F.D.P. Histórico' },

  // 2-Blank Prompts (PROMPTS DE 2 COMPLEMENTOS!)
  { id: 'p15_2b', text: 'Para conseguir ___, o Arthur ofereceu ___ sem pensar duas vezes.', blanks: 2, category: '🔥 DUPLA LACUNA' },
  { id: 'p16_2b', text: 'O segredo para transformar ___ em ___ é colocar na air fryer.', blanks: 2, category: '🔥 DUPLA LACUNA' },
  { id: 'p17_2b', text: 'Tudo começou quando eu mudei minha dieta de ___ para ___ .', blanks: 2, category: '🔥 DUPLA LACUNA' },
  { id: 'p18_2b', text: 'Na minha juventude eu me vuncionei em ___ , mas hoje só vivo de ___ .', blanks: 2, category: '🔥 DUPLA LACUNA' },
  { id: 'p19_2b', text: 'A receita do sucesso nos negócios: comece com ___ e termine com ___ .', blanks: 2, category: '🔥 DUPLA LACUNA' },
  { id: 'p20_2b', text: 'No tribunal, o juiz me deu a escolha entre ___ ou ___ .', blanks: 2, category: '🔥 DUPLA LACUNA' },

  { id: 'p21', text: 'O fetiche mais bizarro que eu só tenho coragem de confessar bêbado é ___.', blanks: 1, category: '+18 Fetiche' },
  { id: 'p22', text: 'Após a quinta dose de tequila no camarote, meu superpoder vira ___.', blanks: 1, category: 'F.D.P. Rolê' },
  { id: 'p23', text: 'Na hora H no quarto, a pior coisa para se falar no ouvido é: "___".', blanks: 1, category: '+18 Hora H' },
  { id: 'p24', text: 'O motivo pelo qual fui banido da ceia de Natal em família foi ___.', blanks: 1, category: 'F.D.P. Natal' },
  { id: 'p25', text: 'O que o vizinho guarda na varanda de madrugada que assusta o prédio todo? ___.', blanks: 1, category: 'F.D.P. Vizinho' },
];

export const INITIAL_ANSWER_CARDS: Card[] = [
  // Short / Random / Shocking Noun Cards
  { id: 'a_rand1', text: 'um judeu ortodoxo num skate elétrico' },
  { id: 'a_rand2', text: 'o Faustão usando lingerie de renda vermelha' },
  { id: 'a_rand3', text: 'um anão furioso armado com um nunchaku' },
  { id: 'a_rand4', text: 'um terraplanista revoltado com um mapa na mão' },
  { id: 'a_rand5', text: 'Silvio Santos de regata e chinelo de dedo' },
  { id: 'a_rand6', text: 'um coach quântico reprogramming a sua mente' },
  { id: 'a_rand7', text: 'um calvo invejoso com implante mal feito' },
  { id: 'a_rand8', text: 'um agiota de bom coração com taxa zero' },
  { id: 'a_rand9', text: 'uma idosa rabugenta num mosh de heavy metal' },
  { id: 'a_rand10', text: 'um capivara de estimação vestindo terno e gravata' },

  // Classic F.D.P. Answer Cards
  { id: 'a1', text: 'um vibrador de coelho com Wi-Fi e controle por Inteligência Artificial' },
  { id: 'a2', text: 'um choro pelado no box do banheiro ouvindo Marília Mendonça' },
  { id: 'a3', text: 'um nude enviado sem querer no grupo de avisos da igreja' },
  { id: 'a4', text: 'lubrificante de morango lambuzado na maçaneta da sala' },
  { id: 'a5', text: 'um fetiche esquisito por pés de velhinhas' },
  { id: 'a6', text: 'fotos do meu pé vendidas no OnlyFans para pagar o aluguel' },
  { id: 'a7', text: 'um Gemidão do Zap reproduzido no volume máximo em pleno enterro' },
  { id: 'a8', text: 'uma tatuagem da ex-sogra no peito com a frase "Amor Eterno"' },
  { id: 'a9', text: 'uma mensagem de "Oi, sumida" mandada pro ex às 4 da manhã' },
  { id: 'a10', text: 'pizza fria de ontem comida na cama no meio dos farelos' },
  { id: 'a11', text: 'uma cueca furada da sorte usada no primeiro encontro' },
  { id: 'a12', text: 'o histórico de busca anônimo do Arthur após 6 cervejas' },
  { id: 'a13', text: 'um orgasmo performático fingido para conseguir dormir logo' },
  { id: 'a14', text: 'um teste de DNA positivo anunciado ao vivo no programa do Ratinho' },
  { id: 'a15', text: 'laxante confundido com chiclete antes de pegar o metrô lotado' },
  { id: 'a16', text: 'uma algema rosa felpuda cuja chave sumiu no ralo do banheiro' },
  { id: 'a17', text: 'R$ 600 torrados em drink ruim num camarote de balada' },
  { id: 'a18', text: 'uma cantada furada dada no sogro sem saber quem ele era' },
  { id: 'a19', text: 'a perda da dignidade, do RG e do sapato esquerdo no Carnaval' },
  { id: 'a20', text: 'um peido silencioso e mortal soltado no elevador lotado' },
  { id: 'a21', text: 'uma dancinha sensual do TikTok que acabou numa hérnia de disco' },
  { id: 'a22', text: 'uma pergunta inconveniente sobre quem é o pai no chá de bebê' },
  { id: 'a23', text: 'um dildo gigante de silicone usado como peso de porta' },
  { id: 'a24', text: 'três garrafas de Corote morno e uma promessa de vingança' },
  { id: 'a25', text: 'um beijo no melhor amigo na brotheragem após 4 shots de tequila' },
  { id: 'a26', text: 'um nude desfocado tirado no espelho sujo do banheiro da firma' },
  { id: 'a27', text: 'uma fofoca maligna soltada com o microfone aberto no Zoom' },
  { id: 'a28', text: 'um carro de som de declaração de amor contratado pro ex errado' },
  { id: 'a29', text: 'uma busca no Google por "como simular minha própria morte"' },
  { id: 'a30', text: 'um fio-terra surpresa feito sem aviso prévio' },
  { id: 'a31', text: 'acordar no ponto final do ônibus sem saber em qual cidade estou' },
  { id: 'a32', text: 'molho de pimenta usado como lubrificante no escuro por engano' },
  { id: 'a33', text: 'chamar a parceira pelo nome da própria mãe no momento do clímax' },
  { id: 'a34', text: 'vazar prints sigilosos do grupo da faculdade nas redes sociais' },
  { id: 'a35', text: 'uma camisinha vencida desde 2017 guardada na carteira de couro' },
  { id: 'a36', text: 'acordar num motel barato vestindo apenas uma fantasia de Shrek' },
  { id: 'a37', text: 'subir na mesa pelado ouvindo funk antigo dos anos 2000' },
  { id: 'a38', text: 'perder um rim numa aposta de truco no bar da esquina' },
  { id: 'a39', text: 'uma conta de motel de R$ 400 paga no Pix parcelada em 12 vezes' },
  { id: 'a40', text: 'fingir que sou gringo para não conversar com o motorista de aplicativo' },
  { id: 'a41', text: 'falar "com todo respeito" segundos antes de xingar a mãe de alguém' },
  { id: 'a42', text: 'um pote de açaí misturado com alho e farofa de bacon' },
  { id: 'a43', text: 'uma foto sensual enviada com a cara da avó ao fundo' },
  { id: 'a44', text: 'um áudio de 12 minutos explicando por que a terra é plana' },
  { id: 'a45', text: 'uma mamada bem dada que resolveu todos os problemas diplomáticos' },
];

// Helper to create a Customizable Card ("Escreva Você Mesmo ✍️")
export const createCustomizableCard = (idSuffix: string = 'wild'): Card => ({
  id: `custom_${Date.now()}_${idSuffix}`,
  text: '',
  isCustomizable: true,
  category: '✍️ CARTA CORINGA',
});

export const MOCK_AVATARS = [
  '👑', '🦊', '🐼', '🦁', '🤖', '👾', '🦄', '🐲', 
  '🚀', '🍕', '🎮', '🔥', '⚡', '🎩', '🦉', '🐱'
];

export const MOCK_PLAYERS: Player[] = [
  { id: 'p_user', name: 'Arthur (Você)', avatar: '👑', color: 'from-amber-400 to-yellow-600', score: 3, isHost: true, isCzar: false, isReady: true, hasSubmitted: false },
  { id: 'p_2', name: 'Mariana Dev', avatar: '🦊', color: 'from-purple-400 to-pink-600', score: 5, isHost: false, isCzar: true, isReady: true, hasSubmitted: true },
  { id: 'p_3', name: 'Lucas Gamer', avatar: '👾', color: 'from-blue-400 to-cyan-600', score: 2, isHost: false, isCzar: false, isReady: true, hasSubmitted: true },
  { id: 'p_4', name: 'Beatriz QA', avatar: '🦉', color: 'from-emerald-400 to-teal-600', score: 4, isHost: false, isCzar: false, isReady: true, hasSubmitted: true },
  { id: 'p_5', name: 'Gabriel UX', avatar: '🚀', color: 'from-orange-400 to-red-600', score: 1, isHost: false, isCzar: false, isReady: true, hasSubmitted: false },
  { id: 'p_6', name: 'Camila Ops', avatar: '🤖', color: 'from-indigo-400 to-violet-600', score: 3, isHost: false, isCzar: false, isReady: true, hasSubmitted: true },
];
