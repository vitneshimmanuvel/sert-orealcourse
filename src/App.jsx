import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GraphicDesignMastery from './components/GraphicDesignMastery.jsx';
import ArtificialIntelligenceMastery from './components/ArtificialIntelligenceMastery.jsx';
import BackendDevelopment from './components/BackendDevelopment.jsx';
import BrandDevelopmentForEntrepreneurs from './components/BrandDevelopmentForEntrepreneurs.jsx';
import CartoonCaricatureMastery from './components/CartoonCaricatureMastery.jsx';
import ContentMarketingMastery from './components/ContentMarketingMastery.jsx';
import DigitalMarketingMastery from './components/DigitalMarketingMastery.jsx';
import FrontEndDevelopment from './components/FrontEndDevelopment.jsx';

import UiUxMastery from './components/UiUxMastery.jsx';
import TextileDesigningMastery from './components/TextileDesigningMastery.jsx';
import SeoSemMastery from './components/SeoSemMastery.jsx';
import VideoEditingMastery from './components/VideoEditingMastery.jsx';
import WebsiteDesignMastery from './components/WebsiteDesignMastery.jsx';
import MobileAppMastery from './components/MobileAppMastery.jsx';
import JuniorProCourse from './components/JuniorProCourse.jsx';
import JuniorDesignPro from './components/JuniorDesignPro.jsx';
import JuniorAppPro from './components/JuniorAppPro.jsx';
import JuniorAIPro from './components/JuniorAIPro.jsx';
import JuniorToonPro from './components/JuniorToonPro.jsx';
import JuniorWebPro from './components/JuniorWebPro.jsx';
import BrandProCourse from './components/BrandProCourse.jsx';
import PythonNetworkingCourse from './components/PythonNetworkingCourse.jsx'; 




import DigitalMarketing from './pages/services/DigitalMarketing.jsx';
import WebDevelopment from './pages/services/WebDevelopment.jsx';
import GraphicDesign from './pages/services/GraphicDesign.jsx';
import ProcessAutomation from './pages/services/ProcessAutomation.jsx';
import TextileDesign from './pages/services/TextileDesign.jsx';
import SoftwareDevelopment from './pages/services/SoftwareMobileApps.jsx';
import SoftwareMobileApps from './pages/services/SoftwareMobileApps.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/graphic-design" element={<GraphicDesignMastery />} />
        <Route path="/ai-mastery" element={<ArtificialIntelligenceMastery />} />
        <Route path="/backend-dev" element={<BackendDevelopment />} />
        <Route path="/brand-dev" element={<BrandDevelopmentForEntrepreneurs />} />
        <Route path="/cartoon-mastery" element={<CartoonCaricatureMastery />} />
        <Route path="/content-marketing" element={<ContentMarketingMastery />} />
        <Route path="/digital-marketing" element={<DigitalMarketingMastery />} />
        <Route path="/front-dev" element={<FrontEndDevelopment />} />
        <Route path="/textile-design" element={<TextileDesigningMastery />} />
        <Route path="/ui-ux-design" element={<UiUxMastery />} />

         {/* cad money change */}
        <Route path="/seo-mastery" element={<SeoSemMastery />} />
        <Route path="/video-editing" element={<VideoEditingMastery />} />
        <Route path ="/web-design" element={<WebsiteDesignMastery />} />
        <Route path="/mobile-app-dev" element={<MobileAppMastery />} />
        <Route path="/juniorwebdesign" element={<JuniorWebPro/>} />
        <Route path="/juniordesign" element={<JuniorDesignPro/>} />
        <Route path="/juniorapp"  element={<JuniorAppPro/>}/>
        <Route path="/juniorai"  element={<JuniorAIPro/>}/>
        <Route path="/juniortoonpro" element={<JuniorToonPro/>}/>
        <Route path="/brandbro" element={<BrandProCourse/>}/>
        <Route path="/PythonNetworkingCourse" element={<PythonNetworkingCourse/>}/>












        <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route path="/services/graphic-design" element={<GraphicDesign />} />
        <Route path="/services/process-automation" element={<ProcessAutomation />} />
        <Route path="/services/textile-design" element={<TextileDesign />} />
         <Route path="/services/software-development" element={<SoftwareMobileApps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;