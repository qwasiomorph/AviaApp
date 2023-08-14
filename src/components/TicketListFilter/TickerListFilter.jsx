import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setFilter } from '../../store/store';

import style from './TicketListFilter.module.scss';

const TickerListFilter = () => {
  const { cheap, swift, optimal } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    dispatch(setFilter(event.target.id));
  };

  return (
    <div className={style.ticketListFilter}>
      <div className={[style.TicketList__member, cheap && style.activeFilter].join(' ')}>
        <label>
          <input
            className="hidden"
            type="radio"
            name="ticketFilter"
            id="FILTER_CHEAP"
            checked={cheap}
            onChange={handleChange}
          />
          Самый дешевый
        </label>
      </div>
      <div className={[style.TicketList__member, swift && style.activeFilter].join(' ')}>
        <label>
          <input
            className="hidden"
            type="radio"
            name="ticketFilter"
            id="FILTER_SWIFT"
            checked={swift}
            onChange={handleChange}
          />
          Самый быстрый
        </label>
      </div>
      <div className={[style.TicketList__member, optimal && style.activeFilter].join(' ')}>
        <label>
          <input
            className="hidden"
            type="radio"
            name="ticketFilter"
            id="FILTER_OPTIMAL"
            checked={optimal}
            onChange={handleChange}
          />
          Оптимальный
        </label>
      </div>
    </div>
  );
};

export default TickerListFilter;
