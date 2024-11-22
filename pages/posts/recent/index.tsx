import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import { fetchRecentPosts } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

const RecentPosts = ({
  recentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("Printing all recent posts");
  console.log(recentPosts);

  return (
    <>
      <Header title="tiny blog" recentButton={false} caseName="title" />
      <PostList posts={recentPosts} />
    </>
  );
};

export default RecentPosts;

export const getStaticProps: GetStaticProps = WithStaticProps(
  () => fetchRecentPosts("5"),
  "recentPosts",
  60
);
