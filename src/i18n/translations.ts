export type Language = 'es' | 'en'

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
  langSwitcher: { label: string; es: string; en: string }
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
      es: 'Español',
      en: 'English',
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
      es: 'Español',
      en: 'English',
    },
  },
}

export default translations
