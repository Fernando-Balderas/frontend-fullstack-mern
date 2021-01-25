import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Books from './Books';
import CustomPagination from './CustomPagination';
import axios from 'axios';

function ListItems() {

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

    return (
        <Container fluid>
            <h3>List of Books</h3>
            <Books books={currentBooks} loading={loading} 
                currentPage={currentPage} booksPerPage={booksPerPage} />
            <CustomPagination booksPerPage={booksPerPage} totalBooks={books.length} 
                paginate={paginate} currentPage={currentPage} />
        </Container>
    )
}

export default ListItems
