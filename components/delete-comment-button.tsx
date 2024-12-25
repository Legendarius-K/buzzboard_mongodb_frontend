'use client'

import { useMutation } from '@tanstack/react-query'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { deleteComment } from '@/actions/delete-comment'
import { Trash2 } from 'lucide-react'

export const DeleteCommentButton = ({ postId, commentId }: { postId: string, commentId: string }) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deleteComment(postId, commentId))
    },
    onError: toastServerError,
  })

  return (
    <button
      onClick={() => mutate()}
      className='absolute right-3 top-3 rounded bg-neutral-700 p-1 text-sm text-white hover:bg-neutral-500'
    >
      <Trash2 size={18} />
    </button>
  )
}
