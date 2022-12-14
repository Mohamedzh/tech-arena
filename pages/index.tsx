import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Slider from '../components/slider'
import { prisma } from '../lib/db'
import News from '../components/news'
import { getLatestNews, getLatestReviews, getLatestReviewsPics } from '../lib/cheerio'
import { NewsType, ReviewType } from '../types'
import { Phone } from '@prisma/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Home: NextPage = ({
  news, reviews, latestPhones }: {
    news?: NewsType[], reviews?: ReviewType[], latestPhones?: Phone[]
  }) => {
  const router = useRouter()
  const [arLang, setArLang] = useState<boolean>(false)
  useEffect(() => { if (router.asPath.includes('/ar')) { setArLang(true) } }, [router.asPath])

  return (
    <div className='bg-gray-900 container lg:mx-10'>
      <Head>
        <title>Gadgets Hub</title>
        <meta name="description" content="Mobile phone database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {reviews && news && latestPhones &&
        <div>
          <Slider reviews={reviews} news={news} latestPhones={latestPhones} arLang={arLang} />
          <News news={news} arLang={arLang} />
        </div>
      }
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const latestPhones = await prisma.phone.findMany({ take: 5, orderBy: { id: 'desc' } })
  const news = await getLatestNews()
  const latestNews = news.filter((item, i) => i < 6)

  const reviews = await getLatestReviews()
  const latest = reviews.filter((subject, i) => i < 4)

  const modified = await getLatestReviewsPics(latest)

  return { props: { news: latestNews, reviews: modified, latestPhones }, revalidate: 28800 }
}
