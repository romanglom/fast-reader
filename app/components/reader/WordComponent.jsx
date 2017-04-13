import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

class WordComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.show ? "dark-background-overlay" : "dark-background-overlay hide"}>
                <div>
                    <Col md={12} className="text-center word-on-background">
                        <h1>{this.props.word}</h1>
                    </Col>
                </div>
            </div>
        )
    }
}

export default WordComponent;