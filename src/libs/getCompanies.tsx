export default async function getVenues() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const response = await fetch("http://localhost:5003/api/v1/companies");

    if (!response.ok) {
        throw new Error("Failed to fetch venues");
    }

    const data = await response.json(); // ✅ อ่านข้อมูลแค่ครั้งเดียว
    console.log('Fetched Data:', data);

    return data; // ✅ คืนค่า data ที่ได้
}
