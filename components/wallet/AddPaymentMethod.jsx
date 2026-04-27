
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import AddPaymentButton from "./AddPaymentButton";
import { PaymentMethodSkeleton } from "../loaders/PaymentMethodSkeleton";
import { useRouter } from "next/navigation";


export default function AddPaymentMethod({ getMethods }) {

  const router = useRouter();

  const [methodType, setMethodType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState(""); // 🔥 NEW

  const [loading, setLoading] = useState(true);

  const [popup, setPopup] = useState(false);
  const [savedMethod, setSavedMethod] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch on load
  useEffect(() => {
    setSavedMethod(getMethods || null); 
    setLoading(false);
  }, []);

  // ✅ Submit
  const handleSubmit = async () => {
    if (!methodType || !accountNumber || !accountHolderName) {
      return toast.error("Please fill all fields");
    }

    try {

      const res = await api("/user/payment-method-add-edit", "POST", {
        methodType,
        accountNumber,
        accountHolderName, // 🔥 NEW
      });

      if (res.success) {
        toast.success("Payment method saved ✅");

        setSavedMethod({
          methodType,
          accountNumber,
          accountHolderName,
        });


        setPopup(false);
        setIsEditing(false);
        router.refresh();
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setMethodType(savedMethod.methodType);
    setAccountNumber(savedMethod.accountNumber);
    setAccountHolderName(savedMethod.accountHolderName || ""); // 🔥 NEW

    setIsEditing(true);
    setPopup(true);
  };

  return (
    <>
    <div className="flex justify-center mt-4 px-2">
      <div className="w-full max-w-md">

        {/* 🔥 CASE 1 */}
        {loading ? (
          <PaymentMethodSkeleton />
        ) : !savedMethod && !popup ? (
          <AddPaymentButton onClick={() => setPopup(true)} />
        ) : null}

        {/* 🔥 FORM */}
        {popup && (
          <div className="bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border">

            <h2 className="text-lg font-semibold text-green-600 mb-4">
              💳 {isEditing ? "Edit Payment Method" : "Add Payment Method"}
            </h2>

            {/* Method */}
            <select
              value={methodType}
              onChange={(e) => setMethodType(e.target.value)}
              className="w-full p-3 rounded-xl border mb-3"
            >
              <option value="">Select Method</option>
              <option value="jazzcash">JazzCash</option>
              <option value="easypaisa">EasyPaisa</option>
            </select>

            {/* Account Holder Name 🔥 NEW */}
            <input
              type="text"
              placeholder="Account Holder Name"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              className="w-full p-3 rounded-xl border mb-3"
            />

            {/* Account Number */}
            <input
              type="text"
              placeholder="Enter Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-3 rounded-xl border mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>
        )}

        {/* 🔥 SAVED CARD */}
        {savedMethod && !popup && (
          <div className="bg-white dark:bg-black/40 rounded-2xl p-4 shadow-md border">

            <h2 className="text-lg font-semibold text-green-600 mb-4">
              💳 Your Payment Method
            </h2>

            <div className="flex justify-between mb-2">
              <span>Method:</span>
              <span className="font-semibold capitalize">
                {savedMethod.methodType}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Name:</span>
              <span className="font-semibold">
                {savedMethod.accountHolderName}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Account:</span>
              <span className="font-semibold">
                {savedMethod.accountNumber}
              </span>
            </div>

            <button
              onClick={handleEdit}
              className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white"
            >
              Edit
            </button>

          </div>
        )}

      </div>
    </div>

      

    </>
  );
}