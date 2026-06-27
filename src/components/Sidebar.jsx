import { NavLink } from 'react-router-dom';
import {
  Home, BarChart2, Megaphone, Store, Package,
  Ticket, Image, MessageSquare, Globe, Link2,
  User, Settings, ChevronRight, Zap, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  {
    label: 'PRINCIPAL',
    items: [
      { to: '/',         icon: Home,          label: 'Início' },
      { to: '/relatorios',icon: BarChart2,     label: 'Relatórios', badge: 'NOVO' },
      { to: '/divulgador',icon: Megaphone,     label: 'Divulgador' },
      { to: '/lojas',    icon: Store,          label: 'Configurar Lojas' },
      { to: '/produtos', icon: Package,        label: 'Produtos' },
      { to: '/cupons',   icon: Ticket,         label: 'Cupons' },
      { to: '/stories',  icon: Image,          label: 'Template de Stories' },
      { to: '/disparo',  icon: MessageSquare,  label: 'Texto de Disparo' },
      { to: '/site',     icon: Globe,          label: 'Meu Site', hasArrow: true },
      { to: '/linkbio',  icon: Link2,          label: 'Link Bio' },
    ],
  },
  {
    label: 'CONTA E ASSINATURA',
    items: [
      { to: '/conta', icon: User, label: 'Minha Conta' },
    ],
  },
  {
    label: 'AUTOMAÇÃO WHATSAPP',
    items: [
      { to: '/automacao', icon: Settings, label: 'Configurar' },
    ],
  },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && <div className="sb-overlay" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sb-logo">
          <Zap size={20} fill="#6366f1" color="#6366f1" />
          <span>AfiliadoPro</span>
          <button className="sb-close" onClick={onClose}><X size={16}/></button>
        </div>

        <div className="sb-user">
          <div className="sb-avatar">{user?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div className="sb-uname">{user?.name}</div>
            <div className="sb-uemail">{user?.email}</div>
          </div>
        </div>

        <nav className="sb-nav">
          {NAV.map(section => (
            <div key={section.label} className="sb-section">
              <p className="sb-section-label">{section.label}</p>
              {section.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `sb-item ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                  {item.badge && <span className="sb-badge">{item.badge}</span>}
                  {item.hasArrow && <ChevronRight size={13} style={{ marginLeft: 'auto' }} />}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <button className="sb-logout" onClick={logout}>Sair da conta</button>
      </aside>
    </>
  );
}
