import React from 'react';
import {Container} from 'react-bootstrap'
import IconHeader from "../components/IconHeader";
import Main from "./Main";
import Stats from "./Stats";

export default class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mainView: true
        }
    }

    switchViews() {
        this.setState({ mainView: !this.state.mainView });
    }

    render() {
        return (
            <Container fluid>
                <IconHeader onClick={() => this.switchViews()} showBook={this.state.mainView}/>
                {
                    this.state.mainView? <Main /> : <Stats />
                }
            </Container>
        );
    }
}