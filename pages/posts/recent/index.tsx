import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import { fetchRecentPosts } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

/**
 * RecentPosts Component
 *
 * Displays a list of the most recent blog posts along with the last revalidation timestamp.
 * Includes:
 * - A `Header` with a title.
 * - The revalidation timestamp to indicate when the data was last updated.
 * - A `PostList` component to render the recent posts.
 *
 * @param {InferGetStaticPropsType<typeof getStaticProps>} props - Props returned from `getStaticProps`.
 * @param {object} props.recentPosts - An object containing recent posts data and revalidation info.
 * @param {Array} props.recentPosts.data - An array of recent posts to render.
 * @param {string} props.recentPosts.revalidateAt - A timestamp indicating the last revalidation.
 * @returns {JSX.Element} The rendered RecentPosts page.
 *
 * @example
 * const recentPosts = { data: [{ id: 1, title: "Hello World" }], revalidateAt: "Friday, November 22, 2024, 04:35 PM" };
 * <RecentPosts recentPosts={recentPosts} />
 */
const RecentPosts = ({
  recentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      {/* Header Section */}
      <Header title="tiny blog" recentButton={false} caseName="title" />

      {/* Last Updated Timestamp */}
      <div className="flex justify-center items-center mt-6">
        <div className="text-sm text-gray-500">
          <span className="font-semibold text-gray-700">Last Updated:</span>{" "}
          {recentPosts.revalidateAt}
        </div>
      </div>

      {/* Recent Posts List */}
      <PostList posts={recentPosts.data} />
    </>
  );
};

export default RecentPosts;

/**
 * Static Props Function
 *
 * Fetches the six most recent posts at build time and adds revalidation support for incremental static regeneration.
 *
 * @type {GetStaticProps}
 * @returns {Promise<{ props: { recentPosts: { data: Array<object>, revalidateAt: string } } }>} - Recent posts and revalidation info.
 *
 * @example
 * const { props } = await getStaticProps();
 * console.log(props.recentPosts.data); // Array of recent posts
 */
export const getStaticProps: GetStaticProps = WithStaticProps(
  () => fetchRecentPosts("6"),
  "recentPosts",
  60
);
