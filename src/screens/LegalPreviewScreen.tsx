import React, { useState } from 'react';
import { ScreenId, ApplicationRecord } from '../types';

interface LegalPreviewProps {
  application: ApplicationRecord;
  onNavigate: (screen: ScreenId) => void;
  onSubmitFinal: () => void;
}

export const LegalPreviewScreen: React.FC<LegalPreviewProps> = ({ application, onNavigate, onSubmitFinal }) => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmittedSuccess(true);
      onSubmitFinal();
    }, 1000);
  };

  return (
    <div className="w-full bg-surface-subtle py-8 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-foreground">হোমপেজ</a>
          <span>/</span>
          <a href="#wizard" onClick={(e) => { e.preventDefault(); onNavigate('wizard'); }} className="hover:text-foreground">আবেদন ফরম</a>
          <span>/</span>
          <span className="text-foreground font-medium">লিগ্যাল সাইজ অ্যাপ্লিকেশন প্রিভিউ</span>
        </nav>

        {/* Top Control Bar */}
        <div className="bg-card rounded-xl p-4 shadow-xs border border-border flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">description</span>
            <div>
              <h2 className="font-bold text-foreground text-sm">চূড়ান্ত আবেদনপত্র (Legal-sheet Format)</h2>
              <p className="text-[11px] text-muted-foreground">দাখিল করার পূর্বে সকল তথ্য নিখুঁতভাবে যাচাই করুন।</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle border border-border text-foreground text-xs font-medium hover:bg-muted flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              প্রিন্ট ড্রাফট
            </button>
            <button
              type="button"
              onClick={() => onNavigate('wizard')}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle border border-border text-foreground text-xs font-medium hover:bg-muted flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>
              তথ্য সংশোধন
            </button>
          </div>
        </div>

        {/* Success Modal / Banner if submitted */}
        {submittedSuccess && (
          <div className="mb-6 p-6 rounded-2xl bg-success-muted text-[#065F46] border border-success/30 shadow-md animate-in zoom-in-95 space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-success">check_circle</span>
              <div>
                <h3 className="font-bold text-lg">আপনার আবেদন সফলভাবে গৃহীত হয়েছে!</h3>
                <p className="text-xs">ট্র্যাকিং নম্বর: <strong className="font-mono text-sm">{application.applicationNo}</strong></p>
              </div>
            </div>
            <p className="text-xs leading-relaxed">
              অনলাইন আবেদন কপিটি প্রিন্ট করে আপনার ৩ কপি সত্যায়িত ছবি, পে-অর্ডার স্লিপ ও সনদসমূহের সত্যায়িত কপি সহ আগামী <strong>১৫ মার্চ ২০২৫</strong> এর মধ্যে ডাকযোগে বাউবি কেন্দ্রীয় কার্যালয়, গাজীপুরে পৌঁছানো নিশ্চিত করুন।
            </p>
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 rounded-lg bg-success text-white font-medium text-xs shadow-xs hover:bg-emerald-700 cursor-pointer"
              >
                আমার ড্যাশবোর্ডে যান
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-white text-[#065F46] border border-success/40 font-medium text-xs hover:bg-emerald-50 cursor-pointer"
              >
                চূড়ান্ত কপি ডাউনলোড (Legal PDF)
              </button>
            </div>
          </div>
        )}

        {/* Legal Paper Mock Sheet (Exact BOU Application Specification) */}
        <div className="bg-white text-zinc-900 border-2 border-zinc-300 shadow-xl rounded-sm p-8 sm:p-12 space-y-6 font-serif text-[13px] leading-relaxed relative">
          {/* Institutional Header */}
          <div className="text-center space-y-1 pb-4 border-b-2 border-zinc-800">
            <div className="flex items-center justify-between mb-2">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1W83jwZDSNplmJC8t9kqLX9-NVWcfN6T2emYCs3Q4__7uhW6Zdok7C44ZgMRLBAR3h4Rdi4SZEuFkLGT4uS5ArhKuXhD0mnOjN_sWCQedVM5S9FKciOAYGly5H1TU22SzW99sEBkuLCQv43HdVtqOf5Qg233Jp1msjHh_jqDoudHYmYHF2kFTV0WqBS8zZJl16uiWYJxiGCOvDb6Iv6UjJVRruzp_jBU_S44XNuC7ihFtbIfv_kSBxl4Q"
                alt="Logo"
                className="w-16 h-16 object-contain"
              />
              <div className="text-center flex-1 pr-6">
                <h1 className="text-xl font-bold font-sans">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়</h1>
                <p className="text-xs">বোর্ড বাজার, গাজীপুর-১৭০৫</p>
                <h2 className="text-sm font-bold uppercase tracking-wider mt-1 underline">চাকরির আবেদন ফরম</h2>
              </div>
              {/* Photo Box */}
              <div className="w-24 h-28 border border-zinc-400 bg-zinc-50 flex items-center justify-center overflow-hidden shrink-0">
                <img src={application.photoUrl} alt="Photo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex items-center justify-between text-[11px] font-sans pt-2 border-t border-zinc-200">
              <span><strong>বিজ্ঞপ্তি নং:</strong> {application.circularNo}</span>
              <span><strong>আবেদন আইডি:</strong> <code className="font-bold">{application.applicationNo}</code></span>
              <span><strong>তারিখ:</strong> {new Date().toLocaleDateString('bn-BD')}</span>
            </div>
          </div>

          {/* Post Applied For */}
          <div className="p-2.5 bg-zinc-100 border border-zinc-300 rounded font-sans text-xs">
            <strong>আবেদনকৃত পদের নাম:</strong> {application.postTitle} | <strong>দপ্তর/শাখা:</strong> {application.postDepartment} | <strong>গ্রেড:</strong> {application.grade}
          </div>

          {/* 1. Personal Info Table */}
          <div className="space-y-1">
            <h3 className="font-bold font-sans text-xs uppercase bg-zinc-200 p-1">১. প্রার্থীর ব্যক্তিগত তথ্য</h3>
            <table className="w-full border-collapse border border-zinc-400 text-xs">
              <tbody>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold w-1/3">ক. প্রার্থীর নাম (বাংলায়)</td>
                  <td className="p-2 border border-zinc-400">{application.applicantNameBn}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold">খ. Applicant's Name (English)</td>
                  <td className="p-2 border border-zinc-400 font-mono">{application.applicantNameEn}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold">গ. পিতার নাম</td>
                  <td className="p-2 border border-zinc-400">{application.fatherNameBn}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold">ঘ. মাতার নাম</td>
                  <td className="p-2 border border-zinc-400">{application.motherNameBn}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold">ঙ. জন্ম তারিখ ও বয়স</td>
                  <td className="p-2 border border-zinc-400">{application.dateOfBirth} (কাট-অফ তারিখে বয়স: {application.ageAtCutoff} বছর)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold">চ. জাতীয় পরিচয়পত্র নম্বর (NID)</td>
                  <td className="p-2 border border-zinc-400 font-mono">{application.nid}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold">ছ. যোগাযোগ ও মোবাইল</td>
                  <td className="p-2 border border-zinc-400 font-mono">{application.phone} | {application.email}</td>
                </tr>
                <tr>
                  <td className="p-2 border border-zinc-400 font-bold">জ. বর্তমান ও স্থায়ী ঠিকানা</td>
                  <td className="p-2 border border-zinc-400">
                    <p><strong>বর্তমান:</strong> {application.presentAddress}</p>
                    <p className="mt-1"><strong>স্থায়ী:</strong> {application.permanentAddress}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 2. Educational Records */}
          <div className="space-y-1">
            <h3 className="font-bold font-sans text-xs uppercase bg-zinc-200 p-1">২. শিক্ষাগত যোগ্যতা</h3>
            <table className="w-full border-collapse border border-zinc-400 text-xs text-center">
              <thead>
                <tr className="bg-zinc-100 font-bold">
                  <th className="p-1.5 border border-zinc-400">পরীক্ষার নাম</th>
                  <th className="p-1.5 border border-zinc-400">বোর্ড / বিশ্ববিদ্যালয়</th>
                  <th className="p-1.5 border border-zinc-400">রোল নম্বর</th>
                  <th className="p-1.5 border border-zinc-400">পাশের সন</th>
                  <th className="p-1.5 border border-zinc-400">বিভাগ / সিজিপিএ</th>
                </tr>
              </thead>
              <tbody>
                {application.education.map((edu, i) => (
                  <tr key={i}>
                    <td className="p-1.5 border border-zinc-400 font-bold text-left">{edu.exam}</td>
                    <td className="p-1.5 border border-zinc-400">{edu.board}</td>
                    <td className="p-1.5 border border-zinc-400 font-mono">{edu.roll}</td>
                    <td className="p-1.5 border border-zinc-400 font-mono">{edu.passingYear}</td>
                    <td className="p-1.5 border border-zinc-400 font-bold">{edu.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. References */}
          <div className="space-y-1">
            <h3 className="font-bold font-sans text-xs uppercase bg-zinc-200 p-1">৩. প্রত্যয়নকারী ব্যক্তিদের বিবরণ (References)</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {application.references.map((ref, idx) => (
                <div key={idx} className="p-2 border border-zinc-300">
                  <p><strong>{idx + 1}. {ref.name}</strong></p>
                  <p>{ref.designation}</p>
                  <p className="font-mono text-zinc-600">ফোন: {ref.phone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Declaration and Sign-off */}
          <div className="pt-6 border-t border-zinc-300 space-y-4">
            <p className="text-[11px] text-justify text-zinc-700">
              আমি ঘোষণা করিতেছি যে, আমার জানামতে উপরোক্ত সকল বিবরণ সত্য। কোনো অসত্য তথ্য প্রমাণিত হইলে কর্তৃপক্ষ আমার বিরুদ্ধে আইনগত ব্যবস্থা গ্রহণ করিতে পারিবে।
            </p>
            <div className="flex items-end justify-between pt-6">
              <div className="text-left text-xs font-sans">
                <p>তারিখ: <strong>{new Date().toLocaleDateString('bn-BD')}</strong></p>
                <p>স্থান: <strong>ঢাকা</strong></p>
              </div>
              <div className="text-center font-sans">
                <div className="w-32 border-b border-zinc-800 pb-1 mb-1">
                  <span className="font-serif italic text-sm">{application.applicantNameEn}</span>
                </div>
                <p className="text-xs font-bold">আবেদনকারীর স্বাক্ষর</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Submission Action Dock */}
        {!submittedSuccess && (
          <div className="mt-8 p-4 bg-card rounded-xl border border-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-muted-foreground">
              চূড়ান্ত দাখিল করার পর আর তথ্য পরিবর্তন করা যাবে না।
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('wizard')}
                className="px-4 py-2.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground text-xs font-medium border border-border cursor-pointer"
              >
                আগের ধাপে ফিরে যান
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                    <span>সাবমিট হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <span>চূড়ান্তভাবে সাবমিট করুন (Final Submit)</span>
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
