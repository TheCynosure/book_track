import React from 'react';
import BookList from '../components/BookList';

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

  render() {
    return <BookList books={this.state.books}/>;
  }
}

export default Main;
