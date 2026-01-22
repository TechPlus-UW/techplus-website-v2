import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserRole } from '@/types/user';

interface UserState {
  userRole: UserRole;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userRole: 'default',
  userId: '',
  email: '',
  firstName: '',
  lastName: '',
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        userId: string;
        email: string;
        firstName: string;
        lastName: string;
        userRole?: UserRole;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.userRole = action.payload.userRole || 'default';
      state.isAuthenticated = true;
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    clearUser: (state) => {
      state.userRole = 'default';
      state.userId = '';
      state.email = '';
      state.firstName = '';
      state.lastName = '';
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setUserRole, setUserId, clearUser } = userSlice.actions;
export default userSlice.reducer;
