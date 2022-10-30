/** Dependencies */
import { type MouseEvent, useCallback } from "react";
import clsx from "clsx";

/** Components */
import Tooltip from "../../../commons/Tooltip/Tooltip";
import { BrushActiveIcon, BrushIcon } from "../../../commons/Icons";

/** Store */
import { useStore } from "../../../../store/useStore";

/** Stylesheets */
import "./Brush.scss";

/** Types */
import type { BrushProps } from "./Brush.types";

export default function Brush(props: BrushProps) {
  const { className = "" } = props;

  const { toolType, setToolType } = useStore((state) => state);

  const clickHandler = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setToolType("brush");
  }, []);

  return (
    <Tooltip title="Brush (B)">
      <button
        type="button"
        className={clsx("brush", className, {
          // "toolbar__button--active": toolType === "brush",
        })}
        onClick={clickHandler}
      >
        {toolType === "brush" ? <BrushActiveIcon /> : <BrushIcon />}
      </button>
    </Tooltip>
  );
}
