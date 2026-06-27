import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import Layout from './components/Layout';
import Inicio from './pages/Inicio';
import Lojas from './pages/Lojas';
import Produtos from './pages/Produtos';
import Disparo from './pages/Disparo';
import Cupons from './pages/Cupons';
import MeuSite from './pages/MeuSite';
import LinkBio from './pages/LinkBio';
import Conta from './pages/Conta';
import { Relatorios, Divulgador, Stories, Automacao } from './pages/Placeholders';

function PrivateRoutes() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" replace />;
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"          element={<Inicio />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/divulgador" element={<Divulgador />} />
        <Route path="/lojas"     element={<Lojas />} />
        <Route path="/produtos"  element={<Produtos />} />
        <Route path="/cupons"    element={<Cupons />} />
        <Route path="/stories"   element={<Stories />} />
        <Route path="/disparo"   element={<Disparo />} />
        <Route path="/site"      element={<MeuSite />} />
        <Route path="/linkbio"   element={<LinkBio />} />
        <Route path="/conta"     element={<Conta />} />
        <Route path="/automacao" element={<Automacao />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
      <Route path="/*"    element={<PrivateRoutes />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}
