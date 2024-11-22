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

/**
 * Combines Tailwind CSS class names and resolves conflicts using `twMerge`.
 *
 * @param {...ClassValue[]} inputs - The class names to combine.
 * @returns {string} - A string of resolved and merged class names.
 *
 * @example
 * cn("bg-red-500", "text-white", "bg-red-600");
 * // Output: "bg-red-600 text-white"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Higher-order utility function to make `getStaticProps` modular.
 *
 * Fetches data at build time and adds a revalidation timestamp for Incremental Static Regeneration (ISR).
 *
 * @template T
 * @param {function} fetcher - The data-fetching function.
 * @param {string} propName - The key under which fetched data will be returned in `props`.
 * @param {number} revalidateInterval - The revalidation interval for ISR (in seconds).
 * @returns {GetStaticProps} - A `getStaticProps` function for Next.js.
 *
 * @example
 * const getStaticProps = WithStaticProps(fetchPosts, "posts", 60);
 */
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

/**
 * Higher-order utility function to make `getStaticPaths` modular.
 *
 * Generates dynamic paths for static pages at build time.
 *
 * @param {function} generatePaths - A function that returns an array of path objects.
 * @param {boolean} fallback - Determines the fallback behavior for paths.
 * @returns {GetStaticPaths} - A `getStaticPaths` function for Next.js.
 *
 * @example
 * const getStaticPaths = WithStaticPaths(fetchPaths, false);
 */
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

/**
 * Higher-order utility function to make `getServerSideProps` modular.
 *
 * Fetches data at request time for server-side rendering (SSR).
 *
 * @template T
 * @param {function} fetcher - The data-fetching function.
 * @param {string} propName - The key under which fetched data will be returned in `props`.
 * @returns {GetServerSideProps} - A `getServerSideProps` function for Next.js.
 *
 * @example
 * const getServerSideProps = WithServerSideProps(fetchPost, "post");
 */
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

/**
 * Generates a human-readable timestamp based on the provided format.
 *
 * @param {DateFormatProps} format - The desired date format. Currently supports "default".
 * @returns {string} - The formatted date string.
 *
 * @example
 * currentDate("default");
 * // Output: "Friday, November 22, 2024, 04:35 PM"
 */
export const currentDate = (format: DateFormatProps) => {
  const formatDate = {
    default: () => {
      const currentTime = new Date();
      const humanReadableDate = currentTime.toLocaleString("en-US", {
        weekday: "long", // e.g., "Friday"
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
