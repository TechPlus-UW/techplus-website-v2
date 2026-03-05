import { TextField } from '@mui/material';

export default function MentorTextArea({
    label,
    value,
    rows = 4,
    onChange,
    }: {
    label: string;
    value: string;
    rows?: number;
    onChange: (value: string) => void;
    }) {
    return (
        <div>
        <label className="block text-[#0A1628] mb-2">{label}</label>

        <TextField
            fullWidth
            multiline
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        </div>
    );
}