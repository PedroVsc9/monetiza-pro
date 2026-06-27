export const LOJAS_DEFAULT = [
  { id: '1', nome: 'Shopee',        logo: '🛍️', cor: '#EE4D2D', ativa: true,  plano: 'Grátis',   linkAfiliado: '' },
  { id: '2', nome: 'Amazon',        logo: '📦', cor: '#FF9900', ativa: true,  plano: 'Ouro',     linkAfiliado: '' },
  { id: '3', nome: 'Magalu',        logo: '🛒', cor: '#0086FF', ativa: true,  plano: 'Grátis',   linkAfiliado: '' },
  { id: '4', nome: 'Mercado Livre', logo: '🟡', cor: '#FFE600', ativa: true,  plano: 'Essencial',linkAfiliado: '' },
  { id: '5', nome: 'Shein',         logo: '👗', cor: '#222',    ativa: false, plano: 'Essencial',linkAfiliado: '' },
  { id: '6', nome: 'Natura',        logo: '🌿', cor: '#F26522', ativa: false, plano: 'Ouro',     linkAfiliado: '' },
  { id: '7', nome: 'Rakuten',       logo: '🔴', cor: '#BF0000', ativa: false, plano: 'Diamante', linkAfiliado: '' },
  { id: '8', nome: 'Afilio',        logo: '🔗', cor: '#6366f1', ativa: false, plano: 'Essencial',linkAfiliado: '' },
];

export const PRODUTOS_DEFAULT = [];

export const TEMPLATE_DEFAULT = {
  emojiTitulo: '🛍️',
  ctaTexto: '🔗 Link p/ comprar:',
  emojiAntes: '🏷️',
  emojiDepois: '🔥🔥',
  rodape: '_*Promoção sujeita a alteração a qualquer momento*_',
  modoAvancado: false,
  textoAvancado: '',
};

export const CONFIG_SITE_DEFAULT = {
  titulo: 'Promos do Dia',
  descricao: '🔥 As melhores ofertas para você e sua família!',
  slug: '',
  mostrarCupons: true,
};

export const LINKBIO_DEFAULT = {
  nome: '',
  bio: 'Aqui você vai encontrar as melhores ofertas e achados para você e o seu lar 🏠',
  foto: '',
  links: [],
};

export const CUPONS_DEFAULT = [];

export const PLANOS = ['Grátis', 'Essencial', 'Ouro', 'Diamante'];
export const PLANO_COR = {
  'Grátis':    '#6b7280',
  'Essencial': '#3b82f6',
  'Ouro':      '#f59e0b',
  'Diamante':  '#8b5cf6',
};
