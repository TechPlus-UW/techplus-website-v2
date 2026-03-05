'use client';

import { useState } from 'react';
import { Button, Alert } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { applicationService } from '@/lib/services/applicationService';
import { useAppSelector } from '@/lib/store/hooks';

import MentorFormField from '../MentorFormField/MentorFormField';
import MentorFormTextArea from '../MentorFormTextArea/MentorFormTextArea';

export default function MentorForm() {
    const router = useRouter();
    const { userId } = useAppSelector((state) => state.user);

    const [form, setForm] = useState({
        program: '',
        yearOfStudy: '',
        company: '',
        role: '',
        experienceYears: '',
        bio: '',
        availability: '',
        preferredCommunication: '',
        additionalInfo: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (key: string, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        setError('');
        setLoading(true);

        const result = await applicationService.submitMentorApplication({
        user_id: userId,
        profile_id: userId,
        program: form.program || undefined,
        year_of_study: form.yearOfStudy
            ? parseInt(form.yearOfStudy)
            : undefined,
        company: form.company || undefined,
        role: form.role || undefined,
        experience_years: form.experienceYears
            ? parseInt(form.experienceYears)
            : undefined,
        bio: form.bio || undefined,
        availability: form.availability || undefined,
        preferred_communication:
            form.preferredCommunication || undefined,
        additional_info: form.additionalInfo || undefined,
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
        <div className="max-w-xl mx-auto">
            <h1 className="text-5xl text-[#6B8E6B] font-medium text-center mb-8">
                Application - Mentor
            </h1>
            <p className="text-[#0A1628] font-light text-center mb-8">
                Thank you for your interest as a mentor! Please fill out the following information to see if you are eligible. It should take about 10 minutes:
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

                {error && <Alert severity="error">{error}</Alert>}

                <div className="grid grid-cols-2 gap-4">
                <MentorFormField
                    label="Program"
                    value={form.program}
                    placeholder="Computer Science"
                    onChange={(v) => updateField('program', v)}
                />

                <MentorFormField
                    label="Year of Study"
                    type="number"
                    value={form.yearOfStudy}
                    onChange={(v) => updateField('yearOfStudy', v)}
                />
                </div>

                <div className="grid grid-cols-2 gap-4">
                <MentorFormField
                    label="Company"
                    value={form.company}
                    onChange={(v) => updateField('company', v)}
                />

                <MentorFormField
                    label="Role"
                    value={form.role}
                    onChange={(v) => updateField('role', v)}
                />
                </div>

                <MentorFormField
                label="Years of Experience"
                type="number"
                value={form.experienceYears}
                onChange={(v) => updateField('experienceYears', v)}
                />

                <MentorFormTextArea
                label="Bio"
                value={form.bio}
                onChange={(v) => updateField('bio', v)}
                />

                <MentorFormField
                label="Availability"
                value={form.availability}
                onChange={(v) => updateField('availability', v)}
                />

                <MentorFormField
                label="Preferred Communication"
                value={form.preferredCommunication}
                onChange={(v) => updateField('preferredCommunication', v)}
                />

                <MentorFormTextArea
                label="Additional Information"
                rows={3}
                value={form.additionalInfo}
                onChange={(v) => updateField('additionalInfo', v)}
                />

                <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                endIcon={<ArrowForward />}
                >
                {loading ? 'Submitting...' : 'Submit Application'}
                </Button>

            </form>
        </div>
    );
}