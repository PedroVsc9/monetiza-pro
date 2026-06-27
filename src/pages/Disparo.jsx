import { useState, useEffect } from 'react';
import { Copy, Check, Save, RefreshCw } from 'lucide-react';
import { useUserStorage } from '../hooks/useUserStorage';
import { LOJAS_DEFAULT, PRODUTOS_DEFAULT, TEMPLATE_DEFAULT } from '../data/defaults';
import { useLocation } from 'react-router-dom';

export default function Disparo() {
  const location = useLocation();
  const [lojas]    = useUserStorage('lojas', LOJAS_DEFAULT);
  const [produtos] = useUserStorage('produtos', PRODUTOS_DEFAULT);
  const [template, setTemplate] = useUserStorage('template', TEMPLATE_DEFAULT);
  const [form, setForm]   = useState({ ...template });
  const [prodId, setProdId] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    // Se veio da página de produtos via sessionStorage
    const stored = sessionStorage.getItem('disparo_prod');
    if (stored) {
      const prod = JSON.parse(stored);
      setProdId(prod.id);
      sessionStorage.removeItem('disparo_prod');
      return;
    }
    // Se veio via state do router
    if (location.state?.produtoId) {
      setProdId(location.state.produtoId);
      return;
    }
    if (produtos.length > 0) setProdId(produtos[0].id);
  }, []);

  const f = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  const produto = produtos.find(p => p.id === prodId);
  const loja    = produto ? lojas.find(l => l.id === produto.lojaId) : null;

  const gerarTexto = () => {
    if (!produto) return '';
    if (form.modoAvancado && form.textoAvancado) {
      return form.textoAvancado
        .replace('{nome}', produto.nome)
        .replace('{precoDe}', produto.precoDe ? `R$ ${Number(produto.precoDe).toFixed(2)}` : '')
        .replace('{precoPor}', `R$ ${Number(produto.precoPor).toFixed(2)}`)
        .replace('{cupom}', produto.cupom || '')
        .replace('{link}', produto.link || '')
        .replace('{loja}', loja?.nome || '');
    }
    const lines = [];
    lines.push(`${form.emojiTitulo}${produto.nome}`);
    lines.push('');
    if (produto.precoDe > 0) lines.push(`~de R$ ${Number(produto.precoDe).toFixed(2)}~`);
    lines.push(`${form.emojiAntes}por R$ ${Number(produto.precoPor).toFixed(2)} ${form.emojiDepois}`);
    if (produto.parcelas > 0) lines.push(`🧾 ${produto.parcelas}x de R$ ${Number(produto.valorParcela).toFixed(2)} sem juros`);
    if (produto.cupom) lines.push(`🏷️ Use o cupom: *${produto.cupom}*`);
    lines.push('');
    lines.push(form.ctaTexto);
    lines.push(produto.link || 'https://exemplo.com.br');
    lines.push('');
    if (form.rodape) lines.push(form.rodape);
    return lines.join('\n');
  };

  const texto = gerarTexto();

  const copiar = async () => {
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const salvarTemplate = () => {
    setTemplate(form);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Texto de Disparo</h1>
          <p className="page-sub">Início › Texto de Disparo</p>
        </div>
      </div>

      <div className="disparo-layout">
        {/* EDITOR */}
        <div>
          <div className="card">
            <div className="card-title-row">
              <h3 className="card-title">Modelo geral</h3>
              <span className="card-sub">Válido para todas as lojas</span>
            </div>

            <div className="field-group">
              <label>Produto</label>
              <select className="input" value={prodId} onChange={e => setProdId(e.target.value)}>
                <option value="">— Selecionar produto —</option>
                {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
              </select>
            </div>

            {!form.modoAvancado ? (
              <>
                <div className="grid2">
                  <div className="field-group">
                    <label>Emoji do título</label>
                    <input className="input" value={form.emojiTitulo} onChange={f('emojiTitulo')} placeholder="🛍️" />
                    <small>Exemplo: 🛍️</small>
                  </div>
                  <div className="field-group">
                    <label>Chamada (CTA)</label>
                    <input className="input" value={form.ctaTexto} onChange={f('ctaTexto')} placeholder="🔗 Link p/ comprar:" />
                    <small>Exemplo: Compre agora</small>
                  </div>
                  <div className="field-group">
                    <label>Emoji antes do preço</label>
                    <input className="input" value={form.emojiAntes} onChange={f('emojiAntes')} placeholder="🏷️" />
                    <small>Exemplo: 🏷️</small>
                  </div>
                  <div className="field-group">
                    <label>Emoji depois do preço</label>
                    <input className="input" value={form.emojiDepois} onChange={f('emojiDepois')} placeholder="🔥🔥" />
                    <small>Exemplo: 🔥</small>
                  </div>
                </div>
                <div className="field-group">
                  <label>Texto rodapé</label>
                  <textarea className="input" rows={3} value={form.rodape} onChange={f('rodape')} placeholder="_*Promoção sujeita a alteração*_" />
                </div>
              </>
            ) : (
              <div className="field-group">
                <label>Texto avançado (use {'{'}{'}' }: {'{nome}'}, {'{precoPor}'}, {'{cupom}'}, {'{link}'})</label>
                <textarea className="input" rows={10} value={form.textoAvancado} onChange={f('textoAvancado')} placeholder={`🛍️{nome}\n\n🏷️por {precoPor} 🔥🔥\n\n🔗 Link: {link}`} />
              </div>
            )}

            <div className="modo-row">
              <label className="toggle-label">
                <input type="checkbox" checked={form.modoAvancado} onChange={e => setForm(p=>({...p, modoAvancado: e.target.checked}))} />
                <span className="toggle-switch"></span>
                Modo avançado — Construa o texto livremente
              </label>
            </div>

            <div className="actions-row">
              <button className="btn btn-primary" onClick={salvarTemplate}>
                <Save size={14}/> {savedMsg ? 'Salvo!' : 'Salvar Modelo'}
              </button>
            </div>
          </div>
        </div>

        {/* PREVIEW */}
        <div>
          <div className="card">
            <div className="card-title-row">
              <h3 className="card-title">Pré-visualização</h3>
              {produto && (
                <button className="btn btn-ghost btn-sm" onClick={() => setProdId('')}>
                  <RefreshCw size={13}/>
                </button>
              )}
            </div>
            {produto ? (
              <>
                {produto.imagem && (
                  <img src={produto.imagem} alt={produto.nome} className="preview-img" onError={e=>e.target.style.display='none'} />
                )}
                <div className="preview-bubble">
                  <pre className="preview-text">{texto}</pre>
                </div>
                <button className="btn btn-wpp fullw mt12" onClick={copiar}>
                  {copied ? <><Check size={15}/> Copiado!</> : <><Copy size={15}/> Copiar para WhatsApp</>}
                </button>
              </>
            ) : (
              <div className="empty-state small">
                <MessageSquare size={32}/>
                <p>Selecione um produto para visualizar o texto de disparo</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageSquare(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={props.size||24} height={props.size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
