import React from 'react';
import {Container, Button, Row, Col} from 'react-bootstrap';
import {PlusSquare} from 'react-bootstrap-icons';

export default class AddBook extends React.Component {
  render() {
    return (
      <Container>
        <Row className="text-center">
          <Col>
            <Button className="mt-3 btn-sm" onClick={() => this.props.handleNewBook()}><PlusSquare/></Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
