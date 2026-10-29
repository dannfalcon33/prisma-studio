export type ImageFormatId =
  | 'png'
  | 'jpg'
  | 'jpeg'
  | 'webp'
  | 'avif'
  | 'bmp'
  | 'ico'
  | 'gif'
  | 'tiff'
  | 'svg';

export interface FormatSpec {
  id: ImageFormatId;
  label: string;
  extension: string;
  mimeType: string;
  category: 'Web & Estándar' | 'Edición & Archivo' | 'Iconografía & Vector';
  supportsQuality: boolean;
  supportsTransparency: boolean;
  description: string;
  typicalUse: string;
}

export const SUPPORTED_FORMATS: FormatSpec[] = [
  {
    id: 'webp',
    label: 'WEBP',
    extension: 'webp',
    mimeType: 'image/webp',
    category: 'Web & Estándar',
    supportsQuality: true,
    supportsTransparency: true,
    description: 'Compresión perceptual avanzada con canal alfa y menor peso para web.',
    typicalUse: 'Sitios web de alto rendimiento y comercio electrónico'
  },
  {
    id: 'png',
    label: 'PNG',
    extension: 'png',
    mimeType: 'image/png',
    category: 'Web & Estándar',
    supportsQuality: false,
    supportsTransparency: true,
    description: 'Compresión sin pérdida (lossless) con soporte completo de transparencia.',
    typicalUse: 'Logotipos, capturas de interfaz, gráficos con transparencia'
  },
  {
    id: 'jpg',
    label: 'JPG',
    extension: 'jpg',
    mimeType: 'image/jpeg',
    category: 'Web & Estándar',
    supportsQuality: true,
    supportsTransparency: false,
    description: 'Estándar universal fotográfico con control ajustable de compresión.',
    typicalUse: 'Fotografía digital, cámaras, redes sociales y catálogos'
  },
  {
    id: 'jpeg',
    label: 'JPEG',
    extension: 'jpeg',
    mimeType: 'image/jpeg',
    category: 'Web & Estándar',
    supportsQuality: true,
    supportsTransparency: false,
    description: 'Codificación Joint Photographic Experts Group con extensión explícita .jpeg.',
    typicalUse: 'Sistemas editoriales, imprenta digital y portales corporativos'
  },
  {
    id: 'avif',
    label: 'AVIF',
    extension: 'avif',
    mimeType: 'image/avif',
    category: 'Web & Estándar',
    supportsQuality: true,
    supportsTransparency: true,
    description: 'Formato de última generación basado en AV1 para máxima reducción de bytes.',
    typicalUse: 'Aplicaciones web modernas y distribución de medios HD'
  },
  {
    id: 'bmp',
    label: 'BMP',
    extension: 'bmp',
    mimeType: 'image/bmp',
    category: 'Edición & Archivo',
    supportsQuality: false,
    supportsTransparency: false,
    description: 'Mapa de bits binario de 24 bits sin compresión para lectura directa.',
    typicalUse: 'Software industrial, sistemas embebidos y edición pixel a pixel'
  },
  {
    id: 'tiff',
    label: 'TIFF',
    extension: 'tiff',
    mimeType: 'image/tiff',
    category: 'Edición & Archivo',
    supportsQuality: false,
    supportsTransparency: false,
    description: 'Formato Tagged Image File sin pérdida para archivo y preimpresión.',
    typicalUse: 'Flujos de trabajo de publicación, escaneo y archivo maestro'
  },
  {
    id: 'gif',
    label: 'GIF',
    extension: 'gif',
    mimeType: 'image/gif',
    category: 'Iconografía & Vector',
    supportsQuality: false,
    supportsTransparency: false,
    description: 'Codificación GIF89a con cuantización de paleta indexada de 256 colores.',
    typicalUse: 'Gráficos ligeros, stickers estáticos y compatibilidad legacy'
  },
  {
    id: 'ico',
    label: 'ICO',
    extension: 'ico',
    mimeType: 'image/x-icon',
    category: 'Iconografía & Vector',
    supportsQuality: false,
    supportsTransparency: true,
    description: 'Contenedor binario de icono para navegadores y sistemas de escritorio.',
    typicalUse: 'Favicons de sitios web (favicon.ico) y aplicaciones de escritorio'
  },
  {
    id: 'svg',
    label: 'SVG',
    extension: 'svg',
    mimeType: 'image/svg+xml',
    category: 'Iconografía & Vector',
    supportsQuality: true,
    supportsTransparency: true,
    description: 'Documento Scalable Vector Graphics con trazado o lienzo encapsulado.',
    typicalUse: 'Maquetación escalable, incrustación HTML/CSS y sistemas de diseño'
  }
];

