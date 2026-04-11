export type Language = 'es' | 'en' | 'pt' | 'zh' | 'ja' | 'ru' | 'it' | 'fr' | 'ko'

export interface Translations {
  landing: {
    badge: string
    hero: { line1: string; line2: string; subtitle: string; description: string; cta: string }
    stats: { regLabel: string; freeLabel: string; mmLabel: string }
    gamesTitle: string
    howItWorks: {
      title: string
      steps: { step: string; title: string; desc: string }[]
    }
    footer: string
    searchingNow: string
    searchingFirst: string
  }
  modal: {
    title: string
    subtitle: string
    close: string
    fields: {
      alias: string; aliasPlaceholder: string
      game: string; gamePlaceholder: string
      server: string; serverPlaceholder: string
      mode: string; modePlaceholder: string
      teamFormat: string; teamFormatPlaceholder: string
      rank: string; rankPlaceholder: string
      groupSize: string
    }
    validation: {
      aliasRequired: string; aliasMin: string; aliasMax: string
      gameRequired: string; serverRequired: string; modeRequired: string
      teamFormatRequired: string; rankRequired: string
      groupSizeRequired: string; groupSizeMin: string
      groupSizeMax: (max: number) => string
    }
    teamFormatOption: (name: string, size: number) => string
    seekingPlayers: (n: number) => string
    groupComplete: string
    loadingGames: string
    submitError: string
    cancel: string
    submit: string
    submitting: string
    inputModeIA: string
    inputModeManual: string
    descLabel: string
    modoLabel: string
    rangoLabel: string
    formatoLabel: string
    descHint: string
    groupSizeLabel: string
    findTeammatesIA: string
    buscarCompañeros: string
    modoIndividual: string
    descriptionMin: string
    warningNoMode: string
    warningNoSize: string
    warningNoRank: string
    warningRankRequired: string
  }
  queue: {
    title: string
    subtitle: (n: number) => string
    elapsed: string
    details: string
    labels: { game: string; server: string; mode: string; format: string; rank: string; myGroup: string; seeking: string }
    seekingValue: (n: number) => string
    cancel: string
    cancelling: string
    cancelError: string
  }
  match: {
    celebration: string
    celebrationSub: string
    title: string
    matchInfo: string
    participants: string
    labels: { game: string; server: string; mode: string; players: string }
    you: string
    groupOf: (n: number) => string
    group: string
    leave: string
  }
  chat: {
    title: string; live: string; loading: string; empty: string
    placeholder: string; send: string; sendError: string
  }
  langSwitcher: { label: string; es: string; en: string; pt: string; zh: string; ja: string; ru: string; it: string; fr: string; ko: string }
}

