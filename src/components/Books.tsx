import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import BooksTable from "./BooksTable";
import CustomPagination from "./CustomPagination";
import axios from "axios";

type TFnRemoveBook = (id: string, index: number) => void;
type TFnPaginate = (pageNumber: number) => void;

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
      await axios
        .get("https://ancient-reaches-30470.herokuapp.com/api/books")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => console.log(err));
      setLoading(false);
    };
    fetchBooks();
  }, []);

  // get the current page of books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // update the number of actual page
  const paginate: TFnPaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // remove the book in position index and update the state books
  const onRemoveBook = (index: number) => {
    const booksCopy = books.slice();
    booksCopy.splice(index, 1);
    setBooks(booksCopy);
  };

  // handle onclick in remove button and remove book in database
  const handleRemoveBook: TFnRemoveBook = (id, index) => {
    const payload = {
      data: {
        id: id,
      },
    };
    axios
      .delete("https://ancient-reaches-30470.herokuapp.com/api/books", payload)
      .then((res) => {
        console.log(res);
        onRemoveBook(index);
      })
      .catch((err) => console.log(err));
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
        handleRemoveBook={handleRemoveBook}
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
