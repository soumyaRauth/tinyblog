import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import { fetchPosts } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { InferGetStaticPropsType } from "next";

/**
 * @returns header and blog posts
 */

const HomePage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header title="Tiny blog" caseName="title" />
      {/* blog */}
      <PostList posts={posts} />
    </>
  );
};

export default HomePage;

export const getStaticProps = WithStaticProps(fetchPosts, "posts", 60);
