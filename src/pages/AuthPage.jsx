import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Zap } from 'lucide-react';

export default function AuthPage() {
  const { login, register, error, setError } = useAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (tab === 'login') login(email, password);
      else register(name, email, password);
      setLoading(false);
    }, 400);
  };

  const switchTab = (t) => { setTab(t); setError(''); };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo">
          <Zap size={28} fill="currentColor" />
          <span>AfiliadoPro</span>
        </div>
        <p className="auth-tagline">Sua plataforma de divulgação inteligente</p>

        <div className="auth-tabs">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => switchTab('login')}>Entrar</button>
          <button className={tab === 'register' ? 'active' : ''} onClick={() => switchTab('register')}>Criar conta</button>
        </div>

        <form onSubmit={submit} className="auth-form">
          {tab === 'register' && (
            <div className="field">
              <label>Seu nome</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Como quer ser chamado?" required autoFocus />
            </div>
          )}
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" required autoFocus={tab === 'login'} />
          </div>
          <div className="field">
            <label>Senha</label>
            <div className="pass-wrap">
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={tab === 'register' ? 'Mínimo 6 caracteres' : '••••••••'} required />
              <button type="button" className="pass-eye" onClick={() => setShowPass(v => !v)}>
                {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : tab === 'login' ? 'Entrar' : 'Criar conta grátis'}
          </button>
        </form>

        <p className="auth-switch">
          {tab === 'login' ? (
            <>Não tem conta? <button onClick={() => switchTab('register')}>Cadastre-se grátis</button></>
          ) : (
            <>Já tem conta? <button onClick={() => switchTab('login')}>Fazer login</button></>
          )}
        </p>
      </div>
    </div>
  );
}
