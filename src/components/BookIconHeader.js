import React from 'react';
import {Container, Collapse} from 'react-bootstrap';
import {Book} from 'react-bootstrap-icons';
import styles from './animated-book-title.module.scss';

class BookIconHeader extends React.Component {
  render() {
    return (
      <Container className="mt-5 mb-5 text-center">
        <h1
          className={styles.TitleBook}
          animate={this.props.animate? 1 : 0}
        >
          <Book />
        </h1>
        {/*<Collapse in={this.props.animate}>*/}
        {/*  <p>*/}
        {/*    Saving*/}
        {/*  </p>*/}
        {/*</Collapse>*/}
      </Container>
    );
  }
}

export default BookIconHeader;
