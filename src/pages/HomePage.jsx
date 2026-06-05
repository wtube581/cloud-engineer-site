import React from 'react'
import Hero from '../components/Hero'
import PainPoints from '../components/PainPoints'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import Roadmap from '../components/Roadmap'
import Testimonials from '../components/Testimonials'
import Community from '../components/Community'
import FAQ from '../components/FAQ'
import CTA from '../components/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PainPoints />
      <Features />
      <HowItWorks />
      <Roadmap />
      <Testimonials />
      <Community />
      <FAQ />
      <CTA />
    </>
  )
}
