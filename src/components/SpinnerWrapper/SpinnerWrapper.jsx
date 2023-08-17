import { Spin } from 'antd';
import style from './SpinnerWrapper.module.scss';

const SpinnerWrapper = () => {
  return (
    <div className={style.wrapper}>
      <Spin />
    </div>
  );
};

export default SpinnerWrapper;
