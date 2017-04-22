import './reader.scss';
import React from 'react';

import {Col, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import WordComponent from './WordComponent';
import wordUtils from './utils/word-utils';

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
        this.showWord = this.showWord.bind(this);
        this.finish = this.finish.bind(this);
        this.getWordsPerMinute = this.getWordsPerMinute.bind(this);
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleDelayChange(event) {
        this.setState({wordDelay: parseInt(event.target.value)});
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.text.length === 0) {
            return;
        }

        let words = this.state.text.split(" ");
        let indexWord = 0;

        this.setState({showWord: true, currentWord: "Get Ready..."}, () => {
            setTimeout(() => this.showWord(words, indexWord, 0), 1000, 0);
        });
    }

    showWord(words, indexWord, extraTime) {
        if (words.length < indexWord) {
            this.finish();
            return;
        }

        let currentWord = words[indexWord];
        let nextWordExtraTime = wordUtils.getExtraTime(currentWord);
        setTimeout(() => {
            this.setState({currentWord: currentWord}, () => this.showWord(words, ++indexWord, nextWordExtraTime));
        }, this.state.wordDelay + extraTime);
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
                    <form onSubmit={this.handleSubmit} className="form-text">
                        <FormGroup controlId="formControlsTextarea">
                            <ControlLabel>Write or paste a text that you want to read fast</ControlLabel>
                            <FormControl componentClass="textarea" placeholder="Here!" className="text-content"
                                         rows={7} value={this.state.text} onChange={this.handleTextChange}/>
                        </FormGroup>
                        <FormGroup className="input-number">
                            <ControlLabel>Time for each word in milliseconds </ControlLabel>
                            <FormControl type="number" min="1" max="60000" value={this.state.wordDelay}
                                         onChange={this.handleDelayChange}/>
                        </FormGroup>
                        <FormGroup className="input-number">
                            <ControlLabel>You will read approximately {this.getWordsPerMinute()} words per minute!</ControlLabel>
                        </FormGroup>

                        <Button type="submit" bsStyle="primary" bsSize="large" className="input-button">
                            Read it!
                        </Button>
                    </form>
                </Col>
                <WordComponent show={this.state.showWord} word={this.state.currentWord}></WordComponent>
            </div>
        )
    }
}

export default ReaderComponent;