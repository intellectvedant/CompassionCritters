import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    keyword: "",
    results: [],
  },
  reducers: {
    setSearch: (state, action) => {
      state.keyword = action.payload.keyword;
      state.results = action.payload.results;
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
