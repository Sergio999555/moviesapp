import React from "react";
import { Spin, Space } from "antd";
import "antd/dist/antd.min.css";
import "../spinner/spinner.css";

const Spinner = () => {
  return (
    <div className="spinner__wrap">
      <Space className="spinner__space">
        <Spin size="large" />
      </Space>
    </div>
  );
};

export default Spinner;
