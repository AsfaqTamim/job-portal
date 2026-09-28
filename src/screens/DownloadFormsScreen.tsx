import React, { useState } from 'react';
import { ScreenId } from '../types';

interface DownloadFormsScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

interface FormItem {
  id: string;
  code: string;
  titleBn: string;
  titleEn: string;
  category: 'application' | 'challan' | 'guideline' | 'declaration';
  pages: number;
  fileSize: string;
  updatedDate: string;
  description: string;
}

export const DownloadFormsScreen: React.FC<DownloadFormsScreenProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<FormItem | null>(null);

  const officialForms: FormItem[] = [
    {
      id: 'form-1',
      code: 'BOU-FORM-REG-01',
      titleBn: 'বাউবি কর্মকর্তা ও কর্মচারী নিয়োগের নির্ধারিত আবেদন ফর্ম (মডেল-ক)',
      titleEn: 'Standard Application Form for Officers & Staff (Category-A)',
      category: 'application',
      pages: 4,
      fileSize: '১.২ মেগাবাইট',
      updatedDate: '১৫ জানুয়ারি ২০২৫',
      description: 'গ্রেড ০৯ থেকে ২০ পর্যন্ত সকল স্থায়ী ও চুক্তিভিত্তিক পদের জন্য প্রমিত ৪ পৃষ্ঠার সরকারি ফরম্যাট।'
    },
    {
      id: 'form-2',
      code: 'BOU-FORM-FACULTY-02',
      titleBn: 'শিক্ষক ও গবেষক পদের জন্য পূর্ণাঙ্গ আবেদন ফর্ম ও জীবনবৃত্তান্ত ছক',
      titleEn: 'Faculty & Academic Position Application Form & CV Template',
      category: 'application',
      pages: 6,
      fileSize: '২.১ মেগাবাইট',
      updatedDate: '১০ জানুয়ারি ২০২৫',
      description: 'অধ্যাপক, সহযোগী অধ্যাপক, সহকারী অধ্যাপক ও প্রভাষক পদের পাবলিকেশন ও টিচিং পয়েন্ট গণনার ছকসহ।'
    },
    {
      id: 'form-3',
      code: 'BOU-CHALLAN-JB-01',
      titleBn: 'জনতা ব্যাংক লিমিটেড বাউবি নিয়োগ ফি জমার নির্ধারিত পে-অর্ডার / চালান ফর্ম',
      titleEn: 'Janata Bank Recruitment Fee Deposit Slip / Pay-Order Specimen',
      category: 'challan',
      pages: 1,
      fileSize: '৪৫০ কিলোবাইট',
      updatedDate: '০১ জানুয়ারি ২০২৫',
      description: 'হিসাব নম্বর: BOU Fund-0100025984136 এ সরাসরি জমাদানের জন্য ৩ অংশের কার্বন কপি সম্বলিত রশিদ।'
    },
    {
      id: 'form-4',
      code: 'BOU-CHALLAN-SONALI-02',
      titleBn: 'সোনালী ব্যাংক ট্রেজারি চালান (১/বিবিধ কোড) পূরণ নির্দেশিকা ও ফর্ম',
      titleEn: 'Sonali Bank Treasury Challan Form (Code: 1-0741-0000-2681)',
      category: 'challan',
      pages: 2,
      fileSize: '৬২০ কিলোবাইট',
      updatedDate: '০৫ জানুয়ারি ২০২৫',
      description: 'সরকারি ট্রেজারি চালানের মাধ্যমে নিয়োগ ফি পরিশোধকারীদের জন্য নির্ধারিত নমুনা ছক।'
    },
    {
      id: 'form-5',
      code: 'BOU-DECLARATION-FF',
      titleBn: 'মুক্তিযোদ্ধা / শহীদ মুক্তিযোদ্ধার সন্তান ও নাতি-নাতনি প্রত্যয়ন অঙ্গীকারনামা',
      titleEn: 'Freedom Fighter Quota Verification Declaration & Legal Undertaking',
      category: 'declaration',
      pages: 1,
      fileSize: '৩২০ কিলোবাইট',
      updatedDate: '১২ ডিসেম্বর ২০২৪',
      description: 'জাতীয় মুক্তিযোদ্ধা কাউন্সিল (জামুকা) বা মুক্তিযুদ্ধ বিষয়ক মন্ত্রণালয়ের গেজেট নম্বর সংযোজনের অঙ্গীকারনামা।'
    },
    {
      id: 'form-6',
      code: 'BOU-DECLARATION-NOC',
      titleBn: 'চাকরিরত প্রার্থীদের যথাযথ কর্তৃপক্ষের নিকট থেকে ছাড়পত্র (NOC) গ্রহণের নমুনা',
      titleEn: 'No Objection Certificate (NOC) Specimen for In-Service Candidates',
      category: 'declaration',
      pages: 1,
      fileSize: '২৮০ কিলোবাইট',
      updatedDate: '১৮ ডিসেম্বর ২০২৪',
      description: 'সরকারি, আধা-সরকারি বা স্বায়ত্তশাসিত সংস্থায় কর্মরত প্রার্থীদের মৌখিক পরীক্ষার সময় দাখিলের জন্য।'
    },
    {
      id: 'form-7',
      code: 'BOU-GUIDELINE-PHOTO-SIG',
      titleBn: 'ছবি, ডিজিটাল স্বাক্ষর ও সনদপত্র স্ক্যান ও সাইজিং হ্যান্ডবুক',
      titleEn: 'Photo, Digital Signature & Certificate Bundling Guideline',
      category: 'guideline',
      pages: 3,
      fileSize: '১.৫ মেগাবাইট',
      updatedDate: '২০ জানুয়ারি ২০২৫',
      description: '৩০০×৩০০ পিক্সেল ছবি, ৩০০×৮০ পিক্সেল স্বাক্ষর ও একক ৫ মেগাবাইট পিডিএফ বান্ডিল তৈরির সচিত্র নিয়মাবলি।'
    },
    {
      id: 'form-8',
      code: 'BOU-POLICY-2025',
      titleBn: 'বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় নিয়োগ নীতিমালা ও সার্ভিস রুলস (পরিমার্জিত)',
      titleEn: 'BOU Recruitment Policy, Qualifications & Service Rules Code',
      category: 'guideline',
      pages: 28,
      fileSize: '৪.৮ মেগাবাইট',
      updatedDate: '০১ জানুয়ারি ২০২৫',
      description: 'পদভিত্তিক শিক্ষাগত যোগ্যতার সমমান নির্ধারণ, অভিজ্ঞতা শর্ত ও বয়স ছাড় সংক্রান্ত সরকারি গেজেট।'
    }
  ];

  const filteredForms = officialForms.filter((f) => {
    const matchCategory = selectedCategory === 'all' || f.category === selectedCategory;
    const matchQuery =
      f.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  const handleDownloadTrigger = (form: FormItem) => {
    setDownloadSuccessModal(form);
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-muted-foreground">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
          className="hover:text-foreground flex items-center gap-1 cursor-pointer font-medium"
        >
          <span className="material-symbols-outlined text-[16px]">home</span>
          হোমপেজ
        </a>
        <span>/</span>
        <span className="text-foreground font-semibold">নিয়োগ ফর্ম ও চালান কপি ডাউনলোড সেন্টার</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-border shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-fixed text-primary">
            <span className="material-symbols-outlined text-[16px]">folder_zip</span>
            <span>অফিসিয়াল ডাউনলোড সেন্টার</span>
          </div>
          <h1 className="font-display-md text-foreground font-bold">
            বাউবি নিয়োগ সংক্রান্ত প্রমিত ফর্ম ও ব্যাংক চালানের ছক
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            অনলাইনে আবেদন করার পাশাপাশি অফলাইনে সংরক্ষিত রাখার জন্য প্রমিত সরকারি আবেদন মডেল, জনতা ব্যাংক পে-অর্ডার স্লিপ, বিভাগীয় প্রার্থীদের অনাপত্তি সনদ (NOC) এবং কোটার অঙ্গীকারনামা পিডিএফ আকারে ডাউনলোড করুন।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('wizard')}
            className="h-10 px-4 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>অনলাইনে সরাসরি আবেদন</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {[
            { id: 'all', label: 'সকল ফর্ম ও নির্দেশিকা' },
            { id: 'application', label: 'আবেদন ফর্ম' },
            { id: 'challan', label: 'ব্যাংক চালান ও পে-অর্ডার' },
            { id: 'declaration', label: 'প্রত্যয়ন ও NOC' },
            { id: 'guideline', label: 'নির্দেশিকা ও নীতিমালা' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-surface-subtle text-muted-foreground hover:text-foreground hover:bg-surface-container'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted-foreground text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ফর্মের নাম বা কোড খুঁজুন..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Forms Listing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredForms.map((form) => (
          <div
            key={form.id}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-container text-foreground border border-border">
                  {form.code}
                </span>
                <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  {form.updatedDate}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-foreground leading-snug">{form.titleBn}</h3>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{form.titleEn}</p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {form.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">description</span>
                  {form.pages} পৃষ্ঠা
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">attach_file</span>
                  {form.fileSize}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadTrigger(form)}
                  className="px-3 py-1.5 rounded-lg bg-surface-subtle text-foreground hover:bg-surface-container border border-border text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  title="প্রিভিউ দেখুন"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>প্রিভিউ</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadTrigger(form)}
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>PDF ডাউনলোড</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Download / Preview Modal */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">picture_as_pdf</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">অফিসিয়াল ডকুমেন্ট রেডি</h4>
                  <p className="text-[11px] font-mono text-muted-foreground">{downloadSuccessModal.code}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDownloadSuccessModal(null)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="font-semibold text-foreground">{downloadSuccessModal.titleBn}</p>
              <div className="p-3 bg-surface-subtle rounded-xl border border-border space-y-1 text-muted-foreground">
                <p><strong>পৃষ্ঠা সংখ্যা:</strong> {downloadSuccessModal.pages} পাতা</p>
                <p><strong>ফাইল সাইজ:</strong> {downloadSuccessModal.fileSize}</p>
                <p><strong>সর্বশেষ সংস্করণ:</strong> {downloadSuccessModal.updatedDate}</p>
                <p><strong>ফরম্যাট:</strong> Print-Ready Vector PDF (A4 Size)</p>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                ডাউনলোড প্রস্তুত সম্পন্ন হয়েছে। আপনার ডিভাইসে সেভ করার নির্দেশ পাঠানো হয়েছে।
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setDownloadSuccessModal(null)}
                className="px-4 py-2 rounded-lg bg-surface-subtle hover:bg-surface-container text-foreground text-xs font-semibold cursor-pointer"
              >
                বন্ধ করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                  setDownloadSuccessModal(null);
                }}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                সরাসরি প্রিন্ট করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
