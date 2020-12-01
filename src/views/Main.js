import React from 'react';
import FloatingBookTitle from '../components/FloatingBookTitle';
import BookList from '../components/BookList';
import {Container} from 'react-bootstrap';

class Main extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {name: 'Jane Erye', progress: 0, max: 200},
        {name: 'What is Mathematics', progress: 32, max: 250},
        {name: 'East of Eden', progress: 200, max: 200},
      ]
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

  render() {
    return (
      <Container>
        <FloatingBookTitle />
        <BookList books={this.state.books} updateBook={(index) => this.updateBookState(index)}/>
      </Container>
    );
  }
}

export default Main;
