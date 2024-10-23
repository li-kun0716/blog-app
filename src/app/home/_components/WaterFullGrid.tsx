import React, { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import "./water-full-grid.scss";
type WaterFullGridProps = {
  children: Iterable<React.ReactNode>;
  gap: Array<number>;
  breakPoints?: {
    [key: string]: number;
  };
};
export default function WaterFullGrid({ children, breakPoints, gap }: WaterFullGridProps) {
  const points = { "340": 1, "680": 2, "1024": 3, "1400": 4, "1920": 6, ...breakPoints } as { [key: string]: number };
  const [width, setWidth] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandle);
    return () => {
      window.removeEventListener("resize", resizeHandle);
    };
  }, []);

  function resizeHandle() {
    setWidth(containerRef.current?.offsetWidth ?? 0);
  }

  function computeCol() {
    const breakPoint = Object.keys(points)
      .map((key) => Number(key))
      .sort((a, b) => a - b)
      .find((key) => width <= key);
    return breakPoint ? points[breakPoint.toString()] : 6;
  }

  function computedWidth() {
    const col = computeCol();
    return (width - gap[0] * (col - 1)) / col;
  }
  return (
    <div
      className="water-full-grid-container"
      ref={containerRef}
      //@ts-ignore
      style={{
        "--col": computeCol(),
        "--span": "5px",
        gap: `0 ${gap[0]}px`,
      }}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child as ReactElement, {
          width: computedWidth(),
          gap: gap,
        })
      )}
    </div>
  );
}

type WaterFullGridItemProps = {
  children: React.ReactNode;
  width?: number;
  gap?: Array<number>;
};

WaterFullGrid.Item = (props: WaterFullGridItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(0);
  const onLoadHandler = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.target as HTMLImageElement;
    const ratio = el.naturalWidth / el.naturalHeight;
    const height = (props.width ?? 0) / ratio;
    itemRef.current?.setAttribute("data-ratio", ratio.toString());
    setSpan(Math.ceil(height / 5));
  };

  const getSpan = () => {
    const ratio = Number(itemRef.current?.getAttribute("data-ratio") ?? 1);
    const height = (props.width ?? 0) / ratio;
    setSpan(Math.ceil(height / 5));
  };

  useEffect(getSpan, [props.width]);

  return (
    <div
      className="water-full-grid-item w-full"
      style={{ gridRow: `span ${span}`, paddingBottom: `${props.gap?.[1]}px`, opacity: span == 0 ? 0 : 1 }}
      onLoad={onLoadHandler}
      ref={itemRef}
    >
      {props.children}
    </div>
  );
};
