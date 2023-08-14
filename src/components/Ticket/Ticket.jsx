import { dateParser, durationParser } from '../../utils/timeParsers';
import style from './Ticket.module.scss';

import PropTypes from 'prop-types';

const Ticket = ({ info }) => {
  const { price, carrier, segments } = info;
  const durations = durationParser(segments);
  const dateTimes = dateParser(segments);
  return (
    <div className={style.ticketCard}>
      <div className={style.header}>
        <h2 className={style.price}>
          {price} {'Р'}
        </h2>
        <img src={carrier} alt={`${carrier} logo`} />
      </div>
      <div className={style.segmentList}>
        {segments.map(({ origin, destination, date, stops }, index) => (
          <div className={style.segment} key={date}>
            <div className={style.route}>
              <div className={style.label}>{`${origin} - ${destination}`}</div>
              <div className={style.content}>{dateTimes[index]}</div>
            </div>
            <div className={style.length}>
              <div className={style.label}>В пути</div>
              <div className={style.content}>{durations[index]}</div>
            </div>
            <div className={style.stops}>
              <div className={style.label}>
                {stops.length} пересад
                {stops.length % 5 === 0 ? 'ок' : stops.length === 1 ? 'ка' : 'ки'}
              </div>
              <div className={style.content}>{stops.join(', ')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Ticket.defaultProps = {
  info: { price: 0, carrier: '', segments: [] },
};

Ticket.propTypes = {
  info: PropTypes.object,
};

export default Ticket;
