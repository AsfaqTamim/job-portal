import { ApplicationRecord, CircularNotice } from './types';

export const initialCirculars: CircularNotice[] = [
  {
    id: 'circ-1',
    circularNo: 'BOU/ADMIN/2025/01',
    title: 'প্রশাসনিক পদসমূহের সমন্বিত নিয়োগ বিজ্ঞপ্তি',
    status: 'published',
    publishDate: '2025-01-10',
    category: 'admin',
    categoryBn: 'প্রশাসনিক কর্মকর্তা',
    deadline: '2025-03-15T23:59:59',
    originalDeadline: '2025-02-28T23:59:59',
    fee: '১,০০০/-',
    minimumAge: 18,
    maximumAge: 30,
    ageCutoffDate: '2025-03-15',
    posts: [
      {
        id: 'post-1',
        title: 'Section Officer (শাখা কর্মকর্তা)',
        department: 'প্রশাসন ও পরীক্ষা শাখা',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-০৯',
        salary: '২২,০০০ - ৫৩,০৬০/-',
        vacancies: '০৩টি',
        requirements: 'ন্যূনতম দ্বিতীয় শ্রেণির স্নাতকোত্তর অথবা চার বছর মেয়াদি স্নাতক ডিগ্রি। কম্পিউটারে পারদর্শিতা আবশ্যক।',
        ageLimit: 'অনূর্ধ্ব ৩২ বছর',
        category: 'admin'
      },
      {
        id: 'post-2',
        title: 'Accounts Officer (হিসাব কর্মকর্তা)',
        department: 'অর্থ ও হিসাব বিভাগ',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-০৯',
        salary: '২২,০০০ - ৫৩,০৬০/-',
        vacancies: '০২টি',
        requirements: 'বাণিজ্য অনুষদে সংশ্লিষ্ট বিষয়ে স্নাতকোত্তর। অ্যাকাউন্টিং সফটওয়্যার চালনায় বাস্তব অভিজ্ঞতাসম্পন্ন।',
        ageLimit: 'অনূর্ধ্ব ৩২ বছর',
        category: 'admin'
      },
      {
        id: 'post-3',
        title: 'Administrative Officer (প্রশাসনিক কর্মকর্তা)',
        department: 'আঞ্চলিক সেবা বিভাগ',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-১০',
        salary: '১৬,০০০ - ৩৮,৬৪০/-',
        vacancies: '০৫টি',
        requirements: 'স্নাতক (সম্মান) ডিগ্রি। দাপ্তরিক নথি ব্যবস্থাপনা ও ই-নথিতে ন্যূনতম ২ বছরের অভিজ্ঞতা।',
        ageLimit: 'অনূর্ধ্ব ৩০ বছর',
        category: 'admin'
      },
      {
        id: 'post-4',
        title: 'Upper Division Assistant (উচ্চমান সহকারী)',
        department: 'কেন্দ্রীয় প্রশাসন',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-১৩',
        salary: '১১,০০০ - ২৬,৫৯০/-',
        vacancies: '০৮টি',
        requirements: 'স্নাতক বা সমমানের ডিগ্রি। বাংলা ও ইংরেজি টাইপিংয়ে নির্ধারিত গতি নিশ্চিত থাকতে হবে।',
        ageLimit: '১৮ থেকে ৩০ বছর',
        category: 'staff'
      }
    ]
  },
  {
    id: 'circ-2',
    circularNo: 'BOU/SST/2025/02',
    title: 'কম্পিউটার সায়েন্স ও আইসিটি টেকনিক্যাল পোস্ট (SST)',
    status: 'published',
    publishDate: '2025-02-15',
    category: 'faculty',
    categoryBn: 'শিক্ষক নিয়োগ (অনুষদ)',
    deadline: '2025-03-30T23:59:59',
    fee: '১,২০০/-',
    minimumAge: 18,
    maximumAge: 35,
    ageCutoffDate: '2025-03-30',
    posts: [
      {
        id: 'post-5',
        title: 'Assistant Professor (সহকারী অধ্যাপক) - CSE',
        department: 'কম্পিউটার সায়েন্স বিভাগ',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-০৬',
        salary: '৩৫,৫০০ - ৬৭,০১০/-',
        vacancies: '০২টি',
        requirements: 'সংশ্লিষ্ট বিষয়ে প্রথম শ্রেণির বিএসসি/এমএসসি এবং ৩ বছরের শিক্ষকতা ও গবেষণা জার্নাল।',
        ageLimit: 'অনূর্ধ্ব ৩৫ বছর',
        category: 'faculty'
      },
      {
        id: 'post-6',
        title: 'Lecturer (প্রভাষক) - আইসিটি শাখা',
        department: 'আইসিটি সেল / SST',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-০৮',
        salary: '২৩,০০০ - ৫৫,৪৭০/-',
        vacancies: '০৩টি',
        requirements: 'সিএসই/আইটি বিষয়ে ন্যূনতম সিজিপিএ ৩.৫সহ স্নাতক ডিগ্রি।',
        ageLimit: 'অনূর্ধ্ব ৩০ বছর',
        category: 'faculty'
      }
    ]
  },
  {
    id: 'circ-3',
    circularNo: 'BOU/REG/2025/03',
    title: 'আঞ্চলিক কেন্দ্রসমূহ ও কেন্দ্রীয় আইসিটি টেকনিক্যাল নিয়োগ বিজ্ঞপ্তি',
    status: 'published',
    publishDate: '2025-03-01',
    category: 'technical',
    categoryBn: 'আইসিটি ও টেকনিক্যাল',
    deadline: '2025-04-15T23:59:59',
    fee: '৮০০/-',
    minimumAge: 18,
    maximumAge: 30,
    ageCutoffDate: '2025-04-15',
    posts: [
      {
        id: 'post-7',
        title: 'Network & System Engineer (সিস্টেম ইঞ্জিনিয়ার)',
        department: 'কম্পিউটার ও তথ্যপ্রযুক্তি বিভাগ',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-০৯',
        salary: '২২,০০০ - ৫৩,০৬০/-',
        vacancies: '০২টি',
        requirements: 'কম্পিউটার সায়েন্স/ইইই-তে স্নাতক ডিগ্রি। লিনাক্স সার্ভার ও ক্লাউড নেটওয়ার্কিংয়ে ২ বছরের অভিজ্ঞতা।',
        ageLimit: 'অনূর্ধ্ব ৩২ বছর',
        category: 'technical'
      },
      {
        id: 'post-8',
        title: 'Data Entry / Computer Operator (ডাটা এন্ট্রি অপারেটর)',
        department: 'আঞ্চলিক কেন্দ্রসমূহ (ঢাকা, চট্টগ্রাম, রাজশাহী)',
        jobType: 'স্থায়ী',
        grade: 'গ্রেড-১৬',
        salary: '৯,৩০০ - ২২,৪৯০/-',
        vacancies: '১২টি',
        requirements: 'এইচএসসি বা সমমান পাস। টাইপিং গতি বাংলায় ২০ ও ইংরেজিতে ২৮ শব্দ প্রতি মিনিটে।',
        ageLimit: '১৮ থেকে ৩০ বছর',
        category: 'staff'
      }
    ]
  }
];