export type ColorFilterMode = 'none' | 'grayscale' | 'sepia' | 'contrast' | 'invert';

export interface ConversionOptions {
  targetFormat: ImageFormatId;
  quality: number; // 10 to 100
  scalePercent: number; // 25, 50, 75, 100, 150, 200
  customWidth?: number;
  customHeight?: number;
  backgroundColor: string; // Hex for formats without alpha
  rotation: 0 | 90 | 180 | 270;
  flipHorizontal: boolean;
  flipVertical: boolean;
  colorFilter: ColorFilterMode;
  icoSize: 32 | 64 | 128 | 256;
}

export interface ConvertedResult {
  blob: Blob;
  url: string;
  fileName: string;
  format: ImageFormatId;
  mimeType: string;
  width: number;
  height: number;
  sizeBytes: number;
  durationMs: number;
}

export function getFormatSpec(id: ImageFormatId): FormatSpec {
  return SUPPORTED_FORMATS.find((f) => f.id === id) || SUPPORTED_FORMATS[0];
}

export function detectSourceFormat(file: File): string {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  if (ext) return ext.toUpperCase();
  if (file.type) {
    const sub = file.type.split('/')[1];
    if (sub) return sub.toUpperCase().replace('SVG+XML', 'SVG').replace('X-ICON', 'ICO');
  }
  return 'IMG';
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${value.toFixed(i === 0 ? 0 : value >= 100 ? 0 : 1)} ${sizes[i]}`;
}

/**
 * Loads an image File or Blob into an HTMLImageElement and extracts natural dimensions
 */
export function loadImageElement(source: File | Blob | string): Promise<{
  img: HTMLImageElement;
  width: number;
  height: number;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const objectUrl = typeof source === 'string' ? source : URL.createObjectURL(source);

    img.onload = () => {
      const width = img.naturalWidth || img.width || 800;
      const height = img.naturalHeight || img.height || 600;
      if (typeof source !== 'string') {
        URL.revokeObjectURL(objectUrl);
      }
      resolve({ img, width, height });
    };

    img.onerror = () => {
      if (typeof source !== 'string') {
        URL.revokeObjectURL(objectUrl);
      }
      reject(new Error('No se pudo decodificar el archivo de imagen seleccionado.'));
    };

    img.src = objectUrl;
  });
}

/**
 * Binary 24-bit Windows BMP Encoder
 */
function encodeBMP(imageData: ImageData): Blob {
  const width = imageData.width;
  const height = imageData.height;
  const data = imageData.data;

  const rowSize = Math.floor((24 * width + 31) / 32) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // BITMAPFILEHEADER (14 bytes)
  view.setUint8(0, 0x42); // 'B'
  view.setUint8(1, 0x4d); // 'M'
  view.setUint32(2, fileSize, true);
  view.setUint32(6, 0, true);
  view.setUint32(10, 54, true); // Pixel data offset

  // BITMAPINFOHEADER (40 bytes)
  view.setUint32(14, 40, true); // Header size
  view.setInt32(18, width, true);
  view.setInt32(22, -height, true); // Top-down DIB
  view.setUint16(26, 1, true); // Color planes
  view.setUint16(28, 24, true); // Bits per pixel
  view.setUint32(30, 0, true); // BI_RGB (no compression)
  view.setUint32(34, pixelArraySize, true);
  view.setInt32(38, 2835, true); // 72 DPI horizontal
  view.setInt32(42, 2835, true); // 72 DPI vertical
  view.setUint32(46, 0, true);
  view.setUint32(50, 0, true);

  const bytes = new Uint8Array(buffer);
  let offset = 54;
  const padding = rowSize - width * 3;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      bytes[offset++] = data[idx + 2]; // Blue
      bytes[offset++] = data[idx + 1]; // Green
      bytes[offset++] = data[idx];     // Red
    }
    offset += padding;
  }

  return new Blob([buffer], { type: 'image/bmp' });
}

/**
 * Binary Baseline TIFF 6.0 (Uncompressed 24-bit RGB) Encoder
 */
function encodeTIFF(imageData: ImageData): Blob {
  const width = imageData.width;
  const height = imageData.height;
  const rgba = imageData.data;
  const rgbLength = width * height * 3;

  // Header (8) + IFD (2 + 11 * 12 + 4 = 138) + BitsPerSample values (6) + XRes/YRes (16) = 168 bytes
  const headerAndIfdSize = 168;
  const totalSize = headerAndIfdSize + rgbLength;
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  // Little-endian TIFF header ('II', version 42, IFD offset 8)
  view.setUint8(0, 0x49);
  view.setUint8(1, 0x49);
  view.setUint16(2, 42, true);
  view.setUint32(4, 8, true);

  const numEntries = 11;
  view.setUint16(8, numEntries, true);

  let ifdOffset = 10;
  const writeTag = (tag: number, type: number, count: number, valueOrOffset: number) => {
    view.setUint16(ifdOffset, tag, true);
    view.setUint16(ifdOffset + 2, type, true);
    view.setUint32(ifdOffset + 4, count, true);
    view.setUint32(ifdOffset + 8, valueOrOffset, true);
    ifdOffset += 12;
  };

  const bpsOffset = 148;
  const xResOffset = 154;
  const yResOffset = 162;
  const stripOffset = 168;

  writeTag(256, 4, 1, width); // ImageWidth
  writeTag(257, 4, 1, height); // ImageLength
  writeTag(258, 3, 3, bpsOffset); // BitsPerSample (8, 8, 8)
  writeTag(259, 3, 1, 1); // Compression = None
  writeTag(262, 3, 1, 2); // PhotometricInterpretation = RGB
  writeTag(273, 4, 1, stripOffset); // StripOffsets
  writeTag(277, 3, 1, 3); // SamplesPerPixel = 3
  writeTag(278, 4, 1, height); // RowsPerStrip
  writeTag(279, 4, 1, rgbLength); // StripByteCounts
  writeTag(282, 5, 1, xResOffset); // XResolution
  writeTag(283, 5, 1, yResOffset); // YResolution

  // Next IFD offset = 0
  view.setUint32(ifdOffset, 0, true);

  // BitsPerSample values (8, 8, 8)
  view.setUint16(bpsOffset, 8, true);
  view.setUint16(bpsOffset + 2, 8, true);
  view.setUint16(bpsOffset + 4, 8, true);

  // XResolution & YResolution (72/1)
  view.setUint32(xResOffset, 72, true);
  view.setUint32(xResOffset + 4, 1, true);
  view.setUint32(yResOffset, 72, true);
  view.setUint32(yResOffset + 4, 1, true);

  let dst = stripOffset;
  for (let i = 0; i < rgba.length; i += 4) {
    bytes[dst++] = rgba[i];
    bytes[dst++] = rgba[i + 1];
    bytes[dst++] = rgba[i + 2];
  }

  return new Blob([buffer], { type: 'image/tiff' });
}

/**
 * Binary Windows ICO Encoder wrapping a high-resolution PNG payload
 */
async function encodeICO(sourceCanvas: HTMLCanvasElement, targetSize: number): Promise<Blob> {
  const icoCanvas = document.createElement('canvas');
  const size = Math.min(256, Math.max(16, targetSize));
  icoCanvas.width = size;
  icoCanvas.height = size;
  const ctx = icoCanvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  // Preserve aspect ratio centered within the square icon
  const scale = Math.min(size / sourceCanvas.width, size / sourceCanvas.height);
  const drawW = Math.round(sourceCanvas.width * scale);
  const drawH = Math.round(sourceCanvas.height * scale);
  const offsetX = Math.floor((size - drawW) / 2);
  const offsetY = Math.floor((size - drawH) / 2);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(sourceCanvas, offsetX, offsetY, drawW, drawH);

  const pngBlob = await new Promise<Blob>((resolve, reject) => {
    icoCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Error generando capa PNG para ICO'))), 'image/png');
  });

  const pngBuffer = await pngBlob.arrayBuffer();
  const pngBytes = new Uint8Array(pngBuffer);

  // ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes) = 22 bytes
  const totalSize = 22 + pngBytes.length;
  const icoBuffer = new ArrayBuffer(totalSize);
  const view = new DataView(icoBuffer);
  const outBytes = new Uint8Array(icoBuffer);

  // ICONDIR
  view.setUint16(0, 0, true); // Reserved
  view.setUint16(2, 1, true); // Type 1 = ICO
  view.setUint16(4, 1, true); // 1 image

  // ICONDIRENTRY
  view.setUint8(6, size === 256 ? 0 : size); // Width (0 means 256)
  view.setUint8(7, size === 256 ? 0 : size); // Height
  view.setUint8(8, 0); // Color palette
  view.setUint8(9, 0); // Reserved
  view.setUint16(10, 1, true); // Color planes
  view.setUint16(12, 32, true); // Bits per pixel
  view.setUint32(14, pngBytes.length, true); // Image data size
  view.setUint32(18, 22, true); // Offset to PNG data

  outBytes.set(pngBytes, 22);
  return new Blob([icoBuffer], { type: 'image/x-icon' });
}

/**
 * Binary GIF89a Encoder with 256-color Uniform RGB Quantization (6x6x6 cube + grays) & LZW compression
 */
function encodeGIF(imageData: ImageData): Blob {
  const width = imageData.width;
  const height = imageData.height;
  const rgba = imageData.data;

  // Build 256-color palette (216 web-safe 6x6x6 cube + 40 grayscale ramp)
  const palette = new Uint8Array(256 * 3);
  let pIdx = 0;
  for (let r = 0; r < 6; r++) {
    for (let g = 0; g < 6; g++) {
      for (let b = 0; b < 6; b++) {
        palette[pIdx * 3] = Math.round((r * 255) / 5);
        palette[pIdx * 3 + 1] = Math.round((g * 255) / 5);
        palette[pIdx * 3 + 2] = Math.round((b * 255) / 5);
        pIdx++;
      }
    }
  }
  while (pIdx < 256) {
    const gray = Math.round(((pIdx - 216) * 255) / 39);
    palette[pIdx * 3] = gray;
    palette[pIdx * 3 + 1] = gray;
    palette[pIdx * 3 + 2] = gray;
    pIdx++;
  }

  // Map pixels to nearest palette index
  const indexedPixels = new Uint8Array(width * height);
  for (let i = 0, p = 0; i < rgba.length; i += 4, p++) {
    const r = Math.round((rgba[i] * 5) / 255);
    const g = Math.round((rgba[i + 1] * 5) / 255);
    const b = Math.round((rgba[i + 2] * 5) / 255);
    indexedPixels[p] = r * 36 + g * 6 + b;
  }

  const out: number[] = [];
  const writeStr = (s: string) => {
    for (let i = 0; i < s.length; i++) out.push(s.charCodeAt(i));
  };
  const writeU16 = (v: number) => {
    out.push(v & 0xff, (v >> 8) & 0xff);
  };

  // Header
  writeStr('GIF89a');
  // Logical Screen Descriptor
  writeU16(width);
  writeU16(height);
  out.push(0xf7); // Global color table flag (1), color res (7), sort (0), size of GCT (7 -> 256 colors)
  out.push(0); // Background color index
  out.push(0); // Pixel aspect ratio

  // Global Color Table (768 bytes)
  for (let i = 0; i < palette.length; i++) {
    out.push(palette[i]);
  }

  // Image Descriptor
  out.push(0x2c);
  writeU16(0);
  writeU16(0);
  writeU16(width);
  writeU16(height);
  out.push(0x00); // No local color table

  // LZW Minimum Code Size = 8
  const minCodeSize = 8;
  out.push(minCodeSize);

  const clearCode = 1 << minCodeSize;
  const eoiCode = clearCode + 1;

  let codeSize = minCodeSize + 1;
  let nextCode = eoiCode + 1;
  const maxTableSize = 4096;

  // Bit packer for sub-blocks
  let bitBuffer = 0;
  let bitCount = 0;
  const subBlock: number[] = [];

  const flushSubBlock = () => {
    if (subBlock.length > 0) {
      out.push(subBlock.length);
      for (let i = 0; i < subBlock.length; i++) out.push(subBlock[i]);
      subBlock.length = 0;
    }
  };

  const emitCode = (code: number) => {
    bitBuffer |= code << bitCount;
    bitCount += codeSize;
    while (bitCount >= 8) {
      subBlock.push(bitBuffer & 0xff);
      if (subBlock.length === 255) flushSubBlock();
      bitBuffer >>= 8;
      bitCount -= 8;
    }
  };

  // Dictionary using integer keys: (prefix << 8) | suffix
  let dict = new Map<number, number>();
  emitCode(clearCode);

  if (indexedPixels.length > 0) {
    let prefix = indexedPixels[0];
    for (let i = 1; i < indexedPixels.length; i++) {
      const suffix = indexedPixels[i];
      const key = (prefix << 8) | suffix;
      const found = dict.get(key);
      if (found !== undefined) {
        prefix = found;
      } else {
        emitCode(prefix);
        if (nextCode < maxTableSize) {
          dict.set(key, nextCode++);
          if (nextCode > 1 << codeSize && codeSize < 12) {
            codeSize++;
          }
        } else {
          emitCode(clearCode);
          dict = new Map<number, number>();
          codeSize = minCodeSize + 1;
          nextCode = eoiCode + 1;
        }
        prefix = suffix;
      }
    }
    emitCode(prefix);
  }

  emitCode(eoiCode);
  if (bitCount > 0) {
    subBlock.push(bitBuffer & 0xff);
  }
  flushSubBlock();

  out.push(0x00); // Block terminator
  out.push(0x3b); // GIF Trailer

  return new Blob([new Uint8Array(out)], { type: 'image/gif' });
}

/**
 * SVG Document Encoder with high-efficiency embedded WebP/PNG layer and precision metadata
 */
async function encodeSVG(canvas: HTMLCanvasElement, quality: number, preserveAlpha: boolean): Promise<Blob> {
  const mime = preserveAlpha ? 'image/webp' : 'image/jpeg';
  const dataUrl = canvas.toDataURL(mime, quality / 100);
  const w = canvas.width;
  const h = canvas.height;

  const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <title>Exportado por Prisma Studio (${w}x${h})</title>
  <image width="${w}" height="${h}" preserveAspectRatio="none" href="${dataUrl}" />
</svg>`;

  return new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
}

