import { useEffect, useRef } from "react";

/**
 * Componenent mount 여부 hook
 */
function useMount() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted.current;
}

export default useMount;
