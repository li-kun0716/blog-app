import React, { useState } from "react";
import { WaterFull, WaterFullItem } from "./WaterFull";
import { Image } from "antd";
import { useTouchBottom } from "@/app/_hook/useTouchBottom";
import WaterFullGrid from "./WaterFullGrid";
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
const photos = () => new Array(30).fill(null).map(() => randomImage());

export default function PhotoWall() {
  const [data, setData] = useState(photos());

  useTouchBottom({
    callback: touchBottomHandle,
  });

  function touchBottomHandle() {
    setData((prev) => {
      return [...prev, ...photos()];
    });
  }

  return (
    <WaterFullGrid gap={[10, 10]}>
      {data.map((item, index) => {
        return (
          <WaterFullGrid.Item key={index}>
            <Image
              alt="photo"
              wrapperStyle={{ height: "100%", width: "100%" }}
              style={{ height: "100%", width: "100%" }}
              src={item.url}
              fallback="/image/Atom.PNG"
            />
          </WaterFullGrid.Item>
        );
      })}
    </WaterFullGrid>
  );
}
