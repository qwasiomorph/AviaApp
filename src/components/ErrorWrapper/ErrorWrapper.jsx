import { Alert, Space } from "antd";
import style from "./ErrorWrapper.module.scss";
import PropTypes from "prop-types";

const ErrorWrapper = ({ errorMessage, info = false, loading }) => {
  return (
    <div className={style.errorWrap}>
      <Space direction="vertical" style={{ width: "433px" }}>
        <Alert
          message={info ? "" : loading ? "" : "Ошибка"}
          description={errorMessage}
          type={info || loading ? "info" : "error"}
          showIcon={!(info || loading)}
        />
      </Space>
    </div>
  );
};

ErrorWrapper.defaultProps = {
  errorMessage: "",
  info: false,
  loading: false,
};

ErrorWrapper.propTypes = {
  errorMessage: PropTypes.string,
  info: PropTypes.bool,
  loading: PropTypes.bool,
};

export default ErrorWrapper;
