'use client';
import { Heart } from 'lucide-react';

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <h1 className="font-display text-5xl font-bold text-white text-center">Support Xenohuru</h1>
      <div className="max-w-4xl mx-auto text-center mt-12">
        <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <p className="text-[#8b949e] text-lg">Help us grow and improve this platform</p>
      </div>
    </div>
  );
}
