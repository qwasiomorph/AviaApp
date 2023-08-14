import { useSelector, useDispatch } from 'react-redux';
import { selectTransfer, setTransfer, setVisibleAmount } from '../../store/store';

import style from './Transfer.module.scss';
import { amountOfTicketsAtTime } from '../../utils/consts';

const Transfer = () => {
  const { noTransfers, oneTransfer, twoTransfers, threeTransfers } = useSelector(selectTransfer);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    let newValue = event.target.value === 'true';
    dispatch(setTransfer({ key: event.target.id, value: !newValue }));
    dispatch(setVisibleAmount(amountOfTicketsAtTime));
  };

  const checkedAll = noTransfers && oneTransfer && twoTransfers && threeTransfers;

  return (
    <div className={style.transferCard}>
      <h4 className={style.mainLabel}>Количество пересадок</h4>

      <label className={[style.checkBoxWrap, checkedAll && style.checkBoxActive].join(' ')}>
        <input className="hidden" type="checkbox" name="All" id="" value={checkedAll} onClick={handleChange} />
        Все
      </label>
      <label className={[style.checkBoxWrap, noTransfers && style.checkBoxActive].join(' ')}>
        <input className="hidden" type="checkbox" name="0tr" id="0" value={noTransfers} onClick={handleChange} />
        Без пересадок
      </label>
      <label className={[style.checkBoxWrap, oneTransfer && style.checkBoxActive].join(' ')}>
        <input className="hidden" type="checkbox" name="1tr" id="1" value={oneTransfer} onClick={handleChange} />1
        пересадка
      </label>
      <label className={[style.checkBoxWrap, twoTransfers && style.checkBoxActive].join(' ')}>
        <input className="hidden" type="checkbox" name="2tr" id="2" value={twoTransfers} onClick={handleChange} />2
        пересадки
      </label>
      <label className={[style.checkBoxWrap, threeTransfers && style.checkBoxActive].join(' ')}>
        <input className="hidden" type="checkbox" name="3tr" id="3" value={threeTransfers} onClick={handleChange} />3
        пересадки
      </label>
    </div>
  );
};

export default Transfer;
