import {
  AuthorPostsProps,
  DateFormatProps,
  PostTypeProps,
} from "@/Components/lib/types";
import { clsx, type ClassValue } from "clsx";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
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
      const revalidateTime = currentDate("default");

      if (id && typeof id !== "string") {
        throw new Error("Invalid ID type. Expected string.");
      }
      const data = await fetcher(id);
      const revalidatedInfoWithData = {
        data: data,
        revalidateAt: revalidateTime,
      };
      return {
        props: {
          [propName]: revalidatedInfoWithData,
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
    const paths = await generatePaths();

    return {
      paths: paths,
      fallback: fallback,
    };
  };
};

export const WithServerSideProps = <T>(
  fetcher: (args?: string) => Promise<T>,
  propName: string
): GetServerSideProps => {
  return async (context?: GetServerSidePropsContext) => {
    const id = context?.params?.id;
    if (id && typeof id !== "string") {
      throw new Error("Invalid id type or Id does not exist");
    }
    const data = await fetcher(id);
    return {
      props: {
        [propName]: data,
      },
    };
  };
};

export const currentDate = (format: DateFormatProps) => {
  const formatDate = {
    default: () => {
      const currentTime = new Date();
      const humanReadableDate = currentTime.toLocaleString("en-US", {
        weekday: "long", // e.g., "Monday"
        year: "numeric", // e.g., "2024"
        month: "long", // e.g., "November"
        day: "numeric", // e.g., "22"
        hour: "2-digit", // e.g., "04 PM"
        minute: "2-digit",
      });
      return humanReadableDate;
    },
  };
  const transformedDate = formatDate[format];
  return transformedDate();
};
