import { useState, useCallback, useEffect } from 'react'
import { INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED, GRID_SIZE, generateFood, checkCollision } from '../utils/gameUtils'

export const useSnakeGame = () => {

   const [snake, setSnake] = useState(INITIAL_SNAKE)
   const [direction, setDirection] = useState(INITIAL_DIRECTION)
   const [food, setFood] = useState({ x: 5, y: 5 })
   const [gameOver, setGameOver] = useState(false)
   const [score, setScore] = useState(0)
   const [isPaused, setIsPaused] = useState(false)

   const [highScore, setHighScore] = useState(() => {
      const saved = localStorage.getItem('snakeHighScore')
      return saved ? parseInt(saved) : 0
   })

   const [showCountdown, setShowCountdown] = useState(false)
   const [countdown, setCountdown] = useState(3)

   const moveSnake = useCallback(() => {
      if (gameOver || isPaused || showCountdown) return

      const newSnake = [...snake]
      const head = {
         x: newSnake[0].x + direction.x,
         y: newSnake[0].y + direction.y
      }

      if (checkCollision(head, snake, GRID_SIZE)) {
         setGameOver(true)
         if (score > highScore) {
            setHighScore(score)
            localStorage.setItem('snakeHighScore', score.toString())
         }
         return
      }

      newSnake.unshift(head)

      if (head.x === food.x && head.y === food.y) {
         setScore(prev => prev + 1)
         setFood(generateFood(newSnake, GRID_SIZE))
      } else {
         newSnake.pop()
      }

      setSnake(newSnake)
   }, [snake, direction, food, gameOver, isPaused, showCountdown, score, highScore])

   const startCountdown = useCallback(() => {
      setShowCountdown(true)
      setCountdown(3)
      const interval = setInterval(() => {
         setCountdown(prev => {
            if (prev <= 1) {
               clearInterval(interval)
               setShowCountdown(false)
               return 0
            }
            return prev - 1
         })
      }, 1000)
   }, [])

   const resetGame = useCallback(() => {
      setSnake(INITIAL_SNAKE)
      setDirection(INITIAL_DIRECTION)
      setFood(generateFood(INITIAL_SNAKE, GRID_SIZE))
      setGameOver(false)
      setScore(0)
      setIsPaused(false)
      startCountdown()
   }, [startCountdown])

   useEffect(() => {
      const gameInterval = setInterval(moveSnake, GAME_SPEED)
      return () => clearInterval(gameInterval)
   }, [moveSnake])

   return {
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
   }
} 
