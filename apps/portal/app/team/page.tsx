'use client';

import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import TeamDisplay from '@/components/landingPage/TeamDisplay/TeamDisplay';
import { techPlusTeamMembers } from '@/components/landingPage/about/config';

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <div className="py-10 px-5 text-center" style={{ backgroundColor: '#050a1f', minHeight: '100vh' }}>
        <h1 className="mb-5 text-4xl font-semibold text-white">Meet Our Team</h1>
        <p className="mb-8 max-w-[800px] mx-auto text-white">
          We are a dedicated group of students who work toward the common goal of
          building the tech community at UW for you
        </p>
        <div className="grid grid-cols-1 gap-2">
          <TeamDisplay league={techPlusTeamMembers} />
        </div>
      </div>
    </>
  );
}
