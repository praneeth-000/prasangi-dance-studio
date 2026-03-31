import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './index.css'
import Revenue from "./components/admin/Revenue";

// Layout & Loader
import Layout from './components/Layout'
import Loader from './components/Loader'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import AboutPage from './pages/About'
import StylesPage from './pages/Styles'
import MastersPage from './pages/Masters'
import AchievementsPage from './pages/Achievements'
import ContactPage from './pages/Contact'

// Admin Components
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './components/admin/AdminLogin'
import Dashboard from './components/admin/Dashboard'
import Students from './components/admin/Students'
import AddStudent from './components/admin/AddStudent'
import EditStudent from './components/admin/EditStudent'
import PaymentHistory from './components/admin/PaymentHistory'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="styles" element={<StylesPage />} />
          <Route path="masters" element={<MastersPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/add" element={<AddStudent />} />
          <Route path="students/edit/:id" element={<EditStudent />} />
          <Route path="students/:id/payments" element={<PaymentHistory />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App