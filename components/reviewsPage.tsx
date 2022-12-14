import { Review } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
    reviews: Review[]
}

function ReviewsPage({ reviews }: Props) {
    return (
        <div className='max-w-max m-5 text-white grid grid-cols-2 lg:grid-cols-3 mx-auto'>
            {reviews.map((review, i) =>
                <div key={i} className='flex flex-col m-5 '>
                    <Link href={`https://www.gsmarena.com/${review.link}`}>
                        <a target='_blank'>
                            <img className='rounded-lg mx-auto' src={review.imgUrl} />
                        </a>
                    </Link>
                    <p className={`text-center lg:text-xl my-1 ${review.title.length > 35 ? 'text-sm' : ''}`}>{review.title}<br></br> {review.title.length < 40 && <br></br>}</p>
                    <p className='text-end text-xs lg:text-sm lg:mr-10'>{review.reviewDate}</p>
                </div>
            )}
        </div>
    )
}

export default ReviewsPage