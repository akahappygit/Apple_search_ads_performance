import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UIState {
  sidebarCollapsed: boolean;
  theme: "light" | "dark";
  tableView: "compact" | "comfortable";
  selectedRows: string[];
  sidebarBg: "dark" | "light" | "gradient";
  accent: "teal" | "orange" | "cyan";
}

const initialState: UIState = {
  sidebarCollapsed: false,
  theme: "light",
  tableView: "comfortable",
  selectedRows: [],
  sidebarBg: "dark",
  accent: "orange"
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;
    },
    setTableView(state, action: PayloadAction<"compact" | "comfortable">) {
      state.tableView = action.payload;
    },
    setSelectedRows(state, action: PayloadAction<string[]>) {
      state.selectedRows = action.payload;
    },
    setSidebarBg(state, action: PayloadAction<"dark" | "light" | "gradient">) {
      state.sidebarBg = action.payload;
    },
    setAccent(state, action: PayloadAction<"teal" | "orange" | "cyan">) {
      state.accent = action.payload;
    }
  }
});

export const { setSidebarCollapsed, setTheme, setTableView, setSelectedRows, setSidebarBg, setAccent } =
uiSlice.actions;
export default uiSlice.reducer;