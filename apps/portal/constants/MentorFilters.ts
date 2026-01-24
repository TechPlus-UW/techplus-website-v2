/**
 * This file contains the current list of mentor attributes and
 * helper functions to perform mappings of the user-facing `label`
 * to the `value` which correspond to the enums defined in the
 * backend.
 */

export interface FilterOption {
  label: string;
  value: string;
}

export function getCategoryLabel(
  value: string,
  category: string
): string | false {
  switch (category) {
    case 'Expertise':
      return getExpertiseLabel(value);
    case 'Program':
      return getProgramLabel(value);
    case 'Term':
      return getTermLabel(value);
    default:
      return false;
  }
}

export const expertiseList: FilterOption[] = [
  { label: 'Consulting', value: 'CONSULTING' },
  { label: 'Data Science', value: 'DATA_SCIENCE' },
  { label: 'DevOps and Infrastructure', value: 'DEVOPS' },
  { label: 'Embedded Systems', value: 'EMBEDDED' },
  { label: 'Game Development', value: 'GAME_DEV' },
  {
    label: 'General Software Engineering',
    value: 'GENERAL_SOFTWARE',
  },
  {
    label: 'Machine Learning and AI',
    value: 'MACHINE_LEARNING_AI',
  },
  { label: 'Mobile Development', value: 'MOBILE_DEV' },
  { label: 'Program & Product Management', value: 'PRODUCT' },
  { label: 'Research', value: 'RESEARCH' },
  { label: 'Robotics', value: 'ROBOTICS' },
  { label: 'Frontend', value: 'FRONTEND' },
  { label: 'Backend', value: 'BACKEND' },
  { label: 'UI/UX', value: 'UI_UX' },
];

export function getExpertiseLabel(expertiseValue: string): string | false {
  return getExpertise(expertiseValue)?.label || false;
}

export function getExpertise(
  expertiseValue: string
): FilterOption | undefined {
  return (
    expertiseList.find((expertise) => expertise.value === expertiseValue) ||
    undefined
  );
}

export const termsList: FilterOption[] = [
  { label: '2B', value: 'TERM_2B' },
  { label: '3A', value: 'TERM_3A' },
  { label: '3B', value: 'TERM_3B' },
  { label: '4A', value: 'TERM_4A' },
  { label: '4B', value: 'TERM_4B' },
  { label: '5A+', value: 'TERM_5A_PLUS' },
  { label: 'Masters', value: 'MASTERS' },
  { label: 'PhD', value: 'PHD' },
  { label: 'Alum', value: 'ALUM' },
];

export function getTermLabel(termValue: string): string | false {
  return getTerm(termValue)?.label || false;
}

export function getTerm(termValue: string): FilterOption | undefined {
  return termsList.find((term) => term.value === termValue) || undefined;
}

