import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { JSX } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { Selection as Selection_2 } from 'd3-selection';
import { ZoomBehavior } from 'd3-zoom';

export declare const Background: ({ id, size, minSize, maxZoom, gap, zoomTransform, className, minOpacity, maxOpacity, elementColor, backgroundColor }: BackgroundProps) => JSX_2.Element;

export declare interface BackgroundProps {
    id?: string;
    disable?: boolean;
    size?: number;
    minSize?: number;
    maxZoom?: number;
    gap?: number;
    zoomTransform?: {
        scale: number;
        translateX: number;
        translateY: number;
    };
    className?: string;
    minOpacity?: number;
    maxOpacity?: number;
    elementColor?: string;
    backgroundColor?: CSSProperties["backgroundColor"];
}

declare interface CanvasState_2 {
    canvasNode: Selection_2<SVGSVGElement | HTMLDivElement | null, unknown, null, undefined>;
    zoomNode: Selection_2<SVGGElement | HTMLDivElement | null, unknown, null, undefined>;
    currentPosition: {
        k: number;
        x: number;
        y: number;
    };
    d3Zoom: ZoomBehavior<HTMLDivElement | SVGAElement, unknown>;
}
export { CanvasState_2 as CanvasState }

export declare const COMPONENT_POSITIONS: {
    TOP_LEFT: string;
    TOP_RIGHT: string;
    BOTTOM_LEFT: string;
    BOTTOM_CENTER: string;
};

export declare const DRAG_CLASSES: {
    DRAGGABLE: string;
    HANDLE: string;
    DRAGGING: string;
    DROPPABLE: string;
    DROP_TARGET: string;
};

export declare interface DragConfig {
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
    zIndex?: false | number | ((element: HTMLElement, index: number, draggedElements: HTMLElement[]) => number);
    /** enables and configures nesting targets; `true` uses the default selector */
    nesting?: boolean | NestingConfig;
    onDragStart?: (data: DragEventData) => void;
    onDrag?: (data: DragEventData) => void;
    onDragEnd?: (data: DragEventData) => void;
}

export declare interface DragEventData {
    /** draggable item on which the drag began */
    sourceElement: HTMLElement;
    /** every item moved as part of this drag */
    draggedElements: HTMLElement[];
    /** nesting target under the pointer, or null when there is none */
    dropTarget: HTMLElement | null;
    /** pointer position in canvas/content coordinates */
    position: {
        x: number;
        y: number;
    };
    /** movement from the drag start in canvas/content coordinates */
    delta: {
        x: number;
        y: number;
    };
    /** movement from the drag start in viewport pixels */
    screenDelta: {
        x: number;
        y: number;
    };
}

export declare const EventBlocker: React.FC<EventBlockerProps>;

export declare interface EventBlockerProps {
    children: React.ReactNode;
    shouldBlockScroll?: boolean;
    shouldBlockZoom?: boolean;
    shouldBlockPan?: boolean;
    shouldBlockDoubleClick?: boolean;
}

export declare const MOUSE_BUTTONS: {
    LEFT: number;
    MIDDLE: number;
    RIGHT: number;
};

export declare interface NestingConfig {
    enabled?: boolean;
    /** CSS selector identifying valid nesting targets, defaults to `.react-infinite-canvas-droppable` */
    droppableSelector?: string;
    /** class applied to the nesting target while it is under the dragged item */
    dropTargetClassName?: string;
    /** called on a successful drop; use this to update your React data hierarchy */
    onDrop?: (data: DragEventData) => void;
}

export declare interface PanConfig {
    /** mouse button that pans the canvas (see MOUSE_BUTTONS), defaults to left */
    button?: number;
}

export declare const ReactInfiniteCanvas: default_2.FC<ReactInfiniteCanvasProps>;

export declare type ReactInfiniteCanvasHandle = {
    scrollNodeToCenter: ({ nodeElement, offset, scale, shouldUpdateMaxScale, maxScale, transitionDuration }: {
        nodeElement?: HTMLElement;
        offset?: {
            x: number;
            y: number;
        };
        scale?: number;
        shouldUpdateMaxScale?: boolean;
        maxScale?: number;
        transitionDuration?: number;
    }) => void;
    scrollNodeHandler: ({ nodeElement, offset, scale, shouldUpdateMaxScale, maxScale, transitionDuration, position }: {
        nodeElement?: HTMLElement;
        offset?: {
            x: number;
            y: number;
        };
        scale?: number;
        shouldUpdateMaxScale?: boolean;
        maxScale?: number;
        transitionDuration?: number;
        position?: string;
    }) => void;
    scrollContentHorizontallyCenter: ({ offset, transitionDuration }: {
        offset?: number;
        transitionDuration?: number;
    }) => void;
    fitContentToView: ({ duration, offset, scale, maxZoomLimit }: {
        duration?: number;
        offset?: {
            x: number;
            y: number;
        };
        scale?: number;
        maxZoomLimit?: number;
    }) => void;
    getCanvasState: () => CanvasState_2;
};

export declare interface ReactInfiniteCanvasProps {
    children: JSX.Element;
    className?: string;
    ref?: default_2.ForwardedRef<ReactInfiniteCanvasHandle>;
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
    onDoubleClick?: (event: MouseEvent, position: {
        x: number;
        y: number;
    }) => void;
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
        offset?: {
            x: number;
            y: number;
        };
        overlap?: boolean;
        className?: string;
    }>;
    onCanvasMount?: (functions: ReactInfiniteCanvasHandle) => void;
    onZoom?: (event: Event) => void;
}

export declare const SCROLL_NODE_POSITIONS: {
    TOP_CENTER: string;
    BOTTOM_RIGHT: string;
    CENTER_LEFT: string;
    CENTER_RIGHT: string;
    CENTER_CENTER: string;
    TOP_LEFT: string;
    TOP_RIGHT: string;
    BOTTOM_LEFT: string;
    BOTTOM_CENTER: string;
};

export declare const SELECTION_CLASSES: {
    SELECTABLE: string;
    SELECTED: string;
};

export declare interface SelectionConfig {
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

export declare interface SelectionEventData {
    /** selection rect relative to the canvas viewport, in screen pixels */
    screen: SelectionRect;
    /** selection rect in canvas/content coordinates (zoom & pan applied) */
    canvas: SelectionRect;
    selectedElements: HTMLElement[];
}

export declare type SelectionMultiSelectKey = "Alt" | "Control" | "Meta" | "Shift";

export declare interface SelectionRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export { }
