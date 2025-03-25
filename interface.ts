// export interface VenueItem {
//     _id: string,
//     name: string,
//     address: string,
//     district: string,
//     province: string,
//     postalcode: string,
//     tel: string,
//     picture: string,
//     dailyrate: number,
//     __v: number,
//     id: string
//   }
  
// export interface VenueJson {
//     success: boolean,
//     count: number,
//     pagination: Object,
//     data: VenueItem[]
//   }

//   export interface BookingItem {
//     bookingId: string;         // ID การจอง (สร้างใหม่เมื่อจอง)
//     companyId: string;         // ID สถานที่ (จาก CompanyItem)
//     userId: string;            // ID ผู้ใช้ (จากระบบ Login)
//     bookDate: string;          // วันที่จอง (ISO string)
//     createdAt: string;         // วันที่สร้างรายการ (ISO string)
//     name: string;              // ชื่อสถานที่ (copy จาก CompanyItem)
//     userNote?: string;         // หมายเหตุเพิ่มเติม
//   }

// export interface CompanyItem{
//   _id:string,
//   name:string,
//   address: string,
//   district: string,
//   province: string,
//   postalcode: string,
//   website:string,
//   description:string,
//   tel: string,
//   picture: string,
//   dailyrate: number,
//   __v: number,
//   googleMapsLink:string
//   id: string
//   bookDate: string;
//   nameLastname: string;
//   appointment: AppointmentItem[]
// }

// export interface AppointmentItem {
//   _id: string;
//   apptDate: string; // หรือใช้ Date ถ้าต้องการแปลงเป็น object
//   user: string;     // User ID
//   company: string;  // Company ID
//   createdAt: string;
//   __v: number;
// }

// export interface AppointmentResponse {
//   success: boolean;
//   data: AppointmentItem;
// }

// export interface CompanyJson {
//   success: boolean,
//   count: number,
//   pagination: Object,
//   data: CompanyItem[]
// }

// export interface AppointmentJson {
//   success: boolean,
//   count: number,
//   data: AppointmentItem[]
// }
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
  bookingId: string;         // ID การจอง (สร้างใหม่เมื่อจอง)
  companyId: string;         // ID สถานที่ (จาก CompanyItem)
  userId: string;            // ID ผู้ใช้ (จากระบบ Login)
  bookDate: string;          // วันที่จอง (ISO string)
  createdAt: string;         // วันที่สร้างรายการ (ISO string)
  name: string;              // ชื่อสถานที่ (copy จาก CompanyItem)
  userNote?: string;         // หมายเหตุเพิ่มเติม
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

// export interface AppointmentItem {
//   _id: string;
//   apptDate: string; // หรือใช้ Date ถ้าต้องการแปลงเป็น object
//   user: string;     // User ID
//   company: string;  // Company ID
//   createdAt: string;
//   __v: number;
// }

export interface AppointmentItem {
_id: string;
apptDate: string; // หรือใช้ Date ถ้าต้องการแปลงเป็น object
user: string;     // User ID
company: string;  // Company ID
companyName?: string; // เพิ่มฟิลด์นี้เพื่อแสดงชื่อบริษัท
createdAt: string;
__v: number;
}


export interface AppointmentResponse {
success: boolean;
data: AppointmentItem;
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