export interface VenueItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
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

export interface CompanyItem{
  _id:string,
  name:string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  website:string,
  description:string,
  tel: string,
  picture: string,
  dailyrate: number,
  __v: number,
  googleMapsLink:string
  id: string
  bookDate: string;
  nameLastname: string;
  appointment: AppointmentItem[]
}

interface AppointmentItem {
  _id: string,
  apptDate: Date,
  user: string,
  company: CompanyItem
  createdAt: Date
  __v: number
}

export interface CompanyJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CompanyItem[]
}

export interface AppointmentJson {
  success: boolean,
  count: number,
  data: AppointmentItem[]
}