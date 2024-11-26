import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import { fetchPosts, fetchSearchQueryData } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useIsFetching } from "@tanstack/react-query";
import { useArrayLength } from "@/lib/hooks/useArrayLength";
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
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 30);
  const pagesSize = useArrayLength(fetchPosts);

  //-react query usecase implementaion
  const { data, error, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["searchPosts", debouncedQuery],
    queryFn: () => fetchSearchQueryData(debouncedQuery),
    enabled: !!debouncedQuery,
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <Header title="Tiny blog" caseName="title" />
      {`Total Posts: ${pagesSize ? pagesSize : "Calculating ..."}`}
      {/* Blog Section */}
      <div className="relative">
        {error instanceof Error && <p>Error: {error.message}</p>}
        <PostList posts={debouncedQuery ? data?.data : posts.data} />
      </div>
    </>
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
export const getStaticProps = WithStaticProps(fetchPosts, "posts", 60);
