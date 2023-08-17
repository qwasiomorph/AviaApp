import { createSelector } from '@reduxjs/toolkit';

export const selectIsFetching = (state) => state.tickets.isFetching;
export const selectVisibleAmount = (state) => state.tickets.visibleAmount;
export const selectMain = (state) => state.tickets.appIsInitiated;
export const selectFilter = (state) => state.filter.filter;
export const selectTransfer = (state) => state.transfer.transfer;
export const selectIsShouldSearchStop = (state) => state.tickets.stop;

export const selectTickets = createSelector(
  (state) => state.tickets.tickets,
  (state) => state.tickets.visibleAmount,
  (state) => state.filter.filter,
  (state) => state.transfer.transfer,
  (tickets, visibleAmount, filter, transfer) => {
    if (!tickets) {
      return;
    }

    return tickets
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
          return a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
        }
        if (filter.optimal) {
          return (
            a.price / ((a.segments[0].duration + a.segments[1].duration) / 60) -
            b.price / ((b.segments[0].duration + b.segments[1].duration) / 60)
          );
        }
      })
      .slice(0, visibleAmount);
  }
);
