'use server'

import { auth } from '@/lib/auth'
import { client } from '@/lib/client'
import { handleAxiosError } from '@/lib/error-handling'
import { CommentData, commentSchema } from '@/lib/schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createComment = async (data: CommentData, postId: string) => {
  const parsedData = commentSchema.parse(data)
  const accessToken = await auth.getAccessToken()

  if (!accessToken) {
    return { error: 'you have to be logged in to post a comment' }
  }

  try {
    const response = await client.post(`/posts/${postId}/comment`, parsedData, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
  } catch (error) {
    return handleAxiosError(error)
  }

  revalidatePath('/')
  redirect(`/post/${postId}`)
}
