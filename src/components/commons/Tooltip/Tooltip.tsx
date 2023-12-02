/** Dependencies */
import React, { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import useEventListener from "../../../hooks/useEventListener";

/** Tyoes */
import type { TooltipProps } from "./Tooltip.types";

export default function Tooltip(props: TooltipProps): JSX.Element | null {
  const {
    className = "",
    children,
    title,
    description,
    position = "top",
    ...others
  } = props;

  const [active, setActive] = useState(false);

  const tooltipWrapperRef = useRef<HTMLDivElement>(null);

  const mouseEnterHandler = useCallback(() => {
    setActive(true);
  }, []);

  useEventListener("mouseenter", mouseEnterHandler, tooltipWrapperRef);

  const mouseLeaveHandler = useCallback(() => {
    setActive(false);
  }, []);

  useEventListener("mouseleave", mouseLeaveHandler, tooltipWrapperRef);

  if (title === undefined && description === undefined) {
    return null;
  }

  return (
    <div className="tooltip-wrapper" ref={tooltipWrapperRef}>
      {children}
      <div
        className={clsx("tooltip", `tooltip--position-${position}`, className, {
          "tooltip--active": active,
        })}
        {...others}
      >
        {title !== undefined && <span className="tooltip__title">{title}</span>}
        {description !== undefined && (
          <span className="tooltip__description">{description}</span>
        )}
      </div>
    </div>
  );
}
