import React, { Component } from "react";
import "./Hangman.css";
import img0 from "../0.jpg";
import img1 from "../1.jpg";
import img2 from "../2.jpg";
import img3 from "../3.jpg";
import img4 from "../4.jpg";
import img5 from "../5.jpg";
import img6 from "../6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [img0, img1, img2, img3, img4, img5, img6]
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
		this.handleGuess = this.handleGuess.bind(this);
		this.restart = this.restart.bind(this);
	}

	/** hasWon returns whether the user has won or not.*/
	hasWon() {
		const remainingWords = this.state.answer
			.split("")
			.map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
		return !remainingWords.includes("_");
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer
			.split("")
			.map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
	}

	/** handleGuess: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(evt) {
		let ltr = evt.target.value;
		this.setState((st) => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
			<button
				key={idx}
				value={ltr}
				onClick={this.handleGuess}
				disabled={
					this.state.nWrong >= this.props.maxWrong ||
					this.state.guessed.has(ltr)
				}
			>
				{ltr}
			</button>
		));
	}
	/** restart: restarts the game with a different word */
	restart() {
		this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
	}

	/** render: render game */
	render() {
		console.log(this.state.answer);
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img
					src={this.props.images[this.state.nWrong]}
					alt={`Made ${this.state.nWrong} wrong guesses`}
				/>
				<p>
					{this.state.nWrong < this.props.maxWrong
						? `Number of Wrong guesses: ${this.state.nWrong}`
						: `You lose!`}
				</p>
				<p className="Hangman-word">{this.guessedWord()}</p>
				{this.state.nWrong < this.props.maxWrong && !this.hasWon() ? (
					<p className="Hangman-btns">{this.generateButtons()}</p>
				) : this.hasWon() ? (
					<p>You guessed the correct Word!</p>
				) : (
					<p>The correct word is: {this.state.answer}</p>
				)}
				<button id="restart" onClick={this.restart}>
					Restart!
				</button>
			</div>
		);
	}
}

export default Hangman;
