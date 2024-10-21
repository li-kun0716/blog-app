import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";

type Props = {
  callback: () => void,
  distance?: number,
  observerElement?: HTMLElement,
}

export const useTouchBottom = ({ callback, distance = 50, observerElement }: Props) => {
  const [scrollTop, setScrollTop] = useState(0);
  const handleScroll = useMemo(() => {
    return throttle(() => {
      const element = observerElement ?? document.documentElement;
      const { scrollTop, scrollHeight, clientHeight } = element;
      setScrollTop(scrollTop);
      if (scrollTop + clientHeight + distance >= scrollHeight) {
        callback();
      }
    }, 300, { leading: true, trailing: true })
  }, [callback, observerElement, distance])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);
  return scrollTop;
}


