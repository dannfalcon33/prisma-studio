/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { ConverterPage } from './pages/ConverterPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#050508] text-slate-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/convertir" element={<ConverterPage />} />
        </Routes>

        {/* Quiet Footer */}
        <footer className="border-t border-purple-500/20 bg-[#050508] py-10 mt-auto">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-200/60">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white font-display">Prisma Studio</span>
              <span aria-hidden="true">·</span>
              <span>Conversión local de imágenes (máx. 5 archivos por lote)</span>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-purple-300 transition-colors">
                Inicio
              </Link>
              <a href="/#capacidades" className="hover:text-purple-300 transition-colors">
                Capacidades
              </a>
              <a href="/#impacto" className="hover:text-purple-300 transition-colors">
                Rendimiento
              </a>
              <a href="/#formatos" className="hover:text-purple-300 transition-colors">
                Formatos
              </a>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
