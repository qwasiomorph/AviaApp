import { useSelector, useDispatch } from 'react-redux';
import { commenceSearch, initiateSearch, setVisibleAmount } from '../../store/store';
import { selectIsFetching, selectIsShouldSearchStop, selectTickets, selectVisibleAmount } from '../../store/selectors';
import Ticket from '../Ticket';
import ErrorWrapper from '../ErrorWrapper';
import SpinnerWrapper from '../SpinnerWrapper';

import style from './TicketList.module.scss';

import { amountOfTicketsAtTime, nothingFoundMsg } from '../../utils/consts';
import { useEffect } from 'react';

const TicketList = () => {
  const dispatch = useDispatch();
  const ticketList = useSelector(selectTickets);
  const ticketsAmount = useSelector(selectVisibleAmount);
  const isLoading = useSelector(selectIsFetching);
  const isStopped = useSelector(selectIsShouldSearchStop);

  const handleShowMore = (e) => {
    e.preventDefault();
    dispatch(setVisibleAmount(ticketsAmount + amountOfTicketsAtTime));
  };

  useEffect(() => {
    initiateSearch();
  });

  useEffect(() => {
    if (!isStopped) {
      if (!isLoading) {
        commenceSearch();
      }
    }
  }, [isStopped, isLoading]);

  // console.log('stop: ', isStopped, 'loading: ', isLoading);

  return (
    <>
      {ticketList.length > 0 ? (
        <div className={style.ticketList}>
          {(ticketList || []).map((ticket, index) => (
            <Ticket key={index} info={ticket} />
          ))}

          <button onClick={handleShowMore} className={style.loadButton} type="button">
            Показать еще 5 билетов!
          </button>
        </div>
      ) : (
        !isLoading && <ErrorWrapper errorMessage={nothingFoundMsg} info={true} />
      )}
      {isLoading && <SpinnerWrapper />}
    </>
  );
};

export default TicketList;
