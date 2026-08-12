import { useEffect, useState } from "react";

import {
  ZOOM_CONFIGS,
  SCROLL_NODE_POSITIONS,
  BLOCK_EVENTS_CLASS
} from "./constants";

export const useOnScreen = (
  ref: { current: Element },
  { rootMargin = "0px", triggerOnce = false } = {}
) => {
  const [isIntersecting, setIntersecting] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(function scrollObserve() {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && triggerOnce) {
          observer.unobserve(element);
        }
      },
      {
        rootMargin
      }
    );
    if (element) {
      observer.observe(element);
    }
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return isIntersecting;
};

export const isSafari =
  typeof navigator !== "undefined" &&
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/** requestIdleCallback with a setTimeout fallback — Safari doesn't implement it */
export const scheduleIdleTask = (
  callback: () => void,
  { timeout }: { timeout?: number } = {}
) => {
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(callback, { timeout });
  } else {
    window.setTimeout(callback, 1);
  }
};

/**
 * visual bounds of an element's subtree in client coordinates: the union of
 * every descendant's rect, so absolutely-positioned items that overflow the
 * root's own layout box (the normal case on a canvas) are included
 */
export const getContentBounds = (root: HTMLElement) => {
  const rootBounds = root.getBoundingClientRect();
  let [left, top, right, bottom] = [
    Number.POSITIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.NEGATIVE_INFINITY
  ];
  const addBounds = (bounds: DOMRect) => {
    // zero-size rects are hidden elements or layout-only wrappers; including
    // them would drag the union towards points nothing is rendered at
    if (bounds.width === 0 && bounds.height === 0) return;
    left = Math.min(left, bounds.left);
    top = Math.min(top, bounds.top);
    right = Math.max(right, bounds.right);
    bottom = Math.max(bottom, bounds.bottom);
  };
  addBounds(rootBounds);
  for (const element of Array.from(root.getElementsByTagName("*"))) {
    addBounds(element.getBoundingClientRect());
  }
  if (left > right || top > bottom) return rootBounds;
  return { left, top, width: right - left, height: bottom - top };
};

export const clampValue = ({
  value,
  min = 0,
  max
}: {
  value: number;
  min?: number;
  max: number;
}) => Math.min(Math.max(value, min), max);

