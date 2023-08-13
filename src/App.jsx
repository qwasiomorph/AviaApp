import logo from "./assets/logo.svg";
import style from "./App.module.scss";

import Transfer from "./Transfer";
import TicketList from "./TicketList";
import { Provider } from "react-redux";
import { store, initiateSearch } from "./store/store";
import { useEffect } from "react";
import TickerListFilter from "./TicketListFilter/TickerListFilter";

function App() {
  useEffect(() => {
    initiateSearch();
  }, []);
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
