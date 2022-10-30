/** Dependencies */
import { useCallback, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";

/** Components */
import Brush from "./Tools/Brush/Brush";
import Eraser from "./Tools/Eraser/Eraser";
import ColorPicker from "./Tools/ColorPicker/ColorPicker";
import RainbowColor from "./Tools/RainbowColor/RainbowColor";
// import { RedoIcon, UndoIcon } from "../commons/Icons";

/** Store */
import { useStore } from "../../store/useStore";

/** Hooks */
import useEventListener from "../../hooks/useEventListener";

/** Stylesheets */
import "./Toolbar.scss";

export default function Toolbar() {
  const [lastScrollPosition, setLastScrollPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [lastPressed, setLastPressed] = useState<string>("");

  const { setBrushSize, setToolType } = useStore((state) => state);

  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    setLastScrollPosition({
      x: event.clientY,
      y: event.clientX,
    });
  }, []);

  useEventListener("mousemove", mouseMoveHandler);

  const mouseDownHandler = useCallback(async (event: MouseEvent) => {
    if (event.which === 3) {
      await appWindow.hide();
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  useEventListener("mousedown", mouseDownHandler);

  const mouseWheelHandler = useCallback(
    (event: WheelEvent) => {
      const direction = event.deltaY > 0 ? "down" : "up";

      setBrushSize((prevValue) => {
        let newValue = prevValue;

        if (direction === "up") {
          const value = prevValue + 1;
          if (value > 60) {
            return prevValue;
          }

          newValue = value;
        } else {
          const value = prevValue - 1;
          if (value < 1) {
            return prevValue;
          }

          newValue = value;
        }

        return newValue;
      });
    },
    [lastScrollPosition]
  );

  useEventListener("wheel", mouseWheelHandler, undefined, { passive: false });

  const keydownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "b") {
        setToolType("brush");
      }

      if (event.key === "e") {
        setToolType("eraser");
      }

      setLastPressed(event.key);
    },
    [lastPressed, setLastPressed]
  );

  useEventListener("keydown", keydownHandler);

  const contextMenuHandler = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  useEventListener("contextmenu", contextMenuHandler);

  return (
    <div className="toolbar">
      <div className="toolbar__items">
        <Brush className="toolbar__item" />
        <Eraser className="toolbar__item" />
        <ColorPicker className="toolbar__item" />
        <RainbowColor className="toolbar__item" />
      </div>
      {/* <div className="toolbar__items">
        <div className="toolbar__item">
          <button type="button" className="toolbar__button">
            <UndoIcon />
          </button>
        </div>
        <div className="toolbar__item">
          <button type="button" className="toolbar__button">
            <RedoIcon />
          </button>
        </div>
      </div> */}
    </div>
  );
}
