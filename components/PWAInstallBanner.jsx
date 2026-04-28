"use client";

import { useEffect, useState } from "react";

export default function PWAInstallBanner({
  text = "Install PocketMoney App",
  buttonText = "Install",
  className = "",
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault(); // stop auto popup
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("✅ App installed");
    } else {
      console.log("❌ User dismissed install");
    }

    setDeferredPrompt(null);
    setShow(false);
  };

  // ❌ show nahi hoga jab install available nahi hai
  if (!show) return null;

  return (

    <div className=" flex justify-center mx-2 mt-4">

      <div className="bg-white w-full max-w-md dark:bg-black/40 rounded-2xl p-4 shadow-md border border-gray-200 dark:border-gray-800">

        {/* <div
          className={`fixed top-20 left-1/2 -translate-x-1/2 px-2 w-full max-w-[340px] ${className}`}
        > */}
          <div className="bg-green-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3">

            {/* TEXT */}
            <span className="text-sm font-semibold truncate">
              {text}
            </span>

            {/* INSTALL BUTTON */}
            <button
              onClick={handleInstall}
              className="bg-white text-green-700 px-3 py-1 rounded-lg font-semibold text-sm whitespace-nowrap"
            >
              {buttonText}
            </button>

          {/* </div> */}
        </div>
      </div>
    </div>
  );
}