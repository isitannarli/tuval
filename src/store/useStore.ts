import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import type { State } from "./useStore.types";

export const useStore = create<State>()(
  persist(
    subscribeWithSelector((set) => ({
      brushColor: "#FFFFFF",
      setBrushColor: (value): void => set(() => ({ brushColor: value })),
      brushColorType: "rainbow",
      setBrushColorType: (value): void =>
        set(() => ({ brushColorType: value })),
      toolType: "brush",
      setToolType: (value): void => set(() => ({ toolType: value })),
      brushSize: 10,
      setBrushSize: (callback): void =>
        set(({ brushSize }) => ({
          brushSize: callback(brushSize),
        })),
      currentRainbowColor: "red",
      setCurrentRainbowColor: (value): void =>
        set(() => ({ currentRainbowColor: value })),
    })),
    {
      name: "tuval-storage",
    },
  ),
);
