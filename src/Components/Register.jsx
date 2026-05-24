import { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../api';
import { useInventory } from '../App';
import Toggles from './Toggles';

export default function Register({ onRegister }) {
  const { lang, setLang, theme, setTheme, translations } = useInventory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ru' : 'en');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      return setError(translations[lang].passwordTooShort);
    }
    if (formData.password !== formData.confirmPassword) {
      return setError(translations[lang].passwordsDoNotMatch);
    }

    register(formData.email, formData.password, setError, onRegister, lang);
  };

  return (
    <div className="login-page-container">
      <div className="content-block login-page-card">
        <Toggles />

        <div className="login-page-header">
          <img src="/logo.svg" alt="Logo" className="login-avatar-logo" />
          <h1 className="login-title">{translations[lang].registrationHeader}</h1>
        </div>

        <form onSubmit={handleSubmit} className="form auth-form-container">
          <input 
            className="input"
            type="email" 
            placeholder={translations[lang].emailPlaceholder} 
            value={formData.email}
            onChange={event => setFormData({...formData, email: event.target.value})}
            required 
          />
          <input 
            className="input"
            type="password" 
            placeholder={translations[lang].passwordPlaceholder} 
            value={formData.password}
            onChange={event => setFormData({...formData, password: event.target.value})}
            required 
          />
          <input 
            className="input"
            type="password" 
            placeholder={translations[lang].confirmPasswordPlaceholder} 
            value={formData.confirmPassword}
            onChange={event => setFormData({...formData, confirmPassword: event.target.value})}
            required 
          />
          
          {error && <p className="error-text">{error}</p>}
          
          <button type="submit" className="modal-btn main-color-btn auth-submit-btn">
            {translations[lang].registrationButton}
          </button>
        </form>
        
        <div className="auth-footer">
          {translations[lang].alreadyHaveAccount}{' '}
          <Link to="/login" className="auth-footer-link">
            {translations[lang].loginLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
