import { IconEraser } from "@tabler/icons-react";
import clsx from "clsx";
import { useStore } from "../../../../store/useStore";
import Tooltip from "../../../commons/Tooltip/Tooltip";
import "./Eraser.scss";
import type { EraserProps } from "./Eraser.types";

export default function Eraser(props: EraserProps): React.ReactElement {
  const { className = "" } = props;

  const { toolType, setToolType } = useStore((state) => state);

  return (
    <Tooltip title="Eraser (E)">
      <button
        type="button"
        className={clsx("eraser", className, {
          // "toolbar__button--active": toolType === "eraser",
        })}
        onClick={(): void => setToolType("eraser")}
      >
        {toolType === "eraser" ? <IconEraser /> : <IconEraser />}
      </button>
    </Tooltip>
  );
}
