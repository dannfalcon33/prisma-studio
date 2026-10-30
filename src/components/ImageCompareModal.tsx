import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ArrowLeftRight, Columns2 } from 'lucide-react';
import { ConvertedResult, formatBytes, getFormatSpec } from '../utils/imageConverter';
import { useLanguage } from '../context/LanguageContext';

export interface CompareModalItem {
  id: string;
  file: File;
  previewUrl: string;
  sourceFormat: string;
  originalWidth: number;
  originalHeight: number;
  result?: ConvertedResult;
}

interface ImageCompareModalProps {
  item: CompareModalItem | null;
  onClose: () => void;
  onDownload: (item: CompareModalItem) => void;
}

export const ImageCompareModal: React.FC<ImageCompareModalProps> = ({
  item,
  onClose,
  onDownload
}) => {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [viewMode, setViewMode] = useState<'split' | 'side-by-side'>('split');

  return (
    <AnimatePresence>
      {item && item.result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 md:p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="compare-modal-title"
        >
          {(() => {
            const { result } = item;
            const targetSpec = getFormatSpec(result.format);
            const byteDelta = result.sizeBytes - item.file.size;
            const percentDelta =
              item.file.size > 0 ? Math.round((byteDelta / item.file.size) * 100) : 0;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-5xl bg-[#0A0912] border border-purple-500/40 rounded-xl overflow-hidden flex flex-col max-h-[90vh] neon-border-purple"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-purple-500/25 bg-[#0E0B1A]">
                  <div className="min-w-0">
                    <h3
                      id="compare-modal-title"
                      className="text-base font-bold text-white truncate font-display"
                    >
                      {t.modal.title(item.file.name)}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-purple-200/70 mt-0.5 font-mono-tabular">
                      <span>
                        {t.modal.originalLabel}: {item.sourceFormat} ({item.originalWidth} ×{' '}
                        {item.originalHeight} px · {formatBytes(item.file.size)})
                      </span>
                      <span aria-hidden="true" className="text-purple-400">
                        →
                      </span>
                      <span className="text-purple-200 font-medium">
                        {t.modal.outputLabel}: {targetSpec.label} ({result.width} × {result.height}{' '}
                        px · {formatBytes(result.sizeBytes)})
                      </span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          percentDelta <= 0
                            ? 'text-emerald-400 font-medium'
                            : 'text-amber-400 font-medium'
                        }
                      >
                        {percentDelta > 0 ? `+${percentDelta}%` : `${percentDelta}%`}{' '}
                        {t.modal.weightDelta}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {/* Segmented Mode Control */}
                    <div className="flex items-center gap-1 p-1 bg-[#161229] border border-purple-500/25 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setViewMode('split')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          viewMode === 'split'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-purple-200/70 hover:text-white'
                        }`}
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                        {t.modal.splitModeBtn}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('side-by-side')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          viewMode === 'side-by-side'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-purple-200/70 hover:text-white'
                        }`}
                      >
                        <Columns2 className="w-3.5 h-3.5" />
                        {t.modal.sideBySideBtn}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={onClose}
                      className="p-2 text-purple-300/70 hover:text-white hover:bg-purple-500/20 rounded-lg transition-colors cursor-pointer"
                      aria-label={t.modal.closeAria}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Viewport Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-[#07060C]">
                  {viewMode === 'split' ? (
                    <div className="space-y-4">
                      <div className="relative w-full h-[420px] md:h-[480px] rounded-lg border border-purple-500/30 bg-checkerboard overflow-hidden select-none">
                        {/* Converted Image (Base full layer) */}
                        <img
                          src={result.url}
                          alt={result.fileName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />

                        {/* Original Image (Clipped left overlay) */}
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                        >
                          <img
                            src={item.previewUrl}
                            alt={item.file.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Vertical Divider Handle */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-purple-400 pointer-events-none shadow-[0_0_12px_#a855f7]"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-purple-600 border border-purple-300 text-white flex items-center justify-center shadow-[0_0_16px_#a855f7]">
                            <ArrowLeftRight className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Corner Labels */}
                        <div className="absolute bottom-3 left-3 bg-[#090812]/90 border border-purple-500/30 text-purple-100 px-2.5 py-1 rounded text-xs font-mono-tabular">
                          {t.modal.originalCorner} ({item.sourceFormat} ·{' '}
                          {formatBytes(item.file.size)})
                        </div>
                        <div className="absolute bottom-3 right-3 bg-[#090812]/90 border border-purple-500/40 text-purple-200 px-2.5 py-1 rounded text-xs font-mono-tabular">
                          {t.modal.convertedCorner} ({targetSpec.label} ·{' '}
                          {formatBytes(result.sizeBytes)})
                        </div>
                      </div>

                      <div className="flex items-center gap-4 max-w-md mx-auto">
                        <span className="text-xs text-purple-300/70 font-mono-tabular whitespace-nowrap">
                          {t.modal.originalCorner}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={sliderPos}
                          onChange={(e) => setSliderPos(Number(e.target.value))}
                          aria-label={t.modal.sliderAria}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                        <span className="text-xs text-purple-300 font-mono-tabular whitespace-nowrap">
                          {targetSpec.label}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-purple-200/70 font-mono-tabular">
                          <span className="font-semibold text-white">
                            {t.modal.originalFileHeader}
                          </span>
                          <span>
                            {item.sourceFormat} · {item.originalWidth} × {item.originalHeight} px ·{' '}
                            {formatBytes(item.file.size)}
                          </span>
                        </div>
                        <div className="h-[380px] rounded-lg border border-purple-500/30 bg-checkerboard flex items-center justify-center p-3 overflow-hidden">
                          <img
                            src={item.previewUrl}
                            alt={item.file.name}
                            referrerPolicy="no-referrer"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-purple-200/70 font-mono-tabular">
                          <span className="font-semibold text-purple-300">
                            {t.modal.resultHeader(targetSpec.label)}
                          </span>
                          <span>
                            {targetSpec.label} · {result.width} × {result.height} px ·{' '}
                            {formatBytes(result.sizeBytes)}
                          </span>
                        </div>
                        <div className="h-[380px] rounded-lg border border-purple-500/30 bg-checkerboard flex items-center justify-center p-3 overflow-hidden">
                          <img
                            src={result.url}
                            alt={result.fileName}
                            referrerPolicy="no-referrer"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-purple-500/25 bg-[#0E0B1A]">
                  <div className="text-xs text-purple-200/70 font-mono-tabular">
                    {t.modal.encodingTime}: {result.durationMs} ms · MIME: {result.mimeType}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-xs font-medium text-purple-200 hover:text-white border border-purple-500/30 rounded-lg hover:bg-purple-500/15 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {t.modal.closeBtn}
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => onDownload(item)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white rounded-lg neon-button-purple transition-all whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {t.modal.downloadFileBtn(result.fileName)}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
