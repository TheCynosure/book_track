import React from 'react';
import {Collapse, Button, FormControl, ListGroup, Container, Row, Col, ProgressBar, InputGroup} from 'react-bootstrap';

class BookConfiguration extends React.Component {
  constructor(props) {
    super(props); 
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
    }
  }

  onClick() {
    this.setState({active: !this.state.active});
  }

  handleInput() {
    return; 
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
            <Col sm={6}>
              <ProgressBar
                now={(this.state.book.progress/this.state.book.max) * 100}
                label={(this.state.book.progress/this.state.book.max) * 100 + '%'}
                style={{width: "100%"}}/>
            </Col>
            <Col xs={1}>
              <Button
                variant={this.state.active? "secondary" : "primary"} 
                onClick={() => this.onClick()}
                aria-controls="book-config-collapse"
                aria-expanded={this.state.active}
                className="btn-sm"
              >
                {this.state.active? 'Close' : 'Edit'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Collapse in={this.state.active}>
                <div id="book-config-collapse"> 
                  <div className="p-3">
                    <BookConfiguration handleInput={() => this.handleInput()} {...this.state.book}/>
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
                <BookInformation book={book} />
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BookList;
