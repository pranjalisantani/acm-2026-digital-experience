"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PeopleSection from "./components/PeopleSection";
import EventsSection from "./components/EventsSection";
import WhatWeDoPreview from "./components/WhatWeDoPreview";
import FeaturedProjects from "./components/FeaturedProjects";
import JoinSection from "./components/JoinSection";
import Footer from "./components/Footer";
import EventDetailModal, { ACMEvent } from "./components/EventDetailModal";
import PersonDetailModal, { ACMMember } from "./components/PersonDetailModal";
import ReviewDrawer from "./components/ReviewDrawer";

export default function Home() {
  const [specsOpen, setSpecsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ACMEvent | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<ACMMember | null>(null);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col tech-grid-pattern selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Background Ambient Radial Spotlight Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[30%] -left-48 h-[550px] w-[600px] rounded-full bg-sky-600/5 blur-[140px]" />
        <div className="absolute top-[65%] -right-48 h-[600px] w-[700px] rounded-full bg-cyan-600/5 blur-[150px]" />
      </div>

      {/* Floating Production Navigation Bar */}
      <Navbar onOpenSpecs={() => setSpecsOpen(true)} />

      {/* Main Connected Narrative Flow: Priority People & Events over Projects */}
      <main className="relative z-10 flex-1">
        {/* 1. Monumental Hero & Pinned Continuous 3D Network Storytelling */}
        <HeroSection />

        {/* 2. People & Team (Student Organizers, Tech Leads & Distinct Alumni) */}
        <PeopleSection onSelectPerson={(person) => setSelectedPerson(person)} />

        {/* 3. Events & Workshops (Upcoming with Registration & Past with Photos) */}
        <EventsSection onSelectEvent={(evt) => setSelectedEvent(evt)} />

        {/* 4. What We Do (4 Concise Chapter Pillars) */}
        <WhatWeDoPreview />

        {/* 5. Projects (Restrained Supporting Software & Tools) */}
        <FeaturedProjects />

        {/* 6. Join Chapter */}
        <JoinSection />
      </main>

      {/* 7. Chapter Production Footer */}
      <Footer />

      {/* Event Detail Preview & Embedded Photo Gallery Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Member Profile Modal */}
      <PersonDetailModal
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />

      {/* Senior Presentation & Review Drawer */}
      <ReviewDrawer isOpen={specsOpen} onClose={() => setSpecsOpen(false)} />
    </div>
  );
}
