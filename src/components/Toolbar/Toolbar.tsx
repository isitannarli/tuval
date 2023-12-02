/** Dependencies */
import React from "react";
import { appWindow } from "@tauri-apps/api/window";
import { track, useEditor } from "@tldraw/tldraw";

/** Components */
import { RedoIcon, UndoIcon } from "../commons/Icons";

/** Hooks */
import useEventListener from "../../hooks/useEventListener";

const Toolbar = track(() => {
  const editor = useEditor();

  const mouseDownHandler = async (event: MouseEvent): Promise<void> => {
    if (event.which === 3) {
      await appWindow.hide();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  useEventListener("mousedown", mouseDownHandler);

  const contextMenuHandler = (event: Event): void => {
    event.preventDefault();
  };

  useEventListener("contextmenu", contextMenuHandler);

  const keyupHandler = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "Delete":
      case "Backspace":
        if (
          (editor.selectedShapeIds.length === 0 && event.ctrlKey) ||
          event.metaKey
        ) {
          editor.selectAll();
        }

        editor.deleteShapes(editor.selectedShapeIds);
        break;
      case "v":
        editor.setCurrentTool("select");
        break;
      case "e":
        editor.setCurrentTool("eraser");
        break;
      case "b":
        editor.setCurrentTool("draw");
        break;
      case "z":
        if (event.ctrlKey || event.metaKey) {
          if (event.shiftKey) {
            editor.redo();
          } else {
            editor.undo();
          }
          break;
        }
        break;
    }
  };

  useEventListener("keydown", keyupHandler);

  return (
    <div className="toolbar">
      <div className="toolbar__items">
        {/* <Brush className="toolbar__item" />
        <Eraser className="toolbar__item" />
        <ColorPicker className="toolbar__item" />
        <RainbowColor className="toolbar__item" /> */}
      </div>
      <div className="toolbar__item">
        <button
          className="toolbar__item"
          onClick={() => {
            const stringified = localStorage.getItem("snapshot");
            const snapshot = JSON.parse(stringified ?? "{}");
            editor.store.loadSnapshot(snapshot);
          }}
        >
          Load
        </button>
      </div>
      <div className="toolbar__items">
        <div className="toolbar__item">
          <button
            type="button"
            className="toolbar__button"
            onClick={() => editor.undo()}
          >
            <UndoIcon />
          </button>
        </div>
        <div className="toolbar__item">
          <button
            type="button"
            className="toolbar__button"
            onClick={() => editor.redo()}
          >
            <RedoIcon />
          </button>
        </div>
      </div>
    </div>
  );
});

export default Toolbar;
