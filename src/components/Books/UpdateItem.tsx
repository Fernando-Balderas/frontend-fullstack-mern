import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../helpers/axios";
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

type TForm = {
  title: string;
  author: string;
  description: string;
};

const UpdateItem: React.FC<TUpdateItemProps> = (props) => {
  const { isNewItem } = props;
  const { id } = useParams<TParams>();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: TForm) => {
    const itemInfo = {
      title: data.title,
      author: data.author,
      description: data.description,
    };

    if (isNewItem) {
      axios.post("", itemInfo).then((res) => {
        console.log(res.data);
        // TODO: Improve create book
      });
    } else {
      axios
        .post(`/update/${id}`, itemInfo)
        .then((res) => console.log(res.data));
    }

    history.push("/list");
  };

  return (
    <Container>
      <Col xs="8" sm="8">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h3>{isNewItem ? "New Book" : "Update Book"}</h3>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Book Title"
              {...register("title", { required: true })}
              isInvalid={!!errors.title}
            />
            {errors.title && (
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Book Author"
              {...register("author", { required: true })}
              isInvalid={!!errors.author}
            />
            {errors.author && (
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Book Description"
              {...register("description", { required: true })}
              isInvalid={!!errors.description}
            />
            {errors.description && (
              <Form.Control.Feedback type="invalid">
                This field is required
              </Form.Control.Feedback>
            )}
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
