export type UserRole = 'default' | 'mentor' | 'mentee' | 'admin';

export interface User {
  id: string;
  role: UserRole;
  email?: string;
  name?: string;
}

export interface Mentor {
  id: string;
  name: string;
  term: string;
  program: string;
  pronouns: string;
  desc: string;
  area_of_expertise: string[];
  email: string;
  linkedin: string;
  img?: string;
}

export interface Mentee {
  id: string;
  name: string;
  email?: string;
}

export interface ProfileImage {
  dataUrl: string;
  imageKey: string;
  changed: boolean;
}
