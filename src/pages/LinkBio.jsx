import { useState } from 'react';
import { Plus, Trash2, Save, ExternalLink, GripVertical, X } from 'lucide-react';
import { useUserStorage } from '../hooks/useUserStorage';
import { LINKBIO_DEFAULT } from '../data/defaults';

export default function LinkBio() {
  const [bio, setBio] = useUserStorage('linkbio', LINKBIO_DEFAULT);
  const [form, setForm] = useState({ ...bio, links: [...(bio.links || [])] });
  const [novoLink, setNovoLink] = useState({ nome: '', url: '', logo: '🔗' });
  const [saved, setSaved] = useState(false);

  const f = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const salvar = () => {
    setBio(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const adicionarLink = () => {
    if (!novoLink.nome.trim() || !novoLink.url.trim()) return;
    setForm(p => ({ ...p, links: [...p.links, { ...novoLink, id: Date.now().toString() }] }));
    setNovoLink({ nome: '', url: '', logo: '🔗' });
  };

  const removerLink = (id) => setForm(p => ({ ...p, links: p.links.filter(l => l.id !== id) }));

  return (
    <div className="page">
      <div className="page-header">
        <div><h1 className="page-title">Link Bio</h1><p className="page-sub">Início › Link Bio</p></div>
      </div>

      <div className="linkbio-layout">
        {/* EDITOR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <h3 className="card-title">Geral</h3>
            <div className="field-group">
              <label>Foto de perfil (URL)</label>
              <input className="input" value={form.foto || ''} onChange={f('foto')} placeholder="https://..." />
              <small>Arquivos permitidos: jpeg, jpg, png — tamanho máximo 500 KB</small>
            </div>
            <div className="field-group">
              <label>Nome de exibição</label>
              <input className="input" value={form.nome} onChange={f('nome')} placeholder="Seu nome ou @ do Instagram" />
            </div>
            <div className="field-group">
              <label>Apresentação / Bio</label>
              <textarea className="input" rows={3} value={form.bio} onChange={f('bio')} placeholder="Aqui você vai encontrar as melhores ofertas..." />
            </div>
          </div>

          <div className="card">
            <div className="card-title-row">
              <h3 className="card-title">Meus Links</h3>
              <span className="badge-count">{form.links.length}/50</span>
            </div>

            {form.links.length > 0 && (
              <div className="links-list">
                {form.links.map(link => (
                  <div key={link.id} className="link-row">
                    <GripVertical size={15} className="drag-handle" />
                    <span className="link-logo">{link.logo}</span>
                    <div className="link-info">
                      <span className="link-nome">{link.nome}</span>
                      <span className="link-url">{link.url}</span>
                    </div>
                    <button className="btn btn-ghost btn-sm danger" onClick={() => removerLink(link.id)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="add-link-box">
              <p className="add-link-title"><Plus size={13} /> Adicionar ({form.links.length}/50)</p>
              <div className="add-link-row">
                <input className="input" value={novoLink.logo} onChange={e => setNovoLink(p => ({ ...p, logo: e.target.value }))} placeholder="🔗" style={{ width: 64 }} />
                <input className="input" value={novoLink.nome} onChange={e => setNovoLink(p => ({ ...p, nome: e.target.value }))} placeholder="Nome do Link Rosto" style={{ flex: 1 }} />
              </div>
              <input className="input mt6" value={novoLink.url} onChange={e => setNovoLink(p => ({ ...p, url: e.target.value }))} placeholder="https://..." onKeyDown={e => e.key === 'Enter' && adicionarLink()} />
              <button className="btn btn-primary mt8" onClick={adicionarLink}><Plus size={14} /> Adicionar link</button>
            </div>
          </div>

          <button className="btn btn-primary fullw" onClick={salvar}>
            <Save size={14} /> {saved ? '✓ Salvo!' : 'Salvar Link Bio'}
          </button>
        </div>

        {/* PREVIEW */}
        <div className="card">
          <h3 className="card-title">Pré-visualização</h3>
          <div className="lb-phone-wrap">
            <div className="lb-page">
              {form.foto
                ? <img src={form.foto} alt="avatar" className="lb-avatar-img" onError={e => e.target.style.display = 'none'} />
                : <div className="lb-avatar-ph">{form.nome?.[0]?.toUpperCase() || '?'}</div>}
              <p className="lb-nome">{form.nome || 'Seu nome'}</p>
              <p className="lb-bio">{form.bio}</p>
              <div className="lb-links">
                {form.links.map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="lb-btn">
                    <span className="lb-btn-logo">{link.logo}</span>
                    <span>{link.nome}</span>
                    <ExternalLink size={11} />
                  </a>
                ))}
                {form.links.length === 0 && <p style={{ color: '#6b7280', fontSize: 13, textAlign: 'center' }}>Seus links aparecerão aqui</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
