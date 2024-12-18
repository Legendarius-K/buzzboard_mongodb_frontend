import Link from 'next/link'

import { auth } from '@/lib/auth'
import { LogOutButton } from './log-out-button'
import horns from '../public/horns.svg'
import Image from 'next/image'

export const Header = async () => {
  const user = await auth.getUser()

  return (
    <header className='flex h-16 w-full items-center justify-between gap-4 px-4 py-2 md:px-20 bg-neutral-200 shadow-lg'>
      <Link href='/' className='text-2xl font-bold flex items-center'>
        Schreddit
        <Image className='w-10' src={horns} alt='horns'/>
      </Link>
      {user ? (
        <div className='flex gap-4'>
          <Link href='/create' className='button-primary'>
            Create
          </Link>
          <LogOutButton />
        </div>
      ) : (
        <Link href='/auth/log-in' className='button-primary'>
          Log in
        </Link>
      )}
    </header>
  )
}
