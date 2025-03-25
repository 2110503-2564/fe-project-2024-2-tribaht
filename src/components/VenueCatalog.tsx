import Link from "next/link"
import Card from "./Card";
import { VenueItem, VenueJson } from "../../interface"

export default async function VenueCatalog({venuesJson}:{venuesJson:Promise<VenueJson>}) {
    const venueJsonReady = await venuesJson
    
    return(
        <>
        Explore {venueJsonReady.count} models in our catalog
        <div style={{margin:"20px",display:"flex",
      flexDirection:"row",flexWrap:"wrap",
      justifyContent:"space-around",alignContent:"space-around"
      }}>
            {
                venueJsonReady.data.map((venueItem:VenueItem)=>(
                    <Link key={venueItem.id} href={`/venue/${venueItem.id}`} className="w-1/5">
                    <Card venueName={venueItem.name} imgSrc={venueItem.picture}/> 
                    </Link> 
                ))
            }
            </div>
        </>
    )
}