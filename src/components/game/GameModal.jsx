export const GameModal = ({
  gameOver,
  showCountdown,
  countdown,
  score,
  highScore,
  isPaused,
  onResume,
  onRestart,
}) => {
  if (!gameOver && !showCountdown && !isPaused) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {showCountdown ? (
          <div className="game-over-score">{countdown}</div>
        ) : gameOver ? (
          <>
            <h2 className="game-over-title">Game Over!</h2>
            <div className="game-over-score">{score}</div>
            {score === highScore && score > 0 && (
              <p className="text-yellow-400 mb-4">🏆 New High Score! 🏆</p>
            )}
            <button
              onClick={onRestart}
              className="game-button"
            >
              🎮 Play Again
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Game Paused</h2>
            <div className="space-y-4">
              <button
                onClick={onResume}
                className="game-button"
              >
                ▶ Resume
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
} 