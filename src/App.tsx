import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useRef,
  type JSX
} from "react";
import { pointer, select, type Selection } from "d3-selection";
import { zoom, zoomIdentity, type ZoomBehavior } from "d3-zoom";

import {
  Background,
  type BackgroundProps
} from "./components/Background/background";
import {
  ZOOM_CONFIGS,
  SCROLL_NODE_POSITIONS,
  COMPONENT_POSITIONS,
  MOUSE_BUTTONS,
  SELECTION_CLASSES,
  DRAG_CLASSES
} from "./helpers/constants";
import {
  clampValue,
  getContentBounds,
  getUpdatedNodePosition,
  isSafari,
  scheduleIdleTask,
  shouldBlockEvent,
  shouldBlockPanEvent
} from "./helpers/utils";

import styles from "./App.module.css";
import { ScrollBar } from "./components/ScrollBar/scrollbar";

const TIME_TO_WAIT = isSafari ? 600 : 300;

export interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SelectionEventData {
  /** selection rect relative to the canvas viewport, in screen pixels */
  screen: SelectionRect;
  /** selection rect in canvas/content coordinates (zoom & pan applied) */
  canvas: SelectionRect;
  selectedElements: HTMLElement[];
}

export interface PanConfig {
  /** mouse button that pans the canvas (see MOUSE_BUTTONS), defaults to left */
  button?: number;
}

export type SelectionMultiSelectKey = "Alt" | "Control" | "Meta" | "Shift";

export interface SelectionConfig {
  enabled?: boolean;
  /** mouse button that draws the selection (see MOUSE_BUTTONS), defaults to left */
  button?: number;
  /** CSS selector identifying selectable items, defaults to `.react-infinite-canvas-selectable` */
  selectableSelector?: string;
  /** class applied to selected items, defaults to `react-infinite-canvas-selected` */
  selectedClassName?: string;
  /**
   * CSS selector identifying the parts that may click-select their closest
   * selectable item. Without it, selectable item content is left untouched.
   */
  clickableSelector?: string;
  /** modifier held while click-selecting to toggle items, defaults to Shift */
  multiSelectKey?: SelectionMultiSelectKey;
  /** extra class for the rubber-band selection box */
  selectionBoxClassName?: string;
  onSelectionStart?: (data: SelectionEventData) => void;
  onSelectionChange?: (data: SelectionEventData) => void;
  onSelectionEnd?: (data: SelectionEventData) => void;
}

export interface DragEventData {
  /** draggable item on which the drag began */
  sourceElement: HTMLElement;
  /** every item moved as part of this drag */
  draggedElements: HTMLElement[];
  /** nesting target under the pointer, or null when there is none */
  dropTarget: HTMLElement | null;
  /** pointer position in canvas/content coordinates */
  position: { x: number; y: number };
  /** movement from the drag start in canvas/content coordinates */
  delta: { x: number; y: number };
  /** movement from the drag start in viewport pixels */
  screenDelta: { x: number; y: number };
}

export interface NestingConfig {
  enabled?: boolean;
  /** CSS selector identifying valid nesting targets, defaults to `.react-infinite-canvas-droppable` */
  droppableSelector?: string;
  /** class applied to the nesting target while it is under the dragged item */
  dropTargetClassName?: string;
  /** called on a successful drop; use this to update your React data hierarchy */
  onDrop?: (data: DragEventData) => void;
}

export interface DragConfig {
  enabled?: boolean;
  /** mouse button that starts a drag (see MOUSE_BUTTONS), defaults to left */
  button?: number;
  /** pointer movement in screen pixels required before a drag starts, defaults to 3 */
  dragStartThreshold?: number;
  /** CSS selector identifying draggable items, defaults to `.react-infinite-canvas-draggable` */
  draggableSelector?: string;
  /** optional selector identifying a drag handle inside a draggable item */
  dragHandleSelector?: string;
  /** selected class used to identify the other items moved with a selected source */
  selectedClassName?: string;
  /** class applied to every item while it is being dragged */
  draggingClassName?: string;
  /**
   * z-index while dragging. Omit for a temporary top layer, set false to
   * preserve stacking, or provide a number/function to persist custom values.
   */
  zIndex?:
    | false
    | number
    | ((
        element: HTMLElement,
        index: number,
        draggedElements: HTMLElement[]
      ) => number);
  /** enables and configures nesting targets; `true` uses the default selector */
  nesting?: boolean | NestingConfig;
  onDragStart?: (data: DragEventData) => void;
  onDrag?: (data: DragEventData) => void;
  onDragEnd?: (data: DragEventData) => void;
}

export interface ReactInfiniteCanvasProps {
  children: JSX.Element;
  className?: string;
  ref?: React.ForwardedRef<ReactInfiniteCanvasHandle>;
  minZoom?: number;
  maxZoom?: number;
  panOnScroll?: boolean;
  panConfig?: PanConfig;
  selectionConfig?: SelectionConfig;
  dragConfig?: DragConfig;
  /**
   * puts the canvas in a non-interactive mode (no pan/zoom/scroll/selection)
   * and zooms out so the whole content is visible in one view
   */
  previewMode?: boolean;
  /**
   * fired on double click with the native event and the click position in
   * canvas/content coordinates; providing it disables the default
   * double-click-to-zoom behavior
   */
  onDoubleClick?: (
    event: MouseEvent,
    position: { x: number; y: number }
  ) => void;
  scrollBarConfig?: {
    renderScrollBar?: boolean;
    startingPosition?: {
      x: number;
      y: number;
    };
    offset?: {
      x: number;
      y: number;
    };
    color?: string;
    thickness?: string;
    minSize?: string;
  };
  backgroundConfig?: BackgroundProps;
  customComponents?: Array<{
    component: JSX.Element;
    position?: string;
    offset?: { x: number; y: number };
    overlap?: boolean;
    className?: string;
  }>;
  onCanvasMount?: (functions: ReactInfiniteCanvasHandle) => void;
  onZoom?: (event: Event) => void;
}

export interface CanvasState {
  canvasNode: Selection<
    SVGSVGElement | HTMLDivElement | null,
    unknown,
    null,
    undefined
  >;
  zoomNode: Selection<
    SVGGElement | HTMLDivElement | null,
    unknown,
    null,
    undefined
  >;
  currentPosition: { k: number; x: number; y: number };
  d3Zoom: ZoomBehavior<HTMLDivElement | SVGAElement, unknown>;
}

