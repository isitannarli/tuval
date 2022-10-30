export interface State {
  brushColor: string;
  setBrushColor: (value: string) => void;
  brushColorType: ColorType;
  setBrushColorType: (value: ColorType) => void;
  toolType: Tool;
  setToolType: (value: Tool) => void;
  brushSize: number;
  setBrushSize: (callback: (prevValue: number) => number) => void;
  currentRainbowColor: string;
  setCurrentRainbowColor: (value: string) => void;
}

export type Tool = "brush" | "eraser";
export type ColorType = "solid" | "rainbow";

// export type CanvasRef = React.RefObject<HTMLCanvasElement> | null;
