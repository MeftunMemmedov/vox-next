import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center py-20'>
      <p className='md:text-9xl text-5xl font-bold'>404</p>
      <p className='text-xl'>Page is not found. Return to: <Link href={'/'}>HOME</Link></p>
    </div>
  )
}

export default NotFound