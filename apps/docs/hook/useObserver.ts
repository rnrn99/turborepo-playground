import { useEffect } from "react";

export const useObserver = ({
  target,
  fetchNextPage,
  root = null,
  rootMargin = "0px",
  threshold = 1.0,
  deps,
}: any) => {
  useEffect(() => {
    let observer: IntersectionObserver;

    if (target?.current) {
      observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && fetchNextPage(),
        {
          root,
          rootMargin,
          threshold,
        },
      );
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [target, deps]);
};
