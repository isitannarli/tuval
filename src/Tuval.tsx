/** Dependencies */
import React, { useEffect } from "react";
import { register } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// import { invoke } from "@tauri-apps/api/tauri";

/** Components */
import Toolbar from "./components/Toolbar/Toolbar";
import Canvas from "./components/Canvas/Canvas";
import Cursor from "./components/Cursor/Cursor";

/** Contexts */
import { withMediatorContext } from "./contexts/MediatorContext/MediatorContext";

/** Hooks */
// import useDetectSystemTheme from "./hooks/useDetectSystemTheme";

function Tuval() {
  // const theme = useDetectSystemTheme();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      await register("CommandOrControl+Shift+B", async () => {
        await appWindow.show();
      });
    })();
  }, []);

  return (
    <div className="container">
      <Canvas />
      <Toolbar />
      <Cursor />
    </div>
  );
}

export default withMediatorContext(Tuval);
