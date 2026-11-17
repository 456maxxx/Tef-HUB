import type { Payload } from 'payload'

/**
 * Conteúdo demonstrativo baseado em pontos e espaços de interesse de Tefé/AM.
 * - Cria somente os registros que ainda não existem (não apaga nem sobrescreve dados).
 * - Roda em desenvolvimento; em produção, defina SEED_DEMO_DATA=true para habilitar.
 * - Para desligar: SEED_DEMO_DATA=false no .env.local.
 * - Imagens geradas são ilustrativas, não fotografias documentais dos locais.
 */
const SAMPLE = [
  {
    slug: 'lago-de-tefe',
    name: 'Lago de Tefé',
    eyebrow: 'Paisagem do Médio Solimões',
    category: 'natureza',
    location: 'Tefé, Amazonas',
    duration: 'Visita breve ou passeio planejado',
    difficulty: 'facil',
    featured: true,
    shortDescription:
      'Uma das paisagens naturais mais marcantes de Tefé, ligada ao cotidiano da cidade e às rotas fluviais da região.',
    description:
      'O Lago de Tefé faz parte da paisagem que identifica o município e sua relação com os rios e as comunidades do Médio Solimões. É um cenário de contemplação e de experiências ligadas à natureza amazônica.\n\nPara passeios embarcados, consulte operadores locais e confirme as condições de navegação e o nível das águas. Este cadastro é demonstrativo; horários, serviços e condições de visitação devem ser confirmados antes da visita.',
    highlights: ['Paisagem amazônica', 'Contemplação do lago', 'Cultura e vida ribeirinha'],
    colors: ['#1d5a4a', '#2f7d68', '#0f2f27'],
  },
  {
    slug: 'praia-da-ponta-branca',
    name: 'Praia da Ponta Branca',
    eyebrow: 'Orla e lazer em Tefé',
    category: 'natureza',
    location: 'Orla de Tefé, Amazonas',
    duration: 'Conforme condições do local',
    difficulty: 'facil',
    featured: true,
    shortDescription:
      'Área pública de orla e praia fluvial reconhecida como espaço de lazer e convivência em Tefé.',
    description:
      'A Praia da Ponta Branca integra os espaços públicos de orla de Tefé. A Prefeitura publicou regras municipais para utilização da orla e da praia, contemplando atividades de lazer, esporte e comércio autorizado.\n\nA paisagem e a faixa de praia podem mudar conforme o nível do rio. Consulte as regras e condições atuais do espaço antes de organizar a visita. Este cadastro é demonstrativo e não substitui informações oficiais.',
    highlights: ['Orla de Tefé', 'Lazer e convivência', 'Paisagem fluvial'],
    colors: ['#a4572f', '#e0a15a', '#2c1a2b'],
  },
  {
    slug: 'catedral-de-santa-teresa',
    name: 'Catedral de Santa Teresa',
    eyebrow: 'Patrimônio e memória',
    category: 'cultura',
    location: 'Centro de Tefé, Amazonas',
    duration: 'Visita breve (estimativa)',
    difficulty: 'facil',
    featured: true,
    shortDescription:
      'Um dos principais marcos históricos e religiosos de Tefé, ligado à formação e à memória da cidade.',
    description:
      'A Catedral de Santa Teresa é um marco arquitetônico e religioso de Tefé. Segundo o registro histórico da Prefeitura, sua pedra fundamental foi lançada em 15 de outubro de 1922 e a inauguração ocorreu em 19 de outubro de 1935.\n\nPor ser um espaço religioso em funcionamento, o acesso ao interior pode depender de celebrações e atividades. Respeite os momentos de culto e confirme a programação local. Este cadastro é demonstrativo.',
    highlights: ['História de Tefé', 'Arquitetura religiosa', 'Memória cultural'],
    colors: ['#8a6a4a', '#c7a77a', '#3d3027'],
  },
  {
    slug: 'casa-do-artesao-de-tefe',
    name: 'Casa do Artesão de Tefé',
    eyebrow: 'Arte e cultura local',
    category: 'cultura',
    location: 'Centro de Tefé, Amazonas',
    duration: 'Visita breve (estimativa)',
    difficulty: 'facil',
    featured: false,
    shortDescription:
      'Espaço cultural identificado pela Secretaria Municipal de Cultura como galeria de arte no centro de Tefé.',
    description:
      'A Casa do Artesão de Tefé aparece no mapa de espaços culturais da Secretaria Municipal de Cultura, classificada como galeria de arte. É uma referência para conhecer e valorizar a produção artística e artesanal local.\n\nConsulte a Secretaria Municipal de Cultura para confirmar funcionamento, atividades e disponibilidade de visitação. Este cadastro é demonstrativo.',
    highlights: ['Produção artística', 'Cultura local', 'Artesanato'],
    colors: ['#8a5a2b', '#c9923a', '#3b2410'],
  },
  {
    slug: 'praca-santa-teresa',
    name: 'Praça Santa Teresa',
    eyebrow: 'Encontro no centro da cidade',
    category: 'cultura',
    location: 'Centro de Tefé, Amazonas',
    duration: 'Visita breve (estimativa)',
    difficulty: 'facil',
    featured: false,
    shortDescription:
      'Espaço público de convivência localizado na área central e listado no mapa cultural municipal.',
    description:
      'A Praça Santa Teresa está cadastrada entre os espaços culturais de Tefé pela Secretaria Municipal de Cultura. É uma referência urbana para conhecer a área central e observar a rotina da cidade.\n\nA programação e as condições do espaço podem mudar. Consulte os canais municipais para informações atualizadas. Este cadastro é demonstrativo.',
    highlights: ['Espaço público', 'Área central', 'Convivência'],
    colors: ['#4d6b4c', '#9aab73', '#253c2c'],
  },
  {
    slug: 'feira-municipal-de-tefe',
    name: 'Feira Municipal de Tefé',
    eyebrow: 'Sabores e cotidiano',
    category: 'gastronomia',
    location: 'Centro de Tefé, Amazonas',
    duration: 'Visita breve (estimativa)',
    difficulty: 'facil',
    featured: false,
    shortDescription:
      'Espaço de comércio e encontro onde moradores e visitantes podem conhecer produtos e hábitos alimentares regionais.',
    description:
      'A Feira Municipal faz parte da dinâmica comercial de Tefé e é uma oportunidade de conhecer produtos da região e o cotidiano da cidade. A Prefeitura identifica a Rua Duque de Caxias como uma das principais vias de acesso à feira.\n\nA oferta de produtos e os horários podem variar. Confirme o funcionamento localmente. Este cadastro é demonstrativo e não representa um anúncio de vendedores específicos.',
    highlights: ['Produtos regionais', 'Comércio local', 'Cultura alimentar'],
    colors: ['#6b3a1f', '#b8693a', '#25140a'],
  },
  {
    slug: 'reserva-de-desenvolvimento-sustentavel-mamiraua',
    name: 'Reserva Mamirauá',
    eyebrow: 'Conservação na Amazônia',
    category: 'aventura',
    location: 'Médio Solimões; acesso organizado a partir de Tefé, AM',
    duration: 'Conforme roteiro autorizado',
    difficulty: 'moderada',
    featured: true,
    shortDescription:
      'Área protegida de referência em conservação, pesquisa e turismo de base comunitária na região do Médio Solimões.',
    description:
      'A Reserva de Desenvolvimento Sustentável Mamirauá está próxima de Tefé e é uma referência em conservação da biodiversidade amazônica e turismo de base comunitária. As experiências e possibilidades de visita dependem do setor, da época do ano e da organização local.\n\nPlaneje a visita com antecedência junto aos canais oficiais e operadores autorizados. Confirme regras, logística fluvial, condições ambientais e disponibilidade. Este cadastro é demonstrativo.',
    highlights: ['Conservação da biodiversidade', 'Turismo de base comunitária', 'Pesquisa e educação ambiental'],
    colors: ['#27553a', '#5f8f55', '#10281b'],
  },
  {
    slug: 'seminario-sao-jose',
    name: 'Seminário São José',
    eyebrow: 'Patrimônio histórico de Tefé',
    category: 'cultura',
    location: 'Centro de Tefé, Amazonas',
    duration: 'Visita externa breve (estimativa)',
    difficulty: 'facil',
    featured: false,
    shortDescription:
      'Edificação histórica ligada à educação e à formação cultural do Médio Solimões.',
    description:
      'O Seminário São José é citado em roteiros locais como um dos prédios históricos de Tefé. Sua construção começou em 1913 e foi concluída em 1932, tendo desempenhado papel importante na formação e na educação regional.\n\nEste cadastro é demonstrativo. A possibilidade de visitação interna, horários e regras de acesso devem ser confirmados com os responsáveis pelo espaço.',
    highlights: ['Memória da educação regional', 'Arquitetura histórica', 'Patrimônio de Tefé'],
    colors: ['#67513c', '#b08b5b', '#30251c'],
  },
  {
    slug: 'trilha-interpretativa-flona-tefe',
    name: 'Trilha Interpretativa da Floresta Nacional de Tefé',
    eyebrow: 'Experiência guiada na floresta',
    category: 'aventura',
    location: 'Floresta Nacional de Tefé, região de Tefé, Amazonas',
    duration: 'Conforme roteiro comunitário autorizado',
    difficulty: 'moderada',
    featured: false,
    shortDescription:
      'Experiência de interpretação ambiental conduzida por moradores e responsáveis locais, conforme a programação disponível.',
    description:
      'A Floresta Nacional de Tefé divulga a possibilidade de trilha interpretativa guiada por comunitários, além de vivências e troca de experiências com moradores. A atividade depende de organização local, autorização, condições ambientais e disponibilidade de acompanhamento.\n\nNão realize trilhas por conta própria. Combine previamente a experiência com os responsáveis locais e confirme regras, transporte e condições de visitação. Este cadastro é demonstrativo.',
    highlights: ['Interpretação ambiental guiada', 'Conhecimento comunitário', 'Floresta amazônica'],
    colors: ['#244d3a', '#7d9a5b', '#122b20'],
  },
  {
    slug: 'cafe-regional-feira-municipal',
    name: 'Café Regional da Feira Municipal',
    eyebrow: 'Sabores do Médio Solimões',
    category: 'gastronomia',
    location: 'Feira Municipal de Tefé, orla de Tefé, Amazonas',
    duration: 'Conforme funcionamento dos boxes',
    difficulty: 'facil',
    featured: false,
    shortDescription:
      'Uma experiência gastronômica demonstrativa para conhecer itens regionais e opções de café da manhã encontradas na Feira Municipal.',
    description:
      'Roteiros locais sobre Tefé destacam a Feira Municipal como um lugar para conhecer ingredientes e sabores regionais. Entre os exemplos citados estão açaí batido, farinha, frutas da região, pupunha, cará roxo e tapiocas com diferentes recheios.\n\nA oferta de alimentos, os vendedores e os horários podem mudar. Confirme o funcionamento no local. Este cadastro descreve uma experiência gastronômica demonstrativa, não um estabelecimento ou cardápio específico.',
    highlights: ['Açaí e frutas regionais', 'Pupunha e tapioca', 'Culinária do Médio Solimões'],
    colors: ['#754326', '#c58a45', '#2d1b12'],
  },
  {
    slug: 'floresta-nacional-de-tefe',
    name: 'Floresta Nacional de Tefé',
    eyebrow: 'Floresta e comunidades',
    category: 'aventura',
    location: 'Região de Tefé e municípios vizinhos, Amazonas',
    duration: 'Conforme roteiro e autorização',
    difficulty: 'moderada',
    featured: false,
    shortDescription:
      'Unidade de conservação que protege ambientes amazônicos e envolve comunidades tradicionais da região.',
    description:
      'A Floresta Nacional de Tefé é uma área protegida gerida pelo ICMBio, com participação de comunidades tradicionais. Iniciativas de turismo de base comunitária podem envolver vivências, trilhas interpretativas e contato com saberes locais, conforme a programação e as regras vigentes.\n\nO acesso e as atividades precisam ser combinados com os responsáveis locais. Verifique autorizações, transporte fluvial e condições de visitação antes de planejar a experiência. Este cadastro é demonstrativo.',
    highlights: ['Unidade de conservação', 'Comunidades tradicionais', 'Turismo de base comunitária'],
    colors: ['#244d3a', '#6b8f55', '#122b20'],
  },
]

