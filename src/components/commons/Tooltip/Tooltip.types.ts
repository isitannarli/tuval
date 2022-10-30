/** Types */
import type { HTMLAttributes, PropsWithChildren } from "react";

export interface TooltipProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  title?: string;
  description?: string;
  position?: "top" | "left" | "right" | "bottom";
}
