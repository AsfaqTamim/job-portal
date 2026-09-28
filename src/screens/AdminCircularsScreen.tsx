import React, { useState } from 'react';
import { ScreenId, CircularNotice } from '../types';

interface AdminCircularsProps {
  circulars: CircularNotice[];
  onNavigate: (screen: ScreenId) => void;
  onUpdateDeadline: (circId: string, newDeadline: string) => void;
  onCreateCircular: (newCirc: CircularNotice) => void;
}

export const AdminCircularsScreen: React.FC<AdminCircularsProps> = ({
  circulars,
  onNavigate,
  onUpdateDeadline,
  onCreateCircular
}) => {
  const [extendModalCirc, setExtendModalCirc] = useState<CircularNotice | null>(null);
  const [newDeadlineToSet, setNewDeadlineToSet] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New circular form states
  const [newCircNo, setNewCircNo] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newFee, setNewFee] = useState('১,০০০/-');
  const [newDeadline, setNewDeadline] = useState('2025-04-15');
  const [postTitle, setPostTitle] = useState('');
  const [postVacancies, setPostVacancies] = useState('০১টি');

  const handleExtendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (extendModalCirc && newDeadlineToSet) {
      onUpdateDeadline(extendModalCirc.id, newDeadlineToSet);
      alert(`স্মারক নং ${extendModalCirc.circularNo} এর শেষ সময় সফলভাবে বৃদ্ধি করা হয়েছে!`);
      setExtendModalCirc(null);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCircNo && newTitle) {
      const created: CircularNotice = {
        id: `circ-${Date.now()}`,
        circularNo: newCircNo,
        title: newTitle,
        status: 'published',
        deadline: `${newDeadline}T23:59:59`,
        fee: newFee,
        posts: [
          {
            id: `post-${Date.now()}`,
            title: postTitle || 'সহকারী প্রকৌশলী',
            department: 'প্রকৌশল বিভাগ',
            jobType: 'স্থায়ী',
            grade: 'গ্রেড-০৯',
            salary: '২২,০০০ - ৫৩,০৬০/-',
            vacancies: postVacancies,
            requirements: 'বিএসসি ইন ইঞ্জিনিয়ারিং ডিগ্রি।',
            ageLimit: 'অনূর্ধ্ব ৩২ বছর'
          }
        ]
      };
      onCreateCircular(created);
      setCreateModalOpen(false);
      alert('নতুন নিয়োগ বিজ্ঞপ্তি সফলভাবে প্রকাশিত হয়েছে!');
    }
  };

  return (
    <div className="w-full bg-surface-subtle py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Navigation Header Bar */}
        <div className="bg-card rounded-xl p-4 shadow-xs border border-border mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-primary text-on-primary rounded-lg">
              <span className="material-symbols-outlined text-[20px] block">admin_panel_settings</span>
            </span>
            <div>
              <h1 className="font-bold text-foreground text-base">বাউবি রিক্রুটমেন্ট কন্ট্রোল প্যানেল (Staff Portal)</h1>
              <p className="text-xs text-muted-foreground">রেজিস্ট্রার কার্যালয় • নিয়োগ ও প্রশাসন সেল</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('admin_circulars')}
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold"
            >
              বিজ্ঞপ্তি ব্যবস্থাপনা
            </button>
            <button
              type="button"
              onClick={() => onNavigate('admin_applications')}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground text-xs font-medium border border-border"
            >
              আবেদনপত্র স্ক্রুটিনি ও যাচাই
            </button>
            <button
              type="button"
              onClick={() => onNavigate('admin_users')}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground text-xs font-medium border border-border"
            >
              ব্যবহারকারী ও রোল
            </button>
          </div>
        </div>

        {/* Section Heading & Create Action */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-headline-sm text-foreground">নিয়োগ বিজ্ঞপ্তি রেজিস্টার (Circular Register)</h2>
            <p className="text-xs text-muted-foreground">চলমান ও খসড়া সার্কুলারসমূহের সময়সীমা ও পদ নিয়ন্ত্রণ করুন</p>
          </div>
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            নতুন বিজ্ঞপ্তি প্রকাশ করুন
          </button>
        </div>

        {/* Circulars Table Card */}
        <div className="bg-card rounded-xl shadow-xs border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-muted-foreground font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-3.5">স্মারক নম্বর</th>
                  <th className="p-3.5">বিজ্ঞপ্তির শিরোনাম</th>
                  <th className="p-3.5">অন্তর্ভুক্ত পদসংখ্যা</th>
                  <th className="p-3.5">আবেদনের শেষ তারিখ</th>
                  <th className="p-3.5">স্ট্যাটাস</th>
                  <th className="p-3.5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {circulars.map((circ) => (
                  <tr key={circ.id} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-3.5 font-mono font-bold">{circ.circularNo}</td>
                    <td className="p-3.5 font-medium">{circ.title}</td>
                    <td className="p-3.5 font-semibold text-primary">{circ.posts.length}টি পদ</td>
                    <td className="p-3.5">
                      <div className="font-semibold text-error">
                        {new Date(circ.deadline).toLocaleDateString('bn-BD')}
                      </div>
                      {circ.originalDeadline && (
                        <span className="text-[10px] text-muted-foreground block">
                          আসল তারিখ: {new Date(circ.originalDeadline).toLocaleDateString('bn-BD')} (বর্ধিত)
                        </span>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success-muted text-[#065F46]">
                        প্রকাশিত (Active)
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          setExtendModalCirc(circ);
                          setNewDeadlineToSet('2025-03-30');
                        }}
                        className="px-2.5 py-1 rounded bg-surface-subtle hover:bg-muted text-foreground border border-border font-medium cursor-pointer"
                      >
                        সময়সীমা বৃদ্ধি
                      </button>
                      <button
                        type="button"
                        onClick={() => onNavigate('admin_applications')}
                        className="px-2.5 py-1 rounded bg-primary text-on-primary hover:bg-primary-container font-medium cursor-pointer"
                      >
                        আবেদনসমূহ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Deadline Extension Modal */}
      {extendModalCirc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-md w-full p-6 shadow-xl border border-border animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-foreground text-sm">বিজ্ঞপ্তির সময়সীমা বর্ধিতকরণ</h3>
              <button 
                onClick={() => setExtendModalCirc(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="text-xs space-y-1">
              <p><strong>স্মারক নং:</strong> {extendModalCirc.circularNo}</p>
              <p><strong>বর্তমান ডেডলাইন:</strong> {new Date(extendModalCirc.deadline).toLocaleDateString('bn-BD')}</p>
            </div>
            <form onSubmit={handleExtendSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">নতুন বর্ধিত আবেদনের শেষ সময় *</label>
                <input
                  type="date"
                  required
                  value={newDeadlineToSet}
                  onChange={(e) => setNewDeadlineToSet(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-xs"
                />
              </div>
              <div className="p-3 bg-warning-muted text-card-foreground text-[11px] rounded-lg border border-warning/30">
                বিজ্ঞপ্তি অনুযায়ী আসল ডেডলাইন রেকর্ড থাকবে এবং পোর্টাল হোমপেজে জরুরি নোটিশে প্রদর্শিত হবে।
              </div>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setExtendModalCirc(null)}
                  className="px-3 py-1.5 rounded-lg bg-surface-subtle text-foreground text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold"
                >
                  সময়সীমা অনুমোদন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Circular Creation Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-xl max-w-lg w-full p-6 shadow-xl border border-border animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-foreground text-sm">নতুন সার্কুলার প্রজ্ঞাপন দাখিল</h3>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">স্মারক নম্বর *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: BOU/ENG/2025/03"
                  value={newCircNo}
                  onChange={(e) => setNewCircNo(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-foreground mb-1">বিজ্ঞপ্তির শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: প্রকৌশল বিভাগের শূন্য পদসমূহে নিয়োগ বিজ্ঞপ্তি"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-foreground mb-1">আবেদন ফি *</label>
                  <input
                    type="text"
                    required
                    value={newFee}
                    onChange={(e) => setNewFee(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-foreground mb-1">আবেদনের শেষ তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-foreground mb-1">প্রাথমিক পদবি</label>
                  <input
                    type="text"
                    placeholder="সহকারী প্রকৌশলী"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-foreground mb-1">পদসংখ্যা</label>
                  <input
                    type="text"
                    placeholder="০২টি"
                    value={postVacancies}
                    onChange={(e) => setPostVacancies(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-surface-subtle border border-border text-foreground"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-surface-subtle text-foreground"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-on-primary font-bold"
                >
                  গেজেট প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
