import React, { useState } from 'react';
import { Download, ShieldCheck, CheckCircle2, LogOut, UploadCloud, ExternalLink, Sparkles, AlertTriangle, HelpCircle, FileCheck, ArrowRight } from 'lucide-react';
import { DownloadAnimationModal } from './DownloadAnimationModal';
import { MandatoryDownloadNoticeModal } from './MandatoryDownloadNoticeModal';

interface ResultViewProps {
  score: number;
  correctCount: number;
  incorrectCount: number;
  kkm: number;
  studentName: string;
  noPeserta: string;
  driveUploadUrl?: string;
  onDownloadEncryptedResult: () => void;
  onViewDiscussion?: () => void;
  onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  studentName,
  noPeserta,
  driveUploadUrl,
  onDownloadEncryptedResult,
  onRestart,
}) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(true); // Pop up automatically on finish
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasOpenedDrive, setHasOpenedDrive] = useState(false);
  const [showExitConfirmDialog, setShowExitConfirmDialog] = useState(false);

  const cleanName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const resultFileName = `HASIL_CBT_${noPeserta}_${cleanName}.cbt`;

  const handleTriggerDownload = () => {
    setIsDownloadModalOpen(true);
  };

  const handleDownloadCompleted = () => {
    setHasDownloaded(true);
    onDownloadEncryptedResult();
  };

  const handleOpenDrive = () => {
    setHasOpenedDrive(true);
    if (driveUploadUrl) {
      const targetUrl = driveUploadUrl.startsWith('http') ? driveUploadUrl : `https://${driveUploadUrl}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAttemptRestart = () => {
    if (!hasDownloaded) {
      setShowExitConfirmDialog(true);
      return;
    }
    onRestart();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/95 fixed inset-0 z-40 overflow-y-auto p-3 sm:p-6 text-slate-800">
      {/* Dynamic Animated Ambient Lights */}
      <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in p-5 sm:p-8 text-center relative border border-slate-200 my-auto space-y-5">
        {/* Top Floating Obligatory Action Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 rounded-2xl shadow-lg animate-pulse-glow text-left relative overflow-hidden space-y-2.5 border border-amber-300">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-yellow-200 rounded-full animate-ping" />
              <p className="text-xs font-black uppercase tracking-wider text-yellow-100 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-yellow-200 shrink-0" />
                <span>Peringatan Wajib Setelah Ujian</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsNoticeModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 active:bg-white/40 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm transition flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-yellow-200" />
              <span>Buka Panduan</span>
            </button>
          </div>

          <p className="text-xs text-amber-50 font-medium leading-relaxed">
            Anda <b>WAJIB MENGUNDUH</b> file jawaban <b>.cbt</b> dan <b>MENGUPLOAD</b> ke Google Drive sebelum meninggalkan halaman ini agar nilai Anda sah!
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleTriggerDownload}
              className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition shadow cursor-pointer active:scale-95 ${
                hasDownloaded 
                  ? 'bg-emerald-600 text-white border border-emerald-400' 
                  : 'bg-white text-amber-900 hover:bg-amber-50 animate-bounce'
              }`}
            >
              <Download className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{hasDownloaded ? '1. Sudah Diunduh ✅' : '1. Unduh .CBT 📥'}</span>
            </button>

            <button
              type="button"
              onClick={handleOpenDrive}
              className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition shadow cursor-pointer active:scale-95 ${
                hasOpenedDrive 
                  ? 'bg-indigo-700 text-white border border-indigo-400' 
                  : 'bg-indigo-900 text-white hover:bg-indigo-950'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
              <span className="truncate">{hasOpenedDrive ? '2. Drive Dibuka ✅' : '2. Buka Drive ☁️'}</span>
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-float" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-bold mb-1.5 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Jawaban Tersimpan &amp; Terenkripsi Aman
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Ujian Telah Selesai!</h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
              Terima kasih <span className="font-bold text-slate-800">{studentName}</span> ({noPeserta})
            </p>
          </div>
        </div>

        {/* Encrypted Download Card */}
        <div className={`p-4 sm:p-5 rounded-2xl text-left space-y-3 relative overflow-hidden border transition-all duration-300 ${
          hasDownloaded 
            ? 'bg-emerald-950 text-white border-emerald-500 shadow-md' 
            : 'bg-slate-900 text-white border-amber-400/80 shadow-xl ring-2 ring-amber-400/30'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Berkas Hasil Jawaban (.cbt)
            </p>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-extrabold border ${
              hasDownloaded 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
            }`}>
              {hasDownloaded ? 'SUDAH DIUNDUH ✅' : 'WAJIB DIUNDUH ⚠️'}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Berkas ini memuat rekaman digital pengerjaan Anda. Simpan file ini dan unggah ke Google Drive guru Anda.
          </p>
          <button
            onClick={handleTriggerDownload}
            className={`w-full font-black py-3.5 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95 cursor-pointer group ${
              hasDownloaded
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/30'
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-500/40 animate-bounce'
            }`}
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            <span>{hasDownloaded ? 'Unduh Ulang Berkas Jawaban (.cbt)' : 'Unduh Berkas Jawaban (.cbt) Sekarang'}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>
        </div>

        {/* Upload Hasil Jawaban Google Drive Banner */}
        {driveUploadUrl ? (
          <div className={`p-4 sm:p-5 rounded-2xl text-left space-y-3 border transition-all duration-300 shadow-md ${
            hasOpenedDrive 
              ? 'bg-indigo-950 text-white border-indigo-400' 
              : 'bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-indigo-500/60'
          }`}>
            <div className="flex items-center justify-between">
              <p className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-indigo-400" /> Upload Berkas ke Google Drive
              </p>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-300" />
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed font-medium">
              Setelah mengunduh file <b>.cbt</b> di atas, klik tombol di bawah ini untuk membuka folder Google Drive resmi pengumpulan ujian:
            </p>
            <button
              type="button"
              onClick={handleOpenDrive}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-extrabold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-95 cursor-pointer block text-center"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Buka Google Drive &amp; Upload File (.cbt)</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-200" />
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left space-y-1.5">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-slate-500" /> Upload Link Google Drive
            </p>
            <p className="text-[11px] text-slate-500">
              Link upload Google Drive belum dikonfigurasi oleh Guru. Harap serahkan file <b>.cbt</b> yang diunduh langsung ke Guru / Pengawas.
            </p>
          </div>
        )}

        {/* Exit Action */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleAttemptRestart}
            className="w-full min-h-[46px] bg-slate-900 hover:bg-slate-950 active:bg-black text-white font-extrabold py-3 px-4 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-98"
          >
            <LogOut className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Keluar dari Aplikasi (Kembali ke Halaman Utama)</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-400 pt-1">
          <span>create: </span>
          <a href="https://lynk.id/ajisosiologi" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-blue-600">
            @ajisosiologi
          </a>{' '}
          - Offline Secure Assessment System
        </p>
      </div>

      {/* Mandatory Notice Modal on Exam Completion */}
      <MandatoryDownloadNoticeModal
        isOpen={isNoticeModalOpen}
        studentName={studentName}
        noPeserta={noPeserta}
        driveUploadUrl={driveUploadUrl}
        hasDownloaded={hasDownloaded}
        hasOpenedDrive={hasOpenedDrive}
        onDownloadClick={() => {
          setIsNoticeModalOpen(false);
          setIsDownloadModalOpen(true);
        }}
        onOpenDriveClick={handleOpenDrive}
        onClose={() => setIsNoticeModalOpen(false)}
      />

      {/* Download Animation Modal */}
      <DownloadAnimationModal
        isOpen={isDownloadModalOpen}
        title="Mengunduh Hasil Jawaban (.cbt)"
        subtitle="Memproses stempel digital & enkripsi hasil ujian..."
        fileName={resultFileName}
        fileType="cbt"
        onComplete={handleDownloadCompleted}
        onClose={() => {
          setIsDownloadModalOpen(false);
          setHasDownloaded(true);
        }}
      />

      {/* Warning Exit Confirmation Dialog if file has NOT been downloaded */}
      {showExitConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in text-slate-800">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-red-500 text-center space-y-4 animate-shake">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                Peringatan: Berkas Jawaban Belum Diunduh!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Anda belum mengunduh file <b>.cbt</b>. Jika keluar sekarang, Anda mungkin tidak memiliki bukti rekaman jawaban untuk diunggah ke Google Drive Guru.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirmDialog(false);
                  setIsDownloadModalOpen(true);
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" /> Unduh Berkas (.cbt) Sekarang
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitConfirmDialog(false);
                  onRestart();
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Tetap Keluar Tanpa Mengunduh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


