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
  const posts: PostTypeProps[] = [
    {
      id: 1,
      title: "Understanding React",
      description: "Learn the basics of React and its powerful ecosystem.",
      body: "React is a JavaScript library for building user interfaces...",
    },
    {
      id: 2,
      title: "Getting Started with TypeScript",
      description: "A beginner's guide to using TypeScript in your projects.",
      body: "TypeScript is a typed superset of JavaScript...",
    },
    {
      id: 3,
      title: "Mastering Next.js",
      description:
        "Advanced techniques for building fast web apps with Next.js.",
      body: "Next.js is a React framework that enables server-side rendering...",
    },
    {
      id: 3,
      title: "Mastering Next.js",
      description:
        "Advanced techniques for building fast web apps with Next.js.",
      body: "Next.js is a React framework that enables server-side rendering...",
    },
  ];
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
