import { PostTypeProps } from "@/Components/lib/types";
import { clsx, type ClassValue } from "clsx";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { twMerge } from "tailwind-merge";

//-tailwind configuration
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//-Higher order utility function to make the get static props modular

export const WithStaticProps = <T>(
  fetcher: (args?: string) => Promise<T>,
  propName: string,
  revalidateInterval: number
): GetStaticProps => {
  return async (context?: GetStaticPropsContext) => {
    try {
      const id = context?.params?.id;

      if (id && typeof id !== "string") {
        throw new Error("Invalid ID type. Expected string.");
      }
      const data = await fetcher(id);
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

//!did not understand a single shit here
export const WithStaticPaths = (
  generatePaths: () => Promise<{ params: Record<string, string> }[]>,
  fallback: boolean
): GetStaticPaths => {
  return async () => {
    const paths = await generatePaths(); // Await the async function
    return {
      paths,
      fallback,
    };
  };
};
