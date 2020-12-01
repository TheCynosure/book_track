import React from 'react';
import {Container} from 'react-bootstrap';
import {Book} from 'react-bootstrap-icons';

class FloatingBookTitle extends React.Component {
  render() {
    return (
      <Container className="mt-5 mb-5">
        <h1 className="text-center">
          <Book />
        </h1>
      </Container>
    );
  }
}

export default FloatingBookTitle;
