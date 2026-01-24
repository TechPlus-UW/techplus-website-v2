import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  profileImageDataUrl: string;
  imageKey: string;
  profileImageChanged: boolean;
}

const initialState: ProfileState = {
  profileImageDataUrl: '',
  imageKey: '',
  profileImageChanged: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileImageDataUrl: (state, action: PayloadAction<string>) => {
      state.profileImageDataUrl = action.payload;
    },
    setImageKey: (state, action: PayloadAction<string>) => {
      state.imageKey = action.payload;
    },
    setProfileImageChanged: (state, action: PayloadAction<boolean>) => {
      state.profileImageChanged = action.payload;
    },
    clearProfile: (state) => {
      state.profileImageDataUrl = '';
      state.imageKey = '';
      state.profileImageChanged = false;
    },
  },
});

export const {
  setProfileImageDataUrl,
  setImageKey,
  setProfileImageChanged,
  clearProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
