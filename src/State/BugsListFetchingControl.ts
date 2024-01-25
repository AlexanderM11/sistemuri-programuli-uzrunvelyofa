import { create } from 'zustand';

type BugsListFetchingControlType = {
  haveToFetch: boolean;
  setHaveToFetch: (state: boolean) => void;
} 

export const useBugsListFetchingControl = create<BugsListFetchingControlType>((set) => ({
  haveToFetch: true,
  setHaveToFetch: (haveToFetch) => set(() => ({ haveToFetch })),
}))