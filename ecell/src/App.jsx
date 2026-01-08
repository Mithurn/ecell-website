import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Team from './pages/Team/Team'
import About from './pages/About/About'
import Recruitments from './pages/Recruitments/Recruitments'
import Startups from './pages/Startups/Startups'
import Events from './pages/Events/Events'
import Contact from './pages/Contact/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/team" element={<Team />} />
        <Route path="/about" element={<About />} />
        <Route path="/startups" element={<Startups />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/recruitments" element={<Recruitments />} />
      </Routes>
    </Router>
  )
}

export default App
