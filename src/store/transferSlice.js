import { createSlice } from '@reduxjs/toolkit';

const transferSlice = createSlice({
  name: 'transfer',
  initialState: {
    transfer: {
      noTransfers: true,
      oneTransfer: true,
      twoTransfers: true,
      threeTransfers: true,
    },
  },
  reducers: {
    setTransfer: (state, action) => {
      let newTransfer = {};
      switch (action.payload.key) {
        case '0':
          newTransfer = {
            ...state.transfer,
            noTransfers: action.payload.value,
          };
          break;
        case '1':
          newTransfer = {
            ...state.transfer,
            oneTransfer: action.payload.value,
          };
          break;
        case '2':
          newTransfer = {
            ...state.transfer,
            twoTransfers: action.payload.value,
          };
          break;
        case '3':
          newTransfer = {
            ...state.transfer,
            threeTransfers: action.payload.value,
          };
          break;
        default:
          newTransfer = {
            noTransfers: action.payload.value,
            oneTransfer: action.payload.value,
            twoTransfers: action.payload.value,
            threeTransfers: action.payload.value,
          };
      }
      state.transfer = { ...newTransfer };
    },
  },
});

export default transferSlice;
