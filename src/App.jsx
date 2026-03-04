import './index.css'
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

function App() {
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

export default App