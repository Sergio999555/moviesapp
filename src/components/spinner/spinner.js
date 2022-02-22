import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import "../spinner/spinner.css";

const Spinner = () => {
  return <LoadingOutlined className="spinner-space " spin />;
};

export default Spinner;
