import { Alert, Space } from 'antd';
import style from './ErrorWrapper.module.scss';
import PropTypes from 'prop-types';

const ErrorWrapper = ({ errorMessage, info = false }) => {
  return (
    <div className={style.errorWrap}>
      <Space direction="vertical" style={{ width: '433px' }}>
        <Alert
          message={info ? '' : 'Ошибка'}
          description={errorMessage}
          type={info ? 'info' : 'error'}
          showIcon={!info}
        />
      </Space>
    </div>
  );
};

ErrorWrapper.defaultProps = {
  errorMessage: '',
  info: false,
  loading: false,
};

ErrorWrapper.propTypes = {
  errorMessage: PropTypes.string,
  info: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ErrorWrapper;
