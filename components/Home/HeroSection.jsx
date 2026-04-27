// "use client";

// import { useGetCurrentUser } from "@/lib/hooks/useGetCurrentUser";
// import { useEffect, useState } from "react";
// import { RiCoinsLine } from "react-icons/ri";

// export default function HeroSection() {

// const { user, loading, error } = useGetCurrentUser();
//   const [currentUser, setCurrentUser] = useState(false);

//   useEffect(() => {
//     if(user){
//       setCurrentUser(true)
//     } 
//   }, [currentUser])
  

//   return (
//     <div className="flex justify-center mx-2 mt-4">

//       {/* 🌟 Hero Card */}
//       <div className="bg-gradient-to-br w-full max-w-md from-green-500 to-green-700 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">

//         {/* 🔆 Glow Effect */}
//         <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

//         {/* 🪙 Poki Balance */}
//         <span className=" flex justify-between " >
//           <h1 className=" text-2xl opacity-90">hello { user?.userName}</h1>
//          <span>
//           <p className="text-sm opacity-90">Your Balance</p>
//             {currentUser ? <h2 className=" text-2xl font-bold mt-1 flex items-center gap-2">
//               <RiCoinsLine /> {user.poki}
//             </h2>
//               :
//               <h2 className="text-2xl font-bold mt-1 flex items-center gap-2">
//                 <RiCoinsLine /> 0
//               </h2>}
//          </span>
//         </span>

      

//         {/* 📢 Heading */}
//         <h2 className="mt-4 text-lg font-semibold">
//           Earn Free Rewards Daily 🎁
//         </h2>

//         {/* 📝 Description */}
//         <p className="text-sm opacity-90 mt-1">
//           Complete simple tasks and earn poki coins instantly.
//         </p>

//         {/* 🚀 CTA Button */}
//         {/* <button className="mt-4 w-full py-3 rounded-xl bg-white text-green-700 font-semibold active:scale-95 transition">
//           Start Earning
//         </button> */}

//       </div>

//     </div>
//   );
// }







"use client";


import { RiCoinsLine } from "react-icons/ri";
import { DotsLoader } from "../loaders/DotsLoader";
import { useUser } from "@/context/UserContext";

export default function HeroSection() {
  const { user, userLoading } = useUser();

  return (
    <div className="flex justify-center mx-2 mt-4">
      <div className="bg-gradient-to-br w-full max-w-md from-green-500 to-green-700 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

        {/* Header */}
        <div className="flex justify-between">
           <h1 className="flex items-center gap-2 text-2xl opacity-90">
            Hello {userLoading ? <DotsLoader /> : user?.userName || "Visiter"}
          </h1>

          {/* <div>
            <p className="text-sm opacity-90">Your Balance</p>

            <h2 className="text-2xl font-bold mt-1 flex items-center gap-2">
              <RiCoinsLine />
              {userLoading ? "..." : user?.poki || 0}
            </h2>
          </div> */}
        </div>

        {/* Content */}
        <h2 className="mt-4 text-lg font-semibold">
          Earn Free Rewards Daily 🎁
        </h2>

        <p className="text-sm opacity-90 mt-1">
          Complete simple tasks and earn Money instantly.
        </p>

      </div>
    </div>
  );
}