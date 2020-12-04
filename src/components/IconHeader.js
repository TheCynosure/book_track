import React from 'react';
import {Animated, Easing, View} from 'react-native';
import {Container, Collapse} from 'react-bootstrap';
import {Book, GraphUp} from 'react-bootstrap-icons';

class IconHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                opacity: 1
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.showBook !== this.props.showBook) {
            // They want us to switch! Start the visibility transition.
            setTimeout(() => this.visibleStyle(), 10);
        }
    }

    visibleStyle(callback) {
        this.callback = callback;
        this.setState({
            style: {
                opacity: 1,
                transition: 'all .2s ease'
            }
        });
    }

    invisibleStyle(callback) {
        this.callback = callback;
        this.setState({
            open: false,
            style: {
                opacity: 0,
                transition: 'all .2s ease'
            }
        });
    }

    transitionEnd(e) {
        // Call the callback after the animation is officially over.
        if (e.target.className.includes("IconHeader")) {
            this.execCallback();
        }
    }

    execCallback() {
        if (this.callback !== undefined) {
            this.callback();
        }
    }

    onClick() {
        // First make this invisible.
        this.invisibleStyle(() => {
            // Once invisible, we want to call the parents function.
            this.props.onClick();
        })
    }

    render() {
        return (
            <Container className="mt-5 mb-5 text-center">
                <h1
                    onTransitionEnd={(e) => this.transitionEnd(e)}
                    className={"IconHeader"}
                    style={this.state.style}
                >
                    <Book />
                </h1>
            </Container>
        );
    }
}

export default IconHeader;
