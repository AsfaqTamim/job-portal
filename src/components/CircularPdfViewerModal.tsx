import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';

interface CircularPdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ScreenId) => void;
  circularTitle?: string;
  memoNo?: string;
}

export const generateCircularIframeDoc = (memoNo: string = 'BOU/ADMIN/2025/01') => {
  return `<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="utf-8" />
  <title>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় নিয়োগ বিজ্ঞপ্তি - ${memoNo}</title>
  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: 'SolaimanLipi', 'Kalpurush', 'Nikosh', 'Segoe UI', system-ui, sans-serif;
      background-color: #f1f5f9;
      color: #0f172a;
      line-height: 1.6;
    }
    .page-sheet {
      background: #ffffff;
      max-width: 820px;
      margin: 0 auto 28px auto;
      padding: 48px;
      border: 1px solid #cbd5e1;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      position: relative;
    }
    .watermark {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-30deg);
      font-size: 72px;
      color: rgba(16, 185, 129, 0.04);
      font-weight: bold;
      pointer-events: none;
      white-space: nowrap;
      user-select: none;
      border: 6px dashed rgba(16, 185, 129, 0.08);
      padding: 20px 40px;
    }
    .header-table {
      width: 100%;
      border-bottom: 2px solid #047857;
      padding-bottom: 16px;
      margin-bottom: 20px;
    }
    .logo-cell {
      width: 85px;
      text-align: center;
      vertical-align: middle;
    }
    .logo-cell img {
      width: 75px;
      height: 75px;
      object-fit: contain;
    }
    .header-text {
      text-align: center;
      vertical-align: middle;
    }
    .header-text h1 {
      margin: 0;
      font-size: 22px;
      color: #065f46;
      font-weight: 700;
    }
    .header-text p {
      margin: 2px 0 0 0;
      font-size: 13px;
      color: #475569;
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 16px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 8px;
    }
    .notice-title {
      text-align: center;
      background-color: #f8fafc;
      border: 1px solid #cbd5e1;
      padding: 10px;
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #047857;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }
    table.data-table th, table.data-table td {
      border: 1px solid #94a3b8;
      padding: 8px 10px;
      text-align: left;
    }
    table.data-table th {
      background-color: #f1f5f9;
      color: #1e293b;
      font-weight: bold;
      text-align: center;
    }
    .seal-block {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .qr-box {
      border: 1px solid #cbd5e1;
      padding: 6px;
      text-align: center;
      font-size: 11px;
      color: #64748b;
    }
    .sign-box {
      text-align: right;
      font-size: 13px;
    }
    .sign-line {
      width: 160px;
      border-bottom: 1px dashed #64748b;
      margin-bottom: 6px;
      margin-left: auto;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .page-sheet { border: none; box-shadow: none; margin: 0; padding: 20mm; page-break-after: always; }
    }
  </style>
</head>
<body>
  <div class="page-sheet">
    <div class="watermark">BANGLADESH OPEN UNIVERSITY</div>
    <table class="header-table">
      <tr>
        <td class="logo-cell">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdTIsaGi3AZ-nUJVme5sLzdp_3QiMfnNeQL7N9hGKIs-rsmQF2hwahholkKepUuxPmbUcykKboKAYoZoI8V1ncozrIuUXB5cjPsNbfsbj57A69951vEts_FevH0MDcvK0RlSLiKkHq0wolx5MS0Dz2gUY4emKgHPjH-1OFWi_RWmhQKUcGBpWaZVg2lAi5pk1rTIzk6798SuYv4EsXeupoi6_rzUDKr_He1nJXnlIdA5OiTPo6JSm0" alt="BOU Emblem" />
        </td>
        <td class="header-text">
          <p style="font-size:11px; color:#64748b; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px;">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত</p>
          <h1>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি)</h1>
          <p>রেজিস্ট্রার কার্যালয় • সংস্থাপন শাখা • বোর্ড বাজার, গাজীপুর-১৭০৫</p>
          <p style="font-size:12px; color:#047857; margin-top:2px;">ওয়েবসাইট: www.bou.ac.bd | নিয়োগ পোর্টাল: recruitment.bou.ac.bd</p>
        </td>
      </tr>
    </table>

    <div class="meta-bar">
      <span>স্মারক নং: ${memoNo}</span>
      <span>তারিখ: ১০ জানুয়ারি ২০২৫ খ্রি.</span>
    </div>

    <div class="notice-title">
      নিয়োগ বিজ্ঞপ্তি (প্রজ্ঞাপন নং: ০১/২০২৫)
    </div>

    <p style="font-size: 13.5px; text-align: justify; margin-bottom: 16px;">
      বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন অনুষদ, বিভাগ ও আঞ্চলিক কেন্দ্রে নিম্নবর্ণিত স্থায়ী শূন্য পদসমূহে সরাসরি জনবল নিয়োগের লক্ষ্যে উপযুক্ত ও প্রকৃত বাংলাদেশী নাগরিকদের নিকট থেকে নির্ধারিত অনলাইন ফরমে দরখাস্ত আহ্বান করা যাচ্ছে।
    </p>

    <table class="data-table">
      <thead>
        <tr>
          <th style="width: 5%;">ক্র.</th>
          <th style="width: 30%;">পদের নাম ও বিভাগ</th>
          <th style="width: 25%;">বেতন স্কেল (জাতীয় বেতন স্কেল ২০১৫)</th>
          <th style="width: 15%;">পদ সংখ্যা</th>
          <th style="width: 25%;">বয়সসীমা (০১/০৩/২০২৫ তারিখে)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">১.</td>
          <td><strong>সহকারী পরিচালক (আইসিটি ও সিস্টেমস)</strong><br/><span style="color:#64748b; font-size:11px;">কম্পিউটার ও তথ্যপ্রযুক্তি বিভাগ</span></td>
          <td>গ্রেড-৯ (২২,০০০ - ৫৩,০৬০/-)</td>
          <td style="text-align: center; font-weight:bold;">০৩ টি</td>
          <td>অনূর্ধ্ব ৩০ বছর (মুক্তিযোদ্ধা কোটায় ৩২ বছর)</td>
        </tr>
        <tr>
          <td style="text-align: center;">২.</td>
          <td><strong>সেকশন অফিসার (সাধারণ প্রশাসন)</strong><br/><span style="color:#64748b; font-size:11px;">রেজিস্ট্রার দপ্তর ও একাডেমিক শাখা</span></td>
          <td>গ্রেড-৯ (২২,০০০ - ৫৩,০৬০/-)</td>
          <td style="text-align: center; font-weight:bold;">০৫ টি</td>
          <td>অনূর্ধ্ব ৩০ বছর (বিভাগীয় প্রার্থীদের ক্ষেত্রে শিথিলযোগ্য)</td>
        </tr>
        <tr>
          <td style="text-align: center;">৩.</td>
          <td><strong>সহকারী হিসাবরক্ষণ কর্মকর্তা</strong><br/><span style="color:#64748b; font-size:11px;">অর্থ ও হিসাব বিভাগ</span></td>
          <td>গ্রেড-১০ (১৬,০০০ - ৩৮,৬৪০/-)</td>
          <td style="text-align: center; font-weight:bold;">০৩ টি</td>
          <td>অনূর্ধ্ব ৩০ বছর</td>
        </tr>
        <tr>
          <td style="text-align: center;">৪.</td>
          <td><strong>ডাটা এন্ট্রি / কম্পিউটার অপারেটর</strong><br/><span style="color:#64748b; font-size:11px;">পরীক্ষা বিভাগ ও আঞ্চলিক কার্যালয়সমূহ</span></td>
          <td>গ্রেড-১৬ (৯,৩০০ - ২২,৪৯০/-)</td>
          <td style="text-align: center; font-weight:bold;">০৫ টি</td>
          <td>১৮ হতে ৩০ বছর</td>
        </tr>
      </tbody>
    </table>

    <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 12px; font-size: 12.5px; border-radius: 4px; margin-bottom: 20px;">
      <strong>আবেদনের গুরুত্বপূর্ণ তারিখ:</strong><br/>
      • অনলাইন আবেদন গ্রহণ শুরু: ১৫ জানুয়ারি ২০২৫ (সকাল ১০:০০ ঘটিকা)<br/>
      • অনলাইন আবেদন দাখিলের শেষ সময়: <strong>১৫ মার্চ ২০২৫ (রাত ১১:৫৯ ঘটিকা)</strong><br/>
      • হার্ডকপি ও মূল পে-অর্ডার ডাকযোগে পৌঁছানোর শেষ সময়: ২০ মার্চ ২০২৫ (অফিস চলাকালীন)
    </div>

    <div class="seal-block">
      <div class="qr-box">
        <div style="font-weight:bold; font-size:10px; margin-bottom:3px; color:#047857;">VERIFIED GAZETTE</div>
        <div style="width:60px; height:60px; background:#e2e8f0; margin:0 auto; display:flex; align-items:center; justify-content:center; font-family:monospace; font-size:9px;">[QR CODE]</div>
        <div style="font-size:9px; margin-top:3px;">ID: BOU-2025-01</div>
      </div>
      <div class="sign-box">
        <div class="sign-line"></div>
        <strong>ড. মহা. শফিকুল আলম</strong><br/>
        রেজিস্ট্রার<br/>
        বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়
      </div>
    </div>
  </div>
</body>
</html>`;
};

