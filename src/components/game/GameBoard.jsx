import { GRID_SIZE } from '../../utils/gameUtils'
import { GameCell } from './GameCell'

export const GameBoard = ({ snake, food }) => {
   const getCellContent = (x, y) => {
      // Check if this cell is the snake's head
      if (snake[0].x === x && snake[0].y === y) {
         return 'snake'
      }
      // Check if this cell is part of the snake's body
      if (snake.some(segment => segment.x === x && segment.y === y)) {
         return 'snake'
      }
      // Check if this cell contains food
      if (food.x === x && food.y === y) {
         return 'food'
      }
      return 'game'
   }

   return (
      <div className="game-grid">
         {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE
            const y = Math.floor(index / GRID_SIZE)
            return (
               <GameCell
                  key={index}
                  type={getCellContent(x, y)}
               />
            )
         })}
      </div>
   )
} 
