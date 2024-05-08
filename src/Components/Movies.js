import { Card, ListGroup, Button } from 'react-bootstrap';

export default function Movies(props) {
  return (
    <ListGroup as="ul">
      {props.movies.map((m) => {
        return (
          <Card key={m.id} as="li" className="mb-2">
            <Card.Header as="h5">{m.title}</Card.Header>
            <Card.Body>
              <Card.Text>{m.summary}</Card.Text>
              <Card.Text className="fw-bold">{m.releaseDate}</Card.Text>
              <Button
                variant=""
                className="btn-outline-danger"
                onClick={() => props.onDeleteMovie(m.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </ListGroup>
  );
}
