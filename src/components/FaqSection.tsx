import React, { useState, useMemo } from 'react';
import { ScreenId } from '../types';

interface FaqSectionProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenSupportModal?: () => void;
  onOpenTrackModal?: () => void;
}

export type FaqCategory = 'all' | 'documents' | 'payment' | 'technical' | 'eligibility';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  categoryNameBn: string;
  questionBn: string;
  questionEn?: string;
  answerBn: string;
  keyPoints?: string[];
  actionType?: 'forms' | 'auth' | 'support' | 'track' | 'circular';
  actionLabel?: string;
  badge?: string;
}

export const faqData: FaqItem[] = [
  // --- Category: Documents ---
  {
    id: 'doc-1',
    category: 'documents',
    categoryNameBn: 'কাগজপত্র ও সনদ',
    badge: 'বাধ্যতামূলক ডকুমেন্টস',
    questionBn: 'অনলাইনে আবেদন করতে কী কী কাগজপত্র, সনদ ও ফাইল স্ক্যান করে আপলোড করতে হবে?',
    questionEn: 'What documents and certificates are required for online application?',
    answerBn: 'বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অনলাইন আবেদন প্রক্রিয়ায় নিম্নলিখিত ডকুমেন্টস প্রস্তুত রেখে যথাযথ ধাপে স্ক্যান কপি আপলোড করতে হবে:',
    keyPoints: [
      'শিক্ষাগত সনদ: এসএসসি, এইচএসসি, স্নাতক ও স্নাতকোত্তরের মূল/সাময়িক সনদ এবং ট্রান্সক্রিপ্ট/মার্কশিট (PDF/JPEG, সর্বোচ্চ ৫ MB)।',
      'জাতীয় পরিচয়পত্র: প্রার্থীর এনআইডি (NID) কার্ডের স্পষ্ট কপি অথবা ১৭ ডিজিটের ডিজিটাল জন্ম নিবন্ধন সনদ।',
      'সদ্য তোলা ছবি: ল্যাব প্রিন্ট পাসপোর্ট সাইজ রঙিন ছবি (মাপ: ৩০০ × ৩০০ পিক্সেল, সাইজ: সর্বোচ্চ ১০০ KB, JPG/JPEG)।',
      'ডিজিটাল স্বাক্ষর: সাদা কাগজে প্রার্থীর স্পষ্ট স্বাক্ষর (মাপ: ৩০০ × ৮০ পিক্সেল, সাইজ: সর্বোচ্চ ৬০ KB, JPG/JPEG)।',
      'চারিত্রিক সনদ: প্রথম শ্রেণির গেজেটেড কর্মকর্তা কর্তৃক ইস্যুকৃত মূল চারিত্রিক সনদপত্রের কপি।',
      'বিভাগীয় ছাড়পত্র (NOC): চাকরিরত প্রার্থীদের ক্ষেত্রে যথাযথ কর্তৃপক্ষের স্বাক্ষরিত ছাড়পত্র/অনাপত্তিপত্র।',
      'কোটা সনদ: বীর মুক্তিযোদ্ধা সন্তান/নাতি-নাতনি বা শারীরিক প্রতিবন্ধী কোটায় উপযুক্ত সরকারি সনদ।'
    ],
    actionType: 'forms',
    actionLabel: 'অফিসিয়াল ফর্ম ও নির্দেশিকা ডাউনলোড করুন'
  },
  {
    id: 'doc-2',
    category: 'documents',
    categoryNameBn: 'কাগজপত্র ও সনদ',
    badge: 'সত্যায়ন ও ডাকযোগ',
    questionBn: 'হার্ডকপি প্রিন্ট, সনদের সত্যায়ন (Attestation) এবং ডাকযোগে প্রেরণের নিয়ম কী?',
    questionEn: 'What are the rules for attestation and sending hard copies by post?',
    answerBn: 'অনলাইন আবেদন সম্পন্ন করার পর সিস্টেম থেকে ৩ পৃষ্ঠার লিগ্যাল সাইজ প্রিন্ট কপি ডাউনলোড করতে হবে। এরপর নিচের ধাপসমূহ অনুসরণ করুন:',
    keyPoints: [
      'সিস্টেম-জেনারেটেড লিগ্যাল সাইজের ফরম প্রিন্ট করে নির্দিষ্ট স্থানে প্রার্থীর স্বাক্ষর প্রদান করতে হবে।',
      'সকল শিক্ষাগত যোগ্যতার সনদ, মার্কশিট, প্রশংসাপত্র ও নাগরিকত্ব সনদের ফটোকপি প্রথম শ্রেণির গেজেটেড কর্মকর্তা অথবা বিশ্ববিদ্যালয়ের শিক্ষক কর্তৃক নামযুক্ত সিলসহ সত্যায়িত হতে হবে।',
      'বিজ্ঞপ্তি অনুযায়ী মূল ব্যাংক পে-অর্ডার/ব্যাংক ড্রাফটের স্লিপ আবেদনপত্রের সাথে পিন দিয়ে সংযুক্ত করতে হবে।',
      'খামের উপরে পদের নাম, বিজ্ঞপ্তির স্মারক নম্বর ও আবেদনকারীর নাম-ঠিকানা স্পষ্টভাবে লিখে "রেজিস্ট্রার, বাউবি, বোর্ড বাজার, গাজীপুর-১৭০৫" ঠিকানায় রেজিস্টার্ড ডাকযোগে বা কুরিয়ারে নির্ধারিত তারিখের মধ্যে পৌঁছাতে হবে।'
    ],
    actionType: 'circular',
    actionLabel: 'সার্কুলার ও পূর্ণাঙ্গ নোটিশ দেখুন'
  },
  {
    id: 'doc-3',
    category: 'documents',
    categoryNameBn: 'কাগজপত্র ও সনদ',
    badge: 'ছবি ও স্বাক্ষর স্পেসিফিকেশন',
    questionBn: 'ছবি ও স্বাক্ষরের সাইজ বা রেজোলিউশন ত্রুটি দেখা দিলে কীভাবে ঠিক করব?',
    questionEn: 'How to fix photograph and signature resolution or dimension issues?',
    answerBn: 'সিস্টেমে স্বয়ংক্রিয় ইমেজ ডাইমেনশন ও সাইজ ভ্যালিডেটর সক্রিয় রয়েছে। কোনো ত্রুটি এড়াতে নির্দেশিকা মেনে ছবি প্রস্তুত রাখুন:',
    keyPoints: [
      'ছবির স্পেসিফিকেশন: প্রস্থ ৩০০ পিক্সেল × উচ্চতা ৩০০ পিক্সেল, ফাইল সাইজ সর্বোচ্চ ১০০ KB, ফাইল টাইপ .jpg বা .jpeg। ব্যাকগ্রাউন্ড হালকা বা সাদা হওয়া জরুরি।',
      'স্বাক্ষরের স্পেসিফিকেশন: প্রস্থ ৩০০ পিক্সেল × উচ্চতা ৮০ পিক্সেল, ফাইল সাইজ সর্বোচ্চ ৬০ KB, ফাইল টাইপ .jpg বা .jpeg। সাদা কাগজের উপর কালো/নীল কালিতে স্বাক্ষরিত।',
      'আমাদের উইজার্ডে লাইভ ক্রপিং ও রিয়েলটাইম প্রিভিউ অন্তর্ভুক্ত রয়েছে, যার মাধ্যমে ফাইল আপলোড করার সাথে সাথে সঠিক সাইজ ও অনুপাত নিশ্চিত করা যায়।'
    ]
  },
  {
    id: 'doc-4',
    category: 'documents',
    categoryNameBn: 'কাগজপত্র ও সনদ',
    badge: 'সমমান সনদ',
    questionBn: 'বিদেশী ডিগ্রিধারী বা মাদরাসা/কারিগরি শিক্ষার্থীদের জন্য সমমান সনদের নিয়ম কী?',
    questionEn: 'What is the procedure for Equivalence Certificates for foreign degrees?',
    answerBn: 'বিদেশী কোনো বিশ্ববিদ্যালয় হতে অর্জিত ডিগ্রি অথবা বাংলাদেশ মাদরাসা/কারিগরি শিক্ষা বোর্ডের সনদের ক্ষেত্রে বিশ্ববিদ্যালয় মঞ্জুরি কমিশন (UGC) বা সংশ্লিষ্ট সরকারি শিক্ষা বোর্ড কর্তৃক ইস্যুকৃত সমমান সনদ (Equivalence Certificate) আপলোড করা বাধ্যতামূলক। সমমান সনদ ব্যতীত কোনো বিদেশী ডিগ্রির পয়েন্ট গণনা করা হবে না।',
    keyPoints: [
      'ইউজিসি (UGC) কর্তৃক ইস্যুকৃত ইকুইভ্যালেন্স সনদের কপি আপলোড করতে হবে।',
      'মৌখিক পরীক্ষার দিন সমমান সনদের মূল কপি প্রদর্শন করা বাধ্যতামূলক।'
    ]
  },

  // --- Category: Payment ---
  {
    id: 'pay-1',
    category: 'payment',
    categoryNameBn: 'ফি ও পেমেন্ট পদ্ধতি',
    badge: 'পে-অর্ডার / ব্যাংক ড্রাফট',
    questionBn: 'আবেদন ফি কত এবং কোন ব্যাংকের মাধ্যমে পে-অর্ডার করতে হবে?',
    questionEn: 'What is the application fee and how to issue a bank pay order?',
    answerBn: 'বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের পদমর্যাদা অনুযায়ী আবেদন ফি সরকারি বিধিমালা দ্বারা নির্ধারিত:',
    keyPoints: [
      '১ম শ্রেণি / ৯ম গ্রেড ও তদূর্ধ্ব পদের জন্য: ৬০০/- থেকে ১০০০/- টাকা (বিজ্ঞপ্তি অনুসারে)।',
      '১০ম থেকে ১৬তম গ্রেড পদের জন্য: ৩০০/- থেকে ৫০০/- টাকা (বিজ্ঞপ্তি অনুসারে)।',
      '১৭তম থেকে ২০তম গ্রেড পদের জন্য: ২০০/- থেকে ৩০০/- টাকা।',
      'প্রাপকের অনুকূল: আবেদন ফি যেকোনো তফসিলি ব্যাংক (যেমন: সোনালী, জনতা, অগ্রণী, রূপালী ইত্যাদি) থেকে "রেজিস্ট্রার, বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়, গাজীপুর"-এর অনুকূলে পে-অর্ডার (Pay Order) বা ব্যাংক ড্রাফট (Bank Draft) করতে হবে।'
    ],
    actionType: 'forms',
    actionLabel: 'ব্যাংক পে-অর্ডার চালান তথ্য ও ফরম'
  },
  {
    id: 'pay-2',
    category: 'payment',
    categoryNameBn: 'ফি ও পেমেন্ট পদ্ধতি',
    badge: 'MFS নীতিমালা',
    questionBn: 'বিকাশ, নগদ, রকেট বা অনলাইন কার্ডের মাধ্যমে আবেদন ফি জমা দেওয়া যাবে কি?',
    questionEn: 'Can I pay the application fee via bKash, Nagad, Rocket or credit card?',
    answerBn: 'না। সরকারি নিরীক্ষা (Audit) এবং বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের অর্থ ও হিসাব নীতিমালা অনুযায়ী সরাসরি তফসিলি ব্যাংকের পে-অর্ডার বা ব্যাংক ড্রাফট ছাড়া অন্য কোনো মাধ্যম (যেমন: বিকাশ, নগদ, রকেট বা ব্যক্তিগত ব্যাংক ট্রান্সফার) গ্রহণযোগ্য নয়।',
    keyPoints: [
      'শুধুমাত্র অনুমোদিত তফসিলি ব্যাংকের মূল পে-অর্ডার অথবা ব্যাংক ড্রাফটের কপি গ্রহণযোগ্য।',
      'অনলাইনে কোনো ভুয়া ট্রানজেকশন আইডি ইনপুট দিলে আবেদনপত্র তাৎক্ষণিকভাবে বাতিল বলে গণ্য হবে।'
    ]
  },
  {
    id: 'pay-3',
    category: 'payment',
    categoryNameBn: 'ফি ও পেমেন্ট পদ্ধতি',
    badge: 'উইজার্ড ডাটা এন্ট্রি',
    questionBn: 'অনলাইন ফর্মে পে-অর্ডারের তথ্য কীভাবে ইনপুট ও স্ক্যান কপি সংযুক্ত করব?',
    questionEn: 'How to enter pay order details and upload copy in the application wizard?',
    answerBn: 'আবেদন উইজার্ডের ধাপ-৪ (ফি বিবরণ)-এ পে-অর্ডার সংক্রান্ত সকল তথ্য নির্ভুলভাবে ইনপুট দিতে হবে:',
    keyPoints: [
      'পে-অর্ডার / ব্যাংক ড্রাফট নম্বর: ব্যাংক স্লিপে মুদ্রিত ৬ থেকে ৮ সংখ্যার নম্বরটি প্রবেশ করান।',
      'ইস্যুকারী ব্যাংক ও শাখা: ড্রপডাউন থেকে ব্যাংকের নাম নির্বাচন করুন এবং যে শাখা থেকে ড্রাফট কাটা হয়েছে তার নাম লিখুন।',
      'ইস্যুর তারিখ: পে-অর্ডারের উপর উল্লেখিত তারিখ ক্যালেন্ডার থেকে নির্বাচন করুন (যা সার্কুলারের মেয়াদের মধ্যকার হতে হবে)।',
      'স্ক্যান কপি আপলোড: পে-অর্ডারের মূল কপির সামনের অংশের স্পষ্ট স্ক্যান কপি (সর্বোচ্চ ২ MB) আপলোড করুন।'
    ]
  },
  {
    id: 'pay-4',
    category: 'payment',
    categoryNameBn: 'ফি ও পেমেন্ট পদ্ধতি',
    badge: 'অফেরতযোগ্য নীতি',
    questionBn: 'আবেদন বাতিল হলে অথবা একাধিক পদে আবেদন করলে ফি কি ফেরত পাওয়া যাবে?',
    questionEn: 'Is the application fee refundable if rejected or when applying for multiple posts?',
    answerBn: 'না। বাউবি নিয়োগ বিধিমালার ধারা অনুযায়ী জমাকৃত ব্যাংক ড্রাফট বা পে-অর্ডারের অর্থ সম্পূর্ণ অফেরতযোগ্য (Non-refundable)। একজন প্রার্থী একাধিক যোগ্য পদে আবেদন করতে পারবেন, তবে প্রতি পদের জন্য সম্পূর্ণ আলাদা আবেদনপত্র এবং আলাদা পে-অর্ডার সাবমিট করতে হবে।',
    keyPoints: [
      'কোনো অবস্থাতেই জমাকৃত আবেদন ফি ফেরত দেওয়া হবে না।',
      'একই পে-অর্ডার নম্বর দিয়ে একাধিক পদে আবেদন করার চেষ্টা করলে সংশ্লিষ্ট সকল আবেদনপত্র সরাসরি বাতিল হবে।'
    ]
  },

  // --- Category: Technical Support ---
  {
    id: 'tech-1',
    category: 'technical',
    categoryNameBn: 'কারিগরি সহায়তা ও হেল্পলাইন',
    badge: 'হটলাইন ও সাপোর্ট ডেস্ক',
    questionBn: 'আবেদনকালে সার্ভার ত্রুটি বা প্রযুক্তিগত জটিলতা দেখা দিলে কোথায় যোগাযোগ করব?',
    questionEn: 'Where to contact for server errors or technical issues during application?',
    answerBn: 'বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয়ের সেন্ট্রাল আইসিটি সেল হেল্পডেস্কে সরাসরি যোগাযোগ করতে পারবেন:',
    keyPoints: [
      'টেলিফোন হেল্পলাইন: +৮৮০ ২-৯২৯১১০১-৪ (এক্সটেনশন ৩২১ অথবা ১০৭)।',
      'সরাসরি হটলাইন মোবাইল: +৮৮০ ১৭১২-৩৪৫৬৭৮ (অফিস চলাকালীন)।',
      'ইমেইল সাপোর্ট: recruitment.support@bou.ac.bd (স্ক্রিনশট ও আবেদন নম্বরসহ)।',
      'অফিসিয়াল সময়সূচি: রবিবার হতে বৃহস্পতিবার, সকাল ৯:০০ টা থেকে বিকাল ৪:০০ টা (সরকারি ছুটির দিন ব্যতীত)।',
      'অনলাইন টিকিট: নিচে "সাপোর্ট টিকিট ওপেন করুন" বাটনে ক্লিক করে পোর্টালের মাধ্যমেই আপনার অভিযোগ জানাতে পারেন।'
    ],
    actionType: 'support',
    actionLabel: 'সরাসরি সাপোর্ট টিকিট ওপেন করুন'
  },
  {
    id: 'tech-2',
    category: 'technical',
    categoryNameBn: 'কারিগরি সহায়তা ও হেল্পলাইন',
    badge: 'পাসওয়ার্ড রিকভারি',
    questionBn: 'পাসওয়ার্ড ভুলে গেলে বা অ্যাকাউন্টে লগইন করতে না পারলে কী করণীয়?',
    questionEn: 'What should I do if I forget my password or cannot log in?',
    answerBn: 'আমাদের পোর্টালে স্বয়ংক্রিয় ও তাৎক্ষণিক পাসওয়ার্ড রিসেট সুবিধা রয়েছে:',
    keyPoints: [
      'লগইন পেজে গিয়ে "পাসওয়ার্ড ভুলে গেছেন?" (Forgot Password) লিংকে ক্লিক করুন।',
      'আপনার নিবন্ধিত ইমেইল ঠিকানা প্রদান করে "রিসেট কোড পাঠান" চাপুন।',
      'আপনার ইনবক্সে তাৎক্ষণিকভাবে ৬ সংখ্যার একটি ওটিপি সিকিউরিটি কোড (OTP) পাঠানো হবে।',
      'কোডটি ইনপুট করে সহজেই নতুন পাসওয়ার্ড নির্ধারণ করে পুনরায় লগইন করতে পারবেন।',
      'ইমেইল কাজ না করলে হেল্পডেস্কে আপনার NID ও মোবাইল নম্বর দিয়ে তথ্য যাচাই করে পাসওয়ার্ড পুনরুদ্ধার করা যাবে।'
    ],
    actionType: 'auth',
    actionLabel: 'পাসওয়ার্ড রিসেট বা লগইন করুন'
  },
  {
    id: 'tech-3',
    category: 'technical',
    categoryNameBn: 'কারিগরি সহায়তা ও হেল্পলাইন',
    badge: 'আবেদন ট্র্যাকিং',
    questionBn: 'আবেদনের বর্তমান স্থিতি (Status) ও ফি ভেরিফিকেশন কীভাবে চেক করব?',
    questionEn: 'How can I check the current status and payment verification of my application?',
    answerBn: 'আবেদনের সর্বশেষ অগ্রগতি জানতে দুটি সহজ উপায় রয়েছে:',
    keyPoints: [
      'ড্যাশবোর্ডের মাধ্যমে: আপনার মোবাইল নম্বর/ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করে "আমার আবেদনসমূহ" পেজে গেলে প্রতিটি আবেদনের স্ট্যাটাস (যেমন: খসড়া, ফি যাচাইকরণাধীন, স্ক্রুটিনি সম্পন্ন, প্রবেশপত্র প্রস্তুত) দেখতে পাবেন।',
      'তাত্ক্ষণিক ট্র্যাকিং: হোমপেজের "আবেদন ট্র্যাক করুন" উইন্ডোতে শুধুমাত্র আপনার অ্যাপ্লিকেশন আইডি (যেমন: BOU-2025-08914) ইনপুট দিয়ে মুহূর্তেই লাইভ স্ট্যাটাস দেখতে পারবেন।'
    ],
    actionType: 'track',
    actionLabel: 'অ্যাপ্লিকেশন আইডি দিয়ে স্থিতি চেক করুন'
  },
  {
    id: 'tech-4',
    category: 'technical',
    categoryNameBn: 'কারিগরি সহায়তা ও হেল্পলাইন',
    badge: 'পিডিএফ ও ব্রাউজার সেটিংস',
    questionBn: 'লিগ্যাল সাইজ প্রিন্ট কপি ডাউনলোড বা প্রিন্ট করতে সমস্যা হলে কী করব?',
    questionEn: 'What should I do if having trouble downloading or printing legal size form?',
    answerBn: 'লিগ্যাল সাইজ প্রিন্ট কপির জন্য ব্রাউজার প্রিন্ট ডায়ালগে কিছু নির্দিষ্ট সেটিংস প্রযোজ্য:',
    keyPoints: [
      'Paper Size: ব্রাউজারের প্রিন্ট ডায়ালগ থেকে পেপারের আকার অবশ্যই "Legal" (৮.৫" × ১৪") নির্বাচন করুন।',
      'Margins: মার্জিন "Minimum" বা "None" রাখুন যাতে তথ্যগুলো সুন্দরভাবে বসে।',
      'Options: "Background graphics" অপশনটি টিক দিয়ে রাখুন যাতে সরকারি জলছাপ ও লোগো সঠিকভাবে প্রিন্ট হয়।',
      'যেকোনো আধুনিক ব্রাউজার (Google Chrome, Firefox, Microsoft Edge) থেকে সহজে Ctrl + P চেপে প্রিন্ট বা PDF হিসেবে সেভ করতে পারবেন।'
    ]
  },

  // --- Category: General Eligibility ---
  {
    id: 'gen-1',
    category: 'eligibility',
    categoryNameBn: 'সাধারণ ও যোগ্যতা',
    badge: 'বয়স নির্ধারণ',
    questionBn: 'বয়স নির্ধারণের কাট-অফ ডেট এবং বয়স শিথিলকরণ নীতি কীভাবে হিসাব হবে?',
    questionEn: 'How is the age cutoff date calculated and what are the relaxation policies?',
    answerBn: 'নিয়োগ বিজ্ঞপ্তিতে উল্লেখিত নির্দিষ্ট কাট-অফ তারিখে (যেমন: ০১ মার্চ ২০২৫) প্রার্থীর বয়স গণনা করা হয়:',
    keyPoints: [
      'সাধারণ প্রার্থীদের ক্ষেত্রে বয়সসীমা সর্বনিম্ন ১৮ এবং সর্বোচ্চ ৩০ বছর।',
      'বীর মুক্তিযোদ্ধা/শহীদ মুক্তিযোদ্ধার সন্তান এবং শারীরিক প্রতিবন্ধীদের ক্ষেত্রে সর্বোচ্চ বয়সসীমা ৩২ বছর পর্যন্ত গ্রহণযোগ্য।',
      'আমাদের অনলাইন আবেদন উইজার্ডে আপনার জন্মতারিখ ইনপুট করলেই স্বয়ংক্রিয়ভাবে বছর, মাস ও দিন নির্ভুলভাবে হিসাব হয়ে যাবে।'
    ]
  },
  {
    id: 'gen-2',
    category: 'eligibility',
    categoryNameBn: 'সাধারণ ও যোগ্যতা',
    badge: 'বিভাগীয় প্রার্থী',
    questionBn: 'চাকরিরত বা বিভাগীয় প্রার্থীর আবেদন প্রক্রিয়া কেমন হবে?',
    questionEn: 'What is the procedure for in-service / departmental candidates?',
    answerBn: 'সরকারি, আধা-সরকারি বা স্বায়ত্তশাসিত প্রতিষ্ঠানে চাকরিরত প্রার্থীদের অবশ্যই যথাযথ কর্তৃপক্ষের অনুমতিক্রমে (Through Proper Channel) আবেদন করতে হবে।',
    keyPoints: [
      'আবেদন করার সময় নিয়োগকারী কর্তৃপক্ষের নিকট হতে সংগৃহীত ছাড়পত্র/এনওসি স্ক্যান করে আপলোড করতে হবে।',
      'মৌখিক পরীক্ষার দিন নিয়োগকারী কর্তৃপক্ষের মূল অনাপত্তিপত্র দাখিল করা বাধ্যতামূলক।'
    ],
    actionType: 'forms',
    actionLabel: 'বিভাগীয় ছাড়পত্র (NOC) ফরম ডাউনলোড'
  }
];

