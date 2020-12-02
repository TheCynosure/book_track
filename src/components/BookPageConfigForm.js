import React from 'react';
import {Collapse, Button, FormControl, ListGroup, Container, Row, Col, ProgressBar, InputGroup} from 'react-bootstrap';
import {PencilSquare, Check, Trash} from 'react-bootstrap-icons';

function handleProgressChange(event, props) {
  if (isNaN(Number(event.target.value))) {
    return;
  }
  if (Number(event.target.value) > props.length) {
    event.target.value = props.length;
  }
  props.updateBook(Number(event.target.value), props.length);
}

function handleMaxChange(event, props) {
  if (isNaN(Number(event.target.value))) {
    return;
  }
  props.updateBook(props.current_page, Number(event.target.value));
}

export default function BookPageConfigForm(props) {
  return (
    <Container className="w-100 p-0">
      <hr></hr>
      <Row className="pt-3 pb-3">  
        <Col sm={3}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                Page #
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={props.current_page}
              onChange={(event) => handleProgressChange(event, props)}
            />
          </InputGroup>
        </Col>
        <Col sm={3}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                Max Page #
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder={props.length}
              onChange={(event) => handleMaxChange(event, props)}
            />
          </InputGroup>
        </Col>
        <Col md={{ span: 1, offset: 5}}>
          <Button
            variant="danger"
            className="btn-sm"
            onClick={() => props.removeBook()}
          >
            <Trash/> 
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
