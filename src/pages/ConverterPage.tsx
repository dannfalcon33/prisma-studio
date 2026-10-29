import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import JSZip from 'jszip';
import {
  Upload,
  Download,
  Trash2,
  Sliders,
  Check,
  RefreshCw,
  Eye,
  Archive,
  RotateCw,
  FlipHorizontal,
  FlipVertical,
  AlertCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import {
  ImageFormatId,
  SUPPORTED_FORMATS,
  ConversionOptions,
  ConvertedResult,
  convertImageFile,
  detectSourceFormat,
  formatBytes,
  getFormatSpec,
  loadImageElement,
  createStudioSampleFiles,
  ColorFilterMode
} from '../utils/imageConverter';
import { ImageCompareModal, CompareModalItem } from '../components/ImageCompareModal';

const MAX_IMAGES = 5;

interface QueuedImageItem {
  id: string;
  file: File;
  previewUrl: string;
  sourceFormat: string;
  originalWidth: number;
  originalHeight: number;
  targetFormat: ImageFormatId;
  status: 'idle' | 'converting' | 'done' | 'error';
  errorMessage?: string;
  result?: ConvertedResult;
}

export const ConverterPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialFormatParam = searchParams.get('formato') as ImageFormatId | null;
  const validInitialFormat = SUPPORTED_FORMATS.some((f) => f.id === initialFormatParam)
    ? (initialFormatParam as ImageFormatId)
    : 'webp';

  const [queue, setQueue] = useState<QueuedImageItem[]>([]);
  const [globalFormat, setGlobalFormat] = useState<ImageFormatId>(validInitialFormat);
  const [quality, setQuality] = useState<number>(88);
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [backgroundColor, setBackgroundColor] = useState<string>('#0F172A');
  const [rotation, setRotation] = useState<0 | 90 | 180 | 270>(0);
  const [flipHorizontal, setFlipHorizontal] = useState<boolean>(false);
  const [flipVertical, setFlipVertical] = useState<boolean>(false);
  const [colorFilter, setColorFilter] = useState<ColorFilterMode>('none');
  const [icoSize, setIcoSize] = useState<32 | 64 | 128 | 256>(256);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showAdvancedControls, setShowAdvancedControls] = useState<boolean>(false);
  const [limitNotice, setLimitNotice] = useState<string | null>(null);
  const [isBatchConverting, setIsBatchConverting] = useState<boolean>(false);
  const [isLoadingSamples, setIsLoadingSamples] = useState<boolean>(false);
  const [compareItem, setCompareItem] = useState<CompareModalItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fmt = searchParams.get('formato') as ImageFormatId | null;
    if (fmt && SUPPORTED_FORMATS.some((f) => f.id === fmt)) {
      setGlobalFormat(fmt);
      setQueue((prev) =>
        prev.map((item) => ({
          ...item,
          targetFormat: fmt,
          status: item.status === 'done' ? 'idle' : item.status
        }))
      );
    }
  }, [searchParams]);

  useEffect(() => {
    return () => {
      queue.forEach((item) => {
        URL.revokeObjectURL(item.previewUrl);
        if (item.result?.url) URL.revokeObjectURL(item.result.url);
      });
    };
  }, []);

  const addFilesToQueue = useCallback(
    async (incomingFiles: FileList | File[]) => {
      setLimitNotice(null);
      const validImageFiles = Array.from(incomingFiles).filter(
        (file) =>
          file.type.startsWith('image/') ||
          /\.(png|jpe?g|webp|avif|bmp|gif|ico|tiff?|svg)$/i.test(file.name)
      );

      if (validImageFiles.length === 0) {
        setLimitNotice(
          'Selecciona archivos de imagen válidos (PNG, JPG, JPEG, WEBP, AVIF, BMP, GIF, ICO, TIFF o SVG).'
        );
        return;
      }

      const currentCount = queue.length;
      const availableSlots = MAX_IMAGES - currentCount;

      if (availableSlots <= 0) {
        setLimitNotice(
          `El límite máximo es de ${MAX_IMAGES} imágenes simultáneas. Elimina alguna imagen de la cola para añadir nuevas.`
        );
        return;
      }

      const filesToProcess = validImageFiles.slice(0, availableSlots);
      if (validImageFiles.length > availableSlots) {
        setLimitNotice(
          `Se han cargado ${filesToProcess.length} imágenes hasta completar el límite máximo de ${MAX_IMAGES} archivos por lote.`
        );
      }

      const newItems: QueuedImageItem[] = [];
      for (const file of filesToProcess) {
        try {
          const previewUrl = URL.createObjectURL(file);
          const { width, height } = await loadImageElement(previewUrl);
          const srcFmt = detectSourceFormat(file);

          let defaultTarget: ImageFormatId = globalFormat;
          if (srcFmt.toLowerCase() === globalFormat) {
            defaultTarget = globalFormat === 'webp' ? 'png' : 'webp';
          }

          newItems.push({
            id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            file,
            previewUrl,
            sourceFormat: srcFmt,
            originalWidth: width,
            originalHeight: height,
            targetFormat: defaultTarget,
            status: 'idle'
          });
        } catch {
          setLimitNotice(
            `No se pudo leer la imagen "${file.name}". Verifica que el archivo no esté dañado.`
          );
        }
      }

      if (newItems.length > 0) {
        setQueue((prev) => [...prev, ...newItems].slice(0, MAX_IMAGES));
      }
    },
    [queue.length, globalFormat]
  );

  const handleLoadStudioSamples = async () => {
    if (queue.length >= MAX_IMAGES) {
      setLimitNotice(
        `Ya tienes ${MAX_IMAGES} imágenes cargadas. Vacía la cola o elimina un archivo para cargar las muestras.`
      );
      return;
    }
    setIsLoadingSamples(true);
    setLimitNotice(null);
    try {
      const sampleFiles = await createStudioSampleFiles();
      await addFilesToQueue(sampleFiles);
    } finally {
      setIsLoadingSamples(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await addFilesToQueue(e.dataTransfer.files);
    }
  };

  const handleRemoveItem = (id: string) => {
    setLimitNotice(null);
    setQueue((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        if (target.result?.url) URL.revokeObjectURL(target.result.url);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleClearQueue = () => {
    setLimitNotice(null);
    queue.forEach((item) => {
      URL.revokeObjectURL(item.previewUrl);
      if (item.result?.url) URL.revokeObjectURL(item.result.url);
    });
    setQueue([]);
  };

  const handleApplyGlobalFormat = (fmt: ImageFormatId) => {
    setGlobalFormat(fmt);
    setQueue((prev) =>
      prev.map((item) => ({
        ...item,
        targetFormat: fmt,
        status: item.status === 'done' ? 'idle' : item.status
      }))
    );
  };

  const handleItemFormatChange = (id: string, newFormat: ImageFormatId) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              targetFormat: newFormat,
              status: 'idle'
            }
          : item
      )
    );
  };

  const buildConversionOptions = (targetFormat: ImageFormatId): ConversionOptions => ({
    targetFormat,
    quality,
    scalePercent,
    backgroundColor,
    rotation,
    flipHorizontal,
    flipVertical,
    colorFilter,
    icoSize
  });

  const handleConvertSingle = async (id: string) => {
    const targetItem = queue.find((i) => i.id === id);
    if (!targetItem) return;

    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'converting', errorMessage: undefined } : item
      )
    );

    try {
      const result = await convertImageFile(
        targetItem.file,
        buildConversionOptions(targetItem.targetFormat)
      );
      setQueue((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          if (item.result?.url) URL.revokeObjectURL(item.result.url);
          return {
            ...item,
            status: 'done',
            result
          };
        })
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error durante la conversión';
      setQueue((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: 'error', errorMessage: msg } : item
        )
      );
    }
  };

  const handleConvertAll = async () => {
    if (queue.length === 0) return;
    setIsBatchConverting(true);

    for (const item of queue) {
      await handleConvertSingle(item.id);
    }

    setIsBatchConverting(false);
  };

  const handleDownloadItem = (item: { result?: ConvertedResult }) => {
    if (!item.result) return;
    const a = document.createElement('a');
    a.href = item.result.url;
    a.download = item.result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadZip = async () => {
    const completed = queue.filter((i) => i.status === 'done' && i.result);
    if (completed.length === 0) return;

    const zip = new JSZip();
    const usedNames = new Set<string>();

    completed.forEach((item) => {
      if (!item.result) return;
      let finalName = item.result.fileName;
      let counter = 1;
      while (usedNames.has(finalName)) {
        const dotIdx = item.result.fileName.lastIndexOf('.');
        const base = item.result.fileName.slice(0, dotIdx);
        const ext = item.result.fileName.slice(dotIdx);
        finalName = `${base}_${counter}${ext}`;
        counter++;
      }
      usedNames.add(finalName);
      zip.file(finalName, item.result.blob);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = zipUrl;
    a.download = `prisma_studio_lote_${completed.length}_imagenes.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(zipUrl), 3000);
  };

  const totalOriginalBytes = queue.reduce((acc, i) => acc + i.file.size, 0);
  const completedItems = queue.filter((i) => i.status === 'done' && i.result);
  const totalConvertedBytes = completedItems.reduce(
    (acc, i) => acc + (i.result?.sizeBytes || 0),
    0
  );
  const completedOriginalBytes = completedItems.reduce((acc, i) => acc + i.file.size, 0);
  const totalSavingsPercent =
    completedOriginalBytes > 0
      ? Math.round(((totalConvertedBytes - completedOriginalBytes) / completedOriginalBytes) * 100)
      : 0;

  return (
    <div className="flex-1 bg-[#050508] bg-cyber-grid text-slate-100">
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-14">
        {/* Page Header & Breadcrumb Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-300/80 hover:text-purple-200 mb-3 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la página principal</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Estudio de Conversión Multiformato
            </h1>
            <p className="text-sm text-purple-200/70 mt-1">
              Carga hasta 5 imágenes simultáneamente y conviértelas entre PNG, JPG, JPEG, WEBP,
              AVIF, BMP, TIFF, GIF, ICO y SVG.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={queue.length >= MAX_IMAGES}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white rounded-lg neon-button-purple disabled:opacity-40 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Añadir imágenes ({queue.length}/{MAX_IMAGES})</span>
            </button>
          </div>
        </div>

        {/* Studio Workspace Container */}
        <div className="bg-[#0B0914] border border-purple-500/40 rounded-2xl overflow-hidden neon-border-purple">
          {/* Workspace Top Control Bar */}
          <div className="px-6 py-4 border-b border-purple-500/25 bg-[#0E0B1A] flex flex-wrap items-center justify-between gap-4">
            {/* 5-Slot Capacity Indicator */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5" aria-label="Capacidad de lote de 5 imágenes">
                {Array.from({ length: MAX_IMAGES }).map((_, idx) => {
                  const isFilled = idx < queue.length;
                  return (
                    <span
                      key={idx}
                      className={`w-6 h-2 rounded-xs transition-all ${
                        isFilled
                          ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]'
                          : 'bg-purple-950/70 border border-purple-500/25'
                      }`}
                    />
                  );
                })}
              </div>
              <div className="text-xs text-purple-200/75 font-mono-tabular">
                <span className="font-semibold text-white">
                  {queue.length} / {MAX_IMAGES}
                </span>{' '}
                ranuras ocupadas
                {queue.length > 0 && (
                  <>
                    <span aria-hidden="true"> · </span>
                    <span>Entrada: {formatBytes(totalOriginalBytes)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Right Quick Actions */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={handleLoadStudioSamples}
                disabled={isLoadingSamples || queue.length >= MAX_IMAGES}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-100 bg-[#151026] border border-purple-500/35 rounded-lg hover:bg-purple-500/20 disabled:opacity-40 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                {isLoadingSamples ? 'Generando muestras...' : 'Cargar 3 imágenes de prueba'}
              </button>

              <button
                type="button"
                onClick={() => setShowAdvancedControls((prev) => !prev)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  showAdvancedControls
                    ? 'bg-purple-600 text-white border-purple-400'
                    : 'bg-[#151026] text-purple-100 border-purple-500/35 hover:bg-purple-500/20'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Parámetros ópticos ({quality}% · {scalePercent}%)
              </button>
            </div>
          </div>

          {/* Global Format Bar */}
          <div className="px-6 py-4 border-b border-purple-500/25 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#0B0914]">
            <div className="flex items-center gap-2 text-xs text-purple-200/75 shrink-0">
              <span className="font-semibold text-white">Formato de salida global:</span>
              <span>Aplicar a todo el lote o personalizar por archivo</span>
            </div>

            {/* Segmented Interactive Format Buttons */}
            <div
              className="flex items-center gap-1 p-1 bg-[#140F26] border border-purple-500/30 rounded-lg overflow-x-auto"
              role="group"
              aria-label="Selector de formato de salida global"
            >
              {SUPPORTED_FORMATS.map((fmt) => {
                const active = globalFormat === fmt.id;
                return (
                  <button
                    key={fmt.id}
                    type="button"
                    onClick={() => handleApplyGlobalFormat(fmt.id)}
                    className={`px-3 py-1.5 text-xs font-mono-tabular font-semibold rounded-md transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                        : 'text-purple-200/70 hover:text-white'
                    }`}
                  >
                    {fmt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collapsible Optical Parameters Drawer */}
          {showAdvancedControls && (
            <div className="px-6 py-5 border-b border-purple-500/25 bg-[#0F0C1D] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Quality / Compression */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="quality-range" className="font-semibold text-white">
                    Calidad de codificación
                  </label>
                  <span className="font-mono-tabular text-purple-300 font-semibold">
                    {quality}%
                  </span>
                </div>
                <input
                  id="quality-range"
                  type="range"
                  min={10}
                  max={100}
                  step={2}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <p className="text-xs text-purple-200/60">
                  Activo en WEBP, JPG, JPEG, AVIF y SVG. PNG, BMP y TIFF son sin pérdida.
                </p>
              </div>

              {/* 2. Resolution Scaling */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white">
                  Escala de resolución
                </label>
                <div className="flex items-center gap-1 p-1 bg-[#17122B] border border-purple-500/25 rounded-lg">
                  {[25, 50, 75, 100, 150, 200].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setScalePercent(pct)}
                      className={`flex-1 py-1 text-xs font-mono-tabular font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        scalePercent === pct
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-purple-200/70 hover:text-white'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <p className="text-xs text-purple-200/60">
                  Redimensiona proporcionalmente el ancho y alto en píxeles.
                </p>
              </div>

              {/* 3. Orientation & Color Filter */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white">
                  Geometría y filtro óptico
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setRotation((prev) => ((prev + 90) % 360) as 0 | 90 | 180 | 270)
                    }
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono-tabular font-medium bg-[#17122B] border border-purple-500/30 text-purple-100 rounded-lg hover:bg-purple-500/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    title="Rotar 90 grados"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    {rotation}°
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlipHorizontal((prev) => !prev)}
                    className={`p-1.5 border rounded-lg transition-colors cursor-pointer ${
                      flipHorizontal
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-[#17122B] text-purple-200 border-purple-500/30 hover:bg-purple-500/20'
                    }`}
                    title="Voltear horizontalmente"
                    aria-label="Voltear horizontalmente"
                  >
                    <FlipHorizontal className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlipVertical((prev) => !prev)}
                    className={`p-1.5 border rounded-lg transition-colors cursor-pointer ${
                      flipVertical
                        ? 'bg-purple-600 text-white border-purple-400'
                        : 'bg-[#17122B] text-purple-200 border-purple-500/30 hover:bg-purple-500/20'
                    }`}
                    title="Voltear verticalmente"
                    aria-label="Voltear verticalmente"
                  >
                    <FlipVertical className="w-4 h-4" />
                  </button>

                  <select
                    value={colorFilter}
                    onChange={(e) => setColorFilter(e.target.value as ColorFilterMode)}
                    aria-label="Filtro de color"
                    className="flex-1 px-2.5 py-1.5 text-xs font-medium bg-[#17122B] border border-purple-500/30 rounded-lg text-purple-100 focus:outline-none focus:border-purple-400"
                  >
                    <option value="none">Color original</option>
                    <option value="grayscale">Blanco y negro</option>
                    <option value="sepia">Sepia editorial</option>
                    <option value="contrast">Alto contraste</option>
                    <option value="invert">Invertir canales</option>
                  </select>
                </div>
                <p className="text-xs text-purple-200/60">
                  Transformaciones aplicadas antes de codificar el archivo final.
                </p>
              </div>

              {/* 4. Alpha Matte & ICO Dimension */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-white">
                  Fondo sin alfa y tamaño ICO
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 p-1 bg-[#17122B] border border-purple-500/25 rounded-lg">
                    {[
                      { hex: '#0F172A', name: 'Obsidiana' },
                      { hex: '#FFFFFF', name: 'Blanco' },
                      { hex: '#3B0764', name: 'Violeta' }
                    ].map((bg) => (
                      <button
                        key={bg.hex}
                        type="button"
                        onClick={() => setBackgroundColor(bg.hex)}
                        className={`px-2 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          backgroundColor === bg.hex
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-purple-200/70 hover:text-white'
                        }`}
                      >
                        {bg.name}
                      </button>
                    ))}
                  </div>

                  <select
                    value={icoSize}
                    onChange={(e) => setIcoSize(Number(e.target.value) as 32 | 64 | 128 | 256)}
                    aria-label="Tamaño de exportación ICO"
                    className="px-2 py-1.5 text-xs font-mono-tabular bg-[#17122B] border border-purple-500/30 rounded-lg text-purple-100"
                  >
                    <option value={256}>ICO 256px</option>
                    <option value={128}>ICO 128px</option>
                    <option value={64}>ICO 64px</option>
                    <option value={32}>ICO 32px</option>
                  </select>
                </div>
                <p className="text-xs text-purple-200/60">
                  Relleno usado al convertir transparencias a JPG, BMP o TIFF.
                </p>
              </div>
            </div>
          )}

          {/* Inline Notification Banner if >5 files or validation notice */}
          {limitNotice && (
            <div className="px-6 py-3 bg-purple-950/80 border-b border-purple-400/40 flex items-center justify-between gap-4 text-xs text-purple-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-purple-300 shrink-0" />
                <span>{limitNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setLimitNotice(null)}
                className="text-xs font-semibold text-purple-300 hover:text-white underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Entendido
              </button>
            </div>
          )}

          {/* Main Dropzone & Queue Canvas */}
          <div className="p-6">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.png,.jpg,.jpeg,.webp,.avif,.bmp,.gif,.ico,.tif,.tiff,.svg"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  addFilesToQueue(e.target.files);
                  e.target.value = '';
                }
              }}
              className="hidden"
            />

            {/* Dropzone Area */}
            {queue.length < MAX_IMAGES && (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                className={`border-2 border-dashed rounded-xl transition-all cursor-pointer text-center ${
                  queue.length === 0 ? 'py-16 px-6' : 'py-5 px-6 mb-6'
                } ${
                  isDragging
                    ? 'border-purple-400 bg-purple-900/25 shadow-[inset_0_0_24px_rgba(168,85,247,0.25)]'
                    : 'border-purple-500/35 hover:border-purple-400/70 bg-[#080610]'
                }`}
              >
                {queue.length === 0 ? (
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-400/40 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(168,85,247,0.35)]">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-bold text-white font-display">
                        Arrastra tus imágenes aquí o haz clic para explorar
                      </p>
                      <p className="text-xs text-purple-200/65">
                        Soporta hasta {MAX_IMAGES} imágenes simultáneas · PNG · JPG · JPEG · WEBP ·
                        AVIF · BMP · TIFF · GIF · ICO · SVG
                      </p>
                    </div>
                    <div className="pt-2 flex items-center justify-center gap-3">
                      <span className="px-4 py-2 text-xs font-semibold text-white rounded-lg neon-button-purple transition-all whitespace-nowrap">
                        Seleccionar archivos (máx. {MAX_IMAGES})
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-left">
                      <Upload className="w-4 h-4 text-purple-300 shrink-0" />
                      <span className="text-xs font-medium text-purple-100">
                        Añadir más imágenes al lote actual ({MAX_IMAGES - queue.length}{' '}
                        {MAX_IMAGES - queue.length === 1
                          ? 'ranura disponible'
                          : 'ranuras disponibles'}
                        )
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-purple-300 hover:text-white hover:underline whitespace-nowrap shrink-0">
                      + Subir archivo
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Populated Queue Table (1 to 5 images) */}
            {queue.length > 0 && (
              <div className="space-y-4">
                <div className="divide-y divide-purple-500/20 border border-purple-500/30 rounded-xl overflow-hidden bg-[#080610]">
                  {queue.map((item, index) => {
                    const targetSpec = getFormatSpec(item.targetFormat);
                    const byteDelta = item.result ? item.result.sizeBytes - item.file.size : 0;
                    const pctDelta =
                      item.result && item.file.size > 0
                        ? Math.round((byteDelta / item.file.size) * 100)
                        : 0;

                    return (
                      <div
                        key={item.id}
                        className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-purple-950/20 transition-colors"
                      >
                        {/* Left: Slot Number + Thumbnail + Source Metadata */}
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <span className="text-xs font-mono-tabular font-semibold text-purple-400/70 w-5 shrink-0">
                            0{index + 1}
                          </span>

                          <div className="w-14 h-14 rounded-lg border border-purple-500/35 bg-checkerboard flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src={item.result ? item.result.url : item.previewUrl}
                              alt={item.file.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-white truncate">
                              {item.file.name}
                            </p>
                            {/* Clean unboxed metadata with middle-dot separators */}
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-purple-200/65 font-mono-tabular mt-0.5">
                              <span className="font-medium text-purple-300">
                                {item.sourceFormat}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>
                                {item.originalWidth} × {item.originalHeight} px
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{formatBytes(item.file.size)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Individual Format Selector & Conversion Telemetry */}
                        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-purple-200/70 whitespace-nowrap">
                              Convertir a:
                            </span>
                            <select
                              value={item.targetFormat}
                              onChange={(e) =>
                                handleItemFormatChange(item.id, e.target.value as ImageFormatId)
                              }
                              aria-label={`Formato de salida para ${item.file.name}`}
                              className="px-3 py-1.5 text-xs font-mono-tabular font-semibold bg-[#151026] hover:bg-[#1E1736] border border-purple-500/35 rounded-lg text-white focus:outline-none focus:border-purple-400 cursor-pointer"
                            >
                              {SUPPORTED_FORMATS.map((f) => (
                                <option key={f.id} value={f.id}>
                                  {f.label} (.{f.extension})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Status & Output Telemetry */}
                          <div className="min-w-[190px] text-left lg:text-right font-mono-tabular text-xs">
                            {item.status === 'idle' && (
                              <span className="text-purple-200/60">
                                Listo para exportar a {targetSpec.label}
                              </span>
                            )}
                            {item.status === 'converting' && (
                              <span className="text-purple-300 font-medium inline-flex items-center gap-1.5">
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                Codificando {targetSpec.label}...
                              </span>
                            )}
                            {item.status === 'error' && (
                              <span className="text-rose-400 font-medium">
                                {item.errorMessage || 'Error de formato'}
                              </span>
                            )}
                            {item.status === 'done' && item.result && (
                              <div className="space-y-0.5">
                                <div className="text-white font-semibold flex items-center lg:justify-end gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>{formatBytes(item.result.sizeBytes)}</span>
                                  <span aria-hidden="true">·</span>
                                  <span
                                    className={
                                      pctDelta <= 0 ? 'text-emerald-400' : 'text-amber-400'
                                    }
                                  >
                                    {pctDelta > 0 ? `+${pctDelta}%` : `${pctDelta}%`}
                                  </span>
                                </div>
                                <div className="text-purple-200/60">
                                  {item.result.width} × {item.result.height} px ·{' '}
                                  {item.result.durationMs} ms
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Right: Row Action Controls */}
                          <div className="flex items-center gap-2 shrink-0">
                            {item.status === 'done' && item.result ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => setCompareItem(item)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-100 bg-[#151026] border border-purple-500/35 rounded-lg hover:bg-purple-500/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                                  title="Comparar original y resultado"
                                >
                                  <Eye className="w-3.5 h-3.5 text-purple-300" />
                                  Comparar
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDownloadItem(item)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg neon-button-purple transition-all whitespace-nowrap shrink-0 cursor-pointer"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  Descargar
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleConvertSingle(item.id)}
                                disabled={item.status === 'converting'}
                                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-purple-100 bg-[#18122B] border border-purple-500/40 rounded-lg hover:bg-purple-600 hover:text-white disabled:opacity-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                Convertir
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="p-1.5 text-purple-300/50 hover:text-rose-400 hover:bg-rose-500/15 rounded-lg transition-colors cursor-pointer"
                              aria-label={`Eliminar ${item.file.name}`}
                              title="Eliminar de la cola"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Batch Execution Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={handleClearQueue}
                      className="text-xs font-medium text-purple-300/70 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Vaciar las {queue.length} imágenes
                    </button>

                    {completedItems.length > 0 && (
                      <div className="text-xs text-purple-200/80 font-mono-tabular">
                        <span>
                          Salida total: {formatBytes(totalConvertedBytes)} (
                          {totalSavingsPercent > 0
                            ? `+${totalSavingsPercent}%`
                            : `${totalSavingsPercent}%`}
                          )
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {completedItems.length > 1 && (
                      <button
                        type="button"
                        onClick={handleDownloadZip}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-purple-100 bg-[#151026] border border-purple-500/45 rounded-lg hover:bg-purple-500/25 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Archive className="w-4 h-4 text-purple-300" />
                        Descargar lote en ZIP ({completedItems.length})
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleConvertAll}
                      disabled={isBatchConverting}
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white rounded-lg neon-button-purple disabled:opacity-50 transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <RefreshCw
                        className={`w-4 h-4 ${isBatchConverting ? 'animate-spin' : ''}`}
                      />
                      {isBatchConverting
                        ? 'Procesando lote...'
                        : `Convertir ${
                            queue.length === 1 ? 'imagen' : `las ${queue.length} imágenes`
                          }`}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Split-Curtain / Side-by-Side Comparison Modal */}
      <ImageCompareModal
        item={compareItem}
        onClose={() => setCompareItem(null)}
        onDownload={handleDownloadItem}
      />
    </div>
  );
};
