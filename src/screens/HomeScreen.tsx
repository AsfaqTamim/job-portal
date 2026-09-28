import React, { useState, useMemo } from 'react';
import { ScreenId, CircularNotice } from '../types';
import { initialCirculars } from '../mockData';
import { FaqSection } from '../components/FaqSection';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  circulars?: CircularNotice[];
}

export const toBanglaNumber = (num: number | string): string => {
  const banglaDigits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  return String(num).replace(/[0-9]/g, (w) => banglaDigits[w] || w);
};

export const formatBanglaDate = (dateStr?: string): string => {
  if (!dateStr) return '';
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length < 3) return dateStr;
  const [year, month, day] = parts;
  const monthsBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const mIndex = parseInt(month, 10) - 1;
  const mName = monthsBn[mIndex] || month;
  return `${toBanglaNumber(parseInt(day, 10))} ${mName} ${toBanglaNumber(year)}`;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, circulars }) => {
  const circularsList = circulars && circulars.length > 0 ? circulars : initialCirculars;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [customDate, setCustomDate] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'deadline' | 'vacancies'>('newest');

  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const [trackInput, setTrackInput] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  // Compute reference date for relative date filters based on latest circular in dataset
  const referenceTime = useMemo(() => {
    const timestamps = circularsList
      .map(c => c.publishDate ? new Date(c.publishDate).getTime() : 0)
      .filter(t => t > 0);
    const maxDate = timestamps.length > 0 ? Math.max(...timestamps) : Date.now();
    // Portal active simulation window
    return maxDate + (14 * 86400000);
  }, [circularsList]);

  // Total vacancies across all circulars
  const totalVacancies = useMemo(() => {
    return circularsList.reduce((sum, c) => {
      const circVac = c.posts.reduce((pSum, p) => {
        const num = parseInt(p.vacancies.replace(/[^0-9]/g, '') || '0', 10);
        return pSum + (isNaN(num) ? 0 : num);
      }, 0);
      return sum + circVac;
    }, 0);
  }, [circularsList]);

  // Nearest upcoming deadline
  const nearestDeadline = useMemo(() => {
    const deadlines = circularsList
      .map(c => c.deadline)
      .filter(Boolean)
      .sort();
    return deadlines.length > 0 ? formatBanglaDate(deadlines[0]) : '১৫ মার্চ ২০২৫';
  }, [circularsList]);

  // Filtered Circulars
  const filteredCirculars = useMemo(() => {
    return circularsList.filter((circ) => {
      // 1. Title / Keyword match (matches title, circularNo, or any post title/department/requirements)
      const q = searchQuery.trim().toLowerCase();
      let matchesTitle = true;
      if (q) {
        const titleMatch = circ.title.toLowerCase().includes(q);
        const noMatch = circ.circularNo.toLowerCase().includes(q);
        const postMatch = circ.posts.some(p => 
          p.title.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.requirements.toLowerCase().includes(q) ||
          (p.grade && p.grade.toLowerCase().includes(q))
        );
        matchesTitle = titleMatch || noMatch || postMatch;
      }

      // 2. Category match
      let matchesCategory = true;
      if (selectedCategory && selectedCategory !== 'all') {
        const circCatMatch = circ.category === selectedCategory;
        const postCatMatch = circ.posts.some(p => p.category === selectedCategory);
        matchesCategory = circCatMatch || postCatMatch;
      }

      // 3. Publication Date match
      let matchesDate = true;
      if (circ.publishDate) {
        const pubTime = new Date(circ.publishDate).getTime();

        if (dateFilter === 'custom' && customDate) {
          matchesDate = circ.publishDate === customDate || circ.publishDate >= customDate;
        } else if (dateFilter === 'last_7') {
          const limit = referenceTime - (7 * 86400000);
          matchesDate = pubTime >= limit;
        } else if (dateFilter === 'last_30') {
          const limit = referenceTime - (30 * 86400000);
          matchesDate = pubTime >= limit;
        } else if (dateFilter === 'last_60') {
          const limit = referenceTime - (60 * 86400000);
          matchesDate = pubTime >= limit;
        } else if (dateFilter === 'last_90') {
          const limit = referenceTime - (90 * 86400000);
          matchesDate = pubTime >= limit;
        }
      }

      return matchesTitle && matchesCategory && matchesDate;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.publishDate || '').localeCompare(a.publishDate || '');
      }
      if (sortBy === 'deadline') {
        return (a.deadline || '').localeCompare(b.deadline || '');
      }
      if (sortBy === 'vacancies') {
        const countA = a.posts.reduce((s, p) => s + (parseInt(p.vacancies.replace(/[^0-9]/g, '') || '0', 10) || 0), 0);
        const countB = b.posts.reduce((s, p) => s + (parseInt(p.vacancies.replace(/[^0-9]/g, '') || '0', 10) || 0), 0);
        return countB - countA;
      }
      return 0;
    });
  }, [circularsList, searchQuery, selectedCategory, dateFilter, customDate, sortBy, referenceTime]);

  // Count active filters
  const isFilterActive = searchQuery.trim() !== '' || selectedCategory !== 'all' || dateFilter !== 'all' || customDate !== '';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setDateFilter('all');
    setCustomDate('');
    setSortBy('newest');
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      setTrackResult(`আবেদন আইডি: ${trackInput} - বর্তমান অবস্থা: "খসড়া সংরক্ষিত (Draft)"। অনুগ্রহ করে আবেদনের নির্দেশিকা দেখে হার্ডকপি ও পে-অর্ডার জমা দিন।`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Slim Emergency Alert Banner */}
      <aside aria-label="জরুরি বিজ্ঞপ্তি" className="w-full bg-warning-muted/70 text-card-foreground shadow-xs border-b border-warning/20">
        <div className="max-w-7xl mx-auto px-margin py-2.5 flex items-center justify-between gap-space-md text-body-sm font-body-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-warning text-surface-container-lowest shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[15px] leading-none text-white">notifications_active</span>
            </span>
            <span className="inline-block px-2 py-0.5 rounded-full bg-background text-label-sm font-label-sm text-foreground shadow-xs shrink-0 font-medium">
              জরুরি নোটিশ
            </span>
            <p className="truncate text-foreground font-medium">
              বিজ্ঞপ্তি নং ২০২৩-০১ এর আবেদনের সময়সীমা ১৫ মার্চ ২০২৫ পর্যন্ত বর্ধিত করা হয়েছে
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a 
              className="hidden sm:inline-flex items-center gap-1 font-label-sm text-label-sm text-foreground/80 hover:text-primary transition-colors cursor-pointer" 
              href="#faq-section"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('faq-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="material-symbols-outlined text-[15px]">quiz</span>
              প্রশ্নোত্তর (FAQ)
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <a 
              className="shrink-0 inline-flex items-center gap-1 font-label-sm text-label-sm text-primary hover:text-primary-container font-semibold transition-colors cursor-pointer" 
              href="#circulars"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('circular');
              }}
            >
              বিস্তারিত দেখুন
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </aside>

      {/* 2. Hero Section: Official Academic Recruitment Canvas */}
      <section className="relative w-full overflow-hidden bg-surface-subtle pt-space-xl pb-16">
        {/* Subtle Institutional Atmospheric Geometry */}
        <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-margin relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Hero Text & Search Controller */}
            <div className="lg:col-span-8 space-y-space-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background shadow-xs text-on-surface-variant font-label-sm text-label-sm border border-border">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                <span>সরাসরি অফিসিয়াল পোর্টাল • বাউবি প্রশাসন</span>
              </div>

              <div className="space-y-space-sm">
                <h1 className="font-display-lg text-display-lg text-foreground tracking-tight sm:text-[36px] sm:leading-[44px]">
                  উন্মুক্ত ও আধুনিক কর্মসংস্থান — <br className="hidden sm:inline" />
                  <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-700">
                    মেধার মূল্যায়নে স্বচ্ছ নিয়োগ
                  </span>
                </h1>
                <p className="font-body-lg text-body-lg text-muted-foreground max-w-2xl leading-relaxed">
                  বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের বিভিন্ন অনুষদ, বিভাগ ও প্রশাসনিক দপ্তরের নিয়মিত শূন্যপদসমূহে সরাসরি অনলাইন আবেদন দাখিল ও সমন্বিত ট্র্যাকিং পোর্টাল।
                </p>
              </div>

              {/* Compact Search Bar Container */}
              <div className="p-2 sm:p-3 bg-card rounded-xl shadow-md space-y-2 border border-border">
                <form 
                  className="flex flex-col md:flex-row items-stretch gap-2" 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('circulars');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="relative flex-1 flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-muted-foreground text-[18px]">search</span>
                    <input 
                      className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-subtle text-foreground text-body-md font-body-md focus:bg-background focus:outline-none transition-colors border border-transparent focus:border-primary" 
                      placeholder="পদের নাম অথবা স্মারক নং লিখুন (যেমন: Section Officer)..." 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
                        title="মুছে ফেলুন"
                      >
                        <span className="material-symbols-outlined text-[16px]">cancel</span>
                      </button>
                    )}
                  </div>
                  <div className="relative sm:w-48 flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-muted-foreground text-[18px]">category</span>
                    <select 
                      className="w-full h-11 pl-10 pr-8 rounded-lg bg-surface-subtle text-foreground text-body-sm font-body-sm focus:bg-background focus:outline-none appearance-none transition-colors border border-transparent focus:border-primary cursor-pointer"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">সকল ক্যাটাগরি</option>
                      <option value="admin">প্রশাসনিক কর্মকর্তা</option>
                      <option value="faculty">শিক্ষক নিয়োগ (অনুষদ)</option>
                      <option value="technical">আইসিটি ও টেকনিক্যাল</option>
                      <option value="staff">সাধারণ কর্মচারী</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 text-muted-foreground pointer-events-none text-[18px]">expand_more</span>
                  </div>
                  <div className="relative sm:w-48 flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-muted-foreground text-[18px]">calendar_month</span>
                    <select 
                      className="w-full h-11 pl-10 pr-8 rounded-lg bg-surface-subtle text-foreground text-body-sm font-body-sm focus:bg-background focus:outline-none appearance-none transition-colors border border-transparent focus:border-primary cursor-pointer"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <option value="all">সকল প্রকাশনা</option>
                      <option value="last_7">বিগত ৭ দিন</option>
                      <option value="last_30">বিগত ৩০ দিন</option>
                      <option value="last_60">বিগত ৬০ দিন</option>
                      <option value="last_90">বিগত ৯০ দিন</option>
                      <option value="custom">নির্দিষ্ট তারিখ...</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 text-muted-foreground pointer-events-none text-[18px]">expand_more</span>
                  </div>
                  <button 
                    className="h-11 px-6 bg-primary text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer font-medium" 
                    type="submit"
                  >
                    <span>সার্চ করুন</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>
              </div>

              {/* Quick Stats Metric Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-3 bg-card rounded-lg shadow-xs flex items-center gap-3 border border-border">
                  <div className="w-9 h-9 rounded-lg bg-primary-fixed/50 flex items-center justify-center shrink-0 text-primary">
                    <span className="material-symbols-outlined text-[20px]">assignment</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-caption text-caption text-muted-foreground block truncate">চলমান সার্কুলার</span>
                    <span className="font-tabular-stat text-tabular-stat text-foreground">{toBanglaNumber(circularsList.length)}টি</span>
                  </div>
                </div>

                <div className="p-3 bg-card rounded-lg shadow-xs flex items-center gap-3 border border-border">
                  <div className="w-9 h-9 rounded-lg bg-success-muted flex items-center justify-center shrink-0 text-on-tertiary-container">
                    <span className="material-symbols-outlined text-[20px]">group_add</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-caption text-caption text-muted-foreground block truncate">মোট শূন্যপদ</span>
                    <span className="font-tabular-stat text-tabular-stat text-foreground">{toBanglaNumber(totalVacancies)}টি পদ</span>
                  </div>
                </div>

                <div className="p-3 bg-card rounded-lg shadow-xs flex items-center gap-3 border border-border">
                  <div className="w-9 h-9 rounded-lg bg-warning-muted flex items-center justify-center shrink-0 text-warning">
                    <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-caption text-caption text-muted-foreground block truncate">আসন্ন ডেডলাইন</span>
                    <span className="font-headline-sm text-headline-sm text-foreground">{nearestDeadline}</span>
                  </div>
                </div>

                <div className="p-3 bg-card rounded-lg shadow-xs flex items-center gap-3 border border-border">
                  <div className="w-9 h-9 rounded-lg bg-secondary-fixed/50 flex items-center justify-center shrink-0 text-secondary">
                    <span className="material-symbols-outlined text-[20px]">account_balance</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-caption text-caption text-muted-foreground block truncate">ফি প্রদানের মাধ্যম</span>
                    <span className="font-label-md text-label-md text-foreground font-semibold">জনতা ব্যাংক</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campus Image Card with Editorial Overlay */}
            <div className="lg:col-span-4 relative">
              <div className="rounded-xl overflow-hidden shadow-xl bg-card relative border border-border">
                <img 
                  className="w-full h-80 object-cover" 
                  alt="Modern administrative complex and academic headquarters of Bangladesh Open University in Gazipur" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Ara4YdZKbRNQYxlqaBSBUeT1thgt4h9pxRQql3VCPNj3TB6YhMJ7HtcmXtOPtRuxODO27GkpBS8fRlHj0MzmL4nXtCtYFfCrLTf933iLZw4ZGNhngNXZ-FyB2OwQZww4SJ0ACeTubSCL_eraMzMW_0qdDwBag_e46Ohkks_hqOzOEHcfyZoOsQBb-QyqJJRJZ-zbGyPUEdx1uebKDR3QiTSuGvW5C9_bGNTKYX29RH7_45qno3MR"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent flex flex-col justify-end p-5 text-on-primary">
                  <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-secondary-fixed mb-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    কেন্দ্রীয় ক্যাম্পাস, বোর্ড বাজার, গাজীপুর
                  </span>
                  <p className="font-headline-sm text-headline-sm text-on-primary leading-tight">
                    উচ্চশিক্ষায় সুযোগের সমতা ও প্রযুক্তিনির্ভর স্বচ্ছ নিয়োগ
                  </p>
                  <p className="font-caption text-caption text-surface-dim mt-1">
                    সবুজ প্রাঙ্গণ থেকে দক্ষ মানবসম্পদ সৃষ্টিতে নিবেদিত
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Navigation Bar */}
      <section className="w-full max-w-7xl mx-auto px-margin -mt-6 mb-8 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            onClick={() => onNavigate('auth')}
            className="bg-card p-4 rounded-xl border border-border shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-3.5 group hover:border-primary"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-fixed/40 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">login</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">লগইন ও প্রোফাইল</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">আবেদনের স্থিতি ও প্রবেশপত্র দেখতে প্রবেশ করুন</p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('download_forms')}
            className="bg-card p-4 rounded-xl border border-border shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-3.5 group hover:border-primary"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">file_download</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">আবেদন ফর্ম ও চালান</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">অফিসিয়াল PDF ফর্ম ও ব্যাংক চালানের ছক ডাউনলোড</p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('guide')}
            className="bg-card p-4 rounded-xl border border-border shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-3.5 group hover:border-primary"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">checklist_rtl</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">আবেদন প্রস্তুতি চেকলিস্ট</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">ছবি, স্বাক্ষর ও সনদের সাইজিং নির্দেশিকা</p>
            </div>
          </div>

          <div 
            onClick={() => onNavigate('dashboard')}
            className="bg-card p-4 rounded-xl border border-border shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-3.5 group hover:border-primary"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
            <div>
              <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors">আমার আবেদন ট্র্যাকার</h4>
              <p className="text-[11px] text-muted-foreground mt-0.5">পূর্বে জমাকৃত আবেদনের বর্তমান অগ্রগতি যাচাই</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Derived Lifecycle Notices Section (Last 90 Days) */}
      <section className="w-full max-w-7xl mx-auto px-margin py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-4 bg-primary rounded-full"></span>
              <span className="font-label-md text-label-md text-muted-foreground uppercase tracking-wider">সাম্প্রতিক আপডেট</span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-foreground">চলমান নোটিশ ও আদেশনামা (বিগত ৯০ দিন)</h2>
          </div>
          <a 
            className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline font-semibold cursor-pointer" 
            href="#all-notices"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('circular');
            }}
          >
            সকল আর্কাইভ দেখুন
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Notice 1 */}
          <article className="bg-card rounded-xl p-space-md shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-border">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning-muted text-warning text-caption font-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
                  সময়সীমা বর্ধিতকরণ
                </span>
                <time className="font-caption text-caption text-muted-foreground">০৪ মার্চ ২০২৫</time>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-foreground pt-1 leading-snug">
                বিজ্ঞপ্তি নং ২০২৩-০১ এর আবেদনের সময়সীমা ১৫ মার্চ ২০২৫ পর্যন্ত বর্ধিতকরণ সংক্রান্ত বিজ্ঞপ্তি
              </h3>
              <p className="font-body-sm text-body-sm text-muted-foreground">
                প্রশাসনিক অনিবার্য কারণে সাধারণ আবেদনকারীদের সুবিধার জন্য সময়সীমা ১৫ দিন বর্ধিত করা হলো।
              </p>
            </div>
            <div className="pt-space-md mt-space-sm flex items-center justify-between border-t border-border">
              <span className="font-caption text-caption text-muted-foreground font-mono">BOU/REG/NOT-108.pdf</span>
              <button 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground font-label-sm text-label-sm transition-colors shadow-xs cursor-pointer" 
                type="button"
                onClick={() => onNavigate('circular')}
              >
                <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                <span>ডাউনলোড</span>
              </button>
            </div>
          </article>

          {/* Notice 2 */}
          <article className="bg-card rounded-xl p-space-md shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-border">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-success-muted text-on-tertiary-container text-caption font-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                  অনুষদীয় বিজ্ঞপ্তি
                </span>
                <time className="font-caption text-caption text-muted-foreground">২৮ ফেব্রুয়ারি ২০২৫</time>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-foreground pt-1 leading-snug">
                স্কুল অব সায়েন্স অ্যান্ড টেকনোলজি (SST) এর শিক্ষক নিয়োগ বিজ্ঞপ্তি প্রকাশ
              </h3>
              <p className="font-body-sm text-body-sm text-muted-foreground">
                কম্পিউটার সায়েন্স ও ইলেকট্রনিক্স বিভাগে সহযোগী অধ্যাপক ও প্রভাষক পদের পূর্ণাঙ্গ বিজ্ঞপ্তি।
              </p>
            </div>
            <div className="pt-space-md mt-space-sm flex items-center justify-between border-t border-border">
              <span className="font-caption text-caption text-muted-foreground font-mono">BOU/SST/CIR-02.pdf</span>
              <button 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground font-label-sm text-label-sm transition-colors shadow-xs cursor-pointer" 
                type="button"
                onClick={() => onNavigate('circular')}
              >
                <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                <span>ডাউনলোড</span>
              </button>
            </div>
          </article>

          {/* Notice 3 */}
          <article className="bg-card rounded-xl p-space-md shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between border border-border">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-caption font-label-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  স্ক্রুটিনি ফলাফল
                </span>
                <time className="font-caption text-caption text-muted-foreground">২০ জানুয়ারি ২০২৫</time>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-foreground pt-1 leading-snug">
                খসড়া স্ক্রুটিনি ও বৈধ প্রার্থী তালিকা প্রকাশ (সহকারী প্রকৌশলী - সিভিল পদ)
              </h3>
              <p className="font-body-sm text-body-sm text-muted-foreground">
                প্রাথমিক যাচাই-বাছাই শেষে নির্বাচিত প্রার্থীদের রোল নম্বর এবং লিখিত পরীক্ষার সময়সূচি ঘোষণা।
              </p>
            </div>
            <div className="pt-space-md mt-space-sm flex items-center justify-between border-t border-border">
              <span className="font-caption text-caption text-muted-foreground font-mono">BOU/SCRUT-ENG.pdf</span>
              <button 
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground font-label-sm text-label-sm transition-colors shadow-xs cursor-pointer" 
                type="button"
                onClick={() => onNavigate('circular')}
              >
                <span className="material-symbols-outlined text-[16px] text-error">picture_as_pdf</span>
                <span>ডাউনলোড</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* 4. Circular-Wise Job Listings (Open Circulars & Search Controller) */}
      <section className="w-full max-w-7xl mx-auto px-margin py-12 space-y-8" id="circulars">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-primary rounded-full"></span>
            <span className="font-label-md text-label-md text-muted-foreground uppercase tracking-wider">সরাসরি দরখাস্ত ও ফিল্টার</span>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-foreground">চলমান সার্কুলার ও সক্রিয় শূন্যপদসমূহ</h2>
          <p className="font-body-sm text-body-sm text-muted-foreground">
            পদের নাম, ক্যাটাগরি অথবা প্রকাশের তারিখ অনুযায়ী ফিল্টার করে দ্রুত কাঙ্ক্ষিত সার্কুলার ও পদ খুঁজে নিন।
          </p>
        </div>

        {/* Dedicated Search & Multi-Filter Control Console */}
        <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-sm border border-border space-y-4">
          {/* Main Search Input Bar */}
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-muted-foreground text-[22px]">search</span>
            <input 
              className="w-full h-12 pl-12 pr-10 rounded-xl bg-surface-subtle text-foreground text-body-md font-body-md focus:bg-background focus:outline-none transition-colors border border-border focus:border-primary shadow-xs" 
              placeholder="পদের নাম, বিভাগ বা স্মারক নং দিয়ে ফিল্টার করুন (যেমন: Section Officer, প্রভাষক, BOU/ADMIN)..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-colors cursor-pointer"
                title="সার্চ মুছুন"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          {/* Category Filter Chips Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-caption font-label-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">filter_alt</span>
                ক্যাটাগরি অনুযায়ী ফিল্টার:
              </span>
              <span className="hidden sm:inline">এক ক্লিকে নির্বাচন করুন</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-subtle hover:bg-muted text-foreground border border-border'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">apps</span>
                <span>সকল ক্যাটাগরি</span>
                <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${selectedCategory === 'all' ? 'bg-primary-container text-on-primary' : 'bg-muted text-muted-foreground'}`}>
                  {toBanglaNumber(circularsList.length)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('admin')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${
                  selectedCategory === 'admin'
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-subtle hover:bg-muted text-foreground border border-border'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">badge</span>
                <span>প্রশাসনিক কর্মকর্তা</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('faculty')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${
                  selectedCategory === 'faculty'
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-subtle hover:bg-muted text-foreground border border-border'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>শিক্ষক নিয়োগ (অনুষদ)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('technical')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${
                  selectedCategory === 'technical'
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-subtle hover:bg-muted text-foreground border border-border'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">computer</span>
                <span>আইসিটি ও টেকনিক্যাল</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('staff')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-label-sm font-label-sm transition-all cursor-pointer ${
                  selectedCategory === 'staff'
                    ? 'bg-primary text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-subtle hover:bg-muted text-foreground border border-border'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">group</span>
                <span>সাধারণ কর্মচারী</span>
              </button>
            </div>
          </div>

          {/* Publication Date & Sorting Toolbar */}
          <div className="pt-2 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Publication Date Dropdown */}
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-muted-foreground text-[18px]">calendar_today</span>
                <span className="font-label-sm text-label-sm text-foreground">প্রকাশের সময়কাল:</span>
                <div className="relative">
                  <select
                    className="h-9 pl-3 pr-8 rounded-lg bg-surface-subtle border border-border text-foreground font-label-sm text-label-sm focus:outline-none focus:border-primary appearance-none cursor-pointer"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  >
                    <option value="all">সকল প্রকাশনা (যেকোনো তারিখ)</option>
                    <option value="last_7">বিগত ৭ দিনে প্রকাশিত</option>
                    <option value="last_30">বিগত ৩০ দিনে প্রকাশিত</option>
                    <option value="last_60">বিগত ৬০ দিনে প্রকাশিত</option>
                    <option value="last_90">বিগত ৯০ দিনে প্রকাশিত</option>
                    <option value="custom">নির্দিষ্ট প্রকাশের তারিখ...</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2 text-muted-foreground pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              {/* Custom Date Input (shown when custom is selected) */}
              {dateFilter === 'custom' && (
                <div className="flex items-center gap-2 animate-in fade-in-50">
                  <input
                    type="date"
                    className="h-9 px-3 rounded-lg bg-surface-subtle border border-primary text-foreground font-label-sm text-label-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    title="নির্দিষ্ট প্রকাশের তারিখ নির্বাচন করুন"
                  />
                  {customDate && (
                    <button
                      type="button"
                      onClick={() => setCustomDate('')}
                      className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      তারিখ মুছুন
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sorting & Reset Controls */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-muted-foreground text-[18px]">sort</span>
                <span className="font-label-sm text-label-sm text-foreground">ক্রমানুসার:</span>
                <div className="relative">
                  <select
                    className="h-9 pl-3 pr-8 rounded-lg bg-surface-subtle border border-border text-foreground font-label-sm text-label-sm focus:outline-none focus:border-primary appearance-none cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                  >
                    <option value="newest">সর্বশেষ প্রকাশিত আগে</option>
                    <option value="deadline">আবেদনের শেষ তারিখ সন্নিকটে</option>
                    <option value="vacancies">সর্বোচ্চ শূন্যপদ অনুযায়ী</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-2 text-muted-foreground pointer-events-none text-[18px]">expand_more</span>
                </div>
              </div>

              {isFilterActive && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="h-9 px-3 rounded-lg bg-surface-subtle hover:bg-muted text-error border border-error/20 font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer"
                  title="সকল ফিল্টার মুছুন"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  <span>রিসেট</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Tags Bar */}
          {isFilterActive && (
            <div className="pt-2 border-t border-border/60 flex flex-wrap items-center gap-2 text-body-sm">
              <span className="font-caption text-caption text-muted-foreground">সক্রিয় ফিল্টারসমূহ:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm border border-primary/20">
                  <span>অনুসন্ধান: "{searchQuery}"</span>
                  <button type="button" onClick={() => setSearchQuery('')} className="hover:text-primary-container cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm border border-secondary/20">
                  <span>ক্যাটাগরি: {selectedCategory === 'admin' ? 'প্রশাসনিক কর্মকর্তা' : selectedCategory === 'faculty' ? 'শিক্ষক নিয়োগ (অনুষদ)' : selectedCategory === 'technical' ? 'আইসিটি ও টেকনিক্যাল' : 'সাধারণ কর্মচারী'}</span>
                  <button type="button" onClick={() => setSelectedCategory('all')} className="hover:opacity-75 cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              {dateFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-warning-muted text-warning font-label-sm text-label-sm border border-warning/20">
                  <span>প্রকাশ: {dateFilter === 'last_7' ? 'বিগত ৭ দিন' : dateFilter === 'last_30' ? 'বিগত ৩০ দিন' : dateFilter === 'last_60' ? 'বিগত ৬০ দিন' : dateFilter === 'last_90' ? 'বিগত ৯০ দিন' : `তারিখ: ${customDate || 'নির্দিষ্ট'}`}</span>
                  <button type="button" onClick={() => { setDateFilter('all'); setCustomDate(''); }} className="hover:opacity-75 cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="font-caption text-caption text-primary hover:underline ml-1 cursor-pointer"
              >
                সব ফিল্টার মুছুন
              </button>
            </div>
          )}

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-body-sm font-body-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success"></span>
              <span>
                অনুসন্ধানের ফলাফল: <strong>{toBanglaNumber(filteredCirculars.length)}টি</strong> সার্কুলার পাওয়া গেছে (মোট {toBanglaNumber(circularsList.length)}টির মধ্যে)
              </span>
            </div>
            {filteredCirculars.length > 0 && (
              <span className="font-caption text-caption">
                মোট অন্তর্ভুক্ত পদ: {toBanglaNumber(filteredCirculars.reduce((sum, c) => sum + c.posts.length, 0))}টি
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Circular Notices Cards List */}
        {filteredCirculars.length > 0 ? (
          <div className="space-y-6">
            {filteredCirculars.map((circ) => {
              const q = searchQuery.trim().toLowerCase();

              return (
                <div key={circ.id} className="bg-card rounded-xl p-6 shadow-sm space-y-6 border border-border hover:shadow-md transition-shadow">
                  {/* Circular Header Panel */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 bg-surface-subtle -m-6 mb-0 p-6 rounded-t-xl border-b border-border">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-label-sm text-label-sm font-mono px-2 py-0.5 rounded bg-muted text-foreground border border-border">
                          স্মারক নং: {circ.circularNo}
                        </span>
                        
                        {/* Publication Date Badge */}
                        {circ.publishDate && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-label-sm font-medium border border-primary/20">
                            <span className="material-symbols-outlined text-[15px]">event</span>
                            <span>প্রকাশ: {formatBanglaDate(circ.publishDate)}</span>
                          </span>
                        )}

                        {/* Category Badge */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                          <span className="material-symbols-outlined text-[14px]">label</span>
                          <span>{circ.categoryBn || (circ.category === 'admin' ? 'প্রশাসনিক কর্মকর্তা' : circ.category === 'faculty' ? 'শিক্ষক নিয়োগ (অনুষদ)' : circ.category === 'technical' ? 'আইসিটি ও টেকনিক্যাল' : 'সাধারণ সার্কুলার')}</span>
                        </span>

                        {/* Status Badge */}
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success-muted text-on-tertiary-container font-label-sm text-label-sm font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                          <span>আবেদন চলমান</span>
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-foreground">
                        {circ.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="px-3 py-1.5 rounded-lg bg-card shadow-xs flex items-center gap-2 text-foreground font-label-sm text-label-sm border border-border">
                        <span className="material-symbols-outlined text-warning text-[18px]">alarm</span>
                        <span>শেষ তারিখ: <strong>{formatBanglaDate(circ.deadline)}</strong></span>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-card shadow-xs flex items-center gap-1.5 text-foreground font-label-sm text-label-sm border border-border">
                        <span className="material-symbols-outlined text-muted-foreground text-[18px]">payments</span>
                        <span>ফি: {circ.fee}</span>
                      </div>
                      <button 
                        className="h-9 px-3 rounded-lg bg-surface-variant hover:bg-muted text-foreground font-label-sm text-label-sm transition-colors flex items-center gap-1.5 cursor-pointer font-medium" 
                        type="button"
                        onClick={() => onNavigate('circular')}
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>সার্কুলার PDF</span>
                      </button>
                    </div>
                  </div>

                  {/* Active Posts Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-label-md text-label-md text-muted-foreground uppercase tracking-wider">
                        এই সার্কুলারের আওতাভুক্ত পদসমূহ ({toBanglaNumber(circ.posts.length)}টি পদ)
                      </h4>
                      {q && circ.posts.some(p => p.title.toLowerCase().includes(q) || p.department.toLowerCase().includes(q)) && (
                        <span className="font-caption text-caption text-primary font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          অনুসন্ধানে ম্যাচকৃত পদ রয়েছে
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {circ.posts.map((post) => {
                        const isMatched = q ? (
                          post.title.toLowerCase().includes(q) ||
                          post.department.toLowerCase().includes(q) ||
                          post.requirements.toLowerCase().includes(q)
                        ) : false;

                        return (
                          <div 
                            key={post.id} 
                            className={`p-4 rounded-xl flex flex-col justify-between gap-3 shadow-xs transition-all border ${
                              isMatched 
                                ? 'bg-primary-fixed/20 border-primary shadow-sm ring-1 ring-primary/30' 
                                : 'bg-surface-subtle hover:bg-surface border-border/60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h5 className="font-headline-sm text-headline-sm text-foreground">
                                    {post.title}
                                  </h5>
                                  {isMatched && (
                                    <span className="px-1.5 py-0.2 rounded bg-primary text-on-primary text-[10px] font-semibold">
                                      ম্যাচিং
                                    </span>
                                  )}
                                </div>
                                <p className="font-caption text-caption text-muted-foreground mt-0.5">
                                  {post.department} • {post.jobType || 'স্থায়ী পদ'} • {post.grade} ({post.salary})
                                </p>
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold shrink-0">
                                {post.vacancies}
                              </span>
                            </div>
                            
                            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                              {post.requirements}
                            </p>

                            <div className="pt-2 flex items-center justify-between border-t border-border/40">
                              <span className="font-caption text-caption text-muted-foreground">
                                বয়স: {post.ageLimit}
                              </span>
                              <a 
                                className="h-8 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center gap-1 transition-colors shadow-xs cursor-pointer font-medium" 
                                href="#apply"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onNavigate('guide');
                                }}
                              >
                                <span>আবেদন করুন</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State when no circulars match the search query / filters */
          <div className="bg-card rounded-2xl p-8 sm:p-12 text-center space-y-4 border border-border shadow-xs">
            <div className="w-16 h-16 rounded-full bg-surface-subtle mx-auto flex items-center justify-center text-muted-foreground border border-border">
              <span className="material-symbols-outlined text-[36px]">search_off</span>
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h3 className="font-headline-md text-headline-md text-foreground">
                কোনো সার্কুলার বা পদ খুঁজে পাওয়া যায়নি
              </h3>
              <p className="font-body-sm text-body-sm text-muted-foreground">
                আপনার অনুসন্ধানের শর্তাবলীর সাথে মিলে এমন কোনো সক্রিয় বিজ্ঞপ্তি মেলেনি। অনুগ্রহ করে পদের নাম, ক্যাটাগরি অথবা প্রকাশের তারিখ ফিল্টার পরিবর্তন করুন।
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-10 px-5 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>সকল ফিল্টার মুছুন ও সব সার্কুলার দেখুন</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 5. 8-Step Application Process (Sequential Roadmap) */}
      <section className="w-full bg-card py-16 shadow-xs border-y border-border">
        <div className="max-w-7xl mx-auto px-margin space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-surface-subtle font-label-sm text-label-sm text-primary font-semibold border border-border">
              আবেদন নির্দেশিকা ফ্লোচার্ট
            </span>
            <h2 className="font-display-lg text-display-lg text-foreground">৮-ধাপে আবেদন প্রক্রিয়া ও দাখিল নির্দেশিকা</h2>
            <p className="font-body-md text-body-md text-muted-foreground">
              অনলাইন ফরম পূরণ থেকে শুরু করে গাজীপুর প্রধান ক্যাম্পাসে আবেদন পৌঁছানো পর্যন্ত ধারাবাহিক ধাপসমূহ অনুসরণ করুন।
            </p>
          </div>

          {/* Roadmap Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div 
              className="p-4 rounded-xl bg-surface-subtle shadow-xs flex flex-col justify-between h-full relative group border border-border hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => onNavigate('circular')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">১</span>
                <span className="material-symbols-outlined text-muted-foreground text-[20px]">feed</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">সার্কুলার নির্বাচন</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">বিজ্ঞপ্তির যোগ্যতা, বেতন স্কেল ও প্রয়োজনীয় কাগজপত্র যাচাই করুন।</p>
              </div>
              <span className="font-caption text-caption text-primary font-medium mt-3 block">ধাপ ০১/০৮</span>
            </div>

            {/* Step 2 */}
            <div 
              className="p-4 rounded-xl bg-surface-subtle shadow-xs flex flex-col justify-between h-full relative group border border-border hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => onNavigate('guide')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">২</span>
                <span className="material-symbols-outlined text-muted-foreground text-[20px]">person_add</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">নিবন্ধন ও লগইন</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">সক্রিয় মোবাইল নম্বর ও ইমেইল দিয়ে রেজিস্টার করে ওটিপি নিশ্চিত করুন।</p>
              </div>
              <span className="font-caption text-caption text-primary font-medium mt-3 block">ধাপ ০২/০৮</span>
            </div>

            {/* Step 3 */}
            <div 
              className="p-4 rounded-xl bg-surface-subtle shadow-xs flex flex-col justify-between h-full relative group border border-border hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => onNavigate('guide')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">৩</span>
                <span className="material-symbols-outlined text-muted-foreground text-[20px]">work</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">পদ নির্বাচন</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">ক্যাটাগরি অনুযায়ী আপনার জন্য প্রযোজ্য পদ ও ডিপার্টমেন্ট সিলেক্ট করুন।</p>
              </div>
              <span className="font-caption text-caption text-primary font-medium mt-3 block">ধাপ ০৩/০৮</span>
            </div>

            {/* Step 4 */}
            <div 
              className="p-4 rounded-xl bg-surface-subtle shadow-xs flex flex-col justify-between h-full relative group border border-border hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => onNavigate('guide')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">৪</span>
                <span className="material-symbols-outlined text-muted-foreground text-[20px]">edit_document</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">ফরম পূরণ (৫ স্তর)</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">ব্যক্তিগত তথ্য, স্থায়ী ঠিকানা, শিক্ষাগত রেকর্ড, অভিজ্ঞতা ও রেফারেন্স।</p>
              </div>
              <span className="font-caption text-caption text-primary font-medium mt-3 block">ধাপ ০৪/০৮</span>
            </div>

            {/* Step 5 */}
            <div 
              className="p-4 rounded-xl bg-surface-subtle shadow-xs flex flex-col justify-between h-full relative group border border-border hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => onNavigate('guide')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">৫</span>
                <span className="material-symbols-outlined text-muted-foreground text-[20px]">photo_camera</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">ছবি ও স্বাক্ষর আপলোড</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">৩০০×৩০০ পিক্সেল রঙিন ছবি এবং ৩০০×৮০ পিক্সেল স্পষ্ট স্বাক্ষর যুক্ত করুন।</p>
              </div>
              <span className="font-caption text-caption text-primary font-medium mt-3 block">ধাপ ০৫/০৮</span>
            </div>

            {/* Step 6 */}
            <div 
              className="p-4 rounded-xl bg-surface-subtle shadow-xs flex flex-col justify-between h-full relative group border border-border hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => onNavigate('guide')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">৬</span>
                <span className="material-symbols-outlined text-muted-foreground text-[20px]">receipt_long</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">পে-অর্ডার ও সনদ স্ক্যান</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">জনতা ব্যাংক পে-অর্ডার স্লিপ ও সনদসমূহের পিডিএফ স্ক্যান সংযুক্ত করুন।</p>
              </div>
              <span className="font-caption text-caption text-primary font-medium mt-3 block">ধাপ ০৬/০৮</span>
            </div>

            {/* Step 7 */}
            <div 
              className="p-4 rounded-xl bg-surface-subtle shadow-xs flex flex-col justify-between h-full relative group border border-border hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => onNavigate('guide')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">৭</span>
                <span className="material-symbols-outlined text-muted-foreground text-[20px]">assignment_turned_in</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">লিগ্যাল সাইজ প্রিভিউ</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">বাউবি ফরম্যাট অনুযায়ী ড্রাফট কপি প্রিভিউ করে চূড়ান্ত সাবমিট করুন।</p>
              </div>
              <span className="font-caption text-caption text-primary font-medium mt-3 block">ধাপ ০৭/০৮</span>
            </div>

            {/* Step 8 */}
            <div 
              className="p-4 rounded-xl bg-error-container/40 shadow-xs flex flex-col justify-between h-full relative group border border-error/30 hover:border-error transition-colors cursor-pointer"
              onClick={() => onNavigate('guide')}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-error text-on-error font-label-md text-label-md flex items-center justify-center font-bold text-white">৮</span>
                <span className="material-symbols-outlined text-error text-[20px]">local_post_office</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-foreground">ডাকযোগে প্রেরণ</h4>
                <p className="font-body-sm text-body-sm text-muted-foreground mt-1">মূল পে-অর্ডারসহ স্বাক্ষরিত প্রিন্ট কপি নির্ধারিত ঠিকানায় রেজিস্টার্ড ডাকে পাঠান।</p>
              </div>
              <span className="font-caption text-caption text-error font-semibold mt-3 block">বাধ্যতামূলক চূড়ান্ত ধাপ</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Comprehensive Interactive Accordion FAQ Section */}
      <FaqSection 
        onNavigate={onNavigate} 
        onOpenSupportModal={() => setSupportModalOpen(true)}
        onOpenTrackModal={() => setTrackModalOpen(true)}
      />

      {/* 7. Helpdesk & Institutional Support Box */}
      <section className="w-full max-w-7xl mx-auto px-margin pb-16">
        <div className="rounded-xl bg-primary text-on-primary p-8 shadow-md relative overflow-hidden">
          {/* Institutional watermarking background */}
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[240px]">support_agent</span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            <div className="lg:col-span-8 space-y-space-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-on-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">contact_support</span>
                <span>বাউবি রিক্রুটমেন্ট হেল্পডেস্ক</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-primary">
                আবেদন সংক্রান্ত কোনো কারিগরি সমস্যায় সহযোগিতার প্রয়োজন?
              </h3>
              <p className="font-body-md text-body-md text-slate-300 max-w-xl">
                অনলাইন ফর্ম পূরণ, পে-অর্ডার ভ্যালিডেশন বা পোর্টাল সংক্রান্ত যেকোনো জটিলতায় অফিস চলাকালীন সময়ে (সকাল ৯:০০ - বিকেল ৪:০০, কর্মদিবসে) আমাদের আইসিটি সাপোর্ট ডেস্ক প্রস্তুত রয়েছে।
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-body-sm font-body-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">call</span>
                  <span>হেল্পলাইন: +৮৮০ ২-৯২৯১১০১-৪ (এক্সট- ৩২১)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">mail</span>
                  <span>ইমেইল: recruitment.support@bou.ac.bd</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">schedule</span>
                  <span>রবিবার - বৃহস্পতিবার | ৯:০০ - ১৬:০০</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button 
                className="h-11 px-6 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-subtle transition-colors shadow-sm font-semibold cursor-pointer" 
                type="button"
                onClick={() => setTrackModalOpen(true)}
              >
                <span className="material-symbols-outlined text-[18px]">track_changes</span>
                <span>আবেদন ট্র্যাক করুন</span>
              </button>
              <button 
                className="h-11 px-6 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-white/20 transition-colors shadow-sm cursor-pointer font-medium border border-white/20" 
                type="button"
                onClick={() => setSupportModalOpen(true)}
              >
                <span className="material-symbols-outlined text-[18px]">headset_mic</span>
                <span>সাপোর্ট টিকিট ওপেন করুন</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Modal */}
      {supportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-md w-full p-6 shadow-xl border border-border animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-headline-sm text-foreground">সাপোর্ট টিকিট ফর্ম</h3>
              <button className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => setSupportModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('আপনার সাপোর্ট বার্তাটি গৃহিত হয়েছে। টিকিট নম্বর: #BOU-TK-78921');
              setSupportModalOpen(false);
            }} className="mt-4 space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">আবেদনকারীর নাম / আইডি</label>
                <input required className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground" placeholder="মো: সাইফুল ইসলাম / BOU-2025-08914" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">যোগাযোগের মোবাইল নম্বর</label>
                <input required type="tel" className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground" placeholder="017xxxxxxxx" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">সমস্যার বিষয়</label>
                <select className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground">
                  <option>পে-অর্ডার ভ্যালিডেশন সংক্রান্ত</option>
                  <option>ছবি বা স্বাক্ষর আপলোড ত্রুটি</option>
                  <option>প্রবেশপত্র সংক্রান্ত</option>
                  <option>অন্যান্য</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">বিস্তারিত বিবরণ</label>
                <textarea rows={3} className="w-full p-2 rounded-lg bg-surface-subtle border border-border text-foreground" placeholder="সমস্যার বিবরণ লিখুন..."></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setSupportModalOpen(false)} className="px-4 py-2 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-surface-variant">বাতিল</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container">টিকিট জমা দিন</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Track Application Modal */}
      {trackModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-md w-full p-6 shadow-xl border border-border animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-headline-sm text-foreground">আবেদনের স্থিতি ট্র্যাক করুন</h3>
              <button className="text-muted-foreground hover:text-foreground cursor-pointer" onClick={() => { setTrackModalOpen(false); setTrackResult(null); }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleTrackSubmit} className="mt-4 space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">আবেদন ট্র্যাকিং নম্বর (Application ID)</label>
                <div className="flex gap-2">
                  <input 
                    required 
                    value={trackInput} 
                    onChange={(e) => setTrackInput(e.target.value)} 
                    className="flex-1 h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground font-mono" 
                    placeholder="BOU-2025-08914" 
                  />
                  <button type="submit" className="h-10 px-4 rounded-lg bg-primary text-on-primary font-medium text-xs">যাচাই</button>
                </div>
              </div>
              {trackResult && (
                <div className="p-3 rounded-lg bg-success-muted text-[#065f46] text-xs leading-relaxed border border-success/30">
                  {trackResult}
                </div>
              )}
              <div className="pt-2 flex justify-between items-center text-xs">
                <button 
                  type="button" 
                  onClick={() => { setTrackModalOpen(false); onNavigate('guide'); }}
                  className="text-primary hover:underline font-medium"
                >
                  আবেদন পোর্টালে যান →
                </button>
                <button 
                  type="button" 
                  onClick={() => { setTrackModalOpen(false); setTrackResult(null); }}
                  className="px-3 py-1.5 rounded-lg bg-muted text-foreground hover:bg-surface-variant"
                >
                  বন্ধ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
