import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import TimelineProgress from './components/TimelineProgress.jsx'
import BackToTop from './components/BackToTop.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Admin from './pages/Admin.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const isAdminArea = location.pathname.startsWith('/admin') || location.pathname === '/login'

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      {!loading && (
        <>
          {!isAdminArea && <CustomCursor />}
          {!isAdminArea && <TimelineProgress />}
          {!isAdminArea && <Navbar />}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          {!isAdminArea && <Footer />}
          {!isAdminArea && <BackToTop />}
        </>
      )}
    </>
  )
}
