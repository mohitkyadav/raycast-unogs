import { getPreferenceValues, PreferenceValues } from "@raycast/api";
import axios from "axios";

const API_URL = "unogs-unogs-v1.p.rapidapi.com";
const TITLE_API_URL = `https://${API_URL}/search/titles`;

export const searchTitle = (title: string) => {
  const preferences: PreferenceValues = getPreferenceValues();

  axios
    .get(TITLE_API_URL, {
      params: { order_by: "date", title },
      headers: {
        "X-RapidAPI-Host": API_URL,
        "X-RapidAPI-Key": preferences.rapidApiKey,
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error.response);
    });
};
