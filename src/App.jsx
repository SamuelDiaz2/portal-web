// 1. Cambiamos BrowserRouter por HashRouter
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/navbar'
import Login from './pages/login/login';
import Ingresar from './pages/ingresar/ingresar';
import Inicio from './pages/inicio/inicio';
import Apk from './pages/apk/apk';
import Registro from './pages/registro/registro';
import Agendar from './pages/agendar/agendar';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />

          <Route path="/inicio" element={<Inicio />} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/apk" element={<Apk />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/agendar" element={<Agendar />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;