import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const isConverterPage = location.pathname === '/convertir';
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-30 bg-[#050508]/90 backdrop-blur-md border-b border-purple-500/25">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <Link
          to="/"
          className="text-lg font-extrabold tracking-tight text-white hover:text-purple-300 transition-colors whitespace-nowrap shrink-0 font-display"
        >
          Prisma Studio
        </Link>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-purple-200/75">
          <Link
            to="/"
            className={`hover:text-purple-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
              !isConverterPage ? 'text-purple-300 underline' : ''
            }`}
          >
            {t.nav.home}
          </Link>
          <a
            href="/#capacidades"
            className="hover:text-purple-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.capabilities}
          </a>
          <a
            href="/#impacto"
            className="hover:text-purple-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.performance}
          </a>
          <a
            href="/#formatos"
            className="hover:text-purple-300 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.formats}
          </a>
        </nav>

        {/* Zone 3: Language Switcher + Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#120E21] border border-purple-500/35 rounded-lg">
            <Globe className="w-3.5 h-3.5 text-purple-300 shrink-0" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              aria-label={t.nav.langLabel}
              className="bg-transparent text-xs font-semibold text-purple-100 focus:outline-none cursor-pointer font-mono-tabular"
            >
              <option value="es" className="bg-[#0B0914] text-white">
                ES · Español
              </option>
              <option value="en" className="bg-[#0B0914] text-white">
                EN · English
              </option>
              <option value="pt" className="bg-[#0B0914] text-white">
                PT · Português
              </option>
            </select>
          </div>

          {isConverterPage ? (
            <Link
              to="/"
              className="px-4 py-2 text-xs font-semibold text-purple-200 border border-purple-500/40 rounded-lg hover:bg-purple-500/15 transition-colors whitespace-nowrap shrink-0"
            >
              {t.nav.backHome}
            </Link>
          ) : (
            <Link
              to="/convertir"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg neon-button-purple transition-all whitespace-nowrap shrink-0"
            >
              <span>{t.nav.openConverter}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
