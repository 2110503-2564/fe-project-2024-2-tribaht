'use client'
import React, { Children } from 'react';

export default function InteractiveCard({children,contenName}:{children:React.ReactNode,contenName:string}){

    function onVenueSelected(){
        alert("You select " + contenName)
    }

    function onCardMouseAction(event:React.SyntheticEvent){
        if(event.type == 'mouseover'){
            event.currentTarget.classList.remove('shadow-lg','rounded-lg','bg-white')
            event.currentTarget.classList.add('shadow-2xl','rounded-lg','bg-neutral-200')
        }else{
            event.currentTarget.classList.remove('shadow-2xl','rounded-lg','bg-neutral-200')  
            event.currentTarget.classList.add('shadow-lg','rounded-lg','bg-white')
        }
    }

    return(
        <div className='bg-white w-full h-[300px] rounded-lg shadow-lg' 
        onMouseOver={(e)=>onCardMouseAction(e)}
        onMouseOut={(e)=>onCardMouseAction(e)}>
            {children}
        </div>
    );
}