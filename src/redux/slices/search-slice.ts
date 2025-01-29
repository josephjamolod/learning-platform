import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group, Post } from "@prisma/client";

type InitialStateProps = {
  isSearching?: boolean;
  status?: number | undefined;
  data: Group[] | Post[];
  debounce?: string;
};

const InitialState: InitialStateProps = {
  isSearching: false,
  status: undefined,
  data: [],
  debounce: "",
};

export const Search = createSlice({
  name: "search",
  initialState: InitialState,
  reducers: {
    onSearch: (state, action: PayloadAction<InitialStateProps>) => {
      return { ...action.payload };
    },
    onClearSearch: (state) => {
      state.data = [];
      state.isSearching = false;
      state.status = undefined;
      state.debounce = "";
    },
  },
});

export const { onSearch, onClearSearch } = Search.actions;
export default Search.reducer;