export const programsList: FilterOption[] = [
  {
    label: 'Accounting and Financial Management',
    value: 'ACCOUNTING_AND_FINANCIAL_MANAGEMENT',
  },
  { label: 'Actuarial Science', value: 'ACTUARIAL_SCIENCE' },
  { label: 'Anthropology', value: 'ANTHROPOLOGY' },
  { label: 'Applied Mathematics', value: 'APPLIED_MATHEMATICS' },
  {
    label: 'Architectural Engineering',
    value: 'ARCHITECTURAL_ENGINEERING',
  },
  { label: 'Architecture', value: 'ARCHITECTURE' },
  { label: 'Bachelor of Arts', value: 'BACHELOR_OF_ARTS' },
  { label: 'Bachelor of Science', value: 'BACHELOR_OF_SCIENCE' },
  { label: 'Biochemistry', value: 'BIOCHEMISTRY' },
  { label: 'Biology', value: 'BIOLOGY' },
  { label: 'Biomedical Engineering', value: 'BIOMEDICAL_ENGINEERING' },
  { label: 'Biomedical Sciences', value: 'BIOMEDICAL_SCIENCES' },
  { label: 'Biostatistics', value: 'BIOSTATISTICS' },
  {
    label: 'Biotechnology/Chartered Professional Accountancy',
    value: 'BIOTECHNOLOGY_CHARTERED_PROFESSIONAL_ACCOUNTANCY',
  },
  {
    label: 'Business Administration and Computer Science Double Degree',
    value: 'BUSINESS_ADMINISTRATION_AND_COMPUTER_SCIENCE_DOUBLE_DEGREE',
  },
  {
    label: 'Business Administration and Mathematics Double Degree',
    value: 'BUSINESS_ADMINISTRATION_AND_MATHEMATICS_DOUBLE_DEGREE',
  },
  { label: 'Business programs', value: 'BUSINESS' },
  { label: 'Chemical Engineering', value: 'CHEMICAL_ENGINEERING' },
  { label: 'Chemistry', value: 'CHEMISTRY' },
  { label: 'Civil Engineering', value: 'CIVIL_ENGINEERING' },
  { label: 'Classical Studies', value: 'CLASSICAL_STUDIES' },
  {
    label: 'Climate and Environmental Change',
    value: 'CLIMATE_AND_ENVIRONMENTAL_CHANGE',
  },
  {
    label: 'Combinatorics and Optimization',
    value: 'COMBINATORICS_AND_OPTIMIZATION',
  },
  { label: 'Communication Studies', value: 'COMMUNICATION_STUDIES' },
  {
    label: 'Computational Mathematics',
    value: 'COMPUTATIONAL_MATHEMATICS',
  },
  { label: 'Computer Engineering', value: 'COMPUTER_ENGINEERING' },
  { label: 'Computer Science', value: 'COMPUTER_SCIENCE' },
  {
    label: 'Computing and Financial Management',
    value: 'COMPUTING_AND_FINANCIAL_MANAGEMENT',
  },
  { label: 'Data Science', value: 'DATA_SCIENCE' },
  { label: 'Earth Sciences', value: 'EARTH_SCIENCES' },
  { label: 'Economics', value: 'ECONOMICS' },
  { label: 'Education', value: 'EDUCATION' },
  { label: 'Electrical Engineering', value: 'ELECTRICAL_ENGINEERING' },
  { label: 'English', value: 'ENGLISH' },
  { label: 'Environment and Business', value: 'ENVIRONMENT_AND_BUSINESS' },
  {
    label: 'Environment, Resources and Sustainability',
    value: 'ENVIRONMENT_RESOURCES_AND_SUSTAINABILITY',
  },
  {
    label: 'Environmental Engineering',
    value: 'ENVIRONMENTAL_ENGINEERING',
  },
  { label: 'Environmental Science', value: 'ENVIRONMENTAL_SCIENCE' },
  { label: 'Fine Arts', value: 'FINE_ARTS' },
  { label: 'French', value: 'FRENCH' },
  {
    label: 'Gender and Social Justice',
    value: 'GENDER_AND_SOCIAL_JUSTICE',
  },
  { label: 'Geography and Aviation', value: 'GEOGRAPHY_AND_AVIATION' },
  {
    label: 'Geography and Environmental Management',
    value: 'GEOGRAPHY_AND_ENVIRONMENTAL_MANAGEMENT',
  },
  {
    label: 'Geological Engineering',
    value: 'GEOLOGICAL_ENGINEERING',
  },
  { label: 'Geomatics', value: 'GEOMATICS' },
  { label: 'German', value: 'GERMAN' },
  {
    label: 'Global Business and Digital Arts',
    value: 'GLOBAL_BUSINESS_AND_DIGITAL_ARTS',
  },
  { label: 'Health Sciences', value: 'HEALTH_SCIENCES' },
  { label: 'History', value: 'HISTORY' },
  { label: 'Honours Arts', value: 'HONOURS_ARTS' },
  {
    label: 'Honours Arts and Business',
    value: 'HONOURS_ARTS_AND_BUSINESS',
  },
  { label: 'Honours Science', value: 'HONOURS_SCIENCE' },
  {
    label: 'Information Technology Management',
    value: 'INFORMATION_TECHNOLOGY_MANAGEMENT',
  },
  {
    label: 'International Development',
    value: 'INTERNATIONAL_DEVELOPMENT',
  },
  { label: 'Kinesiology', value: 'KINESIOLOGY' },
  { label: 'Knowledge Integration', value: 'KNOWLEDGE_INTEGRATION' },
  { label: 'Legal Studies', value: 'LEGAL_STUDIES' },
  { label: 'Liberal Studies', value: 'LIBERAL_STUDIES' },
  { label: 'Life Physics', value: 'LIFE_PHYSICS' },
  { label: 'Life Sciences', value: 'LIFE_SCIENCES' },
  {
    label: 'Management Engineering',
    value: 'MANAGEMENT_ENGINEERING',
  },
  {
    label: 'Materials and Nanosciences',
    value: 'MATERIALS_AND_NANOSCIENCES',
  },
  { label: 'Mathematical Economics', value: 'MATHEMATICAL_ECONOMICS' },
  { label: 'Mathematical Finance', value: 'MATHEMATICAL_FINANCE' },
  {
    label: 'Mathematical Optimization',
    value: 'MATHEMATICAL_OPTIMIZATION',
  },
  { label: 'Mathematical Physics', value: 'MATHEMATICAL_PHYSICS' },
  { label: 'Mathematics', value: 'MATHEMATICS' },
  {
    label: 'Mathematics/Business Administration',
    value: 'MATHEMATICS_BUSINESS_ADMINISTRATION',
  },
  {
    label: 'Mathematics/Chartered Professional Accountancy',
    value: 'MATHEMATICS_CHARTERED_PROFESSIONAL_ACCOUNTANCY',
  },
  {
    label: 'Mathematics/Financial Analysis and Risk Management',
    value: 'MATHEMATICS_FINANCIAL_ANALYSIS_AND_RISK_MANAGEMENT',
  },
  { label: 'Mathematics/Teaching', value: 'MATHEMATICS_TEACHING' },
  {
    label: 'Mechanical Engineering',
    value: 'MECHANICAL_ENGINEERING',
  },
  {
    label: 'Mechatronics Engineering',
    value: 'MECHATRONICS_ENGINEERING',
  },
  { label: 'Medicinal Chemistry', value: 'MEDICINAL_CHEMISTRY' },
  { label: 'Medieval Studies', value: 'MEDIEVAL_STUDIES' },
  {
    label: 'Minors and specializations',
    value: 'MINORS_AND_SPECIALIZATIONS',
  },
  { label: 'Music', value: 'MUSIC' },
  {
    label: 'Nanotechnology Engineering',
    value: 'NANOTECHNOLOGY_ENGINEERING',
  },
  { label: 'Nursing', value: 'NURSING' },
  { label: 'Optometry', value: 'OPTOMETRY' },
  {
    label: 'Peace and Conflict Studies',
    value: 'PEACE_AND_CONFLICT_STUDIES',
  },
  { label: 'Pharmacy', value: 'PHARMACY' },
  { label: 'Philosophy', value: 'PHILOSOPHY' },
  { label: 'Physical Sciences', value: 'PHYSICAL_SCIENCES' },
  { label: 'Physics', value: 'PHYSICS' },
  {
    label: 'Physics and Astronomy',
    value: 'PHYSICS_AND_ASTRONOMY',
  },
  { label: 'Planning', value: 'PLANNING' },
  { label: 'Political Science', value: 'POLITICAL_SCIENCE' },
  { label: 'Pre-law', value: 'PRE_LAW' },
  {
    label: 'Psychology – Bachelor of Arts',
    value: 'PSYCHOLOGY_BACHELOR_OF_ARTS',
  },
  {
    label: 'Psychology – Bachelor of Science',
    value: 'PSYCHOLOGY_BACHELOR_OF_SCIENCE',
  },
  { label: 'Public Health', value: 'PUBLIC_HEALTH' },
  { label: 'Pure Mathematics', value: 'PURE_MATHEMATICS' },
  {
    label: 'Recreation and Leisure Studies',
    value: 'RECREATION_AND_LEISURE_STUDIES',
  },
  {
    label: 'Recreation and Sport Business',
    value: 'RECREATION_AND_SPORT_BUSINESS',
  },
  { label: 'Religious Studies', value: 'RELIGIOUS_STUDIES' },
  { label: 'Science and Aviation', value: 'SCIENCE_AND_AVIATION' },
  { label: 'Science and Business', value: 'SCIENCE_AND_BUSINESS' },
  {
    label: 'Sexuality, Marriage, and Family Studies',
    value: 'SEXUALITY_MARRIAGE_AND_FAMILY_STUDIES',
  },
  {
    label: 'Social Development Studies',
    value: 'SOCIAL_DEVELOPMENT_STUDIES',
  },
  { label: 'Social Work', value: 'SOCIAL_WORK' },
  { label: 'Sociology', value: 'SOCIOLOGY' },
  { label: 'Software Engineering', value: 'SOFTWARE_ENGINEERING' },
  { label: 'Spanish', value: 'SPANISH' },
  { label: 'Statistics', value: 'STATISTICS' },
  {
    label: 'Sustainability and Financial Management',
    value: 'SUSTAINABILITY_AND_FINANCIAL_MANAGEMENT',
  },
  {
    label: 'Systems Design Engineering',
    value: 'SYSTEMS_DESIGN_ENGINEERING',
  },
  { label: 'Teaching', value: 'TEACHING' },
  {
    label: 'Theatre and Performance',
    value: 'THEATRE_AND_PERFORMANCE',
  },
  {
    label: 'Therapeutic Recreation',
    value: 'THERAPEUTIC_RECREATION',
  },
];

