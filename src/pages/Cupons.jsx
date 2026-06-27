import { useState } from 'react';
import { Plus, Trash2, Edit2, X, Copy, Check } from 'lucide-react';
import { useUserStorage } from '../hooks/useUserStorage';
import { CUPONS_DEFAULT, LOJAS_DEFAULT } from '../data/defaults';

const EMPTY = { codigo: '', descricao: '', desconto: '', lojaId: '', validade: '', tipo: 'percentual' };

export default function Cupons() {
  const [lojas]  = useUserStorage('lojas', LOJAS_DEFAULT);
  const [cupons, setCupons] = useUserStorage('cupons', CUPONS_DEFAULT);
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(EMPTY);
  const [copied, setCopied] = useState('');

  const abrir = (c = null) => { setForm(c ? {...c} : {...EMPTY}); setModal(c ? c.id : 'new'); };
  const f = (field) => (e) => setForm(p => ({...p, [field]: e.target.value}));

  const salvar = () => {
    if (!form.codigo.trim()) return;
    if (modal === 'new') setCupons(p => [...p, { ...form, id: Date.now().toString() }]);
    else setCupons(p => p.map(c => c.id === modal ? { ...form, id: modal } : c));
    setModal(null);
  };

  const remover = (id) => { if (confirm('Remover cupom?')) setCupons(p => p.filter(c => c.id !== id)); };

  const copiarCodigo = async (codigo) => {
    await navigator.clipboard.writeText(codigo);
    setCopied(codigo);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div><h1 className="page-title">Cupons</h1><p className="page-sub">Início › Cupons</p></div>
        <button className="btn btn-primary" onClick={() => abrir()}><Plus size={15}/> Novo Cupom</button>
      </div>

      {cupons.length === 0 ? (
        <div className="empty-state">
          <span style={{fontSize:48}}>🏷️</span>
          <p>Nenhum cupom cadastrado</p>
          <button className="btn btn-primary" onClick={() => abrir()}>Adicionar cupom</button>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Código</th><th>Desconto</th><th>Loja</th><th>Validade</th><th>Ações</th></tr></thead>
            <tbody>
              {cupons.map(c => {
                const loja = lojas.find(l => l.id === c.lojaId);
                return (
                  <tr key={c.id}>
                    <td>
                      <span className="cupom-code">{c.codigo}</span>
                    </td>
                    <td>{c.desconto}{c.tipo === 'percentual' ? '%' : ' R$'} {c.descricao && `— ${c.descricao}`}</td>
                    <td>{loja ? `${loja.logo} ${loja.nome}` : '—'}</td>
                    <td>{c.validade || '—'}</td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        <button className="btn btn-ghost btn-sm" onClick={() => copiarCodigo(c.codigo)} title="Copiar">
                          {copied === c.codigo ? <Check size={13} color="#10b981"/> : <Copy size={13}/>}
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => abrir(c)}><Edit2 size={13}/></button>
                        <button className="btn btn-ghost btn-sm danger" onClick={() => remover(c.id)}><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{modal === 'new' ? 'Novo Cupom' : 'Editar Cupom'}</h3>
              <button onClick={() => setModal(null)}><X size={18}/></button>
            </div>
            <div className="modal-body">
              <div className="field-group"><label>Código do cupom *</label>
                <input className="input" value={form.codigo} onChange={f('codigo')} placeholder="PROMO30" autoFocus style={{textTransform:'uppercase'}} /></div>
              <div className="field-group"><label>Descrição</label>
                <input className="input" value={form.descricao} onChange={f('descricao')} placeholder="Ex: 30% de desconto" /></div>
              <div className="grid2">
                <div className="field-group"><label>Tipo</label>
                  <select className="input" value={form.tipo} onChange={f('tipo')}>
                    <option value="percentual">Percentual (%)</option>
                    <option value="fixo">Valor fixo (R$)</option>
                  </select></div>
                <div className="field-group"><label>Desconto</label>
                  <input className="input" type="number" value={form.desconto} onChange={f('desconto')} placeholder="30" /></div>
              </div>
              <div className="field-group"><label>Loja</label>
                <select className="input" value={form.lojaId} onChange={f('lojaId')}>
                  <option value="">Todas as lojas</option>
                  {lojas.map(l => <option key={l.id} value={l.id}>{l.logo} {l.nome}</option>)}
                </select></div>
              <div className="field-group"><label>Válido até</label>
                <input className="input" type="date" value={form.validade} onChange={f('validade')} /></div>
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
