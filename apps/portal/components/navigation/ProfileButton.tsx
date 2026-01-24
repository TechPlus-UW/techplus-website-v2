'use client';

import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks';
import { clearUser } from '@/lib/store/slices/userSlice';
import { authService } from '@/lib/services/authService';

export default function ProfileButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { firstName, lastName } = useAppSelector((state) => state.user);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push('/profile');
  };

  const handleLogout = async () => {
    handleClose();
    const result = await authService.signOut();
    if (result.success) {
      dispatch(clearUser());
      router.push('/');
      router.refresh();
    }
  };

  const getInitials = () => {
    const first = firstName?.charAt(0).toUpperCase() || '';
    const last = lastName?.charAt(0).toUpperCase() || '';
    return first + last || 'U';
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 2,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#76a36d',
            color: '#050a1f',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          {getInitials()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile} sx={{ color: '#020B2C' }}>
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: '#020B2C' }}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
