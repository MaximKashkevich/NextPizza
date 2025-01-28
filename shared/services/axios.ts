import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
