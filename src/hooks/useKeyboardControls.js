import { useEffect } from 'react'

export const useKeyboardControls = ({
  direction,
  setDirection,
  isPaused,
  setIsPaused,
  gameOver,
  showCountdown
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver || showCountdown) return

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }

      if (e.key === 'Escape') {
        setIsPaused(prev => !prev)
        return
      }

      if (isPaused) return

      const keyDirections = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
      }

      const newDirection = keyDirections[e.key]
      if (!newDirection) return

      // Prevent 180-degree turns
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
  }, [direction, gameOver, isPaused, showCountdown, setDirection, setIsPaused])
} 