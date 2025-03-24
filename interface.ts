export interface VenueItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    website: string,
    description: string,
    tel: string,
    googleMapsLink: string,
    picture: string,
    dailyrate: number,
    __v: number,
    id: string
  }
  
export interface VenueJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: VenueItem[]
  }

export interface BookingItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
  }