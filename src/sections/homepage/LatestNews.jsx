import { fetchNews } from '@/api/news'
import SingleNews from '@/components/news/SingleNews'
import React from 'react'

const LatestNews = async() => {
    const news=await fetchNews('/News2?select=*', 60)
    const latestNews=news.slice(8)
  return (
    <div className='container m-auto my-32 '>
        <h2 className='
        relative text-3xl font-semibold italic
        after:content-[""] after:w-[50%] after:h-1 after:bg-yellow-400 after:absolute after:ml-4 after:top-5
        '
        >The Latest</h2>

        <div className='md:w-3/4 w-full'>
            {
                latestNews.map((singleNews,index)=>(
                    <SingleNews singleNews={singleNews} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default LatestNews