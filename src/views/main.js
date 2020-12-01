import React from 'react';
import ReactDOM from 'react-dom';
import BookList from '../components/BookList';

class Main extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: [
        'Jane Erye',
        'What is Mathematics',
        'East of Eden'
      ]
    }
  }

  render() {
    <BookList/>
  }
}
