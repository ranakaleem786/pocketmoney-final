const BASE_URL = "https://pocketmoney-api-final.vercel.app/api";


export const api = async (endpoint, method = "GET", body, headers = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers, // 🔥 custom headers add
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
};