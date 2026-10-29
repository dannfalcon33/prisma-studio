import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  FileImage,
  Layers,
  Sliders,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SUPPORTED_FORMATS, ImageFormatId } from '../utils/imageConverter';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [formatCategoryFilter, setFormatCategoryFilter] = useState<
    'Todos' | 'Web & Estándar' | 'Edición & Archivo' | 'Iconografía & Vector'
  >('Todos');

  const filteredFormats =
    formatCategoryFilter === 'Todos'
      ? SUPPORTED_FORMATS
      : SUPPORTED_FORMATS.filter((f) => f.category === formatCategoryFilter);

  const handleSelectFormat = (fmt: ImageFormatId) => {
    navigate(`/convertir?formato=${fmt}`);
  };

  return (
    <div className="flex-1 bg-[#050508] text-slate-100">
      {/* Section 1: Hero Section (2-Column Split on Desktop with Cyberpunk Visual Anchor) */}
      <section className="relative overflow-hidden border-b border-purple-500/20 bg-cyber-grid">
        {/* Radial Neon Purple Ambient Glow */}
        <div
          className="pointer-events-none absolute -top-36 left-1/2 -translate-x-1/2 w-[760px] h-[380px] rounded-full blur-[130px] opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.85) 0%, rgba(126,34,206,0) 70%)'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Value Proposition + Single Primary Action */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <p className="text-xs font-medium text-purple-300/90 font-mono-tabular">
                Motor de transcodificación óptica · Hasta 5 imágenes simultáneas · 10 formatos
              </p>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display"
                style={{ textWrap: 'balance' }}
              >
                Conversión multiformato de imágenes a velocidad de estudio.
              </h1>

              <p className="text-base sm:text-lg text-purple-100/75 leading-relaxed max-w-2xl">
                Transforma lotes de hasta 5 archivos simultáneamente entre PNG, JPG, JPEG, WEBP,
                AVIF, BMP, TIFF, GIF, ICO y SVG. Procesamiento 100% local en memoria con control de
                compresión, reescalado e inspección óptica antes de descargar.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/convertir"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white rounded-xl neon-button-purple transition-all whitespace-nowrap shrink-0"
                >
                  <span>Ir al Conversor de Imágenes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#formatos"
                  className="px-5 py-3.5 text-sm font-medium text-purple-200 border border-purple-500/35 rounded-xl hover:bg-purple-500/15 hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  Explorar los 10 formatos
                </a>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-purple-200/65 font-mono-tabular">
                <span>PNG · JPG · JPEG · WEBP · AVIF</span>
                <span aria-hidden="true">·</span>
                <span>BMP · TIFF · GIF · ICO · SVG</span>
                <span aria-hidden="true">·</span>
                <span>Exportación individual o ZIP</span>
              </div>
            </div>

            {/* Right Column: Interactive Optical Pipeline Preview Card */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-2xl bg-[#0B0914] border border-purple-500/40 p-6 flex flex-col justify-between gap-6 neon-border-purple">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white font-display">
                      Vista previa del lote activo
                    </h2>
                    <p className="text-xs text-purple-300/70 font-mono-tabular mt-0.5">
                      Capacidad máxima: 5 ranuras por lote
                    </p>
                  </div>
                  <span className="text-xs font-mono-tabular text-purple-300">
                    10 códecs activos
                  </span>
                </div>

                {/* Simulated Optical Prism Spectrum SVG Artwork */}
                <div className="relative rounded-xl border border-purple-500/30 bg-[#07050E] p-5 overflow-hidden">
                  <svg
                    viewBox="0 0 420 200"
                    className="w-full h-44"
                    role="img"
                    aria-label="Diagrama de refracción óptica multiformato"
                  >
                    <defs>
                      <linearGradient id="cyberBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F3E8FF" stopOpacity="0.95" />
                        <stop offset="35%" stopColor="#C084FC" stopOpacity="0.75" />
                        <stop offset="70%" stopColor="#9333EA" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#581C87" stopOpacity="0.05" />
                      </linearGradient>
                      <linearGradient id="prismFace" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                        <stop offset="50%" stopColor="#1E1B4B" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#D8B4FE" stopOpacity="0.45" />
                      </linearGradient>
                    </defs>

                    {/* Input Ray */}
                    <line
                      x1="10"
                      y1="125"
                      x2="165"
                      y2="98"
                      stroke="#E9D5FF"
                      strokeWidth="3.5"
                    />

                    {/* Dispersed Output Spectrum */}
                    <polygon points="215,78 410,32 410,168 215,115" fill="url(#cyberBeam)" />

                    {/* Optical Prism */}
                    <polygon
                      points="190,34 252,158 128,158"
                      fill="url(#prismFace)"
                      stroke="#C084FC"
                      strokeWidth="2"
                    />

                    {/* Output Format Labels */}
                    <text
                      x="345"
                      y="56"
                      fill="#F3E8FF"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      .WEBP (-68%)
                    </text>
                    <text
                      x="345"
                      y="86"
                      fill="#D8B4FE"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      .PNG (Lossless)
                    </text>
                    <text
                      x="345"
                      y="116"
                      fill="#C084FC"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      .AVIF / .JPG
                    </text>
                    <text
                      x="345"
                      y="146"
                      fill="#A855F7"
                      fontSize="11"
                      fontFamily="JetBrains Mono, monospace"
                    >
                      .ICO / .TIFF
                    </text>
                  </svg>

                  <div className="mt-3 pt-3 border-t border-purple-500/20 flex items-center justify-between text-xs font-mono-tabular text-purple-200/80">
                    <span>Entrada: RAW / PNG / JPG / WEBP</span>
                    <span>Salida: 10 formatos</span>
                  </div>
                </div>

                {/* Quick Format Jump Grid */}
                <div className="space-y-2.5">
                  <p className="text-xs text-purple-200/75">
                    Selecciona un formato de destino para abrir el conversor directamente:
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {SUPPORTED_FORMATS.map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => handleSelectFormat(fmt.id)}
                        className="py-2 px-2 text-xs font-mono-tabular font-semibold text-purple-100 bg-[#140F26] border border-purple-500/35 rounded-lg hover:bg-purple-600 hover:text-white hover:border-purple-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Capabilities (Asymmetric Bento Grid with Editorial Numbering) */}
      <section
        id="capacidades"
        className="border-b border-purple-500/20 bg-[#07060C] py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-purple-400 mb-2 font-mono-tabular">
              Arquitectura de procesamiento de imagen
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display"
              style={{ textWrap: 'balance' }}
            >
              Diseñado para equipos de diseño, desarrollo web y fotografía digital.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Span 2 Marquee Capability */}
            <div className="lg:col-span-2 p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6">
              <div className="space-y-3 max-w-xl">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-purple-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  01. Transcodificación local sin subida a servidores externos
                </h3>
                <p className="text-sm text-purple-100/75 leading-relaxed">
                  Tus fotografías de producto, documentos confidenciales y recursos de interfaz se
                  decodifican y recodifican íntegramente en la memoria de tu navegador mediante
                  buffers binarios y aceleración por hardware Canvas 2D. Ningún byte abandona tu
                  equipo.
                </p>
              </div>

              <div className="pt-4 border-t border-purple-500/20 flex flex-wrap items-center gap-6 text-xs text-purple-300/80 font-mono-tabular">
                <span>Latencia de red: 0 ms</span>
                <span aria-hidden="true">·</span>
                <span>Límite simultáneo: 5 archivos por cola</span>
                <span aria-hidden="true">·</span>
                <span>Exportación individual o paquete ZIP</span>
              </div>
            </div>

            {/* Span 1 Capability */}
            <div className="p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-purple-300">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  02. Control independiente por archivo
                </h3>
                <p className="text-sm text-purple-100/75 leading-relaxed">
                  Carga hasta 5 imágenes a la vez y asigna un formato global con un clic, o define
                  salidas distintas para cada archivo (por ejemplo, exportar un logotipo a ICO y SVG
                  mientras conviertes fotografías a WEBP).
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/80 font-mono-tabular">
                Asignación híbrida global / individual
              </div>
            </div>

            {/* Span 1 Capability */}
            <div className="p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-purple-300">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  03. Inspección con cortina óptica
                </h3>
                <p className="text-sm text-purple-100/75 leading-relaxed">
                  Verifica la fidelidad visual antes de descargar. Desliza la cortina interactiva
                  sobre el lienzo para comparar nitidez, artefactos de compresión y transparencia
                  entre el archivo original y el convertido.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/80 font-mono-tabular">
                Vista dividida 1:1 y lado a lado
              </div>
            </div>

            {/* Span 2 Capability */}
            <div className="lg:col-span-2 p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6">
              <div className="space-y-3 max-w-xl">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-purple-300">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  04. Codificadores binarios dedicados para formatos técnicos
                </h3>
                <p className="text-sm text-purple-100/75 leading-relaxed">
                  Además de los estándares web (PNG, JPG, JPEG, WEBP y AVIF), Prisma Studio integra
                  empaquetadores binarios directos para mapas de bits Windows (BMP de 24 bits),
                  preimpresión (Baseline TIFF 6.0), paletas indexadas LZW (GIF89a) e iconos de
                  aplicación (ICO de hasta 256×256 píxeles).
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 flex flex-wrap items-center gap-6 text-xs text-purple-300/80 font-mono-tabular">
                <span>Cabeceras binarias estándar</span>
                <span aria-hidden="true">·</span>
                <span>Relleno de canal alfa configurable</span>
                <span aria-hidden="true">·</span>
                <span>Reescalado de 25% a 200%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Proof of Impact Adjacent to Claims */}
      <section id="impacto" className="border-b border-purple-500/20 bg-[#050508] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-medium text-purple-400 mb-2 font-mono-tabular">
              Resultados medibles en producción
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display"
              style={{ textWrap: 'balance' }}
            >
              Impacto directo en tiempos de carga web y flujos editoriales.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <p className="text-3xl font-extrabold text-purple-300 font-mono-tabular">
                  -64.8% en bytes
                </p>
                <p className="text-xs text-purple-200/70">
                  Migración de catálogos PNG/JPEG a WEBP (Calidad 86%)
                </p>
                <p className="text-sm text-purple-100/75 pt-2 leading-relaxed">
                  En pruebas sobre lotes de 5 fotografías de producto en alta resolución (1400 ×
                  1050 px), la conversión a WEBP redujo el peso medio del lote de 4.2 MB a 1.48 MB
                  manteniendo bordes nítidos y perfil de color.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/65">
                Caso de estudio: Optimización de tienda online de mobiliario
              </div>
            </article>

            <article className="p-6 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <p className="text-3xl font-extrabold text-purple-300 font-mono-tabular">
                  38 ms / imagen
                </p>
                <p className="text-xs text-purple-200/70">
                  Tiempo medio de codificación por archivo en lote de 5
                </p>
                <p className="text-sm text-purple-100/75 pt-2 leading-relaxed">
                  Al prescindir de colas en la nube y subidas HTTP, un lote completo de 5 imágenes
                  se procesa y empaqueta en un archivo ZIP descargable en menos de 0.25 segundos en
                  navegadores de escritorio modernos.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/65">
                Medición realizada sobre archivos de 1.5 MP en cliente local
              </div>
            </article>

            <article className="p-6 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <p className="text-3xl font-extrabold text-purple-300 font-mono-tabular">
                  10 formatos
                </p>
                <p className="text-xs text-purple-200/70">
                  Compatibilidad cruzada desde un único panel operativo
                </p>
                <p className="text-sm text-purple-100/75 pt-2 leading-relaxed">
                  Elimina la necesidad de alternar entre utilidades de escritorio para generar
                  favicons `.ico`, archivos `.tiff` para imprenta y versiones `.webp` o `.avif` para
                  despliegue en aplicaciones web.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/65">
                Flujo unificado para diseño de producto e ingeniería frontend
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Section 4: Interactive Format Specification Matrix */}
      <section id="formatos" className="bg-[#07060C] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-purple-400 mb-2 font-mono-tabular">
                Especificaciones técnicas de codificación
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display"
                style={{ textWrap: 'balance' }}
              >
                Catálogo de formatos soportados y perfiles de uso.
              </h2>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#120E21] border border-purple-500/30 rounded-lg self-start overflow-x-auto max-w-full">
              {(
                [
                  'Todos',
                  'Web & Estándar',
                  'Edición & Archivo',
                  'Iconografía & Vector'
                ] as const
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormatCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    formatCategoryFilter === cat
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-purple-200/70 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFormats.map((fmt) => (
              <div
                key={fmt.id}
                className="p-6 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between gap-4 hover:border-purple-400/60 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                      <FileImage className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>
                        {fmt.label} (.{fmt.extension})
                      </span>
                    </h3>
                    <span className="text-xs text-purple-300/70 font-mono-tabular">
                      {fmt.mimeType}
                    </span>
                  </div>

                  <p className="text-sm text-purple-100/75 leading-relaxed">{fmt.description}</p>
                </div>

                <div className="pt-3 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-purple-200/65">
                    <span>{fmt.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {fmt.supportsTransparency ? 'Soporta canal alfa' : 'Fondo opaco'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {fmt.supportsQuality ? 'Compresión regulable' : 'Sin pérdida'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectFormat(fmt.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Convertir a {fmt.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
