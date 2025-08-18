import { create } from "zustand";

interface IServiceStatusProps {
  serviceStatus: string[] | undefined;
  setServiceStatus: (data: string[] | undefined) => void;
}

export const useServiceStatusStore = create<IServiceStatusProps>((set) => ({
  serviceStatus: [],
  setServiceStatus: (serviceStatus) => set({ serviceStatus: serviceStatus }),
}));
