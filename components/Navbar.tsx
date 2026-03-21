'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Compass } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/attractions', label: 'Attractions' },
    { href: '/regions', label: 'Regions' },
    { href: '/blog', label: 'Blog' },
    { href: '/map', label: 'Map' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-lg ${
          isScrolled 
            ? 'bg-white/98 backdrop-blur-lg border-b border-gray-200' 
            : 'bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Compass className={`w-7 h-7 transition-colors ${isScrolled ? 'text-[#1a4731]' : 'text-[#c8903a]'}`} />
              <span className={`text-2xl font-display font-bold transition-colors ${
                isScrolled ? 'text-[#1a4731]' : 'text-white'
              }`}>
                Xenohuru
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                      isScrolled 
                        ? isActive ? 'text-[#1a4731]' : 'text-gray-700 hover:text-[#1a4731]'
                        : isActive ? 'text-white' : 'text-white/80 hover:text-white'
                    } group`}
                  >
                    {link.label}
                    {/* Active underline */}
                    <span 
                      className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                        isScrolled ? 'bg-[#1a4731]' : 'bg-[#c8903a]'
                      } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/attractions"
                className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors ${
                  isScrolled 
                    ? 'bg-[#c8903a] text-white hover:bg-[#c8903a]/90' 
                    : 'bg-[#c8903a] text-white hover:bg-[#c8903a]/90'
                }`}
              >
                Explore Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-50 w-64 bg-[#0a0a0a] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Mobile Links */}
          <div className="mt-12 space-y-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-colors ${
                    isActive ? 'text-[#c8903a]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Footer */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="text-white/40 text-xs font-mono">
              Karibu Tanzania 🇹🇿
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