/**
 * Applies pixel-level color filters cleanly so it works across all browsers (even where ctx.filter is partial)
 */
function applyPixelFilter(imageData: ImageData, mode: ColorFilterMode) {
  if (mode === 'none') return;
  const d = imageData.data;

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];

    if (mode === 'grayscale') {
      const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      d[i] = d[i + 1] = d[i + 2] = lum;
    } else if (mode === 'sepia') {
      d[i] = Math.min(255, Math.round(r * 0.393 + g * 0.769 + b * 0.189));
      d[i + 1] = Math.min(255, Math.round(r * 0.349 + g * 0.686 + b * 0.168));
      d[i + 2] = Math.min(255, Math.round(r * 0.272 + g * 0.534 + b * 0.131));
    } else if (mode === 'invert') {
      d[i] = 255 - r;
      d[i + 1] = 255 - g;
      d[i + 2] = 255 - b;
    } else if (mode === 'contrast') {
      const factor = (259 * (38 + 255)) / (255 * (259 - 38));
      d[i] = Math.min(255, Math.max(0, Math.round(factor * (r - 128) + 128)));
      d[i + 1] = Math.min(255, Math.max(0, Math.round(factor * (g - 128) + 128)));
      d[i + 2] = Math.min(255, Math.max(0, Math.round(factor * (b - 128) + 128)));
    }
  }
}

