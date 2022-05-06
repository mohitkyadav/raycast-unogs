import { SearchItem, TitleCountry } from "../models";

export const detailMarkDown = (item: SearchItem, titleCountries: TitleCountry[] = []) => {
  return `
  # ${item.title}

  ${capitalize(item.title_type)} ✦ ${item.year}
   ✦ ${toTwoDecimal(toMinutes(item.runtime))} minutes
   ✦ \`${toTwoDecimal(parseInt(item.rating, 10))}/5\` Rating

  ---

  ${item.synopsis}

  ${item.poster && `<img src="${item.poster}" alt="${item.title}" height="250">`}

  ## Countries
  ${titleCountries.map((country) => `${getFlagEmoji(country.country_code) + country.country}`.trim()).join(", ")}
  `;
};

export const toTwoDecimal = (num: number) => {
  return Math.round(num * 100) / 100;
};

export const toMinutes = (time: string) => {
  return parseInt(time, 10) / 60;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFlagEmoji = (country: string) => {
  const codePoints = country
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};
