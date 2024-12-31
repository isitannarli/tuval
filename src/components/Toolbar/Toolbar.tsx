import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react";
import { hide } from "@tauri-apps/api/app";
import { useCallback, useState } from "react";
import useEventListener from "../../hooks/useEventListener";
import { useStore } from "../../store/useStore";
import Brush from "./Tools/Brush/Brush";
import ColorPicker from "./Tools/ColorPicker/ColorPicker";
import Eraser from "./Tools/Eraser/Eraser";
import RainbowColor from "./Tools/RainbowColor/RainbowColor";
import "./Toolbar.scss";
import clsx from "clsx";

export default function Toolbar(): React.ReactElement {
  const [lastScrollPosition, setLastScrollPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [lastPressed, setLastPressed] = useState<string>("");

  const { setBrushSize, setToolType, toolType } = useStore((state) => state);

  const mouseMoveHandler = useCallback((event: MouseEvent) => {
    setLastScrollPosition({
      x: event.clientY,
      y: event.clientX,
    });
  }, []);

  useEventListener("mousemove", mouseMoveHandler);

  const mouseDownHandler = useCallback(async (event: MouseEvent) => {
    if (event.button === 2) {
      await hide();
    }
  }, []);

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
    [lastScrollPosition],
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
    [lastPressed, setLastPressed],
  );

  useEventListener("keydown", keydownHandler);

  const contextMenuHandler = useCallback((event: Event) => {
    event.preventDefault();
  }, []);

  useEventListener("contextmenu", contextMenuHandler);

  return (
    <div className="toolbar">
      <div className="toolbar__items">
        <Brush
          className={clsx("toolbar__item", {
            "toolbar__item--active": toolType === "brush",
          })}
        />
        <Eraser
          className={clsx("toolbar__item", {
            "toolbar__item--active": toolType === "eraser",
          })}
        />
        <ColorPicker className="toolbar__item" />
        <RainbowColor className="toolbar__item" />
      </div>
      <div className="toolbar__items">
        <div className="toolbar__item">
          <button type="button" className="toolbar__button">
            <IconArrowBackUp />
          </button>
        </div>
        <div className="toolbar__item">
          <button type="button" className="toolbar__button">
            <IconArrowForwardUp />
          </button>
        </div>
      </div>
    </div>
  );
}
