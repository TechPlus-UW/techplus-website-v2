'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert, Select, MenuItem, FormControl, InputLabel, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navigation/Navbar';
import { adminService } from '@/lib/services/adminService';
import { useAppSelector } from '@/lib/store/hooks';
import type { UserRole } from '@/lib/repositories/authRepository';
import type { UserSearchResult } from '@/lib/repositories/adminRepository';

interface AdminStats {
  totalMembers: number;
  mentors: number;
  mentees: number;
  execs: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState<UserSearchResult | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('default');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userRole, isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/');
      return;
    }

    loadStats();
  }, [isAuthenticated, userRole, router]);

  const loadStats = async () => {
    const result = await adminService.getStats();
    if (result.success) {
      setStats(result.data);
    } else {
      setError(result.error || 'Failed to load stats');
    }
  };

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const result = await adminService.searchUserByEmail(searchEmail.trim());

    if (result.success) {
      if (result.data) {
        setSearchResult(result.data);
        setSelectedRole(result.data.role);
      } else {
        setError('No user found with that email');
        setSearchResult(null);
      }
    } else {
      setError(result.error || 'Failed to search user');
      setSearchResult(null);
    }

    setLoading(false);
  };

  const handleUpdateRole = async () => {
    if (!searchResult) {
      setError('Please search for a user first');
      return;
    }

    setError('');
    setSuccess('');
    setLoading(true);

    const result = await adminService.updateUserRole(searchResult.id, selectedRole);

    if (result.success) {
      setSuccess(`User role updated to ${selectedRole}`);
      setSearchResult({ ...searchResult, role: selectedRole });
      loadStats(); // Refresh stats
    } else {
      setError(result.error || 'Failed to update role');
    }

    setLoading(false);
  };

  if (!isAuthenticated || userRole !== 'admin') {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="py-10 px-5" style={{ backgroundColor: '#020B2C', minHeight: '100vh' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8 text-4xl font-semibold text-white text-center">Admin Dashboard</h1>

          {/* Stats Section */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gray-800">
                <CardContent>
                  <Typography variant="h6" className="text-gray-400 mb-2">
                    Total Members
                  </Typography>
                  <Typography variant="h4" className="text-white font-bold">
                    {stats.totalMembers}
                  </Typography>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardContent>
                  <Typography variant="h6" className="text-gray-400 mb-2">
                    Mentors
                  </Typography>
                  <Typography variant="h4" className="text-white font-bold">
                    {stats.mentors}
                  </Typography>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardContent>
                  <Typography variant="h6" className="text-gray-400 mb-2">
                    Mentees
                  </Typography>
                  <Typography variant="h4" className="text-white font-bold">
                    {stats.mentees}
                  </Typography>
                </CardContent>
              </Card>
              <Card className="bg-gray-800">
                <CardContent>
                  <Typography variant="h6" className="text-gray-400 mb-2">
                    Execs
                  </Typography>
                  <Typography variant="h4" className="text-white font-bold">
                    {stats.execs}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Search and Role Management Section */}
          <Card className="bg-gray-800 p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">User Management</h2>

            {error && (
              <Alert severity="error" className="mb-4 bg-red-900 text-white">
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" className="mb-4 bg-green-900 text-white">
                {success}
              </Alert>
            )}

            <div className="space-y-4">
              <div className="flex gap-4">
                <TextField
                  fullWidth
                  label="Search by Email"
                  placeholder="Enter email address"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="bg-gray-700"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#8BC677' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-[#6C9A5C] hover:bg-[#8BC677] text-white normal-case"
                  sx={{
                    backgroundColor: '#6C9A5C',
                    '&:hover': { backgroundColor: '#8BC677' },
                  }}
                >
                  Search
                </Button>
              </div>

              {searchResult && (
                <div className="bg-gray-700 rounded-lg p-4 space-y-4">
                  <div>
                    <Typography variant="body2" className="text-gray-400 mb-1">
                      Name
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {searchResult.first_name} {searchResult.last_name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-400 mb-1">
                      Email
                    </Typography>
                    <Typography variant="body1" className="text-white">
                      {searchResult.email}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2" className="text-gray-400 mb-1">
                      Current Role
                    </Typography>
                    <Typography variant="body1" className="text-white capitalize">
                      {searchResult.role}
                    </Typography>
                  </div>
                  <div className="flex gap-4 items-end">
                    <FormControl fullWidth>
                      <InputLabel className="text-gray-400">Change Role</InputLabel>
                      <Select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                        label="Change Role"
                        className="bg-gray-600 text-white"
                        sx={{
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#8BC677',
                          },
                        }}
                      >
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="mentor">Mentor</MenuItem>
                        <MenuItem value="mentee">Mentee</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      variant="contained"
                      onClick={handleUpdateRole}
                      disabled={loading || selectedRole === searchResult.role}
                      className="bg-[#6C9A5C] hover:bg-[#8BC677] text-white normal-case"
                      sx={{
                        backgroundColor: '#6C9A5C',
                        '&:hover': { backgroundColor: '#8BC677' },
                      }}
                    >
                      {loading ? 'Updating...' : 'Update Role'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
