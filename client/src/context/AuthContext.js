// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  const login = async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      const { accessToken } = response.data;

      const newAuth = {
        accessToken,
        user: parseJwt(accessToken).userInfo
      };

      localStorage.setItem('auth', JSON.stringify(newAuth));
      setAuth(newAuth);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setAuth({});
    axios.post('/api/auth/logout');
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const response = await axios.get('/api/auth/refresh', {
          withCredentials: true
        });
        const { accessToken } = response.data;
        setAuth(prev => ({
          ...prev,
          accessToken,
          user: parseJwt(accessToken).userInfo
        }));
      } catch (error) {
        logout();
      }
    };

    const interval = setInterval(() => {
      if (auth.accessToken) {
        const decoded = parseJwt(auth.accessToken);
        if (decoded.exp * 1000 < Date.now()) {
          verifyRefreshToken();
        }
      }
    }, 1000 * 60); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [auth.accessToken]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);