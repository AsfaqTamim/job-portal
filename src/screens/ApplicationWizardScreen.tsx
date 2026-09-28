import React, { useState } from 'react';
import { ScreenId, ApplicationRecord } from '../types';

interface WizardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  onSaveApplication: (app: ApplicationRecord) => void;
}

export const ApplicationWizardScreen: React.FC<WizardScreenProps> = ({ onNavigate, onSaveApplication }) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 7;

  // Form states
  const [applicantNameBn, setApplicantNameBn] = useState('মো: সাইফুল ইসলাম');
  const [applicantNameEn, setApplicantNameEn] = useState('MD. SAIFUL ISLAM');
  const [fatherNameBn, setFatherNameBn] = useState('মো: রফিকুল ইসলাম');
  const [motherNameBn, setMotherNameBn] = useState('সুফিয়া খাতুন');
  const [dob, setDob] = useState('1996-05-12');
  const [gender, setGender] = useState('পুরুষ');
  const [nid, setNid] = useState('19962692015000142');
  const [phone, setPhone] = useState('01711223344');
  const [email, setEmail] = useState('saiful.bou.candidate@gmail.com');
  const [freedomFighter, setFreedomFighter] = useState(false);

  // Address
  const [presentAddress, setPresentAddress] = useState('বাড়ি #১২, রোড #০৪, সেক্টর #১১, উত্তরা, ঢাকা-১২৩০');
  const [permanentAddress, setPermanentAddress] = useState('গ্রাম: শিবপুর, ডাকঘর: শিবপুর বাজার, উপজেলা: পলাশ, জেলা: নরসিংদী');

  // Education
  const [educationList, setEducationList] = useState([
    { exam: 'SSC', board: 'ঢাকা', roll: '124901', passingYear: '2012', result: 'GPA 5.00' },
    { exam: 'HSC', board: 'ঢাকা', roll: '458129', passingYear: '2014', result: 'GPA 4.90' },
    { exam: 'B.Sc (Honours)', board: 'ঢাকা বিশ্ববিদ্যালয়', roll: '1410928', passingYear: '2018', result: 'CGPA 3.65 (১ম শ্রেণি)' },
    { exam: 'M.Sc', board: 'ঢাকা বিশ্ববিদ্যালয়', roll: '1810928', passingYear: '2019', result: 'CGPA 3.72 (১ম শ্রেণি)' }
  ]);

  // Experience
  const [experience, setExperience] = useState('বাংলাদেশ পল্লী বিদ্যুতায়ন বোর্ড - অফিস সহকারী (৩ বছর)');

  // References
  const [ref1Name, setRef1Name] = useState('ড. মো: মিজানুর রহমান');
  const [ref1Desig, setRef1Desig] = useState('অধ্যাপক, সমাজবিজ্ঞান বিভাগ, ঢাবি');
  const [ref1Phone, setRef1Phone] = useState('01819234567');

  const [ref2Name, setRef2Name] = useState('কবির আহমেদ');
  const [ref2Desig, setRef2Desig] = useState('যুগ্মসচিব (অব:), জনপ্রশাসন মন্ত্রণালয়');
  const [ref2Phone, setRef2Phone] = useState('01712987654');

  // Declaration
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete and go to preview legal
      const newRecord: ApplicationRecord = {
        id: 'app-user',
        applicationNo: 'BOU-2025-08914',
        circularNo: 'BOU/ADMIN/2025/01',
        postTitle: 'Section Officer (শাখা কর্মকর্তা)',
        postDepartment: 'প্রশাসন ও পরীক্ষা শাখা',
        grade: 'গ্রেড-০৯',
        status: 'draft',
        applicantNameBn,
        applicantNameEn,
        fatherNameBn,
        motherNameBn,
        dateOfBirth: dob,
        ageAtCutoff: 28,
        gender,
        nid,
        phone,
        email,
        freedomFighterClaimed: freedomFighter,
        presentAddress,
        permanentAddress,
        education: educationList,
        experience: [{ designation: 'অফিস সহকারী', organization: 'পল্লী বিদ্যুতায়ন বোর্ড', period: experience }],
        references: [
          { name: ref1Name, designation: ref1Desig, phone: ref1Phone },
          { name: ref2Name, designation: ref2Desig, phone: ref2Phone }
        ],
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces',
        signatureUrl: 'https://api.iconify.design/fluent:signature-20-regular.svg',
        combinedPdfName: 'Saiful_Islam_Certificates_Payorder.pdf',
        verificationChecklist: {
          nid: true,
          education: true,
          experience: true,
          certificates: true,
          payment: true,
          freedomFighter: freedomFighter
        },
        statusHistory: [
          { fromStatus: 'draft', toStatus: 'draft', decidedBy: 'আবেদনকারী নিজে', decidedAt: new Date().toISOString() }
        ]
      };
      onSaveApplication(newRecord);
      onNavigate('preview_legal');
    }
  };

  return (
    <div className="w-full bg-surface-subtle py-8 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-foreground">হোমপেজ</a>
          <span>/</span>
          <a href="#circular" onClick={(e) => { e.preventDefault(); onNavigate('circular'); }} className="hover:text-foreground">বিজ্ঞপ্তি</a>
          <span>/</span>
          <a href="#guide" onClick={(e) => { e.preventDefault(); onNavigate('guide'); }} className="hover:text-foreground">ধাপ নির্দেশিকা</a>
          <span>/</span>
          <span className="text-foreground font-medium">আবেদন ফরম পূরণ</span>
        </nav>

        {/* Stepper Header */}
        <div className="bg-card rounded-xl shadow-xs border border-border p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <span className="text-xs font-mono bg-muted text-foreground px-2 py-0.5 rounded border border-border">
                আবেদন নং: BOU-2025-08914
              </span>
              <h2 className="text-xl font-bold text-foreground mt-1">অনলাইন আবেদন ফরম — সেকশন অফিসার</h2>
              <p className="text-xs text-muted-foreground">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় • প্রশাসন ও সাধারণ মানবসম্পদ বিভাগ</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-primary">ধাপ {step} / {totalSteps}</span>
              <div className="w-32 bg-muted h-2 rounded-full mt-1.5 overflow-hidden border border-border">
                <div 
                  className="bg-primary h-full transition-all duration-300"
                  style={{ width: `${(step / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Stepper Tabs Bar */}
          <div className="flex items-center overflow-x-auto gap-2 pt-4 text-xs font-medium no-scrollbar">
            {[
              { s: 1, title: 'ব্যক্তিগত তথ্য' },
              { s: 2, title: 'যোগাযোগ ও ঠিকানা' },
              { s: 3, title: 'শিক্ষাগত যোগ্যতা' },
              { s: 4, title: 'অভিজ্ঞতা' },
              { s: 5, title: 'রেফারেন্স' },
              { s: 6, title: 'ছবি ও সনদ' },
              { s: 7, title: 'হলফনামা ও দাখিল' }
            ].map((item) => (
              <button
                key={item.s}
                type="button"
                onClick={() => setStep(item.s)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
                  step === item.s 
                    ? 'bg-primary text-on-primary font-semibold shadow-xs' 
                    : step > item.s 
                    ? 'bg-success-muted text-[#065F46]' 
                    : 'bg-muted text-muted-foreground hover:bg-surface-variant'
                }`}
              >
                <span>{item.s}.</span>
                <span>{item.title}</span>
                {step > item.s && <span className="material-symbols-outlined text-[14px]">check</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Wizard Form Area */}
        <form onSubmit={handleNext} className="bg-card rounded-xl shadow-xs border border-border p-6 sm:p-8 space-y-6">
          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-border pb-2">
                <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                  ১. প্রার্থীর ব্যক্তিগত তথ্য (Personal Details)
                </h3>
                <p className="text-xs text-muted-foreground">জাতীয় পরিচয়পত্র ও এসএসসি সনদের সাথে শতভাগ মিল রেখে পূরণ করুন।</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">প্রার্থীর নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={applicantNameBn}
                    onChange={(e) => setApplicantNameBn(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Applicant Name (English - BLOCK LETTERS) *</label>
                  <input
                    type="text"
                    required
                    value={applicantNameEn}
                    onChange={(e) => setApplicantNameEn(e.target.value.toUpperCase())}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">পিতার নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={fatherNameBn}
                    onChange={(e) => setFatherNameBn(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">মাতার নাম (বাংলায়) *</label>
                  <input
                    type="text"
                    required
                    value={motherNameBn}
                    onChange={(e) => setMotherNameBn(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">জন্ম তারিখ (Date of Birth) *</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  />
                  <span className="text-[11px] text-muted-foreground mt-0.5 block">১৫ মার্চ ২০২৫ তারিখে প্রার্থীর বয়স: ২৮ বছর</span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">লিঙ্গ (Gender) *</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  >
                    <option value="পুরুষ">পুরুষ (Male)</option>
                    <option value="নারী">নারী (Female)</option>
                    <option value="অন্যান্য">অন্যান্য (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">জাতীয় পরিচয়পত্র নম্বর (১০/১৭ ডিজিট NID) *</label>
                  <input
                    type="text"
                    required
                    value={nid}
                    onChange={(e) => setNid(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm font-mono focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">মোবাইল নম্বর (সক্রিয় ফোন নম্বর) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm font-mono focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-foreground mb-1">ইমেইল ঠিকানা (Active Email Address) *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2 p-3 bg-surface-subtle rounded-lg border border-border">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={freedomFighter}
                      onChange={(e) => setFreedomFighter(e.target.checked)}
                      className="w-4 h-4 rounded text-primary accent-primary"
                    />
                    <span className="text-xs font-medium text-foreground">
                      বীর মুক্তিযোদ্ধা / শহীদ মুক্তিযোদ্ধার সন্তান কোটা দাবিদার (প্রযোজ্য ক্ষেত্রে টিক দিন)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-border pb-2">
                <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                  ২. বর্তমান ও স্থায়ী ঠিকানা (Address Details)
                </h3>
                <p className="text-xs text-muted-foreground">চিঠিপত্র ও দাপ্তরিক যোগাযোগের জন্য সঠিক পূর্ণাঙ্গ ঠিকানা দিন।</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">বর্তমান ঠিকানা (Present Address) *</label>
                  <textarea
                    rows={3}
                    required
                    value={presentAddress}
                    onChange={(e) => setPresentAddress(e.target.value)}
                    className="w-full p-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-foreground">স্থায়ী ঠিকানা (Permanent Address) *</label>
                    <button
                      type="button"
                      onClick={() => setPermanentAddress(presentAddress)}
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      বর্তমান ঠিকানার অনুলিপি করুন
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={permanentAddress}
                    onChange={(e) => setPermanentAddress(e.target.value)}
                    className="w-full p-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Education */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-border pb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                    ৩. শিক্ষাগত যোগ্যতা (Academic Records)
                  </h3>
                  <p className="text-xs text-muted-foreground">এসএসসি থেকে সর্বশেষ অর্জিত ডিগ্রি পর্যন্ত শিক্ষাগত তথ্য দিন।</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-subtle border-b border-border text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-2.5">পরীক্ষার নাম</th>
                      <th className="p-2.5">বোর্ড / বিশ্ববিদ্যালয়</th>
                      <th className="p-2.5">পাশের সন</th>
                      <th className="p-2.5">ফলাফল / সিজিপিএ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {educationList.map((edu, idx) => (
                      <tr key={idx} className="hover:bg-surface-subtle">
                        <td className="p-2.5 font-bold text-foreground">{edu.exam}</td>
                        <td className="p-2.5 text-foreground">{edu.board}</td>
                        <td className="p-2.5 font-mono text-foreground">{edu.passingYear}</td>
                        <td className="p-2.5 font-semibold text-primary">{edu.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Step 4: Experience */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-border pb-2">
                <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">work</span>
                  ৪. পেশাগত অভিজ্ঞতা বিবরণী (Employment History - Optional)
                </h3>
                <p className="text-xs text-muted-foreground">প্রাসঙ্গিক কাজের অভিজ্ঞতা থাকলে উল্লেখ করুন।</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">প্রতিষ্ঠান, পদবি ও দায়িত্বের বিবরণ</label>
                <textarea
                  rows={4}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full p-3 rounded-lg bg-surface-subtle border border-border text-foreground text-sm focus:border-primary focus:bg-background outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Step 5: References */}
          {step === 5 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-border pb-2">
                <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">group</span>
                  ৫. প্রত্যয়নকারী ২ জন ব্যক্তির তথ্য (Two References)
                </h3>
                <p className="text-xs text-muted-foreground">প্রার্থীর সাথে রক্তের সম্পর্কহীন দুইজন দায়িত্বশীল ব্যক্তির তথ্য আবশ্যক।</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-subtle border border-border space-y-3">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">রেফারেন্স ১</h4>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">নাম *</label>
                    <input
                      type="text"
                      required
                      value={ref1Name}
                      onChange={(e) => setRef1Name(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-card border border-border text-foreground text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">পদবি ও প্রতিষ্ঠান *</label>
                    <input
                      type="text"
                      required
                      value={ref1Desig}
                      onChange={(e) => setRef1Desig(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-card border border-border text-foreground text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="text"
                      required
                      value={ref1Phone}
                      onChange={(e) => setRef1Phone(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-card border border-border text-foreground text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-subtle border border-border space-y-3">
                  <h4 className="font-semibold text-xs text-foreground uppercase tracking-wider">রেফারেন্স ২</h4>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">নাম *</label>
                    <input
                      type="text"
                      required
                      value={ref2Name}
                      onChange={(e) => setRef2Name(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-card border border-border text-foreground text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">পদবি ও প্রতিষ্ঠান *</label>
                    <input
                      type="text"
                      required
                      value={ref2Desig}
                      onChange={(e) => setRef2Desig(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-card border border-border text-foreground text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="text"
                      required
                      value={ref2Phone}
                      onChange={(e) => setRef2Phone(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-card border border-border text-foreground text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Documents & Photo */}
          {step === 6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-border pb-2">
                <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">cloud_upload</span>
                  ৬. ছবি, স্বাক্ষর ও সমন্বিত সনদ আপলোড
                </h3>
                <p className="text-xs text-muted-foreground">সঠিক মাপ ও রেজোলিউশনের ফাইল সংযুক্ত করুন।</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-surface-subtle border border-border flex flex-col items-center text-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces"
                    alt="Photo"
                    className="w-24 h-24 object-cover rounded-md border border-border shadow-xs mb-2"
                  />
                  <span className="text-xs font-bold text-foreground">রঙিন ছবি</span>
                  <span className="text-[11px] text-muted-foreground">৩০০ × ৩০০ px (সংযুক্ত)</span>
                </div>

                <div className="p-4 rounded-xl bg-surface-subtle border border-border flex flex-col items-center text-center">
                  <div className="w-32 h-16 bg-white border border-border rounded-md flex items-center justify-center p-2 mb-2">
                    <span className="font-serif italic text-lg text-foreground">Md. Saiful Islam</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">স্বাক্ষর স্ক্যান</span>
                  <span className="text-[11px] text-muted-foreground">৩০০ × ৮০ px (সংযুক্ত)</span>
                </div>

                <div className="p-4 rounded-xl bg-surface-subtle border border-border flex flex-col items-center text-center justify-center">
                  <span className="material-symbols-outlined text-error text-[36px] mb-1">picture_as_pdf</span>
                  <span className="text-xs font-bold text-foreground">একীভূত সনদ PDF</span>
                  <span className="text-[11px] text-muted-foreground font-mono">Saiful_Docs.pdf (৪.২ MB)</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 7: Declaration */}
          {step === 7 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="border-b border-border pb-2">
                <h3 className="font-headline-sm text-foreground flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">gavel</span>
                  ৭. প্রার্থীর হলফনামা ও চূড়ান্ত দাখিল (Declaration)
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-surface-subtle border border-border text-xs leading-relaxed space-y-2 text-foreground">
                <p>
                  আমি এতদ্বারা ঘোষণা করছি যে, এই আবেদনে বর্ণিত সকল বিবরণ ও তথ্য সম্পূর্ণ সত্য, সঠিক ও নির্ভুল। ভবিষ্যতে কোনো তথ্য অসত্য প্রমাণিত হলে আমার প্রার্থিতা বা নিয়োগ বাতিল হবে এবং আমি প্রচলিত আইন অনুযায়ী শাস্তির মুখোমুখি হতে বাধ্য থাকিব।
                </p>
                <p>
                  আমি আরও নিশ্চিত করছি যে, নির্ধারিত সময়ের মধ্যে মূল পে-অর্ডারসহ আমার আবেদনের ৩ সেট মুদ্রিত কপি বিশ্ববিদ্যালয়ের রেজিস্ট্রার দপ্তরে ডাকযোগে প্রেরণ করব।
                </p>
              </div>

              <div className="p-4 rounded-xl bg-primary-fixed/30 border border-primary/20">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={declarationAccepted}
                    onChange={(e) => setDeclarationAccepted(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-primary accent-primary"
                  />
                  <span className="text-xs font-semibold text-foreground">
                    আমি উপরোক্ত হলফনামা ও নিয়োগের সকল শর্ত মনোযোগ সহকারে পড়েছি এবং নিঃশর্তভাবে সম্মত হয়েছি।
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Buttons Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="h-10 px-4 rounded-lg bg-surface-subtle hover:bg-muted text-foreground font-label-md text-xs sm:text-sm font-medium border border-border transition-colors cursor-pointer"
              >
                পূর্ববর্তী ধাপ
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate('guide')}
                className="h-10 px-4 rounded-lg bg-surface-subtle hover:bg-muted text-foreground font-label-md text-xs sm:text-sm font-medium border border-border transition-colors cursor-pointer"
              >
                নির্দেশিকায় ফিরে যান
              </button>
            )}

            <button
              type="submit"
              disabled={step === 7 && !declarationAccepted}
              className={`h-10 px-6 rounded-lg text-on-primary font-label-md text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                step === 7 && !declarationAccepted 
                  ? 'bg-muted-foreground/50 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-container'
              }`}
            >
              <span>{step === totalSteps ? 'লিগ্যাল প্রিভিউতে যান (Legal Preview)' : 'সংরক্ষণ ও পরবর্তী ধাপ'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
