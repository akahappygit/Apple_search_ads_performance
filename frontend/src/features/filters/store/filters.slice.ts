import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterPreset {
  id: string;
  name: string;
  dateRange: {from: string;to: string;};
  accountIds: string[];
  campaignStatus: "all" | "active" | "paused";
  searchTerm: string;
}

export interface FiltersState {
  dateRange: {from: string;to: string;};
  accountIds: string[];
  campaignStatus: "all" | "active" | "paused";
  searchTerm: string;
  savedPresets: FilterPreset[];
}

const initialState: FiltersState = {
  dateRange: { from: new Date().toISOString(), to: new Date().toISOString() },
  accountIds: [],
  campaignStatus: "all",
  searchTerm: "",
  savedPresets: []
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setDateRange(state, action: PayloadAction<{from: string;to: string;}>) {
      state.dateRange = action.payload;
    },
    setAccountIds(state, action: PayloadAction<string[]>) {
      state.accountIds = action.payload;
    },
    setCampaignStatus(state, action: PayloadAction<"all" | "active" | "paused">) {
      state.campaignStatus = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    savePreset(state, action: PayloadAction<FilterPreset>) {
      state.savedPresets.push(action.payload);
    },
    clearFilters(state) {
      state.dateRange = initialState.dateRange;
      state.accountIds = [];
      state.campaignStatus = "all";
      state.searchTerm = "";
    }
  }
});

export const {
  setDateRange,
  setAccountIds,
  setCampaignStatus,
  setSearchTerm,
  savePreset,
  clearFilters
} = filtersSlice.actions;

export default filtersSlice.reducer;