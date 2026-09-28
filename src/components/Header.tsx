import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  currentUserRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  currentUser?: { name: string; email: string; role: UserRole; phone: string } | null;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentScreen, 
  onNavigate,
  currentUserRole,
  onSwitchRole,
  currentUser,
  onLogout
}) => {
  const [lang, setLang] = useState<'bn' | 'en'>('bn');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-border">
      <div className="h-16 max-w-7xl mx-auto px-margin flex items-center justify-between gap-space-lg">
        {/* University Brand Logo & Identity */}
        <div 
          className="flex items-center gap-space-md shrink-0 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <img 
            alt="বাউবি লোগো" 
            className="w-10 h-10 object-contain rounded-md" 
            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Bangladesh_Open_University_logo.svg/1200px-Bangladesh_Open_University_logo.svg.png" 
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-foreground leading-tight text-base sm:text-lg">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়</span>
            <span className="font-caption text-secondary text-xs sm:text-sm">নিয়োগ ও কর্মসংস্থান পোর্টাল</span>
          </div>
        </div>

        {/* Desktop Central Navigation Links */}
        <nav className="hidden lg:flex items-center gap-space-xs">
          <a 
            aria-current={currentScreen === 'home' ? 'page' : undefined}
            className={`px-space-md py-1.5 font-label-md text-label-md transition-colors rounded-xl ${
              currentScreen === 'home' 
                ? 'text-foreground font-semibold bg-muted' 
                : 'text-on-surface-variant hover:text-foreground hover:bg-surface-subtle'
            }`} 
            data-path="home" 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
          >
            হোমপেজ
          </a>
          <a 
            aria-current={currentScreen === 'circular' ? 'page' : undefined}
            className={`px-space-md py-1.5 font-label-md text-label-md transition-colors rounded-xl ${
              currentScreen === 'circular' 
                ? 'text-foreground font-semibold bg-muted' 
                : 'text-on-surface-variant hover:text-foreground hover:bg-surface-subtle'
            }`} 
            data-path="job-circulars" 
            href="#job-circulars"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('circular');
            }}
          >
            নিয়োগ বিজ্ঞপ্তি
          </a>
          <a 
            aria-current={currentScreen === 'guide' ? 'page' : undefined}
            className={`px-space-md py-1.5 font-label-md text-label-md transition-colors rounded-xl ${
              currentScreen === 'guide' 
                ? 'text-foreground font-semibold bg-muted' 
                : 'text-on-surface-variant hover:text-foreground hover:bg-surface-subtle'
            }`} 
            data-path="application-process" 
            href="#application-process"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('guide');
            }}
          >
            আবেদন নির্দেশিকা
          </a>
          <a 
            aria-current={currentScreen === 'download_forms' ? 'page' : undefined}
            className={`px-space-md py-1.5 font-label-md text-label-md transition-colors rounded-xl flex items-center gap-1 ${
              currentScreen === 'download_forms' 
                ? 'text-foreground font-semibold bg-muted' 
                : 'text-on-surface-variant hover:text-foreground hover:bg-surface-subtle'
            }`} 
            data-path="forms" 
            href="#forms"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('download_forms');
            }}
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            ফর্ম ও চালান
          </a>
          <a 
            aria-current={currentScreen === 'dashboard' ? 'page' : undefined}
            className={`px-space-md py-1.5 font-label-md text-label-md transition-colors rounded-xl ${
              currentScreen === 'dashboard' 
                ? 'text-foreground font-semibold bg-muted' 
                : 'text-on-surface-variant hover:text-foreground hover:bg-surface-subtle'
            }`} 
            data-path="my-applications" 
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('dashboard');
            }}
          >
            আমার আবেদনসমূহ
          </a>

          {/* Admin / Staff Navigation Link */}
          {(currentUserRole === 'staff' || currentUserRole === 'admin') && (
            <a 
              aria-current={currentScreen.startsWith('admin_') ? 'page' : undefined}
              className={`px-space-md py-1.5 font-label-md text-label-md transition-colors rounded-xl flex items-center gap-1 ${
                currentScreen.startsWith('admin_') 
                  ? 'bg-primary text-on-primary font-semibold' 
                  : 'text-primary hover:bg-surface-subtle font-semibold'
              }`} 
              data-path="admin-portal" 
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('admin_circulars');
              }}
            >
              <span className="material-symbols-outlined text-[16px]">shield_person</span>
              অ্যাডমিন প্যানেল
            </a>
          )}
        </nav>

        {/* Right utility controls */}
        <div className="flex items-center gap-space-sm">
          {/* Language Switcher */}
          <div className="inline-flex items-center p-0.5 rounded-xl bg-muted text-muted-foreground">
            <button 
              className={`px-2 py-0.5 font-label-sm text-label-sm font-medium rounded-lg transition-all ${
                lang === 'bn' 
                  ? 'bg-background text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)]' 
                  : 'text-muted-foreground hover:text-foreground'
              }`} 
              type="button"
              onClick={() => setLang('bn')}
            >
              বাং
            </button>
            <button 
              className={`px-2 py-0.5 font-label-sm text-label-sm font-medium rounded-lg transition-all ${
                lang === 'en' 
                  ? 'bg-background text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.05)]' 
                  : 'text-muted-foreground hover:text-foreground'
              }`} 
              type="button"
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          {/* Notifications button */}
          <div className="relative">
            <button 
              aria-label="নোটিফিকেশন" 
              className="p-2 text-on-surface-variant hover:text-foreground hover:bg-surface-subtle rounded-xl transition-colors relative cursor-pointer" 
              type="button"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-background"></span>
            </button>

            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-card rounded-xl shadow-lg border border-border p-3 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-border mb-2">
                  <span className="font-semibold text-xs text-foreground">জরুরি নোটিফিকেশন</span>
                  <span className="text-[10px] text-primary cursor-pointer hover:underline" onClick={() => setNotificationOpen(false)}>বন্ধ করুন</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-surface-subtle rounded-lg">
                    <p className="font-medium text-foreground">আবেদনের সময়সীমা বৃদ্ধি</p>
                    <p className="text-muted-foreground text-[11px] mt-0.5">BOU/ADMIN/2025/01 এর সময়সীমা ১৫ মার্চ ২০২৫ পর্যন্ত বাড়ানো হয়েছে।</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick role pill badge */}
          <div className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container text-foreground border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="capitalize">{currentUserRole === 'admin' ? 'অ্যাডমিন' : currentUserRole === 'staff' ? 'কর্মকর্তা' : 'আবেদনকারী'}</span>
          </div>

          {/* Login / Register / Auth button */}
          {!currentUser ? (
            <button 
              className="inline-flex items-center justify-center h-9 px-space-md font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-container rounded-xl transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.08)] cursor-pointer" 
              data-path="login" 
              type="button"
              onClick={() => onNavigate('auth')}
            >
              <span className="material-symbols-outlined text-[16px] mr-1">login</span>
              লগইন / নিবন্ধন
            </button>
          ) : (
            <button 
              className="hidden sm:inline-flex items-center justify-center h-9 px-space-md font-label-md text-label-md bg-surface-container hover:bg-surface-subtle text-foreground rounded-xl transition-colors border border-border cursor-pointer" 
              data-path="login" 
              type="button"
              onClick={() => onNavigate('dashboard')}
            >
              ড্যাশবোর্ড
            </button>
          )}

          {/* User Profile Avatar with Switcher Dropdown */}
          <div className="relative">
            <div 
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer shadow-xs text-white"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              title="ইউজার প্রোফাইল মেনু"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-card rounded-xl shadow-xl border border-border p-2 z-50 animate-in fade-in space-y-1 text-xs">
                <div className="p-2 border-b border-border mb-1">
                  <p className="font-bold text-foreground">{currentUser?.name || 'মো: সাইফুল ইসলাম'}</p>
                  <p className="text-muted-foreground text-[11px] truncate">{currentUser?.email || 'saiful.bou.candidate@gmail.com'}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-primary-fixed text-primary rounded text-[10px] font-semibold">
                    রোল: {currentUserRole.toUpperCase()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('dashboard');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full p-2 text-left hover:bg-surface-subtle rounded-lg text-foreground font-medium flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">dashboard</span>
                  আবেদনকারী ড্যাশবোর্ড
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('download_forms');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full p-2 text-left hover:bg-surface-subtle rounded-lg text-foreground font-medium flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  নিয়োগ ফর্ম ও চালান ছক
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('admin_circulars');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full p-2 text-left hover:bg-surface-subtle rounded-lg text-foreground font-medium flex items-center gap-2 text-primary font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                  অ্যাডমিন প্যানেল প্রবেশ
                </button>

                <div className="pt-1 border-t border-border">
                  <p className="text-[10px] text-muted-foreground px-2 py-1 uppercase font-semibold">পার্সোনা সুইচ:</p>
                  <div className="grid grid-cols-3 gap-1 px-1">
                    {(['applicant', 'staff', 'admin'] as UserRole[]).map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => {
                          onSwitchRole(r);
                          setUserDropdownOpen(false);
                        }}
                        className={`py-1 text-[10px] rounded font-semibold transition-colors ${
                          currentUserRole === r
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-subtle text-foreground hover:bg-surface-container'
                        }`}
                      >
                        {r === 'admin' ? 'অ্যাডমিন' : r === 'staff' ? 'কর্মকর্তা' : 'আবেদনকারী'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-border mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (onLogout) onLogout();
                      onNavigate('auth');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full p-2 text-left hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg text-red-600 dark:text-red-400 font-semibold flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    {currentUser ? 'লগআউট করুন' : 'লগইন পেজে যান'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            aria-label="মোবাইল মেনু" 
            className="lg:hidden p-2 text-on-surface-variant hover:text-foreground rounded-xl transition-colors" 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border px-margin py-space-md space-y-space-sm shadow-md animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            <a 
              className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                currentScreen === 'home' ? 'bg-primary text-on-primary' : 'text-foreground hover:bg-surface-subtle'
              }`}
              data-path="home"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
            >
              হোমপেজ
            </a>
            <a 
              className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                currentScreen === 'circular' ? 'bg-primary text-on-primary' : 'text-foreground hover:bg-surface-subtle'
              }`}
              data-path="job-circulars"
              href="#job-circulars"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('circular');
                setMobileMenuOpen(false);
              }}
            >
              নিয়োগ বিজ্ঞপ্তি
            </a>
            <a 
              className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                currentScreen === 'guide' ? 'bg-primary text-on-primary' : 'text-foreground hover:bg-surface-subtle'
              }`}
              data-path="application-process"
              href="#application-process"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('guide');
                setMobileMenuOpen(false);
              }}
            >
              আবেদন নির্দেশিকা
            </a>
            <a 
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                currentScreen === 'download_forms' ? 'bg-primary text-on-primary' : 'text-foreground hover:bg-surface-subtle'
              }`}
              data-path="forms"
              href="#forms"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('download_forms');
                setMobileMenuOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              ফর্ম ও চালান ডাউনলোড
            </a>
            <a 
              className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                currentScreen === 'dashboard' ? 'bg-primary text-on-primary' : 'text-foreground hover:bg-surface-subtle'
              }`}
              data-path="my-applications"
              href="#dashboard"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
            >
              আমার আবেদনসমূহ
            </a>
            <a 
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                currentScreen === 'auth' ? 'bg-primary text-on-primary' : 'text-foreground hover:bg-surface-subtle'
              }`}
              data-path="auth"
              href="#auth"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('auth');
                setMobileMenuOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-[16px]">login</span>
              লগইন ও রেজিস্ট্রেশন
            </a>
            <a 
              className="px-3 py-2 rounded-lg text-xs font-bold text-primary hover:bg-surface-subtle flex items-center gap-1.5"
              data-path="admin-portal"
              href="#admin"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('admin_circulars');
                setMobileMenuOpen(false);
              }}
            >
              <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
              অ্যাডমিন প্যানেল
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
