import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  selectedRequest: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addRequest: (state, action) => {
      const newRequest = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.requests.unshift(newRequest);
      // Keep only last 50 requests
      if (state.requests.length > 50) {
        state.requests.pop();
      }
    },
    selectRequest: (state, action) => {
      state.selectedRequest = action.payload;
    },
    clearHistory: (state) => {
      state.requests = [];
      state.selectedRequest = null;
    },
  },
});

export const { addRequest, selectRequest, clearHistory } = historySlice.actions;
export default historySlice.reducer; 