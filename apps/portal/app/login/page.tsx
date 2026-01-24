'use client';

import React, { useState } from 'react';
import { TextField, Button, Link as MuiLink, Alert, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import { authService } from '@/lib/services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await authService.signIn({ email, password });

    if (result.success) {
      // AuthProvider will handle updating Redux state
      router.push('/');
      router.refresh();
    } else {
      setError(result.error || 'Failed to sign in');
    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setError('');
    setLoading(true);

    const result = await authService.resetPassword(email);

    if (result.success) {
      setError('');
      alert('Password reset email sent! Please check your inbox.');
    } else {
      setError(result.error || 'Failed to send reset email');
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-16 px-4" style={{ backgroundColor: '#050a1f' }}>
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-semibold text-white mb-8">Sign in</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert severity="error" className="bg-red-900 text-white">
                {error}
              </Alert>
            )}

            <div>
              <label className="block text-white mb-2">Email</label>
              <TextField
                fullWidth
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-800 rounded"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#76a36d',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              />
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-800 rounded"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'white' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#76a36d',
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#76a36d] hover:text-[#76a36d] hover:underline text-sm"
              >
                Forgot password?
              </button>
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
                '&:hover': {
                  backgroundColor: '#4B5563',
                },
              }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#76a36d] hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
