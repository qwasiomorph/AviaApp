import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filter: {
      cheap: true,
      swift: false,
      optimal: false,
    },
  },
  reducers: {
    setFilter: (state, action) => {
      let newFilter = {};
      switch (action.payload) {
        case 'FILTER_CHEAP':
          newFilter = {
            cheap: true,
            swift: false,
            optimal: false,
          };
          break;
        case 'FILTER_SWIFT':
          newFilter = {
            cheap: false,
            swift: true,
            optimal: false,
          };
          break;
        case 'FILTER_OPTIMAL':
          newFilter = {
            cheap: false,
            swift: false,
            optimal: true,
          };
          break;
      }
      state.filter = { ...newFilter };
    },
  },
});

export default filterSlice;
