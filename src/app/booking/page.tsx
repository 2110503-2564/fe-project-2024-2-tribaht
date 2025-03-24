'use client'
import DateReserve from "@/components/DateReserve"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions"
import getUserProfile from "@/libs/getUserProfile"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import dayjs,{ Dayjs } from "dayjs"
import { AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { BookingItem } from "../../../interface"
import { addBooking } from "@/redux/features/bookSlice"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import { Select,MenuItem,TextField} from "@mui/material"

export default function Bookings(){

    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null)
    const [nameLastName, setNameLastName] = useState("")
    const [tel, setTel] = useState("")
    const [venue, setVenue] = useState("Bloom")

    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if(nameLastName && venue && tel && pickupDate){
            const item:BookingItem = {
                nameLastname: nameLastName,
                tel: tel,
                venue: venue,
                bookDate:dayjs(pickupDate).format("DD/MM/YYYY"),
            }
            dispatch(addBooking(item))
        }
    }


    const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setNameLastName(event.target.value);
    };
    
      const handleTelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTel(event.target.value);
      };
    
      const handleVenueChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setVenue(event.target.value as string);
      };
    
      const handleDateChange = (value: Dayjs | null) => {
        setPickupDate(value);
      };
    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-black text-xl font-medium">Venue Booking</div>
            <div className="text-black text-xl font-medium">Venue: {venue}</div>
            
            <div className="w-fit space-y-2">
                <TextField name="Name-Lastname" label="Name-Lastname" variant="standard" value={nameLastName} onChange={handleNameChange}/>
                <TextField name="Contact-Number" label="Contact-Number" variant="standard" value={nameLastName} onChange={handleTelChange} />
                <div className="text-md text-left text-gray-600">Pick-Up Date and Location</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Pick a Date"
                        value={pickupDate}
                        onChange={handleDateChange}/>
                </LocalizationProvider>
                <Select
                        label="Venue"
                        value={venue}
                        onChange={(e)=>{setVenue(e.target.value);{handleVenueChange}}}>
                        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
                        <MenuItem value="Spark">Spark Space</MenuItem>
                        <MenuItem value="GrandTable">The Grand Table</MenuItem>
        </Select>
            </div>

            <button name='Book Venue' className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
            text-white shadow-sm" onClick={makeBooking}>Booking this Venue
            </button>  

        </main>
    )
}