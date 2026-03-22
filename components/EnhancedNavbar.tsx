'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mountain,
  Search,
  Github,
  Menu,
  X,
  ChevronDown,
  Globe,
  Clock,
} from 'lucide-react';

export function EnhancedNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      setCurrentTime(eatTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const mainLinks = [
    { href: '/', label: 'Home' },
    { href: '/attractions', label: 'Attractions' },
    { href: '/regions', label: 'Regions' },
    { href: '/map', label: 'Map' },
    { href: '/blog', label: 'Blog' },
  ];

  const moreLinks = [
    { href: '/operators', label: 'Operators' },
    { href: '/partners', label: 'Partners' },
    { href: '/weather', label: 'Weather' },
    { href: '/about', label: 'About' },
    { href: '/sponsor', label: 'Sponsor' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d1117] border-b border-[#30363d] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Mountain className="w-8 h-8 text-[#1a7a4a]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">Xenohuru</span>
              <span className="px-2 py-0.5 bg-[#1a7a4a]/10 text-[#1a7a4a] text-xs font-semibold rounded border border-[#1a7a4a]/20">
                Open Source
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-[#1a7a4a]/20 border-b-2 border-[#1a7a4a]'
                    : 'text-[#8b949e] hover:text-[#e8a045] hover:bg-[#161b22]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="px-4 py-2 rounded-md text-sm font-medium text-[#8b949e] hover:text-[#e8a045] hover:bg-[#161b22] transition-colors flex items-center gap-1"
              >
                More
                <ChevronDown className="w-4 h-4" />
              </button>
              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#161b22] border border-[#30363d] rounded-lg shadow-lg py-2">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        isActive(link.href)
                          ? 'text-[#1a7a4a] bg-[#1a7a4a]/10'
                          : 'text-[#8b949e] hover:text-[#e8a045] hover:bg-[#0d1117]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Utilities */}
          <div className="hidden lg:flex items-center gap-4">
            {/* EAT Clock */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-md">
              <div className="w-2 h-2 bg-[#1a7a4a] rounded-full animate-pulse" />
              <Clock className="w-4 h-4 text-[#8b949e]" />
              <span className="text-sm font-mono text-[#e6edf3]">{currentTime} EAT</span>
            </div>

            {/* Search */}
            <Link
              href="/search"
              className="p-2 text-[#8b949e] hover:text-[#e8a045] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Language Toggle */}
            <div className="flex items-center bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
              <button className="px-3 py-1.5 text-xs font-medium bg-[#1a7a4a] text-white">
                EN
              </button>
              <button className="px-3 py-1.5 text-xs font-medium text-[#8b949e] hover:text-white">
                SW
              </button>
            </div>

            {/* GitHub Stars */}
            <a
              href="https://github.com/xenohuru/xenohuru-web-nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-md hover:border-[#1a7a4a] transition-colors group"
            >
              <Github className="w-4 h-4 text-[#8b949e] group-hover:text-[#1a7a4a]" />
              <span className="text-sm text-[#e6edf3]">Star</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#8b949e] hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0d1117] border-t border-[#30363d] animate-slide-in">
          <div className="px-4 py-4 space-y-2">
            {/* EAT Clock Mobile */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border border-[#30363d] rounded-md mb-4">
              <div className="w-2 h-2 bg-[#1a7a4a] rounded-full animate-pulse" />
              <Clock className="w-4 h-4 text-[#8b949e]" />
              <span className="text-sm font-mono text-[#e6edf3]">{currentTime} EAT</span>
            </div>

            {[...mainLinks, ...moreLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-white bg-[#1a7a4a]/20 border-l-2 border-[#1a7a4a]'
                    : 'text-[#8b949e] hover:text-[#e8a045] hover:bg-[#161b22]'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-[#30363d] space-y-2">
              <Link
                href="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-[#8b949e] hover:text-[#e8a045] transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </Link>
              <a
                href="https://github.com/xenohuru/xenohuru-web-nextjs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-[#8b949e] hover:text-[#e8a045] transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
