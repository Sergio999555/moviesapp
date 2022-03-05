import React from "react";
import { Pagination } from "antd";
import "../pagination/pagination.css";

const PaginationPage = ({ currentPages, totalPages, switchPage }) => {
  return (
    <div className="pagination_wrap">
      <Pagination
        onChange={switchPage}
        total={totalPages * 10}
        className="pagiantion_button"
        current={currentPages}
        defaultCurrent={1}
        showSizeChanger={false}
      />
    </div>
  );
};
export default PaginationPage;
