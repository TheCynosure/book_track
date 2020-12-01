import React from 'react';
import FloatingBookTitle from '../components/FloatingBookTitle';
import BookList from '../components/BookList';
import {Container} from 'react-bootstrap';
import AddBook from '../components/AddBook';
import AddBookModal from '../components/AddBookModal';
import Confetti from 'react-confetti';
import ReactTimeout from 'react-timeout';

class Main extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {name: 'Jane Erye', progress: 0, max: 200},
        {name: 'What is Mathematics', progress: 32, max: 250},
        {name: 'East of Eden', progress: 200, max: 200},
      ],
      showAddModal: false,
      windowSize: {width: undefined, height: undefined},
      showConfetti: false,
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

  updateBookState(book_index) {
    return (progress, max) => {
      let books = this.state.books.slice();
      books[book_index].progress = progress;
      books[book_index].max = max;
      this.setState({books: books})
    }
  }

  removeBook(book_index) {
    let books = this.state.books.slice();
    books.splice(book_index, 1);
    this.setState({
      books: books
    });
    // Then congrats you finished a book!
    this.spawnConfetti();
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

  render() {
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
        <FloatingBookTitle />
        <BookList
          books={this.state.books}
          updateBook={(index) => this.updateBookState(index)}
          removeBook={(index) => this.removeBook(index)}
        />
        <AddBook handleNewBook={() => this.showAddBookModal()}/>
        <AddBookModal
          show={this.state.showAddModal}
          onAdd={(name, max_page) => this.addBook(name, max_page)}
          onCancel={() => this.setState({showAddModal: false})}
        />
      </Container>
    );
  }
}

export default ReactTimeout(Main);
