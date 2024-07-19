import "./StartScreen.css"

export const StartScreen = ({ startGame }) => {
  return (
    <div className='start'>
      <h1>Italia Secret Word</h1>
      <p>Teste seus conhecimentos sobre a Italia!</p>
      <button onClick={startGame}>Começar o Jogo</button>
    </div>
  )
}
