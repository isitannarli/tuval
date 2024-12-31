import { IconCircleCheck } from "@tabler/icons-react";
import clsx from "clsx";
import { useStore } from "../../../../store/useStore";
import Tooltip from "../../../commons/Tooltip/Tooltip";
import "./RainbowColor.scss";
import type { RainbowColorProps } from "./RainbowColor.types";

export default function RainbowColor(
  props: RainbowColorProps,
): React.ReactElement {
  const { className = "" } = props;

  const { setToolType, setBrushColorType, brushColorType } = useStore(
    (state) => state,
  );

  return (
    <Tooltip title="Rainbow">
      <button
        type="button"
        className={clsx("rainbow-color", className)}
        onClick={(): void => {
          setBrushColorType("rainbow");
          setToolType("brush");
        }}
      >
        {brushColorType === "rainbow" && (
          <IconCircleCheck className="rainbow-color__active-icon" />
        )}
      </button>
    </Tooltip>
  );
}
