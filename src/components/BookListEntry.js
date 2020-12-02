import {React, useState} from 'react';
import {Collapse, Button, FormControl, ListGroup, Container, Row, Col, ProgressBar, InputGroup} from 'react-bootstrap';
import {PencilSquare, Check, Trash} from 'react-bootstrap-icons';
import BookPageConfigForm from './BookPageConfigForm';

function isComplete(props, open) {
  return (Number(props.book.current_page) === Number(props.book.length)) && !open;
}

function onClick(props, open, toggleCollapse) {
  if (isComplete(props, open)) {
    props.finishBook();
  } else {
    toggleCollapse();
  }
}

function renderButton(props, open, toggleCollapse) {
  if (isComplete(props, open)) {
    // A check button to trigger adding to the completed list.
    return (
      <Button
        variant={"success"}
        className="btn-sm"
        onClick={() => onClick(props, open, toggleCollapse)}
        disabled={props.disabled}
      >
        <Check />
      </Button>
    );
  } else {
    // Otherwise the button to trigger the collapse section.
    return (
      <Button
        variant={open? "secondary" : "primary"}
        onClick={() => onClick(props, open, toggleCollapse)}
        aria-controls="book-config-collapse"
        aria-expanded={open}
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

export default function BookListEntry(props) {
  let [open, setOpen] = useState(false)

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
            {renderButton(props, open, () => setOpen(!open))}
          </Col>
        </Row>
        <Row>
          <Col>
            <Collapse in={open}>
              <div id="book-config-collapse"> 
                <div className="pt-3 pb-3">
                  <BookPageConfigForm
                    updateBook={(p, m) => props.updateBook(p, m)}
                    removeBook={() => removeBook(props)}
                    current_page={props.book.current_page}
                    length={props.book.length}
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

