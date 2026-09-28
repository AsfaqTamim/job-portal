import React, { useState, useEffect } from 'react';
import { ScreenId, UserRole, ApplicationRecord, CircularNotice, ApplicationStatus, VerificationChecklist } from './types';
import { initialCirculars, sampleApplications } from './mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './screens/HomeScreen';
import { CircularDetailScreen } from './screens/CircularDetailScreen';
import { ApplicationGuideScreen } from './screens/ApplicationGuideScreen';
import { ApplicationWizardScreen } from './screens/ApplicationWizardScreen';
import { LegalPreviewScreen } from './screens/LegalPreviewScreen';
import { ApplicantDashboardScreen } from './screens/ApplicantDashboardScreen';
import { AdminCircularsScreen } from './screens/AdminCircularsScreen';
import { AdminApplicationsScreen } from './screens/AdminApplicationsScreen';
import { StaffApplicationReviewScreen } from './screens/StaffApplicationReviewScreen';
import { AdminUsersScreen } from './screens/AdminUsersScreen';
import { AuthScreen } from './screens/AuthScreen';
import { DownloadFormsScreen } from './screens/DownloadFormsScreen';

interface UserSession {
  name: string;
  email: string;
  role: UserRole;
  phone: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('applicant');
  const [currentUser, setCurrentUser] = useState<UserSession | null>({
    name: 'মো: সাইফুল ইসলাম',
    email: 'saiful.bou.candidate@gmail.com',
    role: 'applicant',
    phone: '01711223344',
  });
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward');

  // Database state
  const [circulars, setCirculars] = useState<CircularNotice[]>(initialCirculars);
  const [applications, setApplications] = useState<ApplicationRecord[]>(sampleApplications);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationRecord>(sampleApplications[0]);

  // Navigate handler with history support
  const handleNavigate = (targetScreen: ScreenId) => {
    if (targetScreen === currentScreen) return;

    // Determine direction for transitions
    const screenOrder: Record<ScreenId, number> = {
      home: 1,
      circular: 2,
      guide: 3,
      download_forms: 4,
      auth: 5,
      wizard: 6,
      preview_legal: 7,
      dashboard: 8,
      admin_circulars: 9,
      admin_applications: 10,
      admin_review: 11,
      admin_users: 12,
    };

    const isBackward = (screenOrder[targetScreen] || 1) < (screenOrder[currentScreen] || 1);
    setTransitionDirection(isBackward ? 'backward' : 'forward');
    setCurrentScreen(targetScreen);

    // Scroll to top upon navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentUserRole(role);
    if (currentUser) {
      let updatedName = currentUser.name;
      let updatedEmail = currentUser.email;

      if (role === 'staff') {
        updatedName = 'ড. মো: সাইফুল আলম (যাচাই কর্মকর্তা)';
        updatedEmail = 'scrutiny.officer@bou.ac.bd';
      } else if (role === 'admin') {
        updatedName = 'ড. মহা. শফিকুল আলম (রেজিস্ট্রার)';
        updatedEmail = 'registrar@bou.ac.bd';
      } else {
        updatedName = 'মো: সাইফুল ইসলাম';
        updatedEmail = 'saiful.bou.candidate@gmail.com';
      }

      setCurrentUser({
        ...currentUser,
        name: updatedName,
        email: updatedEmail,
        role,
      });
    }

    if (role === 'staff' && !currentScreen.startsWith('admin_')) {
      handleNavigate('admin_applications');
    } else if (role === 'applicant' && currentScreen.startsWith('admin_')) {
      handleNavigate('dashboard');
    }
  };

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    setCurrentUserRole(user.role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentUserRole('applicant');
  };

  const handleSaveApplication = (newApp: ApplicationRecord) => {
    setApplications((prev) => [newApp, ...prev.filter((a) => a.id !== newApp.id)]);
    setSelectedApplication(newApp);
  };

