export default async function getVenue(vid:string){

    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch(`http://localhost:5003/api/v1/companies/${vid}`)
    if(!response.ok){
        throw new Error("Failed to fectch venue")
    }

    return await response.json()
}