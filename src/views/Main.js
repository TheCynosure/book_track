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
    this.getAllBooks();
  }

  componentWillUnmount() {
    window.addEventListener("resize", () => this.handleResize());
  }

  async getAllBooks() {
    await this.getBooks();
    await this.getBooks(true);
  }

  async getBooks(fromHistory=false) {
    // Before the fetch make sure the page knows we are loading.
    const location =
        'http://localhost:8080/' + ((fromHistory)? 'history' : 'books');
    fetch(location).then((res) => {
        if (res.status === 304) {
          // There is nothing to change
          this.setState({ isLoaded: false });
        } else {
          res.json().then((result) => {
            // Response was successful!
            if (fromHistory) {
              this.setState({ history: result, isLoaded: true });
            } else {
              this.setState({ books: result, isLoaded: true });
            }
          }).catch((error) => {
            console.log(error)
            this.setState({ isLoaded: true, error });
          });
        }
      },
      (error) => {
        // TODO: We should retry on network error.
        console.error(error);
        this.setState({isLoaded: true, error});
      });
  }

  updateBook(book_title) {
    return async (new_current_page, new_length) => {
      let books = this.state.books.slice();
      const book_to_update =
          books.find(book => book.title === book_title);
      book_to_update.current_page = new_current_page;
      book_to_update.length = new_length;

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const settings = {
        method: 'PUT',
        headers,
        body: JSON.stringify(book_to_update)
      }

      const request = new Request('http://localhost:8080/books', settings);
      const response = await fetch(request);

      if (response.status === 200) {
        this.setState({ isLoaded: true });
        await this.getAllBooks();
      }
    }
  }

  async removeBook(book_title) {
    this.setState({ isLoaded: false });
    let books = this.state.books.slice();
    let finished_book =
        books.filter(curr_book => curr_book.title === book_title);
    if (finished_book.length === 0) {
      console.error('No matching book for one deleted.');
      return;
    }
    console.log(finished_book[0].title)

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const settings = {
      method: 'DELETE',
      headers,
      body: JSON.stringify(finished_book[0])
    }

    const request = new Request('http://localhost:8080/books', settings);
    const response = await fetch(request);

    if (response.status === 200) {
      this.setState({ isLoaded: true });
      await this.getAllBooks();
    }

    return finished_book;
  }

  finishBook(book_title) {
    let finished_book =
        this.state.books.filter(book => book.title === book_title)[0];
    this.removeBook(book_title).then(() => {
      this.spawnConfetti();
      this.addBook(finished_book.title, finished_book.length, true);
    });
  }

  promptNewBookModal() {
    this.setState({showAddModal: true});
  }

  async addBook(title, length, toHistory=false) {
    this.setState({ isLoaded: false });
    // We are going to post the new book, and on success re-fetch all the data.
    const new_book = {
      title: title,
      current_page: (toHistory)? length : 0,
      length: length
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const settings = {
      method: 'POST',
      headers,
      body: JSON.stringify(new_book)
    }

    const location =
        "http://localhost:8080/" + ((toHistory)? "history" : "books");

    this.setState({showAddModal: false});
    const request = new Request(location, settings);
    const response = await fetch(request);

    if (response.status === 200) {
      this.setState({ isLoaded: true });
      await this.getAllBooks();
    }
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

  render() {
    return (
      <Container>
        <BookIconHeader/>
        {this.renderMainScreen()}
      </Container>
    );
  }
}

export default ReactTimeout(Main);
