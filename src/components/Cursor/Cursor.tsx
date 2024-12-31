import clsx from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";
import useEventListener from "../../hooks/useEventListener";
import useSubscribeStore from "../../hooks/useSubscribeStore";
import { useStore } from "../../store/useStore";
import "./Cursor.scss";
import type { State } from "../../store/useStore.types";

export default function Cursor(): React.ReactElement | null {
  const [lastScrollPosition, setLastScrollPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const cursorRef = useRef<HTMLDivElement>(null);

  const {
    toolType,
    brushSize,
    brushColor,
    brushColorType,
    currentRainbowColor,
  } = useStore((state) => state);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.width = `${brushSize}px`;
      cursorRef.current.style.height = `${brushSize}px`;
      cursorRef.current.style.backgroundColor =
        brushColorType === "rainbow" ? currentRainbowColor : brushColor;
    }
  }, []);

  const setCursorPosition = useCallback(
    (scrollPositionX: number, scrollPositionY: number) => {
      if (!cursorRef.current) {
        return;
      }

      const cursorWidth = cursorRef.current.offsetWidth;
      const cursorHeight = cursorRef.current.offsetHeight;

      const x = scrollPositionX - cursorWidth / 2;
      const y = scrollPositionY - cursorHeight / 2;

      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [],
  );

  useSubscribeStore<
    Pick<
      State,
      | "brushColor"
      | "brushColorType"
      | "toolType"
      | "brushSize"
      | "currentRainbowColor"
    >
  >(
    (state) => ({
      brushColor: state.brushColor,
      toolType: state.toolType,
      brushSize: state.brushSize,
      brushColorType: state.brushColorType,
      currentRainbowColor: state.currentRainbowColor,
    }),
    (state) => {
      if (!cursorRef.current) {
        return;
      }

      cursorRef.current.style.backgroundColor = state.brushColor;

      if (brushColorType === "rainbow") {
        cursorRef.current.style.backgroundColor = state.currentRainbowColor;
      }

      cursorRef.current.style.width = `${state.brushSize}px`;
      cursorRef.current.style.height = `${state.brushSize}px`;

      setCursorPosition(lastScrollPosition.x, lastScrollPosition.y);
    },
  );

  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    if (!cursorRef.current) {
      return;
    }

    const mouseY = event.clientY;
    const mouseX = event.clientX;

    setLastScrollPosition({
      x: mouseX,
      y: mouseY,
    });

    setCursorPosition(mouseX, mouseY);
  }, []);

  useEventListener("mousemove", mouseMoveHandler);

  if (!["eraser", "brush"].includes(toolType)) {
    return null;
  }

  return (
    <div
      className={clsx("cursor", {
        "cursor--eraser": toolType === "eraser",
      })}
      ref={cursorRef}
    />
  );
}
