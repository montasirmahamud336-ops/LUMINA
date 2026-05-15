/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { ThemeProvider } from './lib/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import SmoothScroll from './components/SmoothScroll';
import Chatbot from './components/Chatbot';
import LoginPage from './pages/admin/LoginPage';

// SaaS Pages
import UserDashboard from './pages/dashboard/UserDashboard';
import SignupPage from './pages/auth/SignupPage';

import HeroManager from './pages/admin/HeroManager';
import PortfolioManager from './pages/admin/PortfolioManager';
import BlogManager from './pages/admin/BlogManager';
import NavigationManager from './pages/admin/NavigationManager';
import PageManager from './pages/admin/PageManager';
import ProductManager from './pages/admin/ProductManager';
import GlobalSettings from './pages/admin/GlobalSettings';
import ServicesManager from './pages/admin/ServicesManager';

import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProductsPage from './pages/ProductsPage';
import PortfolioDetailPage from './pages/PortfolioDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Portfolio from './components/Portfolio';

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: 'USER' | 'ADMIN' }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center text-neutral-900 dark:text-white">Loading...</div>;
  if (!user) return <Navigate to="/auth/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return <>{children}</>;
};

const PortfolioDetailedPage = () => (
  <div className="min-h-screen pt-32 bg-white dark:bg-[#050505]">
    <Portfolio />
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SmoothScroll>
        <Router>
          <Chatbot />
          <Routes>
            {/* Public Side */}
            <Route element={<><Navbar /><Outlet /><Footer /></>}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/portfolio" element={<PortfolioDetailedPage />} />
              <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/signup" element={<SignupPage />} />
              <Route path="/admin/login" element={<LoginPage />} />
            </Route>
            
            {/* User Side */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute role="USER">
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Admin Side */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute role="ADMIN">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="hero" element={<HeroManager />} />
              <Route path="portfolio" element={<PortfolioManager />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="navigation" element={<NavigationManager />} />
              <Route path="pages" element={<PageManager />} />
              <Route path="products" element={<ProductManager />} />
              <Route path="global" element={<GlobalSettings />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="team" element={<div className="text-neutral-900 dark:text-white">Team Manager</div>} />
              <Route path="testimonials" element={<div className="text-neutral-900 dark:text-white">Testimonials Manager</div>} />
            </Route>
          </Routes>
        </Router>
      </SmoothScroll>
    </AuthProvider>
  </ThemeProvider>
  );
}
