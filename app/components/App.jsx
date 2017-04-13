import './app.scss';
import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import ReaderComponent from './reader';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h1 className="text-center">Fast Reader</h1>
                    </Col>
                    <Col md={12}>
                        <ReaderComponent></ReaderComponent>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default App;