export type ReactInfiniteCanvasHandle = {
  scrollNodeToCenter: ({
    nodeElement,
    offset,
    scale,
    shouldUpdateMaxScale,
    maxScale,
    transitionDuration
  }: {
    nodeElement?: HTMLElement;
    offset?: { x: number; y: number };
    scale?: number;
    shouldUpdateMaxScale?: boolean;
    maxScale?: number;
    transitionDuration?: number;
  }) => void;
  scrollNodeHandler: ({
    nodeElement,
    offset,
    scale,
    shouldUpdateMaxScale,
    maxScale,
    transitionDuration,
    position
  }: {
    nodeElement?: HTMLElement;
    offset?: { x: number; y: number };
    scale?: number;
    shouldUpdateMaxScale?: boolean;
    maxScale?: number;
    transitionDuration?: number;
    position?: string;
  }) => void;
  scrollContentHorizontallyCenter: ({
    offset,
    transitionDuration
  }: {
    offset?: number;
    transitionDuration?: number;
  }) => void;
  fitContentToView: ({
    duration,
    offset,
    scale,
    maxZoomLimit
  }: {
    duration?: number;
    offset?: { x: number; y: number };
    scale?: number;
    maxZoomLimit?: number;
  }) => void;
  getCanvasState: () => CanvasState;
};

interface ReactInfiniteCanvasRendererProps extends ReactInfiniteCanvasProps {
  children: React.ReactElement<object, string>;
  innerRef: React.ForwardedRef<ReactInfiniteCanvasHandle>;
}

export const ReactInfiniteCanvas: React.FC<ReactInfiniteCanvasProps> =
  forwardRef<ReactInfiniteCanvasHandle, ReactInfiniteCanvasProps>(
    ({ children, ...restProps }, ref) => {
      const wrapperRef = React.useRef<HTMLDivElement>(null);
      return (
        <ReactInfiniteCanvasRenderer innerRef={ref} {...restProps}>
          <div
            ref={wrapperRef}
            style={{ width: "max-content", height: "max-content" }}
          >
            {children}
          </div>
        </ReactInfiniteCanvasRenderer>
      );
    }
  );

