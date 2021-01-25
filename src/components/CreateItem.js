import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CreateItem() {
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemAuthor, setNewItemAuthor] = useState('');
    const [newItemDescription, setNewItemDescription] = useState('');
    const history = useHistory();

    
    // Function to change state title value
    const onChangeTitle = (e) => {
        setNewItemTitle(e.target.value);
    }

    // Function to change state author value
    const onChangeAuthor = (e) => {
        setNewItemAuthor(e.target.value);
    }

    // Function to change state description value
    const onChangeDescription = (e) => {
        setNewItemDescription(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const newItem = {
            title: newItemTitle,
            author: newItemAuthor,
            description: newItemDescription,
        }

        await axios.post('https://ancient-reaches-30470.herokuapp.com/api/books', newItem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        setNewItemTitle('');
        setNewItemAuthor('');
        setNewItemDescription('');

        history.push('/list');
    }

    return (
        <Container>
        <Col xs="8" sm="8">
            <Form onSubmit={(e) => onSubmit(e)}>
                <h3>Create Book</h3>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="New Book Title" 
                    value={newItemTitle}
                    onChange={(e) => onChangeTitle(e)}/>
                </Form.Group>
                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="New Book Author" 
                    value={newItemAuthor}
                    onChange={(e) => onChangeAuthor(e)}/>
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="New Book Description" 
                    value={newItemDescription}
                    onChange={(e) => onChangeDescription(e)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Col>
        </Container>
    )
}

export default CreateItem
