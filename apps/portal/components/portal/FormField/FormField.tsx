import { TextField } from '@mui/material';

export default function FormField({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
    }: {
    label: string;
    value: string;
    placeholder?: string;
    type?: string;
    onChange: (value: string) => void;
}) {
    return (
        <div>
        <label className="block text-white mb-2">{label}</label>

        <TextField
            fullWidth
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-800 rounded"
            sx={{
            '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.5)' },
                '&.Mui-focused fieldset': { borderColor: '#8BC677' },
            },
            }}
        />
        </div>
    );
}