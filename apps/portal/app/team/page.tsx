'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import TeamDisplay from '@/components/landingPage/TeamDisplay/TeamDisplay';

const mockTeams = [
  {
    teamName: 'Executive',
    members: [
      { name: 'Member Name', role: 'President',           linkedin: '#' },
      { name: 'Member Name', role: 'Vice President',      linkedin: '#' },
      { name: 'Member Name', role: 'Engineering Manager', linkedin: '#' },
      { name: 'Member Name', role: 'Project Manager',     linkedin: '#' },
      { name: 'Member Name', role: 'Project Manager',     linkedin: '#' },

    ],
  },
  {
    teamName: 'Engineering',
    members: [
      { name: 'Member Name', role: 'Tech Lead',           linkedin: '#' },
      { name: 'Member Name', role: 'Frontend Lead',       linkedin: '#' },
      { name: 'Member Name', role: 'Frontend Developer',  linkedin: '#' },
      { name: 'Member Name', role: 'Backend Lead',        linkedin: '#' },
      { name: 'Member Name', role: 'Backend Developer',   linkedin: '#' },
    ],
  },
  {
    teamName: 'Design',
    members: [
      { name: 'Member Name', role: 'Product Lead',        linkedin: '#' },
      { name: 'Member Name', role: 'Product Designer',    linkedin: '#' },
      { name: 'Member Name', role: 'Product Designer',    linkedin: '#' },
      { name: 'Member Name', role: 'Product Designer',    linkedin: '#' },
    ],
  },
  {
    teamName: 'Product',
    members: [
      { name: 'Member Name', role: 'Product Manager',     linkedin: '#' },
      { name: 'Member Name', role: 'Product Manager',     linkedin: '#' },
      { name: 'Member Name', role: 'Product Lead',        linkedin: '#' },
    ],
  },
  {
    teamName: 'Operations and Outreach',
    members: [
      { name: 'Member Name', role: 'Operations Manager',  linkedin: '#' },
      { name: 'Member Name', role: 'Logistics Officer',   linkedin: '#' },
      { name: 'Member Name', role: 'Marketing Lead',      linkedin: '#' },
      { name: 'Member Name', role: 'Marketing Director',  linkedin: '#' },
      { name: 'Member Name', role: 'Outreach',            linkedin: '#' },
      { name: 'Member Name', role: 'Outreach',            linkedin: '#' },
    ],
  },
];

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 px-5" style={{ backgroundColor: '#050A1F' }}>
        <h1 className="mb-4 text-4xl font-semibold text-white text-center">Meet Our Team</h1>
        <p className="mb-10 text-center text-[#8899BB] max-w-lg mx-auto">
          We are a dedicated group of students who work toward the common goal of building the tech community at UW for you.
        </p>
        <div className="max-w-5xl mx-auto">
          <TeamDisplay teams={mockTeams} />
        </div>
      </div>
    </>
  );
}
