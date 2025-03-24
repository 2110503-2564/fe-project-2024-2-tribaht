'use client'
import Card from "@/components/Card";
import { useReducer, useState } from "react";
import Link from "next/link";
import { useRef,useEffect } from "react";
import getVenues from "@/libs/getVenues";
import { VenueItem, VenueJson } from "../../interface";

export default function CardPanel(){

    const [venueResponse,setVenueResponse] = useState<VenueJson|null>(null)

    useEffect(()=>{
        const fetchData = async ()=>{
            const venues = await getVenues()
            setVenueResponse(venues)
        }
        fetchData()
    },[])

    const countRef = useRef(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const defaultVenue = new Map<string, number>([
        ["The Bloom Pavilion", 0],
        ["Spark Space", 0],
        ["The Grand Table", 0],
    ]);

    const cardReducer = (
        venueList: Map<string, number>,
        action: { type: string, venueName: string, rating?: number }
    ) => {
        const newVenueList = new Map(venueList);
    
        switch(action.type){
            case 'add': 
                newVenueList.set(action.venueName, action.rating ?? 0);
                return newVenueList;
            case 'remove': 
                newVenueList.delete(action.venueName);
                return newVenueList;
            default: 
                return venueList;
        }
    }
    const [ venueList, dispatchVenueList ] = useReducer(cardReducer, defaultVenue)

    /**
     *  Mock Data for Demontration Only
     */
    // const mockVenueRepo = [
    //     {vid:"001",name: "The Bloom Pavilion",image: "/img/bloom.jpg"},
    //     {vid:"002",name: "Spark Space",image: "/img/sparkspace.jpg"},
    //     {vid:"003",name: "The Grand Table",image: "/img/grandtable.jpg"},
    // ]

    if(!venueResponse) return(<p>Card Panal is Loding ...</p>)


    return(
        <div>
            <div style={{margin:"20px",display:"flex",
      flexDirection:"row",flexWrap:"wrap",
      justifyContent:"space-around",alignContent:"space-around"
      }}>
            {
                venueResponse.data.map((venueItem:VenueItem)=>(
                    <Link href={`/venue/${venueItem.id}`} className="w-1/5">
                    <Card venueName={venueItem.name} imgSrc={venueItem.picture} 
                        onCompare={(venue:string, rating:number)=>dispatchVenueList({type:'add',venueName:venue, rating})}/>
                    </Link> 
                ))
            }
            </div>
            <div className="w-full text-xl font-medium text-black">Venue List with Rantins: {venueList.size}</div>
                {Array.from(venueList).map(([venueName, rating]) =>(
                    <div className="text-black" key={venueName}  data-testid={venueName}
                onClick={()=>dispatchVenueList({type:'remove',venueName})}>{venueName} Rating: {rating}
            </div> ))}

            <button name='Book Venue' className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={()=>{countRef.current = countRef.current+1; alert(countRef.current) }}>
                Count with Ref Object
            </button>
            <input type="text" placeholder="Please fill" className="block text-gray-900 text-sm rounded-lg p-2 m-2 bg-purple-50
            ring-inset ring-purple-400 focus:outline-none focus:bg-purple-200 focus:ring-2" 
            ref={inputRef}/>
            <button name='Book Venue' className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={()=>{ if(inputRef.current!=null) inputRef.current.focus()}}>
                Focus Input
            </button>

        </div>
    )
}