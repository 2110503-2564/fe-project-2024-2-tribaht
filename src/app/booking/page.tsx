'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addAppointment } from '@/redux/features/bookSlice';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function BookingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const [apptDate, setApptDate] = useState<string>(new Date().toISOString().split('T')[0]); // กำหนดค่าเริ่มต้นเป็นวันที่ปัจจุบัน

  const handleConfirm = async () => {
    const companyId = params.get('companyId');
    const userId = session?.user?.id; // ใช้ user id จาก session

    if (!companyId) {
      alert('ไม่พบรหัสบริษัท');
      return;
    }

    if (!userId) {
      alert('ไม่พบรหัสผู้ใช้ กรุณาเข้าสู่ระบบอีกครั้ง');
      return;
    }

    if (!session?.user?.token) {
      alert('ไม่พบ Token กรุณาเข้าสู่ระบบอีกครั้ง');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5003/api/v1/companies/${companyId}/appointments/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.token}`  // ✅ เพิ่ม Token ตรงนี้
          },
          body: JSON.stringify({
            apptDate: apptDate,
            user: userId
          })
        }
      );

      const result = await response.json();

      if (result.success) {
        dispatch(addAppointment(result.data));
        router.push('/mybooking');
      } else {
        alert('การจองล้มเหลว: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('เกิดข้อผิดพลาดในการจอง');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">ยืนยันการจอง</h1>
      <div className="my-4">
        <p>สถานที่: {params.get('name')}</p>
        <div>
          <label htmlFor="apptDate" className="block">เลือกวันที่จอง:</label>
          <input
            type="date"
            id="apptDate"
            value={apptDate}
            onChange={(e) => setApptDate(e.target.value)} // อัพเดตวันที่ที่เลือก
            className="border p-2 rounded"
          />
        </div>
        <button 
          onClick={handleConfirm}
          className="mt-4 bg-green-500 text-white p-2 rounded"
        >
          ยืนยันการจอง
        </button>
      </div>
    </div>
  );
}
