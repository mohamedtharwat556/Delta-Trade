import { Link } from 'react-router-dom'
import { LayoutDashboard, LogOut, Store } from 'lucide-react'
import Dashboard from './Dashboard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { usePageTitle } from '../hooks/usePageTitle.js'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="admin-loading">جاري التحميل...</div>;
  if (!isAuthenticated) return <Link to="/admin/login" className="admin-redirect">تسجيل الدخول</Link>;
  return children;
}

export default function Admin() {
  usePageTitle('لوحة التحكم')
  const { logout } = useAuth()

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-header__brand">
          <LayoutDashboard size={24} />
          <h1>لوحة التحكم - الدلتا</h1>
        </div>
        <div className="admin-header__actions">
          <Link to="/" className="admin-header__link">
            <Store size={16} /> الموقع الرئيسي
          </Link>
          <button onClick={logout} className="admin-header__logout">
            <LogOut size={16} /> خروج
          </button>
        </div>
      </header>
      <main className="admin-main">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </main>
    </div>
  )
}
