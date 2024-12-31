import { useEffect } from "react";
import Canvas from "./components/Canvas/Canvas";
import Cursor from "./components/Cursor/Cursor";
import Toolbar from "./components/Toolbar/Toolbar";

export default function Tuval(): React.ReactElement {
  useEffect(() => {
    (async () => {
      // Enable autostart
      await window.__TAURI__.autostart.enable();

      await window.__TAURI__.globalShortcut.register(
        "CommandOrControl+Shift+B",
        async (event) => {
          if (event.state === "Pressed") {
            await window.__TAURI__.core.invoke("toggle_window");
          }
        },
      );

      const menu = await window.__TAURI__.menu.Menu.new({
        items: [
          {
            id: "quit",
            text: "Quit",
            action: (): void => {
              console.log("quit pressed");
            },
          },
        ],
      });

      const tray = await window.__TAURI__.tray.TrayIcon.new({
        menu,
        // menuOnLeftClick: true,
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
