import Header from "@/Components/Header/Header";
import { PostTypeProps } from "@/Components/lib/types";
import { PostList } from "@/Components/PostList/PostList";
import { fetchPosts } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { InferGetStaticPropsType } from "next";

/**
 *
 * @returns header and blog posts
 */

const HomePage = ({
  blogPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header title="master of puppet" format="default" />
      {/* blog */}
      <PostList posts={blogPosts} />
    </>
  );
};

export default HomePage;

export const getStaticProps = WithStaticProps(fetchPosts, "blogPosts");
