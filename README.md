# React-Infinite-Canvas

An Infinite Canvas Component for React where you can place your component anywhere on the canvas with zoom in, zoom out and panning functionality. It also supports custom components to control the canvas.

![Screen Recording 2024-04-17 at 12 25 16 PM](https://github.com/KarthikAravindR/infinite-canvas/assets/41736896/33c9a983-0b8c-4740-95ab-4172fa9cfe55)

### Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Dragging and nesting](#dragging-and-nesting)

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
| dragConfig       | object    | { enabled: false, button: MOUSE_BUTTONS.LEFT, ... }                                                                                | item dragging and optional nesting, see [Dragging and nesting](#dragging-and-nesting) |
| previewMode      | boolean   | false                                                                                                                              | makes the canvas non-interactive (no pan/zoom/scroll/selection), hides custom components and the scrollbar, and zooms out so the whole content fits in one view |
| onDoubleClick    | function  | -                                                                                                                                  | `(event, position) => void`, fired on double click with the native event and the position in canvas coordinates; providing it disables double-click-to-zoom |
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
    clickableSelector: ".node-select-handle",
    multiSelectKey: "Shift",
    onSelectionEnd: ({ canvas, screen, selectedElements }) => {
      // canvas: selection rect in canvas/content coordinates
      // screen: selection rect in viewport pixels
      console.log(canvas.x, canvas.y, canvas.width, canvas.height);
      console.log(selectedElements);
    },
  }}
>
  <div>
    {/* Only this bar click-selects the item; other controls stay interactive. */}
    <div className={SELECTION_CLASSES.SELECTABLE}>
      <div className="node-select-handle">item</div>
      <button onClick={openItem}>Open</button>
    </div>
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
| clickableSelector     | string   | -                                          | parts that click-select their closest selectable item                |
| multiSelectKey        | "Alt", "Control", "Meta", or "Shift" | "Shift" | modifier that toggles items while click-selecting |
| selectionBoxClassName | string   | -                                          | extra class for the rubber-band box, to override its default styling |
| onSelectionStart      | function | -                                          | called with `{ screen, canvas, selectedElements }` when a selection starts |
| onSelectionChange     | function | -                                          | called with `{ screen, canvas, selectedElements }` while dragging    |
| onSelectionEnd        | function | -                                          | called with `{ screen, canvas, selectedElements }` on mouse release  |

Both rects are `{ x, y, width, height }`: `screen` is relative to the canvas viewport in pixels, `canvas` is in content coordinates (pan and zoom applied), so it stays stable regardless of the current transform.

Rubber-band selection starts from blank canvas space. Setting `clickableSelector` enables click selection only from the matching part of an item; holding `multiSelectKey` while clicking toggles each item, so users can build a selection one item at a time. Other parts of selectable items are not intercepted and continue to honor their normal click and `EventBlocker` behavior.

If pan and selection are configured to the same button while selection is enabled, selection wins and panning is only available via scrolling or touch.

## Dragging and nesting

Dragging is opt-in. Mark draggable items, optionally add a handle, and configure `dragConfig`. The canvas moves items with the CSS `translate` property, so their regular `transform` remains intact. `onDragEnd` receives the canvas-space delta so your application can persist the new positions in React state. Handle presses remain ordinary clicks; dragging takes over only after the pointer passes the configured movement threshold.

When the item grabbed is selected, every selected draggable item moves together. Selection and dragging commonly share the same selected class. A draggable gesture takes precedence over canvas pan or rubber-band selection, even when they use the same mouse button.

