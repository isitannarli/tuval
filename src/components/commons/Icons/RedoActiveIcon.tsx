import React from "react";
import { type SVGProps } from "react";

export default function SvgRedoActiveIcon(
  props: SVGProps<SVGSVGElement>,
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.4}
        d="M16.87 19.112h-8c-2.76 0-5-2.24-5-5s2.24-5 5-5h11"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m17.57 11.612 2.56-2.56-2.56-2.56"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
