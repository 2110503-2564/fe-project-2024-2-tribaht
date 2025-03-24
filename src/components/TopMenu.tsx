import { Link } from '@mui/material';
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed top-0 left-0 right-0 z-30 bg-white shadow-md flex items-center px-6 py-2">
        <div className="flex items-center space-x-4">
            {session ? (
                <Link href="/api/auth/signout" className="text-cyan-600 text-sm font-semibold">
                    Sign-Out of {session.user?.name}
                </Link>
            ) : (
                <Link href="/api/auth/signin" className="text-cyan-600 text-sm font-semibold">
                    Sign-In
                </Link>
            )}
            <TopMenuItem title="My Booking" pageRef="/mybooking" />
        </div>

            <div className="flex-1 flex justify-end">
            <div className="flex space-x-6 text-sm font-bold text-gray-800">
            <TopMenuItem title="Booking" pageRef="/booking"/>
            </div>
                <Image 
                    src="/img/logo.png"
                    alt="logo"
                    width={40}
                    height={40}
                    className="h-auto w-auto"
                />
            </div>
        </div>
    );
}