export function getProgram(programValue: string): FilterOption | undefined {
  return (
    programsList.find((program) => program.value === programValue) || undefined
  );
}

export function getProgramLabel(programValue: string): string | false {
  return getProgram(programValue)?.label || false;
}

export const timezonesList: FilterOption[] = [
  { value: 'GMT', label: 'GMT/UTC (Greenwich Mean Time)' },
  { value: 'PST', label: 'PST (Pacific Standard Time)' },
  { value: 'MST', label: 'MST (Mountain Standard Time)' },
  { value: 'CST', label: 'CST (Central Standard Time)' },
  { value: 'EST', label: 'EST (Eastern Standard Time)' },
  { value: 'CNT', label: 'CNT (Canada Newfoundland Time)' },
  { value: 'ECT', label: 'ECT (European Central Time)' },
  { value: 'EET', label: 'EET (Eastern European Time)' },
  { value: 'EAT', label: 'EAT (Eastern African Time)' },
  { value: 'CAT', label: 'CAT (Central African Time)' },
  { value: 'VST', label: 'VST (Vietnam Standard Time)' },
  { value: 'CTT', label: 'CTT (China Taiwan Time)' },
  { value: 'JST', label: 'JST (Japan Standard Time)' },
  { value: 'MET', label: 'MET (Middle East Time)' },
  { value: 'NET', label: 'NET (Near East Time)' },
  { value: 'PLT', label: 'PLT (Pakistan Lahore Time)' },
  { value: 'IDT', label: 'IDT (India Standard Time)' },
  { value: 'BDT', label: 'BDT (Bangladesh Standard Time)' },
  { value: 'ACT', label: 'ACT (Australia Central Time)' },
  { value: 'AET', label: 'AET (Australia Eastern Time)' },
  { value: 'SBT', label: 'SBT (Solomon Standard Time)' },
  { value: 'NZST', label: 'NZST (New Zealand Standard Time)' },
  { value: 'MIT', label: 'MIT (Midway Islands Time)' },
  { value: 'AST', label: 'AST (Alaska Standard Time)' },
  { value: 'HST', label: 'HST (Hawaii Standard Time)' },
  { value: 'PRT', label: 'PRT (Puerto Rico Time)' },
  { value: 'AGT', label: 'AGT (Argentina Standard Time)' },
];

export function getTimezoneLabel(timezoneValue: string): string | false {
  return getTimezone(timezoneValue)?.label || false;
}

export function getTimezone(
  timezoneValue: string
): FilterOption | undefined {
  return (
    timezonesList.find((timezone) => timezone.value === timezoneValue) ||
    undefined
  );
}
