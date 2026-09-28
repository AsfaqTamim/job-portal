export type ScreenId = 
  | 'home' 
  | 'circular' 
  | 'guide'
  | 'wizard'
  | 'preview_legal'
  | 'dashboard'
  | 'auth'
  | 'download_forms'
  | 'admin_circulars'
  | 'admin_applications'
  | 'admin_review'
  | 'admin_users';

export type UserRole = 'applicant' | 'staff' | 'admin';

export type ApplicationStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'verified' 
  | 'unverified' 
  | 'rejected';

export interface CircularPost {
  id: string;
  title: string;
  department: string;
  jobType: string;
  grade: string;
  salary: string;
  vacancies: string;
  requirements: string;
  ageLimit: string;
  category?: string;
}

export interface CircularNotice {
  id: string;
  circularNo: string;
  title: string;
  status: 'published' | 'draft' | 'closed';
  deadline: string;
  originalDeadline?: string;
  publishDate?: string;
  category?: string;
  categoryBn?: string;
  fee: string;
  minimumAge?: number;
  maximumAge?: number;
  ageCutoffDate?: string;
  posts: CircularPost[];
}

export interface VerificationChecklist {
  nid: boolean;
  education: boolean;
  experience: boolean;
  certificates: boolean;
  payment: boolean;
  freedomFighter: boolean;
}

export interface StatusHistoryEntry {
  fromStatus: string;
  toStatus: string;
  decidedBy: string;
  decidedAt: string;
  reason?: string;
  note?: string;
}

export interface ApplicationRecord {
  id: string;
  applicationNo: string;
  circularNo: string;
  postTitle: string;
  postDepartment: string;
  grade: string;
  status: ApplicationStatus;
  submittedAt?: string;
  applicantNameBn: string;
  applicantNameEn: string;
  fatherNameBn: string;
  motherNameBn: string;
  dateOfBirth: string;
  ageAtCutoff: number;
  gender: string;
  nid: string;
  phone: string;
  email: string;
  freedomFighterClaimed: boolean;
  presentAddress: string;
  permanentAddress: string;
  education: {
    exam: string;
    board: string;
    roll: string;
    passingYear: string;
    result: string;
  }[];
  experience?: {
    designation: string;
    organization: string;
    period: string;
  }[];
  references: {
    name: string;
    designation: string;
    phone: string;
  }[];
  photoUrl: string;
  signatureUrl: string;
  combinedPdfName: string;
  verificationChecklist: VerificationChecklist;
  statusHistory: StatusHistoryEntry[];
}
