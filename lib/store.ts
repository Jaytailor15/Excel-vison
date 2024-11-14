import { create } from 'zustand';

export interface DataRow {
  [key: string]: string | number;
}

interface DataStore {
  data: DataRow[];
  columns: string[];
  setData: (data: DataRow[]) => void;
  setColumns: (columns: string[]) => void;
  clearData: () => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  columns: [],
  setData: (data) => set({ data }),
  setColumns: (columns) => set({ columns }),
  clearData: () => set({ data: [], columns: [] }),
}));