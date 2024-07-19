import "./Game.css"
import { useState, useRef } from "react"

export const Game = ({
  verifyLetter,
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  showWin,
}) => {
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)

  const handleSumbit = (e) => {
    e.preventDefault()
    verifyLetter(letter.toLowerCase())
    setLetter("")
    letterInputRef.current.focus()
  }

  return (
    <div>
      <div className='game'>
        <p className='points'>
          Pontuação: <span>{score}</span>
        </p>
        <p className='tip'>
          Categoria: <span>{pickedCategory}</span>
        </p>

        <p className='guesses'>
          Você ainda tem <span>{guesses}</span> tentativas.
        </p>
        <div className='wordContainer'>
          {letters.map((letter, index) => {
            if (guessedLetters.includes(letter)) {
              return (
                <span key={index} className='letter'>
                  {letter}
                </span>
              )
            } else {
              return <span key={index} className='blankSquare'></span>
            }
          })}
        </div>
        {showWin ? (
          <div className='showWin'>
            <h1>Parabéns! Você acertou!</h1>
          </div>
        ) : (
          <div className='letterContainer'>
            <p>Insira uma letra para advinhar a palavra: </p>
            <form onSubmit={handleSumbit}>
              <input
                type='text'
                name='letter'
                maxLength='1'
                required
                onChange={(e) => setLetter(e.target.value)}
                value={letter}
                ref={letterInputRef}
              />
              <button>Jogar!</button>
            </form>
            <div className='wrongLetterContainer'>
              {wrongLetters.length > 0 && (
                <p>
                  Letras já utilizadas: <br />
                  {wrongLetters.map((letter, index) => (
                    <span key={index}>
                      <strong>{letter} </strong>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
