import React from 'react';
import {Collapse, Button, FormControl, ListGroup, Container, Row, Col, ProgressBar, InputGroup} from 'react-bootstrap';
import {PencilSquare, Check, Trash} from 'react-bootstrap-icons';
import BookPageConfigForm from './BookPageConfigForm';

export default class BookListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      show: true,
      style: {
        opacity: 0,
      }
    }
  }

  componentDidMount() {
    // Shortly after mounting we will render the element visible.
    setTimeout(() => this.visibleStyle(), 10);
  }
  //
  // componentWillReceiveProps(newProps, nextContext) {
  //   if () {
  //     return this.invisibleStyle();
  //   }
  //
  //   // Otherwise, we should be visible!
  //   this.setState({
  //     show: true
  //   });
  //   setTimeout(() => this.visibleStyle(), 10);
  // }

  visibleStyle() {
    this.setState({
      style: {
        opacity: 1,
        transition: 'all .7s ease'
      }
    })
  }

  invisibleStyle(callback) {
    this.callback = callback;
    this.setState({
      open: false,
      style: {
        opacity: 0,
        transition: 'all .7s ease'
      }
    });
  }

  transitionEnd(e) {
    // Call the callback after the animation is officially over.
   if (e.target.className.includes('BookListAnimation')) {
      if (this.state.style.opacity === 0) {
        this.setState({
          show: false
        }, this.execCallback);
      }
    }
  }

  execCallback() {
    if (this.callback !== undefined) {
      this.callback();
    }
  }

  isComplete() {
    return this.props.book.current_page === this.props.book.length && !this.state.open;
  }

  renderButton() {
    if (this.isComplete()) {
      // A check button to trigger adding to the completed list.
      return (
          <Button
              variant={"success"}
              className="btn-sm"
              onClick={() => this.onClick()}
              disabled={this.props.disabled}
          >
            <Check />
          </Button>
      );
    } else {
      // Otherwise the button to trigger the collapse section.
      return (
          <Button
              variant={this.state.open? "secondary" : "primary"}
              onClick={() => this.onClick()}
              aria-controls="book-config-collapse"
              aria-expanded={this.state.open}
              className="btn-sm"
              disabled={this.props.disabled}
          >
            <PencilSquare />
          </Button>
      );
    }
  }

  onClick() {
    if (this.isComplete()) {
      this.invisibleStyle(() => this.props.finishBook());
    } else {
      this.setState({
        open: !this.state.open
      });
    }
  }

  render() {
    // We and this with the show so that when it is invisible we force React to
    // unmount the component (otherwise it would stick around forever).
    // Also cool animation with remove and update book. Basically, once the
    // style is invisible, we run that callback and then unmount because
    // show becomes false.
    return (
        this.state.show &&
        <ListGroup.Item style={this.state.style} onTransitionEnd={(event) => this.transitionEnd(event)} className="BookListAnimation">
          <Container>
            <Row className="align-items-center">
              <Col sm={3}>
                <h4 className="mb-0">{this.props.book.title}</h4>
              </Col>
              <Col sm={1}>
              </Col>
              <Col sm={7}>
                <ProgressBar
                    variant={this.props.book.current_page >= this.props.book.length? "success" : "info"}
                    now={(this.props.book.current_page / this.props.book.length) * 100}
                    label={Math.floor((this.props.book.current_page / this.props.book.length) * 100) + '%'}
                    style={{width: "100%"}}
                    disabled={this.props.disabled}
                />
              </Col>
              <Col xs={1}>
                {this.renderButton()}
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse in={this.state.open}>
                  <div id="book-config-collapse">
                    <div className="pt-3 pb-3">
                      <BookPageConfigForm
                          updateBook={(p, m) => this.props.updateBook(p, m) }
                          removeBook={() => this.invisibleStyle(() => this.props.removeBook()) }
                          current_page={this.props.book.current_page}
                          length={this.props.book.length}
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