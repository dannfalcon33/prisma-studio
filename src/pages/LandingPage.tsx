import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  FileImage,
  Layers,
  Sliders,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { SUPPORTED_FORMATS, ImageFormatId } from '../utils/imageConverter';

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay,
      ease: smoothEase
    }
  })
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: smoothEase
    }
  }
};

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
      {/* Section 1: Hero Section with Pure Black Background & 3 Animated Neon Purple Gradient Bubbles */}
      <section className="relative overflow-hidden border-b border-purple-500/25 bg-[#020205]">
        {/* Three Moving Neon Purple Gradient Bubbles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Bubble 1: Top Left */}
          <div className="cyber-bubble-1 absolute -top-24 left-[6%] w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full blur-[65px] opacity-65" />
          {/* Bubble 2: Center Right */}
          <div className="cyber-bubble-2 absolute top-12 right-[6%] w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full blur-[75px] opacity-60" />
          {/* Bubble 3: Bottom Center */}
          <div className="cyber-bubble-3 absolute -bottom-28 left-[32%] w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] rounded-full blur-[70px] opacity-55" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUpVariants}
            className="text-xs font-medium text-purple-300/95 font-mono-tabular mb-4"
          >
            Motor de transcodificación óptica · Hasta 10 imágenes simultáneas · 10 formatos
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUpVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-display max-w-4xl"
            style={{ textWrap: 'balance' }}
          >
            Conversión multiformato de imágenes a velocidad de estudio.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.16}
            variants={fadeUpVariants}
            className="text-base sm:text-lg text-purple-100/80 leading-relaxed max-w-2xl mt-6"
          >
            Transforma lotes de hasta 10 archivos simultáneamente entre PNG, JPG, JPEG, WEBP,
            AVIF, BMP, TIFF, GIF, ICO y SVG. Procesamiento 100% local en memoria con control de
            compresión, reescalado e inspección óptica antes de descargar.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.24}
            variants={fadeUpVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/convertir"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white rounded-xl neon-button-purple transition-all whitespace-nowrap shrink-0"
              >
                <span>Ir al Conversor de Imágenes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              href="#formatos"
              className="px-6 py-3.5 text-sm font-medium text-purple-200 bg-black/40 backdrop-blur-xs border border-purple-500/40 rounded-xl hover:bg-purple-500/20 hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Explorar los 10 formatos
            </motion.a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.32}
            variants={fadeUpVariants}
            className="mt-10 pt-6 border-t border-purple-500/25 flex flex-wrap items-center justify-center gap-3 text-xs text-purple-200/75 font-mono-tabular"
          >
            <span>Capacidad: 10 ranuras por lote</span>
            <span aria-hidden="true">·</span>
            <span>PNG · JPG · JPEG · WEBP · AVIF · BMP · TIFF · GIF · ICO · SVG</span>
            <span aria-hidden="true">·</span>
            <span>Descarga individual o ZIP</span>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Core Capabilities (Asymmetric Bento Grid with Editorial Numbering) */}
      <section
        id="capacidades"
        className="border-b border-purple-500/20 bg-[#07060C] py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUpVariants}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-medium text-purple-400 mb-2 font-mono-tabular">
              Arquitectura de procesamiento de imagen
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display"
              style={{ textWrap: 'balance' }}
            >
              Diseñado para equipos de diseño, desarrollo web y fotografía digital.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Span 2 Marquee Capability */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -4 }}
              className="lg:col-span-2 p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6 hover:border-purple-400/60 transition-colors"
            >
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
                <span>Límite simultáneo: 10 archivos por cola</span>
                <span aria-hidden="true">·</span>
                <span>Exportación individual o paquete ZIP</span>
              </div>
            </motion.div>

            {/* Span 1 Capability */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -4 }}
              className="p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6 hover:border-purple-400/60 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-purple-300">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  02. Control independiente por archivo
                </h3>
                <p className="text-sm text-purple-100/75 leading-relaxed">
                  Carga hasta 10 imágenes a la vez y asigna un formato global con un clic, o define
                  salidas distintas para cada archivo (por ejemplo, exportar un logotipo a ICO y SVG
                  mientras conviertes fotografías a WEBP).
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/80 font-mono-tabular">
                Asignación híbrida global / individual
              </div>
            </motion.div>

            {/* Span 1 Capability */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -4 }}
              className="p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6 hover:border-purple-400/60 transition-colors"
            >
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
            </motion.div>

            {/* Span 2 Capability */}
            <motion.div
              variants={cardItemVariants}
              whileHover={{ y: -4 }}
              className="lg:col-span-2 p-8 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6 hover:border-purple-400/60 transition-colors"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Proof of Impact Adjacent to Claims */}
      <section id="impacto" className="border-b border-purple-500/20 bg-[#050508] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUpVariants}
            className="max-w-2xl mb-12"
          >
            <p className="text-xs font-medium text-purple-400 mb-2 font-mono-tabular">
              Resultados medibles en producción
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display"
              style={{ textWrap: 'balance' }}
            >
              Impacto directo en tiempos de carga web y flujos editoriales.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.article
              variants={cardItemVariants}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6 hover:border-purple-400/60 transition-colors"
            >
              <div className="space-y-2">
                <p className="text-3xl font-extrabold text-purple-300 font-mono-tabular">
                  -64.8% en bytes
                </p>
                <p className="text-xs text-purple-200/70">
                  Migración de catálogos PNG/JPEG a WEBP (Calidad 86%)
                </p>
                <p className="text-sm text-purple-100/75 pt-2 leading-relaxed">
                  En pruebas sobre lotes de 10 fotografías de producto en alta resolución (1400 ×
                  1050 px), la conversión a WEBP redujo el peso medio del lote de 8.4 MB a 2.96 MB
                  manteniendo bordes nítidos y perfil de color.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/65">
                Caso de estudio: Optimización de tienda online de mobiliario
              </div>
            </motion.article>

            <motion.article
              variants={cardItemVariants}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6 hover:border-purple-400/60 transition-colors"
            >
              <div className="space-y-2">
                <p className="text-3xl font-extrabold text-purple-300 font-mono-tabular">
                  38 ms / imagen
                </p>
                <p className="text-xs text-purple-200/70">
                  Tiempo medio de codificación por archivo en lote de 10
                </p>
                <p className="text-sm text-purple-100/75 pt-2 leading-relaxed">
                  Al prescindir de colas en la nube y subidas HTTP, un lote completo de 10 imágenes
                  se procesa y empaqueta en un archivo ZIP descargable en menos de 0.45 segundos en
                  navegadores de escritorio modernos.
                </p>
              </div>
              <div className="pt-4 border-t border-purple-500/20 text-xs text-purple-300/65">
                Medición realizada sobre archivos de 1.5 MP en cliente local
              </div>
            </motion.article>

            <motion.article
              variants={cardItemVariants}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl border border-purple-500/30 bg-[#0B0914] flex flex-col justify-between space-y-6 hover:border-purple-400/60 transition-colors"
            >
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
            </motion.article>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Interactive Format Specification Matrix */}
      <section
        id="formatos"
        className="border-b border-purple-500/20 bg-[#07060C] py-20 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeUpVariants}
              className="max-w-2xl"
            >
              <p className="text-xs font-medium text-purple-400 mb-2 font-mono-tabular">
                Especificaciones técnicas de codificación
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-display"
                style={{ textWrap: 'balance' }}
              >
                Catálogo de formatos soportados y perfiles de uso.
              </h2>
            </motion.div>

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

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredFormats.map((fmt) => (
                <motion.div
                  layout
                  key={fmt.id}
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.28, ease: smoothEase }}
                  whileHover={{ y: -3 }}
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
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Final Call to Action Before Footer (Unboxed over Black Canvas with Single Radiant Neon Purple Sun Sphere) */}
      <section className="relative overflow-hidden bg-[#000000] py-28 md:py-36">
        {/* Single Centered Radiant Neon Purple Solar Sphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <div className="cyber-sun-sphere w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] rounded-full blur-[38px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: smoothEase }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center"
        >
          <p className="text-xs font-semibold text-purple-200 font-mono-tabular mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Procesamiento instantáneo · 10 ranuras por lote · Sin registro
          </p>

          <h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display max-w-3xl leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            style={{ textWrap: 'balance' }}
          >
            Comienza a convertir y optimizar tus imágenes ahora mismo.
          </h2>

          <p className="text-base sm:text-lg text-purple-100/90 max-w-xl mt-5 leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
            Accede al Estudio de Conversión para arrastrar hasta 10 archivos simultáneamente,
            ajustar calidad o resolución, comparar resultados con la cortina óptica y descargar tu
            lote en un clic.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/convertir"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold text-white rounded-xl neon-button-purple transition-all whitespace-nowrap shrink-0"
              >
                <span>Ingresar al Conversor de Imágenes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-purple-200/80 font-mono-tabular drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            <span>100% Privado en tu navegador</span>
            <span aria-hidden="true">·</span>
            <span>PNG · JPG · JPEG · WEBP · AVIF · BMP · TIFF · GIF · ICO · SVG</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
