import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const GRID_SIZE = 16
const INITIAL_SNAKE = [{ x: 8, y: 8 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const GAME_SPEED = 150

export default function PlayPage() {
  const navigate = useNavigate()
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState({ x: 5, y: 5 })
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    )
    if (isOnSnake) return generateFood()
    return newFood
  }, [snake])

  const checkCollision = useCallback((head) => {
    if (
      head.x < 0 || 
      head.x >= GRID_SIZE || 
      head.y < 0 || 
      head.y >= GRID_SIZE
    ) {
      return true
    }
    
    return snake.some(segment => 
      segment.x === head.x && segment.y === head.y
    )
  }, [snake])

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return

    const newSnake = [...snake]
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y
    }

    if (checkCollision(head)) {
      setGameOver(true)
      return
    }

    newSnake.unshift(head)

    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 1)
      setFood(generateFood())
    } else {
      newSnake.pop()
    }

    setSnake(newSnake)
  }, [snake, direction, food, gameOver, isPaused, checkCollision, generateFood])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return

      // Prevent default scrolling behavior for arrow keys
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      const keyDirections = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
      }

      const newDirection = keyDirections[e.key]
      if (!newDirection) return

      if (
        (direction.x === -newDirection.x && direction.y === -newDirection.y) ||
        (direction.x === newDirection.x && direction.y === newDirection.y)
      ) {
        return
      }

      setDirection(newDirection)
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, gameOver])

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameInterval)
  }, [moveSnake])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(generateFood())
    setGameOver(false)
    setScore(0)
    setIsPaused(false)
  }

  const getCellContent = (x, y) => {
    if (snake[0].x === x && snake[0].y === y) {
      return 'snake-cell'
    }
    if (snake.some(segment => segment.x === x && segment.y === y)) {
      return 'snake-cell'
    }
    if (food.x === x && food.y === y) {
      return 'food-cell'
    }
    return 'game-cell'
  }

  return (
    <div className="game-container">
      <div className="game-controls">
        <div className="score">Score: {score}</div>
        <div className="space-x-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="game-button"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="game-button"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="game-grid">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE
          const y = Math.floor(index / GRID_SIZE)
          return (
            <div
              key={index}
              className={getCellContent(x, y)}
            />
          )
        })}
      </div>

      {gameOver && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-bold text-white mb-4">Game Over!</h2>
            <p className="text-white mb-4">Final Score: {score}</p>
            <button
              onClick={resetGame}
              className="game-button"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 