import { IconCircleCheck } from "@tabler/icons-react";
import clsx from "clsx";
import { useStore } from "../../../../store/useStore";
import Tooltip from "../../../commons/Tooltip/Tooltip";
import "./ColorPicker.scss";
import type { ColorPickerProps } from "./ColorPicker.types";

export default function ColorPicker(
  props: ColorPickerProps,
): React.ReactElement {
  const { className = "" } = props;

  const {
    brushColor,
    setToolType,
    setBrushColorType,
    brushColorType,
    setBrushColor,
  } = useStore((state) => state);

  return (
    <Tooltip title="Color Picker">
      <label className={clsx("color-picker", className)}>
        <div
          className="color-picker__block"
          style={{ backgroundColor: brushColor }}
        >
          {brushColorType === "solid" && (
            <IconCircleCheck className="color-picker__active-icon" />
          )}
        </div>
        <input
          type="color"
          className="color-picker__input"
          onClick={(): void => {
            setBrushColorType("solid");
          }}
          onChange={(event): void => {
            setBrushColor(event.target.value);
            setBrushColorType("solid");
            setToolType("brush");
          }}
        />
      </label>
    </Tooltip>
  );
}
