"use client";

import { useDailyBounty } from "@/context/DailyBountyContext";
import { useUser } from "@/context/UserContext";
import { api } from "@/lib/api";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetAllBounties } from "@/lib/hooks/useGetAllBounties";
import { CardSkeleton } from "../loaders/CardSkeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BountyCard() {

  useGetAllBounties();

  const [loading, setLoading] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [copied, setCopied] = useState(false);
  const [visitorId, setVisitorId] = useState(null);

  const {user, setUser } = useUser();
  const { dailyBounties, dailyBountyLoading, removeBounty, dailyBountyError } = useDailyBounty()
  const router = useRouter();


  // 📋 Copy Code
  const copyCode = (text) => {
    if (!text) return;

    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  // ✅ Claim
  const handleClaim = (b) => {
    setSelectedBounty(b)
  };

  

  useEffect(() => {
    let id = localStorage.getItem("visitorId");

    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("visitorId", id);
    }

    setVisitorId(id);
  }, []);

 

  // const pokiIncress = async () => {
  //   const res = await api("/user/pokicoinincrease");

  //   if (res.success) {
  //     toast.success(` You Win Successfully Poki Coin ✅`);
  //     setUser((prev) => ({
  //       ...prev,
  //       poki: res.data.poki,
  //     }));
  //   }

  // }



  const dailyClaimedRecord = async (bountyId) => {
    try {
      const res = await api("/bounty/daily-claimed-record","POST",
       {bountyId}
      );

      if (res.success) {
        
       
        }else{
        toast.error(res.message);
        }
    } catch (error) {
      toast.error("Server error ❌");
    }

  }


  // ❌ Close popup + hide bounty
  const handleClose = async (bountyId) => {

    try {

      setLoading(true);


      const res = await api(
        "/bounty/claimed",
        "POST",
        {
          bountyId,
          visitorId,
        },
        {
          "visitor-id": visitorId, // 🔥 header bhi bhejo
        }
      );


      if (res.success) {
        // ✅ UI update
        
           removeBounty(bountyId);
         
        toast.success(` Reward Successfully Claimed ✅`);

        // pokiIncress();
        dailyClaimedRecord(bountyId)

      } else {
        toast.error(res.message);
      }

      setSelectedBounty(null);
      // setClaimed(true);
    } catch (error) {
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🚫 Hide bounty after claim
  // if (claimed) return null;

  if (dailyBountyLoading) return <CardSkeleton />;

  return (
    <>

     
      {dailyBounties.length === 0 && <div className="flex      justify-center mt-[50px]" >
        <p className="text-2xl font-semibold text-green-800   dark:text-green-500" >Daily rewards Successfully Claimed</p>
      </div>
      }


      { dailyBounties.map((b) => (
        <div key={b._id} className="flex justify-center mx-2 mt-4">
          {/* 🎁 Bounty Card */}
          <div className="bg-white w-full max-w-md dark:bg-black/40 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-gray-800 mb-3">

            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-green-700 dark:text-green-300">
                🎁 Reward
              </h3>

              <span className=" flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-1 rounded-2xl">
                 <span>New</span>
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Claim reward instantly
            </p>

            {user ? <button
              onClick={() => handleClaim(b)}
              className="mt-3 w-full cursor-pointer py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-medium active:scale-95 transition"
            >
              Claim Now
            </button> : <button
              onClick={() => router.push("/login")}
              className="mt-3 w-full cursor-pointer py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-medium active:scale-95 transition"
            >
              Claim Now
            </button>}
          </div>

          {/* 📦 Bottom Sheet Popup (Mobile Style) */}
          {selectedBounty && (
            <div className="fixed inset-0  bg-black/50 z-50 flex items-end justify-center">

              <div className="w-full max-w-md  bg-white dark:bg-black rounded-t-3xl p-5 animate-slideUp">

                {/* Drag line */}
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>

                <h2 className="text-lg font-bold text-center text-green-700 dark:text-green-300 mb-4">
                  🎉 Bounty Claimed
                </h2>

                {/* 🔑 Code */}
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl flex justify-between items-center">
                  <span className="font-mono text-sm">     {selectedBounty.redCode}
                  </span>

                  <button
                    onClick={() => copyCode(selectedBounty.redCode)}
                    className="text-green-600 text-sm font-semibold"
                  >
                    {copied ? "Copied ✔" : "Copy"}
                  </button>
                </div>


                {/* ✅ OK Button */}
                {loading ? "..." : <a href={selectedBounty.dailyBountyLink} target="_blank" >
                  <button
                  onClick={() => handleClose(selectedBounty._id)}
                  className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r cursor-pointer from-green-500 to-green-700 text-white font-semibold active:scale-95"
                >
                  OK
                  </button>
                </a>}

              </div>
            </div>
          )}
        </div>
      ))}

      

    </>

  );
}
