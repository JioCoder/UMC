import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../API/api';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const refreshAndFetchUser = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('Refresh token not found');
      return;
    }

    try {
  
      const { data } = await api.post('/auth/token/access', {
        refreshToken,
      });
      const { accessToken } = data;

      localStorage.setItem('accessToken', accessToken); 

      const userResponse = await api.get('/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setUser(userResponse.data); 
      localStorage.setItem('user', JSON.stringify(userResponse.data)); 
    } catch (error) {
      console.error('Token refresh or user fetch failed', error);
      handleLogout(); 
    }
  }, []); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      refreshAndFetchUser(); 
    }
  }, [refreshAndFetchUser]); 

  const fetchUser = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    try {
      const response = await api.get('/user/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUser(response.data); 
      localStorage.setItem('user', JSON.stringify(response.data)); 
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
