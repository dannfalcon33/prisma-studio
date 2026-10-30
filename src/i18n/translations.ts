import { ImageFormatId } from '../utils/imageConverter';

export type Language = 'es' | 'en' | 'pt';

export type FormatCategoryKey = 'all' | 'web' | 'editing' | 'vector';

export interface FormatTranslation {
  categoryKey: FormatCategoryKey;
  categoryLabel: string;
  description: string;
}

export interface TranslationDictionary {
  nav: {
    home: string;
    capabilities: string;
    performance: string;
    formats: string;
    openConverter: string;
    backHome: string;
    langLabel: string;
  };
  footer: {
    tagline: string;
  };
  landing: {
    heroKicker: string;
    heroTitle: string;
    heroSubtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroMetaSlots: string;
    heroMetaDownload: string;
    capKicker: string;
    capTitle: string;
    cap1Title: string;
    cap1Desc: string;
    cap1Meta1: string;
    cap1Meta2: string;
    cap1Meta3: string;
    cap2Title: string;
    cap2Desc: string;
    cap2Meta: string;
    cap3Title: string;
    cap3Desc: string;
    cap3Meta: string;
    cap4Title: string;
    cap4Desc: string;
    cap4Meta1: string;
    cap4Meta2: string;
    cap4Meta3: string;
    perfKicker: string;
    perfTitle: string;
    perf1Stat: string;
    perf1Sub: string;
    perf1Desc: string;
    perf1Foot: string;
    perf2Stat: string;
    perf2Sub: string;
    perf2Desc: string;
    perf2Foot: string;
    perf3Stat: string;
    perf3Sub: string;
    perf3Desc: string;
    perf3Foot: string;
    fmtKicker: string;
    fmtTitle: string;
    categories: Record<FormatCategoryKey, string>;
    alphaSupported: string;
    opaqueBg: string;
    adjustableCompression: string;
    lossless: string;
    convertToFormat: (label: string) => string;
    finalCtaKicker: string;
    finalCtaTitle: string;
    finalCtaDesc: string;
    finalCtaButton: string;
    finalCtaMeta1: string;
  };
  converter: {
    backToHome: string;
    pageTitle: string;
    pageSubtitle: string;
    addImagesBtn: (current: number, max: number) => string;
    slotsOccupied: string;
    inputTotal: string;
    loadingSamples: string;
    loadSamplesBtn: string;
    opticalParamsBtn: (quality: number, scale: number) => string;
    globalFormatLabel: string;
    globalFormatSub: string;
    qualityLabel: string;
    qualityHelp: string;
    scaleLabel: string;
    scaleHelp: string;
    geometryLabel: string;
    rotateTitle: string;
    flipHTitle: string;
    flipVTitle: string;
    filterOriginal: string;
    filterGrayscale: string;
    filterSepia: string;
    filterContrast: string;
    filterInvert: string;
    geometryHelp: string;
    alphaIcoLabel: string;
    bgObsidian: string;
    bgWhite: string;
    bgViolet: string;
    alphaIcoHelp: string;
    dismissNotice: string;
    invalidFileNotice: string;
    maxLimitReachedNotice: (max: number) => string;
    partialLoadNotice: (loaded: number, max: number) => string;
    corruptFileNotice: (name: string) => string;
    alreadyFullSamplesNotice: (max: number) => string;
    dropzoneEmptyTitle: string;
    dropzoneEmptySub: (max: number) => string;
    dropzoneEmptyBtn: (max: number) => string;
    dropzoneAddMore: (remaining: number) => string;
    dropzoneUploadLink: string;
    convertToLabel: string;
    readyToExport: (label: string) => string;
    encodingStatus: (label: string) => string;
    errorStatus: string;
    compareBtn: string;
    compareTitle: string;
    downloadBtn: string;
    convertSingleBtn: string;
    removeTitle: string;
    clearQueueBtn: (count: number) => string;
    totalOutput: string;
    downloadZipBtn: (count: number) => string;
    processingBatch: string;
    convertBatchBtn: (count: number) => string;
  };
  modal: {
    title: (name: string) => string;
    originalLabel: string;
    outputLabel: string;
    weightDelta: string;
    splitModeBtn: string;
    sideBySideBtn: string;
    closeAria: string;
    originalCorner: string;
    convertedCorner: string;
    sliderAria: string;
    originalFileHeader: string;
    resultHeader: (label: string) => string;
    encodingTime: string;
    closeBtn: string;
    downloadFileBtn: (name: string) => string;
  };
  formatSpecs: Record<ImageFormatId, FormatTranslation>;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  es: {
    nav: {
      home: 'Inicio',
      capabilities: 'Capacidades',
      performance: 'Rendimiento',
      formats: 'Formatos',
      openConverter: 'Abrir Conversor',
      backHome: 'Volver a Inicio',
      langLabel: 'Idioma'
    },
    footer: {
      tagline: 'Conversión local de imágenes (máx. 10 archivos por lote)'
    },
    landing: {
      heroKicker: 'Motor de transcodificación óptica · Hasta 10 imágenes simultáneas · 10 formatos',
      heroTitle: 'Conversión multiformato de imágenes a velocidad de estudio.',
      heroSubtitle:
        'Transforma lotes de hasta 10 archivos simultáneamente entre PNG, JPG, JPEG, WEBP, AVIF, BMP, TIFF, GIF, ICO y SVG. Procesamiento 100% local en memoria con control de compresión, reescalado e inspección óptica antes de descargar.',
      ctaPrimary: 'Ir al Conversor de Imágenes',
      ctaSecondary: 'Explorar los 10 formatos',
      heroMetaSlots: 'Capacidad: 10 ranuras por lote',
      heroMetaDownload: 'Descarga individual o ZIP',
      capKicker: 'Arquitectura de procesamiento de imagen',
      capTitle: 'Diseñado para equipos de diseño, desarrollo web y fotografía digital.',
      cap1Title: '01. Transcodificación local sin subida a servidores externos',
      cap1Desc:
        'Tus fotografías de producto, documentos confidenciales y recursos de interfaz se decodifican y recodifican íntegramente en la memoria de tu navegador mediante buffers binarios y aceleración por hardware Canvas 2D. Ningún byte abandona tu equipo.',
      cap1Meta1: 'Latencia de red: 0 ms',
      cap1Meta2: 'Límite simultáneo: 10 archivos por cola',
      cap1Meta3: 'Exportación individual o paquete ZIP',
      cap2Title: '02. Control independiente por archivo',
      cap2Desc:
        'Carga hasta 10 imágenes a la vez y asigna un formato global con un clic, o define salidas distintas para cada archivo (por ejemplo, exportar un logotipo a ICO y SVG mientras conviertes fotografías a WEBP).',
      cap2Meta: 'Asignación híbrida global / individual',
      cap3Title: '03. Inspección con cortina óptica',
      cap3Desc:
        'Verifica la fidelidad visual antes de descargar. Desliza la cortina interactiva sobre el lienzo para comparar nitidez, artefactos de compresión y transparencia entre el archivo original y el convertido.',
      cap3Meta: 'Vista dividida 1:1 y lado a lado',
      cap4Title: '04. Codificadores binarios dedicados para formatos técnicos',
      cap4Desc:
        'Además de los estándares web (PNG, JPG, JPEG, WEBP y AVIF), Prisma Studio integra empaquetadores binarios directos para mapas de bits Windows (BMP de 24 bits), preimpresión (Baseline TIFF 6.0), paletas indexadas LZW (GIF89a) e iconos de aplicación (ICO de hasta 256×256 píxeles).',
      cap4Meta1: 'Cabeceras binarias estándar',
      cap4Meta2: 'Relleno de canal alfa configurable',
      cap4Meta3: 'Reescalado de 25% a 200%',
      perfKicker: 'Resultados medibles en producción',
      perfTitle: 'Impacto directo en tiempos de carga web y flujos editoriales.',
      perf1Stat: '-64.8% en bytes',
      perf1Sub: 'Migración de catálogos PNG/JPEG a WEBP (Calidad 86%)',
      perf1Desc:
        'En pruebas sobre lotes de 10 fotografías de producto en alta resolución (1400 × 1050 px), la conversión a WEBP redujo el peso medio del lote de 8.4 MB a 2.96 MB manteniendo bordes nítidos y perfil de color.',
      perf1Foot: 'Caso de estudio: Optimización de tienda online de mobiliario',
      perf2Stat: '38 ms / imagen',
      perf2Sub: 'Tiempo medio de codificación por archivo en lote de 10',
      perf2Desc:
        'Al prescindir de colas en la nube y subidas HTTP, un lote completo de 10 imágenes se procesa y empaqueta en un archivo ZIP descargable en menos de 0.45 segundos en navegadores de escritorio modernos.',
      perf2Foot: 'Medición realizada sobre archivos de 1.5 MP en cliente local',
      perf3Stat: '10 formatos',
      perf3Sub: 'Compatibilidad cruzada desde un único panel operativo',
      perf3Desc:
        'Elimina la necesidad de alternar entre utilidades de escritorio para generar favicons .ico, archivos .tiff para imprenta y versiones .webp o .avif para despliegue en aplicaciones web.',
      perf3Foot: 'Flujo unificado para diseño de producto e ingeniería frontend',
      fmtKicker: 'Especificaciones técnicas de codificación',
      fmtTitle: 'Catálogo de formatos soportados y perfiles de uso.',
      categories: {
        all: 'Todos',
        web: 'Web & Estándar',
        editing: 'Edición & Archivo',
        vector: 'Iconografía & Vector'
      },
      alphaSupported: 'Soporta canal alfa',
      opaqueBg: 'Fondo opaco',
      adjustableCompression: 'Compresión regulable',
      lossless: 'Sin pérdida',
      convertToFormat: (label) => `Convertir a ${label}`,
      finalCtaKicker: 'Procesamiento instantáneo · 10 ranuras por lote · Sin registro',
      finalCtaTitle: 'Comienza a convertir y optimizar tus imágenes ahora mismo.',
      finalCtaDesc:
        'Accede al Estudio de Conversión para arrastrar hasta 10 archivos simultáneamente, ajustar calidad o resolución, comparar resultados con la cortina óptica y descargar tu lote en un clic.',
      finalCtaButton: 'Ingresar al Conversor de Imágenes',
      finalCtaMeta1: '100% Privado en tu navegador'
    },
    converter: {
      backToHome: 'Volver a la página principal',
      pageTitle: 'Estudio de Conversión Multiformato',
      pageSubtitle:
        'Carga hasta 10 imágenes simultáneamente y conviértelas entre PNG, JPG, JPEG, WEBP, AVIF, BMP, TIFF, GIF, ICO y SVG.',
      addImagesBtn: (current, max) => `Añadir imágenes (${current}/${max})`,
      slotsOccupied: 'ranuras ocupadas',
      inputTotal: 'Entrada',
      loadingSamples: 'Generando muestras...',
      loadSamplesBtn: 'Cargar 3 imágenes de prueba',
      opticalParamsBtn: (q, s) => `Parámetros ópticos (${q}% · ${s}%)`,
      globalFormatLabel: 'Formato de salida global:',
      globalFormatSub: 'Aplicar a todo el lote o personalizar por archivo',
      qualityLabel: 'Calidad de codificación',
      qualityHelp: 'Activo en WEBP, JPG, JPEG, AVIF y SVG. PNG, BMP y TIFF son sin pérdida.',
      scaleLabel: 'Escala de resolución',
      scaleHelp: 'Redimensiona proporcionalmente el ancho y alto en píxeles.',
      geometryLabel: 'Geometría y filtro óptico',
      rotateTitle: 'Rotar 90 grados',
      flipHTitle: 'Voltear horizontalmente',
      flipVTitle: 'Voltear verticalmente',
      filterOriginal: 'Color original',
      filterGrayscale: 'Blanco y negro',
      filterSepia: 'Sepia editorial',
      filterContrast: 'Alto contraste',
      filterInvert: 'Invertir canales',
      geometryHelp: 'Transformaciones aplicadas antes de codificar el archivo final.',
      alphaIcoLabel: 'Fondo sin alfa y tamaño ICO',
      bgObsidian: 'Obsidiana',
      bgWhite: 'Blanco',
      bgViolet: 'Violeta',
      alphaIcoHelp: 'Relleno usado al convertir transparencias a JPG, BMP o TIFF.',
      dismissNotice: 'Entendido',
      invalidFileNotice:
        'Selecciona archivos de imagen válidos (PNG, JPG, JPEG, WEBP, AVIF, BMP, GIF, ICO, TIFF o SVG).',
      maxLimitReachedNotice: (max) =>
        `El límite máximo es de ${max} imágenes simultáneas. Elimina alguna imagen de la cola para añadir nuevas.`,
      partialLoadNotice: (loaded, max) =>
        `Se han cargado ${loaded} imágenes hasta completar el límite máximo de ${max} archivos por lote.`,
      corruptFileNotice: (name) =>
        `No se pudo leer la imagen "${name}". Verifica que el archivo no esté dañado.`,
      alreadyFullSamplesNotice: (max) =>
        `Ya tienes ${max} imágenes cargadas. Vacía la cola o elimina un archivo para cargar las muestras.`,
      dropzoneEmptyTitle: 'Arrastra tus imágenes aquí o haz clic para explorar',
      dropzoneEmptySub: (max) =>
        `Soporta hasta ${max} imágenes simultáneas · PNG · JPG · JPEG · WEBP · AVIF · BMP · TIFF · GIF · ICO · SVG`,
      dropzoneEmptyBtn: (max) => `Seleccionar archivos (máx. ${max})`,
      dropzoneAddMore: (rem) =>
        `Añadir más imágenes al lote actual (${rem} ${
          rem === 1 ? 'ranura disponible' : 'ranuras disponibles'
        })`,
      dropzoneUploadLink: '+ Subir archivo',
      convertToLabel: 'Convertir a:',
      readyToExport: (label) => `Listo para exportar a ${label}`,
      encodingStatus: (label) => `Codificando ${label}...`,
      errorStatus: 'Error de formato',
      compareBtn: 'Comparar',
      compareTitle: 'Comparar original y resultado',
      downloadBtn: 'Descargar',
      convertSingleBtn: 'Convertir',
      removeTitle: 'Eliminar de la cola',
      clearQueueBtn: (count) => `Vaciar las ${count} imágenes`,
      totalOutput: 'Salida total',
      downloadZipBtn: (count) => `Descargar lote en ZIP (${count})`,
      processingBatch: 'Procesando lote...',
      convertBatchBtn: (count) =>
        `Convertir ${count === 1 ? 'imagen' : `las ${count} imágenes`}`
    },
    modal: {
      title: (name) => `Inspección óptica: ${name}`,
      originalLabel: 'Original',
      outputLabel: 'Salida',
      weightDelta: 'en peso',
      splitModeBtn: 'Cortina interactiva',
      sideBySideBtn: 'Lado a lado',
      closeAria: 'Cerrar inspector',
      originalCorner: 'Original',
      convertedCorner: 'Convertido',
      sliderAria: 'Posición de cortina comparativa',
      originalFileHeader: 'Archivo original',
      resultHeader: (label) => `Resultado ${label}`,
      encodingTime: 'Tiempo de codificación',
      closeBtn: 'Cerrar vista',
      downloadFileBtn: (name) => `Descargar ${name}`
    },
    formatSpecs: {
      webp: {
        categoryKey: 'web',
        categoryLabel: 'Web & Estándar',
        description: 'Compresión perceptual avanzada con canal alfa y menor peso para web.'
      },
      png: {
        categoryKey: 'web',
        categoryLabel: 'Web & Estándar',
        description: 'Compresión sin pérdida (lossless) con soporte completo de transparencia.'
      },
      jpg: {
        categoryKey: 'web',
        categoryLabel: 'Web & Estándar',
        description: 'Estándar universal fotográfico con control ajustable de compresión.'
      },
      jpeg: {
        categoryKey: 'web',
        categoryLabel: 'Web & Estándar',
        description: 'Codificación Joint Photographic Experts Group con extensión explícita .jpeg.'
      },
      avif: {
        categoryKey: 'web',
        categoryLabel: 'Web & Estándar',
        description: 'Formato de última generación basado en AV1 para máxima reducción de bytes.'
      },
      bmp: {
        categoryKey: 'editing',
        categoryLabel: 'Edición & Archivo',
        description: 'Mapa de bits binario de 24 bits sin compresión para lectura directa.'
      },
      tiff: {
        categoryKey: 'editing',
        categoryLabel: 'Edición & Archivo',
        description: 'Formato Tagged Image File sin pérdida para archivo y preimpresión.'
      },
      gif: {
        categoryKey: 'vector',
        categoryLabel: 'Iconografía & Vector',
        description: 'Codificación GIF89a con cuantización de paleta indexada de 256 colores.'
      },
      ico: {
        categoryKey: 'vector',
        categoryLabel: 'Iconografía & Vector',
        description: 'Contenedor binario de icono para navegadores y sistemas de escritorio.'
      },
      svg: {
        categoryKey: 'vector',
        categoryLabel: 'Iconografía & Vector',
        description: 'Documento Scalable Vector Graphics con trazado o lienzo encapsulado.'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      capabilities: 'Capabilities',
      performance: 'Performance',
      formats: 'Formats',
      openConverter: 'Open Converter',
      backHome: 'Back to Home',
      langLabel: 'Language'
    },
    footer: {
      tagline: 'Local browser image conversion (up to 10 files per batch)'
    },
    landing: {
      heroKicker: 'Optical transcoding engine · Up to 10 simultaneous images · 10 formats',
      heroTitle: 'Multi-format image conversion at studio speed.',
      heroSubtitle:
        'Transform batches of up to 10 files simultaneously across PNG, JPG, JPEG, WEBP, AVIF, BMP, TIFF, GIF, ICO, and SVG. 100% local in-memory processing with compression control, scaling, and optical inspection before downloading.',
      ctaPrimary: 'Go to Image Converter',
      ctaSecondary: 'Explore all 10 formats',
      heroMetaSlots: 'Capacity: 10 slots per batch',
      heroMetaDownload: 'Single or ZIP download',
      capKicker: 'Image processing architecture',
      capTitle: 'Engineered for design teams, web developers, and digital photography.',
      cap1Title: '01. Local transcoding with zero external server uploads',
      cap1Desc:
        'Your product photos, confidential documents, and UI assets are decoded and re-encoded entirely inside your browser memory using binary buffers and Canvas 2D hardware acceleration. Not a single byte leaves your device.',
      cap1Meta1: 'Network latency: 0 ms',
      cap1Meta2: 'Simultaneous limit: 10 files per queue',
      cap1Meta3: 'Individual or ZIP archive export',
      cap2Title: '02. Per-file independent format control',
      cap2Desc:
        'Load up to 10 images at once and assign a global target format with one click, or set different outputs for each file (for instance, exporting a logo to ICO and SVG while converting photos to WEBP).',
      cap2Meta: 'Hybrid global / per-item assignment',
      cap3Title: '03. Optical split-curtain inspection',
      cap3Desc:
        'Verify visual fidelity before downloading. Slide the interactive split curtain across the canvas to compare sharpness, compression artifacts, and alpha transparency between original and converted files.',
      cap3Meta: '1:1 split curtain and side-by-side view',
      cap4Title: '04. Dedicated binary encoders for technical formats',
      cap4Desc:
        'Beyond modern web standards (PNG, JPG, JPEG, WEBP, and AVIF), Prisma Studio integrates direct binary packagers for Windows Bitmaps (24-bit BMP), prepress (Baseline TIFF 6.0), LZW indexed palettes (GIF89a), and desktop icons (ICO up to 256×256 px).',
      cap4Meta1: 'Standard binary headers',
      cap4Meta2: 'Configurable alpha channel matte',
      cap4Meta3: '25% to 200% resolution scaling',
      perfKicker: 'Measurable production benchmarks',
      perfTitle: 'Direct impact on web load times and editorial workflows.',
      perf1Stat: '-64.8% in bytes',
      perf1Sub: 'Migrating PNG/JPEG catalogs to WEBP (86% Quality)',
      perf1Desc:
        'In tests across batches of 10 high-resolution product photos (1400 × 1050 px), converting to WEBP reduced average batch size from 8.4 MB to 2.96 MB while preserving crisp edges and color fidelity.',
      perf1Foot: 'Case study: Online furniture store optimization',
      perf2Stat: '38 ms / image',
      perf2Sub: 'Average encoding time per file in a 10-image batch',
      perf2Desc:
        'By eliminating cloud queues and HTTP uploads, a full batch of 10 images is processed and packaged into a downloadable ZIP archive in under 0.45 seconds on modern desktop browsers.',
      perf2Foot: 'Measured on 1.5 MP assets on local client hardware',
      perf3Stat: '10 formats',
      perf3Sub: 'Cross-format compatibility from a single studio workspace',
      perf3Desc:
        'Eliminates switching between desktop utilities to generate .ico favicons, .tiff print masters, and .webp or .avif assets for web deployment.',
      perf3Foot: 'Unified workflow for product design and frontend engineering',
      fmtKicker: 'Technical encoding specifications',
      fmtTitle: 'Supported format catalog and usage profiles.',
      categories: {
        all: 'All',
        web: 'Web & Standard',
        editing: 'Editing & Archive',
        vector: 'Icons & Vector'
      },
      alphaSupported: 'Supports alpha channel',
      opaqueBg: 'Opaque background',
      adjustableCompression: 'Adjustable compression',
      lossless: 'Lossless',
      convertToFormat: (label) => `Convert to ${label}`,
      finalCtaKicker: 'Instant processing · 10 slots per batch · No sign-up required',
      finalCtaTitle: 'Start converting and optimizing your images right now.',
      finalCtaDesc:
        'Open the Conversion Studio to drag and drop up to 10 files simultaneously, fine-tune quality or resolution, compare results with the optical curtain, and download your batch in one click.',
      finalCtaButton: 'Launch Image Converter',
      finalCtaMeta1: '100% Private in your browser'
    },
    converter: {
      backToHome: 'Back to main page',
      pageTitle: 'Multi-Format Conversion Studio',
      pageSubtitle:
        'Load up to 10 images simultaneously and convert them across PNG, JPG, JPEG, WEBP, AVIF, BMP, TIFF, GIF, ICO, and SVG.',
      addImagesBtn: (current, max) => `Add images (${current}/${max})`,
      slotsOccupied: 'slots occupied',
      inputTotal: 'Input',
      loadingSamples: 'Generating samples...',
      loadSamplesBtn: 'Load 3 sample images',
      opticalParamsBtn: (q, s) => `Optical parameters (${q}% · ${s}%)`,
      globalFormatLabel: 'Global output format:',
      globalFormatSub: 'Apply to entire batch or customize per file',
      qualityLabel: 'Encoding quality',
      qualityHelp: 'Active for WEBP, JPG, JPEG, AVIF, and SVG. PNG, BMP, and TIFF are lossless.',
      scaleLabel: 'Resolution scale',
      scaleHelp: 'Proportionally resizes output width and height in pixels.',
      geometryLabel: 'Geometry & optical filter',
      rotateTitle: 'Rotate 90 degrees',
      flipHTitle: 'Flip horizontally',
      flipVTitle: 'Flip vertically',
      filterOriginal: 'Original color',
      filterGrayscale: 'Black & white',
      filterSepia: 'Editorial sepia',
      filterContrast: 'High contrast',
      filterInvert: 'Invert channels',
      geometryHelp: 'Transformations applied prior to encoding the final file.',
      alphaIcoLabel: 'Alpha matte & ICO size',
      bgObsidian: 'Obsidian',
      bgWhite: 'White',
      bgViolet: 'Violet',
      alphaIcoHelp: 'Background fill used when converting transparency to JPG, BMP, or TIFF.',
      dismissNotice: 'Got it',
      invalidFileNotice:
        'Please select valid image files (PNG, JPG, JPEG, WEBP, AVIF, BMP, GIF, ICO, TIFF, or SVG).',
      maxLimitReachedNotice: (max) =>
        `The maximum limit is ${max} simultaneous images. Remove an image from the queue to add new ones.`,
      partialLoadNotice: (loaded, max) =>
        `Loaded ${loaded} images up to the maximum limit of ${max} files per batch.`,
      corruptFileNotice: (name) =>
        `Could not decode image "${name}". Please verify the file is not corrupted.`,
      alreadyFullSamplesNotice: (max) =>
        `You already have ${max} images loaded. Clear the queue or remove a file to load samples.`,
      dropzoneEmptyTitle: 'Drag & drop your images here or click to browse',
      dropzoneEmptySub: (max) =>
        `Supports up to ${max} simultaneous images · PNG · JPG · JPEG · WEBP · AVIF · BMP · TIFF · GIF · ICO · SVG`,
      dropzoneEmptyBtn: (max) => `Select files (max ${max})`,
      dropzoneAddMore: (rem) =>
        `Add more images to current batch (${rem} ${
          rem === 1 ? 'slot available' : 'slots available'
        })`,
      dropzoneUploadLink: '+ Upload file',
      convertToLabel: 'Convert to:',
      readyToExport: (label) => `Ready to export to ${label}`,
      encodingStatus: (label) => `Encoding ${label}...`,
      errorStatus: 'Format error',
      compareBtn: 'Compare',
      compareTitle: 'Compare original and result',
      downloadBtn: 'Download',
      convertSingleBtn: 'Convert',
      removeTitle: 'Remove from queue',
      clearQueueBtn: (count) => `Clear all ${count} images`,
      totalOutput: 'Total output',
      downloadZipBtn: (count) => `Download batch as ZIP (${count})`,
      processingBatch: 'Processing batch...',
      convertBatchBtn: (count) =>
        `Convert ${count === 1 ? 'image' : `all ${count} images`}`
    },
    modal: {
      title: (name) => `Optical inspection: ${name}`,
      originalLabel: 'Original',
      outputLabel: 'Output',
      weightDelta: 'in size',
      splitModeBtn: 'Interactive curtain',
      sideBySideBtn: 'Side by side',
      closeAria: 'Close inspector',
      originalCorner: 'Original',
      convertedCorner: 'Converted',
      sliderAria: 'Comparison curtain position',
      originalFileHeader: 'Original file',
      resultHeader: (label) => `${label} result`,
      encodingTime: 'Encoding time',
      closeBtn: 'Close view',
      downloadFileBtn: (name) => `Download ${name}`
    },
    formatSpecs: {
      webp: {
        categoryKey: 'web',
        categoryLabel: 'Web & Standard',
        description: 'Advanced perceptual compression with alpha channel and lower web payload.'
      },
      png: {
        categoryKey: 'web',
        categoryLabel: 'Web & Standard',
        description: 'Lossless compression with full 32-bit RGBA transparency support.'
      },
      jpg: {
        categoryKey: 'web',
        categoryLabel: 'Web & Standard',
        description: 'Universal photographic standard with adjustable compression control.'
      },
      jpeg: {
        categoryKey: 'web',
        categoryLabel: 'Web & Standard',
        description: 'Joint Photographic Experts Group encoding with explicit .jpeg extension.'
      },
      avif: {
        categoryKey: 'web',
        categoryLabel: 'Web & Standard',
        description: 'Next-generation AV1-based image format for maximum byte reduction.'
      },
      bmp: {
        categoryKey: 'editing',
        categoryLabel: 'Editing & Archive',
        description: 'Uncompressed 24-bit binary Windows Bitmap for direct pixel reading.'
      },
      tiff: {
        categoryKey: 'editing',
        categoryLabel: 'Editing & Archive',
        description: 'Lossless Baseline Tagged Image File format for archiving and prepress.'
      },
      gif: {
        categoryKey: 'vector',
        categoryLabel: 'Icons & Vector',
        description: 'GIF89a encoding with 256-color indexed palette quantization and LZW.'
      },
      ico: {
        categoryKey: 'vector',
        categoryLabel: 'Icons & Vector',
        description: 'Binary icon container for web browsers and desktop operating systems.'
      },
      svg: {
        categoryKey: 'vector',
        categoryLabel: 'Icons & Vector',
        description: 'Scalable Vector Graphics document with encapsulated high-precision canvas.'
      }
    }
  },
  pt: {
    nav: {
      home: 'Início',
      capabilities: 'Capacidades',
      performance: 'Desempenho',
      formats: 'Formatos',
      openConverter: 'Abrir Conversor',
      backHome: 'Voltar ao Início',
      langLabel: 'Idioma'
    },
    footer: {
      tagline: 'Conversão local de imagens (máx. 10 arquivos por lote)'
    },
    landing: {
      heroKicker: 'Motor de transcodificação óptica · Até 10 imagens simultâneas · 10 formatos',
      heroTitle: 'Conversão multiformato de imagens em velocidade de estúdio.',
      heroSubtitle:
        'Transforme lotes de até 10 arquivos simultaneamente entre PNG, JPG, JPEG, WEBP, AVIF, BMP, TIFF, GIF, ICO e SVG. Processamento 100% local em memória com controle de compressão, redimensionamento e inspeção óptica antes de baixar.',
      ctaPrimary: 'Ir para o Conversor de Imagens',
      ctaSecondary: 'Explorar os 10 formatos',
      heroMetaSlots: 'Capacidade: 10 espaços por lote',
      heroMetaDownload: 'Download individual ou ZIP',
      capKicker: 'Arquitetura de processamento de imagem',
      capTitle: 'Projetado para equipes de design, desenvolvimento web e fotografia digital.',
      cap1Title: '01. Transcodificação local sem envio para servidores externos',
      cap1Desc:
        'Suas fotografias de produtos, documentos confidenciais e ativos de interface são decodificados e recodificados integralmente na memória do seu navegador via buffers binários e aceleração por hardware Canvas 2D. Nenhum byte sai do seu dispositivo.',
      cap1Meta1: 'Latência de rede: 0 ms',
      cap1Meta2: 'Limite simultâneo: 10 arquivos por fila',
      cap1Meta3: 'Exportação individual ou pacote ZIP',
      cap2Title: '02. Controle independente por arquivo',
      cap2Desc:
        'Carregue até 10 imagens de uma vez e atribua um formato global com um clique, ou defina saídas diferentes para cada arquivo (por exemplo, exportar um logotipo para ICO e SVG enquanto converte fotos para WEBP).',
      cap2Meta: 'Atribuição híbrida global / individual',
      cap3Title: '03. Inspeção com cortina óptica',
      cap3Desc:
        'Verifique a fidelidade visual antes de baixar. Deslize a cortina interativa sobre a tela para comparar nitidez, artefatos de compressão e transparência entre o arquivo original e o convertido.',
      cap3Meta: 'Vista dividida 1:1 e lado a lado',
      cap4Title: '04. Codificadores binários dedicados para formatos técnicos',
      cap4Desc:
        'Além dos padrões web (PNG, JPG, JPEG, WEBP e AVIF), o Prisma Studio integra empacotadores binários diretos para bitmaps Windows (BMP de 24 bits), pré-impressão (Baseline TIFF 6.0), paletas indexadas LZW (GIF89a) e ícones de aplicação (ICO de até 256×256 pixels).',
      cap4Meta1: 'Cabeçalhos binários padrão',
      cap4Meta2: 'Preenchimento de canal alfa configurável',
      cap4Meta3: 'Redimensionamento de 25% a 200%',
      perfKicker: 'Resultados mensuráveis em produção',
      perfTitle: 'Impacto direto no tempo de carregamento web e fluxos editoriais.',
      perf1Stat: '-64.8% em bytes',
      perf1Sub: 'Migração de catálogos PNG/JPEG para WEBP (Qualidade 86%)',
      perf1Desc:
        'Em testes com lotes de 10 fotografias de produtos em alta resolução (1400 × 1050 px), a conversão para WEBP reduziu o peso médio do lote de 8.4 MB para 2.96 MB mantendo bordas nítidas e perfil de cor.',
      perf1Foot: 'Estudo de caso: Otimização de loja online de mobiliário',
      perf2Stat: '38 ms / imagem',
      perf2Sub: 'Tempo médio de codificação por arquivo em lote de 10',
      perf2Desc:
        'Ao eliminar filas na nuvem e uploads HTTP, um lote completo de 10 imagens é processado e empacotado em um arquivo ZIP baixável em menos de 0.45 segundos em navegadores modernos.',
      perf2Foot: 'Medição realizada em arquivos de 1.5 MP no cliente local',
      perf3Stat: '10 formatos',
      perf3Sub: 'Compatibilidade cruzada a partir de um único painel operacional',
      perf3Desc:
        'Elimina a necessidade de alternar entre utilitários de desktop para gerar favicons .ico, arquivos .tiff para gráfica e versões .webp ou .avif para aplicações web.',
      perf3Foot: 'Fluxo unificado para design de produto e engenharia frontend',
      fmtKicker: 'Especificações técnicas de codificação',
      fmtTitle: 'Catálogo de formatos suportados e perfis de uso.',
      categories: {
        all: 'Todos',
        web: 'Web & Padrão',
        editing: 'Edição & Arquivo',
        vector: 'Iconografia & Vetor'
      },
      alphaSupported: 'Suporta canal alfa',
      opaqueBg: 'Fundo opaco',
      adjustableCompression: 'Compressão ajustável',
      lossless: 'Sem perdas',
      convertToFormat: (label) => `Converter para ${label}`,
      finalCtaKicker: 'Processamento instantâneo · 10 espaços por lote · Sem cadastro',
      finalCtaTitle: 'Comece a converter e otimizar suas imagens agora mesmo.',
      finalCtaDesc:
        'Acesse o Estúdio de Conversão para arrastar até 10 arquivos simultaneamente, ajustar qualidade ou resolução, comparar resultados com a cortina óptica e baixar seu lote em um clique.',
      finalCtaButton: 'Entrar no Conversor de Imagens',
      finalCtaMeta1: '100% Privado no seu navegador'
    },
    converter: {
      backToHome: 'Voltar para a página principal',
      pageTitle: 'Estúdio de Conversão Multiformato',
      pageSubtitle:
        'Carregue até 10 imagens simultaneamente e converta entre PNG, JPG, JPEG, WEBP, AVIF, BMP, TIFF, GIF, ICO e SVG.',
      addImagesBtn: (current, max) => `Adicionar imagens (${current}/${max})`,
      slotsOccupied: 'espaços ocupados',
      inputTotal: 'Entrada',
      loadingSamples: 'Gerando amostras...',
      loadSamplesBtn: 'Carregar 3 imagens de teste',
      opticalParamsBtn: (q, s) => `Parâmetros ópticos (${q}% · ${s}%)`,
      globalFormatLabel: 'Formato de saída global:',
      globalFormatSub: 'Aplicar a todo o lote ou personalizar por arquivo',
      qualityLabel: 'Qualidade de codificação',
      qualityHelp: 'Ativo em WEBP, JPG, JPEG, AVIF e SVG. PNG, BMP e TIFF são sem perdas.',
      scaleLabel: 'Escala de resolução',
      scaleHelp: 'Redimensiona proporcionalmente a largura e altura em pixels.',
      geometryLabel: 'Geometria e filtro óptico',
      rotateTitle: 'Girar 90 graus',
      flipHTitle: 'Inverter horizontalmente',
      flipVTitle: 'Inverter verticalmente',
      filterOriginal: 'Cor original',
      filterGrayscale: 'Preto e branco',
      filterSepia: 'Sépia editorial',
      filterContrast: 'Alto contraste',
      filterInvert: 'Inverter canais',
      geometryHelp: 'Transformações aplicadas antes de codificar o arquivo final.',
      alphaIcoLabel: 'Fundo sem alfa e tamanho ICO',
      bgObsidian: 'Obsidiana',
      bgWhite: 'Branco',
      bgViolet: 'Violeta',
      alphaIcoHelp: 'Preenchimento usado ao converter transparências para JPG, BMP ou TIFF.',
      dismissNotice: 'Entendi',
      invalidFileNotice:
        'Selecione arquivos de imagem válidos (PNG, JPG, JPEG, WEBP, AVIF, BMP, GIF, ICO, TIFF ou SVG).',
      maxLimitReachedNotice: (max) =>
        `O limite máximo é de ${max} imagens simultâneas. Remova alguma imagem da fila para adicionar novas.`,
      partialLoadNotice: (loaded, max) =>
        `Foram carregadas ${loaded} imagens até completar o limite máximo de ${max} arquivos por lote.`,
      corruptFileNotice: (name) =>
        `Não foi possível ler a imagem "${name}". Verifique se o arquivo não está corrompido.`,
      alreadyFullSamplesNotice: (max) =>
        `Você já tem ${max} imagens carregadas. Esvazie a fila ou remova um arquivo para carregar as amostras.`,
      dropzoneEmptyTitle: 'Arraste suas imagens aqui ou clique para explorar',
      dropzoneEmptySub: (max) =>
        `Suporta até ${max} imagens simultâneas · PNG · JPG · JPEG · WEBP · AVIF · BMP · TIFF · GIF · ICO · SVG`,
      dropzoneEmptyBtn: (max) => `Selecionar arquivos (máx. ${max})`,
      dropzoneAddMore: (rem) =>
        `Adicionar mais imagens ao lote atual (${rem} ${
          rem === 1 ? 'espaço disponível' : 'espaços disponíveis'
        })`,
      dropzoneUploadLink: '+ Enviar arquivo',
      convertToLabel: 'Converter para:',
      readyToExport: (label) => `Pronto para exportar para ${label}`,
      encodingStatus: (label) => `Codificando ${label}...`,
      errorStatus: 'Erro de formato',
      compareBtn: 'Comparar',
      compareTitle: 'Comparar original e resultado',
      downloadBtn: 'Baixar',
      convertSingleBtn: 'Converter',
      removeTitle: 'Remover da fila',
      clearQueueBtn: (count) => `Esvaziar as ${count} imagens`,
      totalOutput: 'Saída total',
      downloadZipBtn: (count) => `Baixar lote em ZIP (${count})`,
      processingBatch: 'Processando lote...',
      convertBatchBtn: (count) =>
        `Converter ${count === 1 ? 'imagem' : `as ${count} imagens`}`
    },
    modal: {
      title: (name) => `Inspeção óptica: ${name}`,
      originalLabel: 'Original',
      outputLabel: 'Saída',
      weightDelta: 'no peso',
      splitModeBtn: 'Cortina interativa',
      sideBySideBtn: 'Lado a lado',
      closeAria: 'Fechar inspetor',
      originalCorner: 'Original',
      convertedCorner: 'Convertido',
      sliderAria: 'Posição da cortina comparativa',
      originalFileHeader: 'Arquivo original',
      resultHeader: (label) => `Resultado ${label}`,
      encodingTime: 'Tempo de codificação',
      closeBtn: 'Fechar visualização',
      downloadFileBtn: (name) => `Baixar ${name}`
    },
    formatSpecs: {
      webp: {
        categoryKey: 'web',
        categoryLabel: 'Web & Padrão',
        description: 'Compressão perceptual avançada com canal alfa e menor peso para web.'
      },
      png: {
        categoryKey: 'web',
        categoryLabel: 'Web & Padrão',
        description: 'Compressão sem perdas (lossless) com suporte completo a transparência.'
      },
      jpg: {
        categoryKey: 'web',
        categoryLabel: 'Web & Padrão',
        description: 'Padrão fotográfico universal com controle ajustável de compressão.'
      },
      jpeg: {
        categoryKey: 'web',
        categoryLabel: 'Web & Padrão',
        description: 'Codificação Joint Photographic Experts Group com extensão explícita .jpeg.'
      },
      avif: {
        categoryKey: 'web',
        categoryLabel: 'Web & Padrão',
        description: 'Formato de última geração baseado em AV1 para máxima redução de bytes.'
      },
      bmp: {
        categoryKey: 'editing',
        categoryLabel: 'Edição & Arquivo',
        description: 'Mapa de bits binário de 24 bits sem compressão para leitura direta.'
      },
      tiff: {
        categoryKey: 'editing',
        categoryLabel: 'Edição & Arquivo',
        description: 'Formato Tagged Image File sem perdas para arquivamento e pré-impressão.'
      },
      gif: {
        categoryKey: 'vector',
        categoryLabel: 'Iconografia & Vetor',
        description: 'Codificação GIF89a com quantização de paleta indexada de 256 cores.'
      },
      ico: {
        categoryKey: 'vector',
        categoryLabel: 'Iconografia & Vetor',
        description: 'Contêiner binário de ícone para navegadores e sistemas desktop.'
      },
      svg: {
        categoryKey: 'vector',
        categoryLabel: 'Iconografia & Vetor',
        description: 'Documento Scalable Vector Graphics com traçado ou tela encapsulada.'
      }
    }
  }
};
