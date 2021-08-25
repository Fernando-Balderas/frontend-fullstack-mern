import React from "react";
import Button from "react-bootstrap/Button";
import IBook from "../../interfaces/book";
import { TFnRemoveBook, TFnRemoveBookDefault } from "../../interfaces/book";

type TBooksRowProps = {
  index: number;
  book: IBook;
  allowDeletions: boolean;
  handleRemoveBook: TFnRemoveBook;
} & typeof BooksRowDefaults;

const BooksRowDefaults = {
  index: 0,
  book: {} as IBook,
  allowDeletions: false,
  handleRemoveBook: TFnRemoveBookDefault,
};

const BooksRow: React.FC<TBooksRowProps> = (props) => {
  const { index, book, allowDeletions, handleRemoveBook } = props;
  return (
    <tr>
      <td>{index + 1}</td>
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
              handleRemoveBook(book._id, index)
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
};

BooksRow.defaultProps = BooksRowDefaults;

export default BooksRow;
