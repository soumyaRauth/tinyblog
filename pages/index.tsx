import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import { fetchPosts, fetchSearchQueryData } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

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
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 30);

  //-react query usecase implementaion
  const getSearchedData = useQuery({
    queryKey: ["searchPosts", debouncedQuery],
    queryFn: () => fetchSearchQueryData(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  return (
    <>
      <Header title="Tiny blog" caseName="title" />
      {/* Search  */}
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Blog Search</h1>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search posts by title..."
          className="border border-gray-300 rounded p-2 mb-4 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {/* Blog Section */}
      <div className="relative">
        {/* Optional loading indicator */}

        {getSearchedData.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
        {getSearchedData.error instanceof Error && (
          <p>Error: {getSearchedData.error.message}</p>
        )}
        <PostList
          posts={debouncedQuery ? getSearchedData.data?.data : posts.data}
        />
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
