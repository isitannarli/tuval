/** Dependencies */
import create from "zustand";

/** Middleware */
import { subscribeWithSelector, persist } from "zustand/middleware";

/** Types */
import type { State } from "./useStore.types";

const useStore = create<State>()(
  persist(
    subscribeWithSelector((set) => ({
      brushColor: "#FFFFFF",
      setBrushColor: (value) => set(() => ({ brushColor: value })),
      brushColorType: "rainbow",
      setBrushColorType: (value) => set(() => ({ brushColorType: value })),
      toolType: "brush",
      setToolType: (value) => set(() => ({ toolType: value })),
      brushSize: 10,
      setBrushSize: (callback) =>
        set(({ brushSize }) => ({
          brushSize: callback(brushSize),
        })),
      currentRainbowColor: "red",
      setCurrentRainbowColor: (value) =>
        set(() => ({ currentRainbowColor: value })),
    })),
    {
      name: "tuval-storage",
    }
  )
);

// eslint-disable-next-line import/prefer-default-export
export { useStore };
