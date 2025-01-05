import { useCallback, useEffect, useRef, useState } from "react";
import useEventListener from "../../hooks/useEventListener";
import { useStore } from "../../store/useStore";
import type { Coordinate } from "./Canvas.types";

export default function Canvas(): React.ReactElement {
  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate>();

  // History state
  const [history, setHistory] = useState<ImageData[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

  // Color state
  const [hue, setHue] = useState(0);

  // Store values
  const {
    toolType,
    brushColor,
    brushSize,
    brushColorType,
    setCurrentRainbowColor,
  } = useStore((state) => state);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    const initialImageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    setHistory([initialImageData]);
    setCurrentStep(0);
  }, []);

  // Drawing functions
  const getCoordinates = (event: MouseEvent): Coordinate => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      if (brushColorType === "rainbow" && toolType === "brush") {
        const currentRainbowColor = `hsl(${hue}, 100%, 50%)`;
        context.strokeStyle = currentRainbowColor;
        setCurrentRainbowColor(currentRainbowColor);

        setHue((prev) => (prev >= 359 ? 0 : prev + 1));
      } else {
        context.strokeStyle = brushColor;
      }

      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = brushSize;
      context.globalCompositeOperation =
        toolType === "eraser" ? "destination-out" : "source-over";

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      context.stroke();
    },
    [
      toolType,
      brushSize,
      brushColor,
      brushColorType,
      hue,
      setCurrentRainbowColor,
    ],
  );

  // History management
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || !hasDrawn) return;

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(0, currentStep + 1), imageData]);
    setCurrentStep((prev) => prev + 1);
    setHasDrawn(false);
  }, [hasDrawn, currentStep]);

  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || currentStep <= 0) return;

    const newStep = currentStep - 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(history[newStep], 0, 0);
    setCurrentStep(newStep);
  }, [history, currentStep]);

  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || currentStep >= history.length - 1) return;

    const newStep = currentStep + 1;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(history[newStep], 0, 0);
    setCurrentStep(newStep);
  }, [history, currentStep]);

  // Event handlers
  const startPaint = useCallback((event: MouseEvent) => {
    setMousePosition(getCoordinates(event));
    setIsPainting(true);
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (!isPainting || !mousePosition) return;

      const newMousePosition = getCoordinates(event);
      drawLine(mousePosition, newMousePosition);
      setMousePosition(newMousePosition);
      setHasDrawn(true);
    },
    [isPainting, mousePosition, drawLine],
  );

  const exitPaint = useCallback(() => {
    if (isPainting) {
      saveToHistory();
    }
    setIsPainting(false);
    setMousePosition(undefined);
  }, [isPainting, saveToHistory]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;

      if (isCtrlOrCmd && !event.shiftKey && event.key === "z") {
        undo();
      } else if (isCtrlOrCmd && event.shiftKey && event.key === "z") {
        redo();
      }
    },
    [undo, redo],
  );

  // Event listeners
  useEventListener("mousedown", startPaint);
  useEventListener("mousemove", paint);
  useEventListener("mouseup", exitPaint);
  useEventListener("mouseleave", exitPaint);
  useEventListener("keydown", handleKeyDown);

  return <canvas ref={canvasRef} />;
}
