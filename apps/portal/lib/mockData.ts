import type { Mentor } from '@/types/user';

// Minimal mock data - placeholder for development
export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Sample Mentor',
    term: '3B',
    program: 'Computer Science',
    pronouns: 'They/Them',
    desc: 'Sample description',
    area_of_expertise: ['Software Engineering'],
    email: 'sample@example.com',
    linkedin: 'https://linkedin.com',
  },
];

export const getMockMentor = (id: string): Mentor | undefined => {
  return mockMentors.find((m) => m.id === id);
};

export const getAllMockMentors = (): Mentor[] => {
  return mockMentors;
};
