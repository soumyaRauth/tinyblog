import Header from "@/Components/Header/Header";
import { PostList } from "@/Components/PostList/PostList";
import { fetchRecentPosts } from "@/lib/api";
import { WithStaticProps } from "@/lib/utils";
import { GetStaticProps, InferGetStaticPropsType } from "next";

const RecentPosts = ({
  recentPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Header title="tiny blog" recentButton={false} caseName="title" />
      <div className="flex justify-center items-center mt-6">
        <div className="text-sm text-gray-500">
          <span className="font-semibold text-gray-700">Last Updated:</span>{" "}
          {recentPosts.revalidateAt}
        </div>
      </div>
      <PostList posts={recentPosts.data} />
    </>
  );
};

export default RecentPosts;

export const getStaticProps: GetStaticProps = WithStaticProps(
  () => fetchRecentPosts("5"),
  "recentPosts",
  60
);
