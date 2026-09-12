import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import MobileBottomNav from './components/MobileBottomNav/MobileBottomNav'
import HomePage from './pages/HomePage/HomePage'
import AboutPage from './pages/AboutPage/AboutPage'
import SpecialtiesPage from './pages/SpecialtiesPage'
import PhilosophyPage from './pages/PhilosophyPage'
import AppointmentPage from './pages/AppointmentPage'
import GalleryPage from './pages/GalleryPage'
import NewsMediaPage from './pages/NewsMediaPage'
import SocialMediaPage from './pages/SocialMediaPage'
import ContactPage from './pages/ContactPage/ContactPage'
import ContributionPage from './pages/ContributionPage'
import GroundReportPage from './pages/GroundReportPage'
import ObjectivesPage from './pages/ObjectivesPage/ObjectivesPage'
import ProjectHomePage from './pages/ProjectHomePage/ProjectHomePage'
import EducationPage from './pages/EducationPage'
import EnvironmentPage from './pages/EnvironmentPage'
import HealthcarePage from './pages/HealthcarePage'
import {
  AdminAuthProvider,
  ProtectedRoute,
  PublicAdminRoute,
  AdminLogin,
  AdminLayout,
  DashboardOverview,
  AnalyticsManager,
  ContributionsManager,
  InquiriesManager,
  ProgramsManager,
  AdminSettings,
  trackPageView
} from './admin'
import './App.css'

// Prevent automatic browser scroll jumping
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    const resetToTop = () => {
      // 1. Reset standard window and document scrolling
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 2. Reset Lenis smooth scroll instance
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true, force: true });
      }
    };

    // Immediate synchronous reset before browser paint
    resetToTop();

    // Reset on animation frame after DOM nodes mount
    const rafId = requestAnimationFrame(resetToTop);

    // Backup timers for any async layout shifts or image renders
    const t1 = setTimeout(resetToTop, 30);
    const t2 = setTimeout(resetToTop, 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, search, hash]);

  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Dismiss the static index.html preloader once the app has mounted
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (!loader) return;
    loader.classList.add('loader-hidden');
    const removeTimer = setTimeout(() => loader.remove(), 320);
    return () => clearTimeout(removeTimer);
  }, []);

  useEffect(() => {
    if (isAdminRoute) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (!isAdminRoute) {
      trackPageView(location.pathname);
    }
  }, [location.pathname, isAdminRoute]);

  const appRoutes = (
    <Routes>
      {/* Admin Authentication & Login */}
      <Route
        path="/admin/login"
        element={
          <PublicAdminRoute>
            <AdminLogin />
          </PublicAdminRoute>
        }
      />

      {/* Protected Admin Panel Portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="analytics" element={<AnalyticsManager />} />
        <Route path="contributions" element={<ContributionsManager />} />
        <Route path="inquiries" element={<InquiriesManager />} />
        <Route path="subscribers" element={<InquiriesManager initialTab="subscribers" />} />
        <Route path="programs" element={<ProgramsManager />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/objectives" element={<ObjectivesPage />} />
      <Route path="/specialties" element={<SpecialtiesPage />} />
      <Route path="/philosophy" element={<PhilosophyPage />} />
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/news-media" element={<NewsMediaPage />} />
      <Route path="/news" element={<Navigate to="/news-media" replace />} />
      <Route path="/media" element={<Navigate to="/news-media" replace />} />
      <Route path="/social-media" element={<SocialMediaPage />} />
      <Route path="/patkai-social-media" element={<Navigate to="/social-media" replace />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/contribution" element={<ContributionPage />} />
      <Route path="/ground-report" element={<GroundReportPage />} />
      <Route path="/project-home" element={<ProjectHomePage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/environment" element={<EnvironmentPage />} />
      <Route path="/healthcare" element={<HealthcarePage />} />
      <Route path="/projects" element={<Navigate to="/project-home" replace />} />
      {/* Legacy redirects */}
      <Route path="/chairmans-vision" element={<Navigate to="/about" replace />} />
      <Route path="/vision" element={<Navigate to="/about" replace />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );

  return (
    <AdminAuthProvider>
      <ScrollToTop />
      {isAdminRoute ? (
        appRoutes
      ) : (
        <div className="cureo-container">
          <Navbar />
          <main>{appRoutes}</main>
          <Footer />
          <MobileBottomNav />
        </div>
      )}
    </AdminAuthProvider>
  );
}

export default App

