'use client'

import { useMutation } from '@tanstack/react-query'

import { deletePost } from '@/actions/delete-post'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { Trash2 } from 'lucide-react'

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deletePost(postId))
    },
    onError: toastServerError,
  })

  return (
    <button onClick={() => mutate()} className='bg-neutral-700 text-white p-2 rounded-xl hover:bg-neutral-500'>
      <Trash2 size={23} />
    </button>
  )
}
