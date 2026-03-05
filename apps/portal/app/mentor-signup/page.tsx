'use client';

import { Alert } from '@mui/material';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store/hooks';

import Navbar from '@/components/navigation/Navbar';
import MentorDecorativeLeaf from '@/components/portal/mentor-signup/MentorDecorativeLeaf/MentorDecorativeLeaf';
import MentorApplicationForm from '@/components/portal/mentor-signup/MentorApplicationForm/MentorApplicationForm';

export default function MentorSignupPage() {
  const { userId, isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated || !userId) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#050a1f' }}>
          <div className="max-w-2xl mx-auto text-center">
            <Alert severity="warning" className="mb-4">
              Please log in to apply as a mentor.
            </Alert>
            <Link href="/login" className="text-[#76a36d] hover:underline">
              Go to Login
            </Link>
          </div>
        </div>
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen py-16 px-4 overflow-hidden bg-white">
        <MentorDecorativeLeaf />
        <MentorApplicationForm />
      </div>
    </>
  );
}