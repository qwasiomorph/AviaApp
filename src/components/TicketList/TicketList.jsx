import { useSelector, useDispatch } from 'react-redux';
import { selectTickets, selectVisibleAmount, setVisibleAmount } from '../../store/store';

import Ticket from '../Ticket';
import ErrorWrapper from '../ErrorWrapper';

import style from './TicketList.module.scss';

import { amountOfTicketsAtTime, nothingFoundMsg } from '../../utils/consts';

const TicketList = () => {
  const dispatch = useDispatch();
  const ticketList = useSelector(selectTickets);
  const ticketsAmount = useSelector(selectVisibleAmount);

  const handleShowMore = (e) => {
    e.preventDefault();
    dispatch(setVisibleAmount(ticketsAmount + amountOfTicketsAtTime));
  };

  try {
    if (ticketList.message) {
      throw ticketList;
    }
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
          <ErrorWrapper errorMessage={nothingFoundMsg} info={true} />
        )}
      </>
    );
  } catch (e) {
    return <ErrorWrapper errorMessage={ticketList ? ticketList.message : 'Загрузка'} loading={!ticketList} />;
  }
};

export default TicketList;
