import getVenues from "@/libs/getVenues"
import VenueCatalog from "@/components/VenueCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"
import CardPanel from "@/components/CardPanel"

export default async function Venue(){
    
    const venues =  await getVenues()
    
    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-xl font-medium">Select Your VenueBooking</h1>
            <Suspense fallback={<p>Loding ...<LinearProgress/></p>}>
            <VenueCatalog venuesJson ={venues} />
            </Suspense>

            <hr className="my-10" />
        </main>
    )
}