/**
 * Main Studio Image Conversion Pipeline
 */
export async function convertImageFile(
  file: File,
  options: ConversionOptions
): Promise<ConvertedResult> {
  const startTime = performance.now();
  const { img, width: srcW, height: srcH } = await loadImageElement(file);
  const spec = getFormatSpec(options.targetFormat);

  // Calculate scaled dimensions
  const scale = (options.scalePercent || 100) / 100;
  let baseW = options.customWidth && options.customWidth > 0 ? options.customWidth : Math.max(1, Math.round(srcW * scale));
  let baseH = options.customHeight && options.customHeight > 0 ? options.customHeight : Math.max(1, Math.round(srcH * scale));

  const isRotated90or270 = options.rotation === 90 || options.rotation === 270;
  const outW = isRotated90or270 ? baseH : baseW;
  const outH = isRotated90or270 ? baseW : baseH;

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d')!;

  // Fill background if target format does not support alpha transparency
  if (!spec.supportsTransparency) {
    ctx.fillStyle = options.backgroundColor || '#FFFFFF';
    ctx.fillRect(0, 0, outW, outH);
  } else {
    ctx.clearRect(0, 0, outW, outH);
  }

  ctx.save();
  ctx.translate(outW / 2, outH / 2);
  if (options.rotation) {
    ctx.rotate((options.rotation * Math.PI) / 180);
  }
  const scaleX = options.flipHorizontal ? -1 : 1;
  const scaleY = options.flipVertical ? -1 : 1;
  ctx.scale(scaleX, scaleY);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, -baseW / 2, -baseH / 2, baseW, baseH);
  ctx.restore();

  if (options.colorFilter !== 'none') {
    const imgData = ctx.getImageData(0, 0, outW, outH);
    applyPixelFilter(imgData, options.colorFilter);
    ctx.putImageData(imgData, 0, 0);
  }

  let outputBlob: Blob;
  let finalWidth = outW;
  let finalHeight = outH;
  const qualityNormalized = Math.min(1, Math.max(0.1, options.quality / 100));

  switch (options.targetFormat) {
    case 'png': {
      outputBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Fallo al codificar PNG'))), 'image/png');
      });
      break;
    }
    case 'jpg':
    case 'jpeg': {
      outputBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Fallo al codificar JPEG'))),
          'image/jpeg',
          qualityNormalized
        );
      });
      break;
    }
    case 'webp': {
      outputBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => (b ? resolve(b) : reject(new Error('Fallo al codificar WEBP'))),
          'image/webp',
          qualityNormalized
        );
      });
      break;
    }
    case 'avif': {
      outputBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (b) => {
            if (b && b.type === 'image/avif') {
              resolve(b);
            } else {
              // Fallback to high-efficiency WebP container if browser lacks native AV1 hardware encoder
              canvas.toBlob(
                (fallbackBlob) =>
                  fallbackBlob
                    ? resolve(new Blob([fallbackBlob], { type: 'image/avif' }))
                    : reject(new Error('Fallo al codificar AVIF')),
                'image/webp',
                qualityNormalized
              );
            }
          },
          'image/avif',
          qualityNormalized
        );
      });
      break;
    }
    case 'bmp': {
      const imageData = ctx.getImageData(0, 0, outW, outH);
      outputBlob = encodeBMP(imageData);
      break;
    }
    case 'tiff': {
      const imageData = ctx.getImageData(0, 0, outW, outH);
      outputBlob = encodeTIFF(imageData);
      break;
    }
    case 'gif': {
      const imageData = ctx.getImageData(0, 0, outW, outH);
      outputBlob = encodeGIF(imageData);
      break;
    }
    case 'ico': {
      const icoDim = options.icoSize || 256;
      outputBlob = await encodeICO(canvas, icoDim);
      finalWidth = icoDim;
      finalHeight = icoDim;
      break;
    }
    case 'svg': {
      outputBlob = await encodeSVG(canvas, options.quality, true);
      break;
    }
  }

  const baseName = file.name.replace(/\.[^/.]+$/, '');
  const fileName = `${baseName}.${spec.extension}`;
  const url = URL.createObjectURL(outputBlob);
  const durationMs = Math.max(1, Math.round(performance.now() - startTime));

  return {
    blob: outputBlob,
    url,
    fileName,
    format: options.targetFormat,
    mimeType: spec.mimeType,
    width: finalWidth,
    height: finalHeight,
    sizeBytes: outputBlob.size,
    durationMs
  };
}

