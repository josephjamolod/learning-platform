import { onSearchGroups } from "@/actions/groups";
import { supabaseClient } from "@/lib/utils";
import { onOnline } from "@/redux/slices/online-member-slice";
import { onClearSearch, onSearch } from "@/redux/slices/search-slice";
import { AppDispatch } from "@/redux/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type PresenceState = Record<
  string, // User identifier
  {
    member: {
      userid: string;
    };
  }[]
>;

export const useGroupChatOnline = (userid: string) => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const channel = supabaseClient.channel("tracking");

    channel
      .on("presence", { event: "sync" }, () => {
        const state: PresenceState = channel.presenceState();
        // console.log(state);
        for (const user in state) {
          dispatch(
            onOnline({
              members: [{ id: state[user][0].member.userid }],
            })
          );
        }
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            member: {
              userid,
            },
          });
        }
      });

    return () => {
      channel.unsubscribe();
    };
  }, []);
};

export const useSearch = (search: "GROUPS" | "POSTS") => {
  const [query, setQuery] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, data, isFetched, isFetching } = useQuery({
    queryKey: ["search-data", debounce],
    queryFn: async ({ queryKey }) => {
      switch (search) {
        case "GROUPS":
          const groups = await onSearchGroups(search, queryKey[1]);
          return groups;
        case "POSTS":
          const posts = await onSearchGroups(search, queryKey[1]);
          return posts;
        default:
          return;
      }
    },
    enabled: false,
  });

  console.log(data);

  if (isFetching)
    dispatch(
      onSearch({
        isSearching: true,
        data: [],
      })
    );

  if (isFetched)
    dispatch(
      onSearch({
        isSearching: false,
        status: data?.status as number,
        data: data?.groups || data?.posts || [],
        debounce,
      })
    );

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) dispatch(onClearSearch());
  }, [debounce]);

  return { query, onSearchQuery };
};