export const FaqSection: React.FC<FaqSectionProps> = ({
  onNavigate,
  onOpenSupportModal,
  onOpenTrackModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaqIds, setExpandedFaqIds] = useState<Record<string, boolean>>({
    'doc-1': true // default open first item to invite interaction
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    faqData.forEach(item => {
      allExpanded[item.id] = true;
    });
    setExpandedFaqIds(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedFaqIds({});
  };

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesQuery = 
        item.questionBn.toLowerCase().includes(query) ||
        (item.questionEn && item.questionEn.toLowerCase().includes(query)) ||
        item.answerBn.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query)) ||
        (item.keyPoints && item.keyPoints.some(kp => kp.toLowerCase().includes(query)));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: faqData.length,
      documents: 0,
      payment: 0,
      technical: 0,
      eligibility: 0
    };
    faqData.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleActionClick = (actionType?: string) => {
    if (!actionType) return;
    if (actionType === 'forms') {
      onNavigate('download_forms');
    } else if (actionType === 'auth') {
      onNavigate('auth');
    } else if (actionType === 'support' && onOpenSupportModal) {
      onOpenSupportModal();
    } else if (actionType === 'track' && onOpenTrackModal) {
      onOpenTrackModal();
    } else if (actionType === 'circular') {
      onNavigate('circular');
    }
  };

  return (
    <section id="faq-section" className="w-full max-w-7xl mx-auto px-margin py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold border border-primary/20">
          <span className="material-symbols-outlined text-[16px]">live_help</span>
          <span>সাধারণ জিজ্ঞাসা ও উত্তর • বাউবি সহায়তা কেন্দ্র</span>
        </div>
        <h2 className="font-display-sm text-display-sm text-foreground font-bold tracking-tight sm:text-[32px]">
          সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
        </h2>
        <p className="font-body-md text-body-md text-muted-foreground leading-relaxed">
          আবেদনপত্রের প্রয়োজনীয় কাগজপত্র, পে-অর্ডার পেমেন্ট পদ্ধতি, কারিগরি সহায়তা এবং বাউবি নিয়োগ নির্দেশিকা সংক্রান্ত জরুরি প্রশ্নোত্তর।
        </p>
      </div>

      {/* Interactive Controller: Category Pills & Search Bar */}
      <div className="bg-surface-subtle p-4 sm:p-5 rounded-2xl border border-border mb-8 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-label-sm font-label-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-surface-container-highest border border-border'
              }`}
            >
              <span>সকল জিজ্ঞাসা</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {categoryCounts.all}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('documents')}
              className={`px-3.5 py-1.5 rounded-lg text-label-sm font-label-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'documents'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-surface-container-highest border border-border'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
              <span>কাগজপত্র ও সনদ</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                selectedCategory === 'documents' ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {categoryCounts.documents}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('payment')}
              className={`px-3.5 py-1.5 rounded-lg text-label-sm font-label-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'payment'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-surface-container-highest border border-border'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              <span>ফি ও পেমেন্ট পদ্ধতি</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                selectedCategory === 'payment' ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {categoryCounts.payment}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('technical')}
              className={`px-3.5 py-1.5 rounded-lg text-label-sm font-label-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'technical'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-surface-container-highest border border-border'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              <span>কারিগরি সহায়তা ও হেল্পলাইন</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                selectedCategory === 'technical' ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {categoryCounts.technical}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('eligibility')}
              className={`px-3.5 py-1.5 rounded-lg text-label-sm font-label-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === 'eligibility'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-surface-container-highest border border-border'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>সাধারণ ও বয়স</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                selectedCategory === 'eligibility' ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {categoryCounts.eligibility}
              </span>
            </button>
          </div>

          {/* Expand / Collapse All Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              type="button"
              onClick={handleExpandAll}
              className="text-xs text-primary font-medium hover:underline flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:bg-primary/5"
            >
              <span className="material-symbols-outlined text-[14px]">unfold_more</span>
              সব খুলুন
            </button>
            <span className="text-muted-foreground/40">|</span>
            <button
              type="button"
              onClick={handleCollapseAll}
              className="text-xs text-muted-foreground font-medium hover:underline flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:bg-muted"
            >
              <span className="material-symbols-outlined text-[14px]">unfold_less</span>
              সব বন্ধ করুন
            </button>
          </div>
        </div>

        {/* Real-time Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="প্রশ্ন খুঁজুন (যেমন: পে-অর্ডার, ছবি সাইজ, পাসওয়ার্ড রিসেট, সমমান সনদ, হেল্পলাইন নম্বর)..."
            className="w-full h-11 pl-10 pr-10 rounded-xl bg-card border border-border text-foreground text-body-sm font-body-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-colors shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Main FAQ Accordion + Quick Help Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
        {/* Accordion List (8 cols) */}
        <div className="lg:col-span-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 px-4 bg-card rounded-2xl border border-dashed border-border">
              <span className="material-symbols-outlined text-muted-foreground text-[44px] mb-2">search_off</span>
              <h4 className="font-headline-sm text-foreground">কোনো ফলাফল পাওয়া যায়নি</h4>
              <p className="text-muted-foreground text-sm mt-1 max-w-sm mx-auto">
                "{searchQuery}" সম্পর্কিত কোনো প্রশ্ন পাওয়া যায়নি। ক্যাটাগরি পরিবর্তন করে দেখুন অথবা আমাদের হেল্পডেস্কে সরাসরি যোগাযোগ করুন।
              </p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-medium cursor-pointer"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = !!expandedFaqIds[faq.id];
              return (
                <div
                  key={faq.id}
                  className={`bg-card rounded-xl transition-all duration-200 border ${
                    isOpen 
                      ? 'border-primary/40 shadow-sm ring-1 ring-primary/10' 
                      : 'border-border shadow-2xs hover:border-border/80 hover:bg-surface-subtle/50'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                    aria-expanded={isOpen}
                  >
                    <div className="space-y-1.5 min-w-0 pr-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-surface-subtle text-muted-foreground border border-border">
                          {faq.categoryNameBn}
                        </span>
                        {faq.badge && (
                          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                            faq.category === 'payment'
                              ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                              : faq.category === 'documents'
                              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                              : faq.category === 'technical'
                              ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20'
                              : 'bg-primary/10 text-primary border border-primary/20'
                          }`}>
                            {faq.badge}
                          </span>
                        )}
                      </div>
                      <h3 className={`font-headline-sm text-headline-sm transition-colors ${
                        isOpen ? 'text-primary font-semibold' : 'text-foreground font-medium'
                      }`}>
                        {faq.questionBn}
                      </h3>
                      {faq.questionEn && (
                        <p className="text-xs text-muted-foreground/80 italic font-sans hidden sm:block">
                          {faq.questionEn}
                        </p>
                      )}
                    </div>

                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 ${
                      isOpen ? 'bg-primary text-on-primary rotate-180' : 'bg-surface-subtle text-muted-foreground'
                    }`}>
                      <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                    </div>
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-border/50 text-body-sm font-body-sm text-foreground/90 space-y-3 animate-in fade-in duration-200">
                      <p className="leading-relaxed font-normal text-muted-foreground">
                        {faq.answerBn}
                      </p>

                      {faq.keyPoints && faq.keyPoints.length > 0 && (
                        <div className="p-3.5 rounded-lg bg-surface-subtle/70 border border-border/80 space-y-2">
                          <h5 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[15px]">check_circle</span>
                            <span>গুরুত্বপূর্ণ বিষয় ও নির্দেশাবলী:</span>
                          </h5>
                          <ul className="space-y-1.5 pl-5 list-disc text-xs text-foreground/80 leading-relaxed">
                            {faq.keyPoints.map((point, idx) => (
                              <li key={idx} className="marker:text-primary">
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Interactive contextual action button */}
                      {faq.actionType && (
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => handleActionClick(faq.actionType)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-container hover:underline cursor-pointer bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors border border-primary/20"
                          >
                            <span>{faq.actionLabel || 'বিস্তারিত জানুন'}</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </button>

                          <span className="text-[11px] text-muted-foreground italic">
                            প্রশ্ন কোড: #{faq.id.toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick Contact & Reference Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Official Helpdesk Direct Card */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">contact_phone</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-foreground">সরাসরি সহায়তা হেল্পলাইন</h4>
                <p className="text-xs text-muted-foreground">বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় আইসিটি সেল</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-foreground">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-subtle">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">call</span>
                <div>
                  <strong className="block text-foreground font-semibold">টেলিফোন সাপোর্ট:</strong>
                  <span className="text-muted-foreground">+৮৮০ ২-৯২৯১১০১-৪ (এক্সট- ৩২১)</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-subtle">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">smartphone</span>
                <div>
                  <strong className="block text-foreground font-semibold">মোবাইল হেল্পডেস্ক:</strong>
                  <span className="text-muted-foreground">+৮৮০ ১৭১২-৩৪৫৬৭৮</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-subtle">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">mail</span>
                <div>
                  <strong className="block text-foreground font-semibold">ইমেইল ঠিকানা:</strong>
                  <span className="text-muted-foreground">recruitment.support@bou.ac.bd</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-subtle">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">schedule</span>
                <div>
                  <strong className="block text-foreground font-semibold">অফিস সময়:</strong>
                  <span className="text-muted-foreground">রবিবার – বৃহস্পতিবার (সকাল ৯:০০ – বিকাল ৪:০০)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={() => onOpenSupportModal ? onOpenSupportModal() : null}
                className="w-full h-10 rounded-xl bg-primary text-on-primary font-medium text-xs flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-2xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">headset_mic</span>
                <span>সাপোর্ট টিকিট সাবমিট করুন</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenTrackModal ? onOpenTrackModal() : null}
                className="w-full h-10 rounded-xl bg-surface-subtle text-foreground font-medium text-xs flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors border border-border cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">track_changes</span>
                <span>আবেদনের অবস্থা ট্র্যাক করুন</span>
              </button>
            </div>
          </div>

          {/* Quick Institutional Rules Checklist */}
          <div className="bg-surface-subtle rounded-2xl p-6 border border-border shadow-xs space-y-3">
            <h4 className="font-headline-sm text-foreground flex items-center gap-2">
              <span className="material-symbols-outlined text-warning text-[18px]">verified</span>
              <span>আবেদনের ৩টি সোনালী নিয়ম</span>
            </h4>
            <div className="space-y-2.5 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">১</span>
                <p><strong className="text-foreground">পে-অর্ডার আগে প্রস্তুত করুন:</strong> অনলাইনে ফর্ম পূরণের আগেই ব্যাংকের মূল পে-অর্ডার বা ব্যাংক ড্রাফট কেটে প্রস্তুত রাখুন।</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">২</span>
                <p><strong className="text-foreground">লিগ্যাল সাইজ প্রিন্ট কপি:</strong> সাবমিটের পর প্রাপ্ত পিডিএফ ফরম লিগ্যাল সাইজ কাগজে প্রিন্ট করে সংরক্ষণ করুন।</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">৩</span>
                <p><strong className="text-foreground">ডাকযোগে মূল কপি:</strong> নির্দিষ্ট মেয়াদের মধ্যে মূল পে-অর্ডারসহ স্বাক্ষরিত সেট ডাকযোগে রেজিস্ট্রি করে পাঠান।</p>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => onNavigate('guide')}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>সম্পূর্ণ নির্দেশিকা ও চেকলিস্ট পড়ুন</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
