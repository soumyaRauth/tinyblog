import { fetchPostsById } from "@/lib/api";
import { WithStaticPaths, WithStaticProps } from "@/lib/utils";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

interface PostDetailProps {
  post: string;
}

const PostDetail = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      POST DETAIL PAGE - ID: {post.id}
      {post.title}
      {post.body}
    </>
  );
};

export default PostDetail;

//!Did not understand entirely
export const getStaticPaths = WithStaticPaths(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.map((post: { id: number }) => ({
    params: { id: post.id.toString() },
  }));
}, false);

export const getStaticProps = WithStaticProps(fetchPostsById, "post", 60);
