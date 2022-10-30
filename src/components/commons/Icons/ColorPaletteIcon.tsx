import * as React from "react";
import { SVGProps } from "react";

function SvgColorPaletteIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M10 4.5V18c0 1.08-.44 2.07-1.14 2.79l-.04.04c-.09.09-.19.18-.28.25-.3.26-.64.46-.99.6-.11.05-.22.09-.33.13-.39.13-.81.19-1.22.19-.27 0-.54-.03-.8-.08-.13-.03-.26-.06-.39-.1-.16-.05-.31-.1-.46-.17 0-.01 0-.01-.01 0-.28-.14-.55-.3-.8-.49l-.01-.01c-.13-.1-.25-.2-.36-.32-.11-.12-.22-.24-.33-.37-.19-.25-.35-.52-.49-.8.01-.01.01-.01 0-.01 0 0 0-.01-.01-.02-.06-.14-.11-.29-.16-.44a5.58 5.58 0 0 1-.1-.39c-.05-.26-.08-.53-.08-.8V4.5C2 3 3 2 4.5 2h3C9 2 10 3 10 4.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 16.5v3c0 1.5-1 2.5-2.5 2.5H6c.41 0 .83-.06 1.22-.19.11-.04.22-.08.33-.13.35-.14.69-.34.99-.6.09-.07.19-.16.28-.25l.04-.04 6.8-6.79h3.84c1.5 0 2.5 1 2.5 2.5ZM4.81 21.82c-.6-.18-1.17-.51-1.64-.99-.48-.47-.81-1.04-.99-1.64a4.02 4.02 0 0 0 2.63 2.63Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.37 11.29 15.66 14l-6.8 6.79C9.56 20.07 10 19.08 10 18V8.34l2.71-2.71c1.06-1.06 2.48-1.06 3.54 0l2.12 2.12c1.06 1.06 1.06 2.48 0 3.54ZM6 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgColorPaletteIcon;
