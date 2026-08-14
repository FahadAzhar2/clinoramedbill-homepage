export type SpecialtyCategory = "Primary care" | "Medical specialties" | "Surgery" | "Women & children" | "Behavioral & therapy" | "Diagnostics & dental";

export type Specialty = {
  name: string;
  category: SpecialtyCategory;
  description: string;
};

export const specialtyCategories: SpecialtyCategory[] = [
  "Primary care", "Medical specialties", "Surgery", "Women & children", "Behavioral & therapy", "Diagnostics & dental",
];

export const medicalSpecialties: Specialty[] = [
  { name: "Family Medicine", category: "Primary care", description: "Streamline billing for primary care services with accurate coding, claim submission, denial management, and A/R follow-up." },
  { name: "Internal Medicine", category: "Primary care", description: "Support complex internal medicine billing with accurate claims processing, coding, payment posting, and proactive denial management." },
  { name: "Pediatrics", category: "Women & children", description: "Manage pediatric billing efficiently, from eligibility verification and claim submission to denials, payments, and A/R follow-up." },
  { name: "Geriatrics", category: "Primary care", description: "Support geriatric practices with accurate billing for complex, ongoing care while helping reduce denials and improve collections." },
  { name: "Urgent Care", category: "Primary care", description: "Keep urgent care revenue moving with efficient charge capture, coding, claims management, payment posting, and denial follow-up." },
  { name: "Emergency Medicine", category: "Primary care", description: "Handle the complexities of emergency medicine billing with accurate coding, timely claims, denial management, and A/R recovery." },
  { name: "Cardiology", category: "Medical specialties", description: "Support cardiology billing for consultations, diagnostics, procedures, and cardiac services with accurate coding and focused revenue cycle management." },
  { name: "Gastroenterology", category: "Medical specialties", description: "Manage gastroenterology billing with specialized support for office visits, diagnostic procedures, endoscopy, coding, claims, and denials." },
  { name: "Hepatology", category: "Medical specialties", description: "Help hepatology practices manage complex billing requirements with accurate coding, claims processing, denial management, and A/R follow-up." },
  { name: "Endocrinology", category: "Medical specialties", description: "Improve endocrinology revenue cycles through accurate coding, clean claims, eligibility verification, payment posting, and denial resolution." },
  { name: "Nephrology", category: "Medical specialties", description: "Support nephrology practices with specialized billing for complex services, accurate claims processing, denial management, and A/R follow-up." },
  { name: "Pulmonology", category: "Medical specialties", description: "Optimize pulmonology billing with accurate coding and claims management for consultations, diagnostics, procedures, and ongoing patient care." },
  { name: "Rheumatology", category: "Medical specialties", description: "Manage rheumatology billing with attention to complex diagnoses, treatment plans, coding requirements, claims, and reimbursement follow-up." },
  { name: "Infectious Disease", category: "Medical specialties", description: "Support infectious disease practices with accurate coding, timely claims submission, denial management, and efficient reimbursement follow-up." },
  { name: "Hematology", category: "Medical specialties", description: "Handle hematology billing with specialized attention to complex services, coding accuracy, claims processing, denials, and A/R management." },
  { name: "Oncology", category: "Medical specialties", description: "Support oncology practices with detailed billing management for complex treatments, procedures, coding, claims, and reimbursement." },
  { name: "Allergy & Immunology", category: "Medical specialties", description: "Streamline allergy and immunology billing with accurate coding, claims management, eligibility verification, denials, and payment posting." },
  { name: "Neurology", category: "Medical specialties", description: "Manage neurology billing with accurate coding and revenue cycle support for consultations, diagnostics, procedures, and ongoing care." },
  { name: "Sleep Medicine", category: "Medical specialties", description: "Support sleep medicine practices with billing for evaluations, sleep studies, testing, and related services while reducing claim issues and denials." },
  { name: "Pain Management", category: "Medical specialties", description: "Optimize pain management billing with accurate coding, claims processing, authorization support, denial management, and A/R follow-up." },
  { name: "General Surgery", category: "Surgery", description: "Support surgical practices with accurate billing for consultations, procedures, and postoperative care while managing claims and reimbursements." },
  { name: "Orthopedic Surgery", category: "Surgery", description: "Handle orthopedic billing for consultations, imaging, procedures, and surgical services with accurate coding and proactive A/R management." },
  { name: "Neurosurgery", category: "Surgery", description: "Provide specialized billing support for complex neurosurgical services with accurate coding, claims submission, denial management, and reimbursement follow-up." },
  { name: "Urology", category: "Surgery", description: "Manage urology billing efficiently across office visits, diagnostics, procedures, and surgical services with focused claims and denial management." },
  { name: "Vascular Surgery", category: "Surgery", description: "Support vascular surgery practices with accurate coding, clean claims, payment posting, denial resolution, and A/R follow-up." },
  { name: "Thoracic Surgery", category: "Surgery", description: "Streamline billing for thoracic surgical services with accurate coding, claims management, payment posting, and proactive A/R follow-up." },
  { name: "Plastic Surgery", category: "Surgery", description: "Support plastic surgery practices with accurate billing for consultations, procedures, and surgical services while helping minimize claim denials." },
  { name: "Oral & Maxillofacial Surgery", category: "Surgery", description: "Manage oral and maxillofacial surgery billing with accurate coding, claims processing, eligibility verification, and reimbursement follow-up." },
  { name: "Otolaryngology (ENT)", category: "Surgery", description: "Optimize ENT billing for consultations, diagnostics, procedures, and surgeries with accurate coding, clean claims, and denial management." },
  { name: "Ophthalmology", category: "Surgery", description: "Support ophthalmology practices with accurate billing for exams, diagnostics, procedures, and surgical services while improving claims and collections." },
  { name: "Podiatry", category: "Surgery", description: "Manage podiatry billing with specialized support for evaluations, procedures, treatments, coding, claims, denials, and A/R follow-up." },
  { name: "Obstetrics & Gynecology (OB/GYN)", category: "Women & children", description: "Handle OB/GYN billing with accurate coding and claims management across preventive care, gynecology, obstetrics, and related procedures." },
  { name: "Neonatology", category: "Women & children", description: "Support neonatology billing with accurate documentation-based coding, claims processing, denial management, and reimbursement follow-up for complex care." },
  { name: "Psychiatry", category: "Behavioral & therapy", description: "Streamline psychiatric billing with accurate coding, eligibility verification, claims management, denial resolution, and consistent A/R follow-up." },
  { name: "Psychology", category: "Behavioral & therapy", description: "Support psychology practices with efficient billing for evaluations, therapy services, and behavioral health care while reducing claim delays and denials." },
  { name: "Behavioral Health", category: "Behavioral & therapy", description: "Manage behavioral health billing with accurate coding, eligibility verification, claims processing, denial management, and timely reimbursement follow-up." },
  { name: "Physical Medicine & Rehabilitation", category: "Behavioral & therapy", description: "Support rehabilitation practices with accurate billing for evaluations, therapies, procedures, and ongoing care while managing claims and denials." },
  { name: "Physical Therapy", category: "Behavioral & therapy", description: "Optimize physical therapy billing with accurate coding, authorization support, claim submission, denial management, and A/R follow-up." },
  { name: "Occupational Therapy", category: "Behavioral & therapy", description: "Manage occupational therapy billing efficiently with accurate coding, eligibility verification, claims processing, and reimbursement follow-up." },
  { name: "Speech Therapy", category: "Behavioral & therapy", description: "Support speech therapy practices with accurate billing for evaluations and treatment services, including claims management and denial resolution." },
  { name: "Radiology", category: "Diagnostics & dental", description: "Handle radiology billing with accurate coding and claims management for diagnostic imaging and related services while improving reimbursement." },
  { name: "Pathology & Laboratory Services", category: "Diagnostics & dental", description: "Support pathology and laboratory billing with accurate coding, claim submission, payment posting, denial management, and A/R follow-up." },
  { name: "Dental", category: "Diagnostics & dental", description: "Provide dental practices with streamlined billing support for claims, coding, eligibility verification, payment posting, denials, and A/R management." },
];

