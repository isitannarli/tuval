/** Dependencies */
import React, { useEffect } from "react";
import { register } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";
import { Canvas, Tldraw, type TLEditorComponents } from "@tldraw/tldraw";

/** Contexts */
import { withMediatorContext } from "./contexts/MediatorContext/MediatorContext";

/** Hooks */
// import useDetectSystemTheme from "./hooks/useDetectSystemTheme";

/** Stylesheets */
import "@tldraw/tldraw/tldraw.css";
import Toolbar from "./components/Toolbar/Toolbar";

function MyComponent(): JSX.Element {
  return (
    <>
      <div className="absolute bg-transparent w-fit"></div>
    </>
  );
}

const components: Partial<TLEditorComponents> = {
  Background: MyComponent,
  // Cursor,
  // InFrontOfTheCanvas: MyComponentInFront,
  // SnapLine: null,
};

function Tuval(): JSX.Element {
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
    <div
      className="ccontainer"
      style={{ position: "fixed", inset: 0, backgroundColor: "transparent" }}
    >
      <Tldraw hideUi persistenceKey="canvas" components={components}>
        <Canvas />
        <Toolbar />
      </Tldraw>
    </div>
  );
}

export default withMediatorContext(Tuval);
