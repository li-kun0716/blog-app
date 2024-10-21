"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { throttle } from "lodash";

type WaterFullItemProps = {
  children: React.ReactNode;
  onLoadCallback?: ({ index, ratio }: { index: number; ratio: number }) => void;
};

export const WaterFullItem = ({ children, onLoadCallback, ...props }: WaterFullItemProps) => {
  const fullItem = useRef<HTMLDivElement>(null);
  const onLoadHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    onLoadCallback &&
      onLoadCallback({
        index: Number(e.currentTarget.dataset.index),
        ratio: (e.target as HTMLImageElement).naturalWidth / (e.target as HTMLImageElement).naturalHeight,
      });
  };
  return (
    <div className="water-full-item transition-all" {...props} onLoad={onLoadHandler} ref={fullItem}>
      {children}
    </div>
  );
};

type WaterFullProps = {
  children: React.ReactNode;
  gap?: Array<number>;
  pointsBreak?: {
    [key: string]: number;
  };
};

export const WaterFull = ({ children, ...props }: WaterFullProps) => {
  const pointsBreak = props.pointsBreak ?? { "320": 1, "640": 2, "1024": 4, "1920": 6 };
  const [width, setWidth] = useState(0);

  const waterFull = useRef<HTMLDivElement>(null);
  const [ratios, setRatios] = useState<number[]>(new Array((children as Array<React.ReactNode>)?.length ?? 0));
  const [containerWidth, setContainerWidth] = useState(0);

  function computeCol() {
    const breakPoint = Object.keys(pointsBreak)
      .map((key) => Number(key))
      .sort((a, b) => a - b)
      .find((key) => width <= key);
    return breakPoint ? pointsBreak[breakPoint.toString()] : 6;
  }

  const handleResize = useMemo(() => {
    return throttle(() => {
      setWidth(window.innerWidth);
      setContainerWidth(waterFull.current?.offsetWidth ?? 0);
    }, 300);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setWidth(window.innerWidth);
    setContainerWidth(waterFull.current?.offsetWidth ?? 0);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  const col = computeCol();
  const gap = props.gap ?? [16, 16];

  const onLoadCallback = ({ index, ratio }: { index: number; ratio: number }) => {
    setRatios((prev) => {
      const newRatios = [...prev];
      newRatios[index] = ratio;
      return newRatios;
    });
  };

  const layout = () => {
    const colMinHights = new Array(col).fill(0);
    const findIndexMinHight = () => colMinHights.indexOf(Math.min(...colMinHights));
    let isBreak = false;
    const modifiedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        let itemHeight = 0,
          minColIndex = 0,
          preMinColHeight = 0,
          opacity = 0;
        const itemWidth = (containerWidth - col * gap[0]) / col;
        if (ratios[index] === undefined) isBreak = true;
        if (!isBreak) {
          itemHeight = itemWidth / ratios[index];
          minColIndex = findIndexMinHight();
          preMinColHeight = colMinHights[minColIndex];
          colMinHights[minColIndex] += itemHeight + gap[1];
          opacity = 1;
        }
        return React.cloneElement(child as React.ReactElement, {
          "data-index": index,
          style: {
            ...child.props.style,
            transform: `translate(${minColIndex * itemWidth + minColIndex * gap[0]}px, ${preMinColHeight}px)`,
            opacity: opacity,
            position: "absolute",
            width: `${itemWidth}px`,
            top: 0,
            left: 0,
            height: itemHeight != 0 ? `${itemHeight}px` : "",
          } as React.CSSProperties,
          onLoadCallback: onLoadCallback,
        });
      }
      return child;
    });
    waterFull.current && (waterFull.current.style.height = `${Math.max(...colMinHights)}px`);
    return modifiedChildren;
  };

  return (
    <div className="water-full-container relative" {...props} ref={waterFull}>
      {layout()}
    </div>
  );
};
