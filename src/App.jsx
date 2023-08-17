import logo from './assets/logo.svg';
import style from './App.module.scss';

import Transfer from './components/Transfer';
import TicketList from './components/TicketList';
import { Provider } from 'react-redux';
import { store } from './store/store';
import TickerListFilter from './components/TicketListFilter/TickerListFilter';

function App() {
  return (
    <Provider store={store}>
      <div className={style.mainWrapper}>
        <div className={style.logoWrapper}>
          <img src={logo} alt="app_logo" width={70} height={70} />
        </div>
        <div className={style.ticketWrapper}>
          <Transfer />
          <div className={style.listWrapper}>
            <TickerListFilter />
            <TicketList />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App;
