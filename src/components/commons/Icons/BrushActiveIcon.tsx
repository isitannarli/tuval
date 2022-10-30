import * as React from "react";
import { SVGProps } from "react";

function SvgBrushActiveIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M21.81 3.94c-1.31 3.27-4.3 7.54-7.15 10.33a5.962 5.962 0 0 0-5.07-4.96c2.8-2.86 7.1-5.89 10.38-7.21.58-.22 1.16-.05 1.52.31.38.38.56.95.32 1.53Z"
        fill="currentColor"
      />
      <path
        opacity={0.4}
        d="M14.66 14.27c-.5.49-1 .94-1.48 1.32l-1.97 1.58c-.25.18-.5.33-.78.45 0-.19-.02-.38-.04-.58-.11-.83-.49-1.62-1.16-2.29-.69-.68-1.51-1.07-2.36-1.18-.2-.02-.41-.03-.6-.02.11-.31.28-.6.49-.84l1.56-1.97c.37-.47.8-.95 1.27-1.43 2.6.36 4.66 2.38 5.07 4.96Z"
        fill="currentColor"
      />
      <path
        d="M10.43 17.62c0 1.1-.42 2.15-1.22 2.94-.61.62-1.43 1.04-2.43 1.16l-2.45.27c-1.34.15-2.49-1-2.34-2.35l.27-2.46c.24-2.19 2.07-3.59 4.01-3.63.19-.01.4 0 .6.02.85.11 1.67.5 2.36 1.18.67.67 1.05 1.46 1.16 2.29.02.2.04.39.04.58Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgBrushActiveIcon;
