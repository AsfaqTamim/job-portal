import React, { useState } from 'react';
import { ScreenId, ApplicationRecord } from '../types';

interface DashboardScreenProps {
  applications: ApplicationRecord[];
  onNavigate: (screen: ScreenId) => void;
  onSelectApplication: (app: ApplicationRecord) => void;
}

export const ApplicantDashboardScreen: React.FC<DashboardScreenProps> = ({ 
  applications, 
  onNavigate, 
  onSelectApplication 
}) => {
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord>(applications[0] || null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-success-muted text-[#065F46] border border-success/30">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            যাচাইকৃত (Verified)
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning-muted text-warning border border-warning/30">
            <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
            পর্যালোচনাধীন (Under Review)
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-secondary-fixed text-on-secondary-fixed border border-secondary-fixed-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            অনলাইন দাখিল সম্পন্ন (Submitted)
          </span>
        );
      case 'rejected':
      case 'unverified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container text-on-error-container border border-error/30">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            বাতিল / অযাচাইকৃত
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-muted text-foreground border border-border">
            খসড়া সংরক্ষিত (Draft)
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-surface-subtle py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Welcome Header */}
        <div className="bg-card rounded-xl p-6 shadow-xs border border-border mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary font-bold text-xl flex items-center justify-center shadow-xs">
              সা
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground">মো: সাইফুল ইসলাম</h1>
                <span className="text-xs bg-muted px-2 py-0.5 rounded font-mono text-muted-foreground border border-border">
                  NID: 19962692015000142
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                আবেদনকারী ড্যাশবোর্ড • ফোন: 01711223344 • ইমেইল: saiful.bou.candidate@gmail.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('circular')}
              className="h-10 px-4 rounded-lg bg-primary text-on-primary font-semibold text-xs hover:bg-primary-container transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              নতুন আবেদন করুন
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Applications List (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-headline-sm text-foreground flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">folder_shared</span>
                আমার আবেদনসমূহ ({applications.length})
              </h2>
            </div>

            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className={`p-5 rounded-xl bg-card border transition-all cursor-pointer shadow-xs ${
                  selectedApp?.id === app.id 
                    ? 'border-primary ring-2 ring-primary/20 shadow-md' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground block">{app.circularNo}</span>
                    <h3 className="font-bold text-foreground text-sm mt-0.5">{app.postTitle}</h3>
                    <p className="text-xs text-muted-foreground">{app.postDepartment} • {app.grade}</p>
                  </div>
                  {getStatusBadge(app.status)}
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>আবেদন ট্র্যাকিং নং: <strong className="font-mono text-foreground">{app.applicationNo}</strong></span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApplication(app);
                        onNavigate('preview_legal');
                      }}
                      className="px-2.5 py-1 rounded bg-surface-subtle text-foreground hover:bg-muted font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      প্রিভিউ
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('লিগ্যাল আবেদন PDF ডাউনলোড শুরু হয়েছে');
                      }}
                      className="px-2.5 py-1 rounded bg-surface-subtle text-foreground hover:bg-muted font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px] text-error">picture_as_pdf</span>
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Application Detail & Timeline Drawer (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {selectedApp ? (
              <div className="bg-card rounded-xl border border-border p-6 shadow-xs space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">আবেদনের বিবরণী ও অগ্রগতি</span>
                  <h3 className="font-bold text-foreground text-base mt-1">{selectedApp.postTitle}</h3>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">আইডি: {selectedApp.applicationNo}</p>
                </div>

                {/* Hardcopy dispatch reminder */}
                <div className="p-3.5 rounded-lg bg-warning-muted text-card-foreground text-xs space-y-1.5 border border-warning/30">
                  <div className="flex items-center gap-1.5 font-bold text-warning-foreground">
                    <span className="material-symbols-outlined text-[18px] text-warning">local_post_office</span>
                    হার্ডকপি প্রেরণের তাগিদ
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    অনলাইন আবেদন সাবমিটের পর ৩ সেট প্রিন্ট কপি ও মূল পে-অর্ডার ১৫ মার্চ ২০২৫ এর মধ্যে বাউবি রেজিস্ট্রার দপ্তরে ডাকযোগে প্রেরণ করুন।
                  </p>
                </div>

                {/* Status Timeline */}
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                    সিদ্ধান্তের সময়রেখা (Decision Timeline)
                  </h4>
                  <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                    {selectedApp.statusHistory.map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-primary ring-4 ring-background flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground">
                              {item.toStatus === 'submitted' && 'অনলাইনে দাখিলকৃত'}
                              {item.toStatus === 'under_review' && 'হার্ডকপি গৃহীত ও পর্যালোচনাধীন'}
                              {item.toStatus === 'verified' && 'যাচাই-বাছাইয়ে বৈধ ঘোষণা'}
                              {item.toStatus === 'rejected' && 'আবেদন বাতিল'}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {new Date(item.decidedAt).toLocaleDateString('bn-BD')}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">সিদ্ধান্তকারী: {item.decidedBy}</p>
                          {item.note && (
                            <p className="text-xs text-foreground bg-surface-subtle p-2 rounded mt-1 border border-border">
                              {item.note}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick actions */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectApplication(selectedApp);
                      onNavigate('preview_legal');
                    }}
                    className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-medium text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_open</span>
                    পূর্ণাঙ্গ আবেদনপত্র দেখুন (Legal View)
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground text-xs">
                কোনো আবেদন নির্বাচন করা হয়নি।
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
