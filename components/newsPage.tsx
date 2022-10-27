import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    news: any[]
}

function NewsPage({ news }: Props) {
    const router = useRouter()
    return (
        <div className='m-5 pt-5'>
            {news.map((subject, i) =>
                <div key={i} className='grid grid-cols-3 my-5 pt-7 border-white rounded-lg border p-2'>
                    <div className='col-span-1 mx-3'>
                        <img className='w-80 h-80' src={subject.imgUrl} alt={subject.alt} />
                    </div>
                    <div className='col-span-1 flex-col flex text-white'>
                        <p className='my-3 text-2xl'>{subject.title}</p>
                        <div>{subject.body}</div>
                        <p className='self-end'>{subject.newsDate}</p>
                        <button
                            onClick={() => router.push(`https://www.gsmarena.com/${subject.link}`)}
                            className='bg-white my-5 text-gray-800 w-40 h-10 font-semibold rounded-lg self-center'>
                            Read more..
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NewsPage