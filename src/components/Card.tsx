'use client'
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import { useState } from 'react';

export default function Card({venueName,imgSrc,onCompare}:{venueName:string,imgSrc:string,onCompare?:Function}){
    const [rating, setRating] = useState<number | null>(0);

    const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
        event.stopPropagation();
        setRating(newValue);  
        if (newValue !== null && onCompare) {  
            onCompare(venueName, newValue); 
        }
    };
    return(
        <InteractiveCard contenName={venueName}>
            <div className='w-full h-[70%] relative rounded-t-lg overflow-hidden' >
                <Image src ={imgSrc}
                alt ='Product Picture'
                fill= {true}
                className = 'object-cover rounded-t-lg'
                />
            </div>
            <div className='flex items-center justify-center w-full h-[15%] p-[10px] text-center text-black font-bold'>{venueName}</div>
            {onCompare ? (
                <Rating 
                    id={`${venueName} Rating`}
                    name={`${venueName} Rating`}
                    data-testid={`${venueName} Rating`}  
                    precision={0.5} 
                    value={rating}
                    onChange={handleRatingChange}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />):""}
        </InteractiveCard>
    );
}