import React from 'react';
import {Collapse, Button, FormControl, ListGroup, Container, Row, Col, ProgressBar, InputGroup} from 'react-bootstrap';
import {PencilSquare, Check} from 'react-bootstrap-icons';

class BookConfiguration extends React.Component {
  handleProgressChange(event) {
    if (isNaN(Number(event.target.value))) {
      return;
    }
    if (Number(event.target.value) > this.props.max) {
      event.target.value = this.props.max;
    }
    this.props.updateBook(event.target.value, this.props.max);
  }

  handleMaxChange(event) {
    if (isNaN(Number(event.target.value))) {
      return;
    }
    this.props.updateBook(this.props.progress, event.target.value);
  }

  render() {
    return (
      <Container>
        <Row>  
          <Col sm={3}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  Page #
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder={this.props.progress}
                onChange={(event) => this.handleProgressChange(event)}
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
                placeholder={this.props.max}
                onChange={(event) => this.handleMaxChange(event)}
              />
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

class BookInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: props.book,
      active: false,
      complete: props.book.progress == props.book.max,
    }
  }

  onClick() {
    if (this.state.complete) {
      console.log("Removing!");
      this.props.removeBook();
    } else {
      this.setState({active: !this.state.active});
      if (this.state.active && this.state.book.progress == this.state.book.max) {
        this.setState({complete: true})
      }
    }
  }

  handleInput() {
    return; 
  }

  buildButton() {
    if (this.state.complete) {
      // A check button to trigger adding to the completed list.
      return (
        <Button
          variant={"success"}
          className="btn-sm"
          onClick={() => this.onClick()}
        >
          <Check />
        </Button>
      );
    } else {
      // Otherwise the button to trigger the collapse section.
      return (
        <Button
          variant={this.state.active? "secondary" : "primary"} 
          onClick={() => this.onClick()}
          aria-controls="book-config-collapse"
          aria-expanded={this.state.active}
          className="btn-sm"
        >
          <PencilSquare />
        </Button>
      );
    }
  }

  render() {
    return (
      <ListGroup.Item>
        <Container>
          <Row className="align-items-center">
            <Col sm={3}>
              <h4 className="mb-0">{this.state.book.name}</h4>
            </Col>
            <Col sm={1}>
            </Col>
            <Col sm={7}>
              <ProgressBar
                variant={this.state.book.progress >= this.state.book.max? "success" : "info"}
                now={(this.state.book.progress/this.state.book.max) * 100}
                label={(this.state.book.progress/this.state.book.max) * 100 + '%'}
                style={{width: "100%"}}/>
            </Col>
            <Col xs={1}>
              {this.buildButton()}
            </Col>
          </Row>
          <Row>
            <Col>
              <Collapse in={this.state.active}>
                <div id="book-config-collapse"> 
                  <div className="pt-3 pb-3">
                    <BookConfiguration
                      handleInput={() => this.handleInput()}
                      updateBook={(p, m) => this.props.updateBook(p, m)}
                      {...this.state.book}
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
}

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  onBookClick() {
    this.setState({active: !this.state.active})
  }

  render() {
    // If active then render the extra information.
    return (
      <Container>
        <Row>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {this.props.books.map((book, index) => 
                <BookInformation
                  book={book}
                  updateBook={(progress, max) => this.props.updateBook(index)(progress, max)}
                  removeBook={() => this.props.removeBook(index)}
                />
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;
