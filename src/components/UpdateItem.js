import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class UpdateItem extends Component {

    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            updateItemTitle: '',
            updateItemAuthor: '',
            updateItemDescription: '',
        }
    }

    componentDidMount() {
        // axios.get(`https://ancient-reaches-30470.herokuapp.com/api/books/${this.props.match.params.id}`, )
        //     .then(res => {
        //         this.setState({
        //             updateItemTitle: res.data.updateItemTitle,
        //             updateItemAuthor: res.data.updateItemAuthor,
        //             updateItemDescription: res.data.updateItemDescription,
        //         })
        //     })
        //     .catch(err => console.log(err));
    }

    // Function to change state title value
    onChangeTitle(e) {
        this.setState({
            updateItemTitle: e.target.value
        });
    }

    // Function to change state author value
    onChangeAuthor(e) {
        this.setState({
            updateItemAuthor: e.target.value
        });
    }

    // Function to change state description value
    onChangeDescription(e) {
        this.setState({
            updateItemDescription: e.target.value
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const updatedItem = {
            title: this.state.updateItemTitle,
            author: this.state.updateItemAuthor,
            description: this.state.updateItemDescription,
        }

        await axios.post(`https://ancient-reaches-30470.herokuapp.com/api/books/update/${this.props.match.params.id}`, updatedItem)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        
        this.props.history.push('/list');
    }

    render() {
        return (
            <Container>
            <Col xs="8" sm="8">
                <Form onSubmit={this.onSubmit}>
                    <h3>Update Book</h3>
                    <Form.Group controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="New Book Title" 
                        value={this.state.updateItemTitle}
                        onChange={this.onChangeTitle}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="New Book Author" 
                        value={this.state.updateItemAuthor}
                        onChange={this.onChangeAuthor}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="New Book Description" 
                        value={this.state.updateItemDescription}
                        onChange={this.onChangeDescription}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Book
                    </Button>
                </Form>
            </Col>
            </Container>
        )
    }
}

export default UpdateItem
