import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"                element={<HomePage />} />
          <Route path="/roadmap"         element={<RoadmapPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          <Route path="/about"           element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
