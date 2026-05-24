import { Link } from 'react-router-dom';
import { useInventory } from '../App';
import Toggles from './Toggles';

export default function Welcome() {
  const { lang, setLang, theme, setTheme, translations } = useInventory();

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ru' : 'en');

  return (
    <div className="login-page-container">
      <div className="content-block login-page-card">
        
        <Toggles />

        <div className="login-page-header">
          <img src="/logo.svg" alt="Logo" className="login-page-header img" />
         <h1 className="login-title">{translations[lang].welcomeHeader}</h1>
        </div>

        <div className="form auth-form-container">
          <Link to="/login" className="main-color-btn auth-btn-block">
            {translations[lang].loginLink}
          </Link>
          <Link to="/register" className="accent-color-btn auth-btn-block">
            {translations[lang].registrationLink}
          </Link>
        </div>

      </div>
    </div>
  );
}
