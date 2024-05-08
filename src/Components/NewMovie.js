import { memo, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';

const NewMovie = (props) => {
  const titleRef = useRef();
  const summaryRef = useRef();
  const dateRef = useRef();

  function handleAddMovie(event) {
    event.preventDefault();
    props.onAddMovie({
      title: titleRef.current.value,
      summary: summaryRef.current.value,
      releaseDate: dateRef.current.value,
    });
  }

  return (
    <Form onSubmit={handleAddMovie} className="rounded p-3 bg-white">
      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label className="fw-bold">Title</Form.Label>
        <Form.Control type="text" size="sm" ref={titleRef} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className="fw-bold">Summary</Form.Label>
        <Form.Control
          as="textarea"
          size="sm"
          rows={3}
          ref={summaryRef}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDate">
        <Form.Label className="fw-bold">Date</Form.Label>
        <Form.Control type="date" size="sm" ref={dateRef} required />
      </Form.Group>

      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default memo(NewMovie);
