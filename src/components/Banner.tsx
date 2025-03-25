'use client'
import {useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './banner.module.css'
import Image from 'next/image';
import { useSession } from 'next-auth/react'

export default function Banner (){
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
    const [index,setIndex] = useState(0)
    const router = useRouter()

    const {data:session, status} = useSession()

    if (status === "loading") {
    return <div>Loading...</div>
    }
    console.log(session?.user?.token) // ควรแสดง token ที่ได้
    console.log("Full session data:", session)

    return(
        <div className={styles.banner} onClick={()=>{setIndex(index+1)}}>
            <Image src={covers[index%4]}
            alt="Wedding"
            fill={true}
            objectFit='cover'/>
            <div className={styles.bannerText}>
                <h1 className='max-w-sm mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl text-white '>ค้นหาบริษัทที่ใช่สำหรับคุณ</h1>
                <h3 className='max-w-sm mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-2xl shadow-xl text-white'>ทุกสิ่งที่คุณควรรู้เกี่ยวกับหลากหลายบริษัท รวมไว้ในที่เดียว</h3>
            </div>
            {session?.user?.name && (
            <div className="z-20 absolute top-5 right-10 text-red-400 text-4xl font-bold">
                Welcome {session.user.name}!!!
            </div>
            )}
            {session?.user?.role && (
            <div className="z-20 absolute top-5 left-10 text-red-400 text-4xl font-bold">
                role: {session.user.role}
            </div>
            )}
            <button className='bg-white text-cyan-600 border-cyan--600 font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
                               hover:bg-cyan-600 hover:text-white hover:border-transparent'
                               onClick={(e)=>{e.stopPropagation(); router.push('/venue')}}>
                Select Your Booking NOW
            </button>
        </div>
    );
}