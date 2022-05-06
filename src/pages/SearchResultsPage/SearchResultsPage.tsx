import { useState, useEffect } from "react";
import { List, Icon, showToast, ActionPanel, Action } from "@raycast/api";

import { getTitleCountries, searchTitle } from "../../api";
import { SearchItem, SearchResults, TitleCountries } from "../../models";
import { detailMarkDown } from "../../utils";

export const SearchResultsPage = (props: { title: string }) => {
  const [data, setData] = useState<SearchResults>();
  const [currentTitleCountries, setCurrentTitleCountries] = useState<TitleCountries>();
  const [loading, setLoading] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [showingDetails, setShowingDetails] = useState(false);

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

  const handleSelect = (id?: string) => {
    setCurrentTitleCountries(undefined);

    if (id) {
      const netflixId = data?.results[parseInt(id, 10)].netflix_id;
      if (netflixId) {
        setIsLoadingDetails(true);
        getTitleCountries(netflixId)
          .then((data: TitleCountries) => {
            setCurrentTitleCountries(data);
          })
          .finally(() => setIsLoadingDetails(false));
      }
    }
  };

  return (
    <List isLoading={loading} isShowingDetail={showingDetails} onSelectionChange={handleSelect}>
      {data?.results?.map((result: SearchItem, idx: number) => {
        const props: Partial<List.Item.Props> = showingDetails
          ? {
              detail: (
                <List.Item.Detail
                  isLoading={isLoadingDetails}
                  markdown={detailMarkDown(result, currentTitleCountries?.results)}
                />
              ),
            }
          : { subtitle: result.title_date };

        return (
          <List.Item
            key={result.netflix_id}
            id={idx.toString()}
            icon={result.title_type === "movie" ? "🎬" : "📺"}
            title={result.title}
            accessories={[{ text: result.year, icon: Icon.Calendar }]}
            keywords={[result.title, result.imdb_id, result.year, result.synopsis]}
            actions={
              <ActionPanel>
                <Action icon={Icon.List} title="Show Details" onAction={() => setShowingDetails(!showingDetails)} />
                <Action.OpenInBrowser url={`https://www.netflix.com/title/${result.netflix_id}`} />
              </ActionPanel>
            }
            {...props}
          />
        );
      })}
    </List>
  );
};
