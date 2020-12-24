import React from 'react';
import Header from "./views/Header";
import Splash from './views/Splash';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readDisclaimer: false
        }
    }

    render() {
        return (
        <>
            {
                (this.state.readDisclaimer)?
                    <Header />:
                    <Splash onClick={() => this.setState({ readDisclaimer: true })}/>
            }
        </>);
    }
}