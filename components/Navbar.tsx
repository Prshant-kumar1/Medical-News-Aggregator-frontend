'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/category/cardiology', label: 'Cardiology' },
    { href: '/category/oncology', label: 'Oncology' },
    { href: '/category/neurology', label: 'Neurology' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-[var(--border-color)] shadow-glass'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <Activity
                  size={26}
                  className="text-cyan-400 group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                />
              </div>
              <span className="font-display font-bold text-xl tracking-tight gradient-text">
                MedPulse
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === link.href
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="relative hidden md:block">
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-56 pl-4 pr-10 py-2 text-sm rounded-full glass border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    onBlur={() => {
                      if (!searchQuery) setSearchOpen(false);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-full glass border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                  aria-label="Search"
                >
                  <Search size={16} />
                </button>
              )}

              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-full glass border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center w-9 h-9 rounded-full glass border-[var(--border-color)] text-[var(--text-secondary)] hover:text-cyan-400 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-[var(--border-color)] px-4 py-3">
            <form onSubmit={handleSearch} className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-4 pr-10 py-2 text-sm rounded-full glass border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
              <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            </form>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                    pathname === link.href
                      ? 'text-cyan-400 bg-cyan-500/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
