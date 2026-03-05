'use client';

import React, { useState } from 'react';
import { Button, Alert } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import { applicationService } from '@/lib/services/applicationService';
import { useAppSelector } from '@/lib/store/hooks';

import FormField from '../../components/portal/FormField/FormField';
import FormTextArea from '../../components/portal/FormTextArea/FormTextArea';

export default function MenteeSignupPage() {
  const [program, setProgram] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [careerGoals, setCareerGoals] = useState('');
  const [areasOfInterest, setAreasOfInterest] = useState('');
  const [preferredMentorCharacteristics, setPreferredMentorCharacteristics] = useState('');
  const [availability, setAvailability] = useState('');
  const [preferredCommunication, setPreferredCommunication] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await applicationService.submitMenteeApplication({
      user_id: userId,
      profile_id: userId,
      program: program || undefined,
      year_of_study: yearOfStudy ? parseInt(yearOfStudy) : undefined,
      career_goals: careerGoals || undefined,
      areas_of_interest: areasOfInterest || undefined,
      preferred_mentor_characteristics: preferredMentorCharacteristics || undefined,
      availability: availability || undefined,
      preferred_communication: preferredCommunication || undefined,
      additional_info: additionalInfo || undefined,
    });

    if (result.success) {
      alert('Mentee application submitted successfully!');
      router.push('/profile');
    } else {
      setError(result.error || 'Failed to submit application');
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#020B2C' }}>
        <div className="max-w-2xl mx-auto">

          <h1 className="text-4xl font-semibold text-white mb-8">
            Mentee Sign Up
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {error && <Alert severity="error">{error}</Alert>}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Program"
                placeholder="e.g., Computer Science"
                value={program}
                onChange={setProgram}
              />

              <FormField
                label="Year of Study"
                type="number"
                placeholder="e.g., 2"
                value={yearOfStudy}
                onChange={setYearOfStudy}
              />
            </div>

            <FormTextArea
              label="Career Goals"
              placeholder="What are your career goals?"
              value={careerGoals}
              onChange={setCareerGoals}
            />

            <FormTextArea
              label="Areas of Interest"
              placeholder="What areas are you interested in learning about?"
              value={areasOfInterest}
              onChange={setAreasOfInterest}
            />

            <FormTextArea
              label="Preferred Mentor Characteristics"
              rows={2}
              placeholder="What qualities are you looking for in a mentor?"
              value={preferredMentorCharacteristics}
              onChange={setPreferredMentorCharacteristics}
            />

            <FormField
              label="Availability"
              placeholder="Weekdays after 5pm, Weekends"
              value={availability}
              onChange={setAvailability}
            />

            <FormField
              label="Preferred Communication"
              placeholder="Email, Slack, Discord"
              value={preferredCommunication}
              onChange={setPreferredCommunication}
            />

            <FormTextArea
              label="Additional Information"
              value={additionalInfo}
              onChange={setAdditionalInfo}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: '#374151',
                '&:hover': { backgroundColor: '#4B5563' },
              }}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>

          </form>
        </div>
      </div>
    </>
  );
}