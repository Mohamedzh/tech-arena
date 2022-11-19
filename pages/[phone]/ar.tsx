import { Category, Phone, PhoneQuickSpecs, PhoneSpecs, Spec } from '@prisma/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect, useState } from 'react'
import Page404 from '../../components/page404'
import PhoneDetails from '../../components/phoneDetails'
import { prisma } from '../../lib/db'
import { DetailedCategory } from '../../types'
import { v2 } from '@google-cloud/translate'

type Props = {
    currentPhone?: any
    categories: DetailedCategory[]
    otherPhones: Phone[]
}

function Index({ currentPhone, categories, otherPhones }: Props) {
    const router = useRouter()
    const [arLang, setArLang] = useState<boolean>(false)
    useEffect(() => { if (router.asPath.includes('/ar')) { setArLang(true) } }, [router.asPath])

    return (
        <div className='ar'>
            {currentPhone ?
                <PhoneDetails currentPhone={currentPhone} categories={categories} otherPhones={otherPhones} arLang={arLang} />
                :
                <Page404 arLang={arLang}/>
            }
        </div>
    )
}

export default Index

export const getStaticPaths: GetStaticPaths = async () => {
    const brands = await prisma.brand.findMany({ include: { phones: { select: { name: true } } } })


    let paths: { params: { phone: string } }[] = []
    for (let i = 0; i < brands.length; i++) {
        paths = brands[i].phones.map(phone => {
            return {
                params: { phone: phone.name }
            }
        })
    }

    return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }: { params?: ParsedUrlQuery }) => {
    let currentPhone: Phone & { PhoneSpecs: (PhoneSpecs & { spec: Spec & { category: Category; }; })[]; PhoneQuickSpecs: PhoneQuickSpecs[]; } | null = null;
    let categories: (Category & { specs: Spec[] })[] = [];
    let otherPhones: Phone[] = []

    const { Translate } = v2

    async function transArabic(text: string, target: string) {
        const projectId = 'gadgets-hub-368213';
        const credentials = JSON.parse(
            Buffer.from(process.env.TRANSLATE_KEY!, 'base64').toString()
        )
        const translate = new Translate({ projectId, credentials });
        const [translation] = await translate.translate(text, target);
        return translation
    }

    try {
        let newPhone = params?.phone as string
        // newPhone = newPhone.slice(0, 1).toUpperCase() + params?.phone?.slice(1)
        currentPhone = await prisma.phone.findFirst({ where: { name: newPhone }, include: { PhoneSpecs: { include: { spec: { include: { category: true } } } }, PhoneQuickSpecs: true } })
        if (currentPhone) {
            for (let i = 0; i < currentPhone.PhoneQuickSpecs.length; i++) {
                currentPhone.PhoneQuickSpecs[i].value = await transArabic(currentPhone.PhoneQuickSpecs[i].value, 'ar')
                currentPhone.PhoneQuickSpecs[i].quickspecName = await transArabic(currentPhone.PhoneQuickSpecs[i].quickspecName, 'ar')
            }
            for (let j = 0; j < currentPhone.PhoneSpecs.length; j++) {
                currentPhone.PhoneSpecs[j].spec.categoryName = await transArabic(currentPhone.PhoneSpecs[j].spec.categoryName, 'ar')
                currentPhone.PhoneSpecs[j].spec.name = await transArabic(currentPhone.PhoneSpecs[j].spec.name, 'ar')
                currentPhone.PhoneSpecs[j].value = await transArabic(currentPhone.PhoneSpecs[j].value, 'ar')
            }

        }
        otherPhones = await prisma.phone.findMany({ where: { brandName: currentPhone?.brandName }, take: 4, skip: 1, cursor: { id: currentPhone?.id }, orderBy: { id: 'desc' } })

        categories = await prisma.category.findMany({ include: { specs: true } })
        for (let k = 0; k < categories.length; k++) {
            categories[k].name = await transArabic(categories[k].name, 'ar')
        }
    } catch (error) {
        console.log(error)
    }

    return { props: { phone: params?.phone, currentPhone, categories, otherPhones }, revalidate: 604800 }
}