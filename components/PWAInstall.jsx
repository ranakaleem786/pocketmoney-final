
"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();

      // ❌ agar user ne close kiya ho pehle
      const dismissed = localStorage.getItem("pwa-dismissed");

      if (dismissed) return;

      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    setShow(false);
    setDeferredPrompt(null);
  };

  const handleClose = () => {
    setShow(false);

    // ✅ save user choice
    localStorage.setItem("pwa-dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-100 px-2 w-full max-w-[320px]">

      <div className="relative bg-green-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-2 pr-10 animate-bounce">

        {/* ❌ CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-white/90 hover:text-white"
        >
          <IoClose size={18} />
        </button>

        {/* TEXT */}
        <span className="text-sm font-semibold truncate">
          Install PocketMoney App
        </span>

        {/* INSTALL BUTTON */}
        <button
          onClick={installApp}
          className="bg-white text-green-700 px-3 py-1 rounded-lg font-semibold text-sm"
        >
          Install
        </button>

      </div>
    </div>
  );
}