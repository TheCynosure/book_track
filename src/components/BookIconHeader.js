import React from 'react';
import {Animated, Easing, View} from 'react-native';
import {Container, Collapse} from 'react-bootstrap';
import {Book} from 'react-bootstrap-icons';

class BookIconHeader extends React.Component {
    render() {
        return (
            <Container className="mt-5 mb-5 text-center">
                <h1>
                    <Book/>
                </h1>
            </Container>
        );
    }
}

export default BookIconHeader;
