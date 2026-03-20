import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111827] border-t border-[#c8903a]/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-[#c8903a] font-bold text-lg mb-4">Xenohuru</h3>
            <p className="text-[#6b7280] text-sm mb-4">
              Your open-source guide to Tanzania's wonders. From Kilimanjaro to Zanzibar — explore, discover, and experience Tanzania.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Xenohuru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b7280] hover:text-[#c8903a] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/xenohuru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6b7280] hover:text-[#c8903a] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="text-[#6b7280] hover:text-[#c8903a] transition-colors"
                aria-label="Contact"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/attractions" className="text-[#6b7280] hover:text-[#c8903a] transition-colors">
                  Attractions
                </Link>
              </li>
              <li>
                <Link href="/regions" className="text-[#6b7280] hover:text-[#c8903a] transition-colors">
                  Regions
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-[#6b7280] hover:text-[#c8903a] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-[#6b7280] hover:text-[#c8903a] transition-colors">
                  Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-[#6b7280] hover:text-[#c8903a] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://ko-fi.com/xenohuru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b7280] hover:text-[#c8903a] transition-colors"
                >
                  Support Us
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Xenohuru/xenohuru-web-nextjs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b7280] hover:text-[#c8903a] transition-colors"
                >
                  Contribute
                </a>
              </li>
              <li>
                <Link href="/contributors" className="text-[#6b7280] hover:text-[#c8903a] transition-colors">
                  Contributors
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#c8903a]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#6b7280]">
            <p>© {currentYear} Xenohuru. Made with ❤️ in Tanzania 🇹🇿</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-[#c8903a] transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-[#c8903a] transition-colors">
                Privacy
              </Link>
              <span>MIT License</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
