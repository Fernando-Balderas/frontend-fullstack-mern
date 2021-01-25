import React, { useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UpdateItem() {
    
    const [updateItemTitle, setUpdateItemTitle] = useState('');
    const [updateItemAuthor, setUpdateItemAuthor] = useState('');
    const [updateItemDescription, setUpdateItemDescription] = useState('');
    const history = useHistory();
    const { id } = useParams();

    // componentDidMount() {
    //     // axios.get(`https://ancient-reaches-30470.herokuapp.com/api/books/${this.props.match.params.id}`, )
    //     //     .then(res => {
    //     //         this.setState({
    //     //             updateItemTitle: res.data.updateItemTitle,
    //     //             updateItemAuthor: res.data.updateItemAuthor,
    //     //             updateItemDescription: res.data.updateItemDescription,
    //     //         })
    //     //     })
    //     //     .catch(err => console.log(err));
    // }

    // Function to change state title value
    const onChangeTitle = (e) => {
        setUpdateItemTitle(e.target.value);
    }

    // Function to change state author value
    const onChangeAuthor = (e) => {
        setUpdateItemAuthor(e.target.value);
    }

    // Function to change state description value
    const onChangeDescription = (e) => {
        setUpdateItemDescription(e.target.value);
    }

    // Function to save changes in actual book
    const onSubmit = async (e) => {
        e.preventDefault();

        const updatedItem = {
            title: updateItemTitle,
            author: updateItemAuthor,
            description: updateItemDescription,
        }

        await axios.post(`https://ancient-reaches-30470.herokuapp.com/api/books/update/${id}`, updatedItem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        history.push('/list');
    }

    return (
        <Container>
        <Col xs="8" sm="8">
            <Form onSubmit={(e) => onSubmit(e)}>
                <h3>Update Book</h3>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="New Book Title" 
                    value={updateItemTitle}
                    onChange={(e) => onChangeTitle(e)}/>
                </Form.Group>
                <Form.Group controlId="formBasicAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="New Book Author" 
                    value={updateItemAuthor}
                    onChange={(e) => onChangeAuthor(e)}/>
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={2} placeholder="New Book Description" 
                    value={updateItemDescription}
                    onChange={(e) => onChangeDescription(e)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update Book
                </Button>
            </Form>
        </Col>
        </Container>
    )
}

export default UpdateItem
