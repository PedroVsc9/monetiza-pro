import { useState } from 'react';
import { Save, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Conta() {
  const { user, logout } = useAuth();
  const [nome, setNome] = useState(user?.name || '');
  const [saved, setSaved] = useState(false);

  const salvar = () => {
    // Update name in users store
    try {
      const users = JSON.parse(localStorage.getItem('_users') || '{}');
      if (users[user.email]) {
        users[user.email].name = nome;
        localStorage.setItem('_users', JSON.stringify(users));
        const session = { ...user, name: nome };
        sessionStorage.setItem('_session', JSON.stringify(session));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } catch {}
  };

  return (
    <div className="page">
      <div className="page-header">
        <div><h1 className="page-title">Minha Conta</h1><p className="page-sub">Conta e assinatura</p></div>
      </div>

      <div style={{ maxWidth: 520 }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div className="conta-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <p style={{ fontWeight: 600, fontSize: 16 }}>{user?.name}</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>{user?.email}</p>
              <span className="plano-badge">Plano Grátis</span>
            </div>
          </div>

          <div className="field-group">
            <label>Nome de exibição</label>
            <input className="input" value={nome} onChange={e => setNome(e.target.value)} />
          </div>
          <div className="field-group">
            <label>Email (não editável)</label>
            <input className="input" value={user?.email} disabled style={{ opacity: 0.5 }} />
          </div>

          <div className="actions-row mt12">
            <button className="btn btn-primary" onClick={salvar}><Save size={14} /> {saved ? 'Salvo!' : 'Salvar alterações'}</button>
            <button className="btn btn-danger" onClick={logout}><LogOut size={14} /> Sair da conta</button>
          </div>
        </div>
      </div>
    </div>
  );
}
