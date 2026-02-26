import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar'
import Login from './pages/login'
import Ingresar from './pages/ingresar'
import Inicio from './pages/inicio';
import Apk from './pages/apk';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* Aquí es donde "aterrizan" los componentes al navegar */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apk" element={<Apk />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App