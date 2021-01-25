import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import BooksWithRemove from './BooksWithRemove';
import CustomPagination from './CustomPagination';
import axios from 'axios';


function RemoveItem() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            await axios.get('https://ancient-reaches-30470.herokuapp.com/api/books')
                .then(res => {
                    setBooks(res.data);
                })
                .catch(err => console.log(err));
            setLoading(false);
        }
        fetchBooks();
    }, []);

    // get the current page of books
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    // update the number of actual page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // remove the book in position idx and update the state books
    const onRemoveBook = (idx) => {
        const booksCopy = books.slice();
        booksCopy.splice(idx, 1);
        setBooks(booksCopy);
    }

    // handle onclick in remove button and remove book in database
    const handleRemoveBook = async (id, idx) => {
        const removeItem = {id: id}
        await axios.delete('https://ancient-reaches-30470.herokuapp.com/api/books', {data: removeItem})
            .then(res => {
                console.log(res);
                onRemoveBook(idx);
            })
            .catch(err => console.log(err));
    }

    return (
        <Container fluid>
            <h3>List of Books</h3>
            <BooksWithRemove books={currentBooks} loading={loading} 
                currentPage={currentPage} booksPerPage={booksPerPage} 
                handleRemoveBook={handleRemoveBook}/>
            <CustomPagination booksPerPage={booksPerPage} totalBooks={books.length} 
                paginate={paginate} currentPage={currentPage} />
        </Container>
    )
}

export default RemoveItem
