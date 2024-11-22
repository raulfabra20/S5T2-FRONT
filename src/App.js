import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Página inicial
import Login from './pages/Login'; // Página de Login
import Register from './pages/Register'; // Página de Registro
import PetsPage from './pages/PetsPage'; // Página de todas las mascotas
import GremlinPage from './pages/GremlinPage'; // Página de un gremlin específico
import ProtectedRoute from './components/ProtectedRoute'; // Rutas protegidas

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <PetsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/:petId"
          element={
            <ProtectedRoute>
              <GremlinPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;