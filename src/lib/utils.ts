import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isAuthenticated() {
  const jwt = localStorage.getItem("jwt");

  if (!jwt) {
    return false;
  }

  const payload = jwt.split(".")[1];
  const decoded = JSON.parse(atob(payload));
  
  if (decoded.exp < Date.now() / 1000) {
    return false;
  }

  return true;
}
