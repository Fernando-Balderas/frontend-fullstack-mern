import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


export class RemoveItem extends Component {
    
    constructor(props) {
        super(props);

        this.handleRemoveBook = this.handleRemoveBook.bind(this);

        this.state = {books: []}
    }

    async componentDidMount() {
        await axios.get('/api/books')
            .then(res => {this.setState({books: res.data})})
            .catch(err => console.log(err));
    }

    booksList() {
        return this.state.books.map( (current, i) => {
            return (
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{current.title}</td>
                    <td>{current.author}</td>
                    <td>{current.description}</td>
                    <td>
                        <Button variant="danger" type="button" id='btnRemove' 
                            onClick={
                                e => 
                                window.confirm("Confirm to remove this Book?") &&                    
                                this.handleRemoveBook(current._id, i)
                            }>Remove
                        </Button>  
                    </td>
                </tr>
            );
        });
    }

    onRemoveBook(idx) {
        // update the books list in state
        const booksCopy = this.state.books.slice();
        booksCopy.splice(idx, 1);
        this.setState({books: booksCopy});
    }

    async handleRemoveBook(id, idx) {
        const removeItem = {id: id}
        await axios.delete('https://ancient-reaches-30470.herokuapp.com/api/books/', {data: removeItem})
            .then(res => {
                console.log(res);
                this.onRemoveBook(idx);
            })
            .catch(err => console.log(err));
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

export default RemoveItem