const translations: Record<Language, Translations> = {
  es: {
    landing: {
      badge: 'Matchmaking en tiempo real',
      hero: {
        line1: 'Completá tu equipo,',
        line2: 'entrá a jugar.',
        subtitle: 'Sin registro. Sin perfil. Solo buscás, encontrás, jugás.',
        description:
          'Conectate con jugadores que buscan exactamente lo mismo que vos, en el mismo servidor, modo y rango.',
        cta: 'Buscar compañeros',
      },
      stats: {
        regLabel: 'Registro requerido',
        freeLabel: 'Gratis',
        mmLabel: 'Matchmaking',
      },
      gamesTitle: 'Juegos disponibles',
      howItWorks: {
        title: 'Cómo funciona',
        steps: [
          {
            step: '01',
            title: 'Elegís tu juego',
            desc: 'Seleccioná el juego, servidor, modo y rango. Todo en segundos.',
          },
          {
            step: '02',
            title: 'Entrás a la cola',
            desc: 'El sistema busca jugadores compatibles en tiempo real.',
          },
          {
            step: '03',
            title: 'Encontrás equipo',
            desc: 'Cuando se completa el grupo, podés chatear y coordinar.',
          },
        ],
      },
      footer: 'WhoPlays — Hecho para gamers, por gamers.',
      searchingNow: 'Buscando ahora',
      searchingFirst: 'Sé el primero en buscar',
    },
    modal: {
      title: 'Buscar compañeros',
      subtitle: 'Completá los datos para entrar a la cola',
      close: 'Cerrar',
      fields: {
        alias: 'Tu nombre en el juego',
        aliasPlaceholder: 'Ej: SwiftWolf123',
        game: 'Juego',
        gamePlaceholder: 'Seleccioná un juego',
        server: 'Servidor',
        serverPlaceholder: 'Seleccioná un servidor',
        mode: 'Modo de juego',
        modePlaceholder: 'Seleccioná un modo',
        teamFormat: 'Formato de equipo',
        teamFormatPlaceholder: 'Seleccioná un formato',
        rank: 'Rango',
        rankPlaceholder: 'Seleccioná tu rango',
        groupSize: 'Tamaño de tu grupo actual',
      },
      validation: {
        aliasRequired: 'El alias es requerido',
        aliasMin: 'Mínimo 2 caracteres',
        aliasMax: 'Máximo 32 caracteres',
        gameRequired: 'Seleccioná un juego',
        serverRequired: 'Seleccioná un servidor',
        modeRequired: 'Seleccioná un modo',
        teamFormatRequired: 'Seleccioná un formato de equipo',
        rankRequired: 'Seleccioná tu rango',
        groupSizeRequired: 'Indicá el tamaño de tu grupo',
        groupSizeMin: 'Mínimo 1 jugador',
        groupSizeMax: (max: number) => `Máximo ${max} jugadores`,
      },
      teamFormatOption: (name: string, size: number) => `${name} (${size} jugadores)`,
      seekingPlayers: (n: number) => `Buscando ${n} jugador${n !== 1 ? 'es' : ''}`,
      groupComplete: 'Grupo completo',
      loadingGames: 'Cargando juegos...',
      submitError: 'Error al unirse a la cola. Intentá de nuevo.',
      cancel: 'Cancelar',
      submit: 'Buscar compañeros',
      submitting: 'Buscando...',
      inputModeIA: 'IA',
      inputModeManual: 'Manual',
      descLabel: 'Describite y contá qué buscás',
      modoLabel: 'MODO',
      rangoLabel: 'RANGO',
      formatoLabel: 'FORMATO',
      descHint: 'Rol, cuántos son / cuántos buscan, división',
      groupSizeLabel: '¿Cuántos son en tu grupo?',
      findTeammatesIA: 'Find teammates ✨',
      buscarCompañeros: 'Buscar compañeros',
      modoIndividual: 'Modo individual',
      descriptionMin: 'Describite un poco más para encontrar el mejor match.',
      warningNoMode: 'No especificaste qué modo querés jugar',
      warningNoSize: 'No especificaste cuántos son en tu grupo',
      warningNoRank: 'Especificaste ranked pero no indicaste tu rango',
      warningRankRequired: 'Para jugar competitivo tenés que especificar tu rango',
    },
    queue: {
      title: 'Buscando compañeros...',
      subtitle: (n: number) =>
        `Buscando ${n} jugador${n !== 1 ? 'es' : ''} para completar tu grupo`,
      elapsed: 'en cola',
      details: 'Detalles de búsqueda',
      labels: {
        game: 'Juego',
        server: 'Servidor',
        mode: 'Modo',
        format: 'Formato',
        rank: 'Rango',
        myGroup: 'Tu grupo',
        seeking: 'Buscando',
      },
      seekingValue: (n: number) => `${n} jugador${n !== 1 ? 'es' : ''}`,
      cancel: 'Cancelar búsqueda',
      cancelling: 'Cancelando...',
      cancelError: 'No se pudo cancelar. Intentá de nuevo.',
    },
    match: {
      celebration: '¡Match encontrado!',
      celebrationSub: 'Tu equipo está listo',
      title: 'Match encontrado!',
      matchInfo: 'Información del match',
      participants: 'Participantes',
      labels: {
        game: 'Juego',
        server: 'Servidor',
        mode: 'Modo',
        players: 'Jugadores',
      },
      you: 'Vos',
      groupOf: (n: number) => `de ${n} total`,
      group: 'Grupo:',
      leave: 'Salir',
    },
    chat: {
      title: 'Chat del grupo',
      live: 'En vivo',
      loading: 'Cargando mensajes...',
      empty: '¡Sé el primero en escribir!',
      placeholder: 'Escribí un mensaje...',
      send: 'Enviar',
      sendError: 'No se pudo enviar el mensaje.',
    },
    langSwitcher: {
      label: 'Idioma',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  en: {
    landing: {
      badge: 'Real-time matchmaking',
      hero: {
        line1: 'Complete your team,',
        line2: 'start playing.',
        subtitle: 'No sign-up. No profile. Just search, find, play.',
        description:
          'Connect with players looking for exactly the same thing, on the same server, mode and rank.',
        cta: 'Find teammates',
      },
      stats: {
        regLabel: 'Sign-up required',
        freeLabel: 'Free',
        mmLabel: 'Matchmaking',
      },
      gamesTitle: 'Available games',
      howItWorks: {
        title: 'How it works',
        steps: [
          {
            step: '01',
            title: 'Pick your game',
            desc: 'Select the game, server, mode and rank. Done in seconds.',
          },
          {
            step: '02',
            title: 'Join the queue',
            desc: 'The system finds compatible players in real time.',
          },
          {
            step: '03',
            title: 'Find your team',
            desc: 'Once the group is complete, chat and coordinate.',
          },
        ],
      },
      footer: 'WhoPlays — Built for gamers, by gamers.',
      searchingNow: 'Searching now',
      searchingFirst: 'Be the first to search',
    },
    modal: {
      title: 'Find teammates',
      subtitle: 'Fill in the details to join the queue',
      close: 'Close',
      fields: {
        alias: 'Your in-game name',
        aliasPlaceholder: 'E.g.: SwiftWolf123',
        game: 'Game',
        gamePlaceholder: 'Select a game',
        server: 'Server',
        serverPlaceholder: 'Select a server',
        mode: 'Game mode',
        modePlaceholder: 'Select a mode',
        teamFormat: 'Team format',
        teamFormatPlaceholder: 'Select a format',
        rank: 'Rank',
        rankPlaceholder: 'Select your rank',
        groupSize: 'Your current group size',
      },
      validation: {
        aliasRequired: 'Alias is required',
        aliasMin: 'Minimum 2 characters',
        aliasMax: 'Maximum 32 characters',
        gameRequired: 'Select a game',
        serverRequired: 'Select a server',
        modeRequired: 'Select a mode',
        teamFormatRequired: 'Select a team format',
        rankRequired: 'Select your rank',
        groupSizeRequired: 'Enter your group size',
        groupSizeMin: 'Minimum 1 player',
        groupSizeMax: (max: number) => `Maximum ${max} players`,
      },
      teamFormatOption: (name: string, size: number) => `${name} (${size} players)`,
      seekingPlayers: (n: number) => `Seeking ${n} player${n !== 1 ? 's' : ''}`,
      groupComplete: 'Group complete',
      loadingGames: 'Loading games...',
      submitError: 'Failed to join the queue. Please try again.',
      cancel: 'Cancel',
      submit: 'Find teammates',
      submitting: 'Searching...',
      inputModeIA: 'AI',
      inputModeManual: 'Manual',
      descLabel: 'Describe yourself and what you need',
      modoLabel: 'MODE',
      rangoLabel: 'RANK',
      formatoLabel: 'FORMAT',
      descHint: 'Role, group size / seeking, division',
      groupSizeLabel: 'How many are in your group?',
      findTeammatesIA: 'Find teammates ✨',
      buscarCompañeros: 'Find teammates',
      modoIndividual: 'Solo mode',
      descriptionMin: 'Tell us a bit more to find the best match.',
      warningNoMode: "You didn't specify which game mode you want",
      warningNoSize: "You didn't specify how many players are in your group",
      warningNoRank: "You selected ranked but didn't specify your rank",
      warningRankRequired: 'To play ranked you need to specify your rank',
    },
    queue: {
      title: 'Finding teammates...',
      subtitle: (n: number) =>
        `Looking for ${n} player${n !== 1 ? 's' : ''} to complete your group`,
      elapsed: 'in queue',
      details: 'Search details',
      labels: {
        game: 'Game',
        server: 'Server',
        mode: 'Mode',
        format: 'Format',
        rank: 'Rank',
        myGroup: 'Your group',
        seeking: 'Seeking',
      },
      seekingValue: (n: number) => `${n} player${n !== 1 ? 's' : ''}`,
      cancel: 'Cancel search',
      cancelling: 'Cancelling...',
      cancelError: 'Could not cancel. Please try again.',
    },
    match: {
      celebration: 'Match found!',
      celebrationSub: 'Your team is ready',
      title: 'Match found!',
      matchInfo: 'Match info',
      participants: 'Participants',
      labels: {
        game: 'Game',
        server: 'Server',
        mode: 'Mode',
        players: 'Players',
      },
      you: 'You',
      groupOf: (n: number) => `of ${n} total`,
      group: 'Group:',
      leave: 'Leave',
    },
    chat: {
      title: 'Group chat',
      live: 'Live',
      loading: 'Loading messages...',
      empty: 'Be the first to write!',
      placeholder: 'Type a message...',
      send: 'Send',
      sendError: 'Could not send the message.',
    },
    langSwitcher: {
      label: 'Language',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  pt: {
    landing: {
      badge: 'Matchmaking em tempo real',
      hero: {
        line1: 'Complete seu time,',
        line2: 'comece a jogar.',
        subtitle: 'Sem cadastro. Sem perfil. Só buscar, encontrar, jogar.',
        description: 'Conecte-se com jogadores que buscam exatamente a mesma coisa, no mesmo servidor, modo e rank.',
        cta: 'Encontrar parceiros',
      },
      stats: { regLabel: 'Cadastro necessário', freeLabel: 'Grátis', mmLabel: 'Matchmaking' },
      gamesTitle: 'Jogos disponíveis',
      howItWorks: {
        title: 'Como funciona',
        steps: [
          { step: '01', title: 'Escolha seu jogo', desc: 'Selecione o jogo, servidor, modo e rank. Tudo em segundos.' },
          { step: '02', title: 'Entre na fila', desc: 'O sistema busca jogadores compatíveis em tempo real.' },
          { step: '03', title: 'Encontre seu time', desc: 'Quando o grupo estiver completo, você pode conversar e coordenar.' },
        ],
      },
      footer: 'WhoPlays — Feito para gamers, por gamers.',
      searchingNow: 'Buscando agora',
      searchingFirst: 'Seja o primeiro a buscar',
    },
    modal: {
      title: 'Encontrar parceiros',
      subtitle: 'Preencha os dados para entrar na fila',
      close: 'Fechar',
      fields: {
        alias: 'Seu nome no jogo', aliasPlaceholder: 'Ex: SwiftWolf123',
        game: 'Jogo', gamePlaceholder: 'Selecione um jogo',
        server: 'Servidor', serverPlaceholder: 'Selecione um servidor',
        mode: 'Modo de jogo', modePlaceholder: 'Selecione um modo',
        teamFormat: 'Formato de equipe', teamFormatPlaceholder: 'Selecione um formato',
        rank: 'Rank', rankPlaceholder: 'Selecione seu rank',
        groupSize: 'Tamanho atual do seu grupo',
      },
      validation: {
        aliasRequired: 'O alias é obrigatório', aliasMin: 'Mínimo 2 caracteres', aliasMax: 'Máximo 32 caracteres',
        gameRequired: 'Selecione um jogo', serverRequired: 'Selecione um servidor',
        modeRequired: 'Selecione um modo', teamFormatRequired: 'Selecione um formato',
        rankRequired: 'Selecione seu rank', groupSizeRequired: 'Informe o tamanho do grupo',
        groupSizeMin: 'Mínimo 1 jogador', groupSizeMax: (max: number) => `Máximo ${max} jogadores`,
      },
      teamFormatOption: (name: string, size: number) => `${name} (${size} jogadores)`,
      seekingPlayers: (n: number) => `Buscando ${n} jogador${n !== 1 ? 'es' : ''}`,
      groupComplete: 'Grupo completo', loadingGames: 'Carregando jogos...',
      submitError: 'Erro ao entrar na fila. Tente novamente.',
      cancel: 'Cancelar', submit: 'Encontrar parceiros', submitting: 'Buscando...',
      inputModeIA: 'IA',
      inputModeManual: 'Manual',
      descLabel: 'Descreva-se e o que você procura',
      modoLabel: 'MODO',
      rangoLabel: 'RANK',
      formatoLabel: 'FORMATO',
      descHint: 'Função, tamanho do grupo / buscando, divisão',
      groupSizeLabel: 'Quantos estão no seu grupo?',
      findTeammatesIA: 'Encontrar parceiros ✨',
      buscarCompañeros: 'Encontrar parceiros',
      modoIndividual: 'Modo individual',
      descriptionMin: 'Descreva-se um pouco mais para encontrar o melhor match.',
      warningNoMode: 'Você não especificou o modo de jogo',
      warningNoSize: 'Você não especificou quantos jogadores estão no seu grupo',
      warningNoRank: 'Você selecionou ranked mas não especificou seu rank',
      warningRankRequired: 'Para jogar ranqueado você precisa especificar seu rank',
    },
    queue: {
      title: 'Procurando parceiros...',
      subtitle: (n: number) => `Buscando ${n} jogador${n !== 1 ? 'es' : ''} para completar seu grupo`,
      elapsed: 'na fila', details: 'Detalhes da busca',
      labels: { game: 'Jogo', server: 'Servidor', mode: 'Modo', format: 'Formato', rank: 'Rank', myGroup: 'Seu grupo', seeking: 'Buscando' },
      seekingValue: (n: number) => `${n} jogador${n !== 1 ? 'es' : ''}`,
      cancel: 'Cancelar busca', cancelling: 'Cancelando...', cancelError: 'Não foi possível cancelar. Tente novamente.',
    },
    match: {
      celebration: 'Match encontrado!', celebrationSub: 'Seu time está pronto',
      title: 'Match encontrado!', matchInfo: 'Informações da partida', participants: 'Participantes',
      labels: { game: 'Jogo', server: 'Servidor', mode: 'Modo', players: 'Jogadores' },
      you: 'Você', groupOf: (n: number) => `de ${n} total`, group: 'Grupo:', leave: 'Sair',
    },
    chat: {
      title: 'Chat do grupo', live: 'Ao vivo', loading: 'Carregando mensagens...',
      empty: 'Seja o primeiro a escrever!', placeholder: 'Escreva uma mensagem...',
      send: 'Enviar', sendError: 'Não foi possível enviar a mensagem.',
    },
    langSwitcher: {
      label: 'Idioma',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  zh: {
    landing: {
      badge: '实时匹配',
      hero: {
        line1: '组建你的队伍，',
        line2: '开始游戏。',
        subtitle: '无需注册，无需主页。只需搜索、找到、畅玩。',
        description: '与寻找完全相同条件的玩家连线——相同服务器、模式和段位。',
        cta: '寻找队友',
      },
      stats: { regLabel: '无需注册', freeLabel: '免费', mmLabel: '匹配系统' },
      gamesTitle: '可用游戏',
      howItWorks: {
        title: '如何使用',
        steps: [
          { step: '01', title: '选择游戏', desc: '选择游戏、服务器、模式和段位，几秒内完成。' },
          { step: '02', title: '加入队列', desc: '系统实时寻找兼容的玩家。' },
          { step: '03', title: '找到队伍', desc: '组队完成后，可以聊天并协调策略。' },
        ],
      },
      footer: 'WhoPlays — 由玩家为玩家打造。',
      searchingNow: '正在搜索',
      searchingFirst: '成为第一个搜索的人',
    },
    modal: {
      title: '寻找队友',
      subtitle: '填写信息加入队列',
      close: '关闭',
      fields: {
        alias: '游戏内名称', aliasPlaceholder: '例：SwiftWolf123',
        game: '游戏', gamePlaceholder: '选择游戏',
        server: '服务器', serverPlaceholder: '选择服务器',
        mode: '游戏模式', modePlaceholder: '选择模式',
        teamFormat: '队伍格式', teamFormatPlaceholder: '选择格式',
        rank: '段位', rankPlaceholder: '选择段位',
        groupSize: '当前队伍人数',
      },
      validation: {
        aliasRequired: '昵称为必填项', aliasMin: '最少2个字符', aliasMax: '最多32个字符',
        gameRequired: '请选择游戏', serverRequired: '请选择服务器',
        modeRequired: '请选择模式', teamFormatRequired: '请选择队伍格式',
        rankRequired: '请选择段位', groupSizeRequired: '请输入队伍人数',
        groupSizeMin: '最少1名玩家', groupSizeMax: (max: number) => `最多${max}名玩家`,
      },
      teamFormatOption: (name: string, size: number) => `${name}（${size}人）`,
      seekingPlayers: (n: number) => `寻找${n}名玩家`,
      groupComplete: '队伍已满', loadingGames: '加载游戏中...',
      submitError: '加入队列失败，请重试。',
      cancel: '取消', submit: '寻找队友', submitting: '搜索中...',
      inputModeIA: 'AI',
      inputModeManual: '手动',
      descLabel: '描述你自己和你的需求',
      modoLabel: '模式',
      rangoLabel: '段位',
      formatoLabel: '格式',
      descHint: '角色、人数/寻找人数、段位',
      groupSizeLabel: '你的队伍有几人?',
      findTeammatesIA: '寻找队友 ✨',
      buscarCompañeros: '寻找队友',
      modoIndividual: '单人模式',
      descriptionMin: '请多描述一些，以找到最佳匹配。',
      warningNoMode: '未指定游戏模式',
      warningNoSize: '未指定队伍人数',
      warningNoRank: '选择了排位但未指定段位',
      warningRankRequired: '参加排位赛需要指定您的段位',
    },
    queue: {
      title: '正在寻找队友...',
      subtitle: (n: number) => `正在寻找${n}名玩家来完成你的队伍`,
      elapsed: '排队中', details: '搜索详情',
      labels: { game: '游戏', server: '服务器', mode: '模式', format: '格式', rank: '段位', myGroup: '我的队伍', seeking: '寻找' },
      seekingValue: (n: number) => `${n}名玩家`,
      cancel: '取消搜索', cancelling: '取消中...', cancelError: '无法取消，请重试。',
    },
    match: {
      celebration: '找到匹配！', celebrationSub: '你的队伍已准备好',
      title: '找到匹配！', matchInfo: '对局信息', participants: '参与者',
      labels: { game: '游戏', server: '服务器', mode: '模式', players: '玩家' },
      you: '你', groupOf: (n: number) => `共${n}人`, group: '队伍：', leave: '离开',
    },
    chat: {
      title: '组队聊天', live: '实时', loading: '加载消息中...',
      empty: '成为第一个发言的人！', placeholder: '输入消息...',
      send: '发送', sendError: '消息发送失败。',
    },
    langSwitcher: {
      label: '语言',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  ja: {
    landing: {
      badge: 'リアルタイムマッチング',
      hero: {
        line1: 'チームを完成させ、',
        line2: 'プレイを始めよう。',
        subtitle: '登録不要。プロフィール不要。探して、見つけて、プレイするだけ。',
        description: '同じサーバー・モード・ランクで同じことを求めているプレイヤーとつながろう。',
        cta: 'チームメイトを探す',
      },
      stats: { regLabel: '登録不要', freeLabel: '無料', mmLabel: 'マッチング' },
      gamesTitle: '対応ゲーム',
      howItWorks: {
        title: '使い方',
        steps: [
          { step: '01', title: 'ゲームを選ぶ', desc: 'ゲーム、サーバー、モード、ランクを選択。数秒で完了。' },
          { step: '02', title: 'キューに参加', desc: 'システムがリアルタイムで対応プレイヤーを探します。' },
          { step: '03', title: 'チームを見つける', desc: 'グループが揃ったら、チャットで作戦を立てよう。' },
        ],
      },
      footer: 'WhoPlays — ゲーマーによる、ゲーマーのためのサービス。',
      searchingNow: '現在検索中',
      searchingFirst: '最初に検索する人になろう',
    },
    modal: {
      title: 'チームメイトを探す',
      subtitle: '詳細を入力してキューに参加',
      close: '閉じる',
      fields: {
        alias: 'ゲーム内の名前', aliasPlaceholder: '例：SwiftWolf123',
        game: 'ゲーム', gamePlaceholder: 'ゲームを選択',
        server: 'サーバー', serverPlaceholder: 'サーバーを選択',
        mode: 'ゲームモード', modePlaceholder: 'モードを選択',
        teamFormat: 'チーム形式', teamFormatPlaceholder: '形式を選択',
        rank: 'ランク', rankPlaceholder: 'ランクを選択',
        groupSize: '現在のグループ人数',
      },
      validation: {
        aliasRequired: '名前は必須です', aliasMin: '最低2文字', aliasMax: '最大32文字',
        gameRequired: 'ゲームを選択してください', serverRequired: 'サーバーを選択してください',
        modeRequired: 'モードを選択してください', teamFormatRequired: '形式を選択してください',
        rankRequired: 'ランクを選択してください', groupSizeRequired: 'グループ人数を入力してください',
        groupSizeMin: '最低1人', groupSizeMax: (max: number) => `最大${max}人`,
      },
      teamFormatOption: (name: string, size: number) => `${name}（${size}人）`,
      seekingPlayers: (n: number) => `${n}人のプレイヤーを探しています`,
      groupComplete: 'グループ満員', loadingGames: 'ゲームを読み込み中...',
      submitError: 'キューへの参加に失敗しました。もう一度お試しください。',
      cancel: 'キャンセル', submit: 'チームメイトを探す', submitting: '検索中...',
      inputModeIA: 'AI',
      inputModeManual: '手動',
      descLabel: '自己紹介と求めること',
      modoLabel: 'モード',
      rangoLabel: 'ランク',
      formatoLabel: '形式',
      descHint: 'ロール、グループ人数/募集人数、ランク',
      groupSizeLabel: 'グループは何人ですか?',
      findTeammatesIA: 'チームメイトを探す ✨',
      buscarCompañeros: 'チームメイトを探す',
      modoIndividual: 'ソロモード',
      descriptionMin: 'もう少し詳しく教えてください。',
      warningNoMode: 'ゲームモードが指定されていません',
      warningNoSize: 'グループ人数が指定されていません',
      warningNoRank: 'ランク戦を選択しましたがランクが指定されていません',
      warningRankRequired: 'ランク戦をプレイするにはランクを指定してください',
    },
    queue: {
      title: 'チームメイトを探しています...',
      subtitle: (n: number) => `グループを完成させるために${n}人を探しています`,
      elapsed: 'キュー待機中', details: '検索詳細',
      labels: { game: 'ゲーム', server: 'サーバー', mode: 'モード', format: '形式', rank: 'ランク', myGroup: '自分のグループ', seeking: '募集中' },
      seekingValue: (n: number) => `${n}人`,
      cancel: '検索をキャンセル', cancelling: 'キャンセル中...', cancelError: 'キャンセルできませんでした。もう一度お試しください。',
    },
    match: {
      celebration: 'マッチが見つかりました！', celebrationSub: 'チームの準備完了',
      title: 'マッチが見つかりました！', matchInfo: 'マッチ情報', participants: '参加者',
      labels: { game: 'ゲーム', server: 'サーバー', mode: 'モード', players: 'プレイヤー' },
      you: 'あなた', groupOf: (n: number) => `${n}人中`, group: 'グループ：', leave: '退出',
    },
    chat: {
      title: 'グループチャット', live: 'ライブ', loading: 'メッセージを読み込み中...',
      empty: '最初のメッセージを送ろう！', placeholder: 'メッセージを入力...',
      send: '送信', sendError: 'メッセージを送信できませんでした。',
    },
    langSwitcher: {
      label: '言語',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  ru: {
    landing: {
      badge: 'Матчмейкинг в реальном времени',
      hero: {
        line1: 'Собери команду,',
        line2: 'начни играть.',
        subtitle: 'Без регистрации. Без профиля. Ищи, находи, играй.',
        description: 'Находи игроков, которые ищут то же самое — на том же сервере, режиме и ранге.',
        cta: 'Найти тиммейтов',
      },
      stats: { regLabel: 'Без регистрации', freeLabel: 'Бесплатно', mmLabel: 'Матчмейкинг' },
      gamesTitle: 'Доступные игры',
      howItWorks: {
        title: 'Как это работает',
        steps: [
          { step: '01', title: 'Выбери игру', desc: 'Выбери игру, сервер, режим и ранг. Всего за несколько секунд.' },
          { step: '02', title: 'Войди в очередь', desc: 'Система ищет совместимых игроков в реальном времени.' },
          { step: '03', title: 'Найди команду', desc: 'Когда группа собрана, можно общаться и координироваться.' },
        ],
      },
      footer: 'WhoPlays — Создано геймерами для геймеров.',
      searchingNow: 'Сейчас ищут',
      searchingFirst: 'Будьте первым, кто ищет',
    },
    modal: {
      title: 'Найти тиммейтов',
      subtitle: 'Заполни данные, чтобы войти в очередь',
      close: 'Закрыть',
      fields: {
        alias: 'Твой игровой ник', aliasPlaceholder: 'Напр.: SwiftWolf123',
        game: 'Игра', gamePlaceholder: 'Выбери игру',
        server: 'Сервер', serverPlaceholder: 'Выбери сервер',
        mode: 'Режим игры', modePlaceholder: 'Выбери режим',
        teamFormat: 'Формат команды', teamFormatPlaceholder: 'Выбери формат',
        rank: 'Ранг', rankPlaceholder: 'Выбери ранг',
        groupSize: 'Текущий размер группы',
      },
      validation: {
        aliasRequired: 'Ник обязателен', aliasMin: 'Минимум 2 символа', aliasMax: 'Максимум 32 символа',
        gameRequired: 'Выбери игру', serverRequired: 'Выбери сервер',
        modeRequired: 'Выбери режим', teamFormatRequired: 'Выбери формат команды',
        rankRequired: 'Выбери ранг', groupSizeRequired: 'Укажи размер группы',
        groupSizeMin: 'Минимум 1 игрок', groupSizeMax: (max: number) => `Максимум ${max} игроков`,
      },
      teamFormatOption: (name: string, size: number) => `${name} (${size} игрока)`,
      seekingPlayers: (n: number) => `Ищем ${n} игрок${n === 1 ? 'а' : 'ов'}`,
      groupComplete: 'Группа укомплектована', loadingGames: 'Загрузка игр...',
      submitError: 'Ошибка при входе в очередь. Попробуй снова.',
      cancel: 'Отмена', submit: 'Найти тиммейтов', submitting: 'Поиск...',
      inputModeIA: 'ИИ',
      inputModeManual: 'Вручную',
      descLabel: 'Опиши себя и что ищешь',
      modoLabel: 'РЕЖИМ',
      rangoLabel: 'РАНГ',
      formatoLabel: 'ФОРМАТ',
      descHint: 'Роль, размер группы / ищем, ранг',
      groupSizeLabel: 'Сколько человек в группе?',
      findTeammatesIA: 'Найти тиммейтов ✨',
      buscarCompañeros: 'Найти тиммейтов',
      modoIndividual: 'Одиночный режим',
      descriptionMin: 'Расскажи чуть больше для лучшего подбора.',
      warningNoMode: 'Не указан режим игры',
      warningNoSize: 'Не указано количество игроков в группе',
      warningNoRank: 'Выбран ранговый режим, но ранг не указан',
      warningRankRequired: 'Для игры в ранговом режиме укажите свой ранг',
    },
    queue: {
      title: 'Ищем тиммейтов...',
      subtitle: (n: number) => `Ищем ${n} игрок${n === 1 ? 'а' : 'ов'} для твоей группы`,
      elapsed: 'в очереди', details: 'Детали поиска',
      labels: { game: 'Игра', server: 'Сервер', mode: 'Режим', format: 'Формат', rank: 'Ранг', myGroup: 'Твоя группа', seeking: 'Ищем' },
      seekingValue: (n: number) => `${n} игрок${n === 1 ? 'а' : 'ов'}`,
      cancel: 'Отменить поиск', cancelling: 'Отмена...', cancelError: 'Не удалось отменить. Попробуй снова.',
    },
    match: {
      celebration: 'Матч найден!', celebrationSub: 'Твоя команда готова',
      title: 'Матч найден!', matchInfo: 'Информация о матче', participants: 'Участники',
      labels: { game: 'Игра', server: 'Сервер', mode: 'Режим', players: 'Игроки' },
      you: 'Ты', groupOf: (n: number) => `из ${n}`, group: 'Группа:', leave: 'Выйти',
    },
    chat: {
      title: 'Групповой чат', live: 'В эфире', loading: 'Загрузка сообщений...',
      empty: 'Будь первым!', placeholder: 'Напиши сообщение...',
      send: 'Отправить', sendError: 'Не удалось отправить сообщение.',
    },
    langSwitcher: {
      label: 'Язык',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  it: {
    landing: {
      badge: 'Matchmaking in tempo reale',
      hero: {
        line1: 'Completa il tuo team,',
        line2: 'inizia a giocare.',
        subtitle: 'Nessuna registrazione. Nessun profilo. Cerca, trova, gioca.',
        description: 'Connettiti con giocatori che cercano esattamente la stessa cosa, sullo stesso server, modalità e rank.',
        cta: 'Trova compagni',
      },
      stats: { regLabel: 'Registrazione richiesta', freeLabel: 'Gratis', mmLabel: 'Matchmaking' },
      gamesTitle: 'Giochi disponibili',
      howItWorks: {
        title: 'Come funziona',
        steps: [
          { step: '01', title: 'Scegli il gioco', desc: 'Seleziona gioco, server, modalità e rank. In pochi secondi.' },
          { step: '02', title: 'Entra in coda', desc: 'Il sistema cerca giocatori compatibili in tempo reale.' },
          { step: '03', title: 'Trova il team', desc: 'Quando il gruppo è completo, puoi chattare e coordinarti.' },
        ],
      },
      footer: 'WhoPlays — Fatto da gamer, per gamer.',
      searchingNow: 'Cercando ora',
      searchingFirst: 'Sii il primo a cercare',
    },
    modal: {
      title: 'Trova compagni',
      subtitle: 'Inserisci i dati per entrare in coda',
      close: 'Chiudi',
      fields: {
        alias: 'Il tuo nome nel gioco', aliasPlaceholder: 'Es: SwiftWolf123',
        game: 'Gioco', gamePlaceholder: 'Seleziona un gioco',
        server: 'Server', serverPlaceholder: 'Seleziona un server',
        mode: 'Modalità di gioco', modePlaceholder: 'Seleziona una modalità',
        teamFormat: 'Formato del team', teamFormatPlaceholder: 'Seleziona un formato',
        rank: 'Rank', rankPlaceholder: 'Seleziona il tuo rank',
        groupSize: 'Dimensione attuale del gruppo',
      },
      validation: {
        aliasRequired: "L'alias è obbligatorio", aliasMin: 'Minimo 2 caratteri', aliasMax: 'Massimo 32 caratteri',
        gameRequired: 'Seleziona un gioco', serverRequired: 'Seleziona un server',
        modeRequired: 'Seleziona una modalità', teamFormatRequired: 'Seleziona un formato',
        rankRequired: 'Seleziona il tuo rank', groupSizeRequired: 'Indica la dimensione del gruppo',
        groupSizeMin: 'Minimo 1 giocatore', groupSizeMax: (max: number) => `Massimo ${max} giocatori`,
      },
      teamFormatOption: (name: string, size: number) => `${name} (${size} giocatori)`,
      seekingPlayers: (n: number) => `Cerco ${n} giocator${n !== 1 ? 'i' : 'e'}`,
      groupComplete: 'Gruppo completo', loadingGames: 'Caricamento giochi...',
      submitError: "Errore durante l'accesso alla coda. Riprova.",
      cancel: 'Annulla', submit: 'Trova compagni', submitting: 'Ricerca...',
      inputModeIA: 'IA',
      inputModeManual: 'Manual',
      descLabel: 'Descriviti e cosa cerchi',
      modoLabel: 'MODO',
      rangoLabel: 'RANK',
      formatoLabel: 'FORMATO',
      descHint: 'Ruolo, dimensione gruppo / cercando, divisione',
      groupSizeLabel: 'Quanti siete nel gruppo?',
      findTeammatesIA: 'Trova compagni ✨',
      buscarCompañeros: 'Trova compagni',
      modoIndividual: 'Modalità individuale',
      descriptionMin: "Descriviti un po' di più per trovare il miglior match.",
      warningNoMode: 'Non hai specificato la modalità di gioco',
      warningNoSize: 'Non hai specificato quanti siete nel gruppo',
      warningNoRank: 'Hai selezionato ranked ma non hai specificato il rank',
      warningRankRequired: 'Per giocare in ranked devi specificare il tuo rank',
    },
    queue: {
      title: 'Ricerca compagni...',
      subtitle: (n: number) => `Cerco ${n} giocator${n !== 1 ? 'i' : 'e'} per completare il gruppo`,
      elapsed: 'in coda', details: 'Dettagli ricerca',
      labels: { game: 'Gioco', server: 'Server', mode: 'Modalità', format: 'Formato', rank: 'Rank', myGroup: 'Il mio gruppo', seeking: 'Cercando' },
      seekingValue: (n: number) => `${n} giocator${n !== 1 ? 'i' : 'e'}`,
      cancel: 'Annulla ricerca', cancelling: 'Annullamento...', cancelError: 'Impossibile annullare. Riprova.',
    },
    match: {
      celebration: 'Match trovato!', celebrationSub: 'Il tuo team è pronto',
      title: 'Match trovato!', matchInfo: 'Info partita', participants: 'Partecipanti',
      labels: { game: 'Gioco', server: 'Server', mode: 'Modalità', players: 'Giocatori' },
      you: 'Tu', groupOf: (n: number) => `di ${n} totali`, group: 'Gruppo:', leave: 'Esci',
    },
    chat: {
      title: 'Chat di gruppo', live: 'Live', loading: 'Caricamento messaggi...',
      empty: 'Sii il primo a scrivere!', placeholder: 'Scrivi un messaggio...',
      send: 'Invia', sendError: 'Impossibile inviare il messaggio.',
    },
    langSwitcher: {
      label: 'Lingua',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  fr: {
    landing: {
      badge: 'Matchmaking en temps réel',
      hero: {
        line1: 'Complète ton équipe,',
        line2: 'commence à jouer.',
        subtitle: 'Sans inscription. Sans profil. Cherche, trouve, joue.',
        description: 'Connecte-toi avec des joueurs qui cherchent exactement la même chose, sur le même serveur, mode et rang.',
        cta: 'Trouver des coéquipiers',
      },
      stats: { regLabel: 'Inscription requise', freeLabel: 'Gratuit', mmLabel: 'Matchmaking' },
      gamesTitle: 'Jeux disponibles',
      howItWorks: {
        title: 'Comment ça marche',
        steps: [
          { step: '01', title: 'Choisis ton jeu', desc: 'Sélectionne le jeu, serveur, mode et rang. En quelques secondes.' },
          { step: '02', title: 'Rejoins la file', desc: 'Le système trouve des joueurs compatibles en temps réel.' },
          { step: '03', title: 'Trouve ton équipe', desc: 'Une fois le groupe complet, chat et coordonne-toi.' },
        ],
      },
      footer: 'WhoPlays — Fait par des gamers, pour des gamers.',
      searchingNow: 'Recherche en cours',
      searchingFirst: 'Soyez le premier à chercher',
    },
    modal: {
      title: 'Trouver des coéquipiers',
      subtitle: 'Remplis les infos pour rejoindre la file',
      close: 'Fermer',
      fields: {
        alias: 'Ton pseudo en jeu', aliasPlaceholder: 'Ex : SwiftWolf123',
        game: 'Jeu', gamePlaceholder: 'Sélectionne un jeu',
        server: 'Serveur', serverPlaceholder: 'Sélectionne un serveur',
        mode: 'Mode de jeu', modePlaceholder: 'Sélectionne un mode',
        teamFormat: "Format d'équipe", teamFormatPlaceholder: 'Sélectionne un format',
        rank: 'Rang', rankPlaceholder: 'Sélectionne ton rang',
        groupSize: 'Taille actuelle de ton groupe',
      },
      validation: {
        aliasRequired: "L'alias est requis", aliasMin: 'Minimum 2 caractères', aliasMax: 'Maximum 32 caractères',
        gameRequired: 'Sélectionne un jeu', serverRequired: 'Sélectionne un serveur',
        modeRequired: 'Sélectionne un mode', teamFormatRequired: "Sélectionne un format d'équipe",
        rankRequired: 'Sélectionne ton rang', groupSizeRequired: 'Indique la taille du groupe',
        groupSizeMin: 'Minimum 1 joueur', groupSizeMax: (max: number) => `Maximum ${max} joueurs`,
      },
      teamFormatOption: (name: string, size: number) => `${name} (${size} joueurs)`,
      seekingPlayers: (n: number) => `Recherche de ${n} joueur${n !== 1 ? 's' : ''}`,
      groupComplete: 'Groupe complet', loadingGames: 'Chargement des jeux...',
      submitError: "Erreur lors de l'entrée en file. Réessaie.",
      cancel: 'Annuler', submit: 'Trouver des coéquipiers', submitting: 'Recherche...',
      inputModeIA: 'IA',
      inputModeManual: 'Manuel',
      descLabel: 'Décris-toi et ce que tu cherches',
      modoLabel: 'MODE',
      rangoLabel: 'RANG',
      formatoLabel: 'FORMAT',
      descHint: 'Rôle, taille du groupe / recherche, division',
      groupSizeLabel: 'Combien êtes-vous dans le groupe?',
      findTeammatesIA: 'Trouver des coéquipiers ✨',
      buscarCompañeros: 'Trouver des coéquipiers',
      modoIndividual: 'Mode individuel',
      descriptionMin: 'Décris-toi un peu plus pour trouver le meilleur match.',
      warningNoMode: "Vous n'avez pas spécifié le mode de jeu",
      warningNoSize: "Vous n'avez pas spécifié le nombre de joueurs dans votre groupe",
      warningNoRank: "Vous avez sélectionné ranked mais n'avez pas spécifié votre rang",
      warningRankRequired: 'Pour jouer en ranked vous devez spécifier votre rang',
    },
    queue: {
      title: 'Recherche de coéquipiers...',
      subtitle: (n: number) => `Recherche de ${n} joueur${n !== 1 ? 's' : ''} pour compléter ton groupe`,
      elapsed: 'en file', details: 'Détails de recherche',
      labels: { game: 'Jeu', server: 'Serveur', mode: 'Mode', format: 'Format', rank: 'Rang', myGroup: 'Mon groupe', seeking: 'Recherche' },
      seekingValue: (n: number) => `${n} joueur${n !== 1 ? 's' : ''}`,
      cancel: 'Annuler la recherche', cancelling: 'Annulation...', cancelError: "Impossible d'annuler. Réessaie.",
    },
    match: {
      celebration: 'Match trouvé !', celebrationSub: 'Ton équipe est prête',
      title: 'Match trouvé !', matchInfo: 'Infos du match', participants: 'Participants',
      labels: { game: 'Jeu', server: 'Serveur', mode: 'Mode', players: 'Joueurs' },
      you: 'Toi', groupOf: (n: number) => `sur ${n} au total`, group: 'Groupe :', leave: 'Quitter',
    },
    chat: {
      title: 'Chat de groupe', live: 'En direct', loading: 'Chargement des messages...',
      empty: 'Sois le premier à écrire !', placeholder: 'Écris un message...',
      send: 'Envoyer', sendError: "Impossible d'envoyer le message.",
    },
    langSwitcher: {
      label: 'Langue',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
  ko: {
    landing: {
      badge: '실시간 매치메이킹',
      hero: {
        line1: '팀을 완성하고,',
        line2: '게임을 시작하세요.',
        subtitle: '회원가입 없음. 프로필 없음. 찾고, 만나고, 플레이하세요.',
        description: '같은 서버, 모드, 랭크에서 똑같은 것을 찾는 플레이어와 연결하세요.',
        cta: '팀원 찾기',
      },
      stats: { regLabel: '회원가입 불필요', freeLabel: '무료', mmLabel: '매치메이킹' },
      gamesTitle: '지원 게임',
      howItWorks: {
        title: '이용 방법',
        steps: [
          { step: '01', title: '게임 선택', desc: '게임, 서버, 모드, 랭크를 선택하세요. 몇 초면 끝납니다.' },
          { step: '02', title: '큐 참가', desc: '시스템이 실시간으로 호환되는 플레이어를 찾습니다.' },
          { step: '03', title: '팀 찾기', desc: '그룹이 완성되면 채팅으로 전략을 세우세요.' },
        ],
      },
      footer: 'WhoPlays — 게이머가 게이머를 위해 만들었습니다.',
      searchingNow: '지금 검색 중',
      searchingFirst: '첫 번째로 검색해보세요',
    },
    modal: {
      title: '팀원 찾기',
      subtitle: '큐에 참가하려면 정보를 입력하세요',
      close: '닫기',
      fields: {
        alias: '게임 내 닉네임', aliasPlaceholder: '예: SwiftWolf123',
        game: '게임', gamePlaceholder: '게임 선택',
        server: '서버', serverPlaceholder: '서버 선택',
        mode: '게임 모드', modePlaceholder: '모드 선택',
        teamFormat: '팀 형식', teamFormatPlaceholder: '형식 선택',
        rank: '랭크', rankPlaceholder: '랭크 선택',
        groupSize: '현재 그룹 인원',
      },
      validation: {
        aliasRequired: '닉네임을 입력하세요', aliasMin: '최소 2자', aliasMax: '최대 32자',
        gameRequired: '게임을 선택하세요', serverRequired: '서버를 선택하세요',
        modeRequired: '모드를 선택하세요', teamFormatRequired: '팀 형식을 선택하세요',
        rankRequired: '랭크를 선택하세요', groupSizeRequired: '그룹 인원을 입력하세요',
        groupSizeMin: '최소 1명', groupSizeMax: (max: number) => `최대 ${max}명`,
      },
      teamFormatOption: (name: string, size: number) => `${name} (${size}명)`,
      seekingPlayers: (n: number) => `${n}명의 플레이어를 찾는 중`,
      groupComplete: '그룹 완성', loadingGames: '게임 불러오는 중...',
      submitError: '큐 참가 실패. 다시 시도하세요.',
      cancel: '취소', submit: '팀원 찾기', submitting: '검색 중...',
      inputModeIA: 'AI',
      inputModeManual: '수동',
      descLabel: '자신과 원하는 것을 설명하세요',
      modoLabel: '모드',
      rangoLabel: '랭크',
      formatoLabel: '형식',
      descHint: '역할, 그룹 인원 / 모집 인원, 랭크',
      groupSizeLabel: '그룹에 몇 명이 있나요?',
      findTeammatesIA: '팀원 찾기 ✨',
      buscarCompañeros: '팀원 찾기',
      modoIndividual: '개인 모드',
      descriptionMin: '더 자세히 설명해주세요.',
      warningNoMode: '게임 모드를 지정하지 않았습니다',
      warningNoSize: '그룹 인원을 지정하지 않았습니다',
      warningNoRank: '랭크 게임을 선택했지만 랭크를 지정하지 않았습니다',
      warningRankRequired: '랭크 게임을 하려면 랭크를 지정해야 합니다',
    },
    queue: {
      title: '팀원을 찾는 중...',
      subtitle: (n: number) => `그룹을 완성하기 위해 ${n}명을 찾는 중`,
      elapsed: '대기 중', details: '검색 세부 정보',
      labels: { game: '게임', server: '서버', mode: '모드', format: '형식', rank: '랭크', myGroup: '내 그룹', seeking: '모집 중' },
      seekingValue: (n: number) => `${n}명`,
      cancel: '검색 취소', cancelling: '취소 중...', cancelError: '취소할 수 없습니다. 다시 시도하세요.',
    },
    match: {
      celebration: '매치 찾음!', celebrationSub: '팀이 준비되었습니다',
      title: '매치 찾음!', matchInfo: '매치 정보', participants: '참가자',
      labels: { game: '게임', server: '서버', mode: '모드', players: '플레이어' },
      you: '나', groupOf: (n: number) => `총 ${n}명 중`, group: '그룹:', leave: '나가기',
    },
    chat: {
      title: '그룹 채팅', live: '실시간', loading: '메시지 불러오는 중...',
      empty: '첫 번째로 메시지를 보내세요!', placeholder: '메시지 입력...',
      send: '전송', sendError: '메시지를 보낼 수 없습니다.',
    },
    langSwitcher: {
      label: '언어',
      es: 'Español', en: 'English', pt: 'Português', zh: '中文', ja: '日本語', ru: 'Русский', it: 'Italiano', fr: 'Français', ko: '한국어',
    },
  },
}

export default translations
