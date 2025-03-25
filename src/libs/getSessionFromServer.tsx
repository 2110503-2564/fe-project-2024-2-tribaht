'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth"

export default async function getSessionFromServer(){
      return await getServerSession(authOptions);
}