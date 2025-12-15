import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Location } from './pages/Location';
import { Benefits } from './pages/Benefits';
import { Legal } from './pages/Legal';
import { Architecture } from './pages/Architecture';
import { Contact } from './pages/Contact';
import { PageRoute } from './types';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={PageRoute.HOME} element={<Home />} />
          <Route path={PageRoute.ABOUT} element={<About />} />
          <Route path={PageRoute.LOCATION} element={<Location />} />
          <Route path={PageRoute.BENEFITS} element={<Benefits />} />
          <Route path={PageRoute.LEGAL} element={<Legal />} />
          <Route path={PageRoute.ARCHITECTURE} element={<Architecture />} />
          <Route path={PageRoute.COMMERCIAL} element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;