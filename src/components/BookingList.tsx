'use client'
import { AppDispatch, useAppSelector } from "@/redux/store"
import {  useDispatch  } from "react-redux"
import  { removeBooking } from "@/redux/features/bookSlice"
import { BookingItem,CompanyItem } from "../../interface"
 
export default function BookingList(){

    const venueItems = useAppSelector((state)=> state.bookSlice.bookItems ) 
    const dispatch = useDispatch<AppDispatch>()
    return(
        <>
    
        {
                venueItems.length == 0? 'No Venue Booking': venueItems.map((bookingItems: CompanyItem) => (
                <div className="text-black bg-slate-200 rounded px-5 mx-5 py-2 my-2">
                    {bookingItems.name}
                        <div className="text-xl">{bookingItems.name}</div>
                        <div className="text-xl">{bookingItems.tel}</div>
                        <div className="text-xl">{bookingItems.bookDate}
                        </div>
                        <button name='Book Venue' className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick ={()=>dispatch(removeBooking(bookingItems))}>Remove from Booking
            </button> 
                </div>
            ))
        }
        </>
    )
}