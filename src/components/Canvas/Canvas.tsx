/** Dependencies */
import { useCallback, useEffect, useRef, useState } from "react";

/** Store */
import { useStore } from "../../store/useStore";

/** Hooks */
import useEventListener from "../../hooks/useEventListener";

/** Types */
import type { Coordinate } from "./Canvas.types";

export default function Canvas() {
  const [lastPressed, setLastPressed] = useState<string>("");
  const [isPainting, setIsPainting] = useState(false);
  const [hue, setHue] = useState(0);
  const [mousePosition, setMousePosition] = useState<Coordinate>();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    toolType,
    brushColor,
    brushSize,
    brushColorType,
    setCurrentRainbowColor,
  } = useStore((state) => state);

  const canvasInitilize = () => {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
  };

  useEffect(() => {
    canvasInitilize();
  }, []);

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      context.strokeStyle = brushColor;

      if (brushColorType === "rainbow" && toolType === "brush") {
        const currentRainbowColor = `hsl(${hue}, 100%, 50%)`;
        context.strokeStyle = currentRainbowColor;
        setCurrentRainbowColor(currentRainbowColor);
      }

      setHue((prev) => {
        const newValue = prev + 1;

        if (newValue >= 360) {
          return 0;
        }

        return newValue;
      });

      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = brushSize;

      if (toolType === "eraser") {
        context.globalCompositeOperation = "destination-out";
      } else {
        context.globalCompositeOperation = "source-over";
      }

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    },
    [toolType, brushSize, brushColor, hue]
  );

  const getCoordinates = (event: MouseEvent): Coordinate => {
    const canvas = canvasRef.current as HTMLCanvasElement;

    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const startPaint = useCallback((event: MouseEvent) => {
    setMousePosition(getCoordinates(event));
    setIsPainting(true);
  }, []);

  useEventListener("mousedown", startPaint);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (!isPainting) {
        return;
      }

      const newMousePosition = getCoordinates(event);

      if (mousePosition && newMousePosition) {
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    },
    [isPainting, mousePosition]
  );

  useEventListener("mousemove", paint);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEventListener("mouseup", exitPaint);
  useEventListener("mouseleave", exitPaint);

  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      const canvas = canvasRef.current as HTMLCanvasElement;
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      if (["Meta", "ctrl"].includes(lastPressed) && event.key === "Backspace") {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      setLastPressed(event.key);
    },
    [lastPressed]
  );

  useEventListener("keydown", keydownHandler);

  return <canvas ref={canvasRef} />;
}
