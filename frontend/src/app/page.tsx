"use client";

import { useRef, useEffect, useState } from 'react';
import { useScroll } from 'framer-motion';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import Gamification from '../components/Gamification';
import Cities from '../components/Cities';
import Partnerships from '../components/Partnerships';
import AppPreview from '../components/AppPreview';

export default function Home() {
  const containerRef = useRef(null);
  const [isNightMode, setIsNightMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      ref={containerRef}
      className={`relative w-full overflow-hidden scroll-smooth transition-colors duration-500 ${isNightMode ? 'night-mode' : ''}`}
    >
      <Navbar isNightMode={isNightMode} toggleNightMode={() => setIsNightMode(!isNightMode)} />

      {/* Scrolling Content Pages */}
      <div className="relative z-10 w-full mt-24">
        <div id="hero"><HeroSection /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <div id="gamification"><Gamification /></div>
        <div id="cities"><Cities /></div>
        <div id="partnerships"><Partnerships /></div>
        <div id="app-preview"><AppPreview /></div>
      </div>
    </main>
  );
}
