'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mountain,
  Github,
  Twitter,
  Mail,
  Clock,
  Code,
  Heart,
} from 'lucide-react';

const swahiliQuotes = [
  'Pole pole ndio mwendo',
  'Haraka haraka haina baraka',
  'Asiyefunzwa na mamaye hufunzwa na ulimwengu',
  'Umoja ni nguvu',
  'Haba na haba hujaza kibaba',
];

export function EnhancedFooter() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const eatTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Africa/Dar_es_Salaam',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      const utc = now.toISOString().substr(11, 8);
      setCurrentTime(`${eatTime} EAT (UTC ${utc})`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % swahiliQuotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#0d1117] border-t border-[#30363d] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/xenohuru-logo.svg" 
                alt="Xenohuru" 
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-[#8b949e] text-sm mb-4 italic">
              Your open-source guide to the wonders of Tanzania
            </p>
            
            {/* Live Clock */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md mb-4">
              <div className="w-2 h-2 bg-[#1a7a4a] rounded-full animate-pulse" />
              <Clock className="w-4 h-4 text-[#8b949e]" />
              <span className="text-xs font-mono text-[#e6edf3]">{currentTime}</span>
            </div>

            {/* License Badge */}
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-4 h-4 text-[#8b949e]" />
              <span className="text-xs text-[#8b949e]">MIT License</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#8b949e]">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>in Tanzania 🇹🇿</span>
            </div>
          </div>

          {/* Column 2 - Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/attractions', label: 'Attractions' },
                { href: '/regions', label: 'Regions' },
                { href: '/map', label: 'Map' },
                { href: '/blog', label: 'Blog' },
                { href: '/operators', label: 'Operators' },
                { href: '/partners', label: 'Partners' },
                { href: '/weather', label: 'Weather' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/xenohuru/xenohuru-web-nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/xenohuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter/X
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                >
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="https://xenohuru.cleven.is-a.dev/api/schema/swagger/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                >
                  API Docs
                </a>
              </li>
              <li>
                <Link
                  href="/contributors"
                  className="text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                >
                  Contributors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Open Source */}
          <div>
            <h3 className="text-white font-semibold mb-4">Open Source</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About' },
                { href: '/sponsor', label: 'Sponsor' },
                { href: 'https://github.com/xenohuru/xenohuru-web-nextjs/blob/main/LICENSE', label: 'License (MIT)', external: true },
                { href: '/changelog', label: 'Changelog' },
                { href: '/privacy', label: 'Terms of Use' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[#8b949e] hover:text-[#e8a045] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#30363d]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#8b949e] text-sm">
              © 2025 Xenohuru. Open source under MIT License
            </p>

            {/* Rotating Swahili Quote */}
            <p className="text-[#8b949e] text-sm italic transition-opacity duration-500">
              &ldquo;{swahiliQuotes[currentQuote]}&rdquo;
            </p>

            <div className="flex items-center gap-4 text-xs text-[#8b949e]">
              <Link href="/privacy" className="hover:text-[#e8a045] transition-colors">
                Privacy
              </Link>
              <span>·</span>
              <Link href="/privacy" className="hover:text-[#e8a045] transition-colors">
                Terms
              </Link>
              <span>·</span>
              <a
                href="https://xenohuru.cleven.is-a.dev/api/schema/swagger/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e8a045] transition-colors"
              >
                API
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
