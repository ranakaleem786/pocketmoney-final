"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { BiLogOut } from "react-icons/bi";
import { api } from "@/lib/api";
import { useState } from "react";
// import { useUser } from "@/context/UserContext";
import toast from "react-hot-toast";
import { DotsLoader } from "./loaders/DotsLoader";
import { useGetCurrentUser } from "@/lib/hooks/useGetCurrentUser";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";


export default function AppBar() {
  useGetCurrentUser()

  const { user, setUser, userLoading } = useUser();
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const hendalLogOut = async ()=>{
    setLoading(true);
    try {
      const res = await api("/user/logout","POST");
     if(res.success){
       toast.success(`Your Account Successfully LogOut ✅`);
       setUser(null);
       router.push("/")
     }else{
       toast.error(res.message);
     }
    } catch (error) {
      toast.error("Server error ❌");  
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className=" fixed h-[80px] top-0 left-0 w-full flex justify-center z-50">

       

      <div className="w-full max-w-md flex items-center rounded-2xl justify-between px-4 py-3 bg-white/90 dark:bg-black/60 backdrop-blur-lg shadow-md border-b border-gray-200 dark:border-gray-700">

        {/* 🏠 Logo Section */}
        <Link href={'/'} className="flex items-center">
          <img
            src="/pocketmoney.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />

          <span className=" text-green-700  flex left-0 gap-[2px] dark:text-green-300 font-bold text-xl">
            <span className="text-black dark:text-white">Pocket</span><span>Money</span>
          </span>
        </Link>
        {userLoading ? (
          <span className="mr-4" ><DotsLoader /></span>
        ) : user ? <button
            onClick={hendalLogOut}
          className="px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 cursor-pointer to-green-700 text-white font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all duration-200"
        >
              {loading ? "..." : "LogOut"}
          </button>  : <Link
          href={'/login'}
          className="px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold shadow-md hover:opacity-90 active:scale-95 transition-all duration-200"
        >
             LogIn
        </Link> }




      </div>
    </div>
  );
}