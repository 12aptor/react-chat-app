import { API_URL } from "@/utils/constants";

export const getMessagesService = async (channelId: string) => {
  try {
    const response = await fetch(`${API_URL}/messages/${channelId}`, {
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
