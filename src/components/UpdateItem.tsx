import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

type TUpdateItemProps = {
  isNewItem: boolean;
} & typeof UpdateItemDefaults;

const UpdateItemDefaults = {
  isNewItem: false,
};

type TParams = {
  id: string;
};

const UpdateItem: React.FC<TUpdateItemProps> = (props) => {
  const { isNewItem } = props;
  const { id } = useParams<TParams>();
  const history = useHistory();

  const [itemTitle, setItemTitle] = useState("");
  const [itemAuthor, setItemAuthor] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  // Function to change state title value
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemTitle(e.target.value);
  };

  // Function to change state author value
  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemAuthor(e.target.value);
  };

  // Function to change state description value
  const onChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemDescription(e.target.value);
  };

  // Function to save changes in actual book
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemInfo = {
      title: itemTitle,
      author: itemAuthor,
      description: itemDescription,
    };

    if (isNewItem) {
      axios
        .post("https://ancient-reaches-30470.herokuapp.com/api/books", itemInfo)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
      // TODO: Fix not showing new element
    } else {
      axios
        .post(
          `https://ancient-reaches-30470.herokuapp.com/api/books/update/${id}`,
          itemInfo
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
    setItemTitle("");
    setItemAuthor("");
    setItemDescription("");

    history.push("/list");
  };

  return (
    <Container>
      <Col xs="8" sm="8">
        <Form onSubmit={(e) => onSubmit(e)}>
          <h3>{isNewItem ? "New Book" : "Update Book"}</h3>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="New Book Title"
              value={itemTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeTitle(e)
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="New Book Author"
              value={itemAuthor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeAuthor(e)
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="New Book Description"
              value={itemDescription}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeDescription(e)
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

UpdateItem.defaultProps = UpdateItemDefaults;

export default UpdateItem;
