"use client";

import { useState } from "react";
import BootSequence from "./components/BootSequence";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
import EventsSection from "./components/EventsSection";
import EventDetailModal, { ACMEvent } from "./components/EventDetailModal";
import PeopleSection from "./components/PeopleSection";
import PersonDetailModal, { ACMMember } from "./components/PersonDetailModal";
import ProjectsSection from "./components/ProjectsSection";
import ArchiveSection from "./components/ArchiveSection";
import ResourcesSection from "./components/ResourcesSection";
import JoinSection from "./components/JoinSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ReviewDrawer from "./components/ReviewDrawer";

export default function Home() {
  const [specsOpen, setSpecsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<ACMEvent | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<ACMMember | null>(null);

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col tech-grid-pattern selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 1. Cinematic Boot Initialization Sequence (Skippable) */}
      <BootSequence />

      {/* Background Ambient Radial Spotlight Glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute top-[30%] -left-48 h-[550px] w-[600px] rounded-full bg-sky-600/5 blur-[140px]" />
        <div className="absolute top-[65%] -right-48 h-[600px] w-[700px] rounded-full bg-cyan-600/5 blur-[150px]" />
      </div>

      {/* Floating Production Navigation Bar */}
      <Navbar onOpenSpecs={() => setSpecsOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex-1">
        {/* 2. Monumental Hero Section */}
        <HeroSection />

        {/* 3. About ACM Section */}
        <AboutSection />

        {/* 4. ACM Network & 6 Core Capabilities */}
        <CapabilitiesSection />

        {/* 5 & 6. Chapter Events & Interactive Calendar */}
        <EventsSection onSelectEvent={(evt) => setSelectedEvent(evt)} />

        {/* 8. People Constellation & Members */}
        <PeopleSection onSelectPerson={(person) => setSelectedPerson(person)} />

        {/* 9. Projects & Engineering Branches */}
        <ProjectsSection />

        {/* 10. Photo & Activity Archive */}
        <ArchiveSection />

        {/* 11. Resources & Student Learning Repository */}
        <ResourcesSection />

        {/* 12. Join ACM & Action Callout */}
        <JoinSection />

        {/* 13. Chapter Contact & Official Links */}
        <ContactSection />
      </main>

      {/* 14. Complete Professional Footer */}
      <Footer />

      {/* 7. Event Detail Preview Slideout / Modal */}
      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Interactive Member Dossier Modal */}
      <PersonDetailModal
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />

      {/* Senior Presentation & Review Drawer */}
      <ReviewDrawer isOpen={specsOpen} onClose={() => setSpecsOpen(false)} />
    </div>
  );
}
