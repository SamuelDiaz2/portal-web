import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Login from './pages/login'
import Agendar from './pages/agendar'
import Inicio from './pages/inicio';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* Aquí es donde "aterrizan" los componentes al navegar */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/agendar" element={<Agendar />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App