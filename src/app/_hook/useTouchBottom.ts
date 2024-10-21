import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";

type Props = {
  callback: () => void,
  distance?: number,
  observerElement?: HTMLElement,
}

export const useTouchBottom = ({ callback, distance = 50, observerElement = document.documentElement }: Props) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useMemo(() => {
    return throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = observerElement;
      setScrollTop(scrollTop);
      if (scrollTop + clientHeight + distance >= scrollHeight) {
        callback();
      }
    }, 300, { leading: true, trailing: true })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);
  return scrollTop;
}


