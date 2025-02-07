import React from "react";
import { chips } from "./chipslist";
import { words } from "./wordlist";
import "../App.css";
import { clsx } from "clsx";
const Main = () => {
  const [word, setWord] = React.useState(
    words[Math.floor(Math.random() * words.length)]
  );
  // console.log(word);
  // console.log(typeof word);
  const [guessedLetter, setguessedLestter] = React.useState([]);
  // console.log(guessedLetter);
  const [wrongGuessedCount, setWrongGuessedCount] = React.useState(9);
  // console.log(wrongGuessedCount);

  let isGameWon = word
    .split("")
    .every((letter) => guessedLetter.includes(letter));
  let isGameLost = wrongGuessedCount === 0;
  let isGameOver = isGameLost || isGameWon;
  // console.log(isGameWon);

  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  function clickLetter(letter) {
    setguessedLestter((prevGuessedLetters) => {
      if (prevGuessedLetters.includes(letter)) {
        return prevGuessedLetters;
      }
      return [...prevGuessedLetters, letter];
    });

    if (!word.includes(letter) && wrongGuessedCount > 0) {
      setWrongGuessedCount((prevCount) => prevCount - 1);
    }
  }

  // console.log(guessedLetter);

  const chipsElement = chips.map((chip, index) => {
    const isCut = 9 - wrongGuessedCount >= index + 1;

    const classNAme = isCut ? "chip-lost" : "chip";

    const styles = {
      backgroundColor: chip.backgroundColor,
      color: chip.color,
    };
    return (
      <span key={chip.name} className={classNAme} style={styles}>
        {chip.name}
      </span>
    );
  });

  const wordletters = word.split("").map((wordletter, index) => {
    const revealLetter = isGameOver || guessedLetter.includes(wordletter);
    return (
      <span key={index} className="letter">
        {revealLetter ? wordletter.toUpperCase() : ""}
      </span>
    );
  });
  //   console.log(wordletters);

  const alphabetletter = alphabets.split("").map((letter) => {
    const isGuessed = guessedLetter.includes(letter);
    const isCorrect = isGuessed && word.includes(letter);
    const isWrong = isGuessed && !word.includes(letter);
    // console.log(isCorrect, isWrong);

    let className = "alphabets";

    if (guessedLetter.length === 0) {
      className = "alphabet";
    } else if (isCorrect) {
      className = "alphabets-correct";
    } else if (isWrong) {
      className = "alphabets-wrong";
    }
    // console.log(className);
    return (
      <button
        key={letter}
        className={className} // Dynamically apply correct/wrong class
        onClick={() => clickLetter(letter)}
        disabled={isGameOver || guessedLetter.includes(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
    // console.log(className)
  });

  const GameStatus = () => {
    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } else if (isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! 😭</p>
        </>
      );
    }
  };

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
  });
  function newGame() {
    setWord(words[Math.floor(Math.random() * words.length)]);
    setguessedLestter([]);
    setWrongGuessedCount(9);
  }

  const sectionclass = clsx({
    haha: isGameOver,
    nonewgame: !isGameOver,
  });

  return (
    <div className="main">
      <header>
        <h1>WordWarp </h1>
        <p>Guess the word within 9 attempts</p>
      </header>
      <section className={gameStatusClass}>
        <GameStatus />
      </section>
      <section className="chips">{chipsElement}</section>
      <section className="word">{wordletters}</section>
      <section className="alphabets">{alphabetletter}</section>
      <section className={sectionclass}></section>
      {isGameOver && (
        <button className="newgame" onClick={newGame}>
          New Game
        </button>
      )}
    </div>
  );
};

export default Main;
