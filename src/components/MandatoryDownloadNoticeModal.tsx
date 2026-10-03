import React, { useState, useEffect } from 'react';
import { Download, UploadCloud, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, ExternalLink, ArrowRight, X, FileText, Info } from 'lucide-react';

interface MandatoryDownloadNoticeModalProps {
  isOpen: boolean;
  studentName: string;
  noPeserta: string;
  driveUploadUrl?: string;
  hasDownloaded: boolean;
  hasOpenedDrive: boolean;
  onDownloadClick: () => void;
  onOpenDriveClick: () => void;
  onClose: () => void;
}

export const MandatoryDownloadNoticeModal: React.FC<MandatoryDownloadNoticeModalProps> = ({
  isOpen,
  studentName,
  noPeserta,
  driveUploadUrl,
  hasDownloaded,
  hasOpenedDrive,
  onDownloadClick,
  onOpenDriveClick,
  onClose,
}) => {
  const [showExitWarning, setShowExitWarning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowExitWarning(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAttemptClose = () => {
    if (!hasDownloaded) {
      setShowExitWarning(true);
      return;
    }
    onClose();
  };

  const stepsCompleted = (hasDownloaded ? 1 : 0) + (hasOpenedDrive || !driveUploadUrl ? 1 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-amber-400 w-full max-w-lg overflow-hidden relative text-slate-800 my-auto animate-in zoom-in-95 duration-200">
        {/* Glow and Decorative Background */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Banner with Eye-Catching Pulsing Animation */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
          
          <div className="flex items-start justify-between relative z-10 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white text-amber-600 rounded-2xl flex items-center justify-center shadow-lg shrink-0 animate-bounce">
                <AlertTriangle className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <span className="bg-white/20 backdrop-blur-md text-amber-50 text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full border border-white/30 uppercase tracking-widest inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-200 animate-spin" /> WAJIB DILAKUKAN
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white mt-1 leading-tight tracking-tight">
                  Peringatan Hasil Ujian!
                </h2>
              </div>
            </div>

            <button
              onClick={handleAttemptClose}
              className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition cursor-pointer shrink-0"
              title="Tutup Peringatan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-amber-100 mt-3 font-medium relative z-10">
            Halo <b className="text-white font-bold">{studentName}</b> ({noPeserta}), ujian Anda telah selesai. Mohon ikuti <b>2 langkah wajib</b> di bawah ini agar nilai Anda sah dan tercatat di Guru/Pengawas!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Progress Indicator */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Progres Langkah Wajib:</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                stepsCompleted === 2 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {stepsCompleted}/2 Selesai
              </span>
            </div>
            {hasDownloaded && (
              <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> File Siap
              </span>
            )}
          </div>

          {/* STEP 1: DOWNLOAD .CBT */}
          <div className={`p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
            hasDownloaded 
              ? 'bg-emerald-50/70 border-emerald-400' 
              : 'bg-amber-50/50 border-amber-300 shadow-md ring-2 ring-amber-400/30'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                hasDownloaded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-amber-500 text-white animate-pulse'
              }`}>
                {hasDownloaded ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>Unduh Berkas Jawaban (.cbt)</span>
                    {!hasDownloaded && (
                      <span className="text-[10px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                        Wajib
                      </span>
                    )}
                  </h4>
                  {hasDownloaded && (
                    <span className="text-[11px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-lg border border-emerald-300">
                      Sudah Diunduh ✅
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  File ini terenkripsi khusus berisi seluruh rekaman jawaban &amp; waktu pengerjaan Anda.
                </p>

                <div className="mt-3">
                  <button
                    type="button"
                    onClick={onDownloadClick}
                    className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md active:scale-95 cursor-pointer ${
                      hasDownloaded
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-300 animate-bounce'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>{hasDownloaded ? 'Unduh Ulang File (.cbt)' : 'Klik Di Sini: Unduh File Jawaban (.cbt)'}</span>
                    <Sparkles className="w-4 h-4 text-yellow-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: UPLOAD GOOGLE DRIVE */}
          <div className={`p-4 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
            hasOpenedDrive 
              ? 'bg-indigo-50/70 border-indigo-400' 
              : 'bg-slate-50 border-slate-300'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                hasOpenedDrive 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-700 text-white'
              }`}>
                {hasOpenedDrive ? <CheckCircle2 className="w-5 h-5" /> : '2'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>Upload ke Google Drive Pengawas</span>
                  </h4>
                  {hasOpenedDrive && (
                    <span className="text-[11px] text-indigo-700 font-bold bg-indigo-100 px-2 py-0.5 rounded-lg border border-indigo-300">
                      Link Dibuka ✅
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Unggah file <b>.cbt</b> yang baru saja Anda unduh ke folder Google Drive resmi yang telah disediakan.
                </p>

                {driveUploadUrl ? (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={onOpenDriveClick}
                      className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2 transition shadow-md shadow-indigo-200 active:scale-95 cursor-pointer"
                    >
                      <UploadCloud className="w-4 h-4 text-indigo-200" />
                      <span>Buka Folder Google Drive Guru</span>
                      <ExternalLink className="w-4 h-4 ml-0.5" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-2.5 bg-slate-100 border border-slate-200 p-2.5 rounded-xl text-[11px] text-slate-600 flex items-center gap-2">
                    <Info className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Link Drive belum dikonfigurasi. Serahkan file <b>.cbt</b> langsung kepada Guru/Pengawas.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Exit Warning Prompt if Student Hasn't Downloaded */}
          {showExitWarning && !hasDownloaded && (
            <div className="bg-red-50 border-2 border-red-400 p-3.5 rounded-2xl text-red-900 text-xs animate-shake space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span>PERINGATAN: Anda belum mengunduh file jawaban (.cbt)!</span>
              </div>
              <p className="text-[11px] text-red-700 leading-snug">
                Silakan tekan tombol <b>"Unduh File Jawaban (.cbt)"</b> pada Langkah 1 terlebih dahulu sebagai bukti pengerjaan ujian.
              </p>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={handleAttemptClose}
              className={`w-full py-3 px-4 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 ${
                hasDownloaded
                  ? 'bg-slate-900 hover:bg-slate-950 text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              <span>{hasDownloaded ? 'Saya Mengerti, Tutup Peringatan' : 'Tutup Peringatan (Periksa Halaman)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
