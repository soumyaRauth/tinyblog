import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import {
  fetchPosts,
  fetchPostsPaginated,
  fetchSearchQueryData,
} from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useIsFetching } from "@tanstack/react-query";
import { useArrayLength } from "@/lib/hooks/useArrayLength";
import { PostTypeProps } from "@/Components/lib/types";
/**
 * HomePage Component
 *
 * Renders the homepage, including:
 * - A `Header` component displaying the blog's title.
 * - A `PostList` component to display all blog posts.
 *
 * Data is fetched at build time using `getStaticProps` with incremental static regeneration.
 *
 * @param {InferGetStaticPropsType<typeof getStaticProps>} props - The props returned from `getStaticProps`.
 * @param {object} props.posts - Contains fetched posts data and revalidation info.
 * @param {Array} props.posts.data - An array of blog posts to be rendered.
 * @returns {JSX.Element} The rendered homepage component.
 *
 * @example
 * const posts = [{ id: 1, title: "First Post", body: "Hello World!" }];
 * <HomePage posts={{ data: posts, revalidateAt: "Timestamp" }} />
 */

const HomePage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isFetching = useIsFetching();
  const [pageNumber, setPageNumber] = useState<number>(1);
  //   const debouncedQuery = useDebounce(query, 30);
  const pagesSize = useArrayLength(fetchPosts);

  //-react query usecase implementaion
  const { data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["searchPosts", pageNumber],
    queryFn: () => fetchPostsPaginated(pageNumber, 100),
    enabled: !!pageNumber,
    placeholderData: keepPreviousData,
  });

  return (
    <div>
      {!!isFetching ? (
        <div>LOADINGGG...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          <PostList posts={pageNumber ? data : posts.data} />
          <span>Current Page: {pageNumber}</span>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 font-bold text-xl shadow"
            onClick={() => setPageNumber((old) => Math.max(old - 1, 0))}
            disabled={pageNumber === 0}
            // disabled={page === 0}
          >
            Previous Page
          </button>
          <button
            onClick={() => {
              if (!isPlaceholderData) {
                setPageNumber((old) => old + 1);
              }
            }}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 font-bold text-xl shadow"
            // Disable the Next Page button until we know a next page is available
            // disabled={isPlaceholderData || !data?.hasMore}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;

/**
 * Static Props Function
 *
 * Fetches blog posts at build time and adds revalidation support for incremental static regeneration.
 *
 * @type {GetStaticProps}
 * @returns {Promise<{ props: { posts: { data: Array<object>, revalidateAt: string } } }>} - Fetched posts and revalidation info.
 *
 */
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetchPostsPaginated(1, 10);

  return {
    props: {
      posts: {
        data: response,
      },
    },
  };
};
