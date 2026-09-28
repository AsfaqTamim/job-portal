import React from 'react';
import { ScreenId } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-background mt-auto border-t border-border">
      <div className="max-w-7xl mx-auto px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter-lg">
          <div className="space-y-space-md md:col-span-1">
            <div className="flex items-center gap-space-sm">
              <img 
                alt="BOU Official Emblem" 
                className="h-8 w-auto object-contain" 
                src="https://lh3.googleusercontent.com/aida/AEtjO1W83jwZDSNplmJC8t9kqLX9-NVWcfN6T2emYCs3Q4__7uhW6Zdok7C44ZgMRLBAR3h4Rdi4SZEuFkLGT4uS5ArhKuXhD0mnOjN_sWCQedVM5S9FKciOAYGly5H1TU22SzW99sEBkuLCQv43HdVtqOf5Qg233Jp1msjHh_jqDoudHYmYHF2kFTV0WqBS8zZJl16uiWYJxiGCOvDb6Iv6UjJVRruzp_jBU_S44XNuC7ihFtbIfv_kSBxl4Q"
              />
              <span className="font-headline-sm text-headline-sm text-foreground">বাউবি নিয়োগ</span>
            </div>
            <p className="font-body-sm text-body-sm text-muted-foreground leading-relaxed">
              বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় একটি স্বায়ত্তশাসিত উচ্চশিক্ষা প্রতিষ্ঠান। দক্ষ ও যোগ্য মানবসম্পদ নিয়োগে আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-foreground">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-muted-foreground">
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="job-circulars" 
                  href="#job-circulars"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('circular');
                  }}
                >
                  সর্বশেষ বিজ্ঞপ্তি
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="admit-card" 
                  href="#admit-card"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guide');
                  }}
                >
                  প্রবেশপত্র ডাউনলোড
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="forms" 
                  href="#forms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('download_forms');
                  }}
                >
                  নিয়োগ ফর্ম ও চালান ছক
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="auth" 
                  href="#auth"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('auth');
                  }}
                >
                  লগইন ও প্রোফাইল
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="results-archive" 
                  href="#results-archive"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                  }}
                >
                  পরীক্ষার ফলাফল
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-foreground transition-colors" 
                  href="https://bou.ac.bd" 
                  rel="noreferrer" 
                  target="_blank"
                >
                  বাউবি কেন্দ্রীয় ওয়েবসাইট
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-foreground">সহায়তা ও বিধিমালা</h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-muted-foreground">
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="application-process" 
                  href="#application-process"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('guide');
                  }}
                >
                  আবেদন নিয়মাবলী
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="general-guidelines" 
                  href="#general-guidelines"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('circular');
                  }}
                >
                  কোটা ও শর্তাবলি
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-foreground transition-colors cursor-pointer" 
                  data-path="faq" 
                  href="#faq-section"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('faq-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                  }}
                >
                  সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর (FAQ)
                </a>
              </li>
              <li>
                <a className="hover:text-foreground transition-colors cursor-pointer" href="#privacy">
                  গোপনীয়তা নীতি
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-space-sm">
            <h3 className="font-headline-sm text-headline-sm text-foreground">প্রধান কার্যালয়</h3>
            <address className="not-italic font-body-sm text-body-sm text-muted-foreground space-y-space-xs">
              <p>রেজিস্ট্রার দপ্তর, প্রশাসন বিভাগ</p>
              <p>বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়, বোর্ড বাজার, গাজীপুর-১৭০৫</p>
              <p>ইমেইল: info@bou.ac.bd</p>
              <p>হেল্পলাইন: +৮৮০ ২-৯২৯১১০১-৪</p>
            </address>
          </div>
        </div>

        <div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm font-caption text-caption text-muted-foreground border-t border-border">
          <p>© ২০২৫ বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় | গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কর্তৃক স্বীকৃত</p>
          <p>কারিগরি সহযোগিতায়: বাউবি কম্পিউটার ও তথ্যপ্রযুক্তি বিভাগ</p>
        </div>
      </div>
    </footer>
  );
};
