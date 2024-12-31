/// <reference types="vite/client" />

import type * as app from "@tauri-apps/api";
import type * as autostart from "@tauri-apps/plugin-autostart";
import type * as globalShortcut from "@tauri-apps/plugin-global-shortcut";

declare global {
  interface Window {
    __TAURI__: typeof app & {
      globalShortcut: typeof globalShortcut;
      autostart: typeof autostart;
    };
  }
}
