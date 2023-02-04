import { useEffect } from "react";

function useEscapeKey(callback: Function) {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { code } = event;
      console.log(`you pressed `, code);
      if (code === "Escape") {
        callback();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [callback]);
}

export default useEscapeKey;
