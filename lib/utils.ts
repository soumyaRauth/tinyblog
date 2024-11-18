import { clsx, type ClassValue } from "clsx";
import { GetStaticProps } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WithStaticProps = <T>(
  fetcher: () => Promise<T>,
  propName: string
): GetStaticProps => {
  return async () => {
    const data = await fetcher();

    return {
      props: {
        [propName]: data,
      },
    };
  };
};
