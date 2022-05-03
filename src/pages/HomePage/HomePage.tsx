import { ActionPanel, Detail, List, Action, Icon } from "@raycast/api";

import { searchTitle } from "../../api";

export const HomePage = () => {
  searchTitle("demon");

  return (
    <List>
      <List.Item icon={Icon.Star} title="Augustiner Helles" subtitle="0,5 Liter" accessories={[{ text: "Germany" }]} />
    </List>
  );
};
