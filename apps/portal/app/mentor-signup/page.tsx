'use client';

import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';
import { applicationService } from '@/lib/services/applicationService';
import { useAppSelector } from '@/lib/store/hooks';

export default function MentorSignupPage() {
  const [program, setProgram] = useState('');
  const [yearOfStudy, setYearOfStudy] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [bio, setBio] = useState('');
  const [availability, setAvailability] = useState('');
  const [preferredCommunication, setPreferredCommunication] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userId, isAuthenticated } = useAppSelector((state) => state.user);

  const leftLeafPath = "/assets/images/left-leaf-portal.svg";
  const rightLeafPath = "/assets/images/right-leaf-portal.svg";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await applicationService.submitMentorApplication({
      user_id: userId,
      profile_id: userId,
      program: program || undefined,
      year_of_study: yearOfStudy ? parseInt(yearOfStudy) : undefined,
      company: company || undefined,
      role: role || undefined,
      experience_years: experienceYears ? parseInt(experienceYears) : undefined,
      bio: bio || undefined,
      availability: availability || undefined,
      preferred_communication: preferredCommunication || undefined,
      additional_info: additionalInfo || undefined,
    });

    if (result.success) {
      alert('Mentor application submitted successfully!');
      router.push('/profile');
    } else {
      setError(result.error || 'Failed to submit application');
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-16 px-4 overflow-hidden" style={{ backgroundColor: '#ffffff' }}>

        <div className="relative">

        {/* LEFT LEAVES - way down */}
        <div className="absolute top-[30vh] left-0">
          <Image
            src={leftLeafPath}
            alt="decorative leaf"
            width={456}
            height={554}
            className="h-[50vh] w-auto opacity-30 pointer-events-none"
            unoptimized
          />
          <Image
            src={leftLeafPath}
            alt="decorative leaf"
            width={456}
            height={554}
            className="h-[50vh] w-auto mt-[30vh] opacity-30 pointer-events-none"
            unoptimized
          />
        </div>

        {/* RIGHT LEAVES - pulled up with negative space */}
        <div className="absolute top-0 right-0 -mt-[15vh]">
          <Image
            src={rightLeafPath}
            alt="decorative leaf"
            width={451}
            height={615}
            className="h-[50vh] w-auto opacity-30 pointer-events-none"
            unoptimized
          />
          <Image
            src={rightLeafPath}
            alt="decorative leaf"
            width={451}
            height={615}
            className="h-[50vh] w-auto mt-[40vh] opacity-30 pointer-events-none"
            unoptimized
          />
        </div>

          <div className="max-w-xl mx-auto">
            <h1 className="text-5xl text-[#6B8E6B] font-medium text-semibold text-center mb-8">Application - Mentor</h1>
            <p className="text-[#0A1628] font-light text-center mb-8">
              Thank you for your interest as a mentor! Please fill out the following information to see if you are eligible. It should take about 10 minutes:
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert severity="error" className="bg-red-900 text-white">
                  {error}
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0A1628] mb-2">Program</label>
                  <TextField
                    fullWidth
                    placeholder="e.g., Computer Science"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="bg-gray-800 rounded"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#8BC677' },
                      },
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[#0A1628] mb-2">Year of Study</label>
                  <TextField
                    fullWidth
                    type="number"
                    placeholder="e.g., 3"
                    value={yearOfStudy}
                    onChange={(e) => setYearOfStudy(e.target.value)}
                    className="bg-gray-800 rounded"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#8BC677' },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#0A1628] mb-2">Company</label>
                  <TextField
                    fullWidth
                    placeholder="Current or previous company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-gray-800 rounded"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#8BC677' },
                      },
                    }}
                  />
                </div>
                <div>
                  <label className="block text-[#0A1628] mb-2">Role</label>
                  <TextField
                    fullWidth
                    placeholder="e.g., Software Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-gray-800 rounded"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                        '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                        '&.Mui-focused fieldset': { borderColor: '#8BC677' },
                      },
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Years of Experience</label>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="e.g., 2"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="bg-gray-800 rounded"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
                    },
                  }}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Bio</label>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Tell us about yourself and your experience"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="bg-gray-800 rounded"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
                    },
                  }}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Availability</label>
                <TextField
                  fullWidth
                  placeholder="e.g., Weekdays after 5pm, Weekends"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="bg-gray-800 rounded"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
                    },
                  }}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Preferred Communication</label>
                <TextField
                  fullWidth
                  placeholder="e.g., Email, Slack, Discord"
                  value={preferredCommunication}
                  onChange={(e) => setPreferredCommunication(e.target.value)}
                  className="bg-gray-800 rounded"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#8BC677' },
                    },
                  }}
                />
              </div>

              <div>
                <label className="block text-white mb-2">Additional Information</label>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Anything else you'd like to share"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  className="bg-gray-800 rounded"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#8BC677' },
                    },
                  }}
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-600 text-white normal-case py-3"
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
      </div>
    </>
  );
}
