import {React, useState} from 'react';
import {Collapse, Button, FormControl, ListGroup, Container, Row, Col, ProgressBar, InputGroup} from 'react-bootstrap';
import {PencilSquare, Check, Trash} from 'react-bootstrap-icons';
import BookConfigContainer from './BookConfigContainer';

function isComplete(props) {
  return props.book.current_page == props.book.length;
}

function onClick(props, toggleCollapse) {
  if (isComplete(props)) {
    props.finishBook();
  } else {
    toggleCollapse();
  }
}

function buildButton(props, toggleCollapse) {
  if (isComplete(props)) {
    // A check button to trigger adding to the completed list.
    return (
      <Button
        variant={"success"}
        className="btn-sm"
        onClick={() => onClick(props, toggleCollapse)}
        disabled={props.disabled}
      >
        <Check />
      </Button>
    );
  } else {
    // Otherwise the button to trigger the collapse section.
    return (
      <Button
        variant={props.active? "secondary" : "primary"} 
        onClick={() => onClick(props, toggleCollapse)}
        aria-controls="book-config-collapse"
        aria-expanded={props.active}
        className="btn-sm"
        disabled={props.disabled}
      >
        <PencilSquare />
      </Button>
    );
  }
}

function removeBook(props) {
  // Propogate up the chain.
  props.removeBook();
}

export default function BookInfoListGroup(props) {
  let [open, setOpen] = useState(false)

  console.log(props.book.length);

  return (
    <ListGroup.Item>
      <Container>
        <Row className="align-items-center">
          <Col sm={3}>
            <h4 className="mb-0">{props.book.title}</h4>
          </Col>
          <Col sm={1}>
          </Col>
          <Col sm={7}>
            <ProgressBar
              variant={props.book.current_page >= props.book.length? "success" : "info"}
              now={(props.book.current_page / props.book.length) * 100}
              label={Math.floor((props.book.current_page / props.book.length) * 100) + '%'}
              style={{width: "100%"}}
              disabled={props.disabled}
            />
          </Col>
          <Col xs={1}>
            {buildButton(props, () => setOpen(!open))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse in={open}>
              <div id="book-config-collapse"> 
                <div className="pt-3 pb-3">
                  <BookConfigContainer
                    updateBook={(p, m) => props.updateBook(p, m)}
                    removeBook={() => removeBook(props)}
                    progress={props.book.current_page}              
                    max={props.book.length}
                  />
                </div>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  );
}

