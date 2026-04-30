// "use client";

// import { useRouter, usePathname } from "next/navigation";
// import { useState } from "react";
// import {
//   FaUsers,
//   FaGift,
//   FaCalendarAlt,
//   FaBars,
//   FaTimes,
//   FaMoneyCheckAlt,
// } from "react-icons/fa";
// import { MdWorkHistory } from "react-icons/md";

// export default function AdminSidebar() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [open, setOpen] = useState(true);

//   const menu = [
//     { name: "All Users", icon: <FaUsers />, route: "/dashboard" },

//     { name: "Create Daily Reward", icon: <FaGift />, route: "/dashboard/create-daily-reward" },

//     { name: "Create Monthly Reward", icon: <FaCalendarAlt />, route: "/dashboard/create-monthly-reward" },

//     { name: "All Daily Rewards", icon: <FaGift />, route: "/dashboard/daily-rewards" },

//     { name: "All Monthly Rewards", icon: <FaCalendarAlt />, route: "/dashboard/monthly-rewards" },

//     { name: "All Daily Claimed Record", icon: <MdWorkHistory />, route: "/dashboard/daily-claimed-record" },

//     { name: "All Withdrawals & Approvals", icon: <FaMoneyCheckAlt />, route: "/dashboard/withdraw-approved" },
//   ];

//   return (
//     <div
//       className={`h-screen bg-black text-white transition-all duration-300 flex flex-col
//       ${open ? "w-64" : "w-16"}`}
//     >
//       {/* HEADER */}
//       <div className="flex items-center justify-between p-3 border-b border-gray-700">
//         {open && <h1 className="font-bold text-green-500">Admin Panel</h1>}

//         <button
//           onClick={() => setOpen(!open)}
//           className="text-xl p-2 hover:bg-gray-800 rounded"
//         >
//           {open ? <FaTimes /> : <FaBars />}
//         </button>
//       </div>

//       {/* MENU */}
//       <div className="flex-1 mt-4 space-y-2">
//         {menu.map((item) => (
//           <button
//             key={item.route}
//             onClick={() => router.push(item.route)}
//             className={`flex items-center cursor-pointer gap-3 w-full px-3 py-3 hover:bg-gray-800 transition
//               ${pathname === item.route ? "bg-green-600" : ""}`}
//           >
//             <span className="text-lg">{item.icon}</span>

//             {open && (
//               <span className="text-sm font-medium">{item.name}</span>
//             )}
//           </button>
//         ))}
//       </div>



//     </div>
//   );
// }





"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaUsers,
  FaGift,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaMoneyCheckAlt,
  FaSignOutAlt
} from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useUser } from "@/context/UserContext";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const {user,setUser} = useUser()

  const menu = [
    { name: "All Users", icon: <FaUsers />, route: "/dashboard" },
    { name: "Create Daily Reward", icon: <FaGift />, route: "/dashboard/create-daily-reward" },
    { name: "Create Monthly Reward", icon: <FaCalendarAlt />, route: "/dashboard/create-monthly-reward" },
    { name: "All Daily Rewards", icon: <FaGift />, route: "/dashboard/daily-rewards" },
    { name: "All Monthly Rewards", icon: <FaCalendarAlt />, route: "/dashboard/monthly-rewards" },
    { name: "All Daily Claimed Record", icon: <MdWorkHistory />, route: "/dashboard/daily-claimed-record" },
    { name: "All Withdrawals & Approvals", icon: <FaMoneyCheckAlt />, route: "/dashboard/withdraw-approved" },
  ];

  // 🔥 LOGOUT FUNCTION
  const handleLogout = async () => {
        try {
          const res = await api("/user/logout");
         if(res.success){
           toast.success(`Your Account Successfully LogOut ✅`);
           router.push("/login");
           setUser(null);
         }else{
           toast.error(res.message);
         }
        } catch (error) {
          toast.error("Server error ❌");  
        }
  };

if(!user){
 return router.push('/login')
}

  return (
    <div
      className={`h-screen bg-black text-white transition-all duration-300 flex flex-col
      ${open ? "w-64" : "w-16"}`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        {open && <h1 className="font-bold text-green-500">Admin Panel</h1>}

        <button
          onClick={() => setOpen(!open)}
          className="text-xl p-2 hover:bg-gray-800 rounded"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MENU */}
      <div className="flex-1 mt-4 space-y-2">
        {menu.map((item) => (
          <button
            key={item.route}
            onClick={() => router.push(item.route)}
            className={`flex items-center cursor-pointer gap-3 w-full px-3 py-3 hover:bg-gray-800 transition
              ${pathname === item.route ? "bg-green-600" : ""}`}
          >
            <span className="text-lg">{item.icon}</span>

            {open && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </button>
        ))}
      </div>

      {/* 🔻 LOGOUT BUTTON (BOTTOM) */}
      <div className="p-3 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center cursor-pointer gap-3 w-full px-3 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <FaSignOutAlt />
          {open && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}