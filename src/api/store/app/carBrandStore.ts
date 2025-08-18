import { create } from "zustand";

interface ICarBrandProps {
  carBrands: string[] | undefined;
  setCarBrands: (data: string[] | undefined) => void;
}

export const useCarBrandsStore = create<ICarBrandProps>((set) => ({
  carBrands: [],
  setCarBrands: (carBrands) => set({ carBrands: carBrands }),
}));
