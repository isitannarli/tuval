/** Dependencies */
import clsx from "clsx";

/** Components */
import Tooltip from "../../../commons/Tooltip/Tooltip";
import { TickCircleLinearIcon } from "../../../commons/Icons";

/** Store */
import { useStore } from "../../../../store/useStore";

/** Stylesheets */
import "./RainbowColor.scss";

/** Types */
import type { RainbowColorProps } from "./RainbowColor.types";

export default function RainbowColor(props: RainbowColorProps) {
  const { className = "" } = props;

  const { setToolType, setBrushColorType, brushColorType } = useStore(
    (state) => state
  );

  return (
    <Tooltip title="Rainbow">
      <button
        type="button"
        className={clsx("rainbow-color", className)}
        onClick={() => {
          setBrushColorType("rainbow");
          setToolType("brush");
        }}
      >
        {brushColorType === "rainbow" && (
          <TickCircleLinearIcon className="rainbow-color__active-icon" />
        )}
      </button>
    </Tooltip>
  );
}
