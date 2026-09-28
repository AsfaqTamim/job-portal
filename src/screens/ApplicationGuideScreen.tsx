import React, { useState } from 'react';
import { ScreenId } from '../types';

interface ApplicationGuideScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const ApplicationGuideScreen: React.FC<ApplicationGuideScreenProps> = ({ onNavigate }) => {
  // Checklist state initialized with the items checked in the prototype
  const [checklist, setChecklist] = useState({
    nid: true,
    photo: true,
    signature: true,
    education: false,
    combinedPdf: false,
    payorder: true,
    references: false,
  });

  const [activeStepModal, setActiveStepModal] = useState<number | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [personalFormCompleted, setPersonalFormCompleted] = useState(false);

  // Calculate checked count
  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const totalItems = Object.keys(checklist).length;

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleStartAdvance = () => {
    setIsAdvancing(true);
    setTimeout(() => {
      setIsAdvancing(false);
      onNavigate('wizard');
    }, 350);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Context Header & Application Tracker Meta */}
      <section className="w-full bg-surface-container-lowest shadow-xs border-b border-border">
        <div className="max-w-7xl mx-auto px-margin py-space-md sm:py-space-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            {/* Breadcrumbs & Circular Reference */}
            <div className="space-y-space-xs">
              <nav aria-label="Breadcrumbs" className="flex flex-wrap items-center gap-1.5 font-label-sm text-muted-foreground">
                <a 
                  className="hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer font-medium" 
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                >
                  <span className="material-symbols-outlined text-[16px]">home</span>
                  হোমপেজ
                </a>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer font-medium" 
                  href="#job-circulars"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('circular');
                  }}
                >
                  নিয়োগ বিজ্ঞপ্তি
                </a>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span 
                  className="font-medium text-foreground bg-surface-container px-2 py-0.5 rounded-lg text-primary-container border border-border cursor-pointer"
                  onClick={() => onNavigate('circular')}
                  title="বিজ্ঞপ্তি বিস্তারিত দেখুন"
                >
                  BOU/ADMIN/2025/01
                </span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                <span className="text-on-surface-variant font-medium">আবেদন পূর্ব প্রস্তুতি ও ধাপ পরিচিতি</span>
              </nav>

              <div className="flex flex-wrap items-baseline gap-space-sm pt-0.5">
                <h1 className="text-headline-lg font-headline font-semibold text-foreground tracking-tight">
                  সেকশন অফিসার (প্রশাসন ও পরীক্ষা শাখা)
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-caption font-medium bg-secondary-fixed text-on-secondary-fixed border border-secondary-fixed-dim">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  গ্রেড-৯ (জাতীয় স্কেল ২০১৫: ২২,০০০ - ৫৩,০৬০/-)
                </span>
              </div>
            </div>

            {/* Session Status & Candidate Tag */}
            <div className="flex items-center gap-space-md bg-surface-container-low p-space-sm rounded-xl border border-border">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-body-lg shadow-xs">
                সা
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-headline-sm text-foreground text-sm font-semibold">মো: সাইফুল ইসলাম</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-success-muted text-[#065F46] border border-success/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-success mr-1"></span>
                    খসড়া সংরক্ষিত
                  </span>
                </div>
                <div className="flex items-center gap-2 text-caption text-muted-foreground">
                  <span>ট্র্যাকিং আইডি: <span className="font-mono font-medium text-foreground">BOU-2025-08914</span></span>
                  <span>•</span>
                  <span className="text-success flex items-center gap-0.5 font-medium">
                    <span className="material-symbols-outlined text-[12px]">cloud_done</span> ক্লাউড সিঙ্কড
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Canvas */}
      <div className="max-w-7xl mx-auto px-margin py-space-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
          {/* Left Column: Stepper & Statutory Warnings (8 Cols) */}
          <div className="lg:col-span-8 space-y-space-lg">
            {/* Statutory Notification & Age Cutoff Banner */}
            <div className="bg-gradient-to-r from-primary-container to-secondary text-on-primary rounded-xl p-space-lg shadow-md relative overflow-hidden border border-primary/20">
              <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/5 pointer-events-none"></div>
              <div className="flex items-start gap-space-md relative z-10">
                <div className="p-2.5 bg-white/10 rounded-lg text-primary-fixed shrink-0 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[28px] block">verified_user</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-sm font-semibold text-on-primary">বিজ্ঞপ্তির বিধিবদ্ধ সাধারণ নির্দেশনা ও বয়সসীমা</h2>
                    <span className="bg-warning text-foreground text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">জরুরি</span>
                  </div>
                  <p className="font-body-sm text-primary-fixed leading-relaxed">
                    <strong className="text-on-primary">১৫ মার্চ ২০২৫ খ্রি:</strong> তারিখে প্রার্থীর বয়স সর্বনিম্ন <span className="text-on-primary font-semibold">১৮ বছর</span> এবং সর্বোচ্চ <span className="text-on-primary font-semibold">৩০ বছর</span> হতে হবে। তবে বীর মুক্তিযোদ্ধা/শহীদ বীর মুক্তিযোদ্ধার সন্তান ও শারীরিক প্রতিবন্ধীদের ক্ষেত্রে সর্বোচ্চ বয়সসীমা ৩২ বছর পর্যন্ত শিথিলযোগ্য।
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-caption text-primary-fixed-dim">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">payments</span>
                      নিয়োগ আবেদন ফি: ১,০০০/- (জনতা ব্যাংক পে-অর্ডার)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">schedule</span>
                      আবেদনের শেষ সময়: ১০ এপ্রিল ২০২৫, রাত ১১:৫৯
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 9-Step Vertical-Horizontal Interactive Stepper Overview Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md gap-2 border-b border-border mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-md text-foreground">অনলাইন আবেদন যাত্রা (৯টি স্তর)</h3>
                    <span className="text-caption font-semibold px-2 py-0.5 bg-primary-container text-on-primary rounded-full">ধাপ ১ / ৯</span>
                  </div>
                  <p className="font-body-sm text-muted-foreground mt-0.5">ধারাবাহিকভাবে প্রতিটি ফর্ম পূরণ নিশ্চিত করে চূড়ান্ত কপি বাউবিতে পাঠাতে হবে</p>
                </div>
                <div className="inline-flex items-center gap-1 text-label-sm font-medium text-secondary bg-surface-container px-3 py-1.5 rounded-lg border border-border">
                  <span className="material-symbols-outlined text-[18px]">timer</span>
                  আনুমানিক সময়: ১৫-২০ মিনিট
                </div>
              </div>

              {/* Stepper Visualization Grid */}
              <div className="mt-space-md space-y-3">
                {/* Step 1: Active Current Step */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-container-low transition-all border border-primary-container/20 cursor-pointer"
                  onClick={() => setActiveStepModal(1)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-label-md shadow-xs">
                      ১
                    </div>
                    <div className="w-0.5 h-10 bg-primary-container/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-semibold flex items-center gap-2">
                        প্রাথমিক নির্দেশিকা ও প্রস্তুতি
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-primary text-on-primary">
                          চলমান ধাপ
                        </span>
                      </h4>
                      <span className="font-label-sm text-primary-container font-semibold">১০০% সম্পন্ন</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      যোগ্যতা যাচাই, বিধিবদ্ধ নিয়মাবলি পড়া, এবং সকল স্ক্যান কপি ও তথ্য সংগ্রহের চেকলিস্ট নিশ্চিতকরণ।
                    </p>
                  </div>
                </div>

                {/* Step 2: Next Step */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer hover:border-primary/50"
                  onClick={() => setActiveStepModal(2)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-semibold text-label-md border border-border">
                      ২
                    </div>
                    <div className="w-0.5 h-10 bg-outline-variant/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium flex items-center gap-2">
                        ব্যক্তিগত ও যোগাযোগ তথ্য (Personal & Contact)
                        {personalFormCompleted && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-success-muted text-[#065F46]">
                            সংরক্ষিত
                          </span>
                        )}
                      </h4>
                      <span className="text-caption text-muted-foreground font-mono">পরবর্তী স্তর</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      প্রার্থীর নাম (বাংলা ও ইংরেজি), পিতা-মাতার বিবরণ, ১০/১৭ ডিজিট NID, জন্ম তারিখ, মোবাইল নম্বর ও বিকল্প নম্বর।
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer"
                  onClick={() => setActiveStepModal(3)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-semibold text-label-md border border-border">
                      ৩
                    </div>
                    <div className="w-0.5 h-10 bg-outline-variant/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium">বর্তমান ও স্থায়ী ঠিকানা (Address Verification)</h4>
                      <span className="text-caption text-muted-foreground font-mono">অসম্পূর্ণ</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      বিভাগ, জেলা, উপজেলা/থানা, ডাকঘর ও পোস্টাল কোডসহ পূর্ণাঙ্গ চিঠিপত্র প্রেরণের ঠিকানা।
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer"
                  onClick={() => setActiveStepModal(4)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-semibold text-label-md border border-border">
                      ৪
                    </div>
                    <div className="w-0.5 h-10 bg-outline-variant/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium">শিক্ষাগত যোগ্যতা ও ফলাফল (Academic History)</h4>
                      <span className="text-caption text-muted-foreground font-mono">অসম্পূর্ণ</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      এসএসসি/সমমান থেকে স্নাতকোত্তর ডিগ্রি পর্যন্ত পরীক্ষার নাম, বোর্ড/বিশ্ববিদ্যালয়, সিজিপিএ এবং পাশের সন।
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer"
                  onClick={() => setActiveStepModal(5)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-semibold text-label-md border border-border">
                      ৫
                    </div>
                    <div className="w-0.5 h-10 bg-outline-variant/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium flex items-center gap-2">
                        পেশাগত অভিজ্ঞতা বিবরণী
                        <span className="text-caption font-normal px-1.5 py-0.2 bg-muted text-muted-foreground rounded">ঐচ্ছিক</span>
                      </h4>
                      <span className="text-caption text-muted-foreground font-mono">অসম্পূর্ণ</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      পূর্বতন বা বর্তমান কর্মসংস্থান, পদবি, বেতন গ্রেড, দায়িত্বের ধরন এবং নিয়োগকারী কর্তৃপক্ষের অনাপত্তিপত্র (NOC)।
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer"
                  onClick={() => setActiveStepModal(6)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-semibold text-label-md border border-border">
                      ৬
                    </div>
                    <div className="w-0.5 h-10 bg-outline-variant/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium">প্রত্যয়নকারী ২ জন ব্যক্তির তথ্য (Two References)</h4>
                      <span className="text-caption text-muted-foreground font-mono">রক্তের সম্পর্কহীন</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      প্রার্থীকে অন্তত এক বছর ধরে চেনেন এমন দুই বিশিষ্ট ব্যক্তি বা বিশ্ববিদ্যালয়ের শিক্ষকের পরিচিতি ও সক্রিয় সেল নম্বর।
                    </p>
                  </div>
                </div>

                {/* Step 7 */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer"
                  onClick={() => setActiveStepModal(7)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-semibold text-label-md border border-border">
                      ৭
                    </div>
                    <div className="w-0.5 h-10 bg-outline-variant/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium">ছবি, স্বাক্ষর ও সমন্বিত সনদ আপলোড</h4>
                      <span className="text-caption text-muted-foreground font-mono">৩০০×৩০০ ও ৩০০×৮০</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      রঙিন ছবি, স্পষ্ট ডিজিটাল স্বাক্ষর এবং সকল সনদের একক মার্জড পিডিএফ ফাইল (সর্বোচ্চ ১০ এমবি) আপলোড।
                    </p>
                  </div>
                </div>

                {/* Step 8 */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer"
                  onClick={() => setActiveStepModal(8)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-semibold text-label-md border border-border">
                      ৮
                    </div>
                    <div className="w-0.5 h-10 bg-outline-variant/30 my-1"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium">লিগ্যাল আবেদন প্রিভিউ ও চূড়ান্ত সাবমিশন</h4>
                      <span className="text-caption text-muted-foreground font-mono">চূড়ান্ত নিশ্চিতকরণ</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      আবেদনপত্রের ৪ পাতার ড্রাফট প্রিভিউ যাচাই, হলফনামা অনুমোদন এবং স্থায়ী ডিজিটাল অ্যাপ্লিকেশন আইডি সংগ্রহ।
                    </p>
                  </div>
                </div>

                {/* Step 9 */}
                <div 
                  className="flex items-start gap-space-md p-space-md rounded-xl bg-surface-subtle hover:bg-surface-container-lowest transition-all border border-border/70 cursor-pointer"
                  onClick={() => setActiveStepModal(9)}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-label-md border border-secondary-fixed-dim">
                      ৯
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-headline-sm text-foreground font-medium flex items-center gap-2">
                        ব্যাংক ড্রাফট ও হার্ডকপি সরাসরি/ডাকযোগে প্রেরণ
                        <span className="text-caption font-semibold px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded">বাধ্যতামূলক</span>
                      </h4>
                      <span className="text-caption text-muted-foreground font-mono">গাজীপুর ক্যাম্পাস</span>
                    </div>
                    <p className="font-body-sm text-muted-foreground mt-0.5">
                      অনলাইন আবেদন ফরম প্রিন্ট করে স্বাক্ষরপূর্বক ৩ সেট ও মূল পে-অর্ডার বাউবি রেজিস্ট্রার দপ্তরে নির্ধারিত তারিখের মধ্যে পৌঁছানো।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Callout Box */}
            <div className="p-space-md rounded-xl bg-error-container text-on-error-container flex items-start gap-space-sm border border-error/20">
              <span className="material-symbols-outlined text-[22px] shrink-0 mt-0.5">gavel</span>
              <div className="space-y-0.5">
                <h5 className="font-headline-sm text-sm font-semibold">সতর্কীকরণ ও আইনি দায়বদ্ধতা</h5>
                <p className="font-body-sm text-xs leading-relaxed">
                  অনলাইন ফর্মে কোনো অসত্য, বিকৃত বা জাল তথ্য অথবা সনদ প্রদান করলে নিয়োগ প্রক্রিয়া চলাকালীন কিংবা পরবর্তীকালে যেকোনো পর্যায়ে প্রার্থিতা বা নিয়োগ তাৎক্ষণিকভাবে বাতিল বলে গণ্য হবে এবং পেনাল কোড অনুযায়ী ফৌজদারি ব্যবস্থা নেওয়া হবে।
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Required Documents Checklist (4 Cols) */}
          <div className="lg:col-span-4 space-y-space-lg">
            {/* Checklist Interactive Card */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg border border-border">
              <div className="flex items-center justify-between border-b border-border pb-space-sm mb-space-md">
                <div>
                  <h3 className="font-headline-sm font-semibold text-foreground flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[20px] text-primary-container">fact_check</span>
                    প্রস্তুতি চেকলিস্ট
                  </h3>
                  <p className="font-caption text-muted-foreground">ফর্ম পূরণের আগে নিশ্চিত করুন</p>
                </div>
                <span className="text-caption font-mono font-medium bg-surface-container px-2 py-1 rounded text-foreground border border-border">
                  ৭টি আইটেম
                </span>
              </div>

              <div className="space-y-space-sm" id="applicantChecklist">
                {/* Checklist Item 1 */}
                <label className="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors cursor-pointer select-none border border-border/50">
                  <input 
                    type="checkbox" 
                    checked={checklist.nid} 
                    onChange={() => toggleCheck('nid')}
                    className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-0 cursor-pointer" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-foreground text-xs font-semibold">জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন</p>
                    <p className="font-caption text-muted-foreground">১০ বা ১৭ ডিজিটের এনআইডি নম্বর ও স্পষ্ট স্ক্যান কপি</p>
                  </div>
                </label>

                {/* Checklist Item 2 */}
                <label className="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors cursor-pointer select-none border border-border/50">
                  <input 
                    type="checkbox" 
                    checked={checklist.photo} 
                    onChange={() => toggleCheck('photo')}
                    className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-0 cursor-pointer" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-foreground text-xs font-semibold">রঙিন পাসপোর্ট সাইজ ছবি</p>
                    <p className="font-caption text-muted-foreground">৩০০ × ৩০০ পিক্সেল, সাদা ব্যাকগ্রাউন্ড, সর্বোচ্চ ১ মেগাবাইট</p>
                  </div>
                </label>

                {/* Checklist Item 3 */}
                <label className="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors cursor-pointer select-none border border-border/50">
                  <input 
                    type="checkbox" 
                    checked={checklist.signature} 
                    onChange={() => toggleCheck('signature')}
                    className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-0 cursor-pointer" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-foreground text-xs font-semibold">ডিজিটাল স্বাক্ষরের স্ক্যান</p>
                    <p className="font-caption text-muted-foreground">৩০০ × ৮০ পিক্সেল, সাদা কাগজে স্পষ্ট কালো কালির সই</p>
                  </div>
                </label>

                {/* Checklist Item 4 */}
                <label className="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors cursor-pointer select-none border border-border/50">
                  <input 
                    type="checkbox" 
                    checked={checklist.education} 
                    onChange={() => toggleCheck('education')}
                    className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-0 cursor-pointer" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-foreground text-xs font-semibold">শিক্ষাগত সনদ ও মার্কশিট</p>
                    <p className="font-caption text-muted-foreground">এসএসসি, এইচএসসি, স্নাতক ও স্নাতকোত্তরের নম্বর ও সিজিপিএ</p>
                  </div>
                </label>

                {/* Checklist Item 5 */}
                <label className="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors cursor-pointer select-none border border-border/50">
                  <input 
                    type="checkbox" 
                    checked={checklist.combinedPdf} 
                    onChange={() => toggleCheck('combinedPdf')}
                    className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-0 cursor-pointer" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-foreground text-xs font-semibold">একীভূত পিডিএফ ফাইল (Combined PDF)</p>
                    <p className="font-caption text-muted-foreground">সকল সার্টিফিকেটের সত্যায়িত কপি একত্রিত করে সর্বোচ্চ ১০ MB</p>
                  </div>
                </label>

                {/* Checklist Item 6 */}
                <label className="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors cursor-pointer select-none border border-border/50">
                  <input 
                    type="checkbox" 
                    checked={checklist.payorder} 
                    onChange={() => toggleCheck('payorder')}
                    className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-0 cursor-pointer" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-foreground text-xs font-semibold">ব্যাংক পে-অর্ডার ড্রাফট রসিদ</p>
                    <p className="font-caption text-muted-foreground">জনতা ব্যাংক পিএলসি হতে ১,০০০/- টাকার পে-অর্ডার বিবরণ</p>
                  </div>
                </label>

                {/* Checklist Item 7 */}
                <label className="flex items-start gap-space-sm p-2.5 rounded-lg bg-surface-subtle hover:bg-surface-container transition-colors cursor-pointer select-none border border-border/50">
                  <input 
                    type="checkbox" 
                    checked={checklist.references} 
                    onChange={() => toggleCheck('references')}
                    className="mt-1 w-4 h-4 rounded text-primary-container accent-primary-container focus:ring-0 cursor-pointer" 
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-label-md text-foreground text-xs font-semibold">২ জন রেফারেন্স ব্যক্তির তথ্য</p>
                    <p className="font-caption text-muted-foreground">পদবি, প্রতিষ্ঠান, অফিসিয়াল মোবাইল ও কর্মস্থলের সঠিক ঠিকানা</p>
                  </div>
                </label>
              </div>

              {/* Checklist Progress Counter */}
              <div className="mt-space-md pt-space-sm bg-surface-container-low p-space-sm rounded-lg text-caption text-muted-foreground flex items-center justify-between border border-border/50">
                <span>প্রস্তুতির অগ্রগতি:</span>
                <span className="font-semibold text-foreground font-mono" id="checklistProgress">
                  {checkedCount} / {totalItems} প্রস্তুত
                </span>
              </div>
            </div>

            {/* Helpdesk & Assistance Box */}
            <div className="bg-surface-container-lowest rounded-xl shadow-xs p-space-lg space-y-space-sm border border-border">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">support_agent</span>
                <h4 className="font-headline-sm text-sm font-semibold text-foreground">অনলাইন আবেদন হেল্পডেস্ক</h4>
              </div>
              <p className="font-body-sm text-xs text-muted-foreground leading-normal">
                আবেদন ফরম পূরণে কোনো প্রযুক্তিগত সমস্যার সম্মুখীন হলে কম্পিউটার বিভাগের সহায়তা নম্বরে যোগাযোগ করুন।
              </p>
              <div className="space-y-1.5 pt-1 font-body-sm text-xs">
                <div className="flex items-center justify-between py-1 px-2 bg-surface-subtle rounded border border-border/40">
                  <span className="text-muted-foreground">হেল্পলাইন:</span>
                  <span className="font-mono font-medium text-foreground">+৮৮০ ২-৯২৯১১০১-৪</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2 bg-surface-subtle rounded border border-border/40">
                  <span className="text-muted-foreground">ইমেইল:</span>
                  <span className="font-mono font-medium text-foreground">recruitment@bou.ac.bd</span>
                </div>
                <div className="flex items-center justify-between py-1 px-2 bg-surface-subtle rounded border border-border/40">
                  <span className="text-muted-foreground">সময়সূচি:</span>
                  <span className="font-medium text-foreground">রবি-বৃহঃ (সকাল ৯টা - বিকাল ৪টা)</span>
                </div>
              </div>
            </div>

            {/* Visual Verification Seal */}
            <div className="p-space-md rounded-xl bg-surface-container flex items-center gap-space-md border border-border">
              <div className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-xs text-primary border border-border">
                <span className="material-symbols-outlined text-[28px]">account_balance</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-foreground font-semibold text-xs">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়</p>
                <p className="font-caption text-muted-foreground text-[11px]">কেন্দ্রীয় নিয়োগ ও প্রশাসন সেল, গাজীপুর</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Bar (Fixed/Sticky Dock) */}
      {/* Matches xpath: //aside//a[contains(., 'বিজ্ঞপ্তিতে ফিরে যান')] */}
      <aside className="sticky bottom-0 left-0 right-0 z-40 bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.06)] py-space-sm sm:py-space-md border-t border-border">
        <div className="max-w-7xl mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm">
          {/* Auto Save Indicator & Steps Remaining */}
          <div className="flex items-center gap-space-md text-body-sm text-muted-foreground w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse"></span>
              <span className="font-medium text-foreground text-xs">অটো-ড্রাফট সক্রিয়</span>
              <span className="font-mono text-caption text-muted-foreground hidden sm:inline">(ID: BOU-2025-08914)</span>
            </div>
            <div className="text-caption bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-medium border border-border">
              অবশিষ্ট ধাপ: ৮টি
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button 
              className="h-9 px-space-md font-label-md text-xs sm:text-sm text-on-surface-variant hover:text-foreground hover:bg-surface-subtle rounded-lg inline-flex items-center gap-1.5 transition-colors border border-border cursor-pointer"
              type="button"
              onClick={() => alert('বিজ্ঞপ্তি ডাউনলোড শুরু হয়েছে')}
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span className="hidden sm:inline">বিজ্ঞপ্তি</span> ডাউনলোড
            </button>
            <a 
              className="h-9 px-space-md font-label-md text-xs sm:text-sm text-secondary hover:text-foreground hover:bg-surface-subtle rounded-lg inline-flex items-center gap-1 transition-colors border border-border cursor-pointer font-medium" 
              href="#circulars"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('circular');
              }}
            >
              বিজ্ঞপ্তিতে ফিরে যান
            </a>
            <button 
              className="h-10 px-space-xl font-label-md text-sm bg-primary-container text-on-primary hover:bg-primary transition-all rounded-lg inline-flex items-center justify-center gap-2 shadow-xs font-semibold active:scale-[0.99] cursor-pointer" 
              id="startApplicationBtn" 
              type="button"
              onClick={handleStartAdvance}
              disabled={isAdvancing}
            >
              {isAdvancing ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>লোড হচ্ছে...</span>
                </>
              ) : (
                <>
                  <span>ব্যক্তিগত তথ্যে এগিয়ে যান</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Interactive Step Preview / Simulation Modal */}
      {activeStepModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-border max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-bold text-xs flex items-center justify-center">
                  {activeStepModal}
                </span>
                <h3 className="font-headline-sm text-foreground">
                  {activeStepModal === 1 && 'ধাপ ১: প্রাথমিক নির্দেশিকা ও প্রস্তুতি'}
                  {activeStepModal === 2 && 'ধাপ ২: ব্যক্তিগত ও যোগাযোগ তথ্য (Personal & Contact)'}
                  {activeStepModal === 3 && 'ধাপ ৩: বর্তমান ও স্থায়ী ঠিকানা'}
                  {activeStepModal === 4 && 'ধাপ ৪: শিক্ষাগত যোগ্যতা ও ফলাফল'}
                  {activeStepModal === 5 && 'ধাপ ৫: পেশাগত অভিজ্ঞতা বিবরণী'}
                  {activeStepModal === 6 && 'ধাপ ৬: প্রত্যয়নকারী ২ জন ব্যক্তির তথ্য (Two References)'}
                  {activeStepModal === 7 && 'ধাপ ৭: ছবি, স্বাক্ষর ও সমন্বিত সনদ আপলোড'}
                  {activeStepModal === 8 && 'ধাপ ৮: লিগ্যাল আবেদন প্রিভিউ ও চূড়ান্ত সাবমিশন'}
                  {activeStepModal === 9 && 'ধাপ ৯: ব্যাংক ড্রাফট ও হার্ডকপি ডাকযোগে প্রেরণ'}
                </h3>
              </div>
              <button 
                className="text-muted-foreground hover:text-foreground cursor-pointer"
                onClick={() => setActiveStepModal(null)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body depending on step */}
            <div className="py-4">
              {activeStepModal === 1 && (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>আপনি সফলভাবে প্রাথমিক নির্দেশিকা ও সকল শর্তাবলি অবলোকন করেছেন। আপনার আবেদন আইডি <strong className="text-foreground">BOU-2025-08914</strong> তৈরি করা হয়েছে।</p>
                  <div className="p-3 bg-success-muted text-[#065f46] rounded-lg text-xs">
                    সবগুলো প্রস্তুতি সম্পন্ন হলে পরবর্তী পদক্ষেপে ব্যক্তিগত তথ্য প্রদান করুন।
                  </div>
                </div>
              )}

              {activeStepModal === 2 && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setPersonalFormCompleted(true);
                  alert('ব্যক্তিগত তথ্য সফলভাবে সংরক্ষিত হয়েছে!');
                  setActiveStepModal(null);
                }} className="space-y-4 text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">প্রার্থীর নাম (বাংলায়) *</label>
                      <input defaultValue="মো: সাইফুল ইসলাম" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Applicant Name (English) *</label>
                      <input defaultValue="Md. Saiful Islam" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground uppercase" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">পিতার নাম (বাংলায়) *</label>
                      <input defaultValue="মো: রফিকুল ইসলাম" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">মাতার নাম (বাংলায়) *</label>
                      <input defaultValue="মোসা: সালমা বেগম" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">জাতীয় পরিচয়পত্র নম্বর (১০ বা ১৭ ডিজিট) *</label>
                      <input defaultValue="19922695500000123" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">জন্ম তারিখ *</label>
                      <input defaultValue="1994-05-12" type="date" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">মোবাইল নম্বর *</label>
                      <input defaultValue="01712345678" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground font-mono" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">ইমেইল ঠিকানা *</label>
                      <input defaultValue="saiful.candidate@example.com" type="email" required className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground font-mono" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-surface-subtle rounded-lg">
                    <input type="checkbox" id="ff_quota" className="w-4 h-4 rounded text-primary" />
                    <label htmlFor="ff_quota" className="text-xs text-foreground cursor-pointer">
                      বীর মুক্তিযোদ্ধা / শহীদ মুক্তিযোদ্ধার সন্তান কোটা দাবিদার (সনদ আবশ্যক)
                    </label>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-border">
                    <button type="button" onClick={() => setActiveStepModal(null)} className="px-4 py-2 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-surface-variant">বন্ধ করুন</button>
                    <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container">তথ্য সংরক্ষণ করুন</button>
                  </div>
                </form>
              )}

              {activeStepModal >= 3 && (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>এই ধাপটি পরবর্তী ফর্মে সক্রিয় হবে। আপনার খসড়া আইডি <strong className="text-foreground">BOU-2025-08914</strong> তে অগ্রগতি সংরক্ষিত হচ্ছে।</p>
                  <div className="p-4 bg-surface-subtle rounded-lg border border-border text-xs space-y-2">
                    <p className="font-semibold text-foreground">সংরক্ষিত তথ্যের স্থিতি:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>পদের নাম: সেকশন অফিসার (প্রশাসন ও পরীক্ষা শাখা)</li>
                      <li>সার্কুলার: BOU/ADMIN/2025/01</li>
                      <li>ফি স্ট্যাটাস: ১,০০০/- টাকা (জনতা ব্যাংক পে-অর্ডার)</li>
                      <li>চেকলিস্ট অগ্রগতি: {checkedCount} / {totalItems} সম্পন্ন</li>
                    </ul>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button onClick={() => setActiveStepModal(null)} className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold">ঠিক আছে</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
