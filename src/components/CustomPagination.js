import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function CustomPagination({booksPerPage, totalBooks, paginate, currentPage}) {

  // const pageNumbers = [];
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    // pageNumbers.push(i);
    pages.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination>
      {pages}
    </Pagination>
  )
}

export default CustomPagination