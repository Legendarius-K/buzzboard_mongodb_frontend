'use client'

import { vote } from '@/actions/vote'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { cn } from '@/utils/classnames'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ThumbsDown, ThumbsUp } from 'lucide-react'

export const Votes = ({
  postId,
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
const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationFn: async (type: 'upvote' | 'downvote') => {
      handleServerActionError(await vote({ type, postId }))
    },
    onError: toastServerError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })

  return (
    <div className=' flex items-center'>
      <button
        onClick={(event) => {
          event.stopPropagation()
          mutate('upvote')
        }}
        className={cn(
          'button-tertiary',
          userId && upvotes.includes(userId) && 'text-primary-600',
        )}
      >
        <ThumbsUp className='w-5' />
      </button>
      <span className=' text-center'>{score}</span>
      <button
        onClick={(event) => {
          event.stopPropagation()
          mutate('downvote')
        }}
        className={cn(
          'button-tertiary',
          userId && downvotes.includes(userId) && 'text-primary-600',
        )}
      >
        <ThumbsDown className='w-5' />
      </button>
    </div>
  )
}