```jsx
import {
  DRAG_CLASSES,
  MOUSE_BUTTONS,
  ReactInfiniteCanvas,
  SELECTION_CLASSES,
} from "react-infinite-canvas";

<ReactInfiniteCanvas
  // Keep the canvas pan available on the right button.
  panConfig={{ button: MOUSE_BUTTONS.RIGHT }}
  selectionConfig={{ enabled: true }}
  dragConfig={{
    enabled: true,
    // Defaults shown explicitly; both values can be any CSS selector.
    draggableSelector: `.${DRAG_CLASSES.DRAGGABLE}`,
    dragHandleSelector: ".card-handle",
    dragStartThreshold: 3,
    // Omit this for a temporary top layer while dragging. A number (or a
    // function) is retained after drop, allowing your app to manage stacking.
    zIndex: 100,
    nesting: {
      droppableSelector: `.${DRAG_CLASSES.DROPPABLE}`,
      dropTargetClassName: "card-drop-target",
      onDrop: ({ draggedElements, dropTarget }) => {
        // Update your data model; React remains the owner of DOM hierarchy.
        moveCardsIntoGroup(draggedElements, dropTarget);
      },
    },
    onDragEnd: ({ draggedElements, delta, dropTarget }) => {
      // delta is unaffected by the current pan/zoom level.
      persistCardPositions(draggedElements, delta);
      console.log("dropped into", dropTarget);
    },
  }}
>
  <div>
    <article
      className={`${DRAG_CLASSES.DRAGGABLE} ${SELECTION_CLASSES.SELECTABLE}`}
      style={{ position: "absolute", left: 100, top: 80 }}
    >
      <button className="card-handle">Move</button>
      Card A
    </article>
    <section className={DRAG_CLASSES.DROPPABLE}>A group</section>
  </div>
</ReactInfiniteCanvas>
```

`dragConfig` options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| enabled | boolean | false | enables item dragging |
| button | number | `MOUSE_BUTTONS.LEFT` | mouse button that starts a drag |
| dragStartThreshold | number | 3 | pointer movement in screen pixels required before drag behavior begins; clicks below this threshold keep their normal action |
| draggableSelector | string | `.react-infinite-canvas-draggable` | identifies draggable components |
| dragHandleSelector | string | - | optional selector for a handle inside each draggable component |
| selectedClassName | string | `selectionConfig.selectedClassName`, or `.react-infinite-canvas-selected` | selected items move together when dragging one of them |
| draggingClassName | string | `.react-infinite-canvas-dragging` | applied to every item while it is being dragged |
| zIndex | false, number, or function | temporary top layer | `false` preserves existing stacking; a number or `(element, index, draggedElements) => number` sets and retains the z-index for each dragged item |
| nesting | boolean or object | false | enables drop-target detection; `true` uses the default droppable selector |
| onDragStart / onDrag / onDragEnd | function | - | receive `{ sourceElement, draggedElements, dropTarget, position, delta, screenDelta }` |

`nesting` accepts `{ enabled, droppableSelector, dropTargetClassName, onDrop }`. Its default droppable selector is `.react-infinite-canvas-droppable`, and its hover class is `.react-infinite-canvas-drop-target`. `onDrop` runs only when a valid target is found; both it and `onDragEnd` return one `dropTarget` plus the full `draggedElements` array, so dropping many components into one target is handled directly.

When a handle selector is set, only matching handles can start a drag. Other content inside a draggable item is left untouched: normal clicks, selection, canvas panning, and any `EventBlocker` configuration continue to work as before.

For large canvases, selector queries happen only at drag start. Pointer-move work is batched to one animation-frame update, and nesting hit-testing runs only when nesting is enabled.

## Blocking canvas events

Wrap parts of your content in `EventBlocker` to stop the canvas from hijacking scroll, zoom, or pan/click gestures over that element (useful for embedded editors, scrollable lists, etc.). Blocked elements also get a normal cursor and text selection back:

```jsx
import { EventBlocker } from "react-infinite-canvas";

<EventBlocker shouldBlockScroll shouldBlockZoom shouldBlockPan>
  <MyTextEditor />
</EventBlocker>
```

Scroll blocking is decided per gesture, not per event: if a canvas scroll is already in progress when the cursor passes over a blocked item, the canvas keeps scrolling; only a scroll gesture that *starts* over a blocked item is blocked (and stays blocked for that gesture even if the cursor leaves the item).
