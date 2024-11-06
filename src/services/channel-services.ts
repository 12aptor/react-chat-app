import { API_URL } from "@/utils/constants";

export const getChannelsService = async () => {
  try {
    const response = await fetch(`${API_URL}/channel/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    return json;
  } catch {
    return null;
  }
};
