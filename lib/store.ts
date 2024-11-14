import { create } from 'zustand';
import { ExcelData } from './types';

interface DataStore {
  data: ExcelData[];
  columns: string[];
  setData: (data: ExcelData[]) => void;
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