import React from 'react'
import Footer from '../components/Footer';
import EvalSection from '../components/EvalSection';
import MockTests from '../components/MockTests';
import Navbar from '../components/Navbar/Navbar';
import Subject from "../components/Subjects/Subject";
import HeroSection from '../components/HeroSection/HeroSection';
import DebateSessions from '../components/DebateSection/DebateSessions';
import ClassTestSection from '../components/ClassTestSection';
import WhyJoinUs from '../components/WhyJoinUs';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* <Subject /> */}
      {/* <DebateSessions /> */}
      <ClassTestSection />
      <WhyJoinUs />
      <MockTests />
      <EvalSection />
      <Footer />
    </div>
  )
}

export default Homepage