const ReactInfiniteCanvasRenderer = memo(
  ({
    children,
    className = "",
    innerRef: ref,
    minZoom = ZOOM_CONFIGS.DEFAULT_MIN_ZOOM,
    maxZoom = ZOOM_CONFIGS.DEFAULT_MAX_ZOOM,
    panOnScroll = true,
    panConfig = {},
    selectionConfig = {},
    dragConfig = {},
    previewMode = false,
    onDoubleClick,
    customComponents = [],
    scrollBarConfig = {},
    backgroundConfig = {},
    onCanvasMount = () => {}
  }: ReactInfiniteCanvasRendererProps) => {
    const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
    const canvasWrapperBounds = useRef<DOMRect | null>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const canvasRef = useRef<any>(null);
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const zoomContainerRef = useRef<any>(null);
    const scrollBarRef = useRef<{
      onScrollDeltaChangeHandler: (scrollDelta: {
        deltaX: number;
        deltaY: number;
      }) => void;
      resetScrollPos: () => void;
    }>(null);
    const flowRendererRef = (
      children as React.ReactElement & { ref: React.RefObject<HTMLElement> }
    ).ref;
    const isUserPressed = useRef<boolean | null>(null);

    const panButton = panConfig.button ?? MOUSE_BUTTONS.LEFT;
    const selectionEnabled = selectionConfig.enabled ?? false;
    const selectionButton = selectionConfig.button ?? MOUSE_BUTTONS.LEFT;
    const dragEnabled = dragConfig.enabled ?? false;
    const dragButton = dragConfig.button ?? MOUSE_BUTTONS.LEFT;

    // the zoom behavior is wired up in a mount-only effect, so the latest
    // interaction settings are read through a ref to avoid stale closures
    const interactionConfigRef = useRef({
      panButton,
      selectionEnabled,
      selectionButton,
      dragEnabled,
      dragButton,
      previewMode,
      hasDoubleClickHandler: Boolean(onDoubleClick)
    });
    interactionConfigRef.current = {
      panButton,
      selectionEnabled,
      selectionButton,
      dragEnabled,
      dragButton,
      previewMode,
      hasDoubleClickHandler: Boolean(onDoubleClick)
    };
    const selectionConfigRef = useRef(selectionConfig);
    selectionConfigRef.current = selectionConfig;
    const dragConfigRef = useRef(dragConfig);
    dragConfigRef.current = dragConfig;

    // one wheel gesture keeps the blocked/unblocked decision it started with
    const wheelGestureRef = useRef<{
      lastTime: number;
      blocked: boolean;
    } | null>(null);

    const selectionBoxRef = useRef<HTMLDivElement | null>(null);
    const selectionStateRef = useRef<{
      startX: number;
      startY: number;
      wrapperBounds: DOMRect;
    } | null>(null);
    const dragStateRef = useRef<{
      sourceElement: HTMLElement;
      draggedElements: HTMLElement[];
      startClientX: number;
      startClientY: number;
      dragStartThreshold: number;
      isDragging: boolean;
      startTranslations: Map<HTMLElement, { x: number; y: number }>;
      startZIndexes: Map<HTMLElement, string>;
      shouldRestoreZIndex: boolean;
      dropTarget: HTMLElement | null;
      draggingClassName: string;
      dropTargetClassName: string;
      animationFrame: number | null;
      latestEvent: MouseEvent | null;
    } | null>(null);

    const d3Zoom = useMemo(() => {
      return zoom<SVGAElement | HTMLDivElement, unknown>().scaleExtent([
        minZoom,
        maxZoom
      ]);
    }, [maxZoom, minZoom]);
    const d3Selection = useRef(select(canvasRef.current).call(d3Zoom));

    const [zoomTransform, setZoomTransform] = useState({
      translateX: 0,
      translateY: 0,
      scale: 1
    });

    useImperativeHandle(ref, () => ({
      scrollNodeToCenter: ({
        nodeElement,
        offset,
        scale,
        shouldUpdateMaxScale,
        maxScale,
        transitionDuration
      }: {
        nodeElement?: HTMLElement | undefined;
        offset?: { x: number; y: number };
        scale?: number;
        shouldUpdateMaxScale?: boolean;
        maxScale?: number;
        transitionDuration?: number;
      }) =>
        scrollNodeHandler({
          nodeElement,
          offset,
          scale,
          shouldUpdateMaxScale,
          maxScale,
          transitionDuration,
          position: SCROLL_NODE_POSITIONS.CENTER_CENTER
        }),
      scrollNodeHandler,
      scrollContentHorizontallyCenter,
      fitContentToView,
      getCanvasState
    }));

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(function zoomAndPanHandler() {
      d3Selection.current = select(canvasRef.current).call(d3Zoom);
      const zoomNode = select(zoomContainerRef.current);
      canvasWrapperBounds.current = canvasWrapperRef.current
        ? canvasWrapperRef.current.getBoundingClientRect()
        : null;

      d3Zoom
        .filter(
          (event: {
            type: string;
            ctrlKey: boolean;
            button?: number;
            target?: EventTarget;
          }) => {
            const {
              panButton,
              selectionEnabled,
              selectionButton,
              previewMode,
              hasDoubleClickHandler
            } = interactionConfigRef.current;
            if (previewMode) return false;

            // never let d3 capture gestures that start on pan-blocked
            // elements, otherwise it swallows the mousedown (breaking
            // clicks/caret placement in embedded editors)
            const target = event.target as HTMLElement | null;
            if (target && shouldBlockPanEvent({ target })) return false;

            if (event.type === "wheel") return event.ctrlKey;

            // a consumer double-click handler replaces double-click-to-zoom
            if (event.type === "dblclick" && hasDoubleClickHandler)
              return false;

            if (event.type === "mousedown" || event.type === "dblclick") {
              const button = event.button ?? MOUSE_BUTTONS.LEFT;
              if (
                event.type === "mousedown" &&
                interactionConfigRef.current.dragEnabled &&
                button === interactionConfigRef.current.dragButton &&
                getDraggableElement(event.target ?? null)
              ) {
                return false;
              }
              if (
                selectionEnabled &&
                button === selectionButton &&
                shouldHandleSelectionMouseDown(event.target ?? null)
              ) {
                return false;
              }
              if (button !== panButton) return false;
            }

            if (event.type === "mousedown" && !isUserPressed.current) {
              isUserPressed.current = true;
              onMouseDown();
            }

            return true;
          }
        )
        .on(
          "zoom",
          (event: {
            sourceEvent: { ctrlKey: boolean };
            type: string;
            transform: { k: number; x: number; y: number };
          }) => {
            if (event.sourceEvent?.ctrlKey === false && event.type === "zoom") {
              canvasWrapperRef.current?.classList.add(styles.panning);
            }

            const zoomTransform = event.transform;
            const { x: translateX, y: translateY, k: scale } = zoomTransform;
            const div = zoomContainerRef.current;
            setZoomTransform({ translateX, translateY, scale });
            if (isSafari && div) {
              // translate3d keeps the layer GPU-composited on Safari
              div.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
            } else {
              zoomNode.attr(
                "transform",
                `translate(${translateX},${translateY}) scale(${scale})`
              );
            }
          }
        );

      d3Zoom.on("end", () => {
        isUserPressed.current = false;
        canvasWrapperRef.current?.classList.remove(styles.panning);
      });

      onCanvasMount({
        scrollNodeToCenter: ({
          nodeElement,
          offset,
          scale,
          shouldUpdateMaxScale,
          maxScale,
          transitionDuration
        }: {
          nodeElement?: HTMLElement;
          offset?: { x: number; y: number };
          scale?: number;
          shouldUpdateMaxScale?: boolean;
          maxScale?: number;
          transitionDuration?: number;
        }) =>
          scrollNodeHandler({
            nodeElement,
            offset,
            scale,
            shouldUpdateMaxScale,
            maxScale,
            transitionDuration,
            position: SCROLL_NODE_POSITIONS.CENTER_CENTER
          }),
        scrollNodeHandler,
        scrollContentHorizontallyCenter,
        fitContentToView,
        getCanvasState
      });
    }, []);

    d3Selection.current
      .call(zoom)
      // Override the default wheel event listener
      .on(
        "wheel.zoom",
        (event: {
          preventDefault: () => void;
          ctrlKey: boolean;
          metaKey: boolean;
          deltaY: number;
          deltaX: number;
          timeStamp: number;
          target: EventTarget;
        }) => {
          if (previewMode) return;

          // wheel events close together form one gesture; the gesture keeps
          // the blocked/unblocked decision it started with, so a canvas
          // scroll continues over event-blocker items and a scroll started
          // over one stays blocked even if the cursor leaves it
          const gesture = wheelGestureRef.current;
          const isContinuation =
            gesture !== null &&
            event.timeStamp - gesture.lastTime <
              ZOOM_CONFIGS.WHEEL_GESTURE_TIMEOUT;
          const isBlocked = isContinuation
            ? gesture.blocked
            : shouldBlockEvent({
                ...event,
                target: event.target as HTMLElement
              });
          wheelGestureRef.current = {
            lastTime: event.timeStamp,
            blocked: isBlocked
          };
          if (isBlocked) {
            return;
          }
          event.preventDefault();

          const currentZoom = d3Selection.current.property("__zoom").k || 1;

          if (panOnScroll && !event.ctrlKey) {
            const scrollDeltaValue = {
              deltaX: event.deltaX,
              deltaY: event.deltaY
            };
            scrollBarRef.current?.onScrollDeltaChangeHandler(scrollDeltaValue);
            onScrollDeltaHandler(scrollDeltaValue);
          } else {
            const nextZoom = currentZoom * 2 ** (-event.deltaY * 0.01);
            const selection = d3Selection.current;
            if (selection) {
              d3Zoom.scaleTo(
                selection as Selection<
                  SVGAElement | HTMLDivElement,
                  unknown,
                  null,
                  undefined
                >,
                nextZoom,
                pointer(event)
              );
            }
          }
        },
        { passive: false, capture: true }
      );

    const onScrollDeltaHandler = (scrollDelta: {
      deltaX: number;
      deltaY: number;
    }) => {
      const currentZoom = d3Selection.current.property("__zoom").k || 1;
      const selection = d3Selection.current;
      if (selection) {
        d3Zoom.translateBy(
          selection as Selection<
            SVGAElement | HTMLDivElement,
            unknown,
            null,
            undefined
          >,
          -(scrollDelta.deltaX / currentZoom),
          -(scrollDelta.deltaY / currentZoom)
        );
      }
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const fitContentToView = useCallback(
      function fitContentHandler({
        duration = 500,
        offset = { x: 0, y: 0 },
        scale,
        maxZoomLimit = ZOOM_CONFIGS.FIT_TO_VIEW_MAX_ZOOM,
        disableVerticalCenter = false
      }: {
        duration?: number;
        offset?: { x: number; y: number };
        scale?: number;
        maxZoomLimit?: number;
        disableVerticalCenter?: boolean;
      }) {
        scheduleIdleTask(
          () => {
            if (!flowRendererRef.current) return;
            const canvasNode = select(canvasRef.current);
            const contentBounds = getContentBounds(flowRendererRef.current);
            const zoomLevel = d3Selection.current.property("__zoom") ?? {};
            const { x: currentTranslateX = 0, y: currentTranslateY = 0 } =
              zoomLevel;
            const currentZoom = zoomLevel.k || 1;
            const containerBounds = canvasRef.current?.getBoundingClientRect();
            const { width: containerWidth = 0, height: containerHeight = 0 } =
              containerBounds || {};
            const scaleDiff = 1 / currentZoom;
            const contentWidth = contentBounds.width * scaleDiff;
            const contentHeight = contentBounds.height * scaleDiff;
            // content origin in canvas coordinates; not necessarily (0,0)
            // since items can sit at negative positions
            const contentX =
              (contentBounds.left -
                (containerBounds?.left ?? 0) -
                currentTranslateX) *
              scaleDiff;
            const contentY =
              (contentBounds.top -
                (containerBounds?.top ?? 0) -
                currentTranslateY) *
              scaleDiff;
            const heightRatio = containerHeight / contentHeight;
            const widthRatio = containerWidth / contentWidth;

            const newScale =
              scale ??
              clampValue({
                value: Math.min(
                  maxZoomLimit,
                  Math.min(heightRatio, widthRatio)
                ),
                min: minZoom,
                max: maxZoom
              });

            // below code calculates the translateX and translateY values to
            // center the content horizontally and if disableVerticalCenter is false center the content vertically
            const newWidth = containerWidth - contentWidth * newScale;
            const newHeight = containerHeight - contentHeight * newScale;

            const canCenterVertically =
              !disableVerticalCenter && heightRatio > widthRatio;

            // shift by the content origin so items at negative coordinates
            // end up inside the view as well
            const baseTranslateX = newWidth / 2 - contentX * newScale;
            const baseTranslateY =
              (canCenterVertically ? newHeight / 2 : 0) - contentY * newScale;

            const translateX = baseTranslateX + offset.x;
            const translateY = baseTranslateY + offset.y;

            const newTransform = zoomIdentity
              .translate(translateX, translateY)
              .scale(newScale);
            setZoomTransform({ translateX, translateY, scale: newScale });
            scrollBarRef.current?.resetScrollPos();

            canvasNode
              .transition()
              .duration(duration)
              .call(d3Zoom.transform, newTransform);
          },
          { timeout: TIME_TO_WAIT }
        );
      },
      [maxZoom, minZoom]
    );

    useEffect(
      function previewModeHandler() {
        if (previewMode) {
          fitContentToView({});
        }
      },
      [previewMode, fitContentToView]
    );

    const scrollNodeHandler = ({
      nodeElement,
      offset = { x: 0, y: 0 },
      scale,
      shouldUpdateMaxScale = true,
      maxScale,
      transitionDuration = 300,
      position = SCROLL_NODE_POSITIONS.TOP_CENTER
    }: {
      nodeElement?: HTMLElement;
      offset?: { x: number; y: number };
      scale?: number;
      shouldUpdateMaxScale?: boolean;
      maxScale?: number;
      transitionDuration?: number;
      position?: string;
    }) => {
      scheduleIdleTask(
        () => {
          if (!nodeElement) return;
          const zoomLevel = d3Selection.current.property("__zoom");
          const {
            k: currentScale,
            x: currentTranslateX,
            y: currentTranslateY
          } = zoomLevel;
          const canvasNode = select(canvasRef.current);

          const getUpdatedScale = () => {
            const getClampedScale = (scale: number) => {
              if (!maxScale) return scale;
              return Math.min(maxScale, scale);
            };

            if (!scale) return getClampedScale(currentScale);
            let updatedScale = scale;
            if (shouldUpdateMaxScale) {
              updatedScale = Math.max(scale, currentScale);
            }
            return getClampedScale(updatedScale);
          };

          const updatedScale = getUpdatedScale();

          // calculating svgBounds again because its width might be different if rightPanel is opened
          const svgBounds = canvasRef.current.getBoundingClientRect();
          const nodeBounds = nodeElement.getBoundingClientRect();
          const { updatedX, updatedY } = getUpdatedNodePosition({
            position,
            svgBounds,
            nodeBounds,
            currentTranslateX,
            currentTranslateY,
            currentScale,
            updatedScale,
            customOffset: { x: offset.x, y: offset.y }
          });

          const newTransform = zoomIdentity
            .translate(updatedX, updatedY)
            .scale(updatedScale);

          canvasNode
            // @ts-ignore
            .transition()
            .duration(transitionDuration)
            .call(d3Zoom.transform, newTransform);
        },
        { timeout: TIME_TO_WAIT }
      );
    };

    const scrollContentHorizontallyCenter = ({
      offset = 0,
      transitionDuration = 300
    }: {
      offset?: number;
      transitionDuration?: number;
    }) => {
      if (!flowRendererRef.current) return;
      scheduleIdleTask(
        () => {
          const zoomLevel = d3Selection.current.property("__zoom");
          const { k: scale, y: translateY } = zoomLevel;
          const canvasNode = select(canvasRef.current);

          // calculating svgBounds again because its width might be different if rightPanel is opened
          const svgBounds = canvasRef.current.getBoundingClientRect();
          const nodeBounds = flowRendererRef.current.getBoundingClientRect();
          const scaleDiff = 1 / scale;
          const nodeBoundsWidth = nodeBounds.width * scaleDiff;

          const updatedX =
            (svgBounds.width - nodeBoundsWidth * scale) / 2 + offset;

          setZoomTransform({
            ...zoomTransform,
            translateX: updatedX
          });

          const newTransform = zoomIdentity
            .translate(updatedX, translateY)
            .scale(scale);

          canvasNode
            // @ts-ignore
            .transition()
            .duration(transitionDuration)
            .call(d3Zoom.transform, newTransform);
        },
        { timeout: TIME_TO_WAIT }
      );
    };

    const getCanvasState = () => {
      return {
        canvasNode: select(canvasRef.current),
        zoomNode: select(zoomContainerRef.current),
        currentPosition: d3Selection.current.property("__zoom"),
        d3Zoom
      };
    };

    const onMouseDown = () => {
      const bodyElement = document.body;

      if (bodyElement) {
        const mouseDownEvent = new MouseEvent("mousedown", {
          bubbles: true,
          cancelable: true,
          view: window
        });

        // Dispatch the mousedown event on the body element
        bodyElement.dispatchEvent(mouseDownEvent);
      }
    };

    const getContainerOffset = useCallback(function offsetHandler(
      isVertical = true
    ) {
      const bounds = canvasWrapperBounds.current;
      return isVertical ? (bounds?.top ?? 0) : (bounds?.left ?? 0);
    }, []);

    const getSelectableElements = useCallback(() => {
      const selector =
        selectionConfigRef.current.selectableSelector ??
        `.${SELECTION_CLASSES.SELECTABLE}`;
      const root = flowRendererRef.current ?? canvasWrapperRef.current;
      if (!root) return [] as HTMLElement[];
      return Array.from(root.querySelectorAll<HTMLElement>(selector));
    }, [flowRendererRef]);

    const getSelectableElement = useCallback(
      (target: EventTarget | null) => {
        const selector =
          selectionConfigRef.current.selectableSelector ??
          `.${SELECTION_CLASSES.SELECTABLE}`;
        if (!(target instanceof Element)) return null;
        const element = target.closest<HTMLElement>(selector);
        const root = flowRendererRef.current ?? canvasWrapperRef.current;
        return element && root?.contains(element) ? element : null;
      },
      [flowRendererRef]
    );

    const getElementInCanvas = useCallback(
      (target: EventTarget | null, selector: string) => {
        if (!(target instanceof Element)) return null;
        const element = target.closest<HTMLElement>(selector);
        const root = flowRendererRef.current ?? canvasWrapperRef.current;
        return element && root?.contains(element) ? element : null;
      },
      [flowRendererRef]
    );

    const getClickSelectableElement = useCallback(
      (target: EventTarget | null) => {
        const clickableSelector = selectionConfigRef.current.clickableSelector;
        if (!clickableSelector) return null;
        const clickableElement = getElementInCanvas(target, clickableSelector);
        const selectableElement = getSelectableElement(target);
        return clickableElement && selectableElement?.contains(clickableElement)
          ? selectableElement
          : null;
      },
      [getElementInCanvas, getSelectableElement]
    );

    const shouldHandleSelectionMouseDown = useCallback(
      (target: EventTarget | null) =>
        !getSelectableElement(target) ||
        Boolean(getClickSelectableElement(target)),
      [getClickSelectableElement, getSelectableElement]
    );

    const getDraggableElement = useCallback(
      (target: EventTarget | null) => {
        const config = dragConfigRef.current;
        const draggable = getElementInCanvas(
          target,
          config.draggableSelector ?? `.${DRAG_CLASSES.DRAGGABLE}`
        );
        if (!draggable || !config.dragHandleSelector) return draggable;
        const handle = getElementInCanvas(target, config.dragHandleSelector);
        return handle && draggable.contains(handle) ? draggable : null;
      },
      [getElementInCanvas]
    );

    useEffect(
      function dragHandleCursorHandler() {
        if (!dragEnabled) return;
        const root = canvasWrapperRef.current;
        if (!root) return;
        const selector =
          dragConfig.dragHandleSelector ??
          dragConfig.draggableSelector ??
          `.${DRAG_CLASSES.DRAGGABLE}`;
        const handles = Array.from(
          root.querySelectorAll<HTMLElement>(selector)
        ).filter((element) => getDraggableElement(element));
        for (const handle of handles) {
          handle.classList.add(DRAG_CLASSES.HANDLE);
        }
        return () => {
          for (const handle of handles) {
            handle.classList.remove(DRAG_CLASSES.HANDLE);
          }
        };
      },
      [
        dragConfig.dragHandleSelector,
        dragConfig.draggableSelector,
        dragEnabled,
        getDraggableElement
      ]
    );

    const getNestingConfig = useCallback(() => {
      const nesting = dragConfigRef.current.nesting;
      if (!nesting) return null;
      if (nesting === true) return {} as NestingConfig;
      return nesting.enabled === false ? null : nesting;
    }, []);

    const getDropTargetAtPosition = useCallback(
      (event: MouseEvent, draggedElements: HTMLElement[]) => {
        const nesting = getNestingConfig();
        if (!nesting || !document.elementsFromPoint) return null;
        const selector =
          nesting.droppableSelector ?? `.${DRAG_CLASSES.DROPPABLE}`;
        for (const element of document.elementsFromPoint(
          event.clientX,
          event.clientY
        )) {
          const dropTarget = getElementInCanvas(element, selector);
          if (!dropTarget) continue;
          const isPartOfDrag = draggedElements.some(
            (draggedElement) =>
              draggedElement === dropTarget ||
              draggedElement.contains(dropTarget) ||
              dropTarget.contains(draggedElement)
          );
          if (!isPartOfDrag) return dropTarget;
        }
        return null;
      },
      [getElementInCanvas, getNestingConfig]
    );

    const screenToCanvasPosition = useCallback(
      (clientX: number, clientY: number) => {
        const bounds = canvasWrapperRef.current?.getBoundingClientRect();
        const {
          k = 1,
          x = 0,
          y = 0
        } = d3Selection.current.property("__zoom") ?? {};
        return {
          x: (clientX - (bounds?.left ?? 0) - x) / k,
          y: (clientY - (bounds?.top ?? 0) - y) / k
        };
      },
      []
    );

    const getInlineTranslate = (element: HTMLElement) => {
      const getTranslatePosition = (translate: string) =>
        translate.match(
          /^\s*(-?(?:\d+|\d*\.\d+)px)(?:\s+(-?(?:\d+|\d*\.\d+)px))?/
        );
      const match =
        getTranslatePosition(element.style.translate) ??
        getTranslatePosition(getComputedStyle(element).translate);
      return {
        x: match ? Number.parseFloat(match[1]) : 0,
        y: match?.[2] ? Number.parseFloat(match[2]) : 0
      };
    };

    const buildDragData = useCallback(
      (
        state: NonNullable<typeof dragStateRef.current>,
        event: MouseEvent
      ): DragEventData => {
        const screenDelta = {
          x: event.clientX - state.startClientX,
          y: event.clientY - state.startClientY
        };
        const { k = 1 } = d3Selection.current.property("__zoom") ?? {};
        return {
          sourceElement: state.sourceElement,
          draggedElements: state.draggedElements,
          dropTarget: state.dropTarget,
          position: screenToCanvasPosition(event.clientX, event.clientY),
          delta: { x: screenDelta.x / k, y: screenDelta.y / k },
          screenDelta
        };
      },
      [screenToCanvasPosition]
    );

    const applyDragPosition = useCallback(
      (event: MouseEvent) => {
        const state = dragStateRef.current;
        if (!state) return;
        const data = buildDragData(state, event);
        for (const element of state.draggedElements) {
          const startTranslate = state.startTranslations.get(element) ?? {
            x: 0,
            y: 0
          };
          element.style.translate = `${startTranslate.x + data.delta.x}px ${
            startTranslate.y + data.delta.y
          }px`;
        }

        const nextDropTarget = getDropTargetAtPosition(
          event,
          state.draggedElements
        );
        if (nextDropTarget !== state.dropTarget) {
          state.dropTarget?.classList.remove(state.dropTargetClassName);
          nextDropTarget?.classList.add(state.dropTargetClassName);
          state.dropTarget = nextDropTarget;
          data.dropTarget = nextDropTarget;
        }
        dragConfigRef.current.onDrag?.(data);
      },
      [buildDragData, getDropTargetAtPosition]
    );

    const startDrag = useCallback(
      (state: NonNullable<typeof dragStateRef.current>, event: MouseEvent) => {
        if (state.isDragging) return;
        state.isDragging = true;
        const zIndex = dragConfigRef.current.zIndex;
        state.shouldRestoreZIndex =
          zIndex === undefined || zIndex === false ? zIndex !== false : false;
        if (zIndex !== false) {
          const defaultBaseZIndex =
            2_147_483_647 - state.draggedElements.length;
          for (const [index, element] of state.draggedElements.entries()) {
            const nextZIndex =
              typeof zIndex === "function"
                ? zIndex(element, index, state.draggedElements)
                : typeof zIndex === "number"
                  ? zIndex + index
                  : defaultBaseZIndex + index;
            element.style.zIndex = String(nextZIndex);
            element.classList.add(state.draggingClassName);
          }
        } else {
          for (const element of state.draggedElements) {
            element.classList.add(state.draggingClassName);
          }
        }
        dragConfigRef.current.onDragStart?.(buildDragData(state, event));
      },
      [buildDragData]
    );

    const dragMoveHandler = useCallback(
      (event: MouseEvent) => {
        const state = dragStateRef.current;
        if (!state) return;
        if (!state.isDragging) {
          const screenDeltaX = event.clientX - state.startClientX;
          const screenDeltaY = event.clientY - state.startClientY;
          if (
            screenDeltaX * screenDeltaX + screenDeltaY * screenDeltaY <
            state.dragStartThreshold * state.dragStartThreshold
          ) {
            return;
          }
          event.preventDefault();
          startDrag(state, event);
        }
        state.latestEvent = event;
        if (state.animationFrame !== null) return;
        state.animationFrame = window.requestAnimationFrame(() => {
          const currentState = dragStateRef.current;
          if (!currentState?.latestEvent) return;
          currentState.animationFrame = null;
          applyDragPosition(currentState.latestEvent);
        });
      },
      [applyDragPosition, startDrag]
    );

    const dragEndHandler = useCallback(
      (event: MouseEvent) => {
        const state = dragStateRef.current;
        if (!state) return;
        window.removeEventListener("mousemove", dragMoveHandler);
        window.removeEventListener("mouseup", dragEndHandler);
        if (!state.isDragging) {
          dragStateRef.current = null;
          return;
        }
        if (state.animationFrame !== null) {
          window.cancelAnimationFrame(state.animationFrame);
          state.animationFrame = null;
        }
        applyDragPosition(event);
        const data = buildDragData(state, event);
        for (const element of state.draggedElements) {
          element.classList.remove(state.draggingClassName);
          if (state.shouldRestoreZIndex) {
            element.style.zIndex = state.startZIndexes.get(element) ?? "";
          }
        }
        state.dropTarget?.classList.remove(state.dropTargetClassName);
        dragStateRef.current = null;
        dragConfigRef.current.onDragEnd?.(data);
        if (data.dropTarget) getNestingConfig()?.onDrop?.(data);
      },
      [applyDragPosition, buildDragData, dragMoveHandler, getNestingConfig]
    );

    useEffect(() => {
      return () => {
        const state = dragStateRef.current;
        const animationFrame = state?.animationFrame;
        if (animationFrame !== null && animationFrame !== undefined) {
          window.cancelAnimationFrame(animationFrame);
        }
        window.removeEventListener("mousemove", dragMoveHandler);
        window.removeEventListener("mouseup", dragEndHandler);
      };
    }, [dragEndHandler, dragMoveHandler]);

    const onDragMouseDown = (event: React.MouseEvent) => {
      const { dragEnabled, dragButton, previewMode } =
        interactionConfigRef.current;
      if (!dragEnabled || previewMode || event.button !== dragButton) return;
      const target = event.target as HTMLElement;
      if (shouldBlockPanEvent({ target })) return;
      const sourceElement = getDraggableElement(target);
      if (!sourceElement) return;

      const config = dragConfigRef.current;
      const selector = config.draggableSelector ?? `.${DRAG_CLASSES.DRAGGABLE}`;
      const root = flowRendererRef.current ?? canvasWrapperRef.current;
      const selectedClassName =
        config.selectedClassName ??
        selectionConfigRef.current.selectedClassName ??
        SELECTION_CLASSES.SELECTED;
      const draggableElements = root
        ? Array.from(root.querySelectorAll<HTMLElement>(selector))
        : [];
      const selectedElements = sourceElement.classList.contains(
        selectedClassName
      )
        ? draggableElements.filter((element) =>
            element.classList.contains(selectedClassName)
          )
        : [sourceElement];
      // Moving both a selected parent and one of its selected descendants
      // would apply the delta twice, so keep only outermost components.
      const draggedElements = selectedElements.filter(
        (element) =>
          !selectedElements.some(
            (otherElement) =>
              otherElement !== element && otherElement.contains(element)
          )
      );
      const nesting = getNestingConfig();
      const draggingClassName =
        config.draggingClassName ?? DRAG_CLASSES.DRAGGING;
      const dropTargetClassName =
        nesting?.dropTargetClassName ?? DRAG_CLASSES.DROP_TARGET;

      const state = {
        sourceElement,
        draggedElements,
        startClientX: event.clientX,
        startClientY: event.clientY,
        dragStartThreshold: Math.max(0, config.dragStartThreshold ?? 3),
        isDragging: false,
        startTranslations: new Map(
          draggedElements.map((element) => [
            element,
            getInlineTranslate(element)
          ])
        ),
        startZIndexes: new Map(
          draggedElements.map((element) => [element, element.style.zIndex])
        ),
        shouldRestoreZIndex: false,
        dropTarget: null,
        draggingClassName,
        dropTargetClassName,
        animationFrame: null,
        latestEvent: null
      };
      dragStateRef.current = state;
      window.addEventListener("mousemove", dragMoveHandler);
      window.addEventListener("mouseup", dragEndHandler);
    };

    const buildSelectionData = useCallback(
      (screenRect: SelectionRect, selectedElements: HTMLElement[]) => {
        const {
          k = 1,
          x = 0,
          y = 0
        } = d3Selection.current.property("__zoom") ?? {};
        return {
          screen: screenRect,
          canvas: {
            x: (screenRect.x - x) / k,
            y: (screenRect.y - y) / k,
            width: screenRect.width / k,
            height: screenRect.height / k
          },
          selectedElements
        };
      },
      []
    );

    const updateSelection = useCallback(
      (event: MouseEvent, isEnd: boolean) => {
        const state = selectionStateRef.current;
        const selectionBox = selectionBoxRef.current;
        if (!state || !selectionBox) return;

        const { wrapperBounds, startX, startY } = state;
        const currentX = clampValue({
          value: event.clientX - wrapperBounds.left,
          max: wrapperBounds.width
        });
        const currentY = clampValue({
          value: event.clientY - wrapperBounds.top,
          max: wrapperBounds.height
        });
        const screenRect = {
          x: Math.min(startX, currentX),
          y: Math.min(startY, currentY),
          width: Math.abs(currentX - startX),
          height: Math.abs(currentY - startY)
        };

        selectionBox.style.display = isEnd ? "none" : "block";
        selectionBox.style.transform = `translate(${screenRect.x}px, ${screenRect.y}px)`;
        selectionBox.style.width = `${screenRect.width}px`;
        selectionBox.style.height = `${screenRect.height}px`;

        const selectedClassName =
          selectionConfigRef.current.selectedClassName ??
          SELECTION_CLASSES.SELECTED;
        const selectedElements: HTMLElement[] = [];
        for (const element of getSelectableElements()) {
          const bounds = element.getBoundingClientRect();
          const elementRect = {
            x: bounds.left - wrapperBounds.left,
            y: bounds.top - wrapperBounds.top,
            width: bounds.width,
            height: bounds.height
          };
          const isIntersecting =
            elementRect.x < screenRect.x + screenRect.width &&
            elementRect.x + elementRect.width > screenRect.x &&
            elementRect.y < screenRect.y + screenRect.height &&
            elementRect.y + elementRect.height > screenRect.y;
          element.classList.toggle(selectedClassName, isIntersecting);
          if (isIntersecting) selectedElements.push(element);
        }

        const data = buildSelectionData(screenRect, selectedElements);
        if (isEnd) {
          selectionStateRef.current = null;
          selectionConfigRef.current.onSelectionEnd?.(data);
        } else {
          selectionConfigRef.current.onSelectionChange?.(data);
        }
      },
      [buildSelectionData, getSelectableElements]
    );

    const selectionMoveHandler = useCallback(
      (event: MouseEvent) => updateSelection(event, false),
      [updateSelection]
    );

    const selectionEndHandler = useCallback(
      (event: MouseEvent) => {
        window.removeEventListener("mousemove", selectionMoveHandler);
        window.removeEventListener("mouseup", selectionEndHandler);
        updateSelection(event, true);
      },
      [selectionMoveHandler, updateSelection]
    );

    useEffect(() => {
      return () => {
        window.removeEventListener("mousemove", selectionMoveHandler);
        window.removeEventListener("mouseup", selectionEndHandler);
      };
    }, [selectionMoveHandler, selectionEndHandler]);

    const onCanvasDoubleClickHandler = (event: React.MouseEvent) => {
      if (!onDoubleClick) return;
      const target = event.target as HTMLElement;
      if (shouldBlockPanEvent({ target })) return;
      onDoubleClick(
        event.nativeEvent,
        screenToCanvasPosition(event.clientX, event.clientY)
      );
    };

    const isMultiSelectModifierPressed = (
      event: React.MouseEvent,
      key: SelectionMultiSelectKey
    ) => {
      switch (key) {
        case "Alt":
          return event.altKey;
        case "Control":
          return event.ctrlKey;
        case "Meta":
          return event.metaKey;
        case "Shift":
          return event.shiftKey;
      }
    };

    const selectItemOnClick = (
      event: React.MouseEvent,
      selectableElement: HTMLElement
    ) => {
      const selectedClassName =
        selectionConfigRef.current.selectedClassName ??
        SELECTION_CLASSES.SELECTED;
      const isMultiSelect = isMultiSelectModifierPressed(
        event,
        selectionConfigRef.current.multiSelectKey ?? "Shift"
      );
      const selectableElements = getSelectableElements();
      if (isMultiSelect) {
        selectableElement.classList.toggle(selectedClassName);
      } else {
        for (const element of selectableElements) {
          element.classList.toggle(
            selectedClassName,
            element === selectableElement
          );
        }
      }
      const wrapperBounds = canvasWrapperRef.current?.getBoundingClientRect();
      const selectedElements = selectableElements.filter((element) =>
        element.classList.contains(selectedClassName)
      );
      selectionConfigRef.current.onSelectionEnd?.(
        buildSelectionData(
          {
            x: event.clientX - (wrapperBounds?.left ?? 0),
            y: event.clientY - (wrapperBounds?.top ?? 0),
            width: 0,
            height: 0
          },
          selectedElements
        )
      );
    };

    const onSelectionMouseDown = (event: React.MouseEvent) => {
      const {
        selectionEnabled,
        selectionButton,
        dragEnabled,
        dragButton,
        previewMode
      } = interactionConfigRef.current;
      if (previewMode) return;
      if (
        dragEnabled &&
        event.button === dragButton &&
        getDraggableElement(event.target)
      ) {
        return;
      }
      if (!selectionEnabled || event.button !== selectionButton) return;
      const target = event.target as HTMLElement;
      if (shouldBlockPanEvent({ target })) return;
      const clickSelectableElement = getClickSelectableElement(target);
      if (clickSelectableElement) {
        selectItemOnClick(event, clickSelectableElement);
        return;
      }
      if (getSelectableElement(target)) return;
      if (!canvasWrapperRef.current) return;

      event.preventDefault();
      const wrapperBounds = canvasWrapperRef.current.getBoundingClientRect();
      const startX = event.clientX - wrapperBounds.left;
      const startY = event.clientY - wrapperBounds.top;
      selectionStateRef.current = { startX, startY, wrapperBounds };

      const selectedClassName =
        selectionConfigRef.current.selectedClassName ??
        SELECTION_CLASSES.SELECTED;
      for (const element of getSelectableElements()) {
        element.classList.remove(selectedClassName);
      }

      selectionConfigRef.current.onSelectionStart?.(
        buildSelectionData({ x: startX, y: startY, width: 0, height: 0 }, [])
      );

      window.addEventListener("mousemove", selectionMoveHandler);
      window.addEventListener("mouseup", selectionEndHandler);
    };

    const onContextMenuHandler = (event: React.MouseEvent) => {
      const { panButton, selectionEnabled, selectionButton, previewMode } =
        interactionConfigRef.current;
      if (previewMode) return;
      const usesRightButton =
        panButton === MOUSE_BUTTONS.RIGHT ||
        (selectionEnabled && selectionButton === MOUSE_BUTTONS.RIGHT);
      if (!usesRightButton) return;
      const target = event.target as HTMLElement;
      if (shouldBlockPanEvent({ target })) return;
      event.preventDefault();
    };

    // show the grab cursor only when left-drag actually pans
    let cursorModeClass = "";
    if (previewMode) {
      cursorModeClass = styles.previewMode;
    } else if (
      panButton !== MOUSE_BUTTONS.LEFT ||
      (selectionEnabled && selectionButton === MOUSE_BUTTONS.LEFT)
    ) {
      cursorModeClass = styles.selectionMode;
    }

    return (
      <div className={styles.container}>
        <div
          ref={canvasWrapperRef}
          className={`${styles.canvasWrapper} ${cursorModeClass} ${className}`}
          onMouseDownCapture={onDragMouseDown}
          onMouseDown={onSelectionMouseDown}
          onDoubleClick={onCanvasDoubleClickHandler}
          onContextMenu={onContextMenuHandler}
        >
          {isSafari ? (
            <div ref={canvasRef} className={styles.canvas}>
              <div ref={zoomContainerRef}>
                <div className={styles.contentWrapper}>{children}</div>
              </div>
            </div>
          ) : (
            <svg
              ref={canvasRef}
              className={styles.canvas}
              aria-label="Infinite canvas"
              role="application"
            >
              <g ref={zoomContainerRef}>
                <foreignObject
                  x={ZOOM_CONFIGS.INITIAL_POSITION_X}
                  y={ZOOM_CONFIGS.INITIAL_POSITION_Y}
                  width={ZOOM_CONFIGS.DEFAULT_LAYOUT}
                  height={ZOOM_CONFIGS.DEFAULT_LAYOUT}
                  // foreignObject clips at its bounds by default, which made
                  // content at negative coordinates disappear
                  style={{ overflow: "visible" }}
                >
                  {children}
                </foreignObject>
              </g>
            </svg>
          )}
          {selectionEnabled && (
            <div
              ref={selectionBoxRef}
              className={`${styles.selectionBox} ${
                selectionConfig.selectionBoxClassName ?? ""
              }`}
            />
          )}
        </div>
        {backgroundConfig.disable ? null : (
          <Background
            maxZoom={maxZoom}
            zoomTransform={zoomTransform}
            {...backgroundConfig}
          />
        )}
        {scrollBarConfig.renderScrollBar &&
          !previewMode &&
          canvasWrapperRef.current && (
            <ScrollBar
              ref={scrollBarRef}
              scale={zoomTransform.scale}
              {...scrollBarConfig}
              verticalOffsetHeight={canvasWrapperRef.current.offsetHeight}
              horizontalOffsetWidth={canvasWrapperRef.current.offsetWidth}
              getContainerOffset={getContainerOffset}
              onScrollDeltaHandler={onScrollDeltaHandler}
            />
          )}
        {!previewMode &&
          customComponents.map((config) => {
            const {
              component,
              position = COMPONENT_POSITIONS.BOTTOM_LEFT,
              offset = { x: 0, y: 0 },
              overlap = true,
              className = ""
            } = config;
            const componentKey = `${position}-${offset.x}-${offset.y}-${overlap}`;
            return (
              <CustomComponentWrapper
                key={componentKey}
                component={component}
                position={position}
                offset={offset}
                overlap={overlap}
                zoomState={{ ...zoomTransform, minZoom, maxZoom }}
                className={className}
              />
            );
          })}
      </div>
    );
  }
);

const CustomComponentWrapper = ({
  component,
  position,
  offset,
  overlap,
  zoomState,
  className
}: {
  component: JSX.Element;
  position: string;
  offset: { x: number; y: number };
  overlap: boolean;
  zoomState: {
    translateX: number;
    translateY: number;
    scale: number;
    minZoom: number;
    maxZoom: number;
  };
  className: string;
}) => {
  const positionStyle = useMemo(() => {
    const updatedPos = Object.values(COMPONENT_POSITIONS).includes(position)
      ? position
      : COMPONENT_POSITIONS.BOTTOM_LEFT;

    const [positionY, positionX] = updatedPos.split("-");
    return {
      [positionX]: offset.x,
      [positionY]: offset.y
    };
  }, [position, offset]);

  const updatedComponent = React.cloneElement(component, {
    zoomState
  });

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyle,
        zIndex: overlap ? 20 : 1
      }}
      className={className}
    >
      {updatedComponent}
    </div>
  );
};
