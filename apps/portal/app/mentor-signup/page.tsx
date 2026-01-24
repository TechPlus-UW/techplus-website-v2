'use client';

import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#020B2C' }}>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-semibold text-white mb-8">Mentor Sign Up</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert severity="error" className="bg-red-900 text-white">
                {error}
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Program</label>
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
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
                    },
                  }}
                />
              </div>
              <div>
                <label className="block text-white mb-2">Year of Study</label>
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
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
                    },
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white mb-2">Company</label>
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
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
                    },
                  }}
                />
              </div>
              <div>
                <label className="block text-white mb-2">Role</label>
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
                      '&.Mui-focused fieldset': { borderColor: '#76a36d' },
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
                    '&.Mui-focused fieldset': { borderColor: '#8BC677' },
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
                    '&.Mui-focused fieldset': { borderColor: '#8BC677' },
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
                    '&.Mui-focused fieldset': { borderColor: '#8BC677' },
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
    </>
  );
}
