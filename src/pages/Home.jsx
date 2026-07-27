import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Services from '../components/Services.jsx'
import Albums from '../components/Albums.jsx'
import Skills from '../components/Skills.jsx'
import WhyChooseMe from '../components/WhyChooseMe.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Process from '../components/Process.jsx'
import FAQ from '../components/FAQ.jsx'
import Contact from '../components/Contact.jsx'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <About />
      <Services />
      <Albums />
      <Skills />
      <WhyChooseMe />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </motion.main>
  )
}
