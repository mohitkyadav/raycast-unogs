import { useState, useEffect } from "react";
import { List, Icon, showToast } from "@raycast/api";

import { searchTitle } from "../../api";
import { SearchResults } from "../../models";

export const SearchResultsPage = (props: { title: string }) => {
  const [data, setData] = useState<SearchResults>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchTitle(props.title)
      .then((data: SearchResults) => {
        setData(data);
        console.log(data.results[0]);
      })
      .catch((error) => {
        showToast(error.message);
      })
      .finally(() => setLoading(false));
  }, [props.title]);

  return (
    <List isLoading={loading}>
      {data?.results.map((result) => (
        <List.Item
          key={result.netflix_id}
          icon={result.title_type === "movie" ? "🎬" : "📺"}
          title={result.title}
          subtitle={result.title_date}
          accessories={[{ text: result.year, icon: Icon.Calendar }]}
          keywords={[result.title, result.imdb_id, result.year, result.synopsis]}
        />
      ))}
    </List>
  );
};
