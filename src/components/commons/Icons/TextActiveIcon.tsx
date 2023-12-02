import React from "react";
import { type SVGProps } from "react";

export default function SvgTextActiveIcon(
  props: SVGProps<SVGSVGElement>,
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.67 7.17V5.35c0-1.15.93-2.07 2.07-2.07h14.52c1.15 0 2.07.93 2.07 2.07v1.82"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity={0.4}
        d="M12 20.72V4.11"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.06 20.72h7.88"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
