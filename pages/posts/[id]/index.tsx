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

/**
 * PostDetail Component
 *
 * Displays the details of a single blog post along with a comment section.
 * Includes:
 * - Title and body of the post.
 * - Author information with a link to the author's page.
 * - A static comment example.
 * - A form to add new comments.
 *
 * @param {InferGetStaticPropsType<typeof getStaticProps>} props - Props returned from `getStaticProps`.
 * @param {object} props.post - The post data object.
 * @param {object} props.post.data - Detailed post data, including title, body, and author information.
 * @returns {JSX.Element} The rendered post detail page.
 */
const PostDetail = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header title="tiny blog" caseName="title" />
      <div className="container mx-auto p-6 max-w-3xl">
        {/* Back Button */}
        <BackButton href={".."} color="text-purple-500" />

        {/* Post Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {post.data.title}
            </CardTitle>
          </CardHeader>

          <div className="border-t border-gray-300 my-4" />

          <CardContent>
            <p className="text-gray-700 text-lg">{post.data.body}</p>
          </CardContent>

          <div className="border-t border-gray-300 my-4" />

          <CardFooter className="flex justify-end text-sm text-gray-500">
            <Link
              href={`/author/${post.data.author.id}`}
              className="text-muted-foreground hover:text-gray-600 font-semibold"
            >
              Written by: {post.data.author.name}
            </Link>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold mt-8">Comments</h2>

          {/* Comment List Section */}
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

/**
 * Generates paths for static generation of post detail pages.
 *
 * Fetches all posts and creates paths for each post ID.
 *
 * @returns {Promise<{ paths: Array<{ params: { id: string, userId: string } }>, fallback: boolean }>}
 * - `paths`: An array of post paths with `id` and `userId`.
 * - `fallback`: Determines whether fallback pages are rendered for non-predefined paths.
 *
 * @example
 * const paths = await getStaticPaths();
 * console.log(paths.paths); // [{ params: { id: "1", userId: "1" } }, ...]
 */
export const getStaticPaths = WithStaticPaths(async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return posts.map((post: { id: number; userId: number }) => ({
    params: { id: post.id.toString(), userId: post.userId.toString() },
  }));
}, true);

/**
 * Fetches the details of a single post at build time.
 *
 * Uses a higher-order utility function to handle data fetching and revalidation.
 *
 * @type {GetStaticProps}
 * @returns {Promise<{ props: { post: { data: object, revalidateAt: string } } }>} - Post data with revalidation info.
 *
 * @example
 * const { props } = await getStaticProps({ params: { id: "1" } });
 * console.log(props.post.data.title); // "Post Title"
 */
export const getStaticProps = WithStaticProps(fetchPostsById, "post", 60);
