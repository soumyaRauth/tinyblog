import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/ui/card";
import { PostTypeProps } from "../lib/types";
import Link from "next/link";

/**
 * PostListProps defines the shape of the props accepted by the PostList component.
 *
 * @property {PostTypeProps[]} posts - An array of post objects to render.
 */
type PostListProps = {
  posts: PostTypeProps[];
};

/**
 * PostList Component
 *
 * Renders a responsive grid of posts with a title, description, and author information.
 * Each post includes links to the author's page and the full post details.
 *
 * @param {PostListProps} props - The properties for the PostList component.
 * @returns {JSX.Element} The rendered PostList component.
 *
 * @example
 * const posts = [
 *   {
 *     id: 1,
 *     userId: 1,
 *     author: { id: 1, name: "John Doe", email: "john@example.com" },
 *     title: "Post Title",
 *     description: "Short description of the post.",
 *     body: "Full content of the post.",
 *   },
 * ];
 * <PostList posts={posts} />
 */
export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Responsive grid layout for posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg">
            {/* Card Header with title and description */}
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {post.description || "No description available."}
              </CardDescription>
            </CardHeader>

            {/* Card Content with body and links */}
            <CardContent>
              <p className="mb-6">{post.body}</p>
              <Link
                href={`/author/${post?.author.id}`}
                className="text-purple-500 hover:text-blue-700 font-thin"
              >
                {post?.author.name}
              </Link>

              {/* Read More link aligned to the right */}
              <div className="text-right">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
