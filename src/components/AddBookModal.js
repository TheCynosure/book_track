import React from 'react';
import {Button, Modal, Container, Row, Col, InputGroup, FormControl} from 'react-bootstrap';

export default class AddBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      length: 1,
      isInputValid: false,
    }
  }

  onTitleChange(event) {
    if (event.target.value === null ||
        event.target.value.length === 0 ||
        !this.props.checkValid(event.target.value)) {
      this.setState({title: event.target.value, isInputValid: false});
      return;
    }
    this.setState({title: event.target.value, isInputValid: true});
  }

  onMaxChange(event) {
    if (isNaN(Number(event.target.value)) || Number(event.target.value) <= 0) {
      this.setState({length: 1, isInputValid: false});
      return;
    }
    this.setState({length: event.target.value, isInputValid: true});
  }

  handleSubmit() {
    let title = this.state.title;
    let length = this.state.length;
    this.setState({title: '', length: 1, isInputValid: false});
    this.props.onAdd(title, length);
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
            active={this.state.isInputValid}
            disabled={!this.state.isInputValid}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