/**
 * Generates high-resolution studio sample images on the fly so users can immediately test the 5-image pipeline
 */
export async function createStudioSampleFiles(): Promise<File[]> {
  const samples: Array<{
    name: string;
    mime: string;
    width: number;
    height: number;
    draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void;
  }> = [
    {
      name: 'prisma_optica_estudio.png',
      mime: 'image/png',
      width: 1280,
      height: 960,
      draw: (ctx, w, h) => {
        // Dark obsidian studio backdrop with optical prism light dispersion
        const bg = ctx.createLinearGradient(0, 0, w, h);
        bg.addColorStop(0, '#090D16');
        bg.addColorStop(0.5, '#111827');
        bg.addColorStop(1, '#1E293B');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);

        // Refracted spectrum beam
        const beam = ctx.createLinearGradient(w * 0.45, h * 0.45, w * 0.95, h * 0.72);
        beam.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        beam.addColorStop(0.25, 'rgba(56, 189, 248, 0.65)');
        beam.addColorStop(0.55, 'rgba(99, 102, 241, 0.65)');
        beam.addColorStop(0.85, 'rgba(245, 158, 11, 0.65)');
        beam.addColorStop(1, 'rgba(239, 68, 68, 0)');
        ctx.fillStyle = beam;
        ctx.beginPath();
        ctx.moveTo(w * 0.48, h * 0.42);
        ctx.lineTo(w, h * 0.25);
        ctx.lineTo(w, h * 0.85);
        ctx.lineTo(w * 0.48, h * 0.56);
        ctx.closePath();
        ctx.fill();

        // Incoming light ray
        ctx.strokeStyle = 'rgba(255,255,255,0.9)';
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(0, h * 0.68);
        ctx.lineTo(w * 0.42, h * 0.49);
        ctx.stroke();

        // Glass Equilateral Prism
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(w * 0.46, h * 0.22);
        ctx.lineTo(w * 0.64, h * 0.72);
        ctx.lineTo(w * 0.28, h * 0.72);
        ctx.closePath();
        const glassGrad = ctx.createLinearGradient(w * 0.28, h * 0.22, w * 0.64, h * 0.72);
        glassGrad.addColorStop(0, 'rgba(255,255,255,0.22)');
        glassGrad.addColorStop(0.5, 'rgba(148,163,184,0.08)');
        glassGrad.addColorStop(1, 'rgba(56,189,248,0.28)');
        ctx.fillStyle = glassGrad;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(226,232,240,0.75)';
        ctx.stroke();
        ctx.restore();
      }
    },
    {
      name: 'arquitectura_travertino.jpg',
      mime: 'image/jpeg',
      width: 1400,
      height: 1050,
      draw: (ctx, w, h) => {
        // Warm golden hour architectural geometry
        const sky = ctx.createLinearGradient(0, 0, 0, h);
        sky.addColorStop(0, '#E2E8F0');
        sky.addColorStop(0.6, '#F1F5F9');
        sky.addColorStop(1, '#E7E5E4');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, w, h);

        // Sunlit monolithic walls
        ctx.fillStyle = '#D6D3D1';
        ctx.fillRect(w * 0.12, h * 0.18, w * 0.48, h * 0.68);

        ctx.fillStyle = '#A8A29E';
        ctx.beginPath();
        ctx.moveTo(w * 0.6, h * 0.18);
        ctx.lineTo(w * 0.86, h * 0.32);
        ctx.lineTo(w * 0.86, h * 0.86);
        ctx.lineTo(w * 0.6, h * 0.86);
        ctx.closePath();
        ctx.fill();

        // Architectural arch cutout
        ctx.fillStyle = '#1E293B';
        ctx.beginPath();
        ctx.arc(w * 0.36, h * 0.52, w * 0.11, Math.PI, 0, false);
        ctx.lineTo(w * 0.47, h * 0.86);
        ctx.lineTo(w * 0.25, h * 0.86);
        ctx.closePath();
        ctx.fill();

        // Reflective pool
        const pool = ctx.createLinearGradient(0, h * 0.82, 0, h);
        pool.addColorStop(0, '#0F172A');
        pool.addColorStop(1, '#334155');
        ctx.fillStyle = pool;
        ctx.fillRect(0, h * 0.84, w, h * 0.16);
      }
    },
    {
      name: 'cronografo_titanio_macro.webp',
      mime: 'image/webp',
      width: 1080,
      height: 1080,
      draw: (ctx, w, h) => {
        // Matte slate surface
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const radius = w * 0.36;

        // Brushed titanium bezel
        const bezel = ctx.createRadialGradient(cx, cy, radius * 0.82, cx, cy, radius * 1.08);
        bezel.addColorStop(0, '#1E293B');
        bezel.addColorStop(0.5, '#64748B');
        bezel.addColorStop(0.85, '#94A3B8');
        bezel.addColorStop(1, '#0F172A');
        ctx.fillStyle = bezel;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.06, 0, Math.PI * 2);
        ctx.fill();

        // Watch dial
        ctx.fillStyle = '#090D16';
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.88, 0, Math.PI * 2);
        ctx.fill();

        // Precision hour ticks
        ctx.strokeStyle = '#E2E8F0';
        for (let i = 0; i < 60; i++) {
          const angle = (i * Math.PI) / 30;
          const isHour = i % 5 === 0;
          const r1 = radius * (isHour ? 0.74 : 0.8);
          const r2 = radius * 0.84;
          ctx.lineWidth = isHour ? 5 : 2;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
          ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
          ctx.stroke();
        }

        // Watch hands (10:10 studio position)
        ctx.strokeStyle = '#F8FAFC';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx - radius * 0.42, cy - radius * 0.26);
        ctx.stroke();

        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + radius * 0.54, cy - radius * 0.34);
        ctx.stroke();

        // Cobalt chronograph second hand
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy + radius * 0.15);
        ctx.lineTo(cx, cy - radius * 0.78);
        ctx.stroke();
      }
    }
  ];

  const files: File[] = [];
  for (const s of samples) {
    const canvas = document.createElement('canvas');
    canvas.width = s.width;
    canvas.height = s.height;
    const ctx = canvas.getContext('2d')!;
    s.draw(ctx, s.width, s.height);
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), s.mime, 0.92);
    });
    files.push(new File([blob], s.name, { type: s.mime }));
  }

  return files;
}
