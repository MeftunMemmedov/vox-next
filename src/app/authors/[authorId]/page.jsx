import { fetchAuthors } from '@/api/authors'
import { fetchNews } from '@/api/news'
import SingleNews from '@/components/news/SingleNews'
import React from 'react'

const page =async ({params}) => {
    const authors=await fetchAuthors('/News-Authors?select=*')
    const authorName=decodeURIComponent(params.authorId)
    const newsByAuthor= await fetchNews(`/News2?written_by=eq.${authorName}`)
    const currentAuthor=authors.find(author=>author.name===authorName)


  return (
    <main className='container m-auto'>
        <section>
            <div className=' flex py-12'>
                <div className='w-1/5 flex justify-center items-center'>
                    <div className='w-32 h-32 rounded-full overflow-hidden'>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" className='w-full h-full' alt="" />
                    </div>
                </div>
                <div className='w-4/5'>
                    <div className=''>
                        <h2 className='text-4xl font-semibold'>{currentAuthor.name}</h2>
                    </div>
                </div>
            </div>
        </section>
        <section>
           <div className='w-11/12 m-auto'>
           {
                newsByAuthor.map((news, index)=>(
                    <SingleNews singleNews={news}/>
                ))
            }
           </div>
        </section>
    </main>
  )
}

export default page