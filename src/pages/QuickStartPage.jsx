import { useNavigate } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/solid'

export default function QuickStartPage() {
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  return (
    <div className="game-container">
      <div className="container max-w-lg space-y-8 text-center">
        <h1 className="text-4xl font-bold text-white">
          {username ? `Welcome back, ${username}!` : 'Welcome to Snake Game!'}
        </h1>

        <div className="modal-content">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <ul className="instruction-list">
            <li>Use arrow keys to control the snake's direction</li>
            <li>Collect red coins to grow longer</li>
            <li>Avoid hitting the walls or yourself</li>
            <li>Try to achieve the highest score!</li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/play')}
            className="game-button w-full"
          >
            <span>Play Now</span>
            <ArrowRightIcon className="h-5 w-5" />
          </button>

          {!username && (
            <button
              onClick={() => navigate('/auth')}
              className="link"
            >
              Sign in to save your progress
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 