import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails' 
import Header from './components/Header'

export default function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página inicial */}
          <Route path="/movie/:id" element={<MovieDetails />} /> {/* Página de detalhes do filme */}
        </Routes>
      </div>
    </Router>
  )
}