export const CircularPdfViewerModal: React.FC<CircularPdfViewerModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  circularTitle = 'বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন প্রশাসনিক, হিসাব ও আইটি শূন্য পদসমূহে সরাসরি নিয়োগ প্রজ্ঞাপন',
  memoNo = 'BOU/ADMIN/2025/01'
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'canvas' | 'iframe'>('canvas');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalPages = 3;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        setCurrentPage(p => Math.min(totalPages, p + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage(p => Math.max(1, p - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, totalPages, onClose]);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(160, prev + 15));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(70, prev - 15));
  const handleResetZoom = () => setZoomLevel(100);
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);

    // Create a virtual download anchor
    const dummyBlob = new Blob([
      `Bangladesh Open University Official Circular ${memoNo}\nTitle: ${circularTitle}\nDate: 10 Jan 2025\nDeadline: 15 March 2025\nOfficial Portal: https://bou.ac.bd`
    ], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(dummyBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BOU_Official_Circular_${memoNo.replace(/\//g, '_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const iframeSrcDoc = generateCircularIframeDoc(memoNo);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className={`bg-card text-foreground rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border transition-all duration-300 ${
          isFullscreen 
            ? 'w-full h-full rounded-none' 
            : 'w-full max-w-6xl h-[92vh] max-h-[950px]'
        }`}
      >
        {/* Top PDF Control Toolbar */}
        <header className="px-4 py-3 bg-surface-subtle border-b border-border flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-error-muted flex items-center justify-center text-error shrink-0">
              <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xs sm:text-sm text-foreground truncate max-w-xs sm:max-w-md">
                  {circularTitle}
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-muted text-muted-foreground border border-border">
                  {memoNo}.pdf
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় • প্রাতিষ্ঠানিক ডিজিটাল গেজেট প্রিভিউয়ার
              </p>
            </div>
          </div>

          {/* Center Mode & Navigation Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle: Interactive Canvas vs Iframe Sandbox */}
            <div className="flex items-center bg-card p-0.5 rounded-lg border border-border text-xs">
              <button
                type="button"
                onClick={() => setViewMode('canvas')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  viewMode === 'canvas' 
                    ? 'bg-primary text-on-primary shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="সরাসরি ইন্টারঅ্যাক্টিভ পেপার ভিউ"
              >
                <span className="material-symbols-outlined text-[14px]">view_quilt</span>
                <span className="hidden sm:inline">ইন্টারঅ্যাক্টিভ</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('iframe')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                  viewMode === 'iframe' 
                    ? 'bg-primary text-on-primary shadow-xs' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="আইফ্রেম ব্রাউজার স্যান্ডবক্স ভিউ"
              >
                <span className="material-symbols-outlined text-[14px]">article</span>
                <span className="hidden sm:inline">আইফ্রেম প্রিভিউ</span>
              </button>
            </div>

            {/* Page Navigator (only in canvas mode) */}
            {viewMode === 'canvas' && (
              <div className="flex items-center bg-card px-2 py-1 rounded-lg border border-border text-xs gap-1.5">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-subtle disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="পূর্ববর্তী পৃষ্ঠা"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <span className="font-mono text-xs font-semibold px-1 text-foreground">
                  {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-subtle disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="পরবর্তী পৃষ্ঠা"
                >
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            )}

            {/* Zoom Controls */}
            {viewMode === 'canvas' && (
              <div className="hidden md:flex items-center bg-card px-1 py-1 rounded-lg border border-border text-xs gap-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-subtle cursor-pointer text-muted-foreground hover:text-foreground"
                  title="জুম আউট"
                >
                  <span className="material-symbols-outlined text-[16px]">remove</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="font-mono text-[11px] px-1 text-foreground hover:underline cursor-pointer"
                  title="জুম রিসেট"
                >
                  {zoomLevel}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-subtle cursor-pointer text-muted-foreground hover:text-foreground"
                  title="জুম ইন"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                </button>
                <button
                  type="button"
                  onClick={handleRotate}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-subtle cursor-pointer text-muted-foreground hover:text-foreground ml-1"
                  title="ঘোরান (Rotate 90°)"
                >
                  <span className="material-symbols-outlined text-[15px]">rotate_right</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: Download, Print, Fullscreen, Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-2xs cursor-pointer"
              title="অফিসিয়াল PDF ডাউনলোড করুন"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span className="hidden sm:inline">ডাউনলোড</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-card hover:bg-surface-subtle border border-border text-foreground text-xs font-medium cursor-pointer"
              title="প্রিন্ট করুন"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(prev => !prev)}
              className="p-1.5 rounded-lg bg-card hover:bg-surface-subtle border border-border text-muted-foreground hover:text-foreground cursor-pointer"
              title={isFullscreen ? 'সাধারণ ভিউ' : 'ফুলস্ক্রিন ভিউ'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-card hover:bg-error-muted hover:text-error border border-border text-muted-foreground transition-colors cursor-pointer"
              title="বন্ধ করুন (Esc)"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </header>

        {/* Download Success Alert Feedback */}
        {downloadSuccess && (
          <div className="bg-success text-white text-xs px-4 py-2 flex items-center justify-between shrink-0 animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>
                বিজ্ঞপ্তির অফিসিয়াল গেজেট PDF ({memoNo.replace(/\//g, '_')}.pdf) সফলভাবে তৈরি ও ডাউনলোড শুরু হয়েছে!
              </span>
            </div>
            <span className="text-[11px] opacity-80">ভেরিফাইড ডিজিটাল সংস্করণ</span>
          </div>
        )}

        {/* Main Body: Sidebar + Viewer Canvas */}
        <div className="flex-1 flex overflow-hidden bg-slate-900/10 dark:bg-black/40 relative">
          {/* Left Thumbnail Sidebar (Canvas mode only) */}
          {viewMode === 'canvas' && (
            <aside 
              className={`border-r border-border bg-card transition-all duration-200 shrink-0 flex flex-col ${
                sidebarOpen ? 'w-48 sm:w-56' : 'w-10'
              }`}
            >
              <div className="p-2 border-b border-border flex items-center justify-between text-xs font-medium text-muted-foreground">
                {sidebarOpen && <span>পৃষ্ঠা সূচি ({totalPages} টি পাতা)</span>}
                <button
                  type="button"
                  onClick={() => setSidebarOpen(s => !s)}
                  className="p-1 rounded hover:bg-surface-subtle text-muted-foreground hover:text-foreground cursor-pointer ml-auto"
                  title={sidebarOpen ? 'সাইডবার গুটিয়ে নিন' : 'সাইডবার খুলুন'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {sidebarOpen ? 'first_page' : 'last_page'}
                  </span>
                </button>
              </div>

              {sidebarOpen && (
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {[1, 2, 3].map((pageNo) => (
                    <div
                      key={pageNo}
                      onClick={() => setCurrentPage(pageNo)}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                        currentPage === pageNo
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs'
                          : 'border-border bg-surface-subtle hover:border-border/80'
                      }`}
                    >
                      <div className="w-full aspect-[1/1.3] bg-white rounded-md border border-slate-300 p-2 shadow-2xs overflow-hidden flex flex-col justify-between text-[7px] text-slate-700 select-none">
                        <div className="border-b border-slate-200 pb-1 text-center font-bold text-[8px] text-emerald-800">
                          বাউবি নিয়োগ গেজেট
                        </div>
                        <div className="space-y-1 my-1">
                          <div className="h-1 bg-slate-200 rounded w-full"></div>
                          <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                          <div className="h-1 bg-slate-200 rounded w-2/3"></div>
                          {pageNo === 1 && (
                            <div className="border border-slate-300 p-0.5 rounded text-[6px]">
                              পদ: সহকারী পরিচালক, সেকশন অফিসার...
                            </div>
                          )}
                          {pageNo === 2 && (
                            <div className="border border-slate-300 p-0.5 rounded text-[6px]">
                              শিক্ষাগত যোগ্যতা, অভিজ্ঞতা ও কোটা...
                            </div>
                          )}
                          {pageNo === 3 && (
                            <div className="border border-slate-300 p-0.5 rounded text-[6px]">
                              ব্যাংক পে-অর্ডার ও ডাকযোগে প্রেরণ...
                            </div>
                          )}
                        </div>
                        <div className="text-[6px] text-slate-400 text-right">পাতা {pageNo}</div>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-foreground">পৃষ্ঠা {pageNo}</span>
                        <span className="text-muted-foreground text-[10px]">
                          {pageNo === 1 ? 'পদের বিবরণ' : pageNo === 2 ? 'যোগ্যতা ও কোটা' : 'পে-অর্ডার ও শর্ত'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          )}

          {/* Central PDF Display Area */}
          <main className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center">
            {viewMode === 'iframe' ? (
              /* Embedded Iframe PDF Sandbox Preview */
              <div className="w-full h-full max-w-4xl bg-white rounded-xl shadow-xl border border-border overflow-hidden flex flex-col">
                <div className="bg-slate-800 text-white px-4 py-2 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
                    <span className="font-mono">iframe sandbox: BOU_OFFICIAL_GAZETTE_2025_01.pdf</span>
                  </div>
                  <span className="text-[10px] text-slate-400">আইফ্রেম সিকিউর প্রিভিউ মোড</span>
                </div>
                <iframe
                  title="BOU Job Circular PDF Frame"
                  srcDoc={iframeSrcDoc}
                  className="w-full flex-1 border-none bg-slate-100"
                  sandbox="allow-same-origin allow-scripts"
                />
              </div>
            ) : (
              /* High-Fidelity Interactive Gazette Canvas */
              <div 
                className="transition-transform duration-200 origin-top"
                style={{
                  transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`
                }}
              >
                {/* Official Paper Sheet (Page 1) */}
                {currentPage === 1 && (
                  <article className="w-[794px] min-h-[1123px] bg-white text-slate-900 p-12 rounded-lg shadow-2xl border border-slate-300 relative select-text">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <span className="text-[90px] font-bold text-emerald-950 uppercase rotate-[-35deg] tracking-widest text-center select-none leading-none">
                        BANGLADESH OPEN<br/>UNIVERSITY
                      </span>
                    </div>

                    {/* Official Letterhead */}
                    <div className="border-b-2 border-emerald-800 pb-5 mb-5 flex items-center justify-between gap-6">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdTIsaGi3AZ-nUJVme5sLzdp_3QiMfnNeQL7N9hGKIs-rsmQF2hwahholkKepUuxPmbUcykKboKAYoZoI8V1ncozrIuUXB5cjPsNbfsbj57A69951vEts_FevH0MDcvK0RlSLiKkHq0wolx5MS0Dz2gUY4emKgHPjH-1OFWi_RWmhQKUcGBpWaZVg2lAi5pk1rTIzk6798SuYv4EsXeupoi6_rzUDKr_He1nJXnlIdA5OiTPo6JSm0"
                        alt="BOU Emblem"
                        className="w-20 h-20 object-contain shrink-0"
                      />
                      <div className="text-center flex-1">
                        <span className="text-[11px] font-semibold tracking-wider text-slate-600 block uppercase">
                          গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত স্বায়ত্তশাসিত উচ্চশিক্ষা প্রতিষ্ঠান
                        </span>
                        <h1 className="text-2xl font-bold text-emerald-900 mt-0.5 font-serif">
                          বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়
                        </h1>
                        <p className="text-xs text-slate-700 font-medium">
                          রেজিস্ট্রার কার্যালয় • প্রশাসন ও সাধারণ মানবসম্পদ বিভাগ • বোর্ড বাজার, গাজীপুর-১৭০৫
                        </p>
                        <p className="text-[11px] text-emerald-700 font-mono mt-0.5">
                          www.bou.ac.bd | ইমেইল: info@bou.ac.bd
                        </p>
                      </div>
                      <div className="w-20 text-right">
                        <div className="inline-block p-1.5 border border-emerald-600 rounded bg-emerald-50 text-[10px] text-emerald-900 font-bold text-center">
                          গেজেট কপি<br/>২০২৫
                        </div>
                      </div>
                    </div>

                    {/* Circular Memo Header */}
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                      <span>স্মারক নম্বর: <span className="font-mono text-emerald-900 font-bold">{memoNo}</span></span>
                      <span>তারিখ: ১০ জানুয়ারি ২০২৫ খ্রি.</span>
                    </div>

                    {/* Notice Banner */}
                    <div className="bg-emerald-50/70 border border-emerald-300 p-3 text-center mb-6 rounded">
                      <h2 className="text-base font-bold text-emerald-950 font-serif">
                        নিয়োগ বিজ্ঞপ্তি (বিজ্ঞপ্তি নং: ০১/২০২৫)
                      </h2>
                      <p className="text-xs text-slate-700 mt-0.5">
                        প্রশাসনিক, আইসিটি ও হিসাব শাখার ১৬টি নিয়মিত শূন্যপদে জনবল নিয়োগ
                      </p>
                    </div>

                    {/* Editorial Preamble */}
                    <p className="text-xs leading-relaxed text-slate-800 text-justify mb-5 indent-6">
                      বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন অনুষদ, একাডেমিক বিভাগ, আঞ্চলিক কার্যালয় এবং কেন্দ্রীয় প্রশাসন দপ্তরের নিম্নলিখিত স্থায়ী শূন্য পদসমূহে সরাসরি নিয়োগের নিমিত্তে প্রয়োজনীয় শিক্ষাগত যোগ্যতা, বাস্তব অভিজ্ঞতা ও শর্তাবলি পূরণ সাপেক্ষে প্রকৃত বাংলাদেশী নাগরিকদের নিকট থেকে আবেদন আহ্বান করা যাচ্ছে।
                    </p>

                    {/* Vacancy Roster Table */}
                    <div className="mb-6 overflow-hidden border border-slate-400 rounded">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-800 border-b border-slate-400">
                            <th className="p-2.5 text-center font-bold border-r border-slate-400 w-10">ক্র.</th>
                            <th className="p-2.5 font-bold border-r border-slate-400">পদের নাম ও শাখা</th>
                            <th className="p-2.5 font-bold border-r border-slate-400 w-44">বেতন স্কেল (২০১৫)</th>
                            <th className="p-2.5 text-center font-bold border-r border-slate-400 w-20">পদসংখ্যা</th>
                            <th className="p-2.5 font-bold w-40">বয়সসীমা</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-300">
                          <tr className="hover:bg-emerald-50/40">
                            <td className="p-2 text-center font-medium border-r border-slate-300">১</td>
                            <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                              সহকারী পরিচালক (আইসিটি ও সিস্টেমস)
                              <span className="block text-[10px] text-slate-500 font-normal">কম্পিউটার ও তথ্যপ্রযুক্তি বিভাগ</span>
                            </td>
                            <td className="p-2 border-r border-slate-300 font-mono text-[11px]">
                              গ্রেড-৯ (২২,০০০ – ৫৩,০৬০/-)
                            </td>
                            <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৩ টি</td>
                            <td className="p-2 text-[11px]">অনূর্ধ্ব ৩০ বছর</td>
                          </tr>
                          <tr className="hover:bg-emerald-50/40">
                            <td className="p-2 text-center font-medium border-r border-slate-300">২</td>
                            <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                              সেকশন অফিসার (সাধারণ প্রশাসন)
                              <span className="block text-[10px] text-slate-500 font-normal">রেজিস্ট্রার কার্যালয়</span>
                            </td>
                            <td className="p-2 border-r border-slate-300 font-mono text-[11px]">
                              গ্রেড-৯ (২২,০০০ – ৫৩,০৬০/-)
                            </td>
                            <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৫ টি</td>
                            <td className="p-2 text-[11px]">অনূর্ধ্ব ৩০ বছর</td>
                          </tr>
                          <tr className="hover:bg-emerald-50/40">
                            <td className="p-2 text-center font-medium border-r border-slate-300">৩</td>
                            <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                              সহকারী হিসাবরক্ষণ কর্মকর্তা
                              <span className="block text-[10px] text-slate-500 font-normal">অর্থ ও হিসাব বিভাগ</span>
                            </td>
                            <td className="p-2 border-r border-slate-300 font-mono text-[11px]">
                              গ্রেড-১০ (১৬,০০০ – ৩৮,৬৪০/-)
                            </td>
                            <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৩ টি</td>
                            <td className="p-2 text-[11px]">অনূর্ধ্ব ৩০ বছর</td>
                          </tr>
                          <tr className="hover:bg-emerald-50/40">
                            <td className="p-2 text-center font-medium border-r border-slate-300">৪</td>
                            <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                              ডাটা এন্ট্রি / কম্পিউটার অপারেটর
                              <span className="block text-[10px] text-slate-500 font-normal">পরীক্ষা ও শিক্ষার্থী সেবা কেন্দ্র</span>
                            </td>
                            <td className="p-2 border-r border-slate-300 font-mono text-[11px]">
                              গ্রেড-১৬ (৯,৩০০ – ২২,৪৯০/-)
                            </td>
                            <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৫ টি</td>
                            <td className="p-2 text-[11px]">১৮ হতে ৩০ বছর</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Schedule Card */}
                    <div className="bg-slate-50 border border-slate-300 p-3.5 rounded text-xs space-y-1 mb-8">
                      <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                        <span>সময়সূচি ও গুরুত্বপূর্ণ সময়সীমা:</span>
                      </div>
                      <p>• আবেদনপত্র পূরণের শুরুর তারিখ: <strong>১৫ জানুয়ারি ২০২৫ খ্রি. (সকাল ১০:০০ টা)</strong></p>
                      <p>• অনলাইনে আবেদনপত্র দাখিলের শেষ তারিখ ও সময়: <strong>১৫ মার্চ ২০২৫ খ্রি. (রাত ১১:৫৯ টা)</strong></p>
                      <p>• ডাকযোগে মূল পে-অর্ডার ও লিগ্যাল সাইজ প্রিন্ট কপি পৌঁছানোর শেষ সময়: <strong>২০ মার্চ ২০২৫ খ্রি. (বিকেল ৫:০০ টা)</strong></p>
                    </div>

                    {/* Page 1 Bottom Pagination & Sign */}
                    <div className="absolute bottom-10 left-12 right-12 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় নিয়োগ বিজ্ঞপ্তি • স্মারক নং: {memoNo}</span>
                      <span className="font-semibold text-slate-700">পৃষ্ঠা ১ / ৩ (চলমান...)</span>
                    </div>
                  </article>
                )}

                {/* Official Paper Sheet (Page 2) */}
                {currentPage === 2 && (
                  <article className="w-[794px] min-h-[1123px] bg-white text-slate-900 p-12 rounded-lg shadow-2xl border border-slate-300 relative select-text">
                    <div className="border-b border-slate-300 pb-3 mb-5 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-semibold text-emerald-900">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি)</span>
                      <span>স্মারক: {memoNo}</span>
                    </div>

                    <h3 className="text-sm font-bold text-emerald-950 font-serif border-b-2 border-emerald-800 pb-1 mb-4">
                      ২. পদভিত্তিক শিক্ষাগত যোগ্যতা, অভিজ্ঞতা ও অন্যান্য শর্তাবলী
                    </h3>

                    <div className="space-y-4 text-xs">
                      {/* Post 1 */}
                      <div className="p-3 bg-slate-50 border border-slate-300 rounded">
                        <h4 className="font-bold text-emerald-900">
                          ১. সহকারী পরিচালক (আইসিটি ও সিস্টেমস) — গ্রেড-৯:
                        </h4>
                        <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-800">
                          <li>কোনো স্বীকৃত বিশ্ববিদ্যালয় হতে কম্পিউটার সায়েন্স / কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং (CSE) / ইনফরমেশন অ্যান্ড কমিউনিকেশন টেকনোলজি (ICT)-তে ন্যূনতম সিজিপিএ ৩.০০ (৪.০০ স্কেলে) সহ ৪ বছর মেয়াদী স্নাতক (সম্মান) বা সমমানের ডিগ্রি।</li>
                          <li>সফটওয়্যার ডেভেলপমেন্ট, ক্লাউড ডাটাবেজ অ্যাডমিনিস্ট্রেশন বা নেটওয়ার্কিংয়ে কমপক্ষে ৩ বছরের বাস্তব কাজের অভিজ্ঞতা থাকতে হবে।</li>
                          <li>শিক্ষাজীবনের কোনো স্তরে ৩য় বিভাগ বা সমমানের সিজিপিএ গ্রহণযোগ্য নহে।</li>
                        </ul>
                      </div>

                      {/* Post 2 */}
                      <div className="p-3 bg-slate-50 border border-slate-300 rounded">
                        <h4 className="font-bold text-emerald-900">
                          ২. সেকশন অফিসার (সাধারণ প্রশাসন) — গ্রেড-৯:
                        </h4>
                        <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-800">
                          <li>স্বীকৃত বিশ্ববিদ্যালয় হতে যেকোনো বিষয়ে ন্যূনতম ২য় শ্রেণি বা সিজিপিএ ২.৭৫ সহ ৪ বছর মেয়াদী স্নাতক (সম্মান) অথবা স্নাতকোত্তর ডিগ্রি।</li>
                          <li>কম্পিউটার টাইপিংয়ে (বাংলায় ২৫ শব্দ ও ইংরেজিতে ৩০ শব্দ প্রতি মিনিটে) দক্ষতা ও অফিস অ্যাপ্লিকেশনে সনদ থাকতে হবে।</li>
                          <li>বিশ্ববিদ্যালয় প্রশাসন বা স্বায়ত্তশাসিত প্রতিষ্ঠানে প্রশাসনিক কাজের পূর্ব অভিজ্ঞতা সম্পন্ন প্রার্থীদের অগ্রাধিকার প্রদান করা হবে।</li>
                        </ul>
                      </div>

                      {/* Post 3 */}
                      <div className="p-3 bg-slate-50 border border-slate-300 rounded">
                        <h4 className="font-bold text-emerald-900">
                          ৩. সহকারী হিসাবরক্ষণ কর্মকর্তা — গ্রেড-১০:
                        </h4>
                        <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-800">
                          <li>স্বীকৃত বিশ্ববিদ্যালয় হতে বাণিজ্য অনুষদে (হিসাববিজ্ঞান/ফাইন্যান্স) ন্যূনতম ২য় শ্রেণি বা সিজিপিএ ২.৭৫ সহ স্নাতক (সম্মান) ডিগ্রি।</li>
                          <li>ট্যালি (Tally), ইআরপি সফটওয়্যার এবং সরকারি পে-ফিক্সেশন ও পেনশন হিসাব সংক্রান্ত কাজে অভিজ্ঞদের অগ্রাধিকার দেওয়া হবে।</li>
                        </ul>
                      </div>

                      {/* Post 4 */}
                      <div className="p-3 bg-slate-50 border border-slate-300 rounded">
                        <h4 className="font-bold text-emerald-900">
                          ৪. ডাটা এন্ট্রি / কম্পিউটার অপারেটর — গ্রেড-১৬:
                        </h4>
                        <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-800">
                          <li>উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি) বা সমমানের পরীক্ষায় উত্তীর্ণ।</li>
                          <li>কম্পিউটার টাইপিংয়ে প্রতি মিনিটে সর্বনিম্ন গতি বাংলায় ২০ শব্দ এবং ইংরেজিতে ২৮ শব্দ থাকতে হবে। স্ট্যান্ডার্ড অ্যাপটিটিউড টেস্টে উত্তীর্ণ হওয়া বাধ্যতামূলক।</li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-emerald-950 font-serif border-b-2 border-emerald-800 pb-1 mt-6 mb-3">
                      ৩. বয়সসীমা নির্ধারণ ও সরকারি কোটা নীতি
                    </h3>
                    <div className="text-xs text-slate-800 space-y-2">
                      <p>
                        • <strong>কাট-অফ তারিখ:</strong> ০১ মার্চ ২০২৫ তারিখে প্রার্থীর বয়স সর্বনিম্ন ১৮ বছর এবং সর্বোচ্চ ৩০ বছরের মধ্যে হতে হবে।
                      </p>
                      <p>
                        • <strong>কোটা সুবিধা:</strong> বীর মুক্তিযোদ্ধা / শহীদ মুক্তিযোদ্ধার সন্তান এবং শারীরিক প্রতিবন্ধী প্রার্থীদের ক্ষেত্রে সর্বোচ্চ বয়সসীমা ৩২ বছর পর্যন্ত গ্রহণযোগ্য।
                      </p>
                      <p>
                        • <strong>বিভাগীয় প্রার্থী:</strong> বাউবিতে নিয়মিত চাকরিরত প্রার্থীদের ক্ষেত্রে কর্তৃপক্ষের অনুমোদনক্রমে আবেদন করতে হবে এবং বয়সসীমা সরকারি বিধি অনুযায়ী শিথিলযোগ্য।
                      </p>
                    </div>

                    {/* Page 2 Bottom Pagination */}
                    <div className="absolute bottom-10 left-12 right-12 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় নিয়োগ বিজ্ঞপ্তি • স্মারক নং: {memoNo}</span>
                      <span className="font-semibold text-slate-700">পৃষ্ঠা ২ / ৩ (চলমান...)</span>
                    </div>
                  </article>
                )}

                {/* Official Paper Sheet (Page 3) */}
                {currentPage === 3 && (
                  <article className="w-[794px] min-h-[1123px] bg-white text-slate-900 p-12 rounded-lg shadow-2xl border border-slate-300 relative select-text">
                    <div className="border-b border-slate-300 pb-3 mb-5 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-semibold text-emerald-900">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি)</span>
                      <span>স্মারক: {memoNo}</span>
                    </div>

                    <h3 className="text-sm font-bold text-emerald-950 font-serif border-b-2 border-emerald-800 pb-1 mb-3">
                      ৪. আবেদন ফি ও পে-অর্ডার / ব্যাংক ড্রাফট জমাদানের নিয়ম
                    </h3>
                    <div className="text-xs text-slate-800 space-y-2 mb-6">
                      <p>
                        • <strong>ফি-র পরিমাণ:</strong> ক্রমিক নং ১ ও ২ এ বর্ণিত পদের জন্য ১,০০০/- (এক হাজার) টাকা এবং ক্রমিক নং ৩ ও ৪ এ বর্ণিত পদের জন্য ৫০০/- (পাঁচশত) টাকা।
                      </p>
                      <p>
                        • <strong>প্রাপকের অনুকূল:</strong> যেকোনো তফসিলি ব্যাংক হতে <strong>"রেজিস্ট্রার, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়, গাজীপুর"</strong>-এর অনুকূলে প্রস্তুতকৃত ব্যাংক ড্রাফট বা পে-অর্ডারের মূল কপি দাখিল করতে হবে।
                      </p>
                      <p className="text-emerald-900 font-semibold bg-emerald-50 p-2 rounded border border-emerald-200">
                        • অনলাইনে কোনো বিকাশ, নগদ বা রকেটের মাধ্যমে ফি গ্রহণ করা হয় না। শুধুমাত্র অনুমোদিত ব্যাংকের পে-অর্ডার নম্বর আবেদন ফরমে এন্ট্রি করতে হবে।
                      </p>
                    </div>

                    <h3 className="text-sm font-bold text-emerald-950 font-serif border-b-2 border-emerald-800 pb-1 mb-3">
                      ৫. ডাকযোগে লিগ্যাল সাইজ প্রিন্ট কপি প্রেরণের বাধ্যতামূলক শর্তাবলী
                    </h3>
                    <div className="text-xs text-slate-800 space-y-2 mb-6">
                      <p>
                        ১. অনলাইনে সফলভাবে ফর্ম পূরণের পর প্রাপ্ত ৩ পৃষ্ঠার লিগ্যাল সাইজ আবেদনপত্রটি প্রিন্ট করতে হবে।
                      </p>
                      <p>
                        ২. প্রার্থীর সকল শিক্ষাগত সনদের সত্যায়িত কপি, অভিজ্ঞতার সনদ, জাতীয় পরিচয়পত্র, চারিত্রিক সনদ এবং মূল পে-অর্ডার স্লিপ আবেদনপত্রের সাথে পিন দিয়ে সংযুক্ত করতে হবে।
                      </p>
                      <p>
                        ৩. প্রেরণের খামের উপরে পদের নাম ও স্মারক নম্বর স্পষ্ট অক্ষরে লিখে আগামী ২০ মার্চ ২০২৫ তারিখ অফিস চলাকালীন (বিকাল ৫:০০ টা) সময়ের মধ্যে নিম্নলিখিত ঠিকানায় পৌঁছাতে হবে:
                      </p>
                      <div className="p-3 bg-slate-100 rounded border border-slate-300 font-medium">
                        বরাবর,<br/>
                        <strong>রেজিস্ট্রার</strong><br/>
                        বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি)<br/>
                        কেন্দ্রীয় ক্যাম্পাস, বোর্ড বাজার, গাজীপুর-১৭০৫, বাংলাদেশ।
                      </div>
                    </div>

                    {/* University Seal and Sign-off */}
                    <div className="pt-8 mt-6 border-t-2 border-slate-300 flex items-end justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 border border-slate-300 p-1 rounded bg-slate-50 flex items-center justify-center font-mono text-[9px] text-slate-500 text-center">
                          [অফিসিয়াল<br/>ডিজিটাল সিল]
                        </div>
                        <div className="text-[11px] text-slate-500">
                          যাচাইকৃত সংস্করণ<br/>
                          নিরাপত্তা আইডি: BOU-SEC-2025-891
                        </div>
                      </div>

                      <div className="text-right text-xs">
                        <div className="w-40 border-b border-dashed border-slate-400 mb-1 ml-auto"></div>
                        <strong className="block text-slate-900 font-serif text-sm">ড. মহা. শফিকুল আলম</strong>
                        <span className="block text-slate-700">রেজিস্ট্রার</span>
                        <span className="block text-slate-600 text-[11px]">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়</span>
                      </div>
                    </div>

                    {/* Page 3 Bottom Pagination */}
                    <div className="absolute bottom-10 left-12 right-12 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                      <span>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় নিয়োগ বিজ্ঞপ্তি • স্মারক নং: {memoNo}</span>
                      <span className="font-semibold text-emerald-800">পৃষ্ঠা ৩ / ৩ (সমাপ্ত)</span>
                    </div>
                  </article>
                )}
              </div>
            )}
          </main>
        </div>

        {/* Footer Bar with Action Triggers */}
        <footer className="px-5 py-3 bg-surface-subtle border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
            <span>অফিসিয়াল গেজেট ভিউয়ার • বাউবি প্রশাসন বিভাগ কর্তৃক প্রত্যয়িত প্রজ্ঞাপন</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-card hover:bg-muted text-foreground text-xs font-medium border border-border cursor-pointer transition-colors"
            >
              প্রিভিউ বন্ধ করুন
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigate('guide');
              }}
              className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
            >
              <span>অনলাইনে আবেদন করুন (Apply Now)</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
