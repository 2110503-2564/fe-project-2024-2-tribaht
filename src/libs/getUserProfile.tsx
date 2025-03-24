export default async function getUserProfile(token:string) {
    const response = await fetch ("https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me",{
        method:"GET",
        headers:{
            authorization: `Bearer ${token}`,
        }
    })

    if(!response.ok){
        throw new Error("Cannot ger user profile")
    }
    return await response.json()
}