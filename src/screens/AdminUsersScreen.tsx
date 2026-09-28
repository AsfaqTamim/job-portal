import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface AdminUsersProps {
  onNavigate: (screen: ScreenId) => void;
  currentUserRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: 'active' | 'suspended';
}

export const AdminUsersScreen: React.FC<AdminUsersProps> = ({
  onNavigate,
  currentUserRole,
  onSwitchRole
}) => {
  const [users, setUsers] = useState<UserItem[]>([
    {
      id: 'usr-1',
      name: 'ড. মহা. শফিকুল আলম',
      email: 'registrar@bou.ac.bd',
      phone: '01711000111',
      role: 'admin',
      status: 'active'
    },
    {
      id: 'usr-2',
      name: 'মো: কামাল উদ্দিন',
      email: 'recruitment.officer@bou.ac.bd',
      phone: '01811000222',
      role: 'staff',
      status: 'active'
    },
    {
      id: 'usr-3',
      name: 'মো: সাইফুল ইসলাম',
      email: 'saiful.bou.candidate@gmail.com',
      phone: '01711223344',
      role: 'applicant',
      status: 'active'
    },
    {
      id: 'usr-4',
      name: 'নুসরাত জাহান',
      email: 'nusrat.jahan.du@gmail.com',
      phone: '01822334455',
      role: 'applicant',
      status: 'active'
    }
  ]);

  const changeUserRole = (id: string, newRole: UserRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    alert('ব্যবহারকারীর রোল সফলভাবে হালনাগাদ করা হয়েছে!');
  };

  return (
    <div className="w-full bg-surface-subtle py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Admin Navigation Header Bar */}
        <div className="bg-card rounded-xl p-4 shadow-xs border border-border mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-primary text-on-primary rounded-lg">
              <span className="material-symbols-outlined text-[20px] block">manage_accounts</span>
            </span>
            <div>
              <h1 className="font-bold text-foreground text-base">ব্যবহারকারী ও রোল ব্যবস্থাপনা (RBAC Administration)</h1>
              <p className="text-xs text-muted-foreground">সিস্টেমের নিরাপত্তা ও এক্সেস কন্ট্রোল পলিসি</p>
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
              className="px-3 py-1.5 rounded-lg bg-surface-subtle hover:bg-muted text-foreground text-xs font-medium border border-border cursor-pointer"
            >
              আবেদনপত্র স্ক্রুটিনি ও যাচাই
            </button>
            <button
              type="button"
              onClick={() => onNavigate('admin_users')}
              className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold cursor-pointer"
            >
              ব্যবহারকারী ও রোল
            </button>
          </div>
        </div>

        {/* Current Active Persona Switcher Card */}
        <div className="bg-card p-5 rounded-xl border border-border shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                বর্তমানে প্রদর্শিত পার্সোনা (Live Persona Switcher)
              </h3>
              <p className="text-xs text-foreground mt-0.5 font-medium">
                প্রোটোটাইপ বা লাইভ পোর্টালে বিভিন্ন ভূমিকায় পরীক্ষা করার জন্য রোল নির্বাচন করুন:
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onSwitchRole('applicant')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  currentUserRole === 'applicant'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-subtle text-foreground border border-border hover:bg-muted'
                }`}
              >
                আবেদনকারী (Applicant)
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole('staff')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  currentUserRole === 'staff'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-subtle text-foreground border border-border hover:bg-muted'
                }`}
              >
                কর্মকর্তা (Staff)
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  currentUserRole === 'admin'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-subtle text-foreground border border-border hover:bg-muted'
                }`}
              >
                অ্যাডমিন (Admin)
              </button>
            </div>
          </div>
        </div>

        {/* Users List Table */}
        <div className="bg-card rounded-xl shadow-xs border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-foreground text-xs uppercase tracking-wider">
              নিবন্ধিত ব্যবহারকারীদের তালিকা
            </h3>
            <span className="text-xs font-mono text-muted-foreground">{users.length} জন সক্রিয়</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-subtle border-b border-border text-muted-foreground font-semibold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-3.5">নাম ও পরিচিতি</th>
                  <th className="p-3.5">ইমেইল</th>
                  <th className="p-3.5">ফোন</th>
                  <th className="p-3.5">বর্তমান রোল</th>
                  <th className="p-3.5 text-right">রোল পরিবর্তন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-foreground">
                {users.map((usr) => (
                  <tr key={usr.id} className="hover:bg-surface-subtle transition-colors">
                    <td className="p-3.5 font-bold text-foreground">{usr.name}</td>
                    <td className="p-3.5 font-mono text-muted-foreground">{usr.email}</td>
                    <td className="p-3.5 font-mono text-foreground">{usr.phone}</td>
                    <td className="p-3.5">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        usr.role === 'admin'
                          ? 'bg-primary text-on-primary'
                          : usr.role === 'staff'
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-subtle text-foreground border border-border'
                      }`}>
                        {usr.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <select
                        value={usr.role}
                        onChange={(e) => changeUserRole(usr.id, e.target.value as UserRole)}
                        className="px-2 py-1 rounded bg-surface-subtle border border-border text-foreground text-xs outline-hidden"
                      >
                        <option value="applicant">Applicant</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
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
