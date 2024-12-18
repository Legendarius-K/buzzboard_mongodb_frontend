import { cn } from '@/utils/classnames'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

export const Votes = ({
  userId,
  score,
  upvotes,
  downvotes,
}: {
  postId: string
  userId: string | null
  score: number
  upvotes: string[]
  downvotes: string[]
}) => {
  return (
    <div className='mt-4 flex items-center gap-1'>
      <button
        className={cn(
          'button-tertiary',
          userId && upvotes.includes(userId) && 'text-primary',
        )}
      >
        <ThumbsUp className='w-5' />
      </button>
      <span className='min-w-1 text-center'>{score}</span>
      <button
        className={cn(
          'button-tertiary',
          userId && downvotes.includes(userId) && 'text-primary',
        )}
      >
        <ThumbsDown className='w-5' />
      </button>
    </div>
  )
}
