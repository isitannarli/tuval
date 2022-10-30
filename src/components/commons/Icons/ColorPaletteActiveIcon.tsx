import * as React from "react";
import { SVGProps } from "react";

function SvgColorPaletteActiveIcon(props: SVGProps<SVGSVGElement>) {
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
        opacity={0.4}
        d="M22 16.5v3c0 1.5-1 2.5-2.5 2.5H6c.41 0 .83-.06 1.22-.19.11-.04.22-.08.33-.13.35-.14.69-.34.99-.6.09-.07.19-.16.28-.25l.04-.04 6.8-6.79h3.84c1.5 0 2.5 1 2.5 2.5Z"
        fill="currentColor"
      />
      <path
        opacity={0.6}
        d="M18.37 11.29 15.66 14l-6.8 6.79C9.56 20.07 10 19.08 10 18V8.34l2.71-2.71c1.06-1.06 2.48-1.06 3.54 0l2.12 2.12c1.06 1.06 1.06 2.48 0 3.54Z"
        fill="currentColor"
      />
      <path
        d="M7.5 2h-3C3 2 2 3 2 4.5V18c0 .27.03.54.08.8.03.13.06.26.1.39.05.15.1.3.16.44.01.01.01.02.01.02.01 0 .01 0 0 .01.14.28.3.55.49.8.11.13.22.25.33.37.11.12.23.22.36.32l.01.01c.25.19.52.35.8.49.01-.01.01-.01.01 0 .15.07.3.12.46.17.13.04.26.07.39.1.26.05.53.08.8.08.41 0 .83-.06 1.22-.19.11-.04.22-.08.33-.13.35-.14.69-.34.99-.6.09-.07.19-.16.28-.25l.04-.04C9.56 20.07 10 19.08 10 18V4.5C10 3 9 2 7.5 2ZM6 19.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgColorPaletteActiveIcon;