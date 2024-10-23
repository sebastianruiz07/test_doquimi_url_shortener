import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomeView, RedirectView } from './views';
import { MyProvider } from './context/MyContext';
const App = () => {
  return (
    <MyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/redirect/:shortUrlId" element={<RedirectView />} />
        </Routes>
      </Router>
    </MyProvider>
  );
}

export default App;
