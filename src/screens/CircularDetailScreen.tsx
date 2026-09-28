import React, { useState } from 'react';
import { ScreenId } from '../types';
import { CircularPdfViewerModal, generateCircularIframeDoc } from '../components/CircularPdfViewerModal';

interface CircularDetailScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const CircularDetailScreen: React.FC<CircularDetailScreenProps> = ({ onNavigate }) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1: small, 0: regular, 1: large, 2: xl
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [docViewMode, setDocViewMode] = useState<'editorial' | 'pdf_embed'>('editorial');
  const [embeddedPage, setEmbeddedPage] = useState<number>(1);
  const [embeddedZoom, setEmbeddedZoom] = useState<number>(100);
  const [embeddedIframeMode, setEmbeddedIframeMode] = useState<boolean>(false);

  const getBodyTextSizeClass = () => {
    switch (fontSizeLevel) {
      case -1:
        return 'text-xs sm:text-sm';
      case 1:
        return 'text-base sm:text-lg';
      case 2:
        return 'text-lg sm:text-xl';
      case 0:
      default:
        return 'text-sm sm:text-base';
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 3000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-surface-subtle pb-28 pt-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation - matches xpath: //nav//a[contains(., 'হোমপেজ')] */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap py-1">
          <a 
            className="hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer font-medium" 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            <span className="material-symbols-outlined text-[15px]">home</span>
            হোমপেজ
          </a>
          <span className="text-muted-foreground/60">/</span>
          <a 
            className="hover:text-foreground transition-colors cursor-pointer" 
            href="#circulars"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('circular');
            }}
          >
            নিয়োগ বিজ্ঞপ্তিসমূহ
          </a>
          <span className="text-muted-foreground/60">/</span>
          <span className="text-foreground font-medium bg-muted px-2 py-0.5 rounded border border-border">
            বিজ্ঞপ্তি নং: BOU/ADMIN/2025/01
          </span>
        </nav>

        {/* Main Document Card Shell */}
        <article className="bg-card rounded-lg shadow-sm border border-border overflow-hidden" id="reading-container">
          {/* Document Top Branding & Header */}
          <header className="p-6 sm:p-10 bg-surface-container-lowest border-b border-border">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <img 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain shrink-0 rounded-full p-1 bg-surface-subtle shadow-xs border border-border" 
                  alt="Official seal and institutional emblem of Bangladesh Open University" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdTIsaGi3AZ-nUJVme5sLzdp_3QiMfnNeQL7N9hGKIs-rsmQF2hwahholkKepUuxPmbUcykKboKAYoZoI8V1ncozrIuUXB5cjPsNbfsbj57A69951vEts_FevH0MDcvK0RlSLiKkHq0wolx5MS0Dz2gUY4emKgHPjH-1OFWi_RWmhQKUcGBpWaZVg2lAi5pk1rTIzk6798SuYv4EsXeupoi6_rzUDKr_He1nJXnlIdA5OiTPo6JSm0"
                />
                <div>
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold block">
                    গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত স্বায়ত্তশাসিত উচ্চশিক্ষা প্রতিষ্ঠান
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground mt-0.5 leading-snug">
                    বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি)
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 font-medium">
                    রেজিস্ট্রার কার্যালয় • প্রশাসন ও সাধারণ মানবসম্পদ বিভাগ • বোর্ড বাজার, গাজীপুর-১৭০৫
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-success-muted text-on-tertiary-fixed-variant border border-success/30">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                  আবেদন প্রক্রিয়া চলমান
                </span>
                <span className="text-[11px] text-muted-foreground font-mono">ভেরিফায়েড গেজেট সংস্করণ</span>
              </div>
            </div>

            {/* Document Title & Notice Header */}
            <div className="pt-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed uppercase tracking-wider inline-block mb-3 border border-secondary-fixed-dim">
                অফিসিয়াল নিয়োগ বিজ্ঞপ্তি ২০২৫
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-primary leading-relaxed">
                বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন প্রশাসনিক, হিসাব ও আইটি/কম্পিউটার শাখায় শূন্য পদসমূহে সরাসরি জনবল নিয়োগের আনুষ্ঠানিক প্রজ্ঞাপন
              </h2>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5 p-4 rounded-md bg-surface-subtle text-xs border border-border">
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium">স্মারক নম্বর:</span>
                  <span className="font-mono font-bold text-foreground mt-0.5 select-all">BOU/ADMIN/2025/01</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium">প্রকাশের তারিখ:</span>
                  <span className="font-bold text-foreground mt-0.5">১০ জানুয়ারি ২০২৫</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium">আবেদনের শেষ সময়:</span>
                  <span className="font-bold text-error mt-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">event_busy</span>
                    ১৫ মার্চ ২০২৫ (রাত ১১:৫৯)
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-muted-foreground font-medium">আবেদন ফি:</span>
                  <span className="font-bold text-foreground mt-0.5">১,০০০/- ও ৫০০/- টাকা</span>
                </div>
              </div>
            </div>

            {/* Quick Action Utility Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-4 text-xs border-t border-border/60">
              <div className="flex items-center gap-2 flex-wrap">
                <button 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-on-primary font-semibold hover:bg-primary-container transition-colors shadow-xs cursor-pointer" 
                  onClick={() => setIsPdfModalOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  অফিসিয়াল PDF প্রিভিউয়ার (গেজেট ভিউ)
                </button>
                <button 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-muted text-foreground font-medium hover:bg-surface-variant transition-colors shadow-xs cursor-pointer border border-border" 
                  onClick={() => setIsPdfModalOpen(true)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                  ডাউনলোড গেজেট PDF
                </button>
                <button 
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted text-foreground font-medium hover:bg-surface-variant transition-colors cursor-pointer border border-border" 
                  onClick={() => window.print()} 
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">print</span>
                  প্রিন্ট করুন
                </button>
                <button 
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-muted text-foreground font-medium hover:bg-surface-variant transition-colors cursor-pointer border border-border" 
                  onClick={handleShare} 
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  {copyFeedback ? 'লিঙ্ক কপি হয়েছে!' : 'শেয়ার লিঙ্ক'}
                </button>
              </div>

              {/* Text Resizer */}
              <div className="flex items-center gap-1 bg-muted p-0.5 rounded-md border border-border">
                <span className="text-[11px] px-2 text-muted-foreground font-medium">ফন্ট সাইজ:</span>
                <button 
                  aria-label="Decrease text size" 
                  className={`px-2 py-1 rounded shadow-xs text-foreground font-semibold cursor-pointer ${fontSizeLevel === -1 ? 'bg-primary text-on-primary' : 'bg-card hover:bg-surface'}`} 
                  onClick={() => setFontSizeLevel(-1)} 
                  type="button"
                >
                  A-
                </button>
                <button 
                  aria-label="Reset text size" 
                  className={`px-2 py-1 rounded shadow-xs text-foreground font-semibold cursor-pointer ${fontSizeLevel === 0 ? 'bg-primary text-on-primary' : 'bg-card hover:bg-surface'}`} 
                  onClick={() => setFontSizeLevel(0)} 
                  type="button"
                >
                  স্বাভাবিক
                </button>
                <button 
                  aria-label="Increase text size" 
                  className={`px-2 py-1 rounded shadow-xs text-foreground font-semibold cursor-pointer ${fontSizeLevel === 1 ? 'bg-primary text-on-primary' : 'bg-card hover:bg-surface'}`} 
                  onClick={() => setFontSizeLevel(1)} 
                  type="button"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Table of Contents / Quick Jump Anchor Pills */}
            <div className="mt-6 pt-5 border-t border-border/60">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                বিজ্ঞপ্তির সূচিপত্র (অন-পেজ নেভিগেশন):
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button 
                  className="px-3 py-1.5 rounded-md bg-surface-subtle text-foreground hover:bg-primary hover:text-on-primary transition-colors font-medium border border-border cursor-pointer" 
                  onClick={() => scrollToSection('sec-context')}
                >
                  ১. প্রাতিষ্ঠানিক প্রজ্ঞাপন
                </button>
                <button 
                  className="px-3 py-1.5 rounded-md bg-surface-subtle text-foreground hover:bg-primary hover:text-on-primary transition-colors font-medium border border-border cursor-pointer" 
                  onClick={() => scrollToSection('sec-positions')}
                >
                  ২. পদ ও শিক্ষাগত যোগ্যতা
                </button>
                <button 
                  className="px-3 py-1.5 rounded-md bg-surface-subtle text-foreground hover:bg-primary hover:text-on-primary transition-colors font-medium border border-border cursor-pointer" 
                  onClick={() => scrollToSection('sec-salary')}
                >
                  ৩. বেতন ও সুবিধাদি
                </button>
                <button 
                  className="px-3 py-1.5 rounded-md bg-surface-subtle text-foreground hover:bg-primary hover:text-on-primary transition-colors font-medium border border-border cursor-pointer" 
                  onClick={() => scrollToSection('sec-age-quota')}
                >
                  ৪. বয়সসীমা ও কোটা
                </button>
                <button 
                  className="px-3 py-1.5 rounded-md bg-surface-subtle text-foreground hover:bg-primary hover:text-on-primary transition-colors font-medium border border-border cursor-pointer" 
                  onClick={() => scrollToSection('sec-payorder')}
                >
                  ৫. আবেদন ফি ও পে-অর্ডার
                </button>
                <button 
                  className="px-3 py-1.5 rounded-md bg-surface-subtle text-foreground hover:bg-primary hover:text-on-primary transition-colors font-medium border border-border cursor-pointer" 
                  onClick={() => scrollToSection('sec-hardcopy')}
                >
                  ৬. হার্ডকপি প্রেরণ নির্দেশিকা
                </button>
              </div>
            </div>
          </header>

          {/* Document View Mode Switcher Bar */}
          <div className="bg-muted/60 px-6 sm:px-10 py-3 border-b border-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">display_settings</span>
                প্রদর্শন মোড:
              </span>
              <div className="bg-card p-0.5 rounded-lg border border-border inline-flex shadow-2xs">
                <button
                  type="button"
                  onClick={() => setDocViewMode('editorial')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    docViewMode === 'editorial'
                      ? 'bg-primary text-on-primary shadow-xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">article</span>
                  <span>ওয়েব পাঠ্য সংস্করণ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDocViewMode('pdf_embed')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    docViewMode === 'pdf_embed'
                      ? 'bg-primary text-on-primary shadow-xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
                  <span>এমবেডেড গেজেট PDF</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPdfModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-card hover:bg-surface-subtle text-foreground text-xs font-semibold border border-border transition-colors shadow-2xs cursor-pointer group"
              >
                <span className="material-symbols-outlined text-[16px] text-error group-hover:scale-110 transition-transform">open_in_full</span>
                <span>ফুলস্ক্রিন প্রিভিউ মডাল (Full Screen)</span>
              </button>
            </div>
          </div>

          {/* Main Content Area: Embedded PDF View or Editorial Web View */}
          {docViewMode === 'pdf_embed' ? (
            <div className="p-4 sm:p-8 bg-slate-900/5 dark:bg-black/30">
              {/* Embedded PDF Control Bar */}
              <div className="bg-card p-3 rounded-xl border border-border mb-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-error-muted text-error flex items-center justify-center font-bold shrink-0">
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-foreground font-mono">BOU_ADMIN_2025_01.pdf</span>
                      <span className="text-[10px] bg-muted px-1.5 py-0.2 rounded text-muted-foreground font-mono">৩.৪ MB</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">বাংলাদেশ গেজেট ও বাউবি প্রশাসন প্রত্যয়িত প্রজ্ঞাপন</span>
                  </div>
                </div>

                {/* Center Page Nav & View Toggle */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center bg-surface-subtle p-0.5 rounded-lg border border-border text-xs">
                    <button
                      type="button"
                      onClick={() => setEmbeddedIframeMode(false)}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                        !embeddedIframeMode ? 'bg-primary text-on-primary shadow-xs' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">view_quilt</span>
                      <span>ইন্টারঅ্যাক্টিভ শিট</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmbeddedIframeMode(true)}
                      className={`px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                        embeddedIframeMode ? 'bg-primary text-on-primary shadow-xs' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">article</span>
                      <span>আইফ্রেম ফ্রেম</span>
                    </button>
                  </div>

                  {!embeddedIframeMode && (
                    <div className="flex items-center bg-surface-subtle px-2 py-1 rounded-lg border border-border text-xs gap-1.5">
                      <button
                        type="button"
                        disabled={embeddedPage <= 1}
                        onClick={() => setEmbeddedPage(p => Math.max(1, p - 1))}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-card disabled:opacity-30 cursor-pointer"
                        title="পূর্ববর্তী পাতা"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                      </button>
                      <span className="font-mono text-xs font-semibold px-1 text-foreground">
                        পাতা {embeddedPage} / ৩
                      </span>
                      <button
                        type="button"
                        disabled={embeddedPage >= 3}
                        onClick={() => setEmbeddedPage(p => Math.min(3, p + 1))}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-card disabled:opacity-30 cursor-pointer"
                        title="পরবর্তী পাতা"
                      >
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                      </button>
                    </div>
                  )}

                  {!embeddedIframeMode && (
                    <div className="hidden sm:flex items-center bg-surface-subtle px-1.5 py-1 rounded-lg border border-border text-xs gap-1">
                      <button
                        type="button"
                        onClick={() => setEmbeddedZoom(z => Math.max(75, z - 15))}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-card text-muted-foreground hover:text-foreground cursor-pointer"
                        title="জুম আউট"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="text-[11px] font-mono px-1">{embeddedZoom}%</span>
                      <button
                        type="button"
                        onClick={() => setEmbeddedZoom(z => Math.min(130, z + 15))}
                        className="w-5 h-5 flex items-center justify-center rounded hover:bg-card text-muted-foreground hover:text-foreground cursor-pointer"
                        title="জুম ইন"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPdfModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-2xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">fullscreen</span>
                    <span>বড় পর্দায় দেখুন</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-1.5 rounded-lg bg-surface-subtle hover:bg-card border border-border text-muted-foreground hover:text-foreground cursor-pointer"
                    title="প্রিন্ট করুন"
                  >
                    <span className="material-symbols-outlined text-[16px]">print</span>
                  </button>
                </div>
              </div>

              {/* View Container: Iframe Sandbox or Interactive Page Sheet */}
              {embeddedIframeMode ? (
                <div className="w-full h-[700px] bg-white rounded-xl shadow-lg border border-border overflow-hidden flex flex-col">
                  <div className="bg-slate-800 text-white px-4 py-2 text-xs flex items-center justify-between">
                    <span className="font-mono text-[11px] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-emerald-400 text-[14px]">security</span>
                      sandboxed iframe: BOU_ADMIN_2025_01.pdf
                    </span>
                    <span className="text-[10px] text-slate-400">স্ক্রোল করে পূর্ণাঙ্গ প্রজ্ঞাপন পড়ুন</span>
                  </div>
                  <iframe
                    title="BOU Circular Embedded Frame"
                    srcDoc={generateCircularIframeDoc('BOU/ADMIN/2025/01')}
                    className="w-full flex-1 border-none bg-slate-100"
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              ) : (
                <div className="overflow-x-auto flex justify-center py-2">
                  <div 
                    className="transition-transform duration-200 origin-top shadow-xl rounded-lg border border-slate-300 bg-white text-slate-900 p-8 sm:p-12 w-[794px] min-h-[920px] relative select-text"
                    style={{ transform: `scale(${embeddedZoom / 100})` }}
                  >
                    {/* Page 1 */}
                    {embeddedPage === 1 && (
                      <div>
                        <div className="border-b-2 border-emerald-800 pb-5 mb-5 flex items-center justify-between gap-6">
                          <img 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdTIsaGi3AZ-nUJVme5sLzdp_3QiMfnNeQL7N9hGKIs-rsmQF2hwahholkKepUuxPmbUcykKboKAYoZoI8V1ncozrIuUXB5cjPsNbfsbj57A69951vEts_FevH0MDcvK0RlSLiKkHq0wolx5MS0Dz2gUY4emKgHPjH-1OFWi_RWmhQKUcGBpWaZVg2lAi5pk1rTIzk6798SuYv4EsXeupoi6_rzUDKr_He1nJXnlIdA5OiTPo6JSm0"
                            alt="BOU Emblem"
                            className="w-16 h-16 object-contain shrink-0"
                          />
                          <div className="text-center flex-1">
                            <span className="text-[10px] font-semibold tracking-wider text-slate-600 block uppercase">
                              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত স্বায়ত্তশাসিত উচ্চশিক্ষা প্রতিষ্ঠান
                            </span>
                            <h1 className="text-xl font-bold text-emerald-900 mt-0.5 font-serif">
                              বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়
                            </h1>
                            <p className="text-xs text-slate-700 font-medium">
                              রেজিস্ট্রার কার্যালয় • প্রশাসন ও সাধারণ মানবসম্পদ বিভাগ • বোর্ড বাজার, গাজীপুর-১৭০৫
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block p-1 border border-emerald-600 rounded bg-emerald-50 text-[9px] text-emerald-900 font-bold">
                              গেজেট কপি ২০২৫
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-4">
                          <span>স্মারক নং: <span className="font-mono text-emerald-900 font-bold">BOU/ADMIN/2025/01</span></span>
                          <span>তারিখ: ১০ জানুয়ারি ২০২৫ খ্রি.</span>
                        </div>

                        <div className="bg-emerald-50/70 border border-emerald-300 p-2.5 text-center mb-5 rounded">
                          <h2 className="text-sm font-bold text-emerald-950 font-serif">
                            নিয়োগ বিজ্ঞপ্তি (বিজ্ঞপ্তি নং: ০১/২০২৫)
                          </h2>
                          <p className="text-[11px] text-slate-700 mt-0.5">
                            প্রশাসনিক, আইসিটি ও হিসাব শাখার ১৬টি নিয়মিত শূন্যপদে সরাসরি জনবল নিয়োগ
                          </p>
                        </div>

                        <p className="text-xs leading-relaxed text-slate-800 text-justify mb-4 indent-6">
                          বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন অনুষদ, একাডেমিক বিভাগ, আঞ্চলিক কার্যালয় এবং কেন্দ্রীয় প্রশাসন দপ্তরের নিম্নলিখিত স্থায়ী শূন্য পদসমূহে সরাসরি নিয়োগের নিমিত্তে প্রয়োজনীয় শিক্ষাগত যোগ্যতা, বাস্তব অভিজ্ঞতা ও শর্তাবলি পূরণ সাপেক্ষে প্রকৃত বাংলাদেশী নাগরিকদের নিকট থেকে আবেদন আহ্বান করা যাচ্ছে।
                        </p>

                        <div className="mb-5 overflow-hidden border border-slate-400 rounded text-xs">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-100 text-slate-800 border-b border-slate-400">
                                <th className="p-2 text-center font-bold border-r border-slate-400 w-8">ক্র.</th>
                                <th className="p-2 font-bold border-r border-slate-400">পদের নাম ও শাখা</th>
                                <th className="p-2 font-bold border-r border-slate-400 w-40">বেতন স্কেল (২০১৫)</th>
                                <th className="p-2 text-center font-bold border-r border-slate-400 w-16">পদসংখ্যা</th>
                                <th className="p-2 font-bold w-36">বয়সসীমা</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-300 text-[11px]">
                              <tr>
                                <td className="p-2 text-center font-medium border-r border-slate-300">১</td>
                                <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                                  সহকারী পরিচালক (আইসিটি ও সিস্টেমস)
                                  <span className="block text-[10px] text-slate-500 font-normal">কম্পিউটার ও তথ্যপ্রযুক্তি বিভাগ</span>
                                </td>
                                <td className="p-2 border-r border-slate-300 font-mono">গ্রেড-৯ (২২,০০০ – ৫৩,০৬০/-)</td>
                                <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৩ টি</td>
                                <td className="p-2">অনূর্ধ্ব ৩০ বছর</td>
                              </tr>
                              <tr>
                                <td className="p-2 text-center font-medium border-r border-slate-300">২</td>
                                <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                                  সেকশন অফিসার (সাধারণ প্রশাসন)
                                  <span className="block text-[10px] text-slate-500 font-normal">রেজিস্ট্রার কার্যালয়</span>
                                </td>
                                <td className="p-2 border-r border-slate-300 font-mono">গ্রেড-৯ (২২,০০০ – ৫৩,০৬০/-)</td>
                                <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৫ টি</td>
                                <td className="p-2">অনূর্ধ্ব ৩০ বছর</td>
                              </tr>
                              <tr>
                                <td className="p-2 text-center font-medium border-r border-slate-300">৩</td>
                                <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                                  সহকারী হিসাবরক্ষণ কর্মকর্তা
                                  <span className="block text-[10px] text-slate-500 font-normal">অর্থ ও হিসাব বিভাগ</span>
                                </td>
                                <td className="p-2 border-r border-slate-300 font-mono">গ্রেড-১০ (১৬,০০০ – ৩৮,৬৪০/-)</td>
                                <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৩ টি</td>
                                <td className="p-2">অনূর্ধ্ব ৩০ বছর</td>
                              </tr>
                              <tr>
                                <td className="p-2 text-center font-medium border-r border-slate-300">৪</td>
                                <td className="p-2 border-r border-slate-300 font-semibold text-emerald-950">
                                  ডাটা এন্ট্রি / কম্পিউটার অপারেটর
                                  <span className="block text-[10px] text-slate-500 font-normal">পরীক্ষা ও শিক্ষার্থী সেবা কেন্দ্র</span>
                                </td>
                                <td className="p-2 border-r border-slate-300 font-mono">গ্রেড-১৬ (৯,৩০০ – ২২,৪৯০/-)</td>
                                <td className="p-2 text-center font-bold text-emerald-800 border-r border-slate-300">০৫ টি</td>
                                <td className="p-2">১৮ হতে ৩০ বছর</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="bg-slate-50 border border-slate-300 p-3 rounded text-xs space-y-1">
                          <p>• অনলাইন আবেদন দাখিলের শেষ সময়: <strong>১৫ মার্চ ২০২৫ খ্রি. (রাত ১১:৫৯ টা)</strong></p>
                          <p>• হার্ডকপি পৌঁছানোর শেষ সময়: <strong>২০ মার্চ ২০২৫ খ্রি. (বিকেল ৫:০০ টা)</strong></p>
                        </div>
                      </div>
                    )}

                    {/* Page 2 */}
                    {embeddedPage === 2 && (
                      <div>
                        <div className="border-b border-slate-300 pb-2 mb-4 flex items-center justify-between text-xs text-slate-600">
                          <span className="font-semibold text-emerald-900">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় • পৃষ্ঠা ২</span>
                          <span>স্মারক: BOU/ADMIN/2025/01</span>
                        </div>
                        <h3 className="text-sm font-bold text-emerald-950 font-serif border-b-2 border-emerald-800 pb-1 mb-3">
                          ২. শিক্ষাগত যোগ্যতা ও অভিজ্ঞতার শর্তাবলী
                        </h3>
                        <div className="space-y-3 text-xs text-slate-800">
                          <div className="p-2.5 bg-slate-50 rounded border border-slate-300">
                            <strong>১. সহকারী পরিচালক (আইসিটি ও সিস্টেমস) — গ্রেড-৯:</strong>
                            <p className="mt-1">কম্পিউটার সায়েন্স / সিএসই / আইসিটিতে ন্যূনতম সিজিপিএ ৩.০০ সহ ৪ বছর মেয়াদী স্নাতক। ৩ বছরের বাস্তব কাজের অভিজ্ঞতা।</p>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded border border-slate-300">
                            <strong>২. সেকশন অফিসার (সাধারণ প্রশাসন) — গ্রেড-৯:</strong>
                            <p className="mt-1">যেকোনো বিষয়ে ন্যূনতম ২য় শ্রেণি বা সিজিপিএ ২.৭৫ সহ স্নাতক (সম্মান)/স্নাতকোত্তর ডিগ্রি। কম্পিউটার টাইপিংয়ে বাংলায় ২৫ ও ইংরেজিতে ৩০ শব্দ গতি।</p>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded border border-slate-300">
                            <strong>৩. সহকারী হিসাবরক্ষণ কর্মকর্তা — গ্রেড-১০:</strong>
                            <p className="mt-1">হিসাববিজ্ঞান/ফাইন্যান্সে ন্যূনতম ২য় শ্রেণি বা সিজিপিএ ২.৭৫ সহ স্নাতক ডিগ্রি। ইআরপি ও সরকারি পে-ফিক্সেশনে অভিজ্ঞদের অগ্রাধিকার।</p>
                          </div>
                          <div className="p-2.5 bg-slate-50 rounded border border-slate-300">
                            <strong>৪. ডাটা এন্ট্রি / কম্পিউটার অপারেটর — গ্রেড-১৬:</strong>
                            <p className="mt-1">এইচএসসি বা সমমান পাস। টাইপিং গতি বাংলায় ২০ ও ইংরেজিতে ২৮ শব্দ প্রতি মিনিটে।</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Page 3 */}
                    {embeddedPage === 3 && (
                      <div>
                        <div className="border-b border-slate-300 pb-2 mb-4 flex items-center justify-between text-xs text-slate-600">
                          <span className="font-semibold text-emerald-900">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় • পৃষ্ঠা ৩</span>
                          <span>স্মারক: BOU/ADMIN/2025/01</span>
                        </div>
                        <h3 className="text-sm font-bold text-emerald-950 font-serif border-b-2 border-emerald-800 pb-1 mb-3">
                          ৩. আবেদন ফি ও হার্ডকপি প্রেরণ নির্দেশিকা
                        </h3>
                        <div className="space-y-3 text-xs text-slate-800">
                          <p>• <strong>আবেদন ফি:</strong> ১ম ও ২য় পদের জন্য ১,০০০/- টাকা, ৩য় ও ৪র্থ পদের জন্য ৫০০/- টাকা।</p>
                          <p>• <strong>প্রাপকের অনুকূল:</strong> যেকোনো তফসিলি ব্যাংক থেকে "রেজিস্ট্রার, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়, গাজীপুর"-এর অনুকূলে পে-অর্ডার / ব্যাংক ড্রাফট করতে হবে।</p>
                          <p>• <strong>ডাকযোগের ঠিকানা:</strong> রেজিস্ট্রার, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি), বোর্ড বাজার, গাজীপুর-১৭০৫। খামের উপর পদের নাম ও স্মারক স্পষ্টভাবে লিখুন।</p>
                        </div>

                        <div className="pt-8 mt-6 border-t-2 border-slate-300 flex items-end justify-between">
                          <div className="text-[10px] text-slate-500 font-mono">
                            যাচাইকৃত গেজেট সংস্করণ<br/>
                            ID: BOU-SEC-2025-891
                          </div>
                          <div className="text-right text-xs">
                            <strong className="block text-slate-900">ড. মহা. শফিকুল আলম</strong>
                            <span className="block text-slate-700">রেজিস্ট্রার</span>
                            <span className="block text-slate-600 text-[11px]">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Pagination Indicator */}
                    <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500">
                      <span>BOU Official Gazette • BOU/ADMIN/2025/01</span>
                      <span className="font-semibold">পৃষ্ঠা {embeddedPage} / ৩</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick action beneath embedded viewer */}
              <div className="mt-6 p-4 rounded-xl bg-card border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-foreground">বিজ্ঞপ্তিটি পর্যালোচনা সম্পন্ন হয়েছে?</h4>
                    <p className="text-xs text-muted-foreground">অনলাইনে আবেদনপত্র পূরণ করতে বা প্রস্তুতি নির্দেশিকা দেখতে এগিয়ে যান।</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => onNavigate('guide')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>আবেদন শুরু করুন</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Main Editorial Longform Content Body */
            <main className={`p-6 sm:p-10 space-y-12 text-foreground/90 font-normal leading-relaxed ${getBodyTextSizeClass()}`} id="doc-body">
            {/* Section 1: প্রাতিষ্ঠানিক প্রজ্ঞাপন ও প্রেক্ষাপট */}
            <section className="scroll-mt-24 space-y-4" id="sec-context">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">০১</span>
                <h3 className="text-base sm:text-lg font-bold text-primary">প্রাতিষ্ঠানিক প্রজ্ঞাপন ও সারসংক্ষেপ</h3>
              </div>
              <p className="text-justify leading-relaxed">
                বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় আইন ১৯৯২ (১৯৯২ সনের ৩৮ নং আইন) এর ধারা এবং সংবিধি মোতাবেক বাউবি-এর কেন্দ্রীয় প্রশাসন, আঞ্চলিক ও উপ-আঞ্চলিক কেন্দ্রসমূহের দাপ্তরিক ও একাডেমিক কার্যক্রম সুষ্ঠুভাবে পরিচালনার লক্ষ্যে নিম্নবর্ণিত স্থায়ী ও অস্থায়ী রাজস্ব খাতে সৃজিত শূন্য পদসমূহে সরাসরি নিয়োগের জন্য বাংলাদেশের প্রকৃত ও স্থায়ী নাগরিকদের নিকট থেকে দরখাস্ত আহ্বান করা যাচ্ছে।
              </p>
              <div className="p-4 rounded-md bg-surface-subtle text-xs sm:text-sm text-foreground space-y-2 border border-border">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">verified_user</span>
                  <p>
                    <strong>কর্তৃপক্ষের অনুমোদন নোট:</strong> মহামান্য রাষ্ট্রপতি ও চ্যান্সেলরের মনোনীত সিন্ডিকেটের ২০৪তম জরুরি সভার সিদ্ধান্তক্রমে এবং বাউবি অর্গানোগ্রাম রিভিউ কমিটির সুপারিশ অনুযায়ী এই নিয়োগ কার্যক্রম সম্পূর্ণ মেধাভিত্তিক, স্বচ্ছ ও বিধি অনুযায়ী পরিচালিত হবে। কোনো প্রকার ব্যক্তিগত সুপারিশ বা অসদুপায় প্রার্থীকে অযোগ্য হিসেবে গণ্য করবে।
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: পদ ও শিক্ষাগত যোগ্যতার বিবরণ */}
            <section className="scroll-mt-24 space-y-6" id="sec-positions">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">০২</span>
                  <h3 className="text-base sm:text-lg font-bold text-primary">পদের নাম, পদসংখ্যা, বেতন স্কেল ও শিক্ষাগত যোগ্যতা</h3>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded border border-border">
                  মোট পদ: ৪টি (শূন্যপদ ১৬টি)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                প্রতিটি পদের ক্ষেত্রে নির্ধারিত শিক্ষাগত যোগ্যতা ও পেশাগত অভিজ্ঞতা আবশ্যক। আবেদনকারীকে অনলাইনে আবেদন করার পূর্বে আবশ্যকীয় যোগ্যতার শর্তসমূহ মনোযোগ সহকারে যাচাই করার অনুরোধ করা হলো।
              </p>

              {/* Table of Positions */}
              <div className="overflow-x-auto rounded-lg shadow-xs border border-border">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-surface-subtle text-muted-foreground font-semibold uppercase text-[11px] tracking-wider border-b border-border">
                      <th className="p-3.5 text-center w-12 border-r border-border">ক্র.</th>
                      <th className="p-3.5 border-r border-border">পদের নাম ও গ্রেড</th>
                      <th className="p-3.5 border-r border-border text-center">পদসংখ্যা</th>
                      <th className="p-3.5 border-r border-border">জাতীয় বেতন স্কেল ২০১৫</th>
                      <th className="p-3.5">নূন্যতম শিক্ষাগত যোগ্যতা ও অভিজ্ঞতা</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border text-foreground">
                    {/* Post 1 */}
                    <tr className="hover:bg-surface-subtle/60 transition-colors">
                      <td className="p-3.5 font-bold text-center border-r border-border">১</td>
                      <td className="p-3.5 border-r border-border">
                        <div className="font-bold text-primary">সেকশন অফিসার</div>
                        <span className="text-[11px] text-muted-foreground block">প্রশাসন ও পরীক্ষা শাখা (গ্রেড-০৯)</span>
                      </td>
                      <td className="p-3.5 font-semibold text-center whitespace-nowrap border-r border-border">৩ (তিন) টি</td>
                      <td className="p-3.5 font-mono border-r border-border">২২,০০০ - ৫৩,০৬০/-</td>
                      <td className="p-3.5 leading-relaxed">
                        কোনো স্বীকৃত বিশ্ববিদ্যালয় হতে যেকোনো বিষয়ে ৪ (চার) বছর মেয়াদী নূন্যতম দ্বিতীয় শ্রেণি বা সমমানের সিজিপিএ (ন্যূনতম ৩.০০/৪.০০) সহ স্নাতক (সম্মান) অথবা স্নাতকোত্তর ডিগ্রি। শিক্ষা জীবনের কোনো স্তরে তৃতীয় বিভাগ/শ্রেণি বা সমমানের জিপিএ গ্রহণযোগ্য নহে। প্রশাসনিক কাজে অভিজ্ঞতাসম্পন্ন প্রার্থীদের অগ্রাধিকার প্রদান করা হবে।
                      </td>
                    </tr>
                    {/* Post 2 */}
                    <tr className="hover:bg-surface-subtle/60 transition-colors">
                      <td className="p-3.5 font-bold text-center border-r border-border">২</td>
                      <td className="p-3.5 border-r border-border">
                        <div className="font-bold text-primary">সহকারী একাউন্টস অফিসার</div>
                        <span className="text-[11px] text-muted-foreground block">অর্থ ও হিসাব বিভাগ (গ্রেড-০৯)</span>
                      </td>
                      <td className="p-3.5 font-semibold text-center whitespace-nowrap border-r border-border">২ (দুই) টি</td>
                      <td className="p-3.5 font-mono border-r border-border">২২,০০০ - ৫৩,০৬০/-</td>
                      <td className="p-3.5 leading-relaxed">
                        কোনো স্বীকৃত বিশ্ববিদ্যালয় হতে হিসাববিজ্ঞান অথবা ফিন্যান্স বিষয়ে স্নাতক (সম্মান) সহ এম.কম / এমবিএ ডিগ্রি। প্রার্থীদের সকল পাবলিক পরীক্ষায় নূন্যতম দ্বিতীয় বিভাগ/শ্রেণি থাকতে হবে। স্বয়ংক্রিয় অ্যাকাউন্টিং সফটওয়্যার ও ট্যালি ইআরপি চালনায় পারদর্শী হতে হবে।
                      </td>
                    </tr>
                    {/* Post 3 */}
                    <tr className="hover:bg-surface-subtle/60 transition-colors">
                      <td className="p-3.5 font-bold text-center border-r border-border">৩</td>
                      <td className="p-3.5 border-r border-border">
                        <div className="font-bold text-primary">প্রশাসনিক কর্মকর্তা</div>
                        <span className="text-[11px] text-muted-foreground block">আঞ্চলিক সেবা বিভাগ (গ্রেড-১০)</span>
                      </td>
                      <td className="p-3.5 font-semibold text-center whitespace-nowrap border-r border-border">৫ (পাঁচ) টি</td>
                      <td className="p-3.5 font-mono border-r border-border">১৬,০০০ - ৩৮,৬৪০/-</td>
                      <td className="p-3.5 leading-relaxed">
                        স্বীকৃত বিশ্ববিদ্যালয় হতে যেকোনো ডিসিপ্লিনে দ্বিতীয় শ্রেণির স্নাতক (পাস) অথবা সমমানের সিজিপিএ সহ স্নাতকোত্তর ডিগ্রি। কম্পিউটার অ্যাপ্লিকেশন প্যাকেজ (MS Word, Excel, Emailing) চালনায় সরকারি অনুমোদিত প্রতিষ্ঠান হতে নূন্যতম ৬ মাসের ডিপ্লোমা থাকতে হবে।
                      </td>
                    </tr>
                    {/* Post 4 */}
                    <tr className="hover:bg-surface-subtle/60 transition-colors">
                      <td className="p-3.5 font-bold text-center border-r border-border">৪</td>
                      <td className="p-3.5 border-r border-border">
                        <div className="font-bold text-primary">অফিস সহকারী কাম কম্পিউটার মুদ্রাক্ষরিক</div>
                        <span className="text-[11px] text-muted-foreground block">সাধারণ পুল (গ্রেড-১৬)</span>
                      </td>
                      <td className="p-3.5 font-semibold text-center whitespace-nowrap border-r border-border">৬ (ছয়) টি</td>
                      <td className="p-3.5 font-mono border-r border-border">৯,৩০০ - ২২,৪৯০/-</td>
                      <td className="p-3.5 leading-relaxed">
                        উচ্চ মাধ্যমিক সার্টিফিকেট (এইচএসসি) বা সমমানের পরীক্ষায় নূন্যতম দ্বিতীয় বিভাগ বা জিপিএ ২.৫০ পেয়ে উত্তীর্ণ। কম্পিউটার ব্যবহারের ক্ষেত্রে টাইপিংয়ে প্রতি মিনিটে বাংলায় নূন্যতম ২০ শব্দ এবং ইংরেজিতে নূন্যতম ৩০ শব্দের গতি সম্পন্ন হতে হবে এবং ব্যবহারিক পরীক্ষায় উত্তীর্ণ হতে হবে।
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Qualification Checklist Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-md bg-surface-subtle space-y-2 text-xs border border-border">
                  <span className="font-bold text-foreground flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">school</span>
                    সিজিপিএ সমমান রূপান্তর নির্দেশিকা:
                  </span>
                  <p className="text-muted-foreground">
                    এসএসসি/এইচএসসি ও বিশ্ববিদ্যালয় পর্যায়ের গ্রেডিং পদ্ধতির ক্ষেত্রে বাংলাদেশ বিশ্ববিদ্যালয় মঞ্জুরী কমিশন (UGC) এবং শিক্ষা মন্ত্রণালয় কর্তৃক নির্ধারিত স্কেল হুবহু অনুসরণ করা হবে:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-1">
                    <li>৪.০০ স্কেলে ৩.০০ বা তদূর্ধ্ব = প্রথম শ্রেণি/বিভাগ</li>
                    <li>৪.০০ স্কেলে ২.২৫ থেকে ২.৯৯ = দ্বিতীয় শ্রেণি/বিভাগ</li>
                    <li>৫.০০ স্কেলে ৩.৭৫ বা তদূর্ধ্ব = প্রথম বিভাগ</li>
                  </ul>
                </div>

                <div className="p-4 rounded-md bg-surface-subtle space-y-2 text-xs border border-border">
                  <span className="font-bold text-foreground flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">laptop_chromebook</span>
                    কম্পিউটার টাইপিং ও আইটি পরীক্ষা:
                  </span>
                  <p className="text-muted-foreground">
                    ১৬তম গ্রেডের পদের জন্য লিখিত পরীক্ষায় উত্তীর্ণ প্রার্থীদের সরাসরি কম্পিউটার ল্যাবে ব্যবহারিক পরীক্ষায় অংশ নিতে হবে:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-foreground/80 pl-1">
                    <li>বাংলা কিবোর্ড লেআউট: ‘বিজয় বা অভ্র ইউনিকোড’ স্ট্যান্ডার্ড</li>
                    <li>টাইপিং স্পিড টেস্ট সময়কাল: ৫ মিনিট</li>
                    <li>নির্ভুলতার নূন্যতম মাত্রা: ৯৫% সঠিক শব্দ গঠন</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: বেতন স্কেল ও আর্থিক সুবিধাদি */}
            <section className="scroll-mt-24 space-y-4" id="sec-salary">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">০৩</span>
                <h3 className="text-base sm:text-lg font-bold text-primary">বেতন স্কেল, ভাতা ও সার্ভিস পলিসি</h3>
              </div>
              <p className="text-justify leading-relaxed">
                নিয়োগপ্রাপ্ত কর্মকর্তাদের গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের ‘জাতীয় বেতন স্কেল ২০১৫’ অনুযায়ী মূল বেতন ও সংশ্লিষ্ট গ্রেডের প্রাপ্য সুবিধাদি প্রদান করা হবে। এছাড়াও বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় চাকরি বিধিমালা অনুযায়ী অন্যান্য ভাতাদি প্রাপ্ত হবেন:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded bg-surface-subtle border border-border">
                  <span className="font-bold text-foreground block mb-1">ভাতা ও সুবিধাসমূহ</span>
                  <p className="text-muted-foreground">বাড়ি ভাড়া ভাতা (কর্মস্থল অনুযায়ী ৫০%-৬৫%), চিকিৎসা ভাতা মাসিক ১,৫০০/-, শিক্ষা সহায়ক ভাতা এবং বাংলা নববর্ষ ও বার্ষিক ২টি উৎসব বোনাস।</p>
                </div>
                <div className="p-3.5 rounded bg-surface-subtle border border-border">
                  <span className="font-bold text-foreground block mb-1">ভবিষ্য তহবিল ও গ্র্যাচুইটি</span>
                  <p className="text-muted-foreground">চাকরি স্থায়ীকরণ সাপেক্ষে সাধারণ ভবিষ্য তহবিল (GPF) সুবিধা এবং অবসরে সরকারের পেনশন/গ্র্যাচুইটি নীতিমালার বিধানসমূহ প্রযোজ্য হবে।</p>
                </div>
                <div className="p-3.5 rounded bg-surface-subtle border border-border">
                  <span className="font-bold text-foreground block mb-1">আবাসিক কোয়ার্টার</span>
                  <p className="text-muted-foreground">গাজীপুর মূল ক্যাম্পাসে দায়িত্ব পালনকারীদের ক্ষেত্রে প্রাপ্যতা সাপেক্ষে সুসজ্জিত আবাসিক কোয়ার্টার বরাদ্দ দেওয়া হতে পারে।</p>
                </div>
              </div>
            </section>

            {/* Section 4: বয়সসীমা ও কোটা সংক্রান্ত বিধিমালা */}
            <section className="scroll-mt-24 space-y-4" id="sec-age-quota">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">০৪</span>
                <h3 className="text-base sm:text-lg font-bold text-primary">বয়সসীমা ও কোটা সংক্রান্ত সরকারি বিধিমালা</h3>
              </div>
              <div className="space-y-3">
                <p>
                  <strong>বয়স গণনা ও কাট-অফ তারিখ:</strong> আবেদনকারীর বয়স আগামী <strong>১৫ মার্চ ২০২৫</strong> তারিখে নূন্যতম ১৮ (আঠারো) এবং অনূর্ধ্ব ৩০ (ত্রিশ) বছরের মধ্যে হতে হবে। বয়স প্রমাণের জন্য কেবলমাত্র এসএসসি বা সমমানের মূল সনদের জন্মতারিখ গ্রাহ্য হবে। কোনো প্রকার এফিডেভিট গ্রহণযোগ্য নয়।
                </p>

                {/* Age exemption callout */}
                <div className="p-4 rounded-md bg-warning-muted text-foreground text-xs sm:text-sm space-y-2 border border-warning/30">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[20px] text-warning shrink-0 mt-0.5">policy</span>
                    <div>
                      <strong className="block text-foreground font-bold mb-1">বয়স শিথিলযোগ্যতার শর্তাবলী:</strong>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        <li>বীর মুক্তিযোদ্ধা / শহীদ মুক্তিযোদ্ধার সন্তান এবং শারীরিক প্রতিবন্ধী প্রার্থীদের ক্ষেত্রে সর্বোচ্চ বয়সসীমা <strong>৩২ (বত্রিশ) বছর</strong> পর্যন্ত শিথিলযোগ্য।</li>
                        <li>বাউবি অথবা যেকোনো স্বায়ত্তশাসিত/সরকারি প্রতিষ্ঠানে স্থায়ী/অস্থায়ী কর্মরত প্রার্থীদের যথাযথ কর্তৃপক্ষের অনুমতি সাপেক্ষে বিভাগীয় প্রার্থী হিসেবে সর্বোচ্চ ৩৫ বছর পর্যন্ত আবেদন বিবেচনা করা হবে।</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  * সরকারি সর্বশেষ পরিপত্র ও গেজেট অনুযায়ী বিদ্যমান কোটা পদ্ধতি (সংরক্ষিত কোটা ও জেলা ভিত্তিক প্রাপ্যতা) যথাযথভাবে অনুসরণ করা হবে। কোটার দাবিদার প্রার্থীদের মৌখিক পরীক্ষার সময় মুক্তিযুদ্ধ বিষয়ক মন্ত্রণালয় / সমাজসেবা অধিদপ্তরের বৈধ সনদপত্র প্রদর্শন করতে হবে।
                </p>
              </div>
            </section>

            {/* Section 5: আবেদন ফি ও পে-অর্ডার জমাদান */}
            <section className="scroll-mt-24 space-y-4" id="sec-payorder">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">০৫</span>
                <h3 className="text-base sm:text-lg font-bold text-primary">আবেদন ফি ও পে-অর্ডার / ব্যাংক ড্রাফট সংগ্রহ সংক্রান্ত নির্দেশনা</h3>
              </div>
              <div className="p-4 rounded-md bg-surface-subtle space-y-3 text-xs sm:text-sm border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-card rounded shadow-xs border border-border">
                    <div className="text-primary font-bold text-sm mb-1">গ্রেড ০৯ ও ১০ এর জন্য ফি:</div>
                    <div className="text-xl font-bold font-mono text-foreground mb-1">১,০০০/- টাকা</div>
                    <span className="text-xs text-muted-foreground">সেকশন অফিসার, সহকারী একাউন্টস অফিসার ও প্রশাসনিক কর্মকর্তা</span>
                  </div>
                  <div className="p-3 bg-card rounded shadow-xs border border-border">
                    <div className="text-primary font-bold text-sm mb-1">গ্রেড ১৬ এর জন্য ফি:</div>
                    <div className="text-xl font-bold font-mono text-foreground mb-1">৫০০/- টাকা</div>
                    <span className="text-xs text-muted-foreground">অফিস সহকারী কাম কম্পিউটার মুদ্রাক্ষরিক</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p>
                    <strong>পে-অর্ডার প্রাপক:</strong> সোনালী ব্যাংক পিএলসি অথবা জনতা ব্যাংক পিএলসি এর যেকোনো অনলাইন শাখা থেকে <strong>‘রেজিস্ট্রার, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়’</strong>-এর অনুকূলে উল্লেখিত সমপরিমাণ অঙ্কের পে-অর্ডার / ব্যাংক ড্রাফট (MICR সম্বলিত) সংগ্রহ করতে হবে।
                  </p>
                  <div className="p-3 rounded bg-error-container text-on-error-container text-xs font-medium border border-error/20">
                    সতর্কবার্তা: পোস্টাল অর্ডার বা নগদ টাকা বা কোনো এজেন্টের মাধ্যমে প্রেরিত অর্থ গ্রহণযোগ্য হবে না। পে-অর্ডারের মূল কপি অনলাইন আবেদনের পর প্রেরিতব্য কাগজের সেটের সাথে পিন-আপ করে পাঠাতে হবে।
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: হার্ডকপি প্রেরণ ও গুরুত্বপূর্ণ নির্দেশনাবলী */}
            <section className="scroll-mt-24 space-y-4" id="sec-hardcopy">
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <span className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">০৬</span>
                <h3 className="text-base sm:text-lg font-bold text-primary">অনলাইন আবেদন ও হার্ডকপি ডাকযোগে প্রেরণ সংক্রান্ত আবশ্যকীয় শর্তাবলী</h3>
              </div>
              <p className="leading-relaxed">
                নিয়োগ বিজ্ঞপ্তিতে উল্লেখিত পদসমূহের জন্য <strong>দ্বিমুখী প্রক্রিয়া (Dual Step Verification)</strong> বাধ্যতামূলক। কেবল অনলাইন আবেদন সম্পন্ন করলে আবেদনপত্র কার্যকর হবে না।
              </p>

              {/* 7-Step Workflow Process Box */}
              <div className="p-5 rounded-lg bg-surface-subtle space-y-4 border border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  আবেদনের ধারাবাহিক ৭-ধাপ নির্দেশিকা:
                </span>
                <ol className="space-y-3 text-xs sm:text-sm pl-2">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">১</span>
                    <span>বাউবি ক্যারিয়ার পোর্টাল (<code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">career.bou.ac.bd</code>) এ লগইন বা নিবন্ধন সম্পন্ন করুন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">২</span>
                    <span>প্রার্থীর সকল শিক্ষাগত সনদের বোর্ড, ফলাফল, বিভাগ ও প্রাপ্ত নম্বর নির্ভুলভাবে এন্ট্রি দিন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">৩</span>
                    <span>৩০০×৩০০ পিক্সেল সাইজের সদ্য তোলা রঙিন ছবি এবং ৩০০×৮০ পিক্সেল সাইজের প্রার্থীর স্বাক্ষর স্ক্যান করে আপলোড করুন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">৪</span>
                    <span>ব্যাংক পে-অর্ডার / ব্যাংক ড্রাফট নম্বর, ইস্যুকৃত ব্যাংকের শাখার নাম ও তারিখ পোর্টালে ইনপুট করুন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">৫</span>
                    <span>অনলাইন ফরমটি সাবমিট করার পর স্বয়ংক্রিয়ভাবে জেনারেট হওয়া ৩ পৃষ্ঠার <strong>‘Application Summary Slip’</strong> লিগ্যাল সাইজ অফসেট কাগজে ৩ (তিন) সেট প্রিন্ট করুন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">৬</span>
                    <span>৩ সেট আবেদনপত্রের প্রতি সেটের সাথে সকল শিক্ষাগত যোগ্যতার সনদ, মার্কশিট, জাতীয় পরিচয়পত্র (NID), নাগরিকত্ব সনদ ও প্রথম শ্রেণির গেজেটেড কর্মকর্তা কর্তৃক সত্যায়িত ৩ কপি পাসপোর্ট সাইজ ছবি সংযুক্ত করুন।</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">৭</span>
                    <span>পে-অর্ডারের মূল কপি ১ম সেটের সাথে গালা বা স্ট্যাপল করে খামের উপর <strong>‘বিজ্ঞপ্তি নম্বর ও পদের নাম’</strong> স্পষ্ট অক্ষরে লিখে নির্ধারিত ঠিকানায় রেজিস্ট্রি ডাকযোগে/কুরিয়ারে প্রেরণ করুন।</span>
                  </li>
                </ol>
              </div>

              {/* Postal Dispatch Address Card */}
              <div className="p-4 rounded-md bg-secondary-fixed/30 text-xs sm:text-sm space-y-1 border border-secondary-fixed">
                <span className="font-bold text-foreground block text-sm mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-primary">markunread_mailbox</span>
                  হার্ডকপি প্রেরণের সরকারি ঠিকানা:
                </span>
                <p className="font-medium text-foreground">বরাবর,</p>
                <p className="font-bold text-primary">রেজিস্ট্রার</p>
                <p className="text-foreground/90">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (বাউবি)</p>
                <p className="text-foreground/90">কেন্দ্রীয় ক্যাম্পাস, বোর্ড বাজার, গাজীপুর-১৭০৫, বাংলাদেশ।</p>
                <p className="text-error font-semibold pt-1">
                  ডাকযোগে পৌঁছানোর সর্বশেষ সময়: ২০ মার্চ ২০২৫ (অফিস চলাকালীন বিকেল ৫:০০ ঘটিকা পর্যন্ত)।
                </p>
              </div>
            </section>

            {/* Formal University Seal Sign-off Block */}
            <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-muted-foreground">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">সতর্কীকরণ বিজ্ঞপ্তি:</p>
                <p>অসম্পূর্ণ, ত্রুটিপূর্ণ বা নির্ধারিত সময়ের পরে প্রাপ্ত কোনো আবেদনপত্র বিবেচনা করা হবে না। বাউবি কর্তৃপক্ষ কোনো কারণ দর্শানো ব্যতিরেকে এই নিয়োগ প্রক্রিয়া পরিবর্তন বা বাতিল করার ক্ষমতা সংরক্ষণ করে।</p>
              </div>
              <div className="shrink-0 text-center sm:text-right space-y-1 self-end sm:self-auto">
                <div className="w-32 h-10 border-b border-dashed border-outline-variant mx-auto sm:ml-auto"></div>
                <span className="block font-bold text-foreground">ড. মহা. শফিকুল আলম</span>
                <span className="block text-[11px]">রেজিস্ট্রার</span>
                <span className="block text-[11px]">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়</span>
              </div>
            </div>
          </main>
        )}
        </article>
      </div>

      {/* Sticky Bottom Action Bar - with xpath: //aside//a[contains(., 'অনলাইনে আবেদন শুরু করুন')] */}
      <aside className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md shadow-lg py-3 px-4 sm:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Summary Chips */}
          <div className="flex items-center gap-2 text-xs flex-wrap justify-center sm:justify-start">
            <span className="font-mono font-bold text-foreground px-2 py-1 rounded bg-muted border border-border">BOU/ADMIN/2025/01</span>
            <span className="text-muted-foreground hidden md:inline">•</span>
            <span className="text-muted-foreground font-medium hidden md:inline">৪টি পদবি</span>
            <span className="text-muted-foreground hidden md:inline">•</span>
            <span className="text-foreground font-bold">মোট ১৬টি শূন্যপদ</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-error font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
              শেষ সময়: ১৫ মার্চ ২০২৫
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button 
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-muted text-foreground text-xs font-medium hover:bg-surface-variant transition-colors border border-border cursor-pointer"
              type="button"
              onClick={() => setIsPdfModalOpen(true)}
            >
              <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
              <span>গেজেট PDF প্রিভিউ</span>
            </button>
            <a 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-primary text-on-primary text-xs sm:text-sm font-semibold hover:bg-primary-container shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer font-medium" 
              href="#start-application"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('guide');
              }}
            >
              <span>অনলাইনে আবেদন শুরু করুন (Start Application)</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Sophisticated PDF Preview Modal Overlay */}
      <CircularPdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onNavigate={onNavigate}
        circularTitle="বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন প্রশাসনিক, হিসাব ও আইটি শূন্য পদসমূহে সরাসরি নিয়োগ প্রজ্ঞাপন"
        memoNo="BOU/ADMIN/2025/01"
      />
    </div>
  );
};
