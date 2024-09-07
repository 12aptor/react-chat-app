import { API_URL } from "@/utils/constants";
import { ILogin, IRegisterUser } from "@/utils/types";

export const loginService = async (credentials: ILogin) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const status = response.status;
  const json = await response.json();

  return {
    json,
    status,
  };
};

export const registerService = async (userData: IRegisterUser) => {
  const formData = new FormData();

  for (const key in userData) {
    formData.append(key, userData[key as keyof IRegisterUser] as string);
  }

  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    body: formData,
  });

  const status = response.status;
  const json = await response.json();

  return {
    json,
    status,
  };
};
