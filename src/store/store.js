import { compose } from 'redux';
import { configureStore, createSelector } from '@reduxjs/toolkit';

import transferSlice from './transferSlice';
import filterSlice from './filterSlice';
import ticketSlice from './ticketSlice';
import aviaApi from './aviaApi';

/* eslint no-unused-vars: "off"*/
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

export const useSearchQuery = aviaApi.endpoints.getSearchId.useQuery;
export const useTicketQuery = aviaApi.endpoints.getTickets.useQuery;

export const { setVisibleAmount, setSearchId, ticketsFetching, ticketsFetchingSuccess, ticketsFetchingError } =
  ticketSlice.actions;
export const { setFilter } = filterSlice.actions;
export const { setTransfer } = transferSlice.actions;
export const { addTickets } = ticketSlice.actions;

export const store = configureStore({
  reducer: {
    tickets: ticketSlice.reducer,
    filter: filterSlice.reducer,
    transfer: transferSlice.reducer,
    aviaApi: aviaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(aviaApi.middleware),
});

export const initiateSearch = async () => {
  const {
    data: { searchId },
  } = await store.dispatch(aviaApi.endpoints.getSearchId.initiate());
  store.dispatch(setSearchId(searchId));
};

export const commenceSearch = async () => {
  store.dispatch(ticketsFetching());
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}tickets?searchId=${store.getState().tickets.searchId}`
    );
    const data = await res.json();
    store.dispatch(ticketsFetchingSuccess(data));
  } catch (e) {
    store.dispatch(ticketsFetchingError(e.message));
  }
};
