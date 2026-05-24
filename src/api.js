import translations from './translations.json' assert { type: 'json' };

export const api_url = 'https://expiredis-backend.onrender.com';

export const request = async ({ endpoint, method = 'GET', body = null, token = null, 
  onSuccess, onServerError, networkErrorHandler, lang }) => {
  
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const response = await fetch(`${api_url}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      if (onSuccess) onSuccess(data);
    } else {
      if (onServerError) onServerError(data.error);
    }
  }
  catch (error) {
    if (networkErrorHandler) networkErrorHandler(translations[lang].networkError);
  }
};

export const login = async (email, password, setError, onLogin, lang) => {
  request({
    endpoint: '/login',
    method: 'POST',
    body: { email, password },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      onLogin(data.token);
    },
    onServerError: (error) => {
      setError(error || translations[lang].loginError);
    },
    networkErrorHandler: setError,
    lang: lang
  });
};

export const register = async (email, password, setError, onRegister, lang) => {
  request({
    endpoint: '/register',
    method: 'POST',
    body: { email, password },
    onSuccess: () => {
      login(email, password, setError, onRegister, lang);
    },
    onServerError: (error) => {
      setError(error || translations[lang].registrationError);
    },
    networkErrorHandler: setError,
    lang: lang
  });
};