export const getUpdatedNodePosition = ({
  position,
  svgBounds,
  nodeBounds,
  currentTranslateX,
  currentTranslateY,
  currentScale,
  updatedScale,
  customOffset
}: {
  position: string;
  svgBounds: { x: number; y: number; width: number; height: number };
  nodeBounds: { x: number; y: number; width: number; height: number };
  currentTranslateX: number;
  currentTranslateY: number;
  currentScale: number;
  updatedScale: number;
  customOffset: { x: number; y: number };
}) => {
  let [nodeTranslateX, nodeTranslateY, scaleDiff] = [0, 0, 1];
  if (updatedScale !== currentScale) {
    scaleDiff = updatedScale / currentScale;
    currentTranslateX *= scaleDiff;
    currentTranslateY *= scaleDiff;
  }
  switch (position) {
    case SCROLL_NODE_POSITIONS.TOP_LEFT:
      return {
        updatedX:
          currentTranslateX +
          ((svgBounds.x - nodeBounds.x) * scaleDiff + customOffset.x),
        updatedY:
          currentTranslateY +
          ((svgBounds.y - nodeBounds.y) * scaleDiff + customOffset.y)
      };
    case SCROLL_NODE_POSITIONS.TOP_CENTER:
      nodeTranslateX =
        svgBounds.width / 2 -
        (nodeBounds.x * scaleDiff + (nodeBounds.width * scaleDiff) / 2) +
        svgBounds.x;
      return {
        updatedX: currentTranslateX + nodeTranslateX + customOffset.x,
        updatedY:
          currentTranslateY +
          ((svgBounds.y - nodeBounds.y) * scaleDiff + customOffset.y)
      };
    case SCROLL_NODE_POSITIONS.TOP_RIGHT:
      return {
        updatedX:
          currentTranslateX +
          (svgBounds.width -
            (Math.abs(svgBounds.x - nodeBounds.x * scaleDiff) +
              nodeBounds.width * scaleDiff)) +
          customOffset.x,
        updatedY:
          currentTranslateY +
          ((svgBounds.y - nodeBounds.y) * scaleDiff + customOffset.y)
      };
    case SCROLL_NODE_POSITIONS.CENTER_LEFT:
      nodeTranslateY =
        svgBounds.height / 2 -
        (Math.abs(svgBounds.y - nodeBounds.y) * scaleDiff +
          (nodeBounds.height * scaleDiff) / 2);
      return {
        updatedX:
          currentTranslateX +
          ((svgBounds.x - nodeBounds.x) * scaleDiff + customOffset.x),
        updatedY: currentTranslateY + nodeTranslateY + customOffset.y
      };
    case SCROLL_NODE_POSITIONS.CENTER_CENTER:
      nodeTranslateX =
        svgBounds.width / 2 -
        (Math.abs(svgBounds.x - nodeBounds.x) * scaleDiff +
          (nodeBounds.width * scaleDiff) / 2);
      nodeTranslateY =
        svgBounds.height / 2 -
        (Math.abs(svgBounds.y - nodeBounds.y) * scaleDiff +
          (nodeBounds.height * scaleDiff) / 2);
      return {
        updatedX: currentTranslateX + nodeTranslateX + customOffset.x,
        updatedY: currentTranslateY + nodeTranslateY + customOffset.y
      };
    case SCROLL_NODE_POSITIONS.CENTER_RIGHT:
      nodeTranslateY =
        svgBounds.height / 2 -
        (Math.abs(svgBounds.y - nodeBounds.y) * scaleDiff +
          (nodeBounds.height * scaleDiff) / 2);
      return {
        updatedX:
          currentTranslateX +
          (svgBounds.width -
            (Math.abs(svgBounds.x - nodeBounds.x) * scaleDiff +
              nodeBounds.width * scaleDiff)) +
          customOffset.x,
        updatedY: currentTranslateY + nodeTranslateY + customOffset.y
      };
    case SCROLL_NODE_POSITIONS.BOTTOM_LEFT:
      return {
        updatedX:
          currentTranslateX +
          ((svgBounds.x - nodeBounds.x) * scaleDiff + customOffset.x),
        updatedY:
          currentTranslateY +
          (svgBounds.height -
            (Math.abs(svgBounds.y - nodeBounds.y) * scaleDiff +
              nodeBounds.height * scaleDiff)) +
          customOffset.y
      };
    case SCROLL_NODE_POSITIONS.BOTTOM_CENTER:
      nodeTranslateX =
        svgBounds.width / 2 -
        (Math.abs(svgBounds.x - nodeBounds.x) * scaleDiff +
          (nodeBounds.width * scaleDiff) / 2);
      return {
        updatedX: currentTranslateX + nodeTranslateX + customOffset.x,
        updatedY:
          currentTranslateY +
          (svgBounds.height -
            (Math.abs(svgBounds.y - nodeBounds.y) * scaleDiff +
              nodeBounds.height * scaleDiff)) +
          customOffset.y
      };
    case SCROLL_NODE_POSITIONS.BOTTOM_RIGHT:
      return {
        updatedX:
          currentTranslateX +
          (svgBounds.width -
            (Math.abs(svgBounds.x - nodeBounds.x) * scaleDiff +
              nodeBounds.width * scaleDiff)) +
          customOffset.x,
        updatedY:
          currentTranslateY +
          (svgBounds.height -
            (Math.abs(svgBounds.y - nodeBounds.y) * scaleDiff +
              nodeBounds.height)) +
          customOffset.y
      };
    default:
      return {
        updatedX: currentTranslateX,
        updatedY: currentTranslateY
      };
  }
};

export const getScrollSize = (scale: number) => {
  const [verticalRatio, horizontalRatio] = [Math.max(scale - 0.2, 0.2), scale];
  return [
    ZOOM_CONFIGS.INITIAL_SCROLLBAR_SIZE / verticalRatio,
    ZOOM_CONFIGS.INITIAL_SCROLLBAR_SIZE / horizontalRatio
  ];
};

const getScrollData = ({
  isVertical,
  state,
  scrollDelta
}: {
  isVertical: boolean;
  state: {
    verticalPos: number;
    horizontalPos: number;
    verticalSize: number;
    horizontalSize: number;
    verticalSizeDecrease: number;
    horizontalSizeDecrease: number;
  };
  scrollDelta: { deltaX: number; deltaY: number };
}) => {
  const scrollPos = isVertical ? state.verticalPos : state.horizontalPos;
  const scrollSize = isVertical ? state.verticalSize : state.horizontalSize;
  const scrollSizeDecrease = isVertical
    ? state.verticalSizeDecrease
    : state.horizontalSizeDecrease;
  const deltaValue = isVertical ? scrollDelta.deltaY : scrollDelta.deltaX;

  return { scrollPos, scrollSize, scrollSizeDecrease, deltaValue };
};

