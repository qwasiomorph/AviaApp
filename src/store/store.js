import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { compose } from "redux";
import { createSlice, configureStore, createSelector } from "@reduxjs/toolkit";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsDenylist, actionsCreators, serialize...
      })
    : compose;

export const aviaApi = createApi({
  reducerPath: "aviaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
  }),

  endpoints: (builder) => ({
    getSearchId: builder.query({
      query: () => "/search",
    }),
    getTickets: builder.query({
      query: (searchId) => `/tickets?searchId=${searchId}`,
    }),
  }),
});

export const useSearchQuery = aviaApi.endpoints.getSearchId.useQuery;
export const useTicketQuery = aviaApi.endpoints.getTickets.useQuery;

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    searchId: "",
    appIsInitiated: false,
    visibleAmount: 5,
  },
  reducers: {
    setSearchId: (state, action) => {
      state.searchId = action.payload;
      state.appIsInitiated = true;
    },
    setVisibleAmount: (state, action) => {
      state.visibleAmount = action.payload;
    },
  },
});

const filterSlice = createSlice({
  name: "filter",
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
        case "FILTER_CHEAP":
          newFilter = {
            cheap: true,
            swift: false,
            optimal: false,
          };
          break;
        case "FILTER_SWIFT":
          newFilter = {
            cheap: false,
            swift: true,
            optimal: false,
          };
          break;
        case "FILTER_OPTIMAL":
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

const transferSlice = createSlice({
  name: "transfer",
  initialState: {
    transfer: {
      noTransfers: false,
      oneTransfer: false,
      twoTransfers: false,
      threeTransfers: false,
    },
  },
  reducers: {
    setTransfer: (state, action) => {
      let newTransfer = {};
      switch (action.payload.key) {
        case "0":
          newTransfer = {
            ...state.transfer,
            noTransfers: action.payload.value,
          };
          break;
        case "1":
          newTransfer = {
            ...state.transfer,
            oneTransfer: action.payload.value,
          };
          break;
        case "2":
          newTransfer = {
            ...state.transfer,
            twoTransfers: action.payload.value,
          };
          break;
        case "3":
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

export const { setVisibleAmount } = ticketSlice.actions;
export const { setSearchId } = ticketSlice.actions;
export const { setFilter } = filterSlice.actions;
export const { setTransfer } = transferSlice.actions;

export const store = configureStore({
  reducer: {
    tickets: ticketSlice.reducer,
    filter: filterSlice.reducer,
    transfer: transferSlice.reducer,
    aviaApi: aviaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aviaApi.middleware),
});

export const initiateSearch = async () => {
  const { data } = await store.dispatch(
    aviaApi.endpoints.getSearchId.initiate()
  );
  store.dispatch(setSearchId(data.searchId));

  store.dispatch(
    aviaApi.endpoints.getTickets.initiate(store.getState().tickets.searchId)
  );
};

export const selectVisibleAmount = (state) => state.tickets.visibleAmount;
export const selectMain = (state) => state.tickets.appIsInitiated;
export const selectFilter = (state) => state.filter.filter;
export const selectTransfer = (state) => state.transfer.transfer;

export const selectTickets = createSelector(
  (state) =>
    aviaApi.endpoints.getTickets.select(store.getState().tickets.searchId)(
      state
    )?.data,
  (state) =>
    aviaApi.endpoints.getTickets.select(store.getState().tickets.searchId)(
      state
    )?.error,
  (state) => state.tickets.visibleAmount,
  (state) => state.filter.filter,
  (state) => state.transfer.transfer,
  (tickets, error, visibleAmount, filter, transfer) => {
    if (error) {
      return new Error(`Код: ${error.status}`);
    }
    if (!tickets) {
      return;
    }
    const { tickets: ticketList } = tickets;

    return ticketList
      .filter((ticket) => {
        if (transfer.noTransfers && ticket.segments[0].stops.length === 0) {
          return ticket;
        }
        if (transfer.oneTransfer && ticket.segments[0].stops.length === 1) {
          return ticket;
        }
        if (transfer.twoTransfers && ticket.segments[0].stops.length === 2) {
          return ticket;
        }
        if (transfer.threeTransfers && ticket.segments[0].stops.length === 3) {
          return ticket;
        }
      })
      .sort((a, b) => {
        if (filter.cheap) {
          return a.price - b.price;
        }
        if (filter.swift) {
          return (
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration)
          );
        }
        if (filter.optimal) {
          return a.price - b.price;
        }
      })
      .slice(0, visibleAmount);
  }
);
