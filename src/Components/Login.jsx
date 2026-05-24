import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../api';
import { useInventory } from '../App';
import Toggles from './Toggles';

export default function Login({ onLogin }) {
  const { lang, setLang, theme, setTheme, translations } = useInventory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ru' : 'en');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    login(email, password, setError, onLogin, lang);
  };

  return (
    <div className="login-page-container">
      <div className="content-block login-page-card">
        <Toggles />

        <div className="login-page-header">
          <img src="/logo.svg" alt="Logo" className="login-avatar-logo" />
           <h1 className="login-title">{translations[lang].loginHeader}</h1>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <input 
            className="input"
            type="email" 
            placeholder={translations[lang].emailPlaceholder} 
            value={email}
            onChange={event => setEmail(event.target.value)} 
            required 
          />
          <input 
            className="input"
            type="password" 
            placeholder={translations[lang].passwordPlaceholder} 
            value={password}
            onChange={event => setPassword(event.target.value)} 
            required 
          />

          {error && <p className="error-text">{error}</p>}
          
          <button type="submit" className="modal-btn main-color-btn auth-submit-btn">
            {translations[lang].loginButton}
          </button>
        </form>

        <div className="auth-footer">
          {translations[lang].dontHaveAccount}{' '}
          <Link to="/register" className="auth-footer-link">
            {translations[lang].registrationLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
