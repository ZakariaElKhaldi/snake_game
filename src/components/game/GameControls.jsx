export const GameControls = ({
  score,
  highScore,
  isPaused,
  setIsPaused,
}) => {
  return (
    <div className="game-controls">
      <div className="score">Score: {score}</div>
      <div className="score">High Score: {highScore}</div>
      <div className="space-x-4">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="game-button"
        >
          {isPaused ? '▶ Resume' : '⏸ Pause'}
        </button>
      </div>
    </div>
  )
} 