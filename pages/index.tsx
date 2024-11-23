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

  console.log("and posts");
  console.log(posts.data);

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

    fetchData(); // Call the async function
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
      {loading ? (
        <PostList posts={posts.data} /> // Show initial posts while loading
      ) : (
        <PostList posts={query ? searchArray.data : posts.data} /> // Show search results or initial posts
      )}
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
