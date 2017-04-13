import './reader.scss';
import React from 'react';

import {Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import WordComponent from './WordComponent';

const MILLISECONDS_IN_A_MINUTE = 60000;

class ReaderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            showWord: false,
            currentWord: "",
            wordDelay: 150
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleDelayChange = this.handleDelayChange.bind(this);
        this.start = this.start.bind(this);
        this.finish = this.finish.bind(this);
        this.getWordsPerMinute = this.getWordsPerMinute.bind(this);
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleDelayChange(event) {
        this.setState({wordDelay: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.text.length === 0) {
            return;
        }

        let words = this.state.text.split(" ");
        let indexWord = 0;

        this.setState({showWord: true, currentWord: "Get Ready..."}, () => {
            setTimeout(() => this.start(words, indexWord), 1000);
        });
    }

    start(words, indexWord) {
        setTimeout(() => {
            if (words.length > indexWord) {
                let currentWord = words[indexWord];
                this.setState({currentWord: currentWord}, () => this.start(words, ++indexWord));
            } else {
                this.finish();
            }
        }, this.state.wordDelay);
    }

    finish() {
        this.setState({showWord: false});
    }

    getWordsPerMinute() {
        return Math.round(MILLISECONDS_IN_A_MINUTE / this.state.wordDelay);
    }

    render() {
        return (
            <div>
                <Col md={12} className={this.state.showWord ? 'hide' : ''}>
                    <form className="text-center" onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Write or paste a text that you want to read fast</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Here!" className="text-content"
                                         rows={7} value={this.state.text} onChange={this.handleTextChange}/>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Time for each word in milliseconds. {this.getWordsPerMinute()} words per minute</ControlLabel>
                            <FormControl type="number" min="1" max="60000" value={this.state.wordDelay}
                                         onChange={this.handleDelayChange}/>
                        </FormGroup>
                        <Button type="submit" bsStyle="primary" bsSize="large">
                            Do it!
                        </Button>
                    </form>
                </Col>
                <WordComponent show={this.state.showWord} word={this.state.currentWord}></WordComponent>
            </div>
        )
    }
}

export default ReaderComponent;