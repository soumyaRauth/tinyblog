import { useEffect, useState } from "react";

export const useArrayLength = <T>(
  fetcher: (args?: string) => Promise<T[]>
): number => {
  const [arrayLength, setArrayLength] = useState<number>(0);

  useEffect(() => {
    const calculateLength = async () => {
      try {
        const data = await fetcher();
        setArrayLength(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    calculateLength();
  }, [arrayLength]);

  return arrayLength;
};
