import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

export class Home extends Component {
    render() {
        return (
            <Container>
                <h3>Description</h3>
                <p>This app is a simple management system for books implemented by the MERN stack (MongoDB, Express, React, and Node.js.). It allows CRUD operations over the books that are stored in an online database.
                    To navigate the app use the links above. Those links are described below.
                    </p>
                <ul>
                    <li>Books: The inventory of actual books in the database. Also can modify a book with the button edit.</li>
                    <li>Create: Opens a new window to add the information of the new book and store it into the database.</li>
                    <li>Remove Books: Unlocks the remove operation, so you can remove as books as you want.</li>
                </ul> 
                <h3>Deployment</h3>
                <ul>
                    <li>MongoDB: Mongo Atlas</li>
                    <li>Node and Express: Heroku</li>
                    <li>React (This Webapp): Netlify</li>
                </ul>
                <h3>About Me</h3>
                <p>Project created by Fernando Balderas. A graduate from MS program at Cinvestav Tamaulipas. This is my first MERN web app.</p>
            </Container>
        )
    }
}

export default Home
