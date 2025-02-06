// Game Constants
export const GRID_SIZE = 16
export const INITIAL_SNAKE = [{ x: 8, y: 8 }]
export const INITIAL_DIRECTION = { x: 1, y: 0 }
export const GAME_SPEED = 150

// Helper Functions
export const generateFood = (snake, gridSize) => {
  const newFood = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  }
  const isOnSnake = snake.some(segment => 
    segment.x === newFood.x && segment.y === newFood.y
  )
  if (isOnSnake) return generateFood(snake, gridSize)
  return newFood
}

export const checkCollision = (head, snake, gridSize) => {
  if (
    head.x < 0 || 
    head.x >= gridSize || 
    head.y < 0 || 
    head.y >= gridSize
  ) {
    return true
  }
  
  return snake.some(segment => 
    segment.x === head.x && segment.y === head.y
  )
} 