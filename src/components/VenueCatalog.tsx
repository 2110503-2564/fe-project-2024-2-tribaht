import Link from "next/link";
import Card from "./Card";
import { VenueItem, VenueJson } from "../../interface";

export default async function VenueCatalog({ venuesJson }: { venuesJson: Promise<VenueJson> }) {
    const venueJsonReady = await venuesJson;

    return (
        <div style={{ backgroundImage: "url('/img/BackJobFair.jpg')"}}
            className="container mx-auto px-4 py-8 bg-cover bg-center" 
        >
            <div className="bg-blue-600 text-white text-center py-4 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold uppercase tracking-wide">Join Our Job Fair</h1>
                <p className="text-lg mt-2">Explore {venueJsonReady.count} opportunities for your future</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {venueJsonReady.data.map((venueItem: VenueItem) => (
                    <Link 
                        key={venueItem.id} 
                        href={`/venue/${venueItem.id}`}
                        className="transform transition duration-300 hover:scale-105"
                    >
                        <Card venueName={venueItem.name} imgSrc={venueItem.picture} />
                    </Link>
                ))}
            </div>
        </div>
    );
}