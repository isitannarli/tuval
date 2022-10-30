import * as React from "react";
import { SVGProps } from "react";

function SvgEraserIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M9 22h12M2.91 17.58l3.51 3.51a3 3 0 0 0 4.24 0l10.43-10.43a3 3 0 0 0 0-4.24l-3.51-3.51a3 3 0 0 0-4.24 0L2.91 13.34a3 3 0 0 0 0 4.24ZM7.12 9.13l7.75 7.75M3.52 17.66 9.17 12M6.34 20.49 12 14.83"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgEraserIcon;
