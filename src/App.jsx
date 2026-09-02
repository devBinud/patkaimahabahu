import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import FloatingWidgets from './components/FloatingWidgets/FloatingWidgets'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import SpecialtiesPage from './pages/SpecialtiesPage'
import PhilosophyPage from './pages/PhilosophyPage'
import AppointmentPage from './pages/AppointmentPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ContributionPage from './pages/ContributionPage'
import GroundReportPage from './pages/GroundReportPage'
import ObjectivesPage from './pages/ObjectivesPage/ObjectivesPage'
import './App.css'

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="cureo-container">
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/objectives" element={<ObjectivesPage />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contribution" element={<ContributionPage />} />
          <Route path="/ground-report" element={<GroundReportPage />} />
          {/* Legacy redirects */}
          <Route path="/chairmans-vision" element={<Navigate to="/about" replace />} />
          <Route path="/vision" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <FloatingWidgets />
    </div>
  )
}

export default App
