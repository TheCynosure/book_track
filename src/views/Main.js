import React from 'react';
import FloatingBookTitle from '../components/FloatingBookTitle';
import BookList from '../components/BookList';
import {Container, Spinner, Row, Col} from 'react-bootstrap';
import AddBook from '../components/AddBook';
import AddBookModal from '../components/AddBookModal';
import Confetti from 'react-confetti';
import ReactTimeout from 'react-timeout';
import ReadCount from '../components/ReadCount';

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

  componentWillMount() {
    window.addEventListener("resize", () => this.handleResize());
  }

  componentWillUnmount() {
    window.addEventListener("resize", () => this.handleResize());
  }

  componentDidMount() {
    fetch("http://localhost:8080/books")
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        this.setState({books: result, isLoaded: true});
      },
      (error) => {
        this.setState({isLoaded: true, error});
      });

  }

  updateBookState(book_index) {
    return (progress, max) => {
      let books = this.state.books.slice();
      books[book_index].progress = progress;
      books[book_index].max = max;
      this.setState({books: books})
    }
  }

  removeBook(book_title) {
    let books = this.state.books.slice();
    let finished_book = books.filter(curr_book => curr_book.name === book_title);
    books = books.filter(curr_book => curr_book.name !== book_title);
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

  showAddBookModal() {
    this.setState({showAddModal: true});
  }

  addBook(name, max_page) {
    let books = this.state.books.slice();
    books = books.concat([
      {name: name, progress: 0, max: max_page}
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

  isNewBookValid(title) {
    return this.state.books.filter((curr) => curr.name === title).length === 0
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
            updateBook={(index) => this.updateBookState(index)}
            removeBook={(index) => this.removeBook(index)}
            finishBook={(index) => this.finishBook(index)}
          />
          <AddBook handleNewBook={() => this.showAddBookModal()}/>
          <ReadCount
            current={this.state.history.length}
            total={this.state.history.length + this.state.books.length}
          />
          <BookList
            books={this.state.history}
            disabled={true}
          />
          <AddBookModal
            show={this.state.showAddModal}
            onAdd={(title, length) => this.addBook(title, length)}
            onCancel={() => this.setState({showAddModal: false})}
            checkValid={(title) => this.isNewBookValid(title)}
          />
        </Container>
      );
    }
  }

  render() {
    return (
      <Container>
        <FloatingBookTitle />
        {this.renderMainScreen()}
      </Container>
    );
  }
}

export default ReactTimeout(Main);
