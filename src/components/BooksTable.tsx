import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import IBook from "../interfaces/book";

type FnRemoveBook = (id: string, index: number) => void;

type IBooksTableProps = {
  books: IBook[];
  loading: boolean;
  currentPage: number;
  booksPerPage: number;
  allowDeletions: boolean;
  handleRemoveBook: FnRemoveBook;
} & typeof BooksTableDefaults;

const BooksTableDefaults = {
  books: [] as IBook[],
  loading: false,
  currentPage: 1,
  booksPerPage: 1,
  allowDeletions: false,
  handleRemoveBook: (id: string, index: number) => {},
};

const BooksTable: React.FC<IBooksTableProps> = (props) => {
  const {
    books,
    loading,
    currentPage,
    booksPerPage,
    allowDeletions,
    handleRemoveBook,
  } = props;

  if (loading) return <div>Loading...</div>;

  // calculate the correct index according to the actual page
  let currentNumber = (currentPage - 1) * booksPerPage;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, i) => {
          return (
            <tr key={currentNumber + i}>
              <td>{currentNumber + i + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>
                {allowDeletions ? (
                  <Button
                    id="btnRemove"
                    type="button"
                    variant="danger"
                    onClick={(e) =>
                      window.confirm("Confirm to remove this Book?") &&
                      handleRemoveBook(book._id, currentNumber + i)
                    }
                  >
                    Remove
                  </Button>
                ) : (
                  <Button href={"/update/" + book._id}>Edit</Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

BooksTable.defaultProps = BooksTableDefaults;

export default BooksTable;
