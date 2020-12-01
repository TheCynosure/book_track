import React from 'react';
import FloatingBookTitle from '../components/FloatingBookTitle';
import BookList from '../components/BookList';
import {Container} from 'react-bootstrap';
import AddBook from '../components/AddBook';
import AddBookModal from '../components/AddBookModal';

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
    }
  }

  updateBookState(book_index) {
    return (progress, max) => {
      let books = this.state.books.slice();
      books[book_index].progress = progress;
      books[book_index].max = max;
      this.setState({books: books})
    }
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

  render() {
    return (
      <Container>
        <FloatingBookTitle />
        <BookList books={this.state.books} updateBook={(index) => this.updateBookState(index)}/>
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

export default Main;
