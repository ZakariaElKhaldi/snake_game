import { useSnakeGame } from '../hooks/useSnakeGame'
import { useKeyboardControls } from '../hooks/useKeyboardControls'
import { GameBoard } from '../components/game/GameBoard'
import { GameControls } from '../components/game/GameControls'
import { GameModal } from '../components/game/GameModal'

export default function PlayPage() {
  const {
    snake,
    direction,
    setDirection,
    food,
    gameOver,
    score,
    highScore,
    isPaused,
    setIsPaused,
    showCountdown,
    countdown,
    resetGame
  } = useSnakeGame()

  useKeyboardControls({
    direction,
    setDirection,
    isPaused,
    setIsPaused,
    gameOver,
    showCountdown
  })

  return (
    <div className="game-container">
      <GameControls
        score={score}
        highScore={highScore}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      <GameBoard
        snake={snake}
        food={food}
      />

      <GameModal
        gameOver={gameOver}
        showCountdown={showCountdown}
        countdown={countdown}
        score={score}
        highScore={highScore}
        isPaused={isPaused}
        onResume={() => setIsPaused(false)}
        onRestart={resetGame}
      />
    </div>
  )
} 