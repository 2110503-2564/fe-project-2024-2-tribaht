'use client'

import { TextField } from "@mui/material";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import getSessionFromServer from "@/libs/getSessionFromServer";
import Link from "next/link";

export default function Login(){

      const [validEmail, setValidEmail] = useState(true);
      const [validPassword, setValidPassword] = useState(true);

      const [email, setEmail] = useState<string|undefined>(undefined);
      const [password, setPassword] = useState<string|undefined>(undefined);

      const [session, setSession] = useState<Session|null>(null);
      getSessionFromServer().then((data) => {setSession(data)});
      if(session){
            (useRouter()).push('/');
      }
      return(
            <div className="w-full h-[calc(100vh+50px)] absolute top-[-50px] bg-gray-200 flex flex-col justify-center items-center">
                 <div className="bg-white rounded-lg flex flex-col justify-center items-center p-10">
                  <h1 className="mb-[10px] text-3xl font-sans">Sign In</h1>
                  <div className="m-2">
                  <TextField onKeyDown={(e) => { if (e.key === "Enter"){signIn('credentials',{email, password, callbackUrl:'/'})};}} className='w-[260px]' type='email' error={!validEmail} helperText={validEmail?'':'Please enter valid email'} required={true} label='Email' onChange={(e)=>{setValidEmail(e.target.validity.valid||(e.target.value=='')); setEmail(e.target.value)}}></TextField>
                  </div>
                  <div className="m-2">
                  <TextField onKeyDown={(e) => { if (e.key === "Enter"){signIn('credentials',{email, password, callbackUrl:'/'})};}} className='w-[260px]' type='password' error={!validPassword} inputProps={{ minLength: 6 }} helperText={validPassword?'':'Password should be atleast 6 characters'} required={true} label='Password' onChange={(e)=>{setValidPassword(!e.target.validity.tooShort||(e.target.value==''));setPassword(e.target.value)}}></TextField>
                  </div>
                  <Link href='/register' className="text-sm text-cyan-600 font-sans hover:text-cyan-500">No Account? Click Here</Link>
                  <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white w-full mt-[15px]" onClick={()=>{signIn('credentials',{email, password, callbackUrl:'/'})}}>Sign In</button>
                 </div>
            </div>
      );
}