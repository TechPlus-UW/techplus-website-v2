import { TextField } from '@mui/material';

export default function MentorField({
    label,
    value,
    placeholder,
    type = 'text',
    onChange,
    }: {
    label: string;
    value: string;
    placeholder?: string;
    type?: string;
    onChange: (value: string) => void;
    }) {
    return (
        <div>
        <label className="block text-[#0A1628] mb-2">{label}</label>

        <TextField
            fullWidth
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        </div>
    );
}