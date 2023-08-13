import { Alert, Space } from "antd";
import style from "./ErrorWrapper.module.scss";

const ErrorWrapper = ({ message, info = false, loading }) => {
  return (
    <div className={style.errorWrap}>
      <Space direction="vertical" style={{ width: "433px" }}>
        <Alert
          message={info ? "" : loading ? "" : "Ошибка"}
          description={message}
          type={info || loading ? "info" : "error"}
          showIcon={!(info || loading)}
        />
      </Space>
    </div>
  );
};

export default ErrorWrapper;
