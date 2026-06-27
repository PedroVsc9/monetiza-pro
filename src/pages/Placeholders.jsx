import { BarChart2, Megaphone, Image, Settings } from 'lucide-react';

function ComingSoon({ icon: Icon, label, desc }) {
  return (
    <div className="page">
      <div className="page-header">
        <div><h1 className="page-title">{label}</h1></div>
      </div>
      <div className="empty-state" style={{ minHeight: 400 }}>
        <Icon size={52} style={{ color: '#6366f1', opacity: 0.4 }} />
        <h2 style={{ marginTop: 16, fontSize: 18 }}>{label}</h2>
        <p style={{ color: '#6b7280', maxWidth: 320, textAlign: 'center' }}>{desc || 'Esta funcionalidade estará disponível em breve.'}</p>
        <span className="badge-soon">Em breve</span>
      </div>
    </div>
  );
}

export const Relatorios = () => <ComingSoon icon={BarChart2} label="Relatórios" desc="Acompanhe seus cliques, conversões e desempenho por produto e loja." />;
export const Divulgador = () => <ComingSoon icon={Megaphone} label="Divulgador" desc="Ferramentas avançadas para divulgar seus links e produtos em múltiplos canais." />;
export const Stories = () => <ComingSoon icon={Image} label="Template de Stories" desc="Crie templates profissionais de Stories para Instagram e WhatsApp com seus produtos." />;
export const Automacao = () => <ComingSoon icon={Settings} label="Automação WhatsApp" desc="Configure mensagens automáticas e fluxos de disparo para seus grupos de WhatsApp." />;
