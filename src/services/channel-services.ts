import { API_URL } from "@/utils/constants";

export const getChannelsService = async () => {
  try {
    const response = await fetch(`${API_URL}/channels/list`);

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    return json;
  } catch {
    return null;
  }
};
