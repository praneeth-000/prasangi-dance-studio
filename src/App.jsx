import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Revenue from "./components/admin/Revenue";
// Main Website Components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import DanceStyles from './components/DanceStyles'
import Master from './components/Master'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollTopButton from './components/ScrollTopButton'

// Admin Components
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './components/admin/AdminLogin'
import Dashboard from './components/admin/Dashboard'
import Students from './components/admin/Students'
import AddStudent from './components/admin/AddStudent'
import EditStudent from './components/admin/EditStudent'
import PaymentHistory from './components/admin/PaymentHistory'

function MainWebsite() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <DanceStyles />
      <Master />
      <Gallery />
      <Pricing />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <ScrollTopButton />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainWebsite />} />
        
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
  )
}

export default App