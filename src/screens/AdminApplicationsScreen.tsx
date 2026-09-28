import React, { useState } from 'react';
import { ScreenId, ApplicationRecord } from '../types';

interface AdminApplicationsProps {
  applications: ApplicationRecord[];
  onNavigate: (screen: ScreenId) => void;
  onSelectApplication: (app: ApplicationRecord) => void;
}

export const AdminApplicationsScreen: React.FC<AdminApplicationsProps> = ({
  applications,
  onNavigate,
  onSelectApplication
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = applications.filter((app) => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch = 
      app.applicantNameBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicantNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.nid.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-success-muted text-[#065F46] border border-success/30">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            বৈধ (Verified)
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-warning-muted text-warning border border-warning/30">
            <span className="w-1.5 h-1.5 rounded-full bg-warning"></span>
            পর্যালোচনাধীন (Under Review)
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-secondary-fixed text-on-secondary-fixed border border-secondary-fixed-dim">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            দাখিলকৃত (Submitted)
          </span>
        );
      case 'rejected':
      case 'unverified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-error-container text-on-error-container border border-error/30">
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            অযোগ্য / বাতিল
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-muted text-foreground">
            খসড়া
          </span>
        );
    }
  };

  return (
    <div className="w-full bg-surface-subtle py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Navigation Header Bar */}
        <div className="bg-card rounded-xl p-4 shadow-xs border border-border mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-primary text-on-primary rounded-lg">
              <span className="material-symbols-outlined text-[20px] block">fact_check</span>
            </span>
            <div>
              <h1 className="font-bold text-foreground text-base">আবেদনপত্র স্ক্রুটিনি ও চেকলিস্ট পর্যালোচনা</h1>
              <p className="text-xs text-muted-foreground">দাখিলকৃত সকল প্রার্থীর তথ্য ও পে-অর্ডার ভেরিফিকেশন ডেস্ক</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate('admin_circulars')}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground text-xs font-medium border border-border cursor-pointer"
            >
              বিজ্ঞপ্তি ব্যবস্থাপনা
            </button>
            <button
              type="button"
              onClick={() => onNavigate('admin_applications')}
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold cursor-pointer"
            >
              আবেদনপত্র স্ক্রুটিনি ও যাচাই
            </button>
            <button
              type="button"
              onClick={() => onNavigate('admin_users')}
              className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground text-xs font-medium border border-border cursor-pointer"
            >
              ব্যবহারকারী ও রোল
            </button>
          </div>
        </div>

        {/* Filters and Search Strip */}
        <div className="bg-card p-4 rounded-xl border border-border shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted-foreground text-[18px]">search</span>
            <input
              type="text"
              placeholder="প্রার্থীর নাম, ট্র্যাকিং আইডি বা NID লিখুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-subtle border border-border text-foreground text-xs"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-muted-foreground shrink-0">ফিল্টার:</span>
            <div className="inline-flex rounded-lg bg-surface-subtle p-0.5 border border-border text-xs">
              {[
                { id: 'all', label: 'সকল' },
                { id: 'submitted', label: 'দাখিলকৃত' },
                { id: 'under_review', label: 'পর্যালোচনাধীন' },
                { id: 'verified', label: 'বৈধ' },
                { id: 'rejected', label: 'বাতিল' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium ${
                    statusFilter === tab.id
                      ? 'bg-card text-foreground shadow-xs font-bold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Applications List Table */}
        <div className="bg-card rounded-xl shadow-xs border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-muted-foreground font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-3.5">আবেদন ট্র্যাকিং আইডি</th>
                  <th className="p-3.5">প্রার্থীর নাম ও এনআইডি</th>
                  <th className="p-3.5">আবেদিত পদ ও গ্রেড</th>
                  <th className="p-3.5">দাখিলের তারিখ</th>
                  <th className="p-3.5">চেকলিস্ট স্ট্যাটাস</th>
                  <th className="p-3.5 text-right">স্ক্রুটিনি অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-3.5 font-mono font-bold text-primary">
                      {app.applicationNo}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-foreground">{app.applicantNameBn}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">NID: {app.nid}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium text-foreground">{app.postTitle}</div>
                      <span className="text-[10px] text-muted-foreground">{app.grade}</span>
                    </td>
                    <td className="p-3.5 font-mono text-muted-foreground">
                      {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString('bn-BD') : 'N/A'}
                    </td>
                    <td className="p-3.5">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectApplication(app);
                          onNavigate('admin_review');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs flex items-center gap-1.5 ml-auto cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">checklist</span>
                        যাচাই করুন
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
