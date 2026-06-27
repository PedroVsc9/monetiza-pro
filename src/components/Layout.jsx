import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="app">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main">
        <header className="topbar">
          <button className="topbar-menu" onClick={() => setSidebarOpen(o => !o)}>
            <Menu size={20} />
          </button>
          <span className="topbar-brand">AfiliadoPro</span>
          <div className="topbar-right">
            <div className="topbar-avatar" title={user?.name}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
