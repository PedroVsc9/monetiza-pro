import { Link } from 'react-router-dom';
import { Package, Store, Link2, MessageSquare, ExternalLink, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserStorage } from '../hooks/useUserStorage';
import { LOJAS_DEFAULT, PRODUTOS_DEFAULT } from '../data/defaults';

export default function Inicio() {
  const { user } = useAuth();
  const [lojas]   = useUserStorage('lojas', LOJAS_DEFAULT);
  const [produtos] = useUserStorage('produtos', PRODUTOS_DEFAULT);

  const stats = [
    { label: 'Produtos', value: produtos.length, icon: Package, to: '/produtos', color: '#6366f1' },
    { label: 'Lojas ativas', value: lojas.filter(l => l.ativa).length, icon: Store, to: '/lojas', color: '#10b981' },
    { label: 'Lojas total', value: lojas.length, icon: TrendingUp, to: '/lojas', color: '#f59e0b' },
    { label: 'Disparos', value: 0, icon: MessageSquare, to: '/disparo', color: '#ef4444' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Olá, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="page-sub">Bem-vindo ao seu painel de afiliado</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(s => (
          <Link key={s.label} to={s.to} className="stat-card">
            <div className="stat-icon" style={{ background: s.color + '22', color: s.color }}>
              <s.icon size={22} />
            </div>
            <div>
              <div className="stat-val">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="section-title">Acesso rápido</h2>
      <div className="quick-grid">
        {[
          { to: '/produtos', icon: Package, label: 'Adicionar produto' },
          { to: '/disparo',  icon: MessageSquare, label: 'Gerar texto de disparo' },
          { to: '/site',     icon: ExternalLink,  label: 'Ver meu site de ofertas' },
          { to: '/linkbio',  icon: Link2,         label: 'Editar Link Bio' },
        ].map(q => (
          <Link key={q.to} to={q.to} className="quick-card">
            <q.icon size={18} />
            <span>{q.label}</span>
          </Link>
        ))}
      </div>

      {produtos.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginTop: 28 }}>Produtos recentes</h2>
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr><th>Produto</th><th>Loja</th><th>Preço</th><th>Ações</th></tr>
              </thead>
              <tbody>
                {produtos.slice(0, 6).map(p => {
                  const loja = lojas.find(l => l.id === p.lojaId);
                  return (
                    <tr key={p.id}>
                      <td className="td-nome">{p.nome}</td>
                      <td>{loja ? `${loja.logo} ${loja.nome}` : '—'}</td>
                      <td><span className="badge-green">R$ {Number(p.precoPor).toFixed(2)}</span></td>
                      <td>
                        <Link to="/disparo" state={{ produtoId: p.id }} className="td-btn">Gerar disparo</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {produtos.length === 0 && (
        <div className="empty-state">
          <Package size={48} />
          <p>Nenhum produto cadastrado ainda</p>
          <Link to="/produtos" className="btn btn-primary">Cadastrar primeiro produto</Link>
        </div>
      )}
    </div>
  );
}
