import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedQuery, setDebouncedQuery] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(value), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedQuery;
};
