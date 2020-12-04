import React from 'react';
import {Collapse, Button, FormControl, ListGroup, Container, Row, Col, ProgressBar, InputGroup} from 'react-bootstrap';
import {PencilSquare, Check, Trash, Globe} from 'react-bootstrap-icons';

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
      <Row className="pt-3 pb-3 align-items-center">
        <Col
            lg={3}
            md={3}
            sm={3}
            xs={12}
            className="px-0 py-2"
        >
          <InputGroup size="sm">
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
        <Col
            lg={{ span: 4, offset: 1 }}
            md={{ span: 4, offset: 1 }}
            sm={{ span: 4, offset: 1 }}
            xs={12}
            className="px-0 py-2"
        >
          <InputGroup size="sm">
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
        {(props.link === '')? <></> :
            <Col
                className="px-0 py-2 text-center"
                lg={{ span: 1, offset: 0}}
                md={{ span: 1, offset: 0 }}
                sm={{ span: 1, offset: 4 }}
                xs={{ span: 1, offset: 0 }}
            >
              <Button
                variant="info"
                className="btn-sm"
                href={props.link}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(props.link);
                }}
              >
                <Globe />
              </Button>
            </Col>}
        <Col
             className="px-0 py-2 text-center"
             lg={{ span: 1, offset: (props.link === '')? 3 : 2 }}
             md={{ span: 1, offset: (props.link === '')? 3 : 2 }}
             sm={{ span: 1, offset: (props.link === '')? 5 : 3 }}
             xs={{ span: 1, offset: 9 }}
        >
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
