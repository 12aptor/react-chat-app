import { API_URL } from "@/utils/constants";
import { ILogin } from "@/utils/types";

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