export const initialApplications: ApplicationRecord[] = [
  {
    id: 'app-1',
    applicationNo: 'BOU-2025-08914',
    circularNo: 'BOU/ADMIN/2025/01',
    postTitle: 'সেকশন অফিসার (Section Officer)',
    postDepartment: 'প্রশাসন ও পরীক্ষা শাখা',
    grade: 'গ্রেড-০৯',
    status: 'submitted',
    submittedAt: '2025-02-20T14:32:00',
    applicantNameBn: 'মো: সাইফুল ইসলাম',
    applicantNameEn: 'MD. SAIFUL ISLAM',
    fatherNameBn: 'মো: রফিকুল ইসলাম',
    motherNameBn: 'সুফিয়া খাতুন',
    dateOfBirth: '1996-05-12',
    ageAtCutoff: 28,
    gender: 'পুরুষ',
    nid: '19962692015000142',
    phone: '01711223344',
    email: 'saiful.bou.candidate@gmail.com',
    freedomFighterClaimed: false,
    presentAddress: 'বাড়ি #১২, রোড #০৪, সেক্টর #১১, উত্তরা, ঢাকা-১২৩০',
    permanentAddress: 'গ্রাম: শিবপুর, ডাকঘর: শিবপুর বাজার, উপজেলা: পলাশ, জেলা: নরসিংদী',
    education: [
      { exam: 'SSC', board: 'ঢাকা', roll: '124901', passingYear: '2012', result: 'GPA 5.00' },
      { exam: 'HSC', board: 'ঢাকা', roll: '458129', passingYear: '2014', result: 'GPA 4.90' },
      { exam: 'B.Sc (Hons)', board: 'ঢাকা বিশ্ববিদ্যালয়', roll: '1410928', passingYear: '2018', result: 'CGPA 3.65 (১ম শ্রেণি)' },
      { exam: 'M.Sc', board: 'ঢাকা বিশ্ববিদ্যালয়', roll: '1810928', passingYear: '2019', result: 'CGPA 3.72 (১ম শ্রেণি)' }
    ],
    experience: [
      { designation: 'অফিস সহকারী', organization: 'বাংলাদেশ পল্লী বিদ্যুতায়ন বোর্ড', period: '২০২০ - ২০২৩ (৩ বছর)' }
    ],
    references: [
      { name: 'ড. মো: মিজানুর রহমান', designation: 'অধ্যাপক, সমাজবিজ্ঞান বিভাগ, ঢাবি', phone: '01819234567' },
      { name: 'কবির আহমেদ', designation: 'যুগ্মসচিব (অব:), জনপ্রশাসন মন্ত্রণালয়', phone: '01712987654' }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces',
    signatureUrl: 'https://api.iconify.design/fluent:signature-20-regular.svg',
    combinedPdfName: 'Saiful_Islam_Certificates_Payorder.pdf',
    verificationChecklist: {
      nid: true,
      education: true,
      experience: false,
      certificates: true,
      payment: true,
      freedomFighter: false
    },
    statusHistory: [
      { fromStatus: 'draft', toStatus: 'submitted', decidedBy: 'আবেদনকারী নিজে', decidedAt: '2025-02-20T14:32:00', note: 'অনলাইন চূড়ান্ত আবেদন সম্পন্ন' }
    ]
  },
  {
    id: 'app-2',
    applicationNo: 'BOU-2025-08915',
    circularNo: 'BOU/ADMIN/2025/01',
    postTitle: 'সহকারী একাউন্টস অফিসার (Accounts Officer)',
    postDepartment: 'অর্থ ও হিসাব বিভাগ',
    grade: 'গ্রেড-০৯',
    status: 'under_review',
    submittedAt: '2025-02-18T10:15:00',
    applicantNameBn: 'নুসরাত জাহান',
    applicantNameEn: 'NUSRAT JAHAN',
    fatherNameBn: 'মাহবুব আলম',
    motherNameBn: 'পারভীন আক্তার',
    dateOfBirth: '1995-11-24',
    ageAtCutoff: 29,
    gender: 'নারী',
    nid: '19952692015000889',
    phone: '01822334455',
    email: 'nusrat.jahan.du@gmail.com',
    freedomFighterClaimed: true,
    presentAddress: 'প্লট #৪৫, ধানমন্ডি আ/এ, রোড #২৭, ঢাকা',
    permanentAddress: 'থানা রোড, কুমিল্লা সদর, কুমিল্লা',
    education: [
      { exam: 'SSC', board: 'কুমিল্লা', roll: '109281', passingYear: '2011', result: 'GPA 5.00' },
      { exam: 'HSC', board: 'কুমিল্লা', roll: '302918', passingYear: '2013', result: 'GPA 5.00' },
      { exam: 'BBA (Accounting)', board: 'চট্টগ্রাম বিশ্ববিদ্যালয়', roll: '131002', passingYear: '2017', result: 'CGPA 3.80' },
      { exam: 'MBA', board: 'চট্টগ্রাম বিশ্ববিদ্যালয়', roll: '171002', passingYear: '2018', result: 'CGPA 3.85' }
    ],
    experience: [
      { designation: 'জুনিয়র হিসাব কর্মকর্তা', organization: 'অগ্রণী ব্যাংক পিএলসি', period: '২০১৯ - বর্তমান' }
    ],
    references: [
      { name: 'প্রফেসর ড. আনিসুর রহমান', designation: 'ব্যবসায় অনুষদ, চবি', phone: '01711333444' },
      { name: 'মোশাররফ হোসেন', designation: 'উপ-পরিচালক, হিসাব মহানিয়ন্ত্রক', phone: '01911444555' }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces',
    signatureUrl: 'https://api.iconify.design/fluent:signature-20-regular.svg',
    combinedPdfName: 'Nusrat_Jahan_Accounting_Docs.pdf',
    verificationChecklist: {
      nid: true,
      education: true,
      experience: true,
      certificates: true,
      payment: true,
      freedomFighter: true
    },
    statusHistory: [
      { fromStatus: 'draft', toStatus: 'submitted', decidedBy: 'আবেদনকারী নিজে', decidedAt: '2025-02-18T10:15:00', note: 'অনলাইন দাখিল' },
      { fromStatus: 'submitted', toStatus: 'under_review', decidedBy: 'ড. মহা. শফিকুল আলম (রেজিস্ট্রার)', decidedAt: '2025-02-22T11:00:00', note: 'হার্ডকপি ও পে-অর্ডার রসিদ গ্রহণ সম্পন্ন' }
    ]
  },
  {
    id: 'app-3',
    applicationNo: 'BOU-2025-08916',
    circularNo: 'BOU/ADMIN/2025/01',
    postTitle: 'প্রশাসনিক কর্মকর্তা (Administrative Officer)',
    postDepartment: 'আঞ্চলিক কেন্দ্রসমূহ',
    grade: 'গ্রেড-১০',
    status: 'verified',
    submittedAt: '2025-02-15T09:00:00',
    applicantNameBn: 'তানভীর আহমেদ',
    applicantNameEn: 'TANVEER AHMED',
    fatherNameBn: 'আনিসুল হক',
    motherNameBn: 'জাহানারা বেগম',
    dateOfBirth: '1997-03-08',
    ageAtCutoff: 27,
    gender: 'পুরুষ',
    nid: '19972692015000552',
    phone: '01933445566',
    email: 'tanveer.ahmed.bou@gmail.com',
    freedomFighterClaimed: false,
    presentAddress: 'বোর্ড বাজার, গাজীপুর সদর, গাজীপুর',
    permanentAddress: 'ডাকঘর: কাপাসিয়া, গাজীপুর',
    education: [
      { exam: 'SSC', board: 'ঢাকা', roll: '221144', passingYear: '2013', result: 'GPA 4.85' },
      { exam: 'HSC', board: 'ঢাকা', roll: '554433', passingYear: '2015', result: 'GPA 4.70' },
      { exam: 'BA (Hons)', board: 'রাজশাহী বিশ্ববিদ্যালয়', roll: '150291', passingYear: '2019', result: 'CGPA 3.50' }
    ],
    experience: [],
    references: [
      { name: 'ড. জাহিদুল ইসলাম', designation: 'অধ্যাপক, রাবি', phone: '01811555666' },
      { name: 'হারুনুর রশীদ', designation: 'সহকারী সচিব, শিক্ষা মন্ত্রণালয়', phone: '01511666777' }
    ],
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces',
    signatureUrl: 'https://api.iconify.design/fluent:signature-20-regular.svg',
    combinedPdfName: 'Tanveer_Ahmed_All_Certificates.pdf',
    verificationChecklist: {
      nid: true,
      education: true,
      experience: false,
      certificates: true,
      payment: true,
      freedomFighter: false
    },
    statusHistory: [
      { fromStatus: 'draft', toStatus: 'submitted', decidedBy: 'আবেদনকারী নিজে', decidedAt: '2025-02-15T09:00:00' },
      { fromStatus: 'submitted', toStatus: 'under_review', decidedBy: 'প্রশাসন বিভাগ', decidedAt: '2025-02-17T14:20:00' },
      { fromStatus: 'under_review', toStatus: 'verified', decidedBy: 'ড. মহা. শফিকুল আলম (রেজিস্ট্রার)', decidedAt: '2025-02-25T16:00:00', note: 'সকল শিক্ষাগত সনদ ও পে-অর্ডার মূল কপির সাথে সঠিক পাওয়া গিয়েছে।' }
    ]
  }
];

export const sampleApplications: ApplicationRecord[] = initialApplications;

