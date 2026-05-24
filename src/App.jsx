import { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import ItemsPage from './Components/ItemsPage';
import Login from './Components/Login';
import Register from './Components/Register';
import Welcome from './Components/Welcome';
import { request } from './api';
import translations from './translations.json' with { type: 'json' };
import './App.css';

export const InventoryContext = createContext();
export const useInventory = () => useContext(InventoryContext);

function detectBrowserLang() {
  const lang = navigator.language || navigator.userLanguage || 'en';
  return lang.startsWith('ru') ? 'ru' : 'en';
}

function detectPrefersTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [items, setItems] = useState([]); 
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || detectPrefersTheme() || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || detectBrowserLang() || 'en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filters = {
    'expired': [(item) => new Date().setHours(0,0,0,0) > new Date(item.expire_date), translations[lang].expiredHeader],
    'soon_expired': [(item) => {
      return new Date().setHours(0,0,0,0) + 259200000 > new Date(item.expire_date) && new Date().setHours(0,0,0,0) < new Date(item.expire_date)
    }, translations[lang].soonExpiredHeader],
    'all': [(item) => true, translations[lang].allItemsHeader]
  };

  const fetchItems = async () => {
    if (!token) return;
    request({
      endpoint: '/items',
      token: token,
      onSuccess: (data) => {
        data.items.sort((item1, item2) => new Date(item1.expire_date) - new Date(item2.expire_date));
        setItems(data.items || []);
      },
      networkErrorHandler: console.error,
      lang: lang
    });
  };

  const deleteItem = async (id) => {
    request({
      endpoint: `/items/${id}`,
      method: "DELETE",
      token: token,
      onSuccess: () => {
        setItems(prev => prev.filter(item => item.id !== id));
      },
      networkErrorHandler: console.error,
      lang: lang
    });
  };

  const addItem = async (name, expireDate) => {
    request({
      endpoint: `/items`,
      method: 'POST',
      token: token,
      body: { 
        name: name, 
        expire_date: expireDate 
      },
      onSuccess: fetchItems,
      networkErrorHandler: console.error,
      lang: lang
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setItems([]);
  };

  useEffect(() => {
    fetchItems();
  }, [token]);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else if (theme === 'light') {
      document.querySelector('html').classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <InventoryContext.Provider value={{ items, filters, deleteItem, logout, isModalOpen, setIsModalOpen, addItem, fetchItems, lang, setLang, theme, setTheme, translations }}>
      <Router>
        <Routes>
          <Route path="/login" element={!token ? <Login onLogin={setToken} /> : <Dashboard />} />
          <Route path="/register" element={!token ? <Register onRegister={setToken}/> : <Dashboard />} />
          <Route path="/" element={token ? <Dashboard /> : <Welcome />} />
          <Route path="/items" element={token ? <ItemsPage /> : <Welcome />} />
        </Routes>
      </Router>
    </InventoryContext.Provider>
  )
}