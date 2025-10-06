import { combineReducers } from "@reduxjs/toolkit";
import filtersReducer from "@/features/filters/store/filters.slice";
import uiReducer from "./ui.slice";

export const rootReducer = combineReducers({
  filters: filtersReducer,
  ui: uiReducer
});

export type RootState = ReturnType<typeof rootReducer>;