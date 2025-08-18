import { create } from "zustand";

interface ICarTypeProps {
  carTypes: string[] | undefined;
  setCarTypes: (data: string[] | undefined) => void;
}

export const useCarTypesStore = create<ICarTypeProps>((set) => ({
  carTypes: [],
  setCarTypes: (carTypes) => set({ carTypes: carTypes }),
}));
