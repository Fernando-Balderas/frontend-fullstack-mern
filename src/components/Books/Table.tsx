import React from "react";
import Table from "react-bootstrap/Table";
import TableRow from "./Row";
import IBook from "../../interfaces/book";
import { TFnRemoveBook, TFnRemoveBookDefault } from "../../interfaces/book";

type IBooksTableProps = {
  books: IBook[];
  loading: boolean;
  currentPage: number;
  booksPerPage: number;
  allowDeletions: boolean;
  handleRemoveBook: TFnRemoveBook;
} & typeof BooksTableDefaults;

const BooksTableDefaults = {
  books: [] as IBook[],
  loading: false,
  currentPage: 1,
  booksPerPage: 1,
  allowDeletions: false,
  handleRemoveBook: TFnRemoveBookDefault,
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

  let currentRowIndex = (currentPage - 1) * booksPerPage;

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
            <TableRow
              key={currentRowIndex + i}
              index={currentRowIndex + i}
              book={book}
              allowDeletions={allowDeletions}
              handleRemoveBook={handleRemoveBook}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

BooksTable.defaultProps = BooksTableDefaults;

export default BooksTable;
