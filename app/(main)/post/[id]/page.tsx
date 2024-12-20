import { notFound } from 'next/navigation'
import Link from 'next/link'

import { getPost } from '@/lib/queries'
import { auth } from '@/lib/auth'
import { DeletePostButton } from '@/components/delete-post-button'
import { User } from 'lucide-react'
import { commentSchema } from '@/lib/schemas'
import { CreateCommentForm } from '@/components/comment-form'

export const revalidate = 60 * 15 // 15 min

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const post = await getPost(id)

  if (!post) {
    return notFound()
  }

  const user = await auth.getUser()
  const isAuthor = user && user.id === post.author.id

  return (
    <main className='main p-6'>
      <article className='space-y-4 rounded-lg bg-white p-6'>
        <header className='flex items-start justify-between'>
          <div className='space-y-1'>
            <span className='flex items-center gap-2 text-zinc-600'>
              <User className='w-4' />
              {post.author.username}
            </span>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
          </div>
          {isAuthor && (
            <div className='flex gap-3'>
              <Link href={`/post/${post.id}/edit`} className='button-secondary'>
                edit
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </header>
        <p>{post.content}</p>
      </article>
      <CreateCommentForm postId={post.id}/>
      {post.comments?.map((comment, index) => (
        <div className='m-2 rounded bg-white p-4' key={index}>
          <h2 className='flex items-center gap-2'>
            <User className='w-4' />
            {comment.author.username}
          </h2>
          <p>{comment.content}</p>
        </div>
      ))}
    </main>
  )
}
