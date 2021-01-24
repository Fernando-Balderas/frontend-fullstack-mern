import React, { Component } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class CreateItem extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // Books: [],
            newItemTitle: '',
            newItemAuthor: '',
            newItemDescription: '',
        }
    }

    // Function to change state title value
    onChangeTitle(e) {
        this.setState({
            newItemTitle: e.target.value
        });
    }

    // Function to change state author value
    onChangeAuthor(e) {
        this.setState({
            newItemAuthor: e.target.value
        });
    }

    // Function to change state description value
    onChangeDescription(e) {
        this.setState({
            newItemDescription: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submited:`);
        console.log(`Title: ${this.state.newItemTitle}`);
        console.log(`Author: ${this.state.newItemAuthor}`);
        console.log(`Description: ${this.state.newItemDescription}`);

        const newItem = {
            title: this.state.newItemTitle,
            author: this.state.newItemAuthor,
            description: this.state.newItemDescription,
        }

        // await 
        axios.post('/api/books', newItem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState = {
            // Books: [], 
            newItemTitle: '',
            newItemAuthor: '',
            newItemDescription: '',
        }

        this.props.history.push('/list');
    }

    render() {
        return (
            <Container>
            <Col xs="8" sm="8">
                <Form onSubmit={this.onSubmit}>
                    <h3>Create Book</h3>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="New Book Title" 
                        value={this.state.newItemTitle}
                        onChange={this.onChangeTitle}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="New Book Author" 
                        value={this.state.newItemAuthor}
                        onChange={this.onChangeAuthor}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="New Book Description" 
                        value={this.state.newItemDescription}
                        onChange={this.onChangeDescription}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
            </Container>
        )
    }
}

export default CreateItem
