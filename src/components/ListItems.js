import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const Book = (props) => {
    return(
        <tr id={props.i}>
            <td>{props.i+1}</td>
            <td>{props.book.title}</td>
            <td>{props.book.author}</td>
            <td>{props.book.description}</td>
            <td>
                <Button href={"/update/"+props.book._id}>Edit</Button>
            </td>
        </tr>
    )
}

export class ListItems extends Component {

    constructor(props) {
        super(props);
        this.state = {books: []}
    }

    async componentDidMount() {
        await axios.get('/api/books')
            .then(res => {this.setState({books: res.data})})
            .catch(err => console.log(err));
    }

    async componentDidUpdate() {
        await axios.get('/api/books')
            .then(res => {this.setState({books: res.data})})
            .catch(err => console.log(err));
    }

    booksList() {
        console.log('this.state.books')
        console.log(this.state.books)
        return this.state.books.map( (current, i) => {
            return (
                <Book book={current} i={i} key={i}></Book>
            );
        });
    }

    render() {
        return (
            <Container fluid>
                <h3>List of Books</h3>
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
                    { this.booksList() }
                </tbody>
                </Table>
            </Container>
        )
    }
}

export default ListItems
