import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import BooksTable from "./Table";
import CustomPagination from "../CustomPagination";
import axios from "../../helpers/axios";
import { TFnRemoveBook, TFnPaginate } from "../../interfaces/book";

type TBooksProps = {
  allowDeletions: boolean;
} & typeof BooksDefaults;

const BooksDefaults = {
  allowDeletions: false,
};

const Books: React.FC<TBooksProps> = (props) => {
  const { allowDeletions } = props;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      await axios.get("").then((res) => {
        setBooks(res.data);
      });
      setLoading(false);
    };
    fetchBooks();
  }, [setBooks]);

  // get the current page of books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // update the number of actual page
  const paginate: TFnPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // const onCreateBook: TFnCreateBook = (book) => {} // TODO: Use redux to improve this

  // remove the book in position index and update the state books
  const removeBookFromState = (index: number) => {
    const booksCopy = books.slice();
    booksCopy.splice(index, 1);
    setBooks(booksCopy);
  };

  // handle onclick in remove button and remove book in database
  const onRemoveBook: TFnRemoveBook = (id, index) => {
    const payload = {
      data: {
        id: id,
      },
    };
    axios
      .delete("", payload)
      .then((res) => {
        console.log(res);
        removeBookFromState(index);
      });
  };

  return (
    <Container fluid>
      <h3>List of Books</h3>
      <BooksTable
        books={currentBooks}
        loading={loading}
        currentPage={currentPage}
        booksPerPage={booksPerPage}
        allowDeletions={allowDeletions}
        onRemoveBook={onRemoveBook}
      />
      <CustomPagination
        totalBooks={books.length}
        currentPage={currentPage}
        booksPerPage={booksPerPage}
        paginate={paginate}
      />
    </Container>
  );
};

Books.defaultProps = BooksDefaults;

export default Books;
