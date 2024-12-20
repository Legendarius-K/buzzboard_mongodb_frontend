'use client'

import { useMutation } from '@tanstack/react-query'

import { deletePost } from '@/actions/delete-post'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { deleteComment } from '@/actions/delete-comment'

export const DeleteCommentButton = ({ postId, commentId }: { postId: string, commentId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deleteComment(postId, commentId))
    },
    onError: toastServerError,
  })

  return (
    <button onClick={() => mutate()} className='absolute right-3 top-3 text-sm text-white px-[5px] rounded bg-red-600'>
      {isPending ? 'deleting comment...' : 'X'}
    </button>
  )
}
