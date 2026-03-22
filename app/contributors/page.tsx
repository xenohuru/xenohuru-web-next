'use client';
import { Github } from 'lucide-react';

export default function ContributorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <h1 className="font-display text-5xl font-bold text-white text-center">Contributors</h1>
      <div className="max-w-4xl mx-auto text-center mt-12">
        <Github className="w-16 h-16 text-[#c8903a] mx-auto mb-4" />
        <p className="text-[#8b949e] mb-6">Join on GitHub</p>
        <a href="https://github.com/xenohuru" target="_blank" className="inline-block px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-[#c8903a]">
          View GitHub
        </a>
      </div>
    </div>
  );
}
