import "./Pagination.scss";
import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import { useState } from "react";

export interface IPaginationProps {
  PER_PAGE: number;
  booksAmount: number;
  setPage: (selectedPage: number) => void;
  handlePageClick: ({ selected }: { selected: number }) => void;
}

const Pagination: FC<IPaginationProps> = ({
  PER_PAGE,
  booksAmount,
  setPage,
  handlePageClick,
}) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      pageCount={Math.ceil(booksAmount / PER_PAGE)}
      onPageChange={handlePageClick}
      containerClassName={"paginatio"}
      previousLinkClassName={"paginatio__link"}
      nextLinkClassName={"paginatio__link"}
      disabledLinkClassName={"paginatio__link--disabled"}
      activeLinkClassName={"paginatio__link--active"}
    />
  );
};

export default Pagination;
