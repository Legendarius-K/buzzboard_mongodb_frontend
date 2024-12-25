'use client'

import { useMutation } from '@tanstack/react-query'

import { deletePost } from '@/actions/delete-post'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { LoaderPinwheel, Trash2 } from 'lucide-react'

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deletePost(postId))
    },
    onError: toastServerError,
  })

  return (
    <button
      onClick={() => mutate()}
      className='rounded-xl bg-neutral-700 p-2 text-white hover:bg-neutral-500'
    >
      {!isPending ? <Trash2 size={23} /> : <LoaderPinwheel className='animate-spin' size={23} />}
    </button>
  )
}
