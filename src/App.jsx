// CSS
import "./App.css"

// React
import { useState, useCallback, useEffect } from "react"

// Data
import { wordsList } from "./data/words.jsx"

// Components
import { StartScreen } from "./components/StartScreen"
import { Game } from "./components/Game.jsx"
import { GameOver } from "./components/GameOver.jsx"

// Estágios do jogo
const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]
const guessesMax = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesMax)
  const [score, setScore] = useState(0)
  const [showWin, setShowWin] = useState(false)

  const pickWordAndCategory = () => {
    // escolhe uma Categoria randomica
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // escolhe uma Palavra da Categoria escolhida acima
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }

  // Iniciar Jogo
  const startGame = () => {
    // Escolhe Palavra e Categoria
    const { word, category } = pickWordAndCategory()
    console.log(word, category)

    // Cria lista com as letras das palavras
    let wordLetters = word.toLowerCase().split("")
    console.log(wordLetters)

    // Fill States
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)
    setShowWin(false)
    setGuesses(guessesMax)

    setGameStage(stages[1].name)
  }

  // Processar letras
  const verifyLetter = (letter) => {
    console.log(letter)

    // Se a letra já foi escolhida, não permitir escolha novamente
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return
    }

    // Verifica se a letra está na palavra
    if (letters.includes(letter)) {
      // Adiciona a letra na lista de letras já escolhidas
      setGuessedLetters((prev) => [...prev, letter])
    } else {
      // Adiciona a letra na lista de letras erradas
      setWrongLetters((prev) => [...prev, letter])

      // Diminui o número de tentativas
      setGuesses(guesses - 1)
    }
  }

  const resetLetters = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  // CONDIÇÃO DERROTA: monitorando as tentativas restantes
  useEffect(() => {
    if (guesses <= 0) {
      // Reset letter States
      resetLetters()

      setGameStage(stages[2].name)
    }
  }, [guesses])

  // CONDIÇÃO VITORIA: Monitorando quando a palavra for acertada e alteração do Score
  useEffect(() => {
    if (
      letters.every((letter) => guessedLetters.includes(letter)) &&
      gameStage === "game"
    ) {
      setScore((prev) => prev + 100)
      //
      setShowWin(true)
      setTimeout(() => {
        resetLetters()
        startGame()
      }, 3000)
    }
  }, [letters, guessedLetters, gameStage])

  // Reiniciar Jogo
  const retry = () => {
    setGuesses(guessesMax)
    setScore(0)
    setGameStage(stages[1].name)
  }

  return (
    <>
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          showWin={showWin}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </>
  )
}

export default App
