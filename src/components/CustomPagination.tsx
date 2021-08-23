import React from "react";
import Pagination from "react-bootstrap/Pagination";

type TFnPaginate = (pageNumber: number) => void;

type TCustomPaginationProps = {
  totalBooks: number;
  currentPage: number;
  booksPerPage: number;
  paginate: TFnPaginate;
} & typeof CustomPaginationDefaults;

const CustomPaginationDefaults = {
  totalBooks: 1,
  currentPage: 1,
  booksPerPage: 1,
  paginate: (pageNumber: number) => {},
};

const CustomPagination: React.FC<TCustomPaginationProps> = (props) => {
  const { totalBooks, currentPage, booksPerPage, paginate } = props;
  let pages = [];

  for (let i = 1, n = Math.ceil(totalBooks / booksPerPage); i <= n; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => paginate(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return <Pagination>{pages}</Pagination>;
};

CustomPagination.defaultProps = CustomPaginationDefaults;

export default CustomPagination;
