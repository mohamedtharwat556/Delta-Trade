import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }

    if (login(password)) {
      navigate('/dashboard');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <Lock size={48} className="login-icon" />
          <h1>لوحة التحكم</h1>
          <p>يرجى تسجيل الدخول للوصول إلى لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="أدخل كلمة المرور"
              autoFocus
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            تسجيل الدخول
          </button>
        </form>

        <div className="login-footer">
          <p>كلمة المرور الافتراضية: admin123</p>
        </div>
      </div>
    </div>
  );
}