export const onScrollHandler = ({
  isVertical = true,
  state,
  scrollDelta,
  scrollLength
}: {
  isVertical?: boolean;
  state: {
    verticalPos: number;
    horizontalPos: number;
    verticalSize: number;
    horizontalSize: number;
    verticalSizeDecrease: number;
    horizontalSizeDecrease: number;
  };
  scrollDelta: { deltaX: number; deltaY: number };
  scrollLength: number;
}) => {
  const { scrollPos, scrollSize, scrollSizeDecrease, deltaValue } =
    getScrollData({
      isVertical,
      state,
      scrollDelta
    });
  const scrollRatio = deltaValue / 10 || 0;
  const sizeRatio = deltaValue / 100 || 0;
  let [newScrollData, newSizeDecrease] = [
    scrollPos + scrollRatio,
    scrollSizeDecrease
  ];
  if (newScrollData < 1) {
    newScrollData = 0;
    newSizeDecrease -= Math.abs(sizeRatio);
  } else if (newScrollData + scrollSize > scrollLength) {
    const scrollLimit =
      scrollLength -
      Math.max(
        ZOOM_CONFIGS.MIN_SCROLLBAR_SIZE,
        scrollSize - Math.abs(newSizeDecrease)
      );
    newScrollData = Math.min(
      scrollLength - (scrollSize + newSizeDecrease),
      scrollLimit
    );
    newSizeDecrease -= sizeRatio;
  } else if (newSizeDecrease !== 0) {
    const isUserAtEnd = newScrollData > scrollLength / 2;
    newScrollData = isUserAtEnd ? scrollLength - scrollSize : 0;
    if (isUserAtEnd) {
      newSizeDecrease -= sizeRatio;
      if (newSizeDecrease <= 0) newSizeDecrease = 0;
    } else {
      newSizeDecrease += Math.abs(sizeRatio);
      if (newSizeDecrease >= 0) newSizeDecrease = 0;
    }
  }
  return [newScrollData, newSizeDecrease];
};

export const getBlockClassName = (
  shouldBlockScroll: boolean,
  shouldBlockZoom: boolean,
  shouldBlockPan: boolean
) => {
  if (shouldBlockScroll && shouldBlockZoom && shouldBlockPan) {
    return `${BLOCK_EVENTS_CLASS.BLOCK_EVENTS}`;
  }

  return [
    shouldBlockScroll && `${BLOCK_EVENTS_CLASS.BLOCK_SCROLL_CLASS}`,
    shouldBlockZoom && `${BLOCK_EVENTS_CLASS.BLOCK_ZOOM_CLASS}`,
    shouldBlockPan && `${BLOCK_EVENTS_CLASS.BLOCK_PAN_CLASS}`
  ]
    .filter(Boolean)
    .join(" ");
};

export const shouldBlockPanEvent = (event: { target: HTMLElement }) => {
  const target = event.target as HTMLElement;
  if (
    target.closest(`.${BLOCK_EVENTS_CLASS.BLOCK_PAN_CLASS}`) ||
    target.closest(`.${BLOCK_EVENTS_CLASS.BLOCK_EVENTS}`)
  ) {
    return true;
  }
  return false;
};

export const shouldBlockEvent = (event: {
  target: HTMLElement;
  ctrlKey: boolean;
  metaKey: boolean;
}) => {
  const target = event.target as HTMLElement;

  if (target.closest(`.${BLOCK_EVENTS_CLASS.BLOCK_EVENTS}`)) return true;

  const isCtrlKeyPressed = event.ctrlKey || event.metaKey;
  if (
    !isCtrlKeyPressed &&
    target.closest(`.${BLOCK_EVENTS_CLASS.BLOCK_SCROLL_CLASS}`)
  ) {
    return true;
  }
  if (
    isCtrlKeyPressed &&
    target.closest(`.${BLOCK_EVENTS_CLASS.BLOCK_ZOOM_CLASS}`)
  ) {
    return true;
  }
  return false;
};
