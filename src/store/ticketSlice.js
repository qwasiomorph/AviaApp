import { createSlice } from '@reduxjs/toolkit';

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    searchId: '',
    appIsInitiated: false,
    visibleAmount: 5,
    tickets: [],
    isFetching: false,
    stop: false,
    error: '',
  },
  reducers: {
    setSearchId: (state, action) => {
      state.searchId = action.payload;
      state.appIsInitiated = true;
    },
    setVisibleAmount: (state, action) => {
      state.visibleAmount = action.payload;
    },
    ticketsFetching: (state) => {
      state.isFetching = true;
    },
    ticketsFetchingSuccess: (state, action) => {
      state.isFetching = false;
      state.error = '';
      state.stop = action.payload.stop;
      state.tickets = [...state.tickets, ...action.payload.tickets];
    },
    ticketsFetchingError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export default ticketSlice;
