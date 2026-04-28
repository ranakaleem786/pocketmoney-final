"use client";

import { useState } from "react";
import PWAInstallBanner from "../PWAInstallBanner";

export default function Guide() {
  const [active, setActive] = useState(null);

  const guides = {
    earn: [
      "Login to your account",
      "Complete daily tasks",
      "Claim bounty rewards",
      "Increase your Poki balance",
      "Convert to USDT anytime"
    ],
    convert: [
      "Go to Convert section in app",
      "Select Poki to USDT option",
      "Enter amount you want to convert",
      "Click Convert button",
      "Balance will update instantly"
    ],
    binanceAccountCreate: [
      "Login to Binance app",
      "Go to P2P trading section",
      "Select USDT to sell",
      "Choose buyer with best rate",
      "Confirm and receive payment"
    ],
    sell: [
      "Login to Binance app",
      "Go to P2P trading section",
      "Select USDT to sell",
      "Choose buyer with best rate",
      "Confirm and receive payment"
    ]
  };

  const toggle = (key) => {
    setActive(active === key ? null : key);
  };

  return (

    <>
    <PWAInstallBanner />
    

    <div className=" flex justify-center mx-2 mt-4">

      <div className="bg-white w-full max-w-md dark:bg-black/40 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-gray-800">

        <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">
          📘 Guide
        </h2>

        {/* 1️⃣ Earn */}
        <button
          onClick={() => toggle("earn")}
          className="w-full text-left p-3 rounded-xl bg-green-50 dark:bg-green-900/20 mb-2 font-medium text-green-700 dark:text-green-300"
        >
          💰 How to Earn Pocket Money
        </button>

        {active === "earn" && (
          <ul className="ml-4 mb-3 list-disc text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {guides.earn.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {/* 2️⃣ Convert */}
        <button
          onClick={() => toggle("convert")}
          className="w-full text-left p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 mb-2 font-medium text-blue-700 dark:text-blue-300"
        >
          🔄 How to Convert
        </button>

        {active === "convert" && (
          <ul className="ml-4 mb-3 list-disc text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {guides.convert.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {/* 3️⃣ binanceAccountCreate */}
        <button
          onClick={() => toggle("binanceAccountCreate")}
          className="w-full text-left mb-2 p-3 rounded-xl bg-orange-50 dark:bg-orange-900/20 font-medium text-orange-700 dark:text-orange-300"
        >
          💰 How to Create Binance Account
        </button>

        {active === "binanceAccountCreate" && (
          <ul className="ml-4 mb-3 list-disc text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {guides.binanceAccountCreate.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        {/* 3️⃣ Sell */}
        <button
          onClick={() => toggle("sell")}
          className="w-full text-left p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 font-medium text-purple-700 dark:text-purple-300"
        >
          💰 How to Sell USDT on Binance
        </button>

        {active === "sell" && (
          <ul className="ml-4 mt-2 list-disc text-sm text-gray-700 dark:text-gray-300 space-y-1">
            {guides.sell.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

      </div>

    </div>

    </>
  );
}