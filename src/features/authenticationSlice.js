import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    isLoggedIn: false,
    loading: false,
    user: null
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
    },
    setLoading: (state, action) => {
        state.loading = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    restAuthentication: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.user = null;      
    }
  },
});

export const { setUser, setLoading, setIsLoggedIn , restAuthentication } = authenticationSlice.actions;

export default authenticationSlice.reducer;