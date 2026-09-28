import React, { useState } from 'react';
import { ScreenId, ApplicationRecord, ApplicationStatus } from '../types';

interface StaffReviewProps {
  application: ApplicationRecord;
  onNavigate: (screen: ScreenId) => void;
  onUpdateStatus: (
    appId: string, 
    newStatus: ApplicationStatus, 
    reason: string, 
    note: string, 
    checklist: ApplicationRecord['verificationChecklist']
  ) => void;
}

export const StaffApplicationReviewScreen: React.FC<StaffReviewProps> = ({
  application,
  onNavigate,
  onUpdateStatus
}) => {
  const [checklist, setChecklist] = useState({
    nid: application.verificationChecklist.nid,
    education: application.verificationChecklist.education,
    experience: application.verificationChecklist.experience,
    certificates: application.verificationChecklist.certificates,
    payment: application.verificationChecklist.payment,
    freedomFighter: application.verificationChecklist.freedomFighter
  });

  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>('verified');
  const [reason, setReason] = useState('');
  const [note, setNote] = useState('');

  // Check if eligible for Verified
  const allEligibleChecked = 
    checklist.nid && 
    checklist.education && 
    checklist.certificates && 
    checklist.payment && 
    (!application.freedomFighterClaimed || checklist.freedomFighter);

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStatus(application.id, targetStatus, reason, note, checklist);
    setDecisionModalOpen(false);
    alert(`আবেদনের স্ট্যাটাস সফলভাবে "${targetStatus}" এ হালনাগাদ করা হয়েছে!`);
    onNavigate('admin_applications');
  };

  return (
    <div className="w-full bg-surface-subtle py-8 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <a href="#admin" onClick={(e) => { e.preventDefault(); onNavigate('admin_applications'); }} className="hover:text-foreground">
            স্ক্রুটিনি রেজিস্টার
          </a>
          <span>/</span>
          <span className="text-foreground font-medium">আবেদনকারী যাচাইকরণ ও চেকলিস্ট</span>
        </nav>

        {/* Applicant Context Bar */}
        <div className="bg-card rounded-xl p-6 shadow-xs border border-border mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={application.photoUrl}
              alt="Candidate"
              className="w-16 h-16 rounded-lg object-cover border border-border shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">{application.applicantNameBn}</h1>
                <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-foreground border border-border">
                  {application.applicationNo}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {application.postTitle} • {application.grade} • বয়স: {application.ageAtCutoff} বছর
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span>NID: <strong className="font-mono text-foreground">{application.nid}</strong></span>
                <span>ফোন: <strong className="font-mono text-foreground">{application.phone}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-2 rounded-lg bg-surface-subtle border border-border text-foreground text-xs font-medium hover:bg-muted flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              হার্ডকপি প্রিন্ট
            </button>
            <button
              type="button"
              onClick={() => onNavigate('preview_legal')}
              className="px-3 py-2 rounded-lg bg-surface-subtle border border-border text-foreground text-xs font-medium hover:bg-muted flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              লিগ্যাল কপি
            </button>
          </div>
        </div>

        {/* Documents & Hardcopy Verification Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          {/* Candidate Data & Attachments (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs space-y-4">
              <h3 className="font-headline-sm text-foreground flex items-center gap-2 border-b border-border pb-2">
                <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
                শিক্ষাগত সনদ ও তথ্যাবলি
              </h3>
              <div className="space-y-2 text-xs">
                {application.education.map((edu, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-surface-subtle border border-border flex items-center justify-between">
                    <div>
                      <strong className="text-foreground">{edu.exam}</strong> - {edu.board}
                      <span className="text-muted-foreground block text-[11px]">পাস: {edu.passingYear} | রোল: {edu.roll}</span>
                    </div>
                    <span className="font-semibold text-primary">{edu.result}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Combined PDF Attachment Card */}
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-error text-[36px]">picture_as_pdf</span>
                <div>
                  <h4 className="font-bold text-foreground text-xs">{application.combinedPdfName}</h4>
                  <p className="text-[11px] text-muted-foreground">সকল সনদ ও পে-অর্ডার রসিদের একক মার্জড স্ক্যান (৪.২ MB)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert(`ডাউনলোড হচ্ছে: ${application.combinedPdfName}`)}
                className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground border border-border text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                ডাউনলোড
              </button>
            </div>
          </div>

          {/* Verification Checklist Panel (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-card rounded-xl border border-border p-5 shadow-xs space-y-4">
              <div className="border-b border-border pb-2">
                <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">fact_check</span>
                  স্ক্রুটিনি চেকলিস্ট (Verification)
                </h3>
                <p className="text-xs text-muted-foreground">হার্ডকপি ও মূল সনদের সাথে মিলিয়ে প্রতিটি আইটেম মার্ক করুন।</p>
              </div>

              <div className="space-y-2 text-xs">
                {/* Checklist items */}
                <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle border border-border cursor-pointer">
                  <span className="font-medium text-foreground">১. জাতীয় পরিচয়পত্র (NID) ভেরিফাইড</span>
                  <input
                    type="checkbox"
                    checked={checklist.nid}
                    onChange={() => toggleItem('nid')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle border border-border cursor-pointer">
                  <span className="font-medium text-foreground">২. শিক্ষাগত যোগ্যতা ও গ্রেড সঠিক</span>
                  <input
                    type="checkbox"
                    checked={checklist.education}
                    onChange={() => toggleItem('education')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle border border-border cursor-pointer">
                  <span className="font-medium text-foreground">৩. কাজের অভিজ্ঞতা ও অনাপত্তিপত্র</span>
                  <input
                    type="checkbox"
                    checked={checklist.experience}
                    onChange={() => toggleItem('experience')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle border border-border cursor-pointer">
                  <span className="font-medium text-foreground">৪. সকল সনদের সত্যায়িত কপি প্রাপ্তি</span>
                  <input
                    type="checkbox"
                    checked={checklist.certificates}
                    onChange={() => toggleItem('certificates')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-surface-subtle border border-border cursor-pointer">
                  <span className="font-medium text-foreground">৫. মূল পে-অর্ডার / ব্যাংক ড্রাফট গৃহীত</span>
                  <input
                    type="checkbox"
                    checked={checklist.payment}
                    onChange={() => toggleItem('payment')}
                    className="w-4 h-4 rounded text-primary accent-primary"
                  />
                </label>

                {application.freedomFighterClaimed && (
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-warning-muted/40 border border-warning/30 cursor-pointer">
                    <span className="font-medium text-foreground">৬. বীর মুক্তিযোদ্ধা সনদ ও প্রত্যয়ন</span>
                    <input
                      type="checkbox"
                      checked={checklist.freedomFighter}
                      onChange={() => toggleItem('freedomFighter')}
                      className="w-4 h-4 rounded text-primary accent-primary"
                    />
                  </label>
                )}
              </div>

              {/* Verified Eligibility Callout */}
              <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                allEligibleChecked 
                  ? 'bg-success-muted text-[#065F46] border border-success/30' 
                  : 'bg-warning-muted text-card-foreground border border-warning/30'
              }`}>
                {allEligibleChecked ? (
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    সকল আবশ্যকীয় শর্ত পূরণ হয়েছে। প্রার্থীকে বৈধ ঘোষণার উপযোগী।
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-warning">info</span>
                    বৈধ (Verified) করার পূর্বে আবশ্যকীয় সবগুলো চেকলিস্ট পূরণ করতে হবে।
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decision Bar */}
        <div className="bg-card rounded-xl border border-border p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            বর্তমান স্ট্যাটাস: <strong className="font-mono text-foreground uppercase">{application.status}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTargetStatus('under_review');
                setDecisionModalOpen(true);
              }}
              className="px-3 py-2 rounded-lg bg-surface-subtle hover:bg-muted text-foreground border border-border text-xs font-semibold cursor-pointer"
            >
              পর্যালোচনাধীন রাখুন (Under Review)
            </button>

            <button
              type="button"
              onClick={() => {
                setTargetStatus('rejected');
                setDecisionModalOpen(true);
              }}
              className="px-3 py-2 rounded-lg bg-error-container hover:bg-red-200 text-on-error-container text-xs font-semibold cursor-pointer"
            >
              বাতিল / অযোগ্য ঘোষণা (Reject)
            </button>

            <button
              type="button"
              disabled={!allEligibleChecked}
              onClick={() => {
                setTargetStatus('verified');
                setDecisionModalOpen(true);
              }}
              className={`px-5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer ${
                allEligibleChecked
                  ? 'bg-success hover:bg-emerald-600 text-white'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              বৈধ ঘোষণা করুন (Mark Verified)
            </button>
          </div>
        </div>
      </div>

      {/* Decision Confirmation Modal */}
      {decisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-md w-full p-6 shadow-xl border border-border animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-foreground text-sm">
                স্ক্রুটিনি সিদ্ধান্ত সংরক্ষণ ({targetStatus === 'verified' ? 'বৈধ ঘোষণা' : targetStatus === 'rejected' ? 'বাতিল' : 'পর্যালোচনা'})
              </h3>
              <button onClick={() => setDecisionModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleDecisionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">যাচাইকারীর নাম / কমিটি *</label>
                <input
                  type="text"
                  required
                  defaultValue="ড. মহা. শফিকুল আলম (রেজিস্ট্রার)"
                  className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground"
                />
              </div>

              {(targetStatus === 'rejected' || targetStatus === 'unverified') && (
                <div>
                  <label className="block font-semibold text-foreground mb-1">বাতিলের নির্দিষ্ট কারণ *</label>
                  <select
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground"
                  >
                    <option value="">কারণ নির্বাচন করুন...</option>
                    <option value="বয়সসীমা অতিক্রম">বয়সসীমা অতিক্রম</option>
                    <option value="শিক্ষাগত যোগ্যতার ঘাটতি / ৩য় বিভাগ">শিক্ষাগত যোগ্যতার ঘাটতি / ৩য় বিভাগ</option>
                    <option value="মূল পে-অর্ডার স্লিপ সংযুক্ত না করা">মূল পে-অর্ডার স্লিপ সংযুক্ত না করা</option>
                    <option value="সত্যায়িত সনদপত্র অনুপস্থিত">সত্যায়িত সনদপত্র অনুপস্থিত</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold text-foreground mb-1">দাপ্তরিক মন্তব্য / আদেশনামা নোট *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="স্ক্রুটিনি কমিটির সিদ্ধান্তের বিস্তারিত নোট লিখুন..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-surface-subtle border border-border text-foreground"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setDecisionModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface-subtle text-foreground"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-bold"
                >
                  সিদ্ধান্ত নিশ্চিত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
