import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ResourceProvider } from './context/ResourceContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddResource from './pages/AddResource';
import ResourceDetail from './pages/ResourceDetail';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <ResourceProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddResource />} />
              <Route path="/resource/:id" element={<ResourceDetail />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </Router>
      </ResourceProvider>
    </ThemeProvider>
  );
}

export default App;
