'use client';

import { useState } from 'react';
import { Button, Alert } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { applicationService } from '@/lib/services/applicationService';
import { useAppSelector } from '@/lib/store/hooks';

import MenteeFormField from '../MenteeFormField/MenteeFormField';
import MenteeFormTextArea from '../MenteeFormTextArea/MenteeFormTextArea';

export default function MenteeForm() {
    const router = useRouter();
    const { userId } = useAppSelector((state) => state.user);

    const [form, setForm] = useState({
        program: '',
        yearOfStudy: '',
        careerGoals: '',
        areasOfInterest: '',
        preferredMentorCharacteristics: '',
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

        const result = await applicationService.submitMenteeApplication({
        user_id: userId,
        profile_id: userId,
        program: form.program || undefined,
        year_of_study: form.yearOfStudy
            ? parseInt(form.yearOfStudy)
            : undefined,
        career_goals: form.careerGoals || undefined,
        areas_of_interest: form.areasOfInterest || undefined,
        preferred_mentor_characteristics:
            form.preferredMentorCharacteristics || undefined,
        availability: form.availability || undefined,
        preferred_communication:
            form.preferredCommunication || undefined,
        additional_info: form.additionalInfo || undefined,
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
        <div className="max-w-2xl mx-auto">

            <h1 className="text-4xl font-semibold text-white mb-8">
                Mentee Sign Up
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {error && <Alert severity="error">{error}</Alert>}

                <div className="grid grid-cols-2 gap-4">
                <MenteeFormField
                    label="Program"
                    placeholder="Computer Science"
                    value={form.program}
                    onChange={(v) => updateField('program', v)}
                />

                <MenteeFormField
                    label="Year of Study"
                    type="number"
                    value={form.yearOfStudy}
                    onChange={(v) => updateField('yearOfStudy', v)}
                />
                </div>

                <MenteeFormTextArea
                    label="Career Goals"
                    value={form.careerGoals}
                    onChange={(v) => updateField('careerGoals', v)}
                />

                <MenteeFormTextArea
                    label="Areas of Interest"
                    value={form.areasOfInterest}
                    onChange={(v) => updateField('areasOfInterest', v)}
                />

                <MenteeFormTextArea
                    label="Preferred Mentor Characteristics"
                    rows={2}
                    value={form.preferredMentorCharacteristics}
                    onChange={(v) =>
                        updateField('preferredMentorCharacteristics', v)
                    }
                />

                <MenteeFormField
                    label="Availability"
                    value={form.availability}
                    onChange={(v) => updateField('availability', v)}
                />

                <MenteeFormField
                    label="Preferred Communication"
                    value={form.preferredCommunication}
                    onChange={(v) => updateField('preferredCommunication', v)}
                />

                <MenteeFormTextArea
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
                    sx={{
                        backgroundColor: '#374151',
                        '&:hover': { backgroundColor: '#4B5563' },
                    }}
                >
                    {loading ? 'Submitting...' : 'Submit Application'}
                </Button>

            </form>
        </div>
    );
}