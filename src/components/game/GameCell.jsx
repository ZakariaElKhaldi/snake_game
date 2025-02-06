export const GameCell = ({ type }) => {
  return (
    <div className={type === 'game' ? 'game-cell' : `${type}-cell`} />
  )
} 