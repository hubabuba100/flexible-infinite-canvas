import { getBlockClassName } from "../../helpers/utils";

export interface EventBlockerProps {
  children: React.ReactNode;
  shouldBlockScroll?: boolean;
  shouldBlockZoom?: boolean;
  shouldBlockPan?: boolean;
  shouldBlockDoubleClick?: boolean;
}

export const EventBlocker: React.FC<EventBlockerProps> = ({
  children,
  shouldBlockScroll = true,
  shouldBlockZoom = true,
  shouldBlockPan = true,
  shouldBlockDoubleClick = true
}) => {
  const blockClassName = getBlockClassName(
    shouldBlockScroll,
    shouldBlockZoom,
    shouldBlockPan,
    shouldBlockDoubleClick
  );
  return <div className={`${blockClassName}`}>{children}</div>;
};