async function makeImage(colors: string[]) {
  const sharp = (await import('sharp')).default
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${colors[0]}"/><stop offset=".55" stop-color="${colors[1]}"/><stop offset="1" stop-color="${colors[2]}"/>
    </linearGradient>
    <radialGradient id="s" cx=".72" cy=".28" r=".2">
      <stop offset="0" stop-color="#f2cf8b" stop-opacity=".9"/><stop offset="1" stop-color="#f2cf8b" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#g)"/><rect width="1600" height="1000" fill="url(#s)"/>
</svg>`
  return sharp(Buffer.from(svg)).png().toBuffer()
}

let seeding = false

export async function seedDemoData(payload: Payload) {
  const flag = process.env.SEED_DEMO_DATA
  if (flag === 'false') return
  if (process.env.NODE_ENV === 'production' && flag !== 'true') return
  if (seeding) return
  seeding = true

  try {
    let created = 0
    for (const item of SAMPLE) {
      const existing = await payload.find({
        collection: 'attractions',
        where: { slug: { equals: item.slug } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      if (existing.docs.length > 0) continue

      const data = await makeImage(item.colors)
      const image = await payload.create({
        collection: 'media',
        data: { alt: `Ilustração demonstrativa de ${item.name}; não é fotografia documental do local.` },
        file: {
          data,
          mimetype: 'image/png',
          name: `${item.slug}-ilustracao.png`,
          size: data.length,
        },
        overrideAccess: true,
      } as any)

      await payload.create({
        collection: 'attractions',
        data: {
          name: item.name,
          slug: item.slug,
          eyebrow: item.eyebrow,
          category: item.category,
          location: item.location,
          duration: item.duration,
          difficulty: item.difficulty,
          featured: item.featured,
          shortDescription: item.shortDescription,
          description: item.description,
          highlights: item.highlights.map((text) => ({ text })),
          image: image.id,
          _status: 'published',
        },
        draft: false,
        overrideAccess: true,
        context: { skipCacheRevalidation: true },
      } as any)
      created += 1
    }
    if (created > 0) {
      payload.logger.info(`TFHub: ${created} pontos de demonstração de Tefé criados.`)
    }
  } catch (error) {
    payload.logger.error({ err: error, msg: 'TFHub: não foi possível criar os dados de demonstração.' })
  } finally {
    seeding = false
  }
}
