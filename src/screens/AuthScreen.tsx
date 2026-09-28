import React, { useState } from 'react';
import { ScreenId, UserRole } from '../types';

interface AuthScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onLoginSuccess: (user: { name: string; email: string; role: UserRole; phone: string }) => void;
  defaultTab?: 'login' | 'register' | 'forgot';
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onNavigate,
  onLoginSuccess,
  defaultTab = 'login',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgot'>(defaultTab);
  const [selectedRole, setSelectedRole] = useState<UserRole>('applicant');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('01711223344');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regNameBn, setRegNameBn] = useState('');
  const [regNameEn, setRegNameEn] = useState('');
  const [regNid, setRegNid] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Real-time password strength calculation via regex patterns
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: '', color: '', percent: 0, criteria: { length: false, upperLower: false, number: false, special: false } };

    const hasLength = pass.length >= 8;
    const hasUpperLower = /[a-z]/.test(pass) && /[A-Z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(pass);

    const criteria = {
      length: hasLength,
      upperLower: hasUpperLower,
      number: hasNumber,
      special: hasSpecial,
    };

    let score = 0;
    if (pass.length >= 6) score += 1;
    if (hasLength) score += 1;
    if (hasUpperLower) score += 1;
    if (hasNumber) score += 1;
    if (hasSpecial) score += 1;

    // Map score to weak, fair, strong
    if (score <= 2) {
      return {
        score: 1,
        label: 'দুর্বল (Weak)',
        enLabel: 'weak',
        color: 'bg-red-500 text-red-700 dark:text-red-400',
        barColor: 'bg-red-500',
        percent: 33,
        criteria,
      };
    } else if (score <= 3) {
      return {
        score: 2,
        label: 'মোটামুটি (Fair)',
        enLabel: 'fair',
        color: 'bg-amber-500 text-amber-700 dark:text-amber-400',
        barColor: 'bg-amber-500',
        percent: 66,
        criteria,
      };
    } else {
      return {
        score: 3,
        label: 'শক্তিশালী (Strong)',
        enLabel: 'strong',
        color: 'bg-emerald-500 text-emerald-700 dark:text-emerald-400',
        barColor: 'bg-emerald-500',
        percent: 100,
        criteria,
      };
    }
  };

  const passwordStrength = calculatePasswordStrength(regPassword);

  // OTP Verification Simulation
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(120);

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('saiful.bou.candidate@gmail.com');
  const [forgotMethod, setForgotMethod] = useState<'email' | 'phone'>('email');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify' | 'reset' | 'completed'>('request');
  const [resetOtp, setResetOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [mockResetToken, setMockResetToken] = useState('');
  const [resetSuccessTime, setResetSuccessTime] = useState('');

  // Forgot Password Modal Dialog State
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [modalEmailInput, setModalEmailInput] = useState('saiful.bou.candidate@gmail.com');
  const [isModalSubmitting, setIsModalSubmitting] = useState(false);
  const [modalConfirmationSent, setModalConfirmationSent] = useState(false);
  const [modalErrorMessage, setModalErrorMessage] = useState('');

  // Error and Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleQuickFill = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'applicant') {
      setLoginIdentifier('01711223344');
      setLoginPassword('password123');
    } else if (role === 'staff') {
      setLoginIdentifier('scrutiny.officer@bou.ac.bd');
      setLoginPassword('admin2025');
    } else if (role === 'admin') {
      setLoginIdentifier('registrar@bou.ac.bd');
      setLoginPassword('superbou2025');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!loginIdentifier || !loginPassword) {
      setErrorMessage('মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      let userName = 'মো: সাইফুল ইসলাম';
      let userEmail = 'saiful.bou.candidate@gmail.com';
      let phone = '01711223344';

      if (selectedRole === 'staff') {
        userName = 'ড. মো: সাইফুল আলম (যাচাইকারী কর্মকর্তা)';
        userEmail = 'scrutiny.officer@bou.ac.bd';
        phone = '01819234567';
      } else if (selectedRole === 'admin') {
        userName = 'ড. মহা. শফিকুল আলম (রেজিস্ট্রার ও সুপার অ্যাডমিন)';
        userEmail = 'registrar@bou.ac.bd';
        phone = '01712987654';
      }

      onLoginSuccess({
        name: userName,
        email: userEmail,
        role: selectedRole,
        phone,
      });

      if (selectedRole === 'applicant') {
        onNavigate('dashboard');
      } else {
        onNavigate('admin_applications');
      }
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!regNameBn || !regNameEn || !regPhone || !regNid || !regPassword) {
      setErrorMessage('অনুগ্রহ করে সকল তারকাচিহ্নিত (*) তথ্য সঠিকভাবে পূরণ করুন');
      return;
    }

    if (regNid.length !== 10 && regNid.length !== 17) {
      setErrorMessage('জাতীয় পরিচয়পত্র নম্বর অবশ্যই ১০ অথবা ১৭ ডিজিটের হতে হবে');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('শর্তাবলী ও বাউবি নীতিমালা মেনে নেওয়ার সম্মতি দিন');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
    }, 700);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRegistrationSuccess(true);
      setOtpStep(false);
    }, 600);
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
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
        <span className="text-foreground font-semibold">লগইন ও রেজিস্ট্রেশন পোর্টাল</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Informational & Benefits Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-border shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-xl shadow-xs">
                বাউবি
              </div>
              <div>
                <h2 className="font-headline-sm text-foreground font-bold">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়</h2>
                <p className="text-xs text-muted-foreground font-medium">নিয়োগ পোর্টাল - নিরাপদ কেন্দ্রীয় প্রমাণীকরণ ব্যবস্থা</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              বাউবি নিয়োগ প্রক্রিয়ায় অংশ নিতে একটি মাত্র অ্যাকাউন্ট দিয়েই আপনি যেকোনো সার্কুলারে আবেদন, ব্যাংক ড্রাফটের বিবরণী প্রদান, তাৎক্ষণিক স্ট্যাটাস নিরীক্ষা এবং পরীক্ষার প্রবেশপত্র সংগ্রহ করতে পারবেন।
            </p>

            <div className="mt-6 pt-6 border-t border-border space-y-3.5">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">verified_user</span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">স্বচ্ছ ও সুরক্ষিত নির্বাচন প্রক্রিয়া</h4>
                  <p className="text-[11px] text-muted-foreground">ডিজিটাল নিরাপত্তা নিশ্চিতকরণে দ্বি-স্তর বিশিষ্ট তথ্য যাচাই ও ওটিপি ভেরিফিকেশন।</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">badge</span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">স্বয়ংক্রিয় এনআইডি ম্যাপিং</h4>
                  <p className="text-[11px] text-muted-foreground">একই জাতীয় পরিচয়পত্রে একাধিক পদমর্যাদায় আলাদা আবেদন তৈরির সুযোগ।</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">download_for_offline</span>
                <div>
                  <h4 className="text-xs font-bold text-foreground">অফিসিয়াল ফর্ম ও নির্দেশিকা ডাউনলোড</h4>
                  <p className="text-[11px] text-muted-foreground">
                    অফলাইনে পূরণের জন্য নির্ধারিত আবেদন ফর্ম ও ব্যাংক চালানের ছক{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('download_forms')}
                      className="text-primary font-bold underline cursor-pointer"
                    >
                      এখানে পাবেন &rarr;
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Persona Switcher for Evaluation */}
          <div className="bg-primary-fixed/30 border border-primary/20 p-4 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>দ্রুত টেস্ট লগইন বাটন (এক ক্লিকে ফিল করুন):</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  handleRoleQuickFill('applicant');
                }}
                className={`py-2 px-1 text-center rounded-lg border text-[11px] font-semibold transition-all ${
                  selectedRole === 'applicant'
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-card text-foreground border-border hover:bg-surface-subtle'
                }`}
              >
                আবেদনকারী
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  handleRoleQuickFill('staff');
                }}
                className={`py-2 px-1 text-center rounded-lg border text-[11px] font-semibold transition-all ${
                  selectedRole === 'staff'
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-card text-foreground border-border hover:bg-surface-subtle'
                }`}
              >
                যাচাই কর্মকর্তা
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  handleRoleQuickFill('admin');
                }}
                className={`py-2 px-1 text-center rounded-lg border text-[11px] font-semibold transition-all ${
                  selectedRole === 'admin'
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-card text-foreground border-border hover:bg-surface-subtle'
                }`}
              >
                রেজিস্ট্রার / অ্যাডমিন
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="lg:col-span-7 bg-card rounded-2xl border border-border shadow-md overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-border bg-surface-subtle">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-3.5 px-4 text-center text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'border-primary text-primary bg-card'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              অ্যাকাউন্টে প্রবেশ (লগইন)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrorMessage('');
                setOtpStep(false);
                setRegistrationSuccess(false);
              }}
              className={`flex-1 py-3.5 px-4 text-center text-xs font-bold transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'border-primary text-primary bg-card'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              নতুন আবেদনকারী নিবন্ধন
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('forgot');
                setErrorMessage('');
              }}
              className={`py-3.5 px-4 text-center text-xs font-medium transition-colors cursor-pointer border-b-2 hidden sm:flex items-center justify-center gap-1 ${
                activeTab === 'forgot'
                  ? 'border-primary text-primary bg-card'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">help</span>
              পাসওয়ার্ড উদ্ধার
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-300 text-xs flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-[18px]">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* TAB 1: LOGIN */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    মোবাইল নম্বর অথবা ইমেইল এড্রেস <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted-foreground text-[18px]">
                      contact_phone
                    </span>
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="যেমন: 01711223344 অথবা saiful@example.com"
                      className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-foreground">
                      পাসওয়ার্ড <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setModalEmailInput(loginIdentifier.includes('@') ? loginIdentifier : 'saiful.bou.candidate@gmail.com');
                        setModalConfirmationSent(false);
                        setModalErrorMessage('');
                        setIsForgotModalOpen(true);
                      }}
                      className="text-[11px] text-primary hover:underline cursor-pointer font-medium flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">lock_reset</span>
                      <span>পাসওয়ার্ড ভুলে গেছেন?</span>
                    </button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted-foreground text-[18px]">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="পাসওয়ার্ড লিখুন"
                      className="w-full h-10 pl-10 pr-10 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Login Role Indicator */}
                <div className="p-3 bg-surface-subtle rounded-lg border border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">লগইন ভূমিকা (Portal Role):</span>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="loginRole"
                        checked={selectedRole === 'applicant'}
                        onChange={() => setSelectedRole('applicant')}
                        className="accent-primary"
                      />
                      আবেদনকারী
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="loginRole"
                        checked={selectedRole === 'staff'}
                        onChange={() => setSelectedRole('staff')}
                        className="accent-primary"
                      />
                      কর্মকর্তা
                    </label>
                    <label className="flex items-center gap-1 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="loginRole"
                        checked={selectedRole === 'admin'}
                        onChange={() => setSelectedRole('admin')}
                        className="accent-primary"
                      />
                      অ্যাডমিন
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                    />
                    আমাকে মনে রাখুন (Remember me)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer mt-4"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      <span>যাচাই হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">login</span>
                      <span>লগইন করুন</span>
                    </>
                  )}
                </button>

                <div className="pt-4 text-center border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    এখনও নিবন্ধন করেননি?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      এখানে নতুন অ্যাকাউন্ট তৈরি করুন
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {activeTab === 'register' && !otpStep && !registrationSuccess && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      আবেদনকারীর নাম (বাংলায়) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regNameBn}
                      onChange={(e) => setRegNameBn(e.target.value)}
                      placeholder="যেমন: মো: সাইফুল ইসলাম"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      আবেদনকারীর নাম (ইংরেজিতে) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regNameEn}
                      onChange={(e) => setRegNameEn(e.target.value.toUpperCase())}
                      placeholder="e.g. MD. SAIFUL ISLAM"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={11}
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      ইমেইল ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="candidate@example.com"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    জাতীয় পরিচয়পত্র (NID) নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={17}
                    value={regNid}
                    onChange={(e) => setRegNid(e.target.value)}
                    placeholder="১০ অথবা ১৭ ডিজিটের এনআইডি লিখুন"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    ১৩ ডিজিটের এনআইডি হলে শুরুতে জন্মসাল যোগ করে ১৭ ডিজিট তৈরি করুন।
                  </p>
                </div>

                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-foreground">
                          পাসওয়ার্ড নির্ধারণ করুন <span className="text-red-500">*</span>
                        </label>
                        {regPassword && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            passwordStrength.enLabel === 'weak' 
                              ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400' 
                              : passwordStrength.enLabel === 'fair'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          }`}>
                            {passwordStrength.label}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          minLength={6}
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="কমপক্ষে ৬-৮ ডিজিটের পাসওয়ার্ড"
                          className="w-full h-10 pl-3 pr-10 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {showRegPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        পুনরায় পাসওয়ার্ড লিখুন <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="একই পাসওয়ার্ড লিখুন"
                        className={`w-full h-10 px-3 rounded-lg border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono ${
                          regConfirmPassword && regConfirmPassword !== regPassword
                            ? 'border-red-500'
                            : regConfirmPassword && regConfirmPassword === regPassword
                            ? 'border-emerald-500'
                            : 'border-border'
                        }`}
                      />
                      {regConfirmPassword && regConfirmPassword !== regPassword && (
                        <p className="text-[10px] text-red-600 dark:text-red-400 mt-1">পাসওয়ার্ড মিলছে না</p>
                      )}
                      {regConfirmPassword && regConfirmPassword === regPassword && (
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">check</span>
                          পাসওয়ার্ড মিলেছে
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password Strength Meter & Real-time Regex Feedback */}
                  {regPassword && (
                    <div className="mt-3 p-3 bg-surface-subtle rounded-xl border border-border space-y-2.5 animate-in fade-in">
                      {/* Visual Strength Meter Bar */}
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-muted-foreground font-medium">পাসওয়ার্ড শক্তি (Password Strength):</span>
                          <span className="font-bold">{passwordStrength.label}</span>
                        </div>
                        <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden flex gap-1 p-0.5">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 flex-1 ${
                              passwordStrength.score >= 1 ? (passwordStrength.score === 1 ? 'bg-red-500' : passwordStrength.score === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'
                            }`}
                          />
                          <div 
                            className={`h-full rounded-full transition-all duration-300 flex-1 ${
                              passwordStrength.score >= 2 ? (passwordStrength.score === 2 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-transparent'
                            }`}
                          />
                          <div 
                            className={`h-full rounded-full transition-all duration-300 flex-1 ${
                              passwordStrength.score >= 3 ? 'bg-emerald-500' : 'bg-transparent'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Detailed Regex Criteria Checklist */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                        <div className={`flex items-center gap-1.5 ${passwordStrength.criteria.length ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-muted-foreground'}`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {passwordStrength.criteria.length ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>কমপক্ষে ৮ অক্ষর</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${passwordStrength.criteria.upperLower ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-muted-foreground'}`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {passwordStrength.criteria.upperLower ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>বড় ও ছোট হাতের হরফ</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${passwordStrength.criteria.number ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-muted-foreground'}`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {passwordStrength.criteria.number ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>সংখ্যা (০-৯)</span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${passwordStrength.criteria.special ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-muted-foreground'}`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {passwordStrength.criteria.special ? 'check_circle' : 'radio_button_unchecked'}
                          </span>
                          <span>বিশেষ চিহ্ন (@,#,$)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary accent-primary cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug cursor-pointer">
                    আমি ঘোষণা করছি যে, প্রদত্ত তথ্যসমূহ সম্পূর্ণ সঠিক এবং বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের নিয়োগ নীতি ও শর্তাবলি মেনে নিতে সম্মত আছি।
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer mt-4"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      <span>যাচাই হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>ওটিপি যাচাইয়ে এগিয়ে যান</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2.1: OTP STEP */}
            {activeTab === 'register' && otpStep && !registrationSuccess && (
              <form onSubmit={handleOtpSubmit} className="space-y-5 text-center">
                <div className="w-12 h-12 bg-primary-fixed text-primary rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[24px]">sms</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">মোবাইল নম্বর যাচাইকরণ</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    আপনার প্রদত্ত নম্বর <strong className="text-foreground">{regPhone}</strong> এ একটি ৬ ডিজিটের সিকিউরিটি কোড পাঠানো হয়েছে।
                  </p>
                </div>

                {/* 6 Digit Input Boxes */}
                <div className="flex justify-center gap-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const val = e.target.value;
                        const newOtp = [...otpCode];
                        newOtp[idx] = val;
                        setOtpCode(newOtp);
                        if (val && idx < 5) {
                          document.getElementById(`otp-${idx + 1}`)?.focus();
                        }
                      }}
                      className="w-10 h-12 text-center text-lg font-bold border border-border rounded-lg bg-surface-subtle focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs text-muted-foreground px-4">
                  <span>কোডের মেয়াদ: <strong>০২:০০</strong> মিনিট</span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpCode(['5', '8', '2', '1', '9', '0']);
                    }}
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    কোড অটো-ফিল করুন (Demo)
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  {isLoading ? 'নিবন্ধন সম্পন্ন হচ্ছে...' : 'নিবন্ধন নিশ্চিত করুন'}
                </button>
              </form>
            )}

            {/* TAB 2.2: REGISTRATION SUCCESS */}
            {registrationSuccess && (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h3 className="text-base font-bold text-foreground">নিবন্ধন সফলভাবে সম্পন্ন হয়েছে!</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  আপনার বাউবি আবেদনকারী প্রোফাইল তৈরি হয়েছে। এখন আপনি সরাসরি লগইন করে যেকোনো পদে আবেদন প্রক্রিয়া শুরু করতে পারেন।
                </p>

                <div className="p-4 bg-surface-subtle rounded-xl border border-border text-left text-xs space-y-1.5 max-w-sm mx-auto">
                  <p><strong>নাম:</strong> {regNameBn || 'মো: সাইফুল ইসলাম'}</p>
                  <p><strong>মোবাইল:</strong> {regPhone || '01711223344'}</p>
                  <p><strong>এনআইডি:</strong> {regNid || '19962692015000142'}</p>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onLoginSuccess({
                        name: regNameBn || 'মো: সাইফুল ইসলাম',
                        email: regEmail || 'saiful.bou.candidate@gmail.com',
                        role: 'applicant',
                        phone: regPhone || '01711223344',
                      });
                      onNavigate('wizard');
                    }}
                    className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs shadow-xs hover:bg-primary-container cursor-pointer flex items-center gap-1.5"
                  >
                    <span>অনলাইনে আবেদন শুরু করুন</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: FORGOT PASSWORD FLOW (EMAIL & CONFIRMATION) */}
            {activeTab === 'forgot' && (
              <div className="space-y-5 animate-in fade-in">
                {/* STEP 1: REQUEST EMAIL RESET */}
                {forgotStep === 'request' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setErrorMessage('');
                      if (!forgotEmail) {
                        setErrorMessage('অনুগ্রহ করে সঠিক ইমেইল ঠিকানা প্রদান করুন');
                        return;
                      }
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        const token = 'BOU-RESET-' + Math.random().toString(36).substring(2, 9).toUpperCase();
                        setMockResetToken(token);
                        setForgotStep('verify');
                      }, 650);
                    }}
                    className="space-y-4"
                  >
                    <div className="p-3 bg-surface-subtle rounded-xl border border-border flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">mark_email_read</span>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-foreground">ইমেইল দ্বারা পাসওয়ার্ড পুনরুদ্ধার</p>
                        <p className="text-muted-foreground leading-relaxed">
                          আপনার নিবন্ধিত অ্যাকাউন্টের ইমেইল ঠিকানা লিখুন। বাউবি কেন্দ্রীয় সার্ভার থেকে একটি নিরাপদ পাসওয়ার্ড রিসেট লিংক এবং ৬-ডিজিটের সিকিউরিটি কোড আপনার ইনবক্সে পাঠানো হবে।
                        </p>
                      </div>
                    </div>

                    {/* Method toggle: Email vs Phone */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setForgotMethod('email')}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                          forgotMethod === 'email'
                            ? 'bg-primary text-on-primary border-primary'
                            : 'bg-surface-subtle text-foreground border-border hover:bg-surface-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">mail</span>
                        ইমেইল দিয়ে রিসেট
                      </button>
                      <button
                        type="button"
                        onClick={() => setForgotMethod('phone')}
                        className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                          forgotMethod === 'phone'
                            ? 'bg-primary text-on-primary border-primary'
                            : 'bg-surface-subtle text-foreground border-border hover:bg-surface-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
                        এসএমএস দিয়ে রিসেট
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        {forgotMethod === 'email' ? 'নিবন্ধিত ইমেইল ঠিকানা' : 'নিবন্ধিত মোবাইল নম্বর'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted-foreground text-[18px]">
                          {forgotMethod === 'email' ? 'email' : 'phone'}
                        </span>
                        <input
                          type={forgotMethod === 'email' ? 'email' : 'tel'}
                          required
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder={forgotMethod === 'email' ? 'candidate@example.com' : '01XXXXXXXXX'}
                          className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                        />
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        নমুনা টেস্ট ইমেইল: <code className="text-primary font-bold">saiful.bou.candidate@gmail.com</code>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                        লগইন পেজে ফিরে যান
                      </button>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 px-5 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        {isLoading ? (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                            <span>লিংক পাঠানো হচ্ছে...</span>
                          </>
                        ) : (
                          <>
                            <span>রিসেট লিংক ও কোড পাঠান</span>
                            <span className="material-symbols-outlined text-[18px]">send</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 2: MOCK EMAIL CONFIRMATION & OTP INPUT */}
                {forgotStep === 'verify' && (
                  <div className="space-y-5 animate-in zoom-in-95">
                    {/* Mock Email Delivery Preview Card */}
                    <div className="p-4 bg-primary-fixed/20 border border-primary/30 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-on-primary">
                          <span className="material-symbols-outlined text-[13px]">outgoing_mail</span>
                          বাউবি ইমেইল সিস্টেম (সিমুলেশন)
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">এখনই প্রেরিত</span>
                      </div>
                      <p className="text-xs text-foreground font-semibold">
                        প্রাপক: <span className="font-mono text-primary font-bold">{forgotEmail}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        বিষয়: বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় নিয়োগ পোর্টাল - পাসওয়ার্ড রিসেট নির্দেশনা ও সিকিউরিটি ওটিপি
                      </p>
                      <div className="p-3 bg-card rounded-lg border border-border text-xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">সিকিউরিটি ওটিপি কোড:</span>
                          <span className="text-base font-mono font-bold tracking-widest text-primary bg-primary-fixed/40 px-2.5 py-0.5 rounded">
                            749203
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border">
                          <span>অথরাইজেশন টোকেন:</span>
                          <span className="font-mono">{mockResetToken}</span>
                        </div>
                      </div>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setErrorMessage('');
                        const entered = resetOtp.join('');
                        if (entered.length < 6) {
                          setErrorMessage('অনুগ্রহ করে ৬ ডিজিটের সম্পূর্ণ ওটিপি কোড লিখুন');
                          return;
                        }
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setForgotStep('reset');
                        }, 500);
                      }}
                      className="space-y-4"
                    >
                      <div className="text-center space-y-1">
                        <h4 className="text-xs font-bold text-foreground">ইমেইল থেকে ওটিপি কোডটি লিখুন</h4>
                        <p className="text-[11px] text-muted-foreground">
                          অথবা নিচে থাকা সরাসরি বাটনে ক্লিক করে অটো-পূরণ করুন
                        </p>
                      </div>

                      {/* 6 Digit Inputs */}
                      <div className="flex justify-center gap-2">
                        {resetOtp.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`reset-otp-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => {
                              const val = e.target.value;
                              const updated = [...resetOtp];
                              updated[idx] = val;
                              setResetOtp(updated);
                              if (val && idx < 5) {
                                document.getElementById(`reset-otp-${idx + 1}`)?.focus();
                              }
                            }}
                            className="w-10 h-12 text-center text-lg font-bold border border-border rounded-lg bg-surface-subtle focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs px-2">
                        <button
                          type="button"
                          onClick={() => setResetOtp(['7', '4', '9', '2', '0', '3'])}
                          className="text-primary font-bold hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[15px]">auto_fix_high</span>
                          ওটিপি অটো-ফিল (Demo: 749203)
                        </button>
                        <span className="text-muted-foreground text-[11px]">মেয়াদ: ১০ মিনিট</span>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          type="button"
                          onClick={() => setForgotStep('request')}
                          className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                          &larr; ইমেইল পরিবর্তন করুন
                        </button>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="h-10 px-5 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          {isLoading ? 'যাচাই হচ্ছে...' : 'ওটিপি যাচাই করুন &rarr;'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* STEP 3: SET NEW PASSWORD */}
                {forgotStep === 'reset' && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setErrorMessage('');
                      if (!newPassword || newPassword.length < 6) {
                        setErrorMessage('পাসওয়ার্ড ন্যূনতম ৬ ডিজিটের হতে হবে');
                        return;
                      }
                      if (newPassword !== confirmNewPassword) {
                        setErrorMessage('নতুন পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না');
                        return;
                      }

                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        setLoginPassword(newPassword);
                        setResetSuccessTime(new Date().toLocaleTimeString('bn-BD'));
                        setForgotStep('completed');
                      }, 700);
                    }}
                    className="space-y-4 animate-in zoom-in-95"
                  >
                    <div className="p-3 bg-surface-subtle rounded-xl border border-border flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
                      <p className="text-xs text-foreground font-medium">
                        ইমেইল প্রমাণীকরণ সফল হয়েছে! এবার আপনার নতুন শক্তিশালী পাসওয়ার্ড সেট করুন।
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        নতুন পাসওয়ার্ড লিখুন <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="কমপক্ষে ৬ ডিজিটের পাসওয়ার্ড"
                        className="w-full h-10 px-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">
                        পুনরায় নতুন পাসওয়ার্ড লিখুন <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="একই নতুন পাসওয়ার্ড পুনরায় লিখুন"
                        className="w-full h-10 px-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-11 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer mt-2"
                    >
                      {isLoading ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                          <span>পাসওয়ার্ড পরিবর্তন হচ্ছে...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                          <span>পাসওয়ার্ড আপডেট সম্পন্ন করুন</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 4: MOCK CONFIRMATION & SUCCESS SCREEN */}
                {forgotStep === 'completed' && (
                  <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xs">
                      <span className="material-symbols-outlined text-[36px]">task_alt</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground">পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!</h3>
                      <p className="text-xs text-muted-foreground max-w-md mx-auto">
                        আপনার বাউবি নিয়োগ অ্যাকাউন্ট পাসওয়ার্ড সফলভাবে হালনাগাদ করা হয়েছে এবং একটি নিশ্চিতকরণ বিজ্ঞপ্তি ইমেইলে প্রেরণ করা হয়েছে।
                      </p>
                    </div>

                    {/* Official Confirmation Receipt Details */}
                    <div className="p-4 bg-surface-subtle rounded-xl border border-border text-left text-xs space-y-2 max-w-sm mx-auto">
                      <div className="flex items-center justify-between pb-1.5 border-b border-border">
                        <span className="text-muted-foreground">রেফারেন্স অ্যাকাউন্ট:</span>
                        <span className="font-mono font-bold text-foreground">{forgotEmail}</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-border">
                        <span className="text-muted-foreground">নিরাপত্তা টোকেন:</span>
                        <span className="font-mono text-primary font-semibold">{mockResetToken || 'BOU-RESET-8921X'}</span>
                      </div>
                      <div className="flex items-center justify-between pb-1.5 border-b border-border">
                        <span className="text-muted-foreground">আপডেট সময়:</span>
                        <span className="text-foreground">{resetSuccessTime || 'আজ, সময় অনুযায়ী'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">লগইন স্ট্যাটাস:</span>
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          কার্যকর ও প্রস্তুত
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setForgotStep('request');
                          setActiveTab('login');
                          setLoginIdentifier(forgotEmail);
                        }}
                        className="px-6 py-2.5 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">login</span>
                        <span>নতুন পাসওয়ার্ড দিয়ে এখনই লগইন করুন</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Forgot Password Modal Dialog */}
      {isForgotModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="forgot-modal-title"
        >
          <div className="bg-card rounded-2xl max-w-md w-full p-6 shadow-2xl border border-border relative animate-in zoom-in-95 duration-200 space-y-4">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground cursor-pointer p-1 rounded-lg hover:bg-surface-subtle transition-colors"
              aria-label="বন্ধ করুন"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            {!modalConfirmationSent ? (
              /* Modal Form: Request Reset Link */
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setModalErrorMessage('');
                  if (!modalEmailInput || !modalEmailInput.includes('@')) {
                    setModalErrorMessage('অনুগ্রহ করে সঠিক এবং কার্যকর ইমেইল এড্রেস লিখুন');
                    return;
                  }

                  setIsModalSubmitting(true);
                  setTimeout(() => {
                    setIsModalSubmitting(false);
                    setModalConfirmationSent(true);
                  }, 650);
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[24px]">lock_reset</span>
                  </div>
                  <div>
                    <h3 id="forgot-modal-title" className="font-headline-sm text-foreground text-sm font-bold">
                      পাসওয়ার্ড রিসেট ডায়ালগ
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় নিয়োগ প্রমাণীকরণ
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-surface-subtle rounded-xl border border-border text-xs text-muted-foreground leading-relaxed">
                  আপনার নিবন্ধিত ইমেইল ঠিকানাটি নিচে প্রদান করুন। আমরা আপনার ইনবক্সে একটি ওটিপি ভেরিফিকেশন কোডসহ নিরাপদ পাসওয়ার্ড পরিবর্তনের লিংক প্রেরণ করব।
                </div>

                {modalErrorMessage && (
                  <div className="p-2.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-lg text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{modalErrorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    নিবন্ধিত ইমেইল এড্রেস <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-muted-foreground text-[18px]">
                      email
                    </span>
                    <input
                      type="email"
                      required
                      value={modalEmailInput}
                      onChange={(e) => setModalEmailInput(e.target.value)}
                      placeholder="e.g. saiful.bou.candidate@gmail.com"
                      className="w-full h-10 pl-10 pr-3 rounded-lg border border-border bg-surface-subtle text-foreground text-xs focus:ring-2 focus:ring-primary focus:outline-none font-mono"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-1.5 px-0.5">
                    <span>ডেমো অ্যাকাউন্ট টেস্ট:</span>
                    <button
                      type="button"
                      onClick={() => setModalEmailInput('saiful.bou.candidate@gmail.com')}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      saiful.bou.candidate@gmail.com
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-surface-subtle hover:bg-surface-container text-foreground text-xs font-semibold cursor-pointer transition-colors"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    disabled={isModalSubmitting}
                    className="h-10 px-5 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    {isModalSubmitting ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                        <span>যাচাই হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <span>রিসেট নির্দেশিকা পাঠান</span>
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Modal Confirmation Message: Check Your Email */
              <div className="text-center py-3 space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-foreground">আপনার ইমেইল চেক করুন!</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    আমরা <strong className="text-foreground font-mono">{modalEmailInput}</strong> ঠিকানায় পাসওয়ার্ড রিসেট নির্দেশিকা এবং সিকিউরিটি কোড পাঠিয়েছি।
                  </p>
                </div>

                {/* Simulated Email Delivery Confirmation Card */}
                <div className="p-3.5 bg-surface-subtle rounded-xl border border-border text-left text-xs space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground pb-1 border-b border-border text-[11px]">
                    <span className="flex items-center gap-1 font-semibold text-foreground">
                      <span className="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                      সিস্টেম ডেলিভারি কনফার্মেশন
                    </span>
                    <span className="font-mono">এখনই প্রেরিত</span>
                  </div>
                  <div className="space-y-1 text-muted-foreground">
                    <p><strong className="text-foreground">প্রেরক:</strong> no-reply@bou.ac.bd (BOU Recruitment)</p>
                    <p><strong className="text-foreground">বিষয়:</strong> বাউবি পোর্টাল পাসওয়ার্ড রিসেট লিঙ্ক ও ওটিপি</p>
                    <p><strong className="text-foreground">স্ট্যাটাস:</strong> ইনবক্স ও স্প্যাম ফোল্ডার পরীক্ষা করুন</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotModalOpen(false);
                      setForgotEmail(modalEmailInput);
                      setForgotStep('verify');
                      setActiveTab('forgot');
                    }}
                    className="flex-1 py-2.5 px-4 bg-primary text-on-primary hover:bg-primary-container rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>ওটিপি দিয়ে রিসেট স্ক্রিনে যান</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="py-2.5 px-4 bg-surface-subtle hover:bg-surface-container rounded-xl text-foreground font-semibold text-xs cursor-pointer transition-colors"
                  >
                    লগইনে ফিরে যান
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
