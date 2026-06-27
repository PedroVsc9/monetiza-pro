import { useState } from 'react';
import { Plus, Settings, Trash2, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { useUserStorage } from '../hooks/useUserStorage';
import { LOJAS_DEFAULT, PLANOS, PLANO_COR } from '../data/defaults';

const EMPTY = { nome: '', logo: '🛍️', cor: '#6366f1', linkAfiliado: '', plano: 'Grátis', ativa: true };

export default function Lojas() {
  const [lojas, setLojas] = useUserStorage('lojas', LOJAS_DEFAULT);
  const [filtro, setFiltro] = useState('Todos');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [busca, setBusca] = useState('');

  const abrir = (loja = null) => {
    setForm(loja ? { ...loja } : { ...EMPTY, id: undefined });
    setModal(loja ? loja.id : 'new');
  };

  const salvar = () => {
    if (!form.nome.trim()) return;
    if (modal === 'new') {
      setLojas(p => [...p, { ...form, id: Date.now().toString() }]);
    } else {
      setLojas(p => p.map(l => l.id === modal ? { ...l, ...form } : l));
    }
    setModal(null);
  };

  const remover = (id) => { if (confirm('Remover esta loja?')) setLojas(p => p.filter(l => l.id !== id)); };
  const toggle = (id) => setLojas(p => p.map(l => l.id === id ? { ...l, ativa: !l.ativa } : l));

  const counts = { Todos: lojas.length };
  PLANOS.forEach(p => { counts[p] = lojas.filter(l => l.plano === p).length; });

  const visiveis = lojas
    .filter(l => filtro === 'Todos' || l.plano === filtro)
    .filter(l => l.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Lojas</h1>
          <p className="page-sub">Início › Configurar Lojas</p>
        </div>
        <button className="btn btn-primary" onClick={() => abrir()}>
          <Plus size={15}/> Nova Loja
        </button>
      </div>

      <input className="search-input" placeholder="🔍  Pesquisar loja..." value={busca} onChange={e => setBusca(e.target.value)} />

      <div className="filter-tabs">
        {['Todos', ...PLANOS].map(p => (
          <button key={p} className={`ftab ${filtro === p ? 'active' : ''}`} onClick={() => setFiltro(p)}>
            <span className="ftab-count">{counts[p] ?? 0}</span> {p}
          </button>
        ))}
      </div>

      <div className="lojas-grid">
        {visiveis.map(loja => (
          <div key={loja.id} className={`loja-card ${!loja.ativa ? 'dimmed' : ''}`}>
            <span className="loja-plano" style={{ background: PLANO_COR[loja.plano] }}>{loja.plano}</span>
            <div className="loja-logo">{loja.logo}</div>
            <div className="loja-nome">{loja.nome}</div>
            <div className="loja-footer">
              <button className="btn btn-primary btn-sm" onClick={() => abrir(loja)}>
                <Settings size={13}/> Configurar
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => toggle(loja.id)} title={loja.ativa ? 'Desativar' : 'Ativar'}>
                {loja.ativa ? <ToggleRight size={18} color="#10b981"/> : <ToggleLeft size={18}/>}
              </button>
              <button className="btn btn-ghost btn-sm danger" onClick={() => remover(loja.id)}>
                <Trash2 size={14}/>
              </button>
            </div>
          </div>
        ))}
        {visiveis.length === 0 && (
          <div className="empty-state" style={{ gridColumn: '1/-1' }}>
            <Store size={40}/>
            <p>Nenhuma loja encontrada</p>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{modal === 'new' ? 'Nova Loja' : `Editar — ${lojas.find(l=>l.id===modal)?.nome}`}</h3>
              <button onClick={() => setModal(null)}><X size={18}/></button>
            </div>
            <div className="modal-body">
              <div className="field-group">
                <label>Emoji / Ícone</label>
                <input className="input" value={form.logo} onChange={e => setForm(f=>({...f, logo: e.target.value}))} placeholder="🛍️" />
              </div>
              <div className="field-group">
                <label>Nome da loja *</label>
                <input className="input" value={form.nome} onChange={e => setForm(f=>({...f, nome: e.target.value}))} placeholder="Ex: Shopee" autoFocus />
              </div>
              <div className="field-group">
                <label>Link de afiliado base</label>
                <input className="input" value={form.linkAfiliado} onChange={e => setForm(f=>({...f, linkAfiliado: e.target.value}))} placeholder="https://..." />
              </div>
              <div className="field-group">
                <label>Plano</label>
                <select className="input" value={form.plano} onChange={e => setForm(f=>({...f, plano: e.target.value}))}>
                  {PLANOS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Status</label>
                <select className="input" value={form.ativa ? 'sim' : 'nao'} onChange={e => setForm(f=>({...f, ativa: e.target.value==='sim'}))}>
                  <option value="sim">Ativa</option>
                  <option value="nao">Inativa</option>
                </select>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={salvar}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
