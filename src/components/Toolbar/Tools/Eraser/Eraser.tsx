/** Dependencies */
import clsx from "clsx";

/** Components */
import Tooltip from "../../../commons/Tooltip/Tooltip";
import { EraserIcon, EraserActiveIcon } from "../../../commons/Icons";

/** Store */
import { useStore } from "../../../../store/useStore";

/** Stylesheets */
import "./Eraser.scss";

/** Types */
import type { EraserProps } from "./Eraser.types";

export default function Eraser(props: EraserProps) {
  const { className = "" } = props;

  const { toolType, setToolType } = useStore((state) => state);

  return (
    <Tooltip title="Eraser (E)">
      <button
        type="button"
        className={clsx("eraser", className, {
          // "toolbar__button--active": toolType === "eraser",
        })}
        onClick={() => setToolType("eraser")}
      >
        {toolType === "eraser" ? <EraserActiveIcon /> : <EraserIcon />}
      </button>
    </Tooltip>
  );
}
