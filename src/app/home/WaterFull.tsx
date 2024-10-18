"use client";
import { Masonry } from "react-masonry-component2";
import { Image } from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";

const randomImage = () => {
  const width = Math.floor(Math.random() * 500) + 200;
  const height = Math.floor(Math.random() * 500) + 300;
  const url = `https://picsum.photos/${width}/${height}?time=${Date.now()}`;
  return {
    url,
    width,
    height,
  };
};
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
        ratio: fullItem.current ? fullItem.current?.offsetWidth / fullItem.current?.offsetHeight : 1,
      });
    console.log(
      "onLoadHandler",
      fullItem.current ? fullItem.current?.offsetWidth / fullItem.current?.offsetHeight : 1,
      (e.target as HTMLImageElement).naturalWidth / (e.target as HTMLImageElement).naturalHeight
    );
  };
  return (
    <div className="water-full-item" {...props} onLoad={onLoadHandler} ref={fullItem}>
      {children}
    </div>
  );
};

type WaterFull = {
  children: React.ReactNode;
  gap?: Array<number>;
  pointsBreak?: {
    [key: string]: number;
  };
};

export const WaterFull = ({ children, ...props }: WaterFull) => {
  const pointsBreak = props.pointsBreak ?? { "640": 2, "1024": 4 };
  const [width, setWidth] = useState(window.innerWidth);

  const waterFull = useRef<HTMLDivElement>(null);
  const [ratios, setRatios] = useState<number[]>(new Array(children?.length ?? 0));
  const [containerWidth, setContainerWidth] = useState(0);

  function computeCol() {
    const breakPoint = Object.keys(pointsBreak).find((key) => width <= Number(key));
    return breakPoint ? pointsBreak[breakPoint] : 1;
  }

  const handleResize = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    setContainerWidth(waterFull.current?.offsetWidth ?? 0);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
          minColHeight = 0,
          itemWidth = containerWidth / col;
        if (ratios[index] === undefined) isBreak = true;
        if (!isBreak) {
          itemHeight = itemWidth / ratios[index];
          minColIndex = findIndexMinHight();
          minColHeight = colMinHights[minColIndex];
          colMinHights[minColIndex] += itemHeight;
        }
        console.log(
          ratios[index],
          "itemWidth",
          itemWidth,
          "itemHeight",
          itemHeight,
          "minColIndex",
          minColIndex,
          "minColHeight",
          minColHeight
        );
        return React.cloneElement(child as React.ReactElement<any>, {
          "data-index": index,
          style: {
            ...child.props.style,
            transform: `translate(${minColIndex * itemWidth}px, ${minColHeight}px)`,
            opacity: ratios[index] ? 1 : 0,
            position: "absolute",
            width: `${itemWidth}px`,
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
    <div className="water-full-container" {...props} ref={waterFull}>
      {layout()}
    </div>
  );
};
