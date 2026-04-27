import { cookies } from "next/headers";

const BASE_URL = "https://pocketmoney-api-final.vercel.app/api";

export const serverApi = async (endpoint, method = "GET", body) => {
  try {

    // ✅ FIX: await cookies()
    const cookieStore = await cookies();

    // ✅ FIX: proper cookie header
    const cookieHeader = cookieStore.toString();

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    return await res.json();

  } catch (error) {
    console.log("Server API Error:", error);
    return { success: false, message: "Server Error" };
  }
};