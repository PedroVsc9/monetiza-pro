import { useState } from 'react';
import { Save, ExternalLink, Eye } from 'lucide-react';
import { useUserStorage } from '../hooks/useUserStorage';
import { CONFIG_SITE_DEFAULT, PRODUTOS_DEFAULT, LOJAS_DEFAULT } from '../data/defaults';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function MeuSite() {
  const [config, setConfig] = useUserStorage('config_site', CONFIG_SITE_DEFAULT);
  const [form, setForm] = useState({ ...config });
  const [saved, setSaved] = useState(false);
  const [produtos] = useUserStorage('produtos', PRODUTOS_DEFAULT);
  const [lojas]    = useUserStorage('lojas', LOJAS_DEFAULT);
  const [tab, setTab] = useState('config');

  const f = (field) => (e) => setForm(p => ({...p, [field]: e.target.value}));

  const salvar = () => {
    setConfig(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div><h1 className="page-title">Meu Site</h1><p className="page-sub">Início › Site</p></div>
      </div>

      <div className="site-tabs">
        <button className={tab==='config'?'active':''} onClick={()=>setTab('config')}>⚙️ Configurações</button>
        <button className={tab==='preview'?'active':''} onClick={()=>setTab('preview')}>👁️ Pré-visualização</button>
      </div>

      {tab === 'config' && (
        <div className="card" style={{marginTop:16}}>
          <h3 className="card-title">Geral</h3>

          <div className="grid2">
            <div className="field-group">
              <label>Link do site (gerado)</label>
              <div className="input-dis">/ofertas/{form.slug || 'seu-slug'}</div>
            </div>
            <div className="field-group">
              <label>Domínio próprio</label>
              <input className="input" value={form.dominioPersonalizado||''} onChange={f('dominioPersonalizado')} placeholder="https://seudominio.com.br" />
            </div>
          </div>

          <div className="grid2">
            <div className="field-group">
              <label>Título do site</label>
              <input className="input" value={form.titulo} onChange={f('titulo')} placeholder="Promos do Dia" />
            </div>
            <div className="field-group">
              <label>Slug (URL)</label>
              <input className="input" value={form.slug} onChange={e => setForm(p=>({...p, slug: e.target.value.replace(/\s+/g,'').toLowerCase()}))} placeholder="minhasofertas" />
            </div>
          </div>

          <div className="field-group">
            <label>Descrição (aparece ao compartilhar)</label>
            <input className="input" value={form.descricao} onChange={f('descricao')} placeholder="🔥 As melhores ofertas para você!" />
          </div>

          <label className="toggle-label mt12">
            <input type="checkbox" checked={form.mostrarCupons} onChange={e=>setForm(p=>({...p,mostrarCupons:e.target.checked}))} />
            <span className="toggle-switch"></span>
            Exibir aba de cupons no site
          </label>

          <div className="actions-row mt12">
            <button className="btn btn-primary" onClick={salvar}><Save size={14}/> {saved ? 'Salvo!' : 'Salvar Configurações'}</button>
          </div>
        </div>
      )}

      {tab === 'preview' && (
        <div className="card" style={{marginTop:16}}>
          <h3 className="card-title">Preview — {form.titulo}</h3>
          <p className="card-sub">{produtos.length} produtos cadastrados</p>
          <div className="site-prev-grid">
            {produtos.slice(0, 8).map(p => {
              const loja = lojas.find(l => l.id === p.lojaId);
              return (
                <div key={p.id} className="site-prev-card">
                  {p.imagem
                    ? <img src={p.imagem} alt={p.nome} className="site-prev-img" onError={e=>e.target.style.display='none'} />
                    : <div className="site-prev-ph">📦</div>}
                  {loja && <span className="site-prev-loja">{loja.logo}</span>}
                  <div className="site-prev-body">
                    <p className="site-prev-nome">{p.nome}</p>
                    <div className="site-prev-precos">
                      {p.precoDe>0 && <s>R$ {Number(p.precoDe).toFixed(2)}</s>}
                      <strong>R$ {Number(p.precoPor).toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
            {produtos.length === 0 && <p className="empty-hint">Cadastre produtos para aparecerem no site</p>}
          </div>
        </div>
      )}
    </div>
  );
}
