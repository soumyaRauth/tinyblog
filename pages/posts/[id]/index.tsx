import { fetchPostsById } from "@/lib/api";
import { WithStaticPaths, WithStaticProps } from "@/lib/utils";
import { InferGetStaticPropsType } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import Link from "next/link";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import Header from "@/Components/Header/Header";
import { BackButton } from "@/Components/BackButton/BackButton";

const PostDetail = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Header title="tiny blog" format="capital"></Header>
      <div className="container mx-auto p-6 max-w-3xl">
        <BackButton href={".."} color="text-purple-500" />
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
          </CardHeader>

          <div className="border-t border-gray-300 my-4"></div>

          <CardContent>
            <p className="text-gray-700 text-lg">{post.body}</p>
          </CardContent>

          <div className="border-t border-gray-300 my-4" />

          <CardFooter className="flex justify-end text-sm text-gray-500">
            <Link
              href={`/`}
              className="text-muted-foreground hover:text-gray-600 font-semibold"
            >
              Written by: {post.author.name}
            </Link>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mt-8">Comments</h2>

          {/* Comment List Section with One Static Comment */}
          <div className="space-y-4">
            {/* Static Comment */}
            <Card className="p-4 border">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Static User</CardTitle>
                <p className="text-gray-500 text-xs">staticuser@example.com</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  This is a static comment related to the post. It demonstrates
                  how a single comment can be displayed in a list format.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Add a Comment Section */}
          <div className="space-y-4">
            <Textarea
              placeholder="Write your comment here..."
              className="w-full"
            />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Submit Comment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;

export const getStaticPaths = WithStaticPaths(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.map((post: { id: number; userId: number }) => ({
    params: { id: post.id.toString(), userId: post.userId.toString() },
  }));
}, true);

export const getStaticProps = WithStaticProps(fetchPostsById, "post", 60);
