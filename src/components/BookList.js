import React from 'react';
import {Container, Row, Col, ListGroup, InputGroup} from 'react-bootstrap';
import BookListEntry from './BookListEntry';

export default function BookList(props) {
  // If active then render the extra information.
  return (
    <Container>
      <Row>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {props.books.map((book, index) => 
              <BookListEntry
                book={book}
                updateBook={(current_page, length) => props.updateBook(book.title)(current_page, length)}
                removeBook={() => props.removeBook(book.title)}
                finishBook={() => props.finishBook(book.title)}
                key={book.title}
                disabled={props.disabled}
              />
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