  const handleFinalSubmit = () => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === selectedApplication.id
          ? {
              ...app,
              status: 'submitted',
              submittedAt: new Date().toISOString(),
              statusHistory: [
                ...app.statusHistory,
                {
                  fromStatus: app.status,
                  toStatus: 'submitted',
                  decidedBy: 'আবেদনকারী নিজে',
                  decidedAt: new Date().toISOString(),
                  note: 'আবেদনপত্র সফলভাবে সাবমিট ও সার্ভারে গৃহীত হয়েছে',
                },
              ],
            }
          : app
      )
    );
  };

  const handleUpdateCircularDeadline = (circId: string, newDeadline: string) => {
    setCirculars((prev) =>
      prev.map((c) => (c.id === circId ? { ...c, deadline: newDeadline, status: 'published' } : c))
    );
  };

  const handleCreateCircular = (newCirc: CircularNotice) => {
    setCirculars((prev) => [newCirc, ...prev]);
  };

  const handleUpdateApplicationStatus = (
    appId: string,
    newStatus: ApplicationStatus,
    reason: string,
    note: string,
    checklist: VerificationChecklist
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id !== appId) return app;
        const updated: ApplicationRecord = {
          ...app,
          status: newStatus,
          verificationChecklist: checklist,
          statusHistory: [
            ...app.statusHistory,
            {
              fromStatus: app.status,
              toStatus: newStatus,
              decidedBy: currentUser?.name || 'ড. মহা. শফিকুল আলম (যাচাইকারী কর্মকর্তা)',
              decidedAt: new Date().toISOString(),
              reason,
              note,
            },
          ],
        };
        if (selectedApplication.id === appId) {
          setSelectedApplication(updated);
        }
        return updated;
      })
    );
  };

  // Listen to popstate or browser back if needed
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'job-circulars' || hash === 'circulars') {
        handleNavigate('circular');
      } else if (hash === 'application-process' || hash === 'apply') {
        handleNavigate('guide');
      } else if (hash === 'dashboard') {
        handleNavigate('dashboard');
      } else if (hash === 'auth' || hash === 'login' || hash === 'register') {
        handleNavigate('auth');
      } else if (hash === 'forms' || hash === 'download') {
        handleNavigate('download_forms');
      } else if (hash === 'admin' || hash === 'admin_applications') {
        handleNavigate('admin_applications');
      } else if (hash === 'home' || hash === '') {
        handleNavigate('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentScreen]);

  return (
    <div className="min-h-screen flex flex-col bg-surface-subtle selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {/* Global Header across all screens */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        currentUserRole={currentUserRole}
        onSwitchRole={handleRoleSwitch}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Screen Content Area with page transition wrapper */}
      <main className="w-full pt-16 bg-surface-subtle min-h-screen flex-1">
        <div
          key={currentScreen}
          className={`w-full transition-all duration-300 ease-in-out ${
            transitionDirection === 'forward'
              ? 'animate-in fade-in-50 slide-in-from-right-4'
              : 'animate-in fade-in-50 slide-in-from-left-4'
          }`}
        >
          {currentScreen === 'home' && <HomeScreen onNavigate={handleNavigate} circulars={circulars} />}

          {currentScreen === 'circular' && <CircularDetailScreen onNavigate={handleNavigate} />}

          {currentScreen === 'guide' && <ApplicationGuideScreen onNavigate={handleNavigate} />}

          {currentScreen === 'auth' && (
            <AuthScreen
              onNavigate={handleNavigate}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {currentScreen === 'download_forms' && (
            <DownloadFormsScreen onNavigate={handleNavigate} />
          )}

          {currentScreen === 'wizard' && (
            <ApplicationWizardScreen
              onNavigate={handleNavigate}
              onSaveApplication={handleSaveApplication}
            />
          )}

          {currentScreen === 'preview_legal' && (
            <LegalPreviewScreen
              application={selectedApplication}
              onNavigate={handleNavigate}
              onSubmitFinal={handleFinalSubmit}
            />
          )}

          {currentScreen === 'dashboard' && (
            <ApplicantDashboardScreen
              applications={applications}
              onNavigate={handleNavigate}
              onSelectApplication={(app) => {
                setSelectedApplication(app);
                handleNavigate('preview_legal');
              }}
            />
          )}

          {currentScreen === 'admin_circulars' && (
            <AdminCircularsScreen
              circulars={circulars}
              onNavigate={handleNavigate}
              onUpdateDeadline={handleUpdateCircularDeadline}
              onCreateCircular={handleCreateCircular}
            />
          )}

          {currentScreen === 'admin_applications' && (
            <AdminApplicationsScreen
              applications={applications}
              onNavigate={handleNavigate}
              onSelectApplication={(app) => {
                setSelectedApplication(app);
                handleNavigate('admin_review');
              }}
            />
          )}

          {currentScreen === 'admin_review' && (
            <StaffApplicationReviewScreen
              application={selectedApplication}
              onNavigate={handleNavigate}
              onUpdateStatus={handleUpdateApplicationStatus}
            />
          )}

          {currentScreen === 'admin_users' && (
            <AdminUsersScreen
              onNavigate={handleNavigate}
              currentUserRole={currentUserRole}
              onSwitchRole={handleRoleSwitch}
            />
          )}
        </div>
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
