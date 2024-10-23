import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customAlert, setCustomAlert] = useState({ open: false, type: '', message: '' });
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState(null);
  const [hasExpirationDate, setHasExpirationDate] = useState(false);
  const [expirationDate, setExpirationDate] = useState(null);

  return (
    <MyContext.Provider value={{ originalUrl, setOriginalUrl, shortUrl, setShortUrl, customAlert, setCustomAlert, hasPassword, setHasPassword, password, setPassword, hasExpirationDate, setHasExpirationDate, expirationDate, setExpirationDate }}>
      {children}
    </MyContext.Provider>
  );
};