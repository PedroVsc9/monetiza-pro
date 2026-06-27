import { useState } from 'react';
import { Plus, Trash2, Edit2, X, MessageSquare, Search } from 'lucide-react';
import { useUserStorage } from '../hooks/useUserStorage';
import { LOJAS_DEFAULT, PRODUTOS_DEFAULT } from '../data/defaults';
import { useNavigate } from 'react-router-dom';

const EMPTY = { nome: '', imagem: '', precoDe: '', precoPor: '', parcelas: '', valorParcela: '', cupom: '', link: '', lojaId: '', descricao: '' };

export default function Produtos() {
  const [lojas]    = useUserStorage('lojas', LOJAS_DEFAULT);
  const [produtos, setProdutos] = useUserStorage('produtos', PRODUTOS_DEFAULT);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);
  const [busca, setBusca] = useState('');
  const [filtroLoja, setFiltroLoja] = useState('');
  const navigate = useNavigate();

  const abrir = (p = null) => {
    setForm(p ? { ...p } : { ...EMPTY });
    setModal(p ? p.id : 'new');
  };

  const f = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const salvar = () => {
    if (!form.nome.trim() || !form.precoPor) return alert('Nome e preço são obrigatórios.');
    const prod = {
      ...form,
      precoDe:      parseFloat(form.precoDe) || 0,
      precoPor:     parseFloat(form.precoPor) || 0,
      parcelas:     parseInt(form.parcelas)   || 0,
      valorParcela: parseFloat(form.valorParcela) || 0,
    };
    if (modal === 'new') {
      setProdutos(p => [...p, { ...prod, id: Date.now().toString() }]);
    } else {
      setProdutos(p => p.map(x => x.id === modal ? { ...prod, id: modal } : x));
    }
    setModal(null);
  };

  const remover = (id) => { if (confirm('Remover produto?')) setProdutos(p => p.filter(x => x.id !== id)); };

  const gerarDisparo = (prod) => {
    sessionStorage.setItem('disparo_prod', JSON.stringify(prod));
    navigate('/disparo');
  };

  const visíveis = produtos
    .filter(p => !busca || p.nome.toLowerCase().includes(busca.toLowerCase()))
    .filter(p => !filtroLoja || p.lojaId === filtroLoja);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Produtos</h1>
          <p className="page-sub">Início › Produtos — {produtos.length} cadastrados</p>
        </div>
        <button className="btn btn-primary" onClick={() => abrir()}>
          <Plus size={15}/> Novo Produto
        </button>
      </div>

      <div className="filters-row">
        <div className="search-box">
          <Search size={15}/>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar produto..." />
        </div>
        <select className="input select-sm" value={filtroLoja} onChange={e => setFiltroLoja(e.target.value)}>
          <option value="">Todas as lojas</option>
          {lojas.map(l => <option key={l.id} value={l.id}>{l.logo} {l.nome}</option>)}
        </select>
      </div>

      {visíveis.length === 0 ? (
        <div className="empty-state">
          <Package size={48}/>
          <p>{produtos.length === 0 ? 'Nenhum produto cadastrado' : 'Nenhum resultado'}</p>
          {produtos.length === 0 && <button className="btn btn-primary" onClick={() => abrir()}>Adicionar primeiro produto</button>}
        </div>
      ) : (
        <div className="produtos-grid">
          {visíveis.map(p => {
            const loja = lojas.find(l => l.id === p.lojaId);
            return (
              <div key={p.id} className="produto-card">
                {p.imagem
                  ? <img src={p.imagem} alt={p.nome} className="prod-img" onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                  : null}
                <div className="prod-img-ph" style={{ display: p.imagem ? 'none' : 'flex' }}>📦</div>
                <div className="prod-body">
                  {loja && <span className="loja-tag">{loja.logo} {loja.nome}</span>}
                  <p className="prod-nome">{p.nome}</p>
                  <div className="prod-precos">
                    {p.precoDe > 0 && <s className="preco-de">R$ {p.precoDe.toFixed(2)}</s>}
                    <span className="preco-por">R$ {p.precoPor.toFixed(2)}</span>
                  </div>
                  {p.parcelas > 0 && <span className="prod-parcela">📋 {p.parcelas}x de R$ {p.valorParcela.toFixed(2)} s/ juros</span>}
                  {p.cupom && <span className="prod-cupom">🏷️ {p.cupom}</span>}
                </div>
                <div className="prod-actions">
                  <button className="btn btn-wpp" onClick={() => gerarDisparo(p)}>
                    <MessageSquare size={13}/> Gerar disparo
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => abrir(p)}><Edit2 size={14}/></button>
                  <button className="btn btn-ghost btn-sm danger" onClick={() => remover(p.id)}><Trash2 size={14}/></button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{modal === 'new' ? 'Novo Produto' : 'Editar Produto'}</h3>
              <button onClick={() => setModal(null)}><X size={18}/></button>
            </div>
            <div className="modal-body grid2">
              <div>
                <div className="field-group"><label>Nome do produto *</label>
                  <input className="input" value={form.nome} onChange={f('nome')} placeholder="Ex: Kit Amaciante Comfort..." autoFocus /></div>
                <div className="field-group"><label>URL da imagem</label>
                  <input className="input" value={form.imagem} onChange={f('imagem')} placeholder="https://..." /></div>
                <div className="field-group"><label>Link de afiliado *</label>
                  <input className="input" value={form.link} onChange={f('link')} placeholder="https://shopee.com.br/produto..." /></div>
                <div className="field-group"><label>Loja</label>
                  <select className="input" value={form.lojaId} onChange={f('lojaId')}>
                    <option value="">— Selecionar —</option>
                    {lojas.map(l => <option key={l.id} value={l.id}>{l.logo} {l.nome}</option>)}
                  </select></div>
              </div>
              <div>
                <div className="field-group"><label>Preço DE (original)</label>
                  <input className="input" type="number" step="0.01" value={form.precoDe} onChange={f('precoDe')} placeholder="86.25" /></div>
                <div className="field-group"><label>Preço POR (promoção) *</label>
                  <input className="input" type="number" step="0.01" value={form.precoPor} onChange={f('precoPor')} placeholder="32.00" /></div>
                <div className="field-group"><label>Parcelas</label>
                  <input className="input" type="number" value={form.parcelas} onChange={f('parcelas')} placeholder="21" /></div>
                <div className="field-group"><label>Valor por parcela</label>
                  <input className="input" type="number" step="0.01" value={form.valorParcela} onChange={f('valorParcela')} placeholder="1.50" /></div>
                <div className="field-group"><label>Cupom de desconto</label>
                  <input className="input" value={form.cupom} onChange={f('cupom')} placeholder="PROMOS30" /></div>
              </div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={salvar}>Salvar Produto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Package(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
}
