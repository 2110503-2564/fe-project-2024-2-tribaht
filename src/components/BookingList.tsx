// 'use client';
// import { useEffect, useState } from 'react';
// import { useAppSelector } from '@/redux/store';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/redux/store';
// import { setAppointments } from '@/redux/features/bookSlice';
// import { AppointmentItem } from '@/../interface';
// import { useSession } from 'next-auth/react';

// export default function BookingList() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { data: session } = useSession();  // ใช้ session จาก next-auth
//   const [loading, setLoading] = useState(true);  // สถานะการโหลดข้อมูล
//   const [appointments, setAppointmentsState] = useState<AppointmentItem[]>([]); // สถานะสำหรับการเก็บข้อมูลการจอง

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       if (!session?.user?.token) {
//         alert('กรุณาเข้าสู่ระบบ');
//         return;
//       }

//       setLoading(true); // เริ่มต้นสถานะการโหลดข้อมูล

//       try {
//         // ดึงข้อมูลการจองจาก API
//         const response = await fetch('http://localhost:5003/api/v1/appointments', {
//           headers: {
//             'Authorization': `Bearer ${session.user.token}`,  // ส่ง token สำหรับการ authorize
//           },
//         });

//         if (response.ok) {
//           const result = await response.json();
//           setAppointmentsState(result.data);  // ตั้งค่าข้อมูลการจอง
//           dispatch(setAppointments(result.data));  // ส่งข้อมูลไปยัง Redux store
//         } else {
//           console.error('ไม่สามารถดึงข้อมูลการจองได้');
//         }
//       } catch (error) {
//         console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
//       } finally {
//         setLoading(false); // หยุดสถานะการโหลดข้อมูล
//       }
//     };

//     fetchAppointments();
//   }, [session, dispatch]);  // จะทำงานเมื่อ session หรือ dispatch เปลี่ยนแปลง

//   if (loading) {
//     return <p>กำลังโหลดข้อมูล...</p>;  // ข้อความขณะโหลดข้อมูล
//   }

//   return (
//     <div className="space-y-4">
//       {appointments.length === 0 ? (
//         <p>ยังไม่มีรายการจอง</p>  // ถ้าไม่มีข้อมูลการจอง
//       ) : (
//         appointments.map((appt) => (
//           <div key={appt._id} className="border p-4 rounded-lg">
//             <p>วันที่จอง: {new Date(appt.apptDate).toLocaleDateString()}</p>
//             <p>ชื่อบริษัท: {appt.companyName || 'ไม่ทราบชื่อบริษัท'}</p>
//             {/* คุณสามารถเพิ่มปุ่มหรือฟังก์ชันอื่น ๆ ที่ต้องการที่นี่ */}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setAppointments } from '@/redux/features/bookSlice';
import { AppointmentItem } from '@/../interface';
import { useSession } from 'next-auth/react';

export default function BookingList() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();  // ใช้ session จาก next-auth
  const [loading, setLoading] = useState(true);  // สถานะการโหลดข้อมูล
  const [appointments, setAppointmentsState] = useState<AppointmentItem[]>([]); // สถานะสำหรับการเก็บข้อมูลการจอง

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session?.user?.token) {
        alert('กรุณาเข้าสู่ระบบ');
        return;
      }

      setLoading(true); // เริ่มต้นสถานะการโหลดข้อมูล

      try {
        // ดึงข้อมูลการจองจาก API
        const response = await fetch('http://localhost:5003/api/v1/appointments', {
          headers: {
            'Authorization': `Bearer ${session.user.token}`,  // ส่ง token สำหรับการ authorize
          },
        });

        if (response.ok) {
          const result = await response.json();
          setAppointmentsState(result.data);  // ตั้งค่าข้อมูลการจอง
          dispatch(setAppointments(result.data));  // ส่งข้อมูลไปยัง Redux store
        } else {
          console.error('ไม่สามารถดึงข้อมูลการจองได้');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      } finally {
        setLoading(false); // หยุดสถานะการโหลดข้อมูล
      }
    };

    fetchAppointments();
  }, [session, dispatch]);  // จะทำงานเมื่อ session หรือ dispatch เปลี่ยนแปลง

  // ฟังก์ชันการลบการจอง
  const handleDelete = async (id: string) => {
    if (!session?.user?.token) {
      alert('กรุณาเข้าสู่ระบบ');
      return;
    }

    const confirmDelete = window.confirm('คุณต้องการลบการจองนี้หรือไม่?');
    if (!confirmDelete) return;  // ถ้าไม่ยืนยันการลบจะไม่ทำการลบ

    setLoading(true);  // ตั้งค่าสถานะการโหลดใหม่

    try {
      const response = await fetch(`http://localhost:5003/api/v1/appointments/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.token}`,  // ส่ง token สำหรับการ authorize
        },
      });

      if (response.ok) {
        // ลบการจองจาก state
        setAppointmentsState((prevAppointments) =>
          prevAppointments.filter((appt) => appt._id !== id)
        );
        dispatch(setAppointments(appointments.filter((appt) => appt._id !== id))); // ส่งข้อมูลที่อัปเดตไปยัง Redux
        alert('ลบการจองสำเร็จ');
      } else {
        console.error('ไม่สามารถลบการจองได้');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการลบการจอง:', error);
    } finally {
      setLoading(false);  // หยุดสถานะการโหลด
    }
  };

  if (loading) {
    return <p>กำลังโหลดข้อมูล...</p>;  // ข้อความขณะโหลดข้อมูล
  }

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p>ยังไม่มีรายการจอง</p>  // ถ้าไม่มีข้อมูลการจอง
      ) : (
        appointments.map((appt) => (
          <div key={appt._id} className="border p-4 rounded-lg">
            <p>วันที่จอง: {new Date(appt.apptDate).toLocaleDateString()}</p>
            <p>ชื่อบริษัท: {appt.companyName || 'ไม่ทราบชื่อบริษัท'}</p>
            <button
              onClick={() => handleDelete(appt._id)}
              className="text-red-500 mt-2 p-2 border rounded hover:bg-red-100"
            >
              ลบ
            </button>
          </div>
        ))
      )}
    </div>
  );
}
