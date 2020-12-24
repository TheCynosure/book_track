import React from  'react';
import {Container, Button, Card} from 'react-bootstrap';

export default class Splash extends React.Component {

    render() {
        return (
            <Container className="mt-5 text-center align-items-center">
                <Card>
                    <Card.Header>
                        <h1>Disclaimer</h1>
                    </Card.Header>
                    <Card.Body className="p-3 text-left">
                    <h3>This demo is hosted using Heroku free tier and MongoDB atlas free tier. The responsiveness will be slow and may take up to 10 seconds for the initial fetching of data (as heroku needs to wakeup). This is not representative of the real performance of the application.</h3>
                    </Card.Body>
                    <Card.Footer>
                        <div className="d-flex w-100">
                            <Button className="ml-auto" onClick={this.props.onClick}>
                                Continue to Demo
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </Container>
        );
    }

}
