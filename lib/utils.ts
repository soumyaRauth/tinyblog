import { PostTypeProps } from "@/Components/lib/types";
import { clsx, type ClassValue } from "clsx";
import { GetStaticProps } from "next";
import { twMerge } from "tailwind-merge";

//-tailwind configuration
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//-Higher order utility function to make the get static props modular

export const WithStaticProps = <T>(
  fetcher: () => Promise<T>,
  propName: string,
  revalidateInterval: number
): GetStaticProps => {
  return async () => {
    try {
      const data = await fetcher();
      return {
        props: {
          [propName]: data,
        },
        revalidate: revalidateInterval,
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          [propName]: null,
        },
        revalidate: 0,
      };
    }
  };
};
