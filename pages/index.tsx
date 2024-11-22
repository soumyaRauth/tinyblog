import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import { fetchPosts } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { InferGetStaticPropsType } from "next";

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
  return (
    <>
      <Header title="Tiny blog" caseName="title" />
      {/* Blog Section */}
      <PostList posts={posts.data} />
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
