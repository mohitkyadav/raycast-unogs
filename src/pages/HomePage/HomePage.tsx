import { ActionPanel, Detail, List, Action, Icon } from "@raycast/api";

import { searchTitle } from "../../api";
import { SearchResults } from "../../models";

export const HomePage = () => {
  searchTitle("demon")
    .then((data: SearchResults) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error.response);
    });

  return (
    <List>
      <List.Item icon={Icon.Star} title="Augustiner Helles" subtitle="0,5 Liter" accessories={[{ text: "Germany" }]} />
    </List>
  );
};
