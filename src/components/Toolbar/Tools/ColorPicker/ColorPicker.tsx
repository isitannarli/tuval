/** Dependencies */
import clsx from "clsx";

/** Components */
import Tooltip from "../../../commons/Tooltip/Tooltip";
import { TickCircleLinearIcon } from "../../../commons/Icons";

/** Store */
import { useStore } from "../../../../store/useStore";

/** Stylesheets */
import "./ColorPicker.scss";

/** Types */
import type { ColorPickerProps } from "./ColorPicker.types";

export default function ColorPicker(props: ColorPickerProps) {
  const { className = "" } = props;

  const {
    brushColor,
    setToolType,
    setBrushColorType,
    brushColorType,
    setBrushColor,
  } = useStore((state) => state);

  /* eslint-disable jsx-a11y/label-has-associated-control */
  return (
    <Tooltip title="Color Picker">
      <label className={clsx("color-picker", className)}>
        <div
          className="color-picker__block"
          style={{ backgroundColor: brushColor }}
        >
          {brushColorType === "solid" && (
            <TickCircleLinearIcon className="color-picker__active-icon" />
          )}
        </div>
        <input
          type="color"
          className="color-picker__input"
          onClick={() => {
            setBrushColorType("solid");
          }}
          onChange={(event) => {
            setBrushColor(event.target.value);
            setBrushColorType("solid");
            setToolType("brush");
          }}
        />
      </label>
    </Tooltip>
  );
  /* eslint-enable jsx-a11y/label-has-associated-control */
}
