import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { MainContextProvider } from "./Context.js"

const AppWrapper = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [themeMode, setThemeMode] = useState(false);

  return(
    <MainContextProvider value={{ isAuthenticated, setIsAuthenticated, user, setUser, themeMode, setThemeMode }}>
      <App />
    </MainContextProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
