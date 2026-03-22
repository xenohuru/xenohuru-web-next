'use client';

import { Users, Heart, Globe, Github, Mail } from 'lucide-react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const values = [
    { icon: Globe, title: 'Discovery', desc: 'Explore Tanzania\'s hidden gems' },
    { icon: Heart, title: 'Community', desc: 'Built by passionate Tanzanians' },
    { icon: Users, title: 'Accessibility', desc: 'Free for everyone, always' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <section className="py-20 px-4 bg-gradient-to-br from-[#1a4731] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-6">About Xenohuru</h1>
          <p className="text-xl text-[#c8903a] mb-8">Explore the Wild Heart of Africa</p>
          <p className="text-lg text-[#8b949e]">Open-source Tanzania tourism platform by the community</p>
        </div>
      </section>

      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="font-display text-4xl font-bold text-white mb-12 text-center">Our Mission</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-[#111827] p-8 rounded-2xl border border-[#c8903a]/10">
              <v.icon className="w-12 h-12 text-[#c8903a] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
              <p className="text-[#8b949e]">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center bg-[#111827]">
        <a href="https://github.com/xenohuru" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a0a0a] font-bold rounded-full hover:bg-[#c8903a] transition">
          <Github className="w-5 h-5" />
          GitHub
        </a>
      </section>
    </div>
  );
}
