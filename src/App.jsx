import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GraphicDesignMastery from './components/GraphicDesignMastery.jsx';
import ArtificialIntelligenceMastery from './components/ArtificialIntelligenceMastery.jsx';
import BackendDevelopment from './components/BackendDevelopment.jsx';
import BrandDevelopmentForEntrepreneurs from './components/BrandDevelopmentForEntrepreneurs.jsx';
import CartoonCaricatureMastery from './components/CartoonCaricatureMastery.jsx';
import ContentMarketingMastery from './components/ContentMarketingMastery.jsx';

function App() {
  return (
    <Routes>
      <Route path="graphic-design" element={<GraphicDesignMastery />} />
      <Route path="ai-mastery" element={<ArtificialIntelligenceMastery />} />
      <Route path="backend-dev" element={<BackendDevelopment />} />
      <Route path="brand-dev" element={<BrandDevelopmentForEntrepreneurs />} />
      <Route path="cartoon-mastery" element={<CartoonCaricatureMastery />} />
      <Route path="content-marketing" element={<ContentMarketingMastery />} />
    </Routes>
  );
}

export default App;
