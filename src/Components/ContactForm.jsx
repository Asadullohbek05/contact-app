import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";

class ContactForm extends Component {
  render() {
    const { validated, handleSubmit, handleValue, contact, isEditContact } =
      this.props;

    return (
      <Container>
        <Form
          noValidate
          className="mt-3 w-75 mx-auto"
          // style={{ width: "75%" }}
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="First Name"
              onChange={handleValue}
              value={contact.firstName}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Fill!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              required
              placeholder="Last Name"
              onChange={handleValue}
              value={contact.lastName}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Fill!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              required
              placeholder="Phone Number"
              onChange={handleValue}
              value={contact.phoneNumber}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Fill!
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="relationship">
            <Form.Label>Choose Relationship</Form.Label>
            <Form.Select
              className="cursor-pointer"
              onChange={handleValue}
              value={contact.relatives}
            >
              <option value="Family">Family</option>
              <option value="Friends">Friends</option>
              <option value="Relatives">Relatives</option>
              <option value="Other">Other</option>
            </Form.Select>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please Fill!
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" className="w-50 d-block mx-auto">
            {isEditContact ? "Save Contact" : "Add Contact"}
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ContactForm;
