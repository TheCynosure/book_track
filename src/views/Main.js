import React from 'react';
import BookIconHeader from '../components/BookIconHeader';
import BookList from '../components/BookList';
import {Container, Spinner, Row, Col} from 'react-bootstrap';
import NewBookButton from '../components/NewBookButton';
import NewBookCreationModal from '../components/NewBookCreationModal';
import Confetti from 'react-confetti';
import ReactTimeout from 'react-timeout';
import ReadingGoalProgressBar from '../components/ReadingGoalProgressBar';

class Main extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      history: [],
      showAddModal: false,
      windowSize: {width: undefined, height: undefined},
      showConfetti: false,
      isLoaded: false,
    }
  }

  handleResize() {
     this.setState({windowSize: {
       width: window.innerWidth,
       height: window.innerHeight,
     }});
  }

  componentDidMount() {
    window.addEventListener("resize", () => this.handleResize());
  }

  componentWillUnmount() {
    window.addEventListener("resize", () => this.handleResize());
  }

  componentDidMount() {
    fetch("http://localhost:8080/books")
      .then(res => res.json())
      .then((result) => {
        this.setState({books: result, isLoaded: true});
      },
      (error) => {
        this.setState({isLoaded: true, error});
      });

  }

  updateBook(book_title) {
    return (new_current_page, new_length) => {
      let books = this.state.books.slice();
      const book_to_update =
          books.find(book => book.title === book_title);
      book_to_update.current_page = new_current_page;
      book_to_update.length = new_length;
      this.setState({books: books})
    }
  }

  removeBook(book_title) {
    let books = this.state.books.slice();
    let finished_book =
        books.filter(curr_book => curr_book.title === book_title);
    books = books.filter(curr_book => curr_book.title !== book_title);
    this.setState({
      books: books
    });
    return finished_book;
  }

  finishBook(book_title) {
    let finished_book = this.removeBook(book_title);
    this.spawnConfetti();
    let history = this.state.history;
    // Doing the concat this direction so finished book is at the beginning.
    history = finished_book.concat(history)
    this.setState({
      history: history,
    });
  }

  promptNewBookModal() {
    this.setState({showAddModal: true});
  }

  addBook(name, max_page) {
    let books = this.state.books.slice();
    books = books.concat([
      {title: name, current_page: 0, length: max_page}
    ])
    this.setState({books: books, showAddModal: false})
  }

  spawnConfetti() {
    this.setState({
      showConfetti: true
    });
  }

  onConfettiComplete(confetti) {
    this.setState({ showConfetti: false })
    confetti.reset();
  }

  isTitleUnique(title) {
    return this.state.books.filter((curr) => curr.title === title).length === 0
  }

  renderBookHistory() {
    if (this.state.history.length > 0) {
      return (
        <Container className="p-0">
          <Row className="p-0">
            <Col>
              <ReadingGoalProgressBar
                  current={this.state.history.length}
                  total={this.state.history.length + this.state.books.length}
              />
            </Col>
          </Row>
          <Row className="p-0">
            <Col>
              <BookList
                  books={this.state.history}
                  disabled={true}
              />
            </Col>
          </Row>
        </Container>
      );
    }
  }

  renderMainScreen() {
    if (!this.state.isLoaded) {
      return (
        <Container>
          <Row className="justify-content-center">
            <Col sm={1} style={{ textAlign: 'center'}}>
              <Spinner animation="grow"/>
            </Col>
          </Row>
        </Container>
      );
    } else {
      const width = this.state.windowSize.width;
      const height = this.state.windowSize.height;
      return (
        <Container>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={this.state.showConfetti ? 500 : 0}
            onConfettiComplete={(confetti) => this.onConfettiComplete(confetti)}
          />
          <BookList
            books={this.state.books}
            updateBook={(index) => this.updateBook(index)}
            removeBook={(index) => this.removeBook(index)}
            finishBook={(index) => this.finishBook(index)}
          />
          <NewBookButton handleNewBook={() => this.promptNewBookModal()}/>
          {this.renderBookHistory()}
          <NewBookCreationModal
            show={this.state.showAddModal}
            onAdd={(title, length) => this.addBook(title, length)}
            onCancel={() => this.setState({showAddModal: false})}
            checkValid={(title) => this.isTitleUnique(title)}
          />
        </Container>
      );
    }
  }

  render() {
    return (
      <Container>
        <BookIconHeader animate={1}/>
        {this.renderMainScreen()}
      </Container>
    );
  }
}

export default ReactTimeout(Main);
