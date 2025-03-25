'use client';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { setAppointments, removeAppointment } from '@/redux/features/bookSlice';
import { AppointmentItem } from '@/../interface';
import { useSession } from 'next-auth/react';

interface Company {
  _id: string;
  name: string;
}

export default function BookingList() {
  const appointments = useAppSelector(state => state.book.appointments);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  // Add loading state for UI feedback
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!session?.user?.token) return;

      setLoading(true); // Start loading

      try {
        // Make API request to fetch appointments for the logged-in user
        const appointmentsRes = await fetch(`http://localhost:5003/api/v1/appointments`, {
          headers: { 'Authorization': `Bearer ${session.user.token}` }
        });

        const companiesRes = await fetch(`http://localhost:5003/api/v1/companies`);
        const appointmentsResult = await appointmentsRes.json();
        const companiesResult = await companiesRes.json();

        if (appointmentsRes.ok && companiesRes.ok) {
          const companyMap: Record<string, string> = {};
          companiesResult.data.forEach((company: Company) => {
            companyMap[company._id] = company.name;
          });

          // Add company name to each appointment data
          const updatedAppointments = appointmentsResult.data.map((appt: AppointmentItem) => ({
            ...appt,
            companyName: companyMap[appt.company] || 'ไม่ทราบชื่อบริษัท'
          }));

          // Dispatch to store
          dispatch(setAppointments(updatedAppointments));
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    fetchAppointments();
  }, [dispatch, session]);

  const handleCancel = async (appointmentId: string) => {
    if (!session?.user?.token) {
      alert('ไม่พบ Token กรุณาเข้าสู่ระบบอีกครั้ง');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5003/api/v1/appointments/${appointmentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        dispatch(removeAppointment(appointmentId));
        alert('การจองถูกยกเลิกเรียบร้อยแล้ว');
      } else {
        alert('ไม่สามารถยกเลิกการจองได้: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('เกิดข้อผิดพลาดในการยกเลิกการจอง');
    }
  };

  if (loading) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  return (
    <div className="space-y-4">
      {appointments.length === 0 ? (
        <p>ยังไม่มีรายการจอง</p>
      ) : (
        appointments.map(appt => (
          <div key={appt._id} className="border p-4 rounded-lg">
            <p>วันที่จอง: {new Date(appt.apptDate).toLocaleDateString()}</p>
            <p>ชื่อบริษัท: {appt.companyName}</p>
            <button
              onClick={() => handleCancel(appt._id)}
              className="mt-2 bg-red-500 text-white p-1 rounded"
            >
              ยกเลิกการจอง
            </button>
          </div>
        ))
      )}
    </div>
  );
}



// 'use client';
// import { useEffect, useState } from 'react';
// import { useAppSelector } from '@/redux/store';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/redux/store';
// import { setAppointments, removeAppointment } from '@/redux/features/bookSlice';
// import { AppointmentItem } from '@/../interface';
// import { useSession } from 'next-auth/react';

// interface Company {
//   _id: string;
//   name: string;
// }

// export default function BookingList() {
//   const appointments = useAppSelector(state => state.book.appointments);
//   const dispatch = useDispatch<AppDispatch>();
//   const { data: session } = useSession();
//   const [companyData, setCompanyData] = useState<Record<string, string>>({});

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       if (!session?.user?.token) return;

//       try {
//         const [appointmentsRes, companiesRes] = await Promise.all([
//           fetch(`http://localhost:5003/api/v1/appointments`, {
//             headers: { 'Authorization': `Bearer ${session.user.token}` }
//           }),
//           fetch(`http://localhost:5003/api/v1/companies`)
//         ]);

//         const appointmentsResult = await appointmentsRes.json();
//         const companiesResult = await companiesRes.json();

//         if (appointmentsRes.ok && companiesRes.ok) {
//           const companyMap: Record<string, string> = {};
//           companiesResult.data.forEach((company: Company) => {
//             companyMap[company._id] = company.name;
//           });

//           const updatedAppointments = appointmentsResult.data.map((appt: AppointmentItem) => ({
//             ...appt,
//             companyName: companyMap[appt.company] || 'ไม่ทราบชื่อบริษัท'
//           }));

//           dispatch(setAppointments(updatedAppointments));
//         } else {
//           console.error('Error fetching data');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchAppointments();
//   }, [dispatch, session]);

//   const handleCancel = async (appointmentId: string) => {
//     if (!session?.user?.token) {
//       alert('ไม่พบ Token กรุณาเข้าสู่ระบบอีกครั้ง');
//       return;
//     }

//     // ลบรายการการจองออกจาก state ทันที (UI update)
//     dispatch(removeAppointment(appointmentId));

//     // ไม่ต้องไปเรียก API สำหรับการยกเลิกที่ backend
//     alert('การจองถูกยกเลิกเรียบร้อยแล้ว');
//   };

//   return (
//     <div className="space-y-4">
//       {appointments.length === 0 ? (
//         <p>ยังไม่มีรายการจอง</p>
//       ) : (
//         appointments.map(appt => (
//           <div key={appt._id} className="border p-4 rounded-lg">
//             <p>วันที่จอง: {new Date(appt.apptDate).toLocaleDateString()}</p>
//             <p>ชื่อบริษัท: {appt.companyName}</p>
//             <button
//               onClick={() => handleCancel(appt._id)}
//               className="mt-2 bg-red-500 text-white p-1 rounded"
//             >
//               ยกเลิกการจอง
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

