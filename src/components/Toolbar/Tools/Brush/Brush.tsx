import { IconBrush } from "@tabler/icons-react";
import clsx from "clsx";
import { type MouseEvent, useCallback } from "react";
import { useStore } from "../../../../store/useStore";
import Tooltip from "../../../commons/Tooltip/Tooltip";
import "./Brush.scss";
import type { BrushProps } from "./Brush.types";

export default function Brush(props: BrushProps): React.ReactElement {
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
          "brush--active": toolType === "brush",
        })}
        onClick={clickHandler}
      >
        <IconBrush />
      </button>
    </Tooltip>
  );
}
