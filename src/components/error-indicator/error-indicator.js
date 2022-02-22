import React from "react";
import { Alert } from "antd";
import "../error-indicator/error-indicator.css";

const ErrorIndicator = () => {
  return (
    <Alert
      className="error__alert"
      message="Error: NOT FOUND :("
      type="error"
    />
  );
};

export default ErrorIndicator;
