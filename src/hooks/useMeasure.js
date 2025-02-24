import { useRef, useState, useEffect } from "react";

export default function useMeasure() {
  const ref = useRef();
  const [bounds, setBounds] = useState({ height: 0 });
  useEffect(() => {
    if (ref.current) {
      const measure = () =>
        setBounds({ height: ref.current.getBoundingClientRect().height });
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
  }, []);
  return [ref, bounds];
}
