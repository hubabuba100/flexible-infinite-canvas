# React-Infinite-Canvas

An Infinite Canvas Component for React where you can place your component anywhere on the canvas with zoom in, zoom out and panning functionality. It also supports custom components to control the canvas.

![Screen Recording 2024-04-17 at 12 25 16 PM](https://github.com/KarthikAravindR/infinite-canvas/assets/41736896/33c9a983-0b8c-4740-95ab-4172fa9cfe55)

### Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)

## Installation

```sh
npm install react-infinite-canvas
```

## Usage

StackBlitz Example: https://stackblitz.com/edit/react-infinite-canvas-workflow?file=src/App.tsx&terminal=dev

```jsx
import { useRef } from "react";
import { ReactInfiniteCanvas, ReactInfiniteCanvasHandle } from "react-infinite-canvas";

import { COMPONENT_POSITIONS } from "./helpers/constants";
import ReactDOM from "react-dom";

const InfiniteCanvas = () => {
  const canvasRef = useRef<ReactInfiniteCanvasHandle>();
  return (
    <>
      <div style={{ width: "700px", height: "400px", border: "1px solid red" }}>
        <ReactInfiniteCanvas
          ref={canvasRef}
          onCanvasMount={(mountFunc: ReactInfiniteCanvasHandle) => {
            mountFunc.fitContentToView({ scale: 1 });
          }}
          customComponents={[
            {
              component: (
                <button
                  onClick={() => {
                    canvasRef.current?.fitContentToView({ scale: 1 });
                  }}
                >
                  fitToView
                </button>
              ),
              position: COMPONENT_POSITIONS.TOP_LEFT,
              offset: { x: 120, y: 10 },
            },
          ]}
        >
          <div style={{ width: "200px", height: "200px", background: "red" }}>
            asdasdsdas
          </div>
        </ReactInfiniteCanvas>
      </div>
    </>
  );
};

ReactDOM.render(<InfiniteCanvas />, document.getElementById("root"));
```

## API

| Property         | Type      | Default                                                                                                                            | Description                                                             |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| children         | ReactNode | -                                                                                                                                  | Element to be placed inside the canvas                                  |
| minZoom          | number    | 0.1                                                                                                                                | minimum limit for zooming                                               |
| maxZoom          | number    | 4                                                                                                                                  | maximum limit for zooming                                               |
| panOnScroll      | boolean   | true                                                                                                                               | when user scrolls in canvas, instead of zooming, the content scrolls    |
| panConfig        | object    | { button: MOUSE_BUTTONS.LEFT }                                                                                                     | which mouse button pans the canvas                                      |
| selectionConfig  | object    | { enabled: false, button: MOUSE_BUTTONS.LEFT, ... }                                                                                | rubber-band selection mode, see [Selection mode](#selection-mode)       |
| scrollBarConfig  | object    | { renderScrollBar: true, startingPosition: { x: 0, y: 0}, offset: { x: 0, y: 0}, color: "grey", thickness: "8px", minSize: "15px } | To style the scrollbar to your preference                               |
| customComponents | object    | -                                                                                                                                  | An array of components you can pass to render on canvas at any position |
| onCanvasMount    | function  | -                                                                                                                                  | A function that is triggered once the canvas is mounted                 |

## Selection mode

Selection mode lets users drag a rubber-band box to select items on the canvas. The pan and selection mouse buttons are configurable independently, so you can e.g. select with the left button and pan with the right one:

```jsx
import {
  ReactInfiniteCanvas,
  MOUSE_BUTTONS,
  SELECTION_CLASSES,
} from "react-infinite-canvas";

<ReactInfiniteCanvas
  panConfig={{ button: MOUSE_BUTTONS.RIGHT }}
  selectionConfig={{
    enabled: true,
    button: MOUSE_BUTTONS.LEFT,
    onSelectionEnd: ({ canvas, screen, selectedElements }) => {
      // canvas: selection rect in canvas/content coordinates
      // screen: selection rect in viewport pixels
      console.log(canvas.x, canvas.y, canvas.width, canvas.height);
      console.log(selectedElements);
    },
  }}
>
  <div>
    {/* mark items as selectable */}
    <div className={SELECTION_CLASSES.SELECTABLE}>item</div>
  </div>
</ReactInfiniteCanvas>
```

`selectionConfig` options:

| Option                | Type     | Default                                    | Description                                                          |
| --------------------- | -------- | ------------------------------------------ | -------------------------------------------------------------------- |
| enabled               | boolean  | false                                      | enables selection mode                                               |
| button                | number   | MOUSE_BUTTONS.LEFT                         | mouse button that draws the selection box                            |
| selectableSelector    | string   | ".react-infinite-canvas-selectable"        | CSS selector that identifies selectable items                        |
| selectedClassName     | string   | "react-infinite-canvas-selected"           | class applied to items intersecting the selection box                |
| selectionBoxClassName | string   | -                                          | extra class for the rubber-band box, to override its default styling |
| onSelectionStart      | function | -                                          | called with `{ screen, canvas, selectedElements }` when a selection starts |
| onSelectionChange     | function | -                                          | called with `{ screen, canvas, selectedElements }` while dragging    |
| onSelectionEnd        | function | -                                          | called with `{ screen, canvas, selectedElements }` on mouse release  |

Both rects are `{ x, y, width, height }`: `screen` is relative to the canvas viewport in pixels, `canvas` is in content coordinates (pan and zoom applied), so it stays stable regardless of the current transform.

If pan and selection are configured to the same button while selection is enabled, selection wins and panning is only available via scrolling or touch.

## Blocking canvas events

Wrap parts of your content in `EventBlocker` to stop the canvas from hijacking scroll, zoom, or pan/click gestures over that element (useful for embedded editors, scrollable lists, etc.). Blocked elements also get a normal cursor and text selection back:

```jsx
import { EventBlocker } from "react-infinite-canvas";

<EventBlocker shouldBlockScroll shouldBlockZoom shouldBlockPan>
  <MyTextEditor />
</EventBlocker>
```
