import React, {forwardRef, useState} from 'react';
import {Button, Modal, Container, Row, Col, InputGroup, FormControl, Dropdown} from 'react-bootstrap';
import {Globe} from "react-bootstrap-icons";

const server = 'https://book-track-backend.herokuapp.com/'

export default class NewBookCreationModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      length: 1,
      isTitleInputValid: false,
      isLengthInputValid: false,
      possibleGBooks: []
    }
  }

  updatePossibleGBooks(prefix) {
    const location = server + 'gbooks/search/' + prefix;
    fetch(location).then(r => {
        r.json().then(result => {
            this.setState({ possibleGBooks: result });
        }).catch(err => {
            console.error(err);
            this.setState({ possibleGBooks: [] });
        })
    });
  }

  onTitleChange(event) {
    if (event.target.value === null ||
        event.target.value.length === 0 ||
        !this.props.checkValid(event.target.value)) {
      this.setState({title: event.target.value, isTitleInputValid: false});
      return;
    }
    this.updatePossibleGBooks(event.target.value);
    this.setState({title: event.target.value, isTitleInputValid: true});
  }

  onMaxChange(event) {
    if (isNaN(Number(event.target.value)) || Number(event.target.value) <= 0) {
      this.setState({length: 1, isLengthInputValid: false});
      return;
    }
    this.setState({length: event.target.value, isLengthInputValid: true});
  }

  handleSubmit() {
    let title = this.state.title;
    let length = this.state.length;
    let link = this.hasExactGBookMatch()?
        'https://www.gutenberg.org/ebooks/' + this.getExactGBookMatches()[0].number:
        '';
    this.setState({
      title: '',
      length: 1,
      isTitleInputValid: false,
      isLengthInputValid: false,
      possibleGBooks: []
    });
    this.props.onAdd({ title: title, length: length, link: link });
  }

  hasExactGBookMatch() {
    return this.getExactGBookMatches().length >= 1;
  }

  getExactGBookMatches() {
    return this.state.possibleGBooks.filter((book) => {
      return book.title === this.state.title;
    });
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className="m-2">  
              <Col>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      Title
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                      onChange={(event) => this.onTitleChange(event)}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>
                      <Globe className={
                        this.state.possibleGBooks.length > 0?
                            (this.hasExactGBookMatch() ? "text-success" : "text-info"):
                            "text-secondary"}/>
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Row>
            <Row className="m-2">
              <Col>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      Max Page #
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={(event) => this.onMaxChange(event)} 
                  />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.onCancel()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => this.handleSubmit()}
            disabled={!(this.state.isTitleInputValid && this.state.isLengthInputValid)}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
