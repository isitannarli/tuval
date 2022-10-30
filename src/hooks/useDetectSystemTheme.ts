/** Dependencies */
import { useState, useEffect } from "react";
import { appWindow, type Theme } from "@tauri-apps/api/window";

/** Types */
import type { UnlistenFn } from "@tauri-apps/api/event";

export default function useDetectSystemTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let unlisten: UnlistenFn;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const currentSystemTheme = await appWindow.theme();

      if (currentSystemTheme) {
        setTheme(currentSystemTheme);
      }

      unlisten = await appWindow.onThemeChanged(({ payload }) => {
        setTheme(payload);
      });
    })();

    return () => {
      if (unlisten) {
        unlisten();
      }
    };
  }, []);

  return theme;
}
