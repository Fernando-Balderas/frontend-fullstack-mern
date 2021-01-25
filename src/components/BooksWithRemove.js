import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const BooksWithRemove = ({books, loading, currentPage, booksPerPage, handleRemoveBook}) => {

  if(loading) {
    return <div>Loading...</div>
  }

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
          return(
            <tr key={currentNumber + i}>
              <td>{currentNumber + i + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td>
                <Button variant="danger" type="button" id='btnRemove' 
                    onClick={e => 
                        window.confirm("Confirm to remove this Book?") &&                    
                        handleRemoveBook(book._id, currentNumber + i)
                    }>Remove
                </Button>  
              </td>
            </tr>
          )
          })}
      </tbody>
    </Table>  
  )
}

export default BooksWithRemove;