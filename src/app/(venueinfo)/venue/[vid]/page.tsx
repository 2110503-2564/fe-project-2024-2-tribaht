import Image from "next/image"
import getVenue from "@/libs/getVenue"
import Link from "next/link"


export default async function VenueDetaiPage({params}:{params:{vid:string}}) {

    const venueDetai = await getVenue(params.vid)
    /**
     *  Mock Data for Demonstration Only
     */
    // const mockVenueRepo = new Map()
    // mockVenueRepo.set("001",{name: "The Bloom Pavilion",image: "/img/bloom.jpg"})
    // mockVenueRepo.set("002",{name: "Spark Space",image: "/img/sparkspace.jpg"})
    // mockVenueRepo.set("003",{name: "The Grand Table",image: "/img/grandtable.jpg"})


    return(
        <main className="text-center p-5 text-black">
            <h1 className="text-lg font-medium">{venueDetai.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={venueDetai.data.picture }
                alt='Venue Image'
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">{ venueDetai.data.name  }
                <div className="text-md mx-5">Name: { venueDetai.data.name  }</div>
                <div className="text-md mx-5">Address: { venueDetai.data.address  }</div>
                <div className="text-md mx-5">District: { venueDetai.data.district  }</div>
                <div className="text-md mx-5">Postalcode: { venueDetai.data.postalcode  }</div>
                <div className="text-md mx-5">Tel: { venueDetai.data.tel  }</div>
                <div className="text-md mx-5">Daily Rate: { venueDetai.data.dailyrate }</div>
                
                <Link href={`/booking?id=${params.vid}&name=${venueDetai.data.name}`}>
                <button name='Book Venue' className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2
                        text-white shadow-sm">Make Venue
                </button>  
                </Link>
                </div>

                
            </div>
        </main>
    )
}

// export async function generateStaticParams() {
//     return [{vid:'001'},{vid:'002'},{vid:'003'}]
// }