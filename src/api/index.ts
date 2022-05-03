import { getPreferenceValues, PreferenceValues } from "@raycast/api";
import axios from "axios";

import { SearchResults } from "../models";

const API_URL = "unogs-unogs-v1.p.rapidapi.com";
const TITLE_API_URL = `https://${API_URL}/search/titles`;

export const searchTitle = (title: string): Promise<SearchResults> => {
  const preferences: PreferenceValues = getPreferenceValues();

  return axios
    .get(TITLE_API_URL, {
      params: { order_by: "date", title },
      headers: {
        "X-RapidAPI-Host": API_URL,
        "X-RapidAPI-Key": preferences.rapidApiKey,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
