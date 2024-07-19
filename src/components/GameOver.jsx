import "./GameOver.css"

export const GameOver = ({ retry, score }) => {
  const handleRetry = () => {
    retry()
  }
  return (
    <div>
      <h1>Game Over</h1>
      <h2>
        Sua pontuação:
        <p className='score'>{score}</p>
      </h2>
      <button onClick={handleRetry}>Reiniciar</button>
    </div>
  )
}
