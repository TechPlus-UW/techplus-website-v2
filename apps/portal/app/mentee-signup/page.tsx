'use client';

import { Alert } from '@mui/material';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import { useAppSelector } from '@/lib/store/hooks';

import MenteeForm from '@/components/portal/mentee-signup/MenteeForm/MenteeForm';

export default function MenteeSignupPage() {
  const { userId, isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated || !userId) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#050a1f' }}>
          <div className="max-w-2xl mx-auto text-center">
            <Alert severity="warning" className="mb-4">
              Please log in to apply as a mentee.
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
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#020B2C' }}>
        <MenteeForm />
      </div>
    </>
  );
}