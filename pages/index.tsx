import Header from "@/Components/Header/Header";
import { PostTypeProps } from "@/Components/lib/types";
import { PostList } from "@/Components/PostList/PostList";
import { fetchPosts, fetchSearchQueryData } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { InferGetStaticPropsType } from "next";
import { useState, useEffect } from "react";
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
  const [searchArray, setSearchArray] = useState(posts);
  const [query, setQuery] = useState<string>("");
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query) {
      setSearchArray(posts); // Reset to initial posts if query is empty
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const dta = await fetchSearchQueryData(query); // Call and resolve the async function
        setSearchArray(dta); // Update the state with the resolved data
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false); // Ensure loading state is cleared
      }
    };

    // Add a debounce to minimize unnecessary requests during typing
    const debounceFetch = setTimeout(fetchData, 300);

    return () => clearTimeout(debounceFetch); // Cleanup the debounce on unmount or query change
  }, [query, posts]);

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
        {loading && (
          <div className="absolute inset-0 bg-white/50">
            {/* <span className="loader text-gray-700">Loading...</span>{" "} */}
          </div>
        )}
        <PostList posts={query ? searchArray.data : posts.data} />
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
 * @example
 * const { props } = await getStaticProps();
 * console.log(props.posts.data); // Array of blog posts
 */
export const getStaticProps = WithStaticProps(fetchPosts, "posts", 60);
