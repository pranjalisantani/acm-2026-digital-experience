"use client";

import { useState } from "react";
import BootSequence from "./components/BootSequence";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import InformationSection from "./components/InformationSection";
import PeopleSection from "./components/PeopleSection";
import EventsSection from "./components/EventsSection";
import WhatWeDoPreview from "./components/WhatWeDoPreview";
import FeaturedProjects from "./components/FeaturedProjects";
import ResourcesSection from "./components/ResourcesSection";
import ArchiveSection from "./components/ArchiveSection";
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
      {/* Cinematic Boot Initialization Sequence */}
      <BootSequence />

      {/* Background Ambient Radial Spotlight Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[30%] -left-48 h-[550px] w-[600px] rounded-full bg-sky-600/5 blur-[140px]" />
        <div className="absolute top-[65%] -right-48 h-[600px] w-[700px] rounded-full bg-cyan-600/5 blur-[150px]" />
      </div>

      {/* Floating Production Navigation Bar */}
      <Navbar onOpenSpecs={() => setSpecsOpen(true)} />

      {/* Main Connected Narrative Flow (Prioritizing People and Events over Projects) */}
      <main className="relative z-10 flex-1">
        {/* 1. Monumental Hero Section */}
        <HeroSection />

        {/* 2. ACM Introduction & Scroll-Driven Storytelling */}
        <InformationSection />

        {/* 3. People / Team (Current Members & Distinct Alumni) */}
        <PeopleSection onSelectPerson={(person) => setSelectedPerson(person)} />

        {/* 4. Events & Workshops (Upcoming with Registration & Past with Photos) */}
        <EventsSection onSelectEvent={(evt) => setSelectedEvent(evt)} />

        {/* 5. What We Do (6 Chapter Initiatives) */}
        <WhatWeDoPreview />

        {/* 6. Projects (Restrained Supporting Software & Tools) */}
        <FeaturedProjects />

        {/* 7. Learning Resources (Syllabi, Guides & Notebooks) */}
        <ResourcesSection />

        {/* 8. Chapter Activity Archive (Visual History & Milestones) */}
        <ArchiveSection />

        {/* 9. Join / Participate */}
        <JoinSection />
      </main>

      {/* 10. Chapter Production Footer */}
      <Footer />

      {/* Event Detail Preview & Photo Gallery Modal */}